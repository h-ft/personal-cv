"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { education } from "@/data/resume"; 

function EducationTimelineCard({ edu, index }: { edu: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 30%", "start 10%"],
  });

  const xDirection = index % 2 === 0 ? -150 : 150;
  const x = useTransform(scrollYProgress, [0, 1], [0, xDirection]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Safely split the period string for the timeline view
  const periodStr = edu.period || "";
  const periodParts = periodStr.includes(" - ") 
    ? periodStr.split(" - ") 
    : periodStr.split("-");

  return (
    <motion.div
      ref={cardRef}
      style={{ x, opacity }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 group"
    >
      {/* Timeline Period (Left Column) */}
      <div className="md:w-32 shrink-0 pt-2 md:text-right">
        <span className="text-sm font-bold tracking-wider text-primary uppercase block mb-1">
          {periodParts[0]}
          <br className="hidden md:block" />
          <span className="text-muted text-xs font-medium">
            {periodParts[1] ? `to ${periodParts[1]}` : ""}
          </span>
        </span>
      </div>

      {/* Main Card */}
      <div className="flex-grow bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm flex flex-col h-full">
        {/* Location */}
        <div className="mb-2">
          <span className="text-xs font-bold tracking-wider text-muted uppercase">
            {edu.location}
          </span>
        </div>
        
        {/* University Info */}
        <div className="mb-6">
          {/* THE FIX: Checks for school, university, or institution property names */}
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            {edu.school || edu.university || edu.institution}
          </h3>
          <p className="text-muted font-medium text-lg">{edu.degree}</p>
        </div>

        {/* GPA / Grade Pill */}
        <div className="flex pt-6 border-t border-border mt-auto">
          <span className="inline-block whitespace-nowrap text-sm font-bold text-primary-foreground bg-primary px-4 py-2 rounded-md">
            {edu.gpa || edu.grade}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end 90%", "end 40%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.section
      id="education"
      ref={sectionRef}
      style={{ opacity }}
      className="relative pb-16 mb-[40vh] max-w-5xl mx-auto"
    >
      {/* TRANSPARENT STICKY HEADER */}
      <div className="sticky top-0 z-40 pt-24 pb-8 px-6 mb-16 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary drop-shadow-md">
            The Foundation.
          </h2>
          <p className="text-muted mt-4 text-lg drop-shadow-sm">
            Academic excellence driving technical execution.
          </p>
        </motion.div>
      </div>

      {/* VERTICAL TIMELINE CARDS */}
      <div className="flex flex-col gap-12 relative px-6">
        {/* The subtle vertical background line */}
        <div className="hidden md:block absolute left-[8.5rem] top-0 bottom-0 w-px bg-border z-0" />

        {education.map((edu, index) => (
          <EducationTimelineCard key={index} edu={edu} index={index} />
        ))}
      </div>
    </motion.section>
  );
}