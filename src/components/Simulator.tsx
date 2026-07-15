import React, { useState } from 'react';
import { motion } from 'framer-motion';

const profiles = [
  { label: 'Conservador', mult: 12, defaultAporte: 1000000 },
  { label: 'Estruturado', mult: 40, defaultAporte: 2000000 },
  { label: 'Máximo', mult: 84, defaultAporte: 3000000 },
];

const AED_BRL = 1.5; // illustrative rate

interface SimulatorProps {
  onCtaClick?: () => void;
}

export const Simulator: React.FC<SimulatorProps> = ({ onCtaClick }) => {
  const [aporte, setAporte] = useState(3900000);
  const [multiplier, setMultiplier] = useState(40);

  const formatBRL = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  const formatAED = (val: number) => {
    const aed = val / AED_BRL;
    if (aed >= 1000000) {
      return `≈ AED ${(aed / 1000000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}M em moeda forte`;
    }
    return `≈ AED ${aed.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} em moeda forte`;
  };

  const credito = aporte * multiplier;

  // Calculate percentage for the range slider background
  const min = 100000;
  const max = 5000000;
  const fillPct = ((aporte - min) / (max - min)) * 100;

  return (
    <section id="simulador" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-obsidian text-ivory">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        <div className="flex flex-col items-start gap-4 max-w-2xl">
          <span className="font-inter text-[11px] font-semibold text-emeraldBright uppercase tracking-[0.38em] flex items-center gap-3">
            <span className="w-[26px] h-[1px] bg-emerald block"></span>
            Simulador de alavancagem
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl font-normal leading-tight tracking-tight text-ivory">
            Quanto crédito o seu<br />
            aporte <span className="italic em-text text-emeraldBright">DESTRAVA?</span>
          </h2>
          <p className="text-ivory/70 text-[17px] font-light leading-relaxed max-w-xl">
            Mova o valor e veja o potencial da estrutura. A simulação completa, com prazos e custos, chega no seu WhatsApp.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="rounded-[26px] border border-emerald/25 p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 shadow-[0_40px_90px_-50px_rgba(18,183,106,0.4)]"
          style={{
            background: `
              radial-gradient(120% 140% at 100% 0%, rgba(18,183,106,0.12) 0%, transparent 45%),
              radial-gradient(100% 120% at 0% 100%, rgba(217,183,90,0.07) 0%, transparent 42%),
              linear-gradient(160deg, #081511, #060907)
            `
          }}
        >
          {/* Left Side: Inputs */}
          <div className="flex flex-col">
            <span className="font-inter text-[11px] uppercase tracking-[0.3em] text-ivory/45 mb-3 block">
              Capital disponível para aporte
            </span>
            <div className="font-inter font-semibold text-4xl md:text-[38px] text-ivory mb-2 tabular-nums">
              {formatBRL(aporte)}
            </div>
            
            {/* Custom Range Slider */}
            <div className="relative w-full h-1 mt-6 mb-10">
              <input 
                type="range" 
                min={min} 
                max={max} 
                step="50000" 
                value={aporte} 
                onChange={(e) => setAporte(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Capital disponível para aporte"
              />
              <div 
                className="absolute inset-0 h-1 rounded-full pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, #12B76A ${fillPct}%, rgba(244,239,230,0.12) ${fillPct}%)`
                }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full pointer-events-none shadow-[0_0_0_5px_rgba(217,183,90,0.18)] border-2 border-[#191204] z-20 transition-all duration-75"
                style={{
                  left: `calc(${fillPct}% - 12px)`,
                  background: 'linear-gradient(140deg, #F3DF9C, #C9A227)'
                }}
              />
            </div>

            <span className="font-inter text-[11px] uppercase tracking-[0.3em] text-ivory/45 mb-3 block">
              Perfil da estrutura
            </span>
            <div className="flex gap-2 mb-2">
              {profiles.map((prof) => (
                <button
                  key={prof.mult}
                  onClick={() => {
                    setMultiplier(prof.mult);
                    setAporte(prof.defaultAporte);
                  }}
                  className={`flex-1 py-3 px-2 rounded-xl border text-[11.5px] uppercase tracking-[0.14em] font-medium font-inter transition-all duration-300 ${
                    multiplier === prof.mult 
                      ? 'border-emerald bg-emerald/10 text-emeraldBright' 
                      : 'border-ivory/10 bg-transparent text-ivory/70 hover:border-ivory/30'
                  }`}
                >
                  {prof.label}
                  <small className={`block text-[15px] tracking-normal mt-1 font-semibold ${multiplier === prof.mult ? 'text-emeraldBright' : 'text-ivory'}`}>
                    {prof.mult}×
                  </small>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Outputs */}
          <div className="flex flex-col justify-center gap-6 md:border-l border-ivory/10 md:pl-14 pt-8 md:pt-0 border-t md:border-t-0">
            <div>
              <small className="font-inter text-[11px] uppercase tracking-[0.3em] text-ivory/45 mb-2 block">
                Crédito potencial
              </small>
              <motion.div 
                key={credito}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-inter font-bold text-3xl sm:text-4xl md:text-[52px] lg:text-[56px] leading-[1.2] tracking-normal tabular-nums bg-clip-text text-transparent pr-4 inline-block w-fit"
                style={{
                  backgroundImage: 'linear-gradient(100deg, #F3DF9C, #D9B75A 60%, #C9A227)'
                }}
              >
                {formatBRL(credito) + '\u00A0'}
              </motion.div>
              <div className="text-sm text-ivory/70 mt-2">
                {formatAED(credito)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <small className="font-inter text-[11px] uppercase tracking-[0.3em] text-ivory/45 mb-1 block">
                  Custo do crédito
                </small>
                <b className="font-inter font-semibold text-2xl text-emeraldBright tabular-nums block">
                  3,99% a.a.
                </b>
              </div>
              <div>
                <small className="font-inter text-[11px] uppercase tracking-[0.3em] text-ivory/45 mb-1 block">
                  Imposto de renda PF
                </small>
                <b className="font-inter font-semibold text-2xl text-emeraldBright tabular-nums block">
                  R$ 0
                </b>
              </div>
            </div>

            <button 
              onClick={onCtaClick}
              className="self-start mt-2 relative group font-inter tracking-[0.14em] text-[13px] uppercase rounded-full transition-all duration-350 cursor-pointer border-0 text-[#191204] font-medium px-8 py-[18px] shadow-[0_10px_34px_-12px_rgba(217,183,90,0.55)] hover:shadow-[0_18px_44px_-12px_rgba(217,183,90,0.7)] hover:-translate-y-[2px]" 
              style={{ background: 'linear-gradient(120deg, #F3DF9C 0%, #D9B75A 42%, #8C6A1D 100%)' }}
            >
              Receber simulação completa
            </button>

            <p className="text-[11.5px] text-ivory/45 leading-[1.6] border-t border-ivory/10 pt-4 mt-2">
              Simulação ilustrativa, não constitui oferta de crédito. Valores reais dependem de análise de perfil, estrutura societária e aprovação bancária nos EAU.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
