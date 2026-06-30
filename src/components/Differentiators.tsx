import React from 'react';
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

export const Differentiators: React.FC = () => {
  return (
    <section id="diferenciais" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] font-mono">
            06. Nossos Diferenciais
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-light text-white tracking-wider max-w-3xl leading-tight">
            Por Que Escolher a HABIB Consultancy?
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mt-2" />
          <p className="text-white/60 text-xs md:text-sm max-w-xl font-light leading-relaxed">
            Diferente de agências de balcão comuns, oferecemos inteligência de nível institucional e presença física real. Unimos comodidade, legalidade e escala.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#080808]/75 backdrop-blur-xl border border-white/5 hover:border-gold/20 rounded-2xl p-5 sm:p-7 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02]"
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
