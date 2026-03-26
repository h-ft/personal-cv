// src/app/page.tsx
import Hero from "@/components/sections/hero";
import ExperienceTimeline from "@/components/sections/experience-education"; // Make sure the import matches your filename
import Specifications from "@/components/sections/specifications";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    // Replaced the hardcoded Apple White with bg-background
    <main className="bg-background min-h-screen transition-colors duration-300">
      <Hero />
      <ExperienceTimeline />
      <Specifications />
      <Footer />
    </main>
  );
}