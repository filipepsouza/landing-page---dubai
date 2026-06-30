import React from 'react';
import { CheckCircle } from 'lucide-react';

export const AboutHabib: React.FC = () => {
  return (
    <section id="sobre" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <span className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] font-mono">
            07. Sobre a HABIB
          </span>
          
          <h2 className="font-cinzel text-3xl md:text-5xl font-light text-white tracking-wider leading-tight">
            Credibilidade e Atuação <br />Institucional em Dubai
          </h2>
          
          <div className="w-16 h-[1px] bg-gold/30 my-2" />
          
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
            Nascida para responder à crescente necessidade de internacionalização de empresários e grandes investidores brasileiros, a <strong>HABIB Consultancy</strong> consolidou sua marca nos Emirados Árabes como uma referência de segurança jurídica e solidez operacional.
          </p>

          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
            Com equipe pluridisciplinar atuando diretamente in-loco em Dubai, oferecemos uma consultoria especializada abrangendo desde o setup societário à atração de capital nos maiores bancos dos EAU. Apoiamos nossos clientes em todas as etapas presenciais e corporativas, garantindo tranquilidade jurídica absoluta.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span className="text-white/70 text-xs font-light">Equipe especializada em vistos e residência</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span className="text-white/70 text-xs font-light">Histórico de contas corporativas de alta complexidade</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span className="text-white/70 text-xs font-light">Relacionamento ativo com bancos em Dubai</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span className="text-white/70 text-xs font-light">Estruturação focada em blindagem sucessória</span>
            </div>
          </div>
        </div>

        {/* Right metrics/stat box column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full mx-auto lg:mx-0">
          <div className="relative bg-[#080808]/75 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.6)] w-full max-w-[420px] flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Stat Item 1 */}
            <div className="flex flex-col border-b border-white/5 pb-6">
              <span className="font-cinzel text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gold to-[#8A7322] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                +100M
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono mt-1">
                Patrimônio Assessorado
              </span>
            </div>

            {/* Stat Item 2 */}
            <div className="flex flex-col border-b border-white/5 pb-6">
              <span className="font-cinzel text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gold to-[#8A7322] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                100%
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono mt-1">
                Conformidade Legal EAU/BR
              </span>
            </div>

            {/* Stat Item 3 */}
            <div className="flex flex-col">
              <span className="font-cinzel text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gold to-[#8A7322] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                24/7
              </span>
              <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono mt-1">
                Presença e Suporte In-Loco
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
