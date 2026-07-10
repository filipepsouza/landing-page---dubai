import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { LampContainer } from './components/Lamp';
import { PreQualModal } from './components/PreQualModal';
import { OrbitalArchitecture } from './components/OrbitalArchitecture';
import { MetricTabs } from './components/MetricTabs';
import { ScrollText } from './components/ScrollText';
import { Hero } from './components/Hero';

// Importando novos componentes para atender as diretrizes da imagem
import { Scenario } from './components/Scenario';
import { WhyDubai } from './components/WhyDubai';
import { StrategyToExecution } from './components/StrategyToExecution';
import { Solutions } from './components/Solutions';
import { Differentiators } from './components/Differentiators';
import { AboutHabib } from './components/AboutHabib';
import { Faq } from './components/Faq';
import { StrategicMeeting } from './components/StrategicMeeting';

const CTAButton = ({ className = "", onClick, isNavbar = false }: { className?: string; onClick?: () => void; isNavbar?: boolean }) => (
  <button 
    onClick={onClick}
    className={`relative group font-inter tracking-[0.15em] rounded-full transition-all duration-500 cursor-pointer overflow-hidden text-black bg-gradient-to-r from-[#084732] via-[#107C58] to-[#084732] font-bold
      ${isNavbar 
        ? "h-11 px-4 md:px-6 flex items-center justify-center text-[10px] md:text-[12px] shadow-[0_0_15px_rgba(16, 124, 88,0.2)] hover:shadow-[0_0_25px_rgba(16, 124, 88,0.4)]" 
        : "px-8 py-4 text-xs md:text-[14px] shadow-[0_0_20px_rgba(16, 124, 88,0.3)] hover:shadow-[0_0_40px_rgba(16, 124, 88,0.6)] hover:scale-105"
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
      className="pointer-events-none fixed top-0 left-0 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(16, 124, 88,0.08)_0%,_rgba(16, 124, 88,0.02)_45%,_transparent_70%)] z-30 hidden md:block"
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
          {/* Left Column: Logo */}
          <div className="bg-black/40 backdrop-blur-md h-11 px-3 rounded-full border border-white/10 flex items-center justify-center">
            <img src="/logo.png?v=5" alt="Habib Consultancy" className="h-9 w-9 object-cover rounded-full" />
          </div>

          {/* Right Column: CTA Button */}
          <div>
            <CTAButton isNavbar onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </motion.nav>

      {/* SEÇÃO 1: Hero — Video Scrubbing controlado por scroll (ver Hero.tsx) */}
      <Hero onCtaClick={() => setIsModalOpen(true)} />

      {/* SEÇÃO 2: Texto Cinematográfico */}
      <section id="maquina" className="relative min-h-screen flex items-start justify-center -mt-24 md:-mt-48 z-10 overflow-hidden">
        <LampContainer className="bg-transparent">
          <ScrollText />
        </LampContainer>
      </section>

      {/* SEÇÃO 3: O Cenário Atual (NOVO) */}
      <Scenario />

      {/* SEÇÃO 4: Por que os Emirados Árabes (NOVO) */}
      <WhyDubai />

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
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#107C58] to-transparent"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#107C58" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mt-2">
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#107C58]/10 via-black/80 to-black" />
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

      {/* SEÇÃO 12: Perguntas Frequentes (NOVO) */}
      <Faq />

      {/* SEÇÃO 13: Reunião Estratégica (NOVO) */}
      <StrategicMeeting onCtaClick={() => setIsModalOpen(true)} />

      {/* FOOTER — `isolate` mantém o vídeo -z-10 dentro do próprio contexto */}
      <footer className="relative isolate bg-black py-24 px-8 md:px-16 border-t border-white/10 z-20 overflow-hidden">
        {/* Camada de segurança: gradiente sólido atrás do vídeo */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

        {/* Vídeo de fundo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-30"
          src="https://ubnkmtttmvmpminkkasu.supabase.co/storage/v1/object/public/vidd/Dark_ocean_waves_at_night_202606290520.mp4"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="w-full aspect-video bg-neutral-900 border border-white/5 relative overflow-hidden flex items-center justify-center rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80"
              src="https://ubnkmtttmvmpminkkasu.supabase.co/storage/v1/object/public/vidd/Two_women_walking_warehouse_202606290606.mp4"
            />
            <div className="absolute inset-0 border-[0.5px] border-gold/20 m-4 pointer-events-none"></div>
          </div>
          
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <h3 className="font-cinzel text-xl md:text-2xl font-normal text-white mb-4">HABIB CONSULTANCY.</h3>
            <p className="text-white/40 font-inter text-sm md:text-base max-w-sm mb-12">
              Operação confidencial. Estruturação, blindagem e escala.
            </p>
            
            <CTAButton onClick={() => setIsModalOpen(true)} />
            
            <p className="text-white/20 font-inter text-xs mt-16">
              © 2026. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Luxury Pre-Qualification Form Modal */}
      <PreQualModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
