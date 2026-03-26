// src/components/sections/Hero.tsx
"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/data/resume";

export default function Hero() {
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background px-6">
      
       <motion.div 
        style={{ opacity, scale }} 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="z-10 text-center max-w-4xl mx-auto"
      >
        <motion.p variants={itemVariants} className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-muted mb-6">
          {personalInfo.title}
        </motion.p>

        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter text-primary mb-8">
          {personalInfo.name}
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-2xl mx-auto mb-12">
          {personalInfo.summary}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* THE NEW RESUME BUTTON */}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-4 rounded-full font-semibold text-primary bg-background border border-border hover:border-primary transition-colors shadow-sm"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-30 pointer-events-none">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="36" 
          height="36" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          // The text-white sets the base color, the drop-shadow creates the glowing halo
          className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>

      <div className="absolute left-0 right-0 top-full h-48 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}