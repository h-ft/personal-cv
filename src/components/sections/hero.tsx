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
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6">
      
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
          {personalInfo.name}.
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-2xl mx-auto mb-12">
          {personalInfo.summary}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#experience" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg">
            Explore Experience
          </a>
          
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
    </section>
  );
}