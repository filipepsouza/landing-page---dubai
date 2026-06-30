import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LuxReveal } from './components/LuxReveal';
import { LampContainer } from './components/Lamp';
import { PreQualModal } from './components/PreQualModal';
import { OrbitalArchitecture } from './components/OrbitalArchitecture';
import { MetricTabs } from './components/MetricTabs';
import { ScrollText } from './components/ScrollText';

// Importando novos componentes para atender as diretrizes da imagem
import { Scenario } from './components/Scenario';
import { WhyDubai } from './components/WhyDubai';
import { StrategyToExecution } from './components/StrategyToExecution';
import { FreeZoneMainland } from './components/FreeZoneMainland';
import { Solutions } from './components/Solutions';
import { Differentiators } from './components/Differentiators';
import { AboutHabib } from './components/AboutHabib';
import { Faq } from './components/Faq';
import { StrategicMeeting } from './components/StrategicMeeting';

const CTAButton = ({ className = "", onClick, isNavbar = false }: { className?: string; onClick?: () => void; isNavbar?: boolean }) => (
  <button 
    onClick={onClick}
    className={`relative group font-cinzel tracking-[0.15em] rounded-full transition-all duration-500 cursor-pointer overflow-hidden text-black bg-gradient-to-r from-[#8A7322] via-[#D4AF37] to-[#8A7322] font-black
      ${isNavbar 
        ? "h-11 px-4 md:px-6 flex items-center justify-center text-[9px] md:text-[10px] shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]" 
        : "px-8 py-4 text-sm md:text-base shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:scale-105"
      } ${className}`}
  >
    <div className="absolute inset-0 bg-white/40 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
    <span className="relative z-10">
      {isNavbar ? (
        <>
          <span className="hidden sm:inline">SOLICITAR ACESSO CONFIDENCIAL</span>
          <span className="sm:hidden">SOLICITAR ACESSO</span>
        </>
      ) : (
        "SOLICITAR ACESSO CONFIDENCIAL"
      )}
    </span>
  </button>
);

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

  const { scrollY } = useScroll();
  const heroVideoY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroVideoOpacity = useTransform(scrollY, [0, 600], [0.3, 0]);
  const heroTextOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroTextY = useTransform(scrollY, [0, 400], [0, 100]);
  const heroWatermarkY = useTransform(scrollY, [0, 800], [0, -200]);
  const heroWatermarkScale = useTransform(scrollY, [0, 800], [1, 0.8]);

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div ref={containerRef} className="bg-deepBlack text-white min-h-screen font-inter selection:bg-gold/30 selection:text-gold">
      
      {/* HEADER (Logo à esquerda, CTA à direita) */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none"
      >
        <div className="w-full flex items-center justify-between px-4 sm:px-8 md:px-16 pointer-events-auto">
          {/* Left Column: Logo */}
          <div className="bg-black/40 backdrop-blur-md h-11 px-6 rounded-full border border-white/10 flex items-center justify-center">
            {/* Logo Pill */}
            <div className="w-5 h-5 border-2 border-gold rotate-45 transform flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-gold"></div>
            </div>
          </div>

          {/* Right Column: CTA Button */}
          <div>
            <CTAButton isNavbar onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </motion.nav>

      {/* SEÇÃO 1: Hero — `isolate` cria um stacking context próprio para o vídeo em -z-10 */}
      <section className="relative isolate h-screen flex flex-col justify-end pb-24 px-4 sm:px-8 md:px-16 overflow-hidden">
        {/* Camada de segurança: gradiente sólido atrás do vídeo */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

        {/* Vídeo de fundo */}
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{ y: heroVideoY, opacity: heroVideoOpacity }}
          className="absolute inset-0 w-full h-[120%] object-cover -z-10 -top-[10%]"
          src="https://ubnkmtttmvmpminkkasu.supabase.co/storage/v1/object/public/vidd/55.mp4"
        />

        {/* Vinheta de leitura */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-deepBlack/50 to-deepBlack pointer-events-none" />

        {/* Giant Watermark Text */}
        <motion.div 
          style={{ y: heroWatermarkY, scale: heroWatermarkScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none z-0 px-4"
        >
          <h1 className="font-cinzel text-[10vw] md:text-[8vw] font-black opacity-[0.05] md:opacity-[0.20] bg-clip-text text-transparent bg-gradient-to-r from-white via-gold to-white tracking-tighter select-none text-center whitespace-nowrap">
            HABIB CONSULTANCY
          </h1>
        </motion.div>

        {/* Bottom Line Content */}
        <motion.div 
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="relative z-10 grid grid-cols-2 md:flex md:flex-row items-center md:items-end justify-between w-full max-w-7xl mx-auto border-t border-white/10 pt-8 gap-y-6"
        >
          <div className="order-1 md:order-1 col-span-1 flex flex-col items-start text-left shrink-0">
            <h1 className="font-cinzel text-[7vw] sm:text-[5vw] md:text-[6vw] font-light tracking-tighter leading-[0.85] text-white whitespace-nowrap">
              <LuxReveal delay={0.2}>Zero</LuxReveal>
              <br />
              <LuxReveal delay={0.4}>Imposto</LuxReveal>
            </h1>
          </div>
          
          <div className="order-3 md:order-2 col-span-2 md:col-auto w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl md:mb-2 md:mx-8 text-center md:text-left mx-auto">
            <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed">
              A engenharia definitiva do patrimônio. Estruturas paramétricas em Dubai que destravam acesso irrestrito a capital em moeda forte. Deixe o mercado comum para trás.
            </p>
          </div>

          <div className="order-2 md:order-3 col-span-1 flex flex-col items-end text-right shrink-0">
            <h1 className="font-cinzel text-[7vw] sm:text-[5vw] md:text-[6vw] font-light tracking-tighter leading-[0.85] text-white whitespace-nowrap">
              <LuxReveal delay={0.6}>Moeda</LuxReveal>
              <br />
              <LuxReveal delay={0.8}>Forte</LuxReveal>
            </h1>
          </div>
        </motion.div>
      </section>

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
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mt-2">
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-black/80 to-black" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-cinzel text-4xl md:text-6xl font-light text-white leading-tight tracking-tighter text-center">
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

      {/* SEÇÃO 8: Free Zone ou Mainland (NOVO) */}
      <FreeZoneMainland />

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
            <h3 className="font-cinzel text-xl md:text-2xl text-white mb-4">HABIB CONSULTANCY.</h3>
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
