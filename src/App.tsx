import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { PreQualModal } from './components/PreQualModal';
import { OrbitalArchitecture } from './components/OrbitalArchitecture';
import { MetricTabs } from './components/MetricTabs';
import { Hero } from './components/Hero';

import { Scenario } from './components/Scenario';
import { WhyDubai } from './components/WhyDubai';
import { Simulator } from './components/Simulator';
import { StrategyToExecution } from './components/StrategyToExecution';
import { Solutions } from './components/Solutions';
import { Differentiators } from './components/Differentiators';
import { AboutHabib } from './components/AboutHabib';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { StrategicMeeting } from './components/StrategicMeeting';

const CTAButton = ({ className = "", onClick, isNavbar = false }: { className?: string; onClick?: () => void; isNavbar?: boolean }) => (
  <button 
    onClick={onClick}
    className={`relative group font-inter tracking-[0.15em] rounded-full transition-all duration-500 cursor-pointer overflow-hidden text-black bg-gradient-to-r from-[#B8912A] via-[#F6DE8A] to-[#B8912A] font-bold ring-1 ring-[#F6DE8A]/40
      ${isNavbar
        ? "h-11 px-4 md:px-6 flex items-center justify-center text-[10px] md:text-[12px] shadow-[0_0_18px_rgba(214,175,64,0.3)] hover:shadow-[0_0_30px_rgba(214,175,64,0.55)]"
        : "px-8 py-4 text-xs md:text-[14px] shadow-[0_0_24px_rgba(214,175,64,0.4)] hover:shadow-[0_0_45px_rgba(214,175,64,0.7)] hover:scale-105"
      } ${className}`}
  >
    <div className="absolute inset-0 bg-white/40 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
    <span className="relative z-10">
      {isNavbar ? (
        <>
          <span className="hidden sm:inline">SOLICITAR DIAGNÓSTICO PATRIMONIAL</span>
          <span className="sm:hidden">SOLICITAR DIAGNÓSTICO</span>
        </>
      ) : (
        "SOLICITAR DIAGNÓSTICO PATRIMONIAL"
      )}
    </span>
  </button>
);

const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuração física de mola suave
  const springConfig = { stiffness: 80, damping: 20, mass: 0.6 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Centraliza o círculo de 300px na posição do mouse
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: glowX,
        y: glowY,
      }}
      className="pointer-events-none fixed top-0 left-0 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(11,93,59,0.12)_0%,_rgba(212,175,55,0.03)_45%,_transparent_70%)] z-40 hidden md:block"
    />
  );
};

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Scroll Scrubbing 3D Agressivo para a Seção de Métricas
  const metricsSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: metricsScroll } = useScroll({
    target: metricsSectionRef,
    offset: ["start end", "center center"]
  });
  
  const metricsRotateX = useTransform(metricsScroll, [0, 1], ["85deg", "0deg"]);
  const metricsY = useTransform(metricsScroll, [0, 1], ["600px", "0px"]);
  const metricsScale = useTransform(metricsScroll, [0, 1], [0.3, 1]);
  const metricsOpacity = useTransform(metricsScroll, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="bg-deepBlack text-white min-h-screen font-inter selection:bg-gold/30 selection:text-gold">
      {/* Efeito de brilho fluído que segue o cursor */}
      <MouseGlow />
      
      {/* HEADER (Logo à esquerda, CTA à direita) */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none"
      >
        <div className="w-full flex items-center justify-between px-4 sm:px-8 md:px-16 pointer-events-auto">
          {/* Left Column: Logo & Text */}
          <div className="h-16 md:h-[4.5rem] flex items-center gap-3 md:gap-4">
            <img src="/logo.png?v=5" alt="Habib Consultancy Logo" className="h-11 w-11 md:h-14 md:w-14 object-contain drop-shadow-md" />
            <div className="flex flex-col items-start justify-center border-l border-white/10 pl-3 md:pl-4 py-0.5">
              <span className="font-cinzel text-sm sm:text-base md:text-lg font-medium text-[#C9A227] tracking-[0.25em] leading-none">HABIB</span>
              <span className="font-cinzel text-[7px] sm:text-[8px] md:text-[9px] font-bold text-white/70 tracking-[0.3em] leading-none mt-1">CONSULTANCY</span>
            </div>
          </div>

          {/* Right Column: CTA Button */}
          <div>
            <CTAButton isNavbar onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </motion.nav>

      {/* SEÇÃO 1: Hero — Video Scrubbing controlado por scroll (ver Hero.tsx) */}
      <Hero onCtaClick={() => setIsModalOpen(true)} />

      {/* SEÇÃO 3: O Cenário Atual (NOVO) */}
      <div className="-mt-24 md:-mt-48 relative z-20">
        <Scenario />
      </div>

      {/* SEÇÃO 4: Por que os Emirados Árabes (NOVO) */}
      <WhyDubai />

      {/* SEÇÃO SIMULADOR (NOVO) */}
      <Simulator onCtaClick={() => setIsModalOpen(true)} />

      {/* SEÇÃO 5: As Métricas da Operação */}
      <section id="metricas" ref={metricsSectionRef} className="min-h-screen flex items-center px-4 sm:px-8 md:px-16 py-16 md:py-24 relative z-30">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/[0.03] via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto w-full relative z-10" style={{ perspective: '2000px' }}>
          <motion.div
            style={{ 
              rotateX: metricsRotateX, 
              y: metricsY, 
              scale: metricsScale, 
              opacity: metricsOpacity,
              transformStyle: "preserve-3d" 
            }}
          >
            <MetricTabs onCtaClick={() => setIsModalOpen(true)} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col items-center justify-center mt-16"
          >
            {/* Indicador de Scroll Luxuoso */}
            <motion.div
              animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#12A56B] to-transparent"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#12A56B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mt-2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO 6: Da Estratégia à Execução (NOVO) */}
      <StrategyToExecution />

      {/* SEÇÃO 7: Como Trabalhamos (A Arquitetura da Máquina) */}
      <section id="arquitetura" className="min-h-screen py-16 md:py-24 px-4 sm:px-8 md:px-16 relative overflow-hidden z-20 bg-black flex flex-col items-center justify-center">
        
        {/* 1. GRID PARAMÉTRICO (Textura de Fundo) */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
          }}
        />

        {/* 2 & 3. BACKLIGHT MONOLÍTICO COM ANIMAÇÃO RESPIRATÓRIA */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#12A56B]/10 via-black/80 to-black" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-cinzel text-4xl md:text-6xl font-normal text-white leading-tight tracking-tight text-center">
              Como Trabalhamos
            </h2>
            <p className="text-white/60 text-xs md:text-sm text-center max-w-xl mx-auto font-light leading-relaxed">
              Nossa metodologia de trabalho segue um processo estruturado e transparente, garantindo excelência técnica desde o diagnóstico até o acompanhamento pós-entrega.
            </p>
          </div>

          <div className="flex justify-center w-full mt-4">
            <OrbitalArchitecture />
          </div>
        </div>
      </section>

      {/* SEÇÃO 9: Soluções (NOVO) */}
      <Solutions />

      {/* SEÇÃO 10: Diferenciais da HABIB (NOVO) */}
      <Differentiators />

      {/* SEÇÃO 11: Sobre a HABIB (NOVO) */}
      <AboutHabib />

      {/* SEÇÃO 11.5: Resultados (NOVO) */}
      <Testimonials />

      {/* SEÇÃO 12: Perguntas Frequentes (NOVO) */}
      <Faq />

      {/* SEÇÃO 13: Reunião Estratégica (NOVO) */}
      <StrategicMeeting onCtaClick={() => setIsModalOpen(true)} />

      {/* FOOTER */}
      <footer className="relative bg-black py-16 md:py-24 px-6 sm:px-8 md:px-16 border-t border-white/10 z-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-[#040906]/50 to-black pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Column: Logo & Description (span 6) */}
            <div className="col-span-1 md:col-span-6 flex flex-col items-start gap-6 text-left">
              <div className="flex items-center gap-3">
                {/* Gold Hexagon Cat Logo */}
                <div className="w-9 h-9 flex items-center justify-center shrink-0">
                  <img src="/logo.png?v=5" alt="Habib Consultancy Logo" className="w-full h-full object-contain" />
                </div>
                {/* Stacked Text */}
                <div className="flex flex-col items-start justify-center border-l border-white/10 pl-3 py-0.5">
                  <span className="font-cinzel text-sm sm:text-base font-medium text-[#C9A227] tracking-[0.25em] leading-none">HABIB</span>
                  <span className="font-cinzel text-[7px] sm:text-[8px] font-bold text-white/70 tracking-[0.3em] leading-none mt-1">CONSULTANCY</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/60 font-inter text-sm max-w-md font-light leading-relaxed">
                Engenharia de patrimônio imobiliário em Dubai. Estruturação, blindagem e escala — com presença física nos Emirados e atendimento em português.
              </p>
            </div>

            {/* Middle Column: Navigation Links (span 3) */}
            <div className="col-span-1 md:col-span-3 flex flex-col items-start gap-4 text-left">
              <span className="font-inter text-[11px] font-bold text-emeraldBright uppercase tracking-[0.25em]">
                Navegação
              </span>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#cenario" className="text-white/60 hover:text-emeraldBright transition-colors duration-300 font-inter text-sm font-light">
                    O cenário
                  </a>
                </li>
                <li>
                  <a href="#por-que-dubai" className="text-white/60 hover:text-emeraldBright transition-colors duration-300 font-inter text-sm font-light">
                    Por que Dubai
                  </a>
                </li>
                <li>
                  <a href="#simulador" className="text-white/60 hover:text-emeraldBright transition-colors duration-300 font-inter text-sm font-light">
                    Simulador
                  </a>
                </li>
                <li>
                  <a href="#arquitetura" className="text-white/60 hover:text-emeraldBright transition-colors duration-300 font-inter text-sm font-light">
                    Método
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-white/60 hover:text-emeraldBright transition-colors duration-300 font-inter text-sm font-light">
                    Perguntas frequentes
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: Contact Details (span 3) */}
            <div className="col-span-1 md:col-span-3 flex flex-col items-start gap-4 text-left">
              <span className="font-inter text-[11px] font-bold text-emeraldBright uppercase tracking-[0.25em]">
                Contato
              </span>
              <ul className="flex flex-col gap-3 font-inter text-sm font-light">
                <li className="text-white/60 leading-relaxed">
                  Business Bay, Dubai — EAU <span className="italic text-white/30 text-xs block mt-0.5">(endereço completo aqui)</span>
                </li>
                <li>
                  <button onClick={() => setIsModalOpen(true)} className="text-white/60 hover:text-emeraldBright transition-colors duration-300 font-inter text-sm font-light text-left cursor-pointer">
                    WhatsApp direto
                  </button>
                </li>
                <li>
                  <a href="mailto:contato@habibconsultancy.com" className="text-white/60 hover:text-emeraldBright transition-colors duration-300 font-inter text-sm font-light">
                    contato@habibconsultancy.com
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom disclaimer & copyright */}
          <div className="border-t border-white/10 pt-8 mt-4 flex flex-col gap-6">
            <p className="text-[11px] sm:text-xs text-white/30 leading-relaxed font-light text-left max-w-full">
              A Habib Consultancy presta consultoria em estruturação societária e assessoria administrativa nos EAU. Não realiza gestão de recursos de terceiros nem oferta de valores mobiliários. Projeções de crédito e alavancagem são ilustrativas e sujeitas à análise das instituições financeiras locais. Estruturações conduzidas em conformidade com CRS, FATCA e legislação brasileira aplicável.
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] sm:text-xs text-white/20 gap-4 mt-2">
              <span>
                © 2026 Habib Consultancy. Todos os direitos reservados.
              </span>
              <span className="italic">
                Licença comercial EAU nº 000000 (inserir aqui)
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Luxury Pre-Qualification Form Modal */}
      <PreQualModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
