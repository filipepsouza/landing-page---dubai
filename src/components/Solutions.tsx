import React from 'react';
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

export const Solutions: React.FC = () => {
  return (
    <section id="solucoes" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] font-mono">
            05. Soluções Integradas
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-light text-white tracking-wider max-w-3xl leading-tight">
            Nossa Atuação Consultiva e Operacional
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mt-2" />
          <p className="text-white/60 text-xs md:text-sm max-w-xl font-light leading-relaxed">
            Cuidamos de toda a jornada burocrática, técnica e bancária nos Emirados Árabes Unidos. Foque na expansão, enquanto nossa banca cuida da retaguarda.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#080808]/75 backdrop-blur-xl border border-white/5 hover:border-gold/20 rounded-2xl p-5 sm:p-6 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Icon Circle */}
                <div className="w-10 h-10 rounded-lg bg-gold/5 flex items-center justify-center border border-gold/10 text-gold">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-cinzel text-base font-semibold text-white tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-xs font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
