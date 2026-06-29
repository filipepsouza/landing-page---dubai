import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Percent, TrendingDown, Activity, Globe } from 'lucide-react';

const metricsData = [
  {
    tabTitle: "0% Imposto",
    icon: Percent,
    badge: "Blindagem Fiscal",
    title: "Zero Imposto Pessoa Física",
    description: "Em Dubai, os rendimentos corporativos e dividendos distribuídos a pessoas físicas residentes são totalmente isentos de imposto de renda. Estruturamos sua transição de domicílio fiscal completa em perfeita conformidade com as regras tributárias globais.",
    statValue: "0%",
    statLabel: "IMPOSTO PF"
  },
  {
    tabTitle: "3.99% Custo",
    icon: TrendingDown,
    badge: "Alavancagem Corporativa",
    title: "Custo de Crédito Sob Medida",
    description: "Desbloqueie o acesso a linhas de financiamento imobiliário e corporativo locais com taxas que iniciam em 3.99% ao ano, vinculadas a moedas fortes (AED/USD). Um patamar de juros extremamente competitivo e fora da realidade da América Latina.",
    statValue: "3.99%",
    statLabel: "TAXA AO ANO"
  },
  {
    tabTitle: "84x Alavancagem",
    icon: Activity,
    badge: "Escala Patrimonial",
    title: "Alavancagem Estruturada",
    description: "Utilize estruturas de garantias cruzadas e depósitos remunerados para alavancar seu poder de compra em até 84 vezes. Transformamos aportes iniciais estruturados em múltiplos ativos imobiliários geradores de fluxo de caixa recorrente.",
    statValue: "84x",
    statLabel: "ALAVANCAGEM"
  },
  {
    tabTitle: "31.7M Crédito",
    icon: Globe,
    badge: "Poder de Compra",
    title: "Capacidade de Crédito Ampliada",
    description: "Estruturamos e ativamos o histórico da sua empresa e perfil de crédito corporativo local em Dubai para obter linhas de crédito de até AED 31.7 Milhões (aprox. USD 8.6M) junto aos maiores bancos dos Emirados Árabes.",
    statValue: "31.7M",
    statLabel: "CAPACIDADE DE CRÉDITO"
  }
];

export const MetricTabs = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);

  const activeData = metricsData[activeTab];

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Tab Selectors Bar */}
      <div className="relative flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-10 w-full max-w-4xl mx-auto px-4 z-10">
        {metricsData.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer text-xs font-cinzel tracking-wider font-semibold uppercase z-10 select-none
                ${isActive 
                  ? "text-white" 
                  : "text-white/40 hover:text-white/80"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMetricTab"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 text-gold/80" />
              <span>{item.tabTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Main Display Showcase Card */}
      <div className="w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#080808]/75 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center shadow-[0_0_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            {/* Ambient background light */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            {/* Left Content Column */}
            <div className="md:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <span className="inline-block bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[9px] font-mono text-gold uppercase tracking-widest mb-6">
                {activeData.badge}
              </span>

              {/* Title */}
              <h3 className="font-cinzel text-2xl md:text-3xl font-light text-white leading-tight mb-4">
                {activeData.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light mb-8 max-w-xl">
                {activeData.description}
              </p>

              {/* CTA Button */}
              <button 
                onClick={onCtaClick}
                className="relative group px-6 py-3.5 bg-gradient-to-r from-[#8A7322] via-[#D4AF37] to-[#8A7322] text-black font-cinzel text-[10px] font-black tracking-widest rounded-full transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.55)]"
              >
                <div className="absolute inset-0 bg-white/40 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">SOLICITAR ANÁLISE DE CRÉDITO</span>
              </button>
            </div>

            {/* Right Graphic/Stat Column */}
            <div className="md:col-span-5 flex justify-center items-center w-full">
              <div className="relative aspect-square w-full max-w-[280px] md:max-w-none rounded-2xl bg-black/40 border border-white/5 overflow-hidden flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] py-12 px-6">
                {/* Blueprint overlays */}
                <div className="absolute top-3 left-4 font-mono text-[8px] text-white/20 uppercase tracking-widest pointer-events-none">METRIC SHOWCASE</div>
                <div className="absolute bottom-3 right-4 font-mono text-[8px] text-gold/30 uppercase tracking-widest pointer-events-none">SYSTEM STATUS: READY</div>
                <div className="absolute inset-4 border border-white/[0.02] pointer-events-none rounded-xl" />
                <div className="absolute inset-8 border border-gold/5 pointer-events-none rounded-lg border-dashed" />

                {/* Big Stat Value */}
                <h1 className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-b from-gold via-[#D4AF37] to-[#8A7322] drop-shadow-[0_0_35px_rgba(212,175,55,0.4)] tracking-tighter">
                  {activeData.statValue}
                </h1>

                {/* Stat Label */}
                <span className="font-cinzel text-[9px] uppercase tracking-[0.25em] text-white/40 mt-4 text-center">
                  {activeData.statLabel}
                </span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
