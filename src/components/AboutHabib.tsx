import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ from = 0, to, duration = 2, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!isInView) {
      setCount(from);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeProgress = progress * (2 - progress); // easeOutQuad
      
      const currentValue = Math.floor(from + easeProgress * (to - from));
      setCount(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

interface DoubleCounterProps {
  fromA?: number;
  toA: number;
  fromB?: number;
  toB: number;
  duration?: number;
  separator?: string;
}

const DoubleCounter: React.FC<DoubleCounterProps> = ({ 
  fromA = 0, toA, 
  fromB = 0, toB, 
  duration = 2, 
  separator = "/" 
}) => {
  const [countA, setCountA] = useState(fromA);
  const [countB, setCountB] = useState(fromB);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!isInView) {
      setCountA(fromA);
      setCountB(fromB);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeProgress = progress * (2 - progress); // easeOutQuad
      
      setCountA(Math.floor(fromA + easeProgress * (toA - fromA)));
      setCountB(Math.floor(fromB + easeProgress * (toB - fromB)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, fromA, toA, fromB, toB, duration]);

  return <span ref={ref}>{countA}{separator}{countB}</span>;
};

export const AboutHabib: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="sobre" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[11px] md:text-[13px] font-semibold text-gold/60 uppercase tracking-[0.3em] font-inter"
          >
            SOBRE A HABIB
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-[34px] md:text-[clamp(46px,5vw,72px)] font-normal text-white tracking-[-0.02em] leading-[1.02]"
          >
            Credibilidade e Atuação <br />Institucional em Dubai
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-[1px] bg-gold/30 my-2 origin-left"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-[14px] md:text-[clamp(15px,1.2vw,18px)] font-normal leading-[1.65] max-w-2xl"
          >
            Nascida para responder à crescente necessidade de internacionalização de empresários e grandes investidores brasileiros, a <strong>HABIB Consultancy</strong> consolidou sua marca nos Emirados Árabes como uma referência de segurança jurídica e solidez operacional.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 text-[14px] md:text-[clamp(15px,1.2vw,18px)] font-normal leading-[1.65] max-w-2xl"
          >
            Com equipe pluridisciplinar atuando diretamente in-loco em Dubai, oferecemos uma consultoria especializada abrangendo desde o setup societário à atração de capital nos maiores bancos dos EAU. Apoiamos nossos clientes em todas as etapas presençais e corporativas, garantindo tranquilidade jurídica absoluta.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            {[
              "Equipe especializada em vistos e residência",
              "Histórico de contas corporativas de alta complexidade",
              "Relacionamento ativo com bancos em Dubai",
              "Estruturação focada em blindagem sucessória"
            ].map((text, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className="flex items-start gap-2.5"
              >
                <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-white/80 text-[14px] md:text-[16px] font-medium font-inter leading-[1.4]">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right metrics/stat box column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full mx-auto lg:mx-0">
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative bg-[#080808]/75 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.6)] w-full max-w-[420px] flex flex-col gap-8 overflow-hidden group cursor-default z-10"
          >
            {/* SVG Animated Gold Border */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10" fill="none">
              <defs>
                <linearGradient id="gold-grad-about" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#084732" />
                  <stop offset="50%" stopColor="#107C58" />
                  <stop offset="100%" stopColor="#084732" />
                </linearGradient>
              </defs>
              
              {/* Glow effect rect */}
              <motion.rect
                x="1"
                y="1"
                style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
                rx="16"
                ry="16"
                pathLength="100"
                stroke="url(#gold-grad-about)"
                strokeWidth="3"
                className="opacity-0 blur-[4px]"
                animate={isHovered ? { strokeDasharray: "100 0", strokeDashoffset: 0, opacity: 0.45 } : { strokeDasharray: "0 100", strokeDashoffset: 100, opacity: 0 }}
                initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Sharp border rect */}
              <motion.rect
                x="1"
                y="1"
                style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
                rx="16"
                ry="16"
                pathLength="100"
                stroke="url(#gold-grad-about)"
                strokeWidth="1.5"
                animate={isHovered ? { strokeDasharray: ["30 70", "100 0"], strokeDashoffset: [100, 0] } : { strokeDasharray: "0 100", strokeDashoffset: 100 }}
                initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </svg>

            <div className="absolute -top-12 -left-12 w-28 h-28 bg-gold/5 rounded-full blur-2xl pointer-events-none z-0" />
            
            {/* Stat Item 1 */}
            <div className="flex flex-col border-b border-white/5 pb-6 relative z-20">
              <span className="font-cinzel text-[36px] md:text-[48px] font-normal leading-none bg-clip-text text-transparent bg-gradient-to-r from-gold to-[#084732] drop-shadow-[0_0_15px_rgba(16, 124, 88,0.2)]">
                <Counter from={1} to={100} prefix="+" suffix="M" />
              </span>
              <span className="text-[11px] md:text-[12px] text-white/40 uppercase tracking-[0.2em] font-inter font-semibold mt-1 leading-[1.3]">
                Patrimônio Assessorado
              </span>
            </div>

            {/* Stat Item 2 */}
            <div className="flex flex-col border-b border-white/5 pb-6 relative z-20">
              <span className="font-cinzel text-[36px] md:text-[48px] font-normal leading-none bg-clip-text text-transparent bg-gradient-to-r from-gold to-[#084732] drop-shadow-[0_0_15px_rgba(16, 124, 88,0.2)]">
                <Counter from={0} to={100} suffix="%" />
              </span>
              <span className="text-[11px] md:text-[12px] text-white/40 uppercase tracking-[0.2em] font-inter font-semibold mt-1 leading-[1.3]">
                Conformidade Legal EAU/BR
              </span>
            </div>

            {/* Stat Item 3 */}
            <div className="flex flex-col relative z-20">
              <span className="font-cinzel text-[36px] md:text-[48px] font-normal leading-none bg-clip-text text-transparent bg-gradient-to-r from-gold to-[#084732] drop-shadow-[0_0_15px_rgba(16, 124, 88,0.2)]">
                <DoubleCounter fromA={0} toA={24} fromB={0} toB={7} separator="/" />
              </span>
              <span className="text-[11px] md:text-[12px] text-white/40 uppercase tracking-[0.2em] font-inter font-semibold mt-1 leading-[1.3]">
                Presença e Suporte In-Loco
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
