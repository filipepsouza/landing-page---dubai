import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { LuxReveal } from './LuxReveal';

/**
 * HERO — Video Scrubbing controlado por scroll.
 *
 * Vídeo: local + re-encodado all-intra (keyframe em todo frame) => seek instantâneo.
 * Duração real: ~15,4s @ 30fps. A "porta" acontece por volta dos 8s (~52% do scroll).
 *
 * MAPA REAL DO VÍDEO (31,4s @ 30fps): 0-3s corredor · 4-8s porta fechada
 * se aproximando · 9s porta abre · 10-12s nuvens/transição · 13-15s skyline
 * de Dubai · 16-18s janela do jato / interior · 19-24s relógio esmeralda ·
 * 25-30s laptop na mesa.
 *
 * COREOGRAFIA (progresso 0 -> 1 ; ~t/31.4):
 *  0.00         HABIB (marca d'água) + Zero Imposto / Moeda Forte
 *  ~0.06 (2s)   ao rolar, HABIB some
 *  ~0.10 (3s)   palavras/parágrafo saem — corredor limpo
 *  0.20-0.28 (~7-8s) PORTA FECHADA: CTA limpa, SOMENTE o botão
 *  ~0.29 (9s)   CTA some, logo antes de a porta abrir
 *  0.40-0.50 (~13-15s) copy da 2ª parte (esmeralda) sobre o skyline
 *  0.50-0.80 (~16-24s) jato + relógio esmeralda respiram (sem texto)
 *  0.82-1.0 (~26-31s) fechamento: CTA de conversão sobre o laptop
 *
 * Botões de ajuste: SCROLL_HEIGHT_VH (ritmo) e LERP (suavidade).
 */

const VIDEO_SRC = '/hero-scrub.mp4?v=6';

// ~31,4s de vídeo -> ~750vh (≈24vh/s). Sobe = mais lento/contemplativo.
const SCROLL_HEIGHT_VH = 750;

// Suavização do scrub. Menor = mais deslizante; maior = mais colado no scroll.
const LERP = 0.25;

interface HeroProps {
  onCtaClick?: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ---- Scrubbing: scroll -> currentTime (com suavização) ----
  const durationRef = useRef(0);
  const targetTime = useRef(0);
  const smoothTime = useRef(0);
  const appliedTime = useRef(-1);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (durationRef.current) {
      const clamped = Math.min(Math.max(p, 0), 1);
      targetTime.current = clamped * (durationRef.current - 0.05);
    }
  });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && durationRef.current) {
        smoothTime.current += (targetTime.current - smoothTime.current) * LERP;
        if (Math.abs(targetTime.current - smoothTime.current) < 0.004) {
          smoothTime.current = targetTime.current;
        }
        if (!v.seeking && Math.abs(smoothTime.current - appliedTime.current) > 0.001) {
          try {
            v.currentTime = smoothTime.current;
            appliedTime.current = smoothTime.current;
          } catch {
            /* ignora seeks inválidos durante carga */
          }
        }

        // --- Controle direto da opacidade e exibição (display: 'none') p/ evitar fantasmas ---
        const t = smoothTime.current;

        // Watermark HABIB
        if (watermarkRef.current) {
          const opacity = t < 1.2 ? 0.9 * (1 - t / 1.2) : 0;
          watermarkRef.current.style.opacity = opacity.toString();
          watermarkRef.current.style.display = opacity === 0 ? 'none' : 'flex';
          const scale = t < 1.2 ? 1 - (t / 1.2) * 0.05 : 0.95;
          watermarkRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        // Palavras-âncora (Zero Imposto / Moeda Forte) + Parágrafo
        if (wordsRef.current) {
          const opacity = t < 1.2 ? 1 - t / 1.2 : 0;
          wordsRef.current.style.opacity = opacity.toString();
          wordsRef.current.style.display = opacity === 0 ? 'none' : 'block';
          const y = t < 1.2 ? (t / 1.2) * 60 : 60;
          wordsRef.current.style.transform = `translateY(${y}px)`;
        }

        // Hint "role para entrar"
        if (hintRef.current) {
          const opacity = t < 0.5 ? 1 - t / 0.5 : 0;
          hintRef.current.style.opacity = opacity.toString();
          hintRef.current.style.display = opacity === 0 ? 'none' : 'flex';
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---- Loading screen ----
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onMeta = () => {
      durationRef.current = v.duration || 0;
    };
    const onProgress = () => {
      try {
        if (v.buffered.length && v.duration) {
          const end = v.buffered.end(v.buffered.length - 1);
          setLoadPct(Math.min(100, Math.round((end / v.duration) * 100)));
        }
      } catch {
        /* buffered pode falhar cedo */
      }
    };
    const onReady = () => {
      setLoadPct(100);
      setIsLoading(false);
      // Unlock iOS Safari video decoder by playing and pausing immediately
      if (v) {
        v.play().then(() => {
          v.pause();
        }).catch(err => {
          console.log("Video autoplay/play blocked or failed:", err);
        });
      }
    };

    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('progress', onProgress);
    v.addEventListener('canplaythrough', onReady);
    const failSafe = window.setTimeout(onReady, 15000);
    if (v.readyState >= 4) onReady();

    return () => {
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('progress', onProgress);
      v.removeEventListener('canplaythrough', onReady);
      window.clearTimeout(failSafe);
    };
  }, []);

  // ---- Timing dos overlays (calibrado p/ o vídeo de 15,4s) ----
  // CTA na PORTA FECHADA (~7-8s): SOMENTE o botão, some antes de a porta abrir (9s).
  const ctaOpacity = useTransform(scrollYProgress, [0.2, 0.235, 0.26, 0.28], [0, 1, 1, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.2, 0.235], [0.96, 1]);

  // Copy da 2ª parte (esmeralda) sobre o skyline (~13-15s); sai antes do jato (16s).
  const endOpacity = useTransform(scrollYProgress, [0.4, 0.44, 0.48, 0.5], [0, 1, 1, 0]);
  const endY = useTransform(scrollYProgress, [0.4, 0.44], [50, 0]);

  // Fechamento sobre o laptop (~26-31s): CTA de conversão.
  const finalOpacity = useTransform(scrollYProgress, [0.82, 0.88, 1], [0, 1, 1]);
  const finalY = useTransform(scrollYProgress, [0.82, 0.9], [40, 0]);

  // Vinheta: presente no corredor (leitura), leve no meio/fim p/ não "abafar" as cenas.
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 1], [1, 0.85, 0.5, 0.45]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      {/* CAMADA STICKY */}
      <div className="sticky top-0 h-screen w-full overflow-hidden isolate bg-deepBlack">
        {/* fundo de segurança */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

        {/* VÍDEO — controlado por scroll */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          className="absolute inset-0 h-full w-full object-cover -z-10"
          src={VIDEO_SRC}
          poster="/hero-poster.jpg?v=6"
        />

        {/* Vinheta de leitura — leve, controlada por scroll (não "abafa" a imagem no fim) */}
        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-transparent to-black/70 pointer-events-none"
        />

        {/* Watermark HABIB */}
        <div
          ref={watermarkRef}
          className="absolute top-1/2 left-1/2 w-full flex justify-center items-center pointer-events-none z-0 px-4"
          style={{ opacity: 0.9, transform: 'translate(-50%, -50%) scale(1)' }}
        >
          <h1 className="font-cinzel text-[12vw] md:text-[8vw] font-normal bg-clip-text text-transparent bg-gradient-to-r from-white via-gold to-white tracking-[0.15em] select-none text-center leading-[1]">
            HABIB
            <br />
            CONSULTANCY
          </h1>
        </div>

        {/* ABERTURA: palavras-âncora + parágrafo (copy existente, reposicionada) */}
        <div
          ref={wordsRef}
          className="absolute bottom-[14vh] md:bottom-[10vh] left-0 right-0 px-6 sm:px-10 md:px-16 z-10 pointer-events-none"
          style={{ opacity: 1, transform: 'translateY(0px)' }}
        >
          <div className="grid grid-cols-2 md:flex md:flex-row items-end justify-between w-full max-w-7xl mx-auto gap-y-8">
            <div className="order-1 col-span-1 flex flex-col items-start text-left shrink-0">
              <h1 className="font-cinzel text-[8vw] sm:text-[6vw] md:text-[5.5vw] font-normal italic tracking-tight leading-[0.9] text-white whitespace-nowrap drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
                <LuxReveal delay={0.2}>Zero</LuxReveal>
                <br />
                <LuxReveal delay={0.4}>Imposto</LuxReveal>
              </h1>
            </div>

            <div className="order-3 md:order-2 col-span-2 md:col-auto w-full max-w-xs sm:max-w-md md:max-w-lg md:mb-3 md:mx-10 text-center md:text-left mx-auto">
              <p className="font-inter text-white/70 text-[11px] sm:text-sm md:text-[15px] font-normal leading-relaxed tracking-wide">
                A engenharia definitiva do patrimônio. Estruturas paramétricas em
                Dubai que destravam acesso irrestrito a capital em moeda forte.
              </p>
            </div>

            <div className="order-2 md:order-3 col-span-1 flex flex-col items-end text-right shrink-0">
              <h1 className="font-cinzel text-[8vw] sm:text-[6vw] md:text-[5.5vw] font-normal italic tracking-tight leading-[0.9] text-white whitespace-nowrap drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
                <LuxReveal delay={0.6}>Moeda</LuxReveal>
                <br />
                <LuxReveal delay={0.8}>Forte</LuxReveal>
              </h1>
            </div>
          </div>
        </div>

        {/* PORTA (~52%): CTA limpa — SOMENTE o botão (posicionado abaixo da porta) */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale }}
          className="absolute inset-x-0 bottom-[12vh] flex justify-center z-10 pointer-events-none"
        >
          <button
            onClick={onCtaClick}
            className="pointer-events-auto relative group font-inter tracking-[0.15em] text-[11px] md:text-[13px] uppercase rounded-full transition-all duration-500 cursor-pointer overflow-hidden text-black bg-gradient-to-r from-[#C6A02E] via-[#F0D67A] to-[#C6A02E] font-bold px-10 py-4 shadow-[0_0_40px_rgba(16, 124, 88,0.35)] hover:shadow-[0_0_60px_rgba(16, 124, 88,0.6)] hover:scale-[1.04]"
          >
            <div className="absolute inset-0 bg-white/50 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Solicitar Diagnóstico Patrimonial</span>
          </button>
        </motion.div>

        {/* FIM: copy da 2ª parte sobreposta — com respiro, sem abafar */}
        <motion.div
          style={{ opacity: endOpacity, y: endY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10 pointer-events-none"
        >
          {/* scrim localizado só atrás do texto (radial) — dá contraste sem abafar a cena */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_45%_at_center,_rgba(0,0,0,0.55),_transparent_70%)]" />
          <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
            <h2 className="font-inter font-semibold uppercase text-xl md:text-[32px] leading-[1.15] tracking-[0.03em] text-white/90 drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]">
              Não vendemos empresas.
            </h2>
            <h2 className="font-cinzel text-[36px] md:text-[clamp(48px,6.2vw,82px)] font-normal text-white tracking-[-0.02em] leading-[0.98] bg-clip-text text-transparent bg-gradient-to-r from-[#6EE7B7] via-[#10B981] to-[#34D399] drop-shadow-[0_2px_45px_rgba(16,185,129,0.45)] max-w-4xl mx-auto">
              Construímos máquinas de <br className="hidden md:inline" /> bancabilidade em Dubai.
            </h2>
          </div>
        </motion.div>

        {/* FECHAMENTO: CTA de conversão sobre o laptop (~26-31s) */}
        <motion.div
          style={{ opacity: finalOpacity, y: finalY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10 pointer-events-none"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_center,_rgba(0,0,0,0.6),_transparent_70%)]" />
          <p className="font-inter font-semibold text-white/60 text-[11px] md:text-xs tracking-[0.35em] uppercase mb-6">
            O acesso começa aqui
          </p>
          <button
            onClick={onCtaClick}
            className="pointer-events-auto relative group font-inter tracking-[0.15em] text-[11px] md:text-[13px] uppercase rounded-full transition-all duration-500 cursor-pointer overflow-hidden text-black bg-gradient-to-r from-[#C6A02E] via-[#F0D67A] to-[#C6A02E] font-bold px-10 py-4 shadow-[0_0_40px_rgba(16, 124, 88,0.35)] hover:shadow-[0_0_60px_rgba(16, 124, 88,0.6)] hover:scale-[1.04]"
          >
            <div className="absolute inset-0 bg-white/50 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Solicitar Diagnóstico Patrimonial</span>
          </button>
        </motion.div>

        {/* Hint de scroll */}
        <div
          ref={hintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
          style={{ opacity: 1 }}
        >
          <span className="font-inter font-semibold text-white/40 text-[10px] tracking-[0.35em] uppercase mb-2">
            Role para entrar
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>

      {/* LOADING SCREEN */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-deepBlack">
          <img src="/logo.png?v=5" alt="Habib Consultancy Logo" className="w-12 h-12 object-contain rounded-full mb-8 animate-pulse shadow-[0_0_20px_rgba(16, 124, 88,0.3)]" />
          <div className="w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-darkGold to-gold transition-[width] duration-300"
              style={{ width: `${loadPct}%` }}
            />
          </div>
          <span className="mt-4 font-inter font-semibold text-white/40 text-[10px] tracking-[0.35em] uppercase">
            Preparando a experiência {loadPct}%
          </span>
        </div>
      )}
    </div>
  );
}
