import React from 'react';
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
          {challenges.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
