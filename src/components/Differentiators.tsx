import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, MapPin, Sliders, FileCheck2, Milestone, HeartHandshake } from 'lucide-react';

const differentiators = [
  {
    icon: Languages,
    title: "Atendimento em Português",
    description: "Comunicação transparente e sem intermediários. Toda a assessoria legal, tributária e bancária é conduzida por profissionais lusófonos nativos."
  },
  {
    icon: MapPin,
    title: "Presença Física Local",
    description: "Escritório estruturado em Dubai com equipe própria atuando diretamente nos órgãos governamentais e agências bancárias locais dos Emirados."
  },
  {
    icon: Sliders,
    title: "Estruturas Personalizadas",
    description: "Sem pacotes padrão. Cada modelo societário e de visto é modelado sob medida para o tamanho, jurisdição e objetivos fiscais do seu patrimônio."
  },
  {
    icon: FileCheck2,
    title: "Conformidade Regulatória",
    description: "Absoluta legalidade nacional e internacional, resguardando suas movimentações de acordo com os padrões regulatórios globais (CRS / FATCA)."
  },
  {
    icon: Milestone,
    title: "Acompanhamento Operacional",
    description: "Acompanhamos você pessoalmente em Dubai nas etapas críticas de exames médicos, cadastro de biometria e reuniões bancárias presenciais."
  },
  {
    icon: HeartHandshake,
    title: "Relação de Longo Prazo",
    description: "Somos parceiros estratégicos da sua empresa em todas as renovações anuais, alterações contratuais e futuras captações de crédito local."
  }
];

interface DifferentiatorCardProps {
  item: typeof differentiators[0];
  idx: number;
}

const DifferentiatorCard: React.FC<DifferentiatorCardProps> = ({ item, idx }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.15 + (idx % 3) * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#080808]/75 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-7 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] overflow-hidden group cursor-default z-10"
    >
      {/* SVG Animated Gold Border */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10" fill="none">
        <defs>
          <linearGradient id={`gold-grad-diff-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
          stroke={`url(#gold-grad-diff-${idx})`}
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
          stroke={`url(#gold-grad-diff-${idx})`}
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

export const Differentiators: React.FC = () => {
  return (
    <section id="diferenciais" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[10px] font-semibold text-gold/60 uppercase tracking-[0.2em] font-inter"
          >
            Nossos Diferenciais
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-3xl md:text-5xl font-normal text-white tracking-tight max-w-3xl leading-tight"
          >
            Por Que Escolher a HABIB Consultancy?
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
            Diferente de agências de balcão comuns, oferecemos inteligência de nível institucional e presença física real. Unimos comodidade, legalidade e escala.
          </motion.p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {differentiators.map((item, idx) => (
            <DifferentiatorCard key={idx} item={item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
