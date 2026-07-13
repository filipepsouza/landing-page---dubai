import React, { useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    phase: "01",
    title: "Diagnóstico",
    description: "Análise confidencial do seu perfil, origem de receita e metas fiscais globais. Você sai com um mapa claro de viabilidade."
  },
  {
    phase: "02",
    title: "Engenharia",
    description: "Desenho da holding ou operacional, escolha de jurisdição (Free Zone vs Mainland) e estratégia bancária sob medida."
  },
  {
    phase: "03",
    title: "Implantação",
    description: "Constituição das entidades, vistos de residência e abertura de contas nos bancos de primeira linha dos Emirados."
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
      className="relative bg-obsidian2/75 backdrop-blur-xl border border-ivory/5 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.02] z-10 overflow-hidden group cursor-default"
    >
      {/* SVG Animated Gold Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10" fill="none">
        <defs>
          <linearGradient id={`gold-grad-step-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0E5A3C" />
            <stop offset="50%" stopColor="#12B76A" />
            <stop offset="100%" stopColor="#0E5A3C" />
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
      <div className="flex flex-col relative z-20">
        <span className="font-cinzel italic text-5xl bg-clip-text text-transparent bg-gradient-to-r from-champagne to-goldDeep mb-5 leading-none block">
          {item.phase}
        </span>
        <h3 className="font-inter text-lg font-bold text-ivory tracking-wider transition-colors duration-500 group-hover:text-gold mb-2">
          {item.title}
        </h3>
        <p className="text-ivory/70 text-[14.5px] font-normal leading-relaxed transition-colors duration-500 group-hover:text-ivory/90">
          {item.description}
        </p>
      </div>
      
      {/* Arrow Indicator for Desktop */}
      {idx < steps.length - 1 && (
        <div className="hidden md:block absolute top-[68px] -right-5 text-gold text-lg z-20 pointer-events-none">
          →
        </div>
      )}
    </motion.div>
  );
};

export const StrategyToExecution: React.FC = () => {
  return (
    <section id="estrategia-execucao" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 overflow-hidden" style={{ background: 'linear-gradient(180deg, #060907 0%, #04180F 18%, #062119 55%, #060907 100%)' }}>
      {/* Background glow lines */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.015] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-inter text-[11px] font-semibold text-emeraldBright uppercase tracking-[0.38em] flex items-center gap-3"
          >
            <span className="w-[26px] h-[1px] bg-emerald block"></span>
            O método
            <span className="w-[26px] h-[1px] bg-emerald block"></span>
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-4xl md:text-5xl font-normal text-ivory tracking-tight max-w-3xl leading-[1.08]"
          >
            Nenhuma operação de sucesso<br />
            começa pelo <span className="italic em-text text-emeraldBright">fim.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-ivory/70 text-[16px] md:text-[17px] max-w-xl font-normal leading-relaxed mt-2"
          >
            A estratégia antecede cada etapa física. Três movimentos, uma máquina.
          </motion.p>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[78px] left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-emerald/20 to-transparent z-0" />

          {steps.map((item, idx) => (
            <StepCard key={idx} item={item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
