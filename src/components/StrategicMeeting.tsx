import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface StrategicMeetingProps {
  onCtaClick: () => void;
}

export const StrategicMeeting: React.FC<StrategicMeetingProps> = ({ onCtaClick }) => {
  return (
    <section id="reuniao-estrategica" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack overflow-hidden">
      {/* Background visual spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="bg-[#080808]/80 backdrop-blur-2xl border border-gold/15 rounded-3xl p-6 sm:p-8 md:p-16 flex flex-col items-center text-center gap-8 md:gap-10 shadow-[0_0_60px_rgba(18, 165, 107,0.06)] relative overflow-hidden">
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {/* Icon Header */}
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 text-gold mb-2">
            <Calendar className="w-5.5 h-5.5" />
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-[10px] font-semibold text-gold/60 uppercase tracking-[0.25em] font-inter">
              Próximo Passo
            </span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-normal text-white tracking-tight leading-tight">
              Agende Sua Reunião Estratégica
            </h2>
            <div className="w-16 h-[1px] bg-gold/30 mx-auto mt-1" />
            <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
              Realize um diagnóstico de viabilidade gratuito de 30 minutos com nossos consultores seniores. Entenda as possibilidades societárias de Dubai desenhadas especificamente para o seu perfil corporativo.
            </p>
          </div>

          {/* Agenda/Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left border-t border-b border-white/5 py-8 my-2">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-semibold text-gold uppercase tracking-widest font-inter">Tópico</span>
              <h4 className="font-inter text-[11px] font-bold text-white tracking-wide uppercase">Perfil Societário Ideal</h4>
              <p className="text-white/40 text-[11px] font-light leading-relaxed">
                Análise se a melhor estrutura para sua operação é uma Free Zone de custo otimizado ou um Mainland ilimitado.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-semibold text-gold uppercase tracking-widest font-inter">Tópico</span>
              <h4 className="font-inter text-[11px] font-bold text-white tracking-wide uppercase">Viabilidade de Bancabilidade</h4>
              <p className="text-white/40 text-[11px] font-light leading-relaxed">
                Projeção do potencial de crédito corporativo local imobiliário com base na sua renda e investimentos previstos.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-semibold text-gold uppercase tracking-widest font-inter">Tópico</span>
              <h4 className="font-inter text-[11px] font-bold text-white tracking-wide uppercase">Prazos e Custos Iniciais</h4>
              <p className="text-white/40 text-[11px] font-light leading-relaxed">
                Apresentação transparente do orçamento regulatório completo e o cronograma para obtenção de vistos de residência.
              </p>
            </div>
          </div>

          {/* CTA Action */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={onCtaClick}
              className="relative group px-10 py-5 bg-gradient-to-r from-[#0B5D3B] via-[#12A56B] to-[#0B5D3B] text-black font-cinzel text-xs md:text-sm font-black tracking-[0.15em] rounded-full transition-all duration-500 hover:scale-105 overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(18, 165, 107,0.3)] hover:shadow-[0_0_40px_rgba(18, 165, 107,0.6)]"
            >
              <div className="absolute inset-0 bg-white/40 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                SOLICITAR REUNIÃO CONFIDENCIAL <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <span className="text-[9px] text-white/30 uppercase tracking-widest font-inter font-semibold">
              Sem obrigações • Vagas semanais limitadas para triagem
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
