import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, X } from 'lucide-react';
import { cn } from '../lib/utils';

// ===== Types and Interfaces =====
export interface iTestimonial {
  name: string;
  designation: string;
  quote: string;
  metric: string;
  profileImage: string;
}

interface iCarouselProps {
  items: React.ReactElement<{
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose: () => void;
  }>[];
  initialScroll?: number;
}

// ===== Custom Hooks =====
const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

// ===== Profile Image Component =====
const ProfileImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={cn("w-10 h-10 opacity-90 overflow-hidden rounded-full border border-emerald/30 aspect-square flex-none relative", className)}>
      <img
        className={cn(
          "transition duration-300 absolute top-0 inset-0 rounded-inherit object-cover z-50 w-full h-full",
          isLoading ? "blur-sm" : "blur-0",
        )}
        onLoad={() => setLoading(false)}
        src={src}
        loading="lazy"
        alt={alt || "Profile image"}
      />
    </div>
  );
};

// ===== Testimonial Card Component =====
const TestimonialCard = ({
  testimonial,
  index,
  layout = true,
  onCardClose = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=200&auto=format&fit=crop"
}: {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
  backgroundImage?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCollapse();
      }
    };

    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
    }

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 h-screen overflow-hidden z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/85 backdrop-blur-xl h-full w-full fixed inset-0"
            />
            {/* Expanded Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              ref={containerRef}
              layoutId={layout ? `card-${testimonial.name}` : undefined}
              className="max-w-2xl w-full bg-[#080808]/95 backdrop-blur-3xl border border-emerald/20 h-auto max-h-[85vh] overflow-y-auto z-[60] p-8 md:p-12 rounded-3xl relative shadow-[0_0_50px_rgba(18,165,107,0.2)] flex flex-col justify-between"
            >
              <button
                className="absolute top-6 right-6 h-9 w-9 rounded-full flex items-center justify-center bg-emeraldDeep/30 border border-emerald/20 text-emeraldBright hover:bg-emeraldDeep/80 transition-colors"
                onClick={handleCollapse}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col gap-6 text-left">
                <div className="flex items-center gap-4">
                  <ProfileImage src={testimonial.profileImage} alt={testimonial.name} className="w-16 h-16" />
                  <div>
                    <motion.p
                      layoutId={layout ? `title-${testimonial.name}` : undefined}
                      className="text-white font-cinzel text-xl font-bold uppercase tracking-wider"
                    >
                      {testimonial.name}
                    </motion.p>
                    <motion.p
                      layoutId={layout ? `category-${testimonial.name}` : undefined}
                      className="text-emeraldBright font-inter text-xs font-light mt-1"
                    >
                      {testimonial.designation}
                    </motion.p>
                  </div>
                </div>

                <div className="py-4 text-white/90 font-inter text-lg leading-relaxed font-light italic relative">
                  <Quote className="h-8 w-8 text-emeraldBright/15 absolute -top-4 -left-4 pointer-events-none" />
                  "{testimonial.quote}"
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 mt-6 text-left">
                <span className="font-mono text-sm font-bold text-emeraldBright uppercase tracking-wide">
                  {testimonial.metric}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${testimonial.name}` : undefined}
        onClick={handleExpand}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          rotateX: 1.5,
          rotateY: 1.5,
          rotate: 1,
          scale: 1.015,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        className="relative text-left w-80 md:w-[350px] h-[340px] md:h-[370px] bg-[#080808]/75 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer group"
      >
        {/* Background image subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
          <img src={backgroundImage} className="w-full h-full object-cover" alt="" />
        </div>

        {/* SVG Animated Border - Emerald Green */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-10" fill="none">
          <defs>
            <linearGradient id={`emerald-grad-test-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B5D3B" />
              <stop offset="50%" stopColor="#12A56B" />
              <stop offset="100%" stopColor="#0B5D3B" />
            </linearGradient>
          </defs>
          
          <motion.rect
            x="1"
            y="1"
            style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
            rx="24"
            ry="24"
            pathLength="100"
            stroke={`url(#emerald-grad-test-${index})`}
            strokeWidth="3"
            className="opacity-0 blur-[4px]"
            animate={isHovered ? { strokeDasharray: "100 0", strokeDashoffset: 0, opacity: 0.45 } : { strokeDasharray: "0 100", strokeDashoffset: 100, opacity: 0 }}
            initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <motion.rect
            x="1"
            y="1"
            style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
            rx="24"
            ry="24"
            pathLength="100"
            stroke={`url(#emerald-grad-test-${index})`}
            strokeWidth="1.5"
            animate={isHovered ? { strokeDasharray: ["30 70", "100 0"], strokeDashoffset: [100, 0] } : { strokeDasharray: "0 100", strokeDashoffset: 100 }}
            initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </svg>

        {/* Card Body */}
        <div className="flex flex-col gap-5 relative z-20">
          <p className="text-white/80 font-inter text-sm md:text-[14px] leading-relaxed font-light italic">
            "{testimonial.quote}"
          </p>

          <div className="flex items-center gap-3">
            <ProfileImage src={testimonial.profileImage} alt={testimonial.name} className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="text-white font-semibold text-xs uppercase tracking-wide font-inter">
                {testimonial.name}
              </span>
              <span className="text-white/40 text-[10px] font-light font-inter mt-0.5">
                {testimonial.designation}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Result Metric */}
        <div className="border-t border-white/5 pt-4 relative z-20">
          <span className="font-mono text-[10px] md:text-[11px] font-bold text-emeraldBright uppercase tracking-wide">
            {testimonial.metric}
          </span>
        </div>
      </motion.button>
    </>
  );
};

// ===== Carousel Component =====
const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2); // safety offset
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 320 : 350;
      const gap = window.innerWidth < 768 ? 16 : 24;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full mt-4">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-5 relative"
        ref={carouselRef}
        onScroll={checkScrollability}
        style={{ msOverflowStyle: 'none' }}
      >
        {/* Soft Right Gradient Blur to blend into dark background */}
        <div className="absolute right-0 top-0 bottom-0 z-30 w-16 bg-gradient-to-l from-deepBlack to-transparent pointer-events-none" />

        <div className="flex flex-row justify-start gap-6 md:gap-8 pl-1 pr-16 max-w-7xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.15 * index,
                  ease: "easeOut",
                },
              }}
              viewport={{ once: true }}
              key={`card-${index}`}
              className="shrink-0 rounded-3xl"
            >
              {React.cloneElement(item, {
                onCardClose: () => handleCardClose(index),
              })}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Scroll Navigation Buttons */}
      <div className="flex justify-end gap-3 mt-4 pr-1">
        <button
          className="relative z-30 h-10 w-10 rounded-full bg-emeraldDeep/30 border border-emerald/20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emeraldDeep/80 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <button
          className="relative z-30 h-10 w-10 rounded-full bg-emeraldDeep/30 border border-emerald/20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emeraldDeep/80 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

// ===== Testimonial Data =====
const testimonialData = [
  {
    quote: "Em 90 dias eu tinha empresa constituída, visto emitido e a primeira linha de crédito aprovada. O acompanhamento presencial fez toda a diferença.",
    name: "Empresário do agronegócio",
    designation: "Interior de SP - cliente desde 2024",
    metric: "Aporte R$ 2M → AED 8.2M em crédito aprovado",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Migrei o domicílio fiscal da família inteira com total conformidade. Hoje os dividendos chegam líquidos, em dirham, sem sustos.",
    name: "Fundadora, setor de saúde",
    designation: "Curitiba - cliente desde 2023",
    metric: "Economia fiscal de 7 dígitos ao ano",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "O que me convenceu foi a banca em Dubai: escritório real, equipe própria, reuniões no banco comigo presente. Não é agência de balcão.",
    name: "Investidor imobiliário",
    designation: "Belo Horizonte - cliente desde 2025",
    metric: "Portfólio de 3 ativos em Dubai Marina",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "A flexibilidade regulatória e a isenção de impostos corporativos no DIFC abriram portas para nossa expansão internacional. A Habib facilitou toda a intermediação bancária.",
    name: "Diretor de Private Equity",
    designation: "Rio de Janeiro - cliente desde 2024",
    metric: "Abertura de Holding & Conta Private EAU",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Procurávamos um porto seguro contra instabilidades fiscais. A transição patrimonial de nossos ativos digitais e físicos para Dubai foi impecável e 100% legal.",
    name: "Investidora em Venture Capital",
    designation: "Porto Alegre - cliente desde 2023",
    metric: "Proteção Sucessória & Visto Gold EAU",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  }
];

// ===== Main Testimonials Page =====
export const Testimonials: React.FC = () => {
  const cards = testimonialData.map((item, index) => (
    <TestimonialCard
      key={index}
      testimonial={item}
      index={index}
      layout={true}
    />
  ));

  return (
    <section id="resultados" className="relative py-16 md:py-24 px-4 sm:px-8 md:px-16 z-20 bg-deepBlack overflow-hidden">
      {/* Visual background details */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, var(--color-emerald) 1px, transparent 1px),
            radial-gradient(circle at 90% 80%, var(--color-emeraldDeep) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-6 md:gap-8">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col items-start gap-4 text-left">
          <span className="font-inter text-[11px] font-semibold text-emeraldBright uppercase tracking-[0.38em] flex items-center gap-3">
            <span className="w-[26px] h-[1px] bg-emerald block"></span>
            Resultados
          </span>
          <h2 className="font-cinzel text-[36px] md:text-5xl font-normal text-white tracking-[-0.02em] leading-tight">
            Confiança se constrói<br />
            com <span className="italic em-text text-emeraldBright">casos reais.</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm max-w-xl font-normal leading-relaxed mt-1">
            Operações conduzidas sob sigilo. Nomes preservados, números verificáveis em diligência.
          </p>
        </div>

        {/* Carousel Component containing the styled cards */}
        <Carousel items={cards} />

      </div>
    </section>
  );
};
