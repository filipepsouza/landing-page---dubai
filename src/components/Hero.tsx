import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { LuxReveal } from './LuxReveal';

/**
 * HERO — Frame-Sequence Scrubbing controlado por scroll (canvas).
 *
 * Em vez de "seek" em <video> (que trava/gagueja no iOS Safari), desenhamos
 * uma sequência de imagens (WebP) num <canvas>. O scroll escolhe o frame.
 * Isso é fluido em qualquer dispositivo — mobile, iOS e desktop — sem lag.
 *
 * Fonte: /public/hero-frames/f_0001..f_0470.webp  (1440px, 15fps, ~31,3s)
 *
 * MAPA REAL DO VÍDEO (31,33s @ 15fps -> 470 frames):
 *  0.0-4.5s   corredor de mármore, homem caminhando até a porta
 *  6.0-8.0s   PORTA FECHADA (emblema esmeralda) — cena limpa
 *  ~8.5s      a porta ABRE revelando o jato nas nuvens
 *  9-15s      jato privado voando sobre as nuvens
 *  16s        transição (sol/nuvens)
 *  17-23s     skyline aéreo de Dubai (Burj Khalifa)
 *  24-29.5s   escritório de luxo / laptop com vista da cidade
 *  30.1-31.3s FADE para PRETO absoluto (último frame = preto) -> 2ª parte da LP
 *
 * COREOGRAFIA (progresso de scroll 0 -> 1):
 *  0.00         HABIB (marca d'água) + Zero Imposto / Moeda Forte
 *  ~0.04 (1.2s) ao rolar, HABIB e as palavras somem — corredor limpo
 *  0.195-0.265 (~6-8s) PORTA FECHADA: CTA limpa, some quando a porta abre
 *  0.55-0.71 (~17-22s) copy da 2ª parte (esmeralda) sobre o skyline de Dubai
 *  0.83-1.0 (~27-31s) fechamento: CTA de conversão sobre o laptop -> preto
 */

// ---- Sequência de frames ----
const FRAME_COUNT = 470;
const FPS = 15;
const framePath = (i: number) => `/hero-frames/f_${String(i + 1).padStart(4, '0')}.webp`;
// Quantos frames precisam estar prontos antes de liberar a experiência
// (cobre corredor + porta + 1º CTA). O resto continua carregando em background.
const REVEAL_AT = Math.min(FRAME_COUNT, 150);

// 470 frames -> ~760vh (scrub lento/contemplativo). Sobe = mais lento.
const SCROLL_HEIGHT_VH = 760;

// Suavização do scrub. Menor = mais deslizante; maior = mais colado no scroll.
const LERP = 0.22;

interface HeroProps {
  onCtaClick?: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ---- Frames em memória ----
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);

  // ---- Scrubbing: scroll -> índice de frame (com suavização) ----
  const targetFrame = useRef(0);
  const smoothFrame = useRef(0);
  const lastDrawn = useRef(-1);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const clamped = Math.min(Math.max(p, 0), 1);
    targetFrame.current = clamped * (FRAME_COUNT - 1);
  });

  // ---- Preload das imagens ----
  useEffect(() => {
    imagesRef.current = new Array(FRAME_COUNT);
    loadedRef.current = new Array(FRAME_COUNT).fill(false);
    let revealed = false;
    let loadedCount = 0;

    const maybeReveal = () => {
      if (revealed) return;
      // libera quando os primeiros frames (corredor/porta) estão prontos
      let earlyReady = true;
      for (let i = 0; i < REVEAL_AT; i++) {
        if (!loadedRef.current[i]) { earlyReady = false; break; }
      }
      if (earlyReady) {
        revealed = true;
        setLoadPct(100);
        setIsLoading(false);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      const done = () => {
        if (loadedRef.current[i]) return;
        loadedRef.current[i] = true;
        loadedCount++;
        setLoadPct(Math.round((loadedCount / FRAME_COUNT) * 100));
        maybeReveal();
      };
      img.onload = done;
      img.onerror = done; // não trava o loader por um frame que falhe
      img.src = framePath(i);
      imagesRef.current[i] = img;
    }

    // Failsafe: libera mesmo em conexões lentas (frames faltantes usam o vizinho)
    const failSafe = window.setTimeout(() => {
      if (!revealed) {
        revealed = true;
        setIsLoading(false);
      }
    }, 20000);

    return () => window.clearTimeout(failSafe);
  }, []);

  // ---- Canvas: dimensionamento responsivo (DPR) + desenho object-cover ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.width / img.height;
      const cr = cw / ch;
      let dw: number, dh: number;
      if (cr > ir) {
        dw = cw;
        dh = cw / ir;
      } else {
        dh = ch;
        dw = ch * ir;
      }
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const nearestLoaded = (idx: number): HTMLImageElement | null => {
      const imgs = imagesRef.current;
      const loaded = loadedRef.current;
      if (loaded[idx]) return imgs[idx];
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (idx - d >= 0 && loaded[idx - d]) return imgs[idx - d];
        if (idx + d < FRAME_COUNT && loaded[idx + d]) return imgs[idx + d];
      }
      return null;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      lastDrawn.current = -1; // força redesenho no próximo tick
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);

    let raf = 0;
    const tick = () => {
      // suaviza o índice de frame
      smoothFrame.current += (targetFrame.current - smoothFrame.current) * LERP;
      if (Math.abs(targetFrame.current - smoothFrame.current) < 0.01) {
        smoothFrame.current = targetFrame.current;
      }
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(smoothFrame.current)),
      );

      if (idx !== lastDrawn.current) {
        const img = nearestLoaded(idx);
        if (img && img.complete && img.naturalWidth) {
          drawCover(img);
          lastDrawn.current = idx;
        }
      }

      // ---- Overlays de abertura (baseados no tempo de vídeo em segundos) ----
      const t = smoothFrame.current / FPS;

      if (watermarkRef.current) {
        const opacity = t < 1.2 ? 0.9 * (1 - t / 1.2) : 0;
        watermarkRef.current.style.opacity = opacity.toString();
        watermarkRef.current.style.display = opacity === 0 ? 'none' : 'flex';
        const scale = t < 1.2 ? 1 - (t / 1.2) * 0.05 : 0.95;
        watermarkRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }

      if (wordsRef.current) {
        const opacity = t < 1.2 ? 1 - t / 1.2 : 0;
        wordsRef.current.style.opacity = opacity.toString();
        wordsRef.current.style.display = opacity === 0 ? 'none' : 'block';
        const y = t < 1.2 ? (t / 1.2) * 60 : 60;
        wordsRef.current.style.transform = `translateY(${y}px)`;
      }

      if (hintRef.current) {
        const opacity = t < 0.5 ? 1 - t / 0.5 : 0;
        hintRef.current.style.opacity = opacity.toString();
        hintRef.current.style.display = opacity === 0 ? 'none' : 'flex';
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
    };
  }, []);

  // ---- Timing dos overlays (calibrado p/ o vídeo de 31,33s) ----
  // CTA na PORTA FECHADA (~6-8s): SOMENTE o botão, some antes de a porta abrir (~8.5s).
  const ctaOpacity = useTransform(scrollYProgress, [0.195, 0.225, 0.25, 0.265], [0, 1, 1, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.195, 0.225], [0.96, 1]);

  // Copy da 2ª parte (esmeralda) sobre o skyline de Dubai (~17-22s).
  const endOpacity = useTransform(scrollYProgress, [0.55, 0.59, 0.67, 0.71], [0, 1, 1, 0]);
  const endY = useTransform(scrollYProgress, [0.55, 0.59], [50, 0]);

  // Fechamento sobre o laptop (~27-31s): CTA de conversão -> fade p/ preto.
  const finalOpacity = useTransform(scrollYProgress, [0.83, 0.89, 1], [0, 1, 1]);
  const finalY = useTransform(scrollYProgress, [0.83, 0.9], [40, 0]);

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

        {/* CANVAS — sequência de frames controlada por scroll */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full -z-10 block"
        />

        {/* Vinheta de leitura — leve, controlada por scroll (não "abafa" a imagem no fim) */}
        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-transparent to-black/70 pointer-events-none"
        />

        {/* Watermark HABIB */}
        <div
          ref={watermarkRef}
          className="absolute top-[58%] left-1/2 w-full flex justify-center items-center pointer-events-none z-0 px-4"
          style={{ opacity: 0.9, transform: 'translate(-50%, -50%) scale(1)' }}
        >
          <h1 className="font-playfair text-[7.5vw] md:text-[5vw] font-normal bg-clip-text text-transparent bg-gradient-to-r from-white via-emeraldBright to-white tracking-[0.12em] select-none text-center leading-[1.1]">
            HABIB
            <br />
            CONSULTANCY
          </h1>
        </div>

        {/* ABERTURA: palavras-âncora (Blindagem Patrimonial / Dolarização de Patrimônio) */}
        <div
          ref={wordsRef}
          className="absolute bottom-[14vh] md:bottom-[11vh] left-0 right-0 px-6 sm:px-10 md:px-16 z-10 pointer-events-none"
          style={{ opacity: 1, transform: 'translateY(0px)' }}
        >
          <div className="flex flex-row items-end justify-between w-full max-w-7xl mx-auto gap-4">
            <div className="flex flex-col items-start text-left shrink-0">
              <h1 className="font-cinzel text-[4.4vw] sm:text-[3.6vw] md:text-[2.8vw] font-normal tracking-tight leading-[1] text-white whitespace-nowrap drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)]">
                <LuxReveal delay={0.2}>Blindagem</LuxReveal>
                <br />
                <LuxReveal delay={0.4}>Patrimonial</LuxReveal>
              </h1>
            </div>

            <div className="flex flex-col items-end text-right shrink-0">
              <h1 className="font-cinzel text-[4.4vw] sm:text-[3.6vw] md:text-[2.8vw] font-normal tracking-tight leading-[1] text-white whitespace-nowrap drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)]">
                <LuxReveal delay={0.6}>Dolarização</LuxReveal>
                <br />
                <LuxReveal delay={0.8}>de Patrimônio</LuxReveal>
              </h1>
            </div>
          </div>
        </div>

        {/* PORTA FECHADA (~6-8s): CTA limpa — SOMENTE o botão (posicionado abaixo da porta) */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale }}
          className="absolute inset-x-0 bottom-[12vh] flex justify-center z-10 pointer-events-none"
        >
          <button
            onClick={onCtaClick}
            className="pointer-events-auto relative group font-inter tracking-[0.18em] text-[12px] md:text-[15px] uppercase rounded-full transition-all duration-500 cursor-pointer overflow-hidden text-black bg-gradient-to-r from-[#B8912A] via-[#F6DE8A] to-[#B8912A] font-bold px-12 py-5 ring-1 ring-[#F6DE8A]/50 shadow-[0_8px_50px_rgba(214,175,64,0.55),0_0_0_1px_rgba(0,0,0,0.2)_inset] hover:shadow-[0_10px_70px_rgba(214,175,64,0.85)] hover:scale-[1.06]"
          >
            <div className="absolute inset-0 bg-white/50 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Solicitar Diagnóstico Patrimonial</span>
          </button>
        </motion.div>

        {/* MEIO: copy da 2ª parte sobreposta ao skyline — com respiro, sem abafar */}
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
            <h2 className="font-cinzel italic text-[40px] md:text-[clamp(52px,6.6vw,88px)] font-semibold tracking-[-0.01em] leading-[0.98] bg-clip-text text-transparent bg-gradient-to-b from-[#9FF3D2] via-[#17C57E] to-[#0A6E47] drop-shadow-[0_2px_50px_rgba(20,200,126,0.5)] max-w-4xl mx-auto">
              Construímos máquinas de <br className="hidden md:inline" /> bancabilidade em Dubai.
            </h2>
          </div>
        </motion.div>

        {/* FECHAMENTO: CTA de conversão sobre o laptop (~27-31s) */}
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
            className="pointer-events-auto relative group font-inter tracking-[0.18em] text-[12px] md:text-[15px] uppercase rounded-full transition-all duration-500 cursor-pointer overflow-hidden text-black bg-gradient-to-r from-[#B8912A] via-[#F6DE8A] to-[#B8912A] font-bold px-12 py-5 ring-1 ring-[#F6DE8A]/50 shadow-[0_8px_50px_rgba(214,175,64,0.55),0_0_0_1px_rgba(0,0,0,0.2)_inset] hover:shadow-[0_10px_70px_rgba(214,175,64,0.85)] hover:scale-[1.06]"
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
          <img src="/logo.png?v=5" alt="Habib Consultancy Logo" className="w-12 h-12 object-contain rounded-full mb-8 animate-pulse shadow-[0_0_20px_rgba(214,175,64,0.3)]" />
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
