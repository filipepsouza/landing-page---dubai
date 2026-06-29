"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the Lamp section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Dynamic transforms based on scroll
  const lampWidth = useTransform(scrollYProgress, [0, 1], ["10rem", "30rem"]);
  const lampOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);



  return (
    <div
      ref={containerRef}
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0 ${className || ""}`}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 mt-32">
        <motion.div
          style={{
            opacity: lampOpacity,
            width: lampWidth,
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible bg-gradient-conic from-gold via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-deepBlack h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-deepBlack bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        
        <motion.div
          style={{
            opacity: lampOpacity,
            width: lampWidth,
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 bg-gradient-conic from-transparent via-transparent to-gold text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-deepBlack bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-deepBlack h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-deepBlack blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>


      </div>

      <div className="relative z-50 flex -translate-y-48 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
