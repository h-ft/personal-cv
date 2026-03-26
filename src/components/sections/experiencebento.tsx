"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/resume"; 

// 1. DEDICATED CARD COMPONENT FOR INDIVIDUAL SCROLL TRACKING
function TimelineCard({ job, index }: { job: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track when the top of THIS specific card gets near the viewport's top
  // Starts fading at 30% from the top, fully disappears by 10%
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 30%", "start 10%"],
  });

  // Even index moves left (-150px), Odd index moves right (+150px)
  const xDirection = index % 2 === 0 ? -150 : 150;
  
  const x = useTransform(scrollYProgress, [0, 1], [0, xDirection]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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
      {/* Timeline Period */}
      <div className="md:w-32 shrink-0 pt-2 md:text-right">
        <span className="text-sm font-bold tracking-wider text-primary uppercase block mb-1">
          {job.period.split(" - ")[0] || job.period.split("-")[0]}
          <br className="hidden md:block" />
          <span className="text-muted text-xs font-medium">
            to {job.period.split(" - ")[1] || job.period.split("-")[1] || "Present"}
          </span>
        </span>
      </div>

      {/* Main Card */}
      <div className="flex-grow bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm">
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            {job.company}
          </h3>
          <p className="text-muted font-medium text-lg">{job.role}</p>
        </div>
    

        <div className="mb-6 space-y-3">
        {Array.isArray(job.highlights) ? (
            // If it's an array, map through it
            job.highlights.map((highlight: string, i: number) => (
            <p key={i} className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {highlight}
            </p>
            ))
        ) : (
            // If it's a single string, render it with whitespace-pre-line to respect \n line breaks
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
            {job.highlights}
            </p>
        )}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-border mt-auto">
          {job.techStack.map((tech: string) => (
            <span
              key={tech}
              className="bg-background px-3 py-1 rounded-full text-xs font-semibold border border-border text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["end 90%", "end 40%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      style={{ opacity }}
      className="relative pb-16 mb-[40vh] max-w-5xl mx-auto"
    >
      {/* TRANSPARENT STICKY HEADER */}
      {/* Removed bg colors, added pointer-events-none so it doesn't block interactions */}
      <div className="sticky top-0 z-40 pt-24 pb-8 px-6 mb-16 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary drop-shadow-md">
            Engineering Impact.
          </h2>
          <p className="text-muted mt-4 text-lg drop-shadow-sm">
            Building high-performance systems across global markets.
          </p>
        </motion.div>
      </div>

      {/* TIMELINE CARDS */}
      <div className="flex flex-col gap-12 relative px-6">
        <div className="hidden md:block absolute left-[8.5rem] top-0 bottom-0 w-px bg-border z-0" />

        {/* Map through the data and pass to our new individual tracking component */}
        {experiences.map((job, index) => (
          <TimelineCard key={job.company} job={job} index={index} />
        ))}
      </div>
    </motion.section>
  );
}