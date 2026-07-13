import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Coins, Compass, Activity, Landmark, Sparkles } from 'lucide-react';

const factors = [
  {
    icon: Coins,
    title: "Dirham pareado ao Dólar",
    description: "Paridade fixa AED/USD desde 1997. Seu patrimônio blindado em moeda forte."
  },
  {
    icon: ShieldCheck,
    title: "Common Law no DIFC",
    description: "Tribunais dedicados e proteção sólida ao investidor estrangeiro."
  },
  {
    icon: Activity,
    title: "Repatriação livre",
    description: "Capital e lucros retornam sem barreiras, quando você decidir."
  },
  {
    icon: Landmark,
    title: "Estabilidade econômica",
    description: "Reservas massivas, inflação controlada e política de longo prazo."
  },
  {
    icon: Compass,
    title: "Centro do mapa",
    description: "Ocidente e Oriente a poucas horas de voo, no maior hub logístico do mundo."
  },
  {
    icon: Sparkles,
    title: "Burocracia digital",
    description: "Governo pró-negócios com processos 100% digitais e ágeis."
  }
];

interface FactorCardProps {
  item: typeof factors[0];
  idx: number;
}

const FactorCard: React.FC<FactorCardProps> = ({ item, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.15 + (idx % 4) * 0.06, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#080808]/75 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-7 flex flex-col gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] overflow-hidden group cursor-default w-[300px] md:w-[320px] shrink-0 mx-3 z-10"
    >
      {/* SVG Animated Border - Balanced Green/Black/Gold */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl z-10" fill="none">
        <defs>
          <linearGradient id={`gold-grad-dubai-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B5D3B" />
            <stop offset="50%" stopColor="#12A56B" />
            <stop offset="100%" stopColor="#0B5D3B" />
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
          stroke={`url(#gold-grad-dubai-${idx})`}
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
          stroke={`url(#gold-grad-dubai-${idx})`}
          strokeWidth="1.5"
          animate={isHovered ? { strokeDasharray: ["30 70", "100 0"], strokeDashoffset: [100, 0] } : { strokeDasharray: "0 100", strokeDashoffset: 100 }}
          initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Number and Content */}
      <div className="flex flex-col gap-2 relative z-20 whitespace-normal text-left">
        <span className="font-inter text-[10px] font-bold text-emeraldBright uppercase tracking-widest">
          0{idx + 1 > 6 ? (idx % 6) + 1 : idx + 1}
        </span>
        <h3 className="font-inter text-sm font-bold text-white tracking-wider uppercase transition-colors duration-500 group-hover:text-gold">
          {item.title}
        </h3>
        <p className="text-white/40 text-xs font-light leading-relaxed transition-colors duration-500 group-hover:text-white/60">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export const WhyDubai: React.FC = () => {
  // We duplicate the factors to create a seamless infinite loop
  const carouselItems = [...factors, ...factors];

  return (
    <section id="por-que-dubai" className="relative py-16 md:py-24 z-20 bg-obsidian overflow-hidden">
      {/* Visual background details */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, var(--color-emerald) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, var(--color-gold) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16 px-4 sm:px-8 md:px-16 mb-12">
        {/* Title Group */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="font-inter text-[11px] font-semibold text-emeraldBright uppercase tracking-[0.38em] flex items-center gap-3">
            <span className="w-[26px] h-[1px] bg-emerald block"></span>
            Por que Dubai
            <span className="w-[26px] h-[1px] bg-emerald block"></span>
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl font-normal text-ivory tracking-[-0.02em] max-w-3xl leading-[1.08]">
            O capital do mundo<br />
            mudou de <span className="italic em-text text-emeraldBright">endereço.</span>
          </h2>
          <p className="text-ivory/70 text-[16px] md:text-[18px] max-w-xl font-normal leading-[1.65] mt-2">
            Não é tendência: é a jurisdição que os maiores patrimônios do planeta já escolheram.
          </p>
        </div>

        {/* Dubai Skyline SVG Silhouette */}
        <div className="w-full flex justify-center opacity-85 mt-6 pointer-events-none select-none">
          <svg className="w-full max-w-xl h-24 sm:h-28" viewBox="0 0 600 140" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="skyline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C9A227" stopOpacity="0.1" />
                <stop offset="25%" stopColor="#C9A227" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#F3DF9C" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#C9A227" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C9A227" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Ground Line */}
            <line x1="50" y1="130" x2="550" y2="130" stroke="url(#skyline-grad)" strokeWidth="1" opacity="0.4" />
            
            {/* Building 1 */}
            <path d="M 70 130 L 70 60 L 90 60 L 90 130 M 80 60 L 80 40" stroke="url(#skyline-grad)" />
            
            {/* Building 2 */}
            <path d="M 120 130 L 120 50 L 135 35 L 150 50 L 150 130" stroke="url(#skyline-grad)" />
            
            {/* Building 3 */}
            <path d="M 180 130 L 180 55 L 200 55 L 200 130 M 190 55 L 190 35" stroke="url(#skyline-grad)" />
            
            {/* Building 4 */}
            <path d="M 230 130 L 236 30 L 254 30 L 260 130" stroke="url(#skyline-grad)" />
            
            {/* Building 5 (Burj Khalifa Spire) */}
            <path d="M 290 130 L 290 105 L 296 105 L 296 85 L 302 85 L 302 55 L 307 55 L 307 10 L 313 10 L 313 55 L 318 55 L 318 85 L 324 85 L 324 105 L 330 105 L 330 130" stroke="url(#skyline-grad)" />
            
            {/* Building 6 (Burj Al Arab Sail) */}
            <path d="M 360 130 Q 362 30 378 25 Q 395 70 395 130" stroke="url(#skyline-grad)" />
            {/* Inner sail lines */}
            <path d="M 363 105 L 388 105" stroke="url(#skyline-grad)" strokeWidth="1" opacity="0.5" />
            <path d="M 367 80 L 383 80" stroke="url(#skyline-grad)" strokeWidth="1" opacity="0.5" />
            <path d="M 370 55 L 379 55" stroke="url(#skyline-grad)" strokeWidth="1" opacity="0.5" />

            {/* Building 7 */}
            <path d="M 425 130 L 425 40 L 445 40 L 445 130 M 435 40 L 435 20" stroke="url(#skyline-grad)" />

            {/* Building 8 */}
            <path d="M 475 130 L 475 80 L 495 60 L 515 80 L 515 130" stroke="url(#skyline-grad)" />
          </svg>
        </div>
      </div>

      {/* Infinite Carousel / Marquee */}
      <div className="w-full relative z-10 flex overflow-hidden group">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {carouselItems.map((item, idx) => (
            <FactorCard key={idx} item={item} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
