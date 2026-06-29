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

export const OrbitalArchitecture = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

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
          {/* Circular Track Ring (Rotacionando no Sentido Horário) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute w-[80%] h-[80%] rounded-full border border-white/10 pointer-events-none z-0 shadow-[0_0_50px_rgba(212,175,55,0.02)] flex items-center justify-center"
          >
            {/* Linha Tracejada Interna */}
            <div className="absolute inset-2 rounded-full border border-dashed border-white/5" />
          </motion.div>

          {/* Central Glowing Core: Logo Oficial da Consultoria (Gira independentemente) */}
          <div className="absolute w-14 h-14 rounded-full bg-black/90 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.35)] z-10">
            <div className="w-5.5 h-5.5 border-2 border-gold rotate-45 transform flex items-center justify-center animate-[spin_8s_linear_infinite]">
              <div className="w-1.5 h-1.5 bg-gold"></div>
            </div>
          </div>

          {/* Rotating Wrapper for Orbiting Nodes */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute w-[80%] h-[80%] pointer-events-none z-20"
          >
            {/* Orbiting Nodes */}
            {steps.map((step, idx) => {
              const Icon = step.icon;
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
                  {/* Inverse-Rotation container to keep buttons/text upright */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="flex flex-col items-center justify-center pointer-events-auto"
                  >
                    {/* Botão do Nó */}
                    <button
                      onClick={() => setActiveStep(idx)}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 cursor-pointer shadow-lg
                        ${isActive
                          ? "bg-[#D4AF37] border-[#D4AF37] text-black scale-110 shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                          : "bg-black/60 border-white/15 text-white/50 hover:text-white hover:border-white/30 hover:scale-105"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>

                    {/* Rótulo do Nó */}
                    <span
                      className={`absolute top-14 text-[9px] font-cinzel uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap
                        ${isActive ? "text-gold font-bold scale-105" : "text-white/40"}`}
                    >
                      {step.title}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Column 2: Detailed Info Card */}
        <div className="flex justify-center items-center h-full">
          <div className="w-[360px] h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep ?? 'default'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-[#080808]/85 backdrop-blur-2xl border border-white/10 rounded-2xl p-7 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
              >
                {/* Background ambient lighting */}
                <div className="absolute -top-12 -left-12 w-28 h-28 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

                {activeData ? (
                  <>
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20">
                          {ActiveIcon && <ActiveIcon className="w-4 h-4 text-gold" />}
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-gold/60 uppercase tracking-widest">{activeData.status}</span>
                          <h4 className="font-cinzel text-xs font-semibold text-white tracking-wider">{activeData.title}</h4>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Dubai Setup</span>
                    </div>

                    {/* Card Body */}
                    <div className="flex-1 flex flex-col justify-center py-4">
                      <h3 className="font-cinzel text-base text-white mb-2 leading-snug">
                        {activeData.subtitle}
                      </h3>
                      <p className="text-white/60 text-[11px] leading-relaxed font-light">
                        {activeData.description}
                      </p>
                    </div>

                    {/* Card Footer: Progress & Next Step */}
                    <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-white/40">{activeData.metricLabel}</span>
                        <span className="text-[10px] font-mono text-gold font-bold">{activeData.metricValue}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${activeData.progress}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-gold to-[#8A7322] rounded-full"
                        />
                      </div>

                      {/* Next Step trigger */}
                      <button
                        onClick={handleNext}
                        className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-cinzel text-white/50 hover:text-gold transition-colors duration-300 self-end cursor-pointer"
                      >
                        PRÓXIMA FASE <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Default Welcome Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center border border-gold/20">
                          <div className="w-3 h-3 border border-gold rotate-45 flex items-center justify-center">
                            <div className="w-0.5 h-0.5 bg-gold" />
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-gold/40 uppercase tracking-widest">START</span>
                          <h4 className="font-cinzel text-xs font-semibold text-white/80 tracking-wider">A Arquitetura</h4>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase">Dubai Setup</span>
                    </div>

                    {/* Default Welcome Body */}
                    <div className="flex-1 flex flex-col justify-center py-4">
                      <h3 className="font-cinzel text-base text-white mb-2 leading-snug">
                        Selecione uma fase da máquina
                      </h3>
                      <p className="text-white/60 text-[11px] leading-relaxed font-light">
                        Clique em qualquer uma das fases na engrenagem orbital para visualizar os detalhes sobre constituição corporativa, WPS, alavancagem financeira e blindagem de patrimônio global em Dubai.
                      </p>
                    </div>

                    {/* Default Welcome Footer */}
                    <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-white/30">Status da Operação</span>
                        <span className="text-[10px] font-mono text-gold/60 font-bold">Pronta para Iniciar</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-gold" />
                      </div>
                      <button
                        onClick={handleNext}
                        className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-cinzel text-white/50 hover:text-gold transition-colors duration-300 self-end cursor-pointer"
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
                    ? "bg-gold text-black border-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "bg-black/50 text-white/60 border-white/10 hover:text-white"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-cinzel text-[10px] uppercase tracking-wider">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep ?? 'default-mobile'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-[#080808]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Ambient background light */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

            {activeData ? (
              <>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20">
                      {ActiveIcon && <ActiveIcon className="w-4 h-4 text-gold" />}
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gold/60 uppercase tracking-widest">{activeData.status}</span>
                      <h4 className="font-cinzel text-xs font-semibold text-white tracking-wider">{activeData.title}</h4>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-cinzel text-base text-white mb-2 leading-snug">
                    {activeData.subtitle}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    {activeData.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/40">{activeData.metricLabel}</span>
                    <span className="text-[10px] font-mono text-gold font-bold">{activeData.metricValue}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full" style={{ width: `${activeData.progress}%` }} />
                  </div>
                  <button
                    onClick={handleNext}
                    className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-cinzel text-white/50 hover:text-gold transition-colors duration-300 self-end cursor-pointer"
                  >
                    PRÓXIMA FASE <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center border border-gold/20">
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
                  <h3 className="font-cinzel text-base text-white mb-2 leading-snug">
                    Selecione uma fase acima
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed font-light">
                    Clique em qualquer uma das abas acima para visualizar os detalhes sobre a estruturação do seu patrimônio internacional e alavancagem em Dubai.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/30">Status do Motor</span>
                    <span className="text-[10px] font-mono text-gold/60 font-bold">Pronto para Iniciar</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-gold" />
                  </div>
                  <button
                    onClick={handleNext}
                    className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-cinzel text-white/50 hover:text-gold transition-colors duration-300 self-end cursor-pointer"
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
