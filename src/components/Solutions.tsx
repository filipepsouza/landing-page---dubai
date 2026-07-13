import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, CreditCard, Briefcase, FileText, ShieldAlert, BadgeCheck, HelpCircle } from 'lucide-react';

const solutions = [
  {
    icon: Building2,
    title: "Estruturação Empresarial",
    description: "Criação de sociedades holdings e operacionais em Dubai, configurando a governança perfeita para proteger ativos globais e mitigar riscos fiscais."
  },
  {
    icon: Users,
    title: "Residência e Vistos",
    description: "Assessoria completa para obtenção de vistos de investidor e residência permanente fiscal nos Emirados Árabes para você, seus sócios e familiares."
  },
  {
    icon: CreditCard,
    title: "Contas Bancárias",
    description: "Introdução ativa e facilitação junto aos bancos de primeira linha em Dubai para contas corporativas multi-moedas e contas de Private Banking."
  },
  {
    icon: Briefcase,
    title: "Organização Operacional",
    description: "Suporte na locação de escritórios corporativos físicos ou virtuais (flexi-desk), ativação de sistemas locais e contratação de serviços essenciais."
  },
  {
    icon: FileText,
    title: "Contabilidade Local",
    description: "Estruturação dos relatórios contábeis da empresa nos Emirados de acordo com os padrões locais IFRS, garantindo total conformidade legal."
  },
  {
    icon: ShieldAlert,
    title: "Compliance e KYC",
    description: "Preparação de documentação para aprovação nos processos de Due Diligence, mitigando riscos de bloqueio e viabilizando o tráfego bancário."
  },
  {
    icon: BadgeCheck,
    title: "Gestão Administrativa",
    description: "Manutenção de licenças corporativas anuais, trâmites governamentais locais e emissão de certificados oficiais de residência fiscal."
  },
  {
    icon: HelpCircle,
    title: "Suporte Contínuo",
    description: "Acompanhamento profissional pós-implantação para assegurar que a sua engrenagem financeira em Dubai continue rodando sem interrupções."
  }
];

interface SolutionCardProps {
  item: typeof solutions[0];
  idx: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ item, idx }) => {
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
          <linearGradient id={`gold-grad-sol-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
          stroke={`url(#gold-grad-sol-${idx})`}
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
          stroke={`url(#gold-grad-sol-${idx})`}
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

export const Solutions: React.FC = () => {
  return (
    <section id="solucoes" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/[0.02] via-transparent to-transparent pointer-events-none" />

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
            Soluções Integradas
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-3xl md:text-5xl font-normal text-white tracking-tight max-w-3xl leading-tight"
          >
            Nossa Atuação Consultiva e Operacional
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
            Cuidamos de toda a jornada burocrática, técnica e bancária nos Emirados Árabes Unidos. Foque na expansão, enquanto nossa banca cuida da retaguarda.
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {solutions.map((item, idx) => (
            <SolutionCard key={idx} item={item} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};
