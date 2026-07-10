"use client"

import { cn } from "@/lib/utils"
import { Component } from "@/components/ui/feature-carousel"

const FeatureCarouselDemo = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-[34px] bg-neutral-800/50 p-2 border border-white/5 backdrop-blur-xl">
        <div className="relative z-10 grid w-full gap-8 rounded-[28px] bg-neutral-950 p-2 overflow-hidden">
          <Component
            title="Sua Operação em Dubai"
            description="Visualize a transição e consolidação patrimonial através de uma infraestrutura corporativa robusta e alinhada com as melhores práticas fiscais."
            step1img1Class={cn(
              "pointer-events-none w-[50%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
              "max-md:scale-[160%] max-md:rounded-[24px] rounded-[24px] left-[25%] top-[57%] md:left-[35px] md:top-[29%]",
              "md:group-hover:translate-y-2"
            )}
            step1img2Class={cn(
              "pointer-events-none w-[60%] border border-stone-100/10 dark:border-stone-700/50 transition-all duration-500 overflow-hidden",
              "max-md:scale-[160%] rounded-2xl max-md:rounded-[24px] left-[69%] top-[53%] md:top-[21%] md:left-[calc(50%+35px+1rem)]",
              "md:group-hover:-translate-y-6"
            )}
            step2img1Class={cn(
              "pointer-events-none w-[50%] rounded-t-[24px] overflow-hidden border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
              "max-md:scale-[160%] left-[25%] top-[69%] md:left-[35px] md:top-[30%]",
              "md:group-hover:translate-y-2"
            )}
            step2img2Class={cn(
              "pointer-events-none w-[40%] rounded-t-[24px] border border-stone-100/10 dark:border-stone-700 transition-all duration-500 rounded-2xl overflow-hidden",
              "max-md:scale-[140%] left-[70%] top-[53%] md:top-[25%] md:left-[calc(50%+27px+1rem)]",
              "md:group-hover:-translate-y-6"
            )}
            step3imgClass={cn(
              "pointer-events-none w-[90%] border border-stone-100/10 dark:border-stone-700 rounded-t-[24px] transition-all duration-500 overflow-hidden",
              "left-[5%] top-[50%] md:top-[30%] md:left-[68px]"
            )}
            step4imgClass={cn(
              "pointer-events-none w-[90%] border border-stone-100/10 dark:border-stone-700 rounded-t-[24px] transition-all duration-500 overflow-hidden",
              "left-[5%] top-[50%] md:top-[30%] md:left-[68px]"
            )}
            image={{
              step1light1: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
              step1light2: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=1200",
              step2light1: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
              step2light2: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
              step3light: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200",
              step4light: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200",
              alt: "Dubai Operation Showcase",
            }}
            bgClass="bg-gradient-to-tr from-neutral-900/90 to-neutral-850/90"
          />
        </div>
      </div>
    </div>
  )
}

export default FeatureCarouselDemo
