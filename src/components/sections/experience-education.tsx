"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic"; // Import Next's dynamic loader
import "mapbox-gl/dist/mapbox-gl.css";
import { experiences, education } from "@/data/resume";
import Map, { MapRef, Source, Layer } from "react-map-gl/mapbox";


// The large, semi-transparent radar ring
const radarLayer: any = {
  id: 'radar',
  type: 'circle',
  paint: {
    'circle-radius': 24,
    'circle-color': '#3b82f6', 
    'circle-opacity': 0.2, 
  }
};

// The solid inner dot
const circleLayer: any = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 8,
    'circle-color': '#3b82f6',
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
  }
};


// --- 1. THE CARD COMPONENT ---
function ExperienceCard({ 
  exp, 
  index, 
  totalCards, 
  setActiveLocation 
}: { 
  exp: any; 
  index: number; 
  totalCards: number;
  setActiveLocation: (coords: { lat: number, lng: number }) => void;
}) {

  const cardRef = useRef<HTMLDivElement>(null);

  // Framer motion for the fade in/out
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "start 20%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  // Intersection Observer to trigger the Mapbox flyTo
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5, // Triggers when the card is 50% visible in the viewport
  });

  useEffect(() => {
    if (inView && exp.coordinates) {
      setActiveLocation(exp.coordinates);
    }
  }, [inView, exp, setActiveLocation]);

  const periodStr = exp.period || "";
  const periodParts = periodStr.includes(" - ") ? periodStr.split(" - ") : periodStr.split("-");
  const isLast = index === totalCards - 1;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className={`relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 group ${isLast ? "mb-0" : "mb-[55vh]"}`}
    >
      {/* Invisible div to track visibility without messing up Framer Motion's ref */}
      <div ref={inViewRef} className="absolute inset-y-0 left-0 w-full pointer-events-none" />

      {/* Timeline Period */}
      <div className="md:w-32 shrink-0 pt-2 md:text-right">
        <span className="text-sm font-bold tracking-wider text-primary uppercase block mb-1">
          {periodParts[0]}
          <br className="hidden md:block" />
          <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
            {periodParts[1] ? periodParts[1] : ""}
          </span>
        </span>
      </div>

      {/* Main Card */}
      <div className="flex-grow bg-[#0B1120]/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl flex flex-col h-full">
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {exp.company}
          </h3>
          <p className="text-muted-foreground font-medium text-lg">
            {exp.role}
          </p>
        </div>

        <div className="text-slate-300 leading-relaxed space-y-4 mb-8">
          {Array.isArray(exp.highlights) ? (
            exp.highlights.map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))
          ) : (
            <p>{exp.highlights}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10 mt-auto">
          {exp.skills?.map((skill: string, i: number) => (
            <span 
              key={i} 
              className="text-xs font-semibold text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EducationTimelineCard({ 
  edu, 
  index, 
  totalCards, 
  setActiveLocation 
}: { 
  edu: any; 
  index: number; 
  totalCards: number; 
  setActiveLocation: (coords: { lat: number, lng: number }) => void 
}) {
  
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Framer motion for the exact same vertical fade in/out as Experience
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "start 20%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  // 2. Intersection Observer to trigger the Mapbox flyTo for the university!
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5, 
  });

  useEffect(() => {
    // IMPORTANT: Make sure your education data has a 'coordinates' object!
    if (inView && edu.coordinates) {
      setActiveLocation(edu.coordinates);
    }
  }, [inView, edu, setActiveLocation]);

  const periodStr = edu.period || "";
  const periodParts = periodStr.includes(" - ") ? periodStr.split(" - ") : periodStr.split("-");
  const isLast = index === totalCards - 1;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className={`relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 group ${isLast ? "mb-[50vh]" : "mb-[55vh]"}`}
    >
      {/* Invisible div to track visibility without messing up Framer Motion's ref */}
      <div ref={inViewRef} className="absolute inset-y-0 left-0 w-full pointer-events-none" />

      {/* Timeline Period */}
      <div className="md:w-32 shrink-0 pt-2 md:text-right">
        <span className="text-sm font-bold tracking-wider text-primary uppercase block mb-1">
          {periodParts[0]}
          <br className="hidden md:block" />
          <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
            {periodParts[1] ? periodParts[1] : ""}
          </span>
        </span>
      </div>

      {/* Main Card (Styled exactly like ExperienceCard) */}
      <div className="flex-grow bg-[#0B1120]/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl flex flex-col h-full">
        
        {/* Location (Kept from your edu card but styled to match) */}
        {edu.location && (
          <div className="mb-2">
            <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              {edu.location}
            </span>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {edu.school || edu.university || edu.institution}
          </h3>
          <p className="text-muted-foreground font-medium text-lg">
            {edu.degree}
          </p>
        </div>

        {/* Optional: If you add highlights/descriptions to your education data later */}
        {edu.description && (
          <div className="text-slate-300 leading-relaxed space-y-4 mb-8">
            <p>{edu.description}</p>
          </div>
        )}

        {/* GPA / Grade Pill (Styled like the skills pills from Experience) */}
        <div className="flex pt-6 border-t border-white/10 mt-auto">
          <span className="text-xs font-semibold text-white bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            {edu.gpa || edu.grade}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// --- 2. THE MAIN SECTION ---
export default function Experience() {
  const mapRef = useRef<MapRef>(null);
  
  // Default to the first experience's coordinates
  const [activeLocation, setActiveLocation] = useState(
    experiences[0]?.coordinates || { lat: 1.2821, lng: 103.8488 }
  );

  // When activeLocation changes, tell the map to fly there!
  useEffect(() => {
    if (mapRef.current && activeLocation) {
      // Calculate right-side padding based on window width
      // Desktop: push right by 500px to make room for the card. Mobile: keep centered.
      const rightPadding = window.innerWidth >= 768 ? 500 : 0; 

      mapRef.current.flyTo({
        center: [activeLocation.lng, activeLocation.lat],
        zoom: 15.5,
        pitch: 60,
        bearing: -20,
        padding: { right: rightPadding, left: 0, top: 0, bottom: 0 }, // <--- THIS IS THE MAGIC
        duration: 3000,
        essential: true,
      });
    }
  }, [activeLocation]);

  return (
    // 1. THE GIANT PARENT WRAPPER (No longer just the 'experience' section)
    <div className="relative w-full bg-[#0B1120]">
      
      {/* 2. THE STICKY MAP BACKGROUND (Now stretches across everything inside the parent) */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{
              longitude: activeLocation.lng,
              latitude: activeLocation.lat,
              zoom: 15.5,
              pitch: 60,
              bearing: -20,
            }}
            mapStyle="mapbox://styles/h-ft/cmn7cjo6l005g01s77da9e836"
            interactive={false} 
          >
            <Source id="active-location" type="geojson" data={{
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [activeLocation.lng, activeLocation.lat]
                    },
                    properties: {}
                  }
                ]
              }}
            >
              <Layer {...radarLayer} />
              <Layer {...circleLayer} />
            </Source>
          </Map>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0B1120]/70 to-[#0B1120]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0B1120] to-transparent pointer-events-none z-20" />
        </div>
      </div>

      {/* 3. THE FOREGROUND CONTENT CONTAINER */}
      <div className="relative z-10 pt-24 pb-32 max-w-5xl mx-auto px-6">
        
        {/* === EXPERIENCE SECTION === */}
        <section id="experience" className="mb-48"> {/* Added margin-bottom to separate sections */}
          <div className="sticky top-0 z-40 pt-12 pb-8 mb-24 backdrop-blur-sm mask-image-gradient">
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Engineering Impact.</h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-[8.5rem] top-0 bottom-0 w-px bg-white/10 z-0" />
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={`exp-${index}`} 
                exp={exp} 
                index={index} 
                totalCards={experiences.length} 
                setActiveLocation={setActiveLocation}
              />
            ))}
          </div>
        </section>

        {/* === EDUCATION SECTION === */}
        <section id="education">
          <div className="sticky top-0 z-40 pt-12 pb-8 mb-24 backdrop-blur-sm mask-image-gradient">
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Academic Background.</h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-[8.5rem] top-0 bottom-0 w-px bg-white/10 z-0" />
            {education.map((edu, index) => (
              <EducationTimelineCard  
                key={`edu-${index}`} 
                edu={edu} // Pass the education data 
                index={index} 
                totalCards={education.length} 
                setActiveLocation={setActiveLocation}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}