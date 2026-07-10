import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Coins, Compass, Activity, Landmark, Sparkles } from 'lucide-react';

const factors = [
  {
    icon: Landmark,
    title: "Estabilidade Econômica",
    description: "Crescimento sustentado suportado por reservas massivas de capital, inflação controlada e políticas econômicas de longo prazo estáveis."
  },
  {
    icon: ShieldCheck,
    title: "Segurança Jurídica",
    description: "Estruturas legais baseadas na Common Law em áreas como o DIFC, com tribunais dedicados e proteção sólida para o investidor estrangeiro."
  },
  {
    icon: Coins,
    title: "Moeda Forte",
    description: "O Dirham (AED) possui pareamento permanente ao Dólar Americano (USD) desde 1997, blindando seu patrimônio contra desvalorizações cambiais."
  },
  {
    icon: Activity,
    title: "Ambiente de Negócios",
    description: "Políticas governamentais pró-negócios, burocracia digital simplificada e repatriação total de capital e lucros livre de barreiras."
  },
  {
    icon: Compass,
    title: "Localização Estratégica",
    description: "Posicionado no centro geográfico dos mercados globais, conectando o Ocidente ao Oriente em poucas horas de voo."
  },
  {
    icon: Sparkles,
    title: "Infraestrutura Global",
    description: "Portos e aeroportos líderes mundiais, além de um ecossistema digital e logístico de ponta para empresas multinacionais."
  }
];

interface FactorCardProps {
  item: typeof factors[0];
  idx: number;
}

const FactorCard: React.FC<FactorCardProps> = ({ item, idx }) => {
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
      className="relative bg-[#080808]/75 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-7 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] overflow-hidden group cursor-default"
    >
      {/* SVG Animated Gold Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10" fill="none">
        <defs>
          <linearGradient id={`gold-grad-dubai-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
          stroke={`url(#gold-grad-dubai-${idx})`}
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
          stroke={`url(#gold-grad-dubai-${idx})`}
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

export const WhyDubai: React.FC = () => {
  return (
    <section id="por-que-dubai" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack">
      {/* Visual background details */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, var(--color-gold) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, var(--color-gold) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] font-mono">
            Por que os Emirados Árabes
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-light text-white tracking-wider max-w-3xl leading-tight">
            O Principal Destino de Capital do Mundo
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mt-2" />
          <p className="text-white/60 text-xs md:text-sm max-w-xl font-light leading-relaxed">
            Dubai se consolidou como a capital financeira do futuro. Descubra os pilares que tornam esta jurisdição única para expansão empresarial e proteção de fortunas.
          </p>
        </div>

        {/* Factors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {factors.map((item, idx) => (
            <FactorCard key={idx} item={item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
