import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  {
    phase: "Passo 01",
    title: "Diagnóstico e Viabilidade",
    description: "Análise confidencial de seu perfil empresarial, origem de receita e metas tributárias globais para garantir perfeita adequação regulatória."
  },
  {
    phase: "Passo 02",
    title: "Engenharia Arquitetônica",
    description: "Desenho detalhado da holding ou empresa operacional, selecionando a melhor jurisdição local (Free Zone vs Mainland) e desenhando a estratégia bancária."
  },
  {
    phase: "Passo 03",
    title: "Implantação e Setup",
    description: "Constituição física das entidades societárias, emissão de vistos residenciais e assessoria ativa na abertura de contas bancárias locais corporativas."
  }
];

interface StepCardProps {
  item: typeof steps[0];
  idx: number;
}

const StepCard: React.FC<StepCardProps> = ({ item, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.4 + idx * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#080808]/75 backdrop-blur-xl border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.02] z-10 overflow-hidden group cursor-default"
    >
      {/* SVG Animated Gold Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10" fill="none">
        <defs>
          <linearGradient id={`gold-grad-step-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
          stroke={`url(#gold-grad-step-${idx})`}
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
          stroke={`url(#gold-grad-step-${idx})`}
          strokeWidth="1.5"
          animate={isHovered ? { strokeDasharray: ["30 70", "100 0"], strokeDashoffset: [100, 0] } : { strokeDasharray: "0 100", strokeDashoffset: 100 }}
          initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Step Header */}
      <div className="flex items-center justify-between relative z-20">
        <span className="text-[9px] font-bold text-gold uppercase tracking-widest font-mono transition-colors duration-500 group-hover:text-white">
          {item.phase}
        </span>
        <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 transition-colors duration-500 group-hover:bg-gold/20 group-hover:border-gold/45">
          <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 relative z-20">
        <h3 className="font-cinzel text-base font-semibold text-white tracking-wider transition-colors duration-500 group-hover:text-gold">
          {item.title}
        </h3>
        <p className="text-white/40 text-xs font-light leading-relaxed transition-colors duration-500 group-hover:text-white/60">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export const StrategyToExecution: React.FC = () => {
  return (
    <section id="estrategia-execucao" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.01] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] font-mono"
          >
            Da Estratégia à Execução
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-3xl md:text-5xl font-light text-white tracking-wider max-w-3xl leading-tight"
          >
            Nenhuma Operação de Sucesso Começa Pelo Fim
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-[1px] bg-gold/30 mt-2 origin-center"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-xs md:text-sm max-w-xl font-light leading-relaxed"
          >
            Uma estruturação internacional de alto nível exige engenharia cuidadosa. Na HABIB, a estratégia antecede cada etapa física, garantindo soluções paramétricas de acordo com a sua necessidade.
          </motion.p>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[45px] left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent z-0" />

          {steps.map((item, idx) => (
            <StepCard key={idx} item={item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
