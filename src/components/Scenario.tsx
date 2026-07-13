import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Scale, Percent, ShieldAlert } from 'lucide-react';

const challenges = [
  {
    icon: ShieldAlert,
    title: "Tributação de até 34%",
    description: "Lucros e dividendos taxados na fonte limitam drasticamente sua capacidade de reinvestimento."
  },
  {
    icon: Percent,
    title: "Crédito inviável",
    description: "Juros de dois dígitos e burocracia tornam a alavancagem de grande porte impossível localmente."
  },
  {
    icon: Scale,
    title: "Insegurança jurídica",
    description: "Regras fiscais que mudam sem aviso mantêm seus ativos sob ameaça constante."
  },
  {
    icon: TrendingDown,
    title: "Real volátil",
    description: "Patrimônio 100% em Real perde poder de compra internacional a cada ciclo cambial."
  }
];

interface ChallengeCardProps {
  item: typeof challenges[0];
  idx: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ item, idx }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.15 + (idx % 4) * 0.06, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#080808]/75 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] overflow-hidden group cursor-default z-10"
    >
      {/* SVG Animated Gold Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10" fill="none">
        <defs>
          <linearGradient id={`gold-grad-challenge-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B5D3B" />
            <stop offset="50%" stopColor="#12A56B" />
            <stop offset="100%" stopColor="#0B5D3B" />
          </linearGradient>
        </defs>
        
        {/* Glow effect rect */}
        <motion.rect
          x="1"
          y="1"
          style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
          rx="16"
          ry="16"
          pathLength="100"
          stroke={`url(#gold-grad-challenge-${idx})`}
          strokeWidth="3"
          className="opacity-0 blur-[4px]"
          animate={isHovered ? { strokeDasharray: "100 0", strokeDashoffset: 0, opacity: 0.45 } : { strokeDasharray: "0 100", strokeDashoffset: 100, opacity: 0 }}
          initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Sharp border rect */}
        <motion.rect
          x="1"
          y="1"
          style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
          rx="16"
          ry="16"
          pathLength="100"
          stroke={`url(#gold-grad-challenge-${idx})`}
          strokeWidth="1.5"
          animate={isHovered ? { strokeDasharray: ["30 70", "100 0"], strokeDashoffset: [100, 0] } : { strokeDasharray: "0 100", strokeDashoffset: 100 }}
          initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Icon Circle */}
      <div className="w-10 h-10 rounded-lg bg-gold/5 flex items-center justify-center border border-gold/10 text-gold relative z-20 transition-colors duration-500 group-hover:bg-gold/15 group-hover:border-gold/30">
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 relative z-20">
        <h3 className="font-inter text-sm font-bold text-white tracking-wider uppercase transition-colors duration-500 group-hover:text-gold">
          {item.title}
        </h3>
        <p className="text-white/40 text-xs font-light leading-relaxed transition-colors duration-500 group-hover:text-white/60">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Scenario: React.FC = () => {
  return (
    <section id="cenario" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-obsidian">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="font-inter text-[11px] font-semibold text-emeraldBright uppercase tracking-[0.38em] flex items-center gap-3">
            <span className="w-[26px] h-[1px] bg-emerald block"></span>
            O cenário
            <span className="w-[26px] h-[1px] bg-emerald block"></span>
          </span>
          <h2 className="font-cinzel text-[32px] md:text-[clamp(42px,4.8vw,56px)] font-normal text-ivory tracking-[-0.02em] max-w-3xl leading-[1.08]">
            Seu patrimônio trabalha<br />
            <span className="italic em-text text-emeraldBright">contra você</span> no Brasil.
          </h2>
          <p className="text-ivory/70 text-[14px] md:text-[17px] font-normal leading-[1.65] max-w-2xl mt-2">
            Quatro forças corroem, todos os anos, o que você levou décadas para construir.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
          {challenges.map((item, idx) => (
            <ChallengeCard key={idx} item={item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
