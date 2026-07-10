import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Como funciona a isenção de impostos corporativos em Dubai?",
    answer: "Para empresas qualificadas em Zonas Francas (Free Zones), os impostos corporativos sobre receitas qualificadas são de 0%. O imposto federal padrão de 9% se aplica apenas a lucros gerados no mercado doméstico local acima de AED 375.000 (aprox. USD 100 mil). E o imposto de renda sobre pessoa física e distribuição de dividendos corporativos é absolutamente zero."
  },
  {
    question: "Preciso residir fisicamente nos Emirados Árabes Unidos?",
    answer: "Não. Você pode gerenciar toda a atividade comercial e societária da sua empresa de maneira remota. No entanto, para fins de manutenção ativa do visto de residência e domicílio fiscal, as regras exigem que o detentor do visto realize uma visita aos Emirados no mínimo uma vez a cada 180 dias."
  },
  {
    question: "Qual é a real diferença na escolha entre a Free Zone e o Mainland?",
    answer: "As Free Zones são hubs com custo de setup otimizado, 100% de isenções tarifárias e sem necessidade de aluguel físico obrigatório de grande porte, porém limitadas de transacionar direto no mercado local interno sem agente. O Mainland exige espaço comercial físico certificado e possibilita comércio direto ilimitado e licitações no governo local."
  },
  {
    question: "Quanto tempo demora o processo de constituição corporativa e visto?",
    answer: "A estruturação corporativa e emissão da licença comercial da empresa são finalizadas entre 10 e 15 dias. O processo presencial de visto de investidor (composto por exames de sangue locais, raio-X e biometria governamental) e a entrega do Emirates ID demandam entre 5 e 7 dias em Dubai."
  },
  {
    question: "Como funciona o suporte para abertura de contas bancárias?",
    answer: "Os bancos nos Emirados adotam padrões rigorosos de KYC (Know Your Customer). Nós atuamos no desenho prévio do perfil do investidor, estruturação da documentação patrimonial corporativa, agendamento de reuniões confidenciais com gerentes seniores locais e acompanhamento presencial em todo o processo de aprovação de contas operacionais e de investimento."
  },
  {
    question: "Como minha empresa em Dubai pode captar crédito imobiliário a juros baixos?",
    answer: "A atração de crédito corporativo local (taxas iniciais de 3.99% a.a.) depende do desenvolvimento de um rating sólido. Apoiamos sua empresa no setup correto do processamento de folha de pagamento via sistema WPS (Wage Protection System) e na estruturação do histórico bancário robusto que os grandes bancos exigem."
  }
];

export const Faq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-[11px] md:text-[13px] font-semibold text-gold/60 uppercase tracking-[0.3em] font-inter">
            Perguntas Frequentes
          </span>
          <h2 className="font-cinzel text-[32px] md:text-[clamp(44px,4.8vw,68px)] font-normal text-white tracking-[-0.02em] leading-[1.03]">
            Esclareça Suas Dúvidas
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mt-2" />
          <p className="text-white/60 text-[14px] md:text-[clamp(15px,1.2vw,18px)] font-normal leading-[1.6] max-w-xl">
            Antes de iniciar a estruturação do seu patrimônio nos Emirados, compreenda as questões fiscais e operacionais essenciais do processo.
          </p>
        </div>

        {/* Faq List */}
        <div className="flex flex-col gap-4">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-[#080808]/75 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gold/20"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 md:p-8 text-left cursor-pointer select-none"
                >
                  <h3 className="font-inter text-sm md:text-[clamp(16px,1.4vw,20px)] font-semibold text-white tracking-normal leading-[1.38] max-w-[85%]">
                    {item.question}
                  </h3>
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0 transition-transform duration-300">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8 border-t border-white/[0.02] pt-4">
                        <p className="text-white/50 text-[14px] md:text-[16px] font-normal leading-[1.68]">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
