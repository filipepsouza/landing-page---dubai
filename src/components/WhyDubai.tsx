import React from 'react';
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
            02. Por que os Emirados Árabes
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
          {factors.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
