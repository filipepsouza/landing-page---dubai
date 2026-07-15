import React, { useState } from 'react';
import { X, CheckCircle, Shield, Sparkles } from 'lucide-react';
import { supabase } from '../services/supabase';

interface PreQualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreQualModal: React.FC<PreQualModalProps> = ({ isOpen, onClose }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const renda = null;
  const parcela = null;
  const vinculo = null;
  const composicao = null;
  const experiencia = null;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const formatPhone = (val: string) => {
    // Basic phone formatting (BR format: (XX) XXXXX-XXXX)
    const clean = val.replace(/\D/g, '');
    if (clean.length <= 2) return clean;
    if (clean.length <= 7) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setTelefone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Simple validation
    if (!nome.trim() || !telefone.trim()) {
      setErrorMsg('Nome e WhatsApp são obrigatórios.');
      return;
    }

    const numericPhone = telefone.replace(/\D/g, '');
    if (numericPhone.length < 10) {
      setErrorMsg('Por favor, informe um número de WhatsApp válido.');
      return;
    }

    setIsLoading(true);

    try {
      // Add country code if not present (default to 55 for Brazil)
      const formattedSessionId = numericPhone.startsWith('55') ? numericPhone : `55${numericPhone}`;

      const newLead = {
        session_id: formattedSessionId,
        nome: nome.trim(),
        telefone: telefone.trim(),
        status: 'pre_qualificacao', // Directly set as pre-qualified since they filled the LP form
        origem: 'Landing Page Dubai',
        renda: renda ? `R$ ${parseFloat(renda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : null,
        parcela: parcela ? `R$ ${parseFloat(parcela).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : null,
        vinculo: vinculo || null,
        composicao: composicao || null,
        experiencia: experiencia || null,
        created_at: new Date().toISOString(),
        respondeu_em: new Date().toISOString(), // User responded directly through the form
        resumo: 'Lead cadastrado via formulário de pré-qualificação da Landing Page de Dubai.'
      };

      const { error } = await supabase
        .from('leads whatsapp')
        .insert([newLead]);

      if (error) throw error;

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error saving lead to Supabase:', err);
      setErrorMsg('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#080808]/90 border border-gold/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(18, 165, 107,0.15)] max-h-[90vh] overflow-y-auto z-10 flex flex-col gap-6 animate-fade-in scrollbar-thin">
        
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-gold transition-colors duration-300 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-gold/30"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <>
            {/* Form Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gold">
                <Sparkles className="w-4 h-4" />
                <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase">Solicitação Confidencial</span>
              </div>
              <h3 className="font-cinzel text-2xl md:text-3xl font-normal text-white tracking-tight leading-tight">
                MÁQUINA DE BANCABILIDADE
              </h3>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light">
                Preencha as informações patrimoniais confidenciais abaixo para estruturarmos sua capacidade de crédito e alavancagem em moeda forte.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-4 py-3 rounded-lg text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Seção 1: Identificação */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold text-gold/60 uppercase tracking-[0.15em] border-b border-gold/10 pb-1 font-inter">01. Identificação Pessoal</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Nome Completo *</label>
                    <input 
                      type="text"
                      required
                      placeholder="Ex: Alexander Vance"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold/50 focus:shadow-[0_0_10px_rgba(18, 165, 107,0.1)] transition-all duration-300 font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">WhatsApp com DDD *</label>
                    <input 
                      type="tel"
                      required
                      placeholder="Ex: (11) 99999-8888"
                      value={telefone}
                      onChange={handlePhoneChange}
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold/50 focus:shadow-[0_0_10px_rgba(18, 165, 107,0.1)] transition-all duration-300 font-light"
                    />
                  </div>
                </div>
              </div>

              {/* Security Banner */}
              <div className="flex items-center gap-3 bg-gold/5 border border-gold/10 px-4 py-3 rounded-xl mt-2">
                <Shield className="w-5 h-5 text-gold shrink-0" />
                <p className="text-[10px] text-white/50 leading-relaxed font-light">
                  Seus dados estão protegidos por criptografia ponta a ponta de nível militar e serão utilizados exclusivamente para a análise confidencial de viabilidade de alavancagem internacional.
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="relative group w-full py-4 mt-2 bg-gradient-to-r from-[#0B5D3B] via-[#12A56B] to-[#0B5D3B] text-black font-inter text-sm font-bold tracking-[0.15em] rounded-xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(18, 165, 107,0.15)] hover:shadow-[0_0_30px_rgba(18, 165, 107,0.3)] disabled:opacity-50 disabled:scale-100 disabled:shadow-none overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/40 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">{isLoading ? 'ESTRUTURANDO DADOS...' : 'SOLICITAR DIAGNÓSTICO PATRIMONIAL'}</span>
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="flex flex-col items-center justify-center py-10 text-center gap-5 animate-fade-in">
            <CheckCircle className="w-16 h-16 text-gold animate-pulse" />
            <div className="flex flex-col gap-2">
              <h3 className="font-cinzel text-2xl font-normal text-white tracking-tight uppercase">Solicitação Transmitida</h3>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-sm font-light">
                Seus dados foram integrados com sucesso. Nossa banca confidencial fará a triagem patrimonial e entrará em contato via WhatsApp nas próximas 2 horas.
              </p>
            </div>
            
            <button 
              onClick={onClose}
              className="mt-4 px-8 py-3 border border-gold/30 hover:border-gold text-gold hover:text-white hover:bg-gold/10 rounded-xl font-inter text-xs tracking-widest uppercase transition-all duration-300 font-semibold"
            >
              FECHAR PAINEL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
