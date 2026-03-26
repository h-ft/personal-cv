// src/components/sections/Specifications.tsx
"use client";

import { motion } from "framer-motion";
import { certifications, languages } from "@/data/resume";

export default function Specifications() {
  return (
    <section className="py-24 px-6 bg-background transition-colors duration-300">
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