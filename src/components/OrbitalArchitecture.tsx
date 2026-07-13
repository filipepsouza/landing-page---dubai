import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Cpu, TrendingUp, ShieldCheck, Coins, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: "Estrutura",
    subtitle: "Setup Mainland & Visto",
    status: "FASE 01",
    icon: Building2,
    description: "Constituição societária na Zona Franca ou Mainland de Dubai com emissão de vistos de investidor e residência fiscal permanente em tempo recorde.",
    metricLabel: "Prazo Médio",
    metricValue: "15 Dias",
    progress: 100,
  },
  {
    title: "Motor",
    subtitle: "Sistema WPS & Histórico",
    status: "FASE 02",
    icon: Cpu,
    description: "Conexão ao Wage Protection System (WPS), processamento de folha de pagamento corporativa e construção de perfil de crédito bancário de alto rating.",
    metricLabel: "Bancabilidade",
    metricValue: "Nível Forte",
    progress: 100,
  },
  {
    title: "Alavancagem",
    subtitle: "Crédito & Ativos Reais",
    status: "FASE 03",
    icon: TrendingUp,
    description: "Alavancagem estruturada junto aos principais bancos dos Emirados Árabes para aquisição de ativos imobiliários com taxas locais.",
    metricLabel: "Custo de Crédito",
    metricValue: "3.99% a.a.",
    progress: 85,
  },
  {
    title: "Blindagem",
    subtitle: "Proteção & Offshore",
    status: "FASE 04",
    icon: ShieldCheck,
    description: "Estruturação de holdings e trusts offshore que asseguram blindagem jurídica contra intempéries políticas e fiscais no país de origem.",
    metricLabel: "Proteção",
    metricValue: "100% Legal",
    progress: 100,
  },
  {
    title: "Liquidez",
    subtitle: "Fluxo em Moeda Forte",
    status: "FASE 05",
    icon: Coins,
    description: "Escoamento legal de lucros e dividendos em AED/USD, livre de flutuações cambiais, consolidando patrimônio líquido global.",
    metricLabel: "Conversibilidade",
    metricValue: "Irrestrita",
    progress: 100,
  }
];

interface OrbitNodeProps {
  step: typeof steps[0];
  isActive: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

const OrbitNode: React.FC<OrbitNodeProps> = ({
  step,
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick
}) => {
  const Icon = step.icon;

  return (
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      className="flex flex-col items-center justify-center pointer-events-auto relative"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {/* Hover Particles (green, micro, discreet, vanishing) */}
      {isHovered && !isActive && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
          <motion.span 
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: -16, y: -10, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-1 h-1 rounded-full bg-emeraldBright"
          />
          <motion.span 
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: 14, y: -14, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute w-1 h-1 rounded-full bg-emeraldBright"
          />
          <motion.span 
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: 4, y: 16, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute w-1 h-1 rounded-full bg-emeraldBright"
          />
        </div>
      )}

      {/* Node Button */}
      <button
        onClick={onClick}
        className={`w-12 h-12 rounded-full border flex items-center justify-center cursor-pointer shadow-lg relative transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] z-10
          ${isActive
            ? "bg-gradient-to-br from-[#0B5D3B] via-[#12A56B] to-[#0B5D3B] border-gold text-black scale-110 shadow-[0_0_30px_rgba(18,165,107,0.65)]"
            : isHovered
              ? "bg-black/95 border-gold/45 text-white scale-105 shadow-[0_0_15px_rgba(18,165,107,0.3)] opacity-100"
              : "bg-black/90 border-white/10 text-white/55 opacity-60"
          }`}
      >
        {/* Inner Ring when Active */}
        {isActive && (
          <div className="absolute inset-0.5 rounded-full border border-black/15 pointer-events-none" />
        )}
        
        <Icon className={`w-5 h-5 transition-transform duration-350 ${isActive ? "scale-110 brightness-125 text-black" : "text-current"}`} />

        {/* Active Pulse Halos */}
        {isActive && (
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <span className="absolute inset-[-8px] rounded-full bg-gold/20 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="absolute inset-[-14px] rounded-full bg-gold/10 animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]" />
          </div>
        )}
      </button>

      {/* Node Label */}
      <span
        className={`absolute top-14 text-[9px] font-inter font-semibold uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap pointer-events-none
          ${isActive 
            ? "text-gold font-bold scale-105 drop-shadow-[0_0_8px_rgba(18,165,107,0.4)] opacity-100" 
            : isHovered 
              ? "text-white/80 opacity-100" 
              : "text-white/40 opacity-60"
          }`}
      >
        {step.title}
      </span>
    </motion.div>
  );
};

export const OrbitalArchitecture = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const angles = [270, 342, 54, 126, 198]; // Ângulos correspondentes (topo, dir-cima, dir-baixo, esq-baixo, esq-cima)

  const handleNext = () => {
    setActiveStep((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % steps.length;
    });
  };

  const activeData = activeStep !== null ? steps[activeStep] : null;
  const ActiveIcon = activeData ? activeData.icon : null;

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* DESKTOP VIEW (lg e acima): Two-Column Layout */}
      <div className="hidden lg:grid grid-cols-2 gap-16 items-center w-full max-w-5xl mx-auto mt-8">
        
        {/* Column 1: Orbital Wheel */}
        <div className="relative w-[500px] h-[500px] flex items-center justify-center select-none mx-auto">
          {/* Concentric Golden Tracks */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] pointer-events-none z-0">
            {/* Outer track: 180s rotation */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-gold/15 shadow-[0_0_40px_rgba(18,165,107,0.05),_inset_0_0_20px_rgba(18,165,107,0.02)]"
            />
            {/* Dashed track: 150s counter-rotation */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-dashed border-gold/5"
            />
            {/* Inner track: 130s rotation */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-white/5"
            />
          </div>

          {/* Watch-style Bezel ticks (Mechanical luxury watch face feel) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 pointer-events-none z-0">
            <div className="w-full h-full rounded-full border border-gold/10 flex items-center justify-center animate-[spin_120s_linear_infinite] relative">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-[1px] h-1.5 bg-gold/30" 
                  style={{ transform: `rotate(${i * 30}deg) translateY(-52px)` }} 
                />
              ))}
            </div>
          </div>

          {/* Background reactive glow */}
          <AnimatePresence>
            {activeStep !== null && (
              <motion.div
                key={`glow-${activeStep}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute w-48 h-48 rounded-full bg-emerald/30 blur-[60px] pointer-events-none z-0"
                style={{
                  left: `calc(50% + ${Math.cos((angles[activeStep] * Math.PI) / 180) * 160}px - 96px)`,
                  top: `calc(50% + ${Math.sin((angles[activeStep] * Math.PI) / 180) * 160}px - 96px)`,
                }}
              />
            )}
          </AnimatePresence>

          {/* Central Glowing Core: Logo Oficial da Consultoria */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center pointer-events-none z-10">
            {/* Translucent Ring 1 (Clockwise) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-24 h-24 rounded-full border border-gold/10"
            />
            {/* Translucent Ring 2 (Counter-Clockwise) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-20 h-20 rounded-full border border-dashed border-gold/5"
            />
            {/* Orbiting Gold Particles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-28 h-28"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold/40 blur-[0.5px]" />
              <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-gold/30" />
            </motion.div>
            {/* Core Body with Pulse & Gold Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.03, 1],
                boxShadow: [
                  "0 0 20px rgba(217, 183, 90, 0.15), inset 0 0 10px rgba(217, 183, 90, 0.05)",
                  "0 0 35px rgba(217, 183, 90, 0.35), inset 0 0 15px rgba(217, 183, 90, 0.1)",
                  "0 0 20px rgba(217, 183, 90, 0.15), inset 0 0 10px rgba(217, 183, 90, 0.05)"
                ]
              }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#121212] to-black border border-gold/30 flex items-center justify-center z-10 overflow-hidden"
            >
              <img src="/logo.png?v=5" alt="Habib Consultancy Logo" className="w-10 h-10 object-contain translate-x-[2.5px] translate-y-[2.5px] rounded-full" />
            </motion.div>
          </div>

          {/* Rotating Wrapper for Orbiting Nodes */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] pointer-events-none z-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="w-full h-full relative"
            >
              {/* Active Connector Ray (laser pointer line) */}
              {activeStep !== null && (
                <motion.div 
                  key={activeStep}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // easeOutExpo
                  className="absolute w-[50%] h-[1.5px] bg-gradient-to-r from-gold/0 via-gold/30 to-gold z-0"
                  style={{ 
                    left: "50%",
                    top: "50%",
                    originX: 0,
                    originY: 0.5,
                    rotate: angles[activeStep],
                    boxShadow: '0 0 8px rgba(18, 165, 107, 0.2)'
                  }}
                >
                  {/* Travelling Laser Energy Pulse */}
                  <motion.div
                    initial={{ left: "0%", opacity: 1 }}
                    animate={{ left: "100%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute top-1/2 -translate-y-1/2 w-14 h-[2px] bg-gradient-to-r from-transparent via-emeraldBright to-transparent shadow-[0_0_12px_#3CDA96]"
                    style={{ transform: "translateY(-50%)" }}
                  />
                </motion.div>
              )}

              {/* Orbiting Nodes */}
              {steps.map((step, idx) => {
                const angle = angles[idx];
                const angleRad = (angle * Math.PI) / 180;
                const x = Math.cos(angleRad) * 50; // 50% é a borda do contêiner pai
                const y = Math.sin(angleRad) * 50;
                const isActive = activeStep === idx;

                return (
                  <div
                    key={idx}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}% - 24px)`, // 24px metade da largura do nó (w-12)
                      top: `calc(50% + ${y}% - 24px)`,
                    }}
                  >
                    <OrbitNode
                      step={step}
                      isActive={isActive}
                      isHovered={hoveredStep === idx}
                      onHoverStart={() => setHoveredStep(idx)}
                      onHoverEnd={() => setHoveredStep(null)}
                      onClick={() => setActiveStep(idx)}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Column 2: Detailed Info Card */}
        <div className="flex justify-center items-center h-full">
          <div className="w-[360px] h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep ?? 'default'}
                initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ 
                  opacity: 0, 
                  y: -15, 
                  filter: "blur(12px)",
                  transition: { duration: 0.22, ease: "easeIn" }
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.16, 1, 0.3, 1] // easeOutExpo
                }}
                className="w-full h-full bg-[#050505]/95 backdrop-blur-2xl border border-gold/15 rounded-2xl p-7 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.85)] relative overflow-hidden"
              >
                {/* Corner Bracket decorations */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-gold/40 rounded-tl pointer-events-none" />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-gold/40 rounded-tr pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-gold/40 rounded-bl pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-gold/40 rounded-br pointer-events-none" />

                {/* Background ambient lighting */}
                <div className="absolute -top-12 -left-12 w-28 h-28 bg-gold/15 rounded-full blur-2xl pointer-events-none animate-pulse" />

                {activeData ? (
                  <>
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-gold/10 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20 shadow-[0_0_15px_rgba(18, 165, 107,0.15)]">
                          {ActiveIcon && <ActiveIcon className="w-4 h-4 text-gold" />}
                        </div>
                        <div>
                          <span className="text-[9px] font-semibold text-gold/60 uppercase tracking-widest font-inter">{activeData.status}</span>
                          <h4 className="font-inter text-xs font-semibold text-white tracking-wider uppercase">{activeData.title}</h4>
                        </div>
                      </div>
                      <span className="text-[9px] font-inter font-semibold text-white/30 tracking-widest uppercase">Dubai Setup</span>
                    </div>

                    {/* Card Body */}
                    <div className="flex-1 flex flex-col justify-center py-4">
                      <h3 className="font-inter text-xs sm:text-sm text-white mb-2 leading-snug font-bold uppercase tracking-wide">
                        {activeData.subtitle}
                      </h3>
                      <p className="text-white/60 text-[11.5px] leading-relaxed font-light">
                        {activeData.description}
                      </p>
                    </div>

                    {/* Card Footer: Progress & Next Step */}
                    <div className="border-t border-gold/10 pt-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-white/40">{activeData.metricLabel}</span>
                        <span className="text-[10px] font-mono text-gold font-bold">{activeData.metricValue}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${activeData.progress}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-gold to-[#0B5D3B] rounded-full shadow-[0_0_8px_rgba(18, 165, 107,0.6)]"
                        />
                      </div>

                      {/* Next Step trigger */}
                      <button
                        onClick={handleNext}
                        className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-inter text-white/50 hover:text-gold transition-colors duration-300 self-end cursor-pointer font-bold tracking-wider uppercase"
                      >
                        PRÓXIMA FASE <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Default Welcome Header */}
                    <div className="flex items-center justify-between border-b border-gold/10 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center border border-gold/20 shadow-[0_0_10px_rgba(18, 165, 107,0.05)]">
                          <div className="w-3 h-3 border border-gold rotate-45 flex items-center justify-center">
                            <div className="w-0.5 h-0.5 bg-gold" />
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] font-semibold text-gold/40 uppercase tracking-widest font-inter">START</span>
                          <h4 className="font-inter text-xs font-semibold text-white/80 tracking-wider uppercase">A Arquitetura</h4>
                        </div>
                      </div>
                      <span className="text-[9px] font-inter font-semibold text-white/30 tracking-widest uppercase">Dubai Setup</span>
                    </div>

                    {/* Default Welcome Body */}
                    <div className="flex-1 flex flex-col justify-center py-4">
                      <h3 className="font-inter text-xs sm:text-sm text-white mb-2 leading-snug font-bold uppercase tracking-wide">
                        Selecione uma fase da máquina
                      </h3>
                      <p className="text-white/60 text-[11.5px] leading-relaxed font-light">
                        Clique em qualquer uma das fases na engrenagem orbital para visualizar os detalhes sobre constituição corporativa, WPS, alavancagem financeira e blindagem de patrimônio global em Dubai.
                      </p>
                    </div>

                    {/* Default Welcome Footer */}
                    <div className="border-t border-gold/10 pt-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-white/30">Status da Operação</span>
                        <span className="text-[10px] font-mono text-gold/60 font-bold">Pronta para Iniciar</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                        <div className="h-full w-0 bg-gold" />
                      </div>
                      <button
                        onClick={handleNext}
                        className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-inter text-white/50 hover:text-gold transition-colors duration-300 self-end cursor-pointer font-bold tracking-wider uppercase"
                      >
                        INICIAR PASSO A PASSO <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* MOBILE/TABLET VIEW (Menor que lg): Horizontal Tab Selector & Expanded Detail Card */}
      <div className="lg:hidden w-full flex flex-col gap-6 px-4">
        
        {/* Horizontal Navigation List */}
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none justify-start md:justify-center">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 cursor-pointer
                  ${isActive
                    ? "bg-gold text-black border-gold font-bold shadow-[0_0_15px_rgba(18, 165, 107,0.3)]"
                    : "bg-black/50 text-white/60 border-white/10 hover:text-white"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-inter text-[10px] font-semibold uppercase tracking-wider">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep ?? 'default-mobile'}
            initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ 
              opacity: 0, 
              y: -15, 
              filter: "blur(12px)",
              transition: { duration: 0.22, ease: "easeIn" }
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.16, 1, 0.3, 1] // easeOutExpo
            }}
            className="w-full bg-[#050505]/95 backdrop-blur-2xl border border-gold/15 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Corner Bracket decorations */}
            <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-gold/40 rounded-tl pointer-events-none" />
            <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-gold/40 rounded-tr pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-gold/40 rounded-bl pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-gold/40 rounded-br pointer-events-none" />

            {/* Ambient background light */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-gold/15 rounded-full blur-2xl pointer-events-none animate-pulse" />

            {activeData ? (
              <>
                <div className="flex items-center justify-between border-b border-gold/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20 shadow-[0_0_12px_rgba(18, 165, 107,0.15)]">
                      {ActiveIcon && <ActiveIcon className="w-4 h-4 text-gold" />}
                    </div>
                    <div>
                      <span className="text-[9px] font-semibold text-gold/60 uppercase tracking-widest font-inter">{activeData.status}</span>
                      <h4 className="font-inter text-xs font-semibold text-white tracking-wider uppercase">{activeData.title}</h4>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-inter text-xs sm:text-sm text-white mb-2 leading-snug font-bold uppercase tracking-wide">
                    {activeData.subtitle}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    {activeData.description}
                  </p>
                </div>

                <div className="border-t border-gold/10 pt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/40">{activeData.metricLabel}</span>
                    <span className="text-[10px] font-mono text-gold font-bold">{activeData.metricValue}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                    <div className="h-full bg-gradient-to-r from-gold to-[#0B5D3B] rounded-full shadow-[0_0_8px_rgba(18, 165, 107,0.6)]" style={{ width: `${activeData.progress}%` }} />
                  </div>
                  <button
                    onClick={handleNext}
                    className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-inter text-white/50 hover:text-gold transition-colors duration-300 self-end cursor-pointer font-bold tracking-wider uppercase"
                  >
                    PRÓXIMA FASE <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-gold/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center border border-gold/20 shadow-[0_0_10px_rgba(18, 165, 107,0.05)]">
                      <div className="w-3 h-3 border border-gold rotate-45 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 bg-gold" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gold/40 uppercase tracking-widest">START</span>
                      <h4 className="font-cinzel text-xs font-semibold text-white tracking-wider">A Arquitetura</h4>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-inter text-xs sm:text-sm text-white mb-2 leading-snug font-bold uppercase tracking-wide">
                    Selecione uma fase acima
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    Clique em qualquer uma das abas acima para visualizar os detalhes sobre a estruturação do seu patrimônio internacional e alavancagem em Dubai.
                  </p>
                </div>

                <div className="border-t border-gold/10 pt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-inter font-semibold text-white/30">Status do Motor</span>
                    <span className="text-[10px] font-inter font-semibold text-gold/60">Pronto para Iniciar</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                    <div className="h-full w-0 bg-gold" />
                  </div>
                  <button
                    onClick={handleNext}
                    className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-inter text-white/50 hover:text-gold transition-colors duration-300 self-end cursor-pointer font-bold tracking-wider uppercase"
                  >
                    INICIAR PASSO A PASSO <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
