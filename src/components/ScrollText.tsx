import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollText = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this container
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end center"]
  });

  // Fade-in opacities for the 3 phrases
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.4], [0.15, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.7], [0.15, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.95], [0.15, 1]);

  // Subtle translate-up motions for readability
  const y1 = useTransform(scrollYProgress, [0.1, 0.4], [20, 0]);
  const y2 = useTransform(scrollYProgress, [0.4, 0.7], [20, 0]);
  const y3 = useTransform(scrollYProgress, [0.7, 0.95], [20, 0]);

  return (
    <div ref={elementRef} className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-6 md:gap-10 text-center select-none">
      
      {/* Phrase 1: Pure white elegant statement */}
      <motion.h2 
        style={{ opacity: opacity1, y: y1 }}
        className="font-cinzel text-xl md:text-3xl lg:text-4xl font-extralight text-white tracking-wide uppercase"
      >
        Não vendemos empresas.
      </motion.h2>

      {/* Phrase 2: Gold metallic gradient emphasis */}
      <motion.h2 
        style={{ opacity: opacity2, y: y2 }}
        className="font-cinzel text-2xl md:text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-gold to-white tracking-widest uppercase leading-tight py-1"
      >
        Construímos máquinas de bancabilidade em Dubai.
      </motion.h2>

      {/* Phrase 3: Structured statement with underlined leverage focus */}
      <motion.h2 
        style={{ opacity: opacity3, y: y3 }}
        className="font-cinzel text-xl md:text-3xl lg:text-4xl font-light text-white/90 tracking-wide leading-relaxed uppercase"
      >
        Transformamos seu aporte em acesso a{" "}
        <span className="text-gold font-bold underline decoration-gold/45 underline-offset-8">
          milhões em crédito
        </span>.
      </motion.h2>

    </div>
  );
};
