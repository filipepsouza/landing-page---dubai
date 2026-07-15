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

// 470 frames -> ~280vh (resolvido em 3 scrolls com transição super compacta).
const SCROLL_HEIGHT_VH = 280;

interface HeroProps {
  onCtaClick?: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

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

  const hasAutoScrolled = useRef(false);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const clamped = Math.min(Math.max(p, 0), 1);
    
    // Se o usuário voltar 100% ao topo da página (clamped === 0), reseta a animação para o início
    if (clamped === 0 && window.scrollY < 10) {
      targetFrame.current = 0;
      smoothFrame.current = 0;
      hasAutoScrolled.current = false;
      return;
    }

    // Mapeamento em 4 estágios (SCROLL_HEIGHT_VH = 280):
    // Un-stick ocorre em p = 0.642.
    // O 3º estágio (target = 469) é ativado antes (p >= 0.58) para que o zoom
    // para a tela preta seja concluído exatamente antes de a página destravar.
    let target = 0;
    if (clamped < 0.12) {
      target = 0;
    } else if (clamped < 0.42) {
      target = 105;
    } else if (clamped < 0.58) {
      target = 320;
    } else {
      target = 469;
    }

    targetFrame.current = target;

    // Reseta o controle do auto-scroll caso o usuário volte para o estágio 2 (Burj Khalifa)
    if (clamped < 0.50 && hasAutoScrolled.current) {
      hasAutoScrolled.current = false;
    }
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
    let lastTime = performance.now();

    const tick = (now: number) => {
      // Diferença de tempo em segundos, limitada a 50ms para evitar saltos bruscos
      const dt = Math.min(50, now - lastTime) / 1000;
      lastTime = now;

      const diff = targetFrame.current - smoothFrame.current;
      const dist = Math.abs(diff);
      if (dist > 0.05) {
        // Velocidade em frames por segundo: máximo de 30 FPS, desacelera suavemente ao chegar perto
        const speedFps = Math.min(dist * 4, 30);
        smoothFrame.current += Math.sign(diff) * speedFps * dt;
      } else {
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

      // Dispara o scroll suave quando o zoom-in no laptop (tela preta, frame >= 468) estiver concluído
      if (idx >= 468 && !hasAutoScrolled.current) {
        hasAutoScrolled.current = true;
        const targetEl = document.getElementById('cenario');
        if (targetEl) {
          // Rola exatamente para o topo do contêiner da seção (0px no topo da janela)
          // Isso elimina a faixa preta superior, enquanto o padding-top maior da seção garante a folga abaixo do header fixo.
          const rect = targetEl.getBoundingClientRect();
          const targetY = rect.top + window.scrollY;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      }

      // ---- Overlays de abertura (baseados no tempo de vídeo em segundos) ----
      const t = smoothFrame.current / FPS;

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

      // 4. CTA na PORTA FECHADA (~6s - 8.3s, ou seja, frames 90 a 125)
      if (ctaRef.current) {
        let opacity = 0;
        if (t >= 5.5 && t <= 8.3) {
          if (t < 6.2) opacity = (t - 5.5) / 0.7;
          else if (t < 7.8) opacity = 1;
          else opacity = (8.3 - t) / 0.5;
        }
        ctaRef.current.style.opacity = opacity.toString();
        ctaRef.current.style.display = opacity === 0 ? 'none' : 'flex';
        const scale = 0.96 + opacity * 0.04;
        ctaRef.current.style.transform = `scale(${scale})`;
      }

      // 5. Copy da 2ª parte sobre o skyline (~17s - 22.5s, ou seja, frames 255 a 338)
      // Ajustado de t >= 18.2 para que surja somente depois que o avião passar as nuvens (como nas primeiras versões)
      if (endRef.current) {
        let opacity = 0;
        if (t >= 18.2 && t <= 23.0) {
          if (t < 19.8) opacity = (t - 18.2) / 1.6;
          else if (t < 21.5) opacity = 1;
          else opacity = (23.0 - t) / 1.5;
        }
        endRef.current.style.opacity = opacity.toString();
        endRef.current.style.display = opacity === 0 ? 'none' : 'flex';
        const y = 40 * (1 - opacity);
        endRef.current.style.transform = `translateY(${y}px)`;
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



        {/* ABERTURA: palavras-âncora (Blindagem Patrimonial / Dolarização de Patrimônio) */}
        <div
          ref={wordsRef}
          className="absolute bottom-[14vh] md:bottom-[11vh] left-0 right-0 px-6 sm:px-10 md:px-16 z-10 pointer-events-none"
          style={{ opacity: 1, transform: 'translateY(0px)' }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between w-full max-w-7xl mx-auto gap-6 md:gap-4 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start shrink-0">
              <h1 className="font-cinzel text-[22px] sm:text-[28px] md:text-[2.8vw] font-normal tracking-tight leading-[1.1] text-white whitespace-nowrap drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)]">
                <LuxReveal delay={0.2}>Blindagem</LuxReveal>
                <br className="hidden md:inline" />
                <span className="md:hidden"> </span>
                <LuxReveal delay={0.4}>Patrimonial</LuxReveal>
              </h1>
            </div>

            <div className="flex flex-col items-center md:items-end shrink-0">
              <h1 className="font-cinzel text-[22px] sm:text-[28px] md:text-[2.8vw] font-normal tracking-tight leading-[1.1] text-white whitespace-nowrap drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] md:text-right">
                <LuxReveal delay={0.6}>Dolarização</LuxReveal>
                <br className="hidden md:inline" />
                <span className="md:hidden"> </span>
                <LuxReveal delay={0.8}>de Patrimônio</LuxReveal>
              </h1>
            </div>
          </div>
        </div>

        {/* PORTA FECHADA (~6-8s): CTA limpa — SOMENTE o botão (posicionado abaixo da porta) */}
        <div
          ref={ctaRef}
          className="absolute inset-x-0 bottom-[12vh] flex justify-center z-10 pointer-events-none px-4"
          style={{ opacity: 0, display: 'none' }}
        >
          <button
            onClick={onCtaClick}
            className="pointer-events-auto relative group font-inter tracking-[0.18em] text-[11px] md:text-[15px] uppercase rounded-full transition-all duration-500 cursor-pointer overflow-hidden text-black bg-gradient-to-r from-[#B8912A] via-[#F6DE8A] to-[#B8912A] font-bold px-8 md:px-12 py-4 md:py-5 ring-1 ring-[#F6DE8A]/50 shadow-[0_8px_50px_rgba(214,175,64,0.55),0_0_0_1px_rgba(0,0,0,0.2)_inset] hover:shadow-[0_10px_70px_rgba(214,175,64,0.85)] hover:scale-[1.06]"
          >
            <div className="absolute inset-0 bg-white/50 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">Solicitar Diagnóstico Patrimonial</span>
          </button>
        </div>

        {/* MEIO: copy da 2ª parte sobreposta ao skyline — com respiro, sem abafar */}
        <div
          ref={endRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10 pointer-events-none"
          style={{ opacity: 0, display: 'none' }}
        >
          {/* scrim localizado só atrás do texto (radial) — dá contraste sem abafar a cena */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_45%_at_center,_rgba(0,0,0,0.55),_transparent_70%)]" />
          <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
            <h2 className="font-inter font-semibold uppercase text-lg md:text-[32px] leading-[1.15] tracking-[0.03em] text-white/90 drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]">
              Não vendemos empresas.
            </h2>
            <h2 className="font-cinzel italic text-[28px] sm:text-[36px] md:text-[clamp(52px,6.6vw,88px)] font-semibold tracking-[-0.01em] leading-[1.1] md:leading-[0.98] bg-clip-text text-transparent bg-gradient-to-b from-[#9FF3D2] via-[#17C57E] to-[#0A6E47] drop-shadow-[0_2px_50px_rgba(20,200,126,0.5)] max-w-4xl mx-auto">
              Construímos máquinas de <br className="hidden md:inline" /> bancabilidade em Dubai.
            </h2>
          </div>
        </div>



        {/* Hint de scroll */}
        <div
          ref={hintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none animate-bounce"
          style={{ opacity: 1, animationDuration: '2.2s' }}
        >
          <span className="font-inter font-semibold text-white/70 text-[11px] tracking-[0.35em] uppercase mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Role para entrar
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#C9A227] to-transparent" />
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
