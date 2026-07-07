import React from 'react';
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

export const StrategyToExecution: React.FC = () => {
  return (
    <section id="estrategia-execucao" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.01] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] font-mono">
            Da Estratégia à Execução
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-light text-white tracking-wider max-w-3xl leading-tight">
            Nenhuma Operação de Sucesso Começa Pelo Fim
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mt-2" />
          <p className="text-white/60 text-xs md:text-sm max-w-xl font-light leading-relaxed">
            Uma estruturação internacional de alto nível exige engenharia cuidadosa. Na HABIB, a estratégia antecede cada etapa física, garantindo soluções paramétricas de acordo com a sua necessidade.
          </p>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[45px] left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent z-0" />

          {steps.map((item, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#080808]/75 backdrop-blur-xl border border-white/5 hover:border-gold/20 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.02] z-10"
              >
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-gold uppercase tracking-widest font-mono">
                    {item.phase}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  </div>
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
