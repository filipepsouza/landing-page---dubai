import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';

const comparisonData = [
  {
    feature: "Propriedade Estrangeira",
    freezone: "100% de Controle",
    mainland: "100% de Controle (regra atual para a maioria)"
  },
  {
    feature: "Escritório Físico",
    freezone: "Flexi-desk / Opcional",
    mainland: "Obrigatório (Lease Agreement real)"
  },
  {
    feature: "Operação no Mercado Local",
    freezone: "Apenas via distribuidor ou agente local",
    mainland: "Direta e ilimitada em todo o EAU"
  },
  {
    feature: "Licitações Públicas",
    freezone: "Restrito",
    mainland: "Permitido sem restrições"
  },
  {
    feature: "Imposto de Renda PF",
    freezone: "0% Garantido",
    mainland: "0% Garantido"
  },
  {
    feature: "Vistos de Residência",
    freezone: "Emitidos por cota da Zona Franca",
    mainland: "Emitidos com base no tamanho do escritório"
  }
];

export const FreeZoneMainland: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'freezone' | 'mainland'>('freezone');

  return (
    <section id="freezone-mainland" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-gold/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-[10px] font-semibold text-gold/60 uppercase tracking-[0.2em] font-inter">
            04. Estruturação Física
          </span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-normal text-white tracking-tight max-w-3xl leading-tight">
            Free Zone ou Mainland?
          </h2>
          <div className="w-16 h-[1px] bg-gold/30 mt-2" />
          <p className="text-white/60 text-xs md:text-sm max-w-xl font-light leading-relaxed">
            A decisão da jurisdição determina o escopo de atuação e custos operacionais da sua empresa nos Emirados. Analise os modelos e escolha o ideal para o seu perfil.
          </p>
        </div>

        {/* COMPARATIVE CARDS FOR MOBILE & TABLET */}
        <div className="lg:hidden w-full flex flex-col gap-6">
          <div className="flex justify-center border-b border-white/10 pb-2">
            <button
              onClick={() => setActiveTab('freezone')}
              className={`flex-1 py-3 text-xs font-inter font-semibold tracking-widest uppercase transition-all duration-300
                ${activeTab === 'freezone' ? 'text-gold border-b border-gold' : 'text-white/40'}`}
            >
              Free Zone
            </button>
            <button
              onClick={() => setActiveTab('mainland')}
              className={`flex-1 py-3 text-xs font-inter font-semibold tracking-widest uppercase transition-all duration-300
                ${activeTab === 'mainland' ? 'text-gold border-b border-gold' : 'text-white/40'}`}
            >
              Mainland
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'freezone' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'freezone' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#080808]/75 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col gap-6 shadow-2xl"
            >
              <div>
                <h3 className="font-inter text-sm font-bold text-white mb-2 uppercase tracking-wide">
                  {activeTab === 'freezone' ? "Zona Franca (Free Zone)" : "Território Nacional (Mainland)"}
                </h3>
                <p className="text-white/50 text-xs font-light leading-relaxed">
                  {activeTab === 'freezone' 
                    ? "Perfeito para negócios digitais, consultoria, holdings e importadoras/exportadoras que buscam otimização tributária máxima com custo operacional reduzido e sem burocracia de aluguel físico corporativo obrigatório."
                    : "Ideal para empresas que necessitam de presença física local para comércio direto ao consumidor dos EAU, prestação de serviços logísticos locais e participação ativa em licitações públicas."}
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
                {comparisonData.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-b border-white/[0.03] pb-2">
                    <span className="text-[10px] text-white/30 uppercase font-inter font-semibold">{item.feature}</span>
                    <span className="text-xs text-gold/90 font-medium">
                      {activeTab === 'freezone' ? item.freezone : item.mainland}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* COMPARATIVE TABLE FOR DESKTOP */}
        <div className="hidden lg:block w-full overflow-hidden rounded-3xl border border-white/5 bg-[#080808]/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.01]">
                <th className="p-6 font-inter text-xs font-bold text-white/50 uppercase tracking-widest">Critério de Análise</th>
                <th className="p-6 font-inter text-xs font-bold text-gold uppercase tracking-widest">Free Zone (Zona Franca)</th>
                <th className="p-6 font-inter text-xs font-bold text-white uppercase tracking-widest">Mainland (Território Nacional)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-white/5 hover:bg-white/[0.01] transition-colors duration-300"
                >
                  <td className="p-6 text-xs text-white/60 font-inter font-semibold uppercase tracking-wider">{item.feature}</td>
                  <td className="p-6 text-sm text-gold/90 font-light font-inter">{item.freezone}</td>
                  <td className="p-6 text-sm text-white/70 font-light font-inter">{item.mainland}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Guidance Recommendation Banner */}
        <div className="bg-gold/5 border border-gold/15 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-inter text-sm font-bold text-white mb-2 uppercase tracking-wide">Recomendação Consultiva HABIB</h4>
            <p className="text-white/50 text-xs font-light leading-relaxed">
              Estruturas em <strong>Free Zone</strong> cobrem mais de 90% das demandas de prestadores de serviços internacionais, exportadores e investidores que procuram blindagem e zero imposto corporativo. No entanto, se o seu foco é a exploração do mercado doméstico local de varejo em Dubai, o <strong>Mainland</strong> será a indicação ideal. Nós cuidamos do desenho customizado.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
