import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Scale, Percent, ShieldAlert } from 'lucide-react';

const challenges = [
  {
    icon: ShieldAlert,
    title: "Tributação Agressiva",
    description: "A alta carga sobre lucros e dividendos no Brasil corrói o crescimento. A falta de incentivos fiscais severamente limita a capacidade de reinvestimento da sua empresa."
  },
  {
    icon: Percent,
    title: "Escassez de Crédito",
    description: "Taxas de juros abusivas e extrema burocracia tornam o crédito corporativo inviável para alavancagem de grande porte ou expansão patrimonial estratégica."
  },
  {
    icon: Scale,
    title: "Insegurança Jurídica",
    description: "Alterações imprevisíveis na legislação fiscal e regulações criam um ambiente de constante instabilidade, ameaçando a proteção dos ativos conquistados."
  },
  {
    icon: TrendingDown,
    title: "Volatilidade Cambial",
    description: "Manter patrimônio integralmente em Real expõe seu poder de compra às oscilações constantes da moeda, reduzindo a liquidez em nível internacional."
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#080808]/75 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] overflow-hidden group cursor-default"
    >
      {/* SVG Animated Gold Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10" fill="none">
        <defs>
          <linearGradient id={`gold-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#084732" />
            <stop offset="50%" stopColor="#107C58" />
            <stop offset="100%" stopColor="#084732" />
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
          stroke={`url(#gold-grad-${idx})`}
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
          stroke={`url(#gold-grad-${idx})`}
          strokeWidth="1.5"
          animate={isHovered ? { strokeDasharray: ["30 70", "100 0"], strokeDashoffset: [100, 0] } : { strokeDasharray: "0 100", strokeDashoffset: 100 }}
          initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Icon Circle */}
      <div className="w-10 h-10 rounded-lg bg-gold/5 flex items-center justify-center border border-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold/15 group-hover:border-gold/30">
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 relative z-20">
        <h3 className="font-cinzel text-base font-semibold text-white tracking-wider transition-colors duration-500 group-hover:text-gold">
          {item.title}
        </h3>
        <p className="text-white/45 text-xs font-light leading-relaxed transition-colors duration-500 group-hover:text-white/60">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Scenario: React.FC = () => {
  return (
    <section id="cenario" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] font-mono">
            O Cenário Atual
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-light text-white tracking-wider max-w-3xl leading-tight">
            Os Desafios do Empresário Brasileiro
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mt-2" />
          <p className="text-white/60 text-xs md:text-sm max-w-xl font-light leading-relaxed">
            Preservar e expandir patrimônio em um mercado de alta fricção exige novas estratégias. Entenda os fatores que impulsionam a necessidade de internacionalização.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {challenges.map((item, idx) => (
            <ChallengeCard key={idx} item={item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
