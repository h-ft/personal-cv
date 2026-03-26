// src/components/sections/Specifications.tsx
"use client";

import { motion } from "framer-motion";
import { certifications, languages } from "@/data/resume";

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 3h6v6"/>
      <path d="M10 14 21 3"/>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  );
}

export default function Specifications() {
  return (
    // 1. ADDED 'relative' to this container so the gradient anchors to it
    <section className="relative py-24 px-6 bg-background transition-colors duration-300">
      
      {/* 2. THE UPWARD FADE: This sits perfectly on top of this section and reaches 48px upward into the map */}
      <div className="absolute left-0 right-0 bottom-full h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Certifications.
          </h2>
          <p className="text-muted mt-4 text-lg">
            Certifications and linguistic capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-2">Certifications</h3>
            {certifications.map((cert, index) => (
              <div key={index} className="bg-card p-6 rounded-2xl shadow-sm border border-border flex justify-between items-center group hover:shadow-md hover:border-primary transition-all">
                <div>
                  <h4 className="font-semibold text-foreground">{cert.title}</h4>
                  <p className="text-sm text-muted mt-1">{cert.issuer} {cert.year && `• ${cert.year}`}</p>
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 mt-2"
                    >
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {cert.title}
                    </h3>
                    <ExternalLinkIcon className="w-4 h-4 text-primary opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                    </a>
                </div>
                {cert.score && (
                  <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full whitespace-nowrap ml-4">
                    {cert.score}
                  </span>
                )}
              </div>
            ))}
          </motion.div>

          {/* Languages Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-2">Languages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {languages.map((lang, index) => (
                <div key={index} className="bg-card p-6 rounded-2xl shadow-sm border border-border text-center flex flex-col justify-center items-center h-full group hover:border-primary transition-colors">
                  <h4 className="font-bold text-xl text-foreground mb-2">{lang.language}</h4>
                  <p className="text-sm font-medium text-primary-foreground bg-primary px-3 py-1 rounded-full">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}