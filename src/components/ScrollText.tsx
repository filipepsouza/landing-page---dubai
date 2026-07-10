import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollText = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this container
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end center"]
  });

  // Fade-in opacities for the 3 phrases (starting from 0 for a cleaner reveal)
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  // Falling motion: translating down from -40px to 0px (prevents vertical overlaps)
  const y1 = useTransform(scrollYProgress, [0.05, 0.25], [-40, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [-40, 0]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.65], [-40, 0]);

  // Progressive blur: starting at 12px blur and clearing to 0px
  const blurVal1 = useTransform(scrollYProgress, [0.05, 0.25], [12, 0]);
  const blur1 = useTransform(blurVal1, (v) => `blur(${v}px)`);

  const blurVal2 = useTransform(scrollYProgress, [0.25, 0.45], [12, 0]);
  const blur2 = useTransform(blurVal2, (v) => `blur(${v}px)`);

  const blurVal3 = useTransform(scrollYProgress, [0.45, 0.65], [12, 0]);
  const blur3 = useTransform(blurVal3, (v) => `blur(${v}px)`);

  return (
    <div ref={elementRef} className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-6 md:gap-10 text-center select-none">
      
      {/* Phrase 1: Pure white elegant statement */}
      <motion.h2 
        style={{ opacity: opacity1, y: y1, filter: blur1 }}
        className="font-cinzel text-xl md:text-3xl lg:text-4xl font-normal text-white tracking-tight uppercase"
      >
        Não vendemos empresas.
      </motion.h2>

      {/* Phrase 2: Gold metallic gradient emphasis */}
      <motion.h2 
        style={{ opacity: opacity2, y: y2, filter: blur2 }}
        className="font-cinzel text-2xl md:text-4xl lg:text-5xl font-normal bg-clip-text text-transparent bg-gradient-to-r from-white via-gold to-white tracking-tight uppercase leading-tight py-1"
      >
        Construímos máquinas de bancabilidade em Dubai.
      </motion.h2>

      <motion.h2 
        style={{ opacity: opacity3, y: y3, filter: blur3 }}
        className="font-cinzel text-[22px] md:text-[clamp(27px,3.2vw,42px)] font-normal text-white/90 tracking-[-0.01em] leading-[1.12] uppercase"
      >
        Transformamos seu aporte em acesso a{" "}
        <span className="text-gold font-semibold underline decoration-gold/45 underline-offset-8">
          milhões em crédito
        </span>.
      </motion.h2>

    </div>
  );
};
