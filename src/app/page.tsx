// src/app/page.tsx
import Hero from "@/components/sections/hero";
import ExperienceTimeline from "@/components/sections/experiencebento"; // Make sure the import matches your filename
import Education from "@/components/sections/education";
import Specifications from "@/components/sections/specifications";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    // Replaced the hardcoded Apple White with bg-background
    <main className="bg-background min-h-screen transition-colors duration-300">
      <Hero />
      <ExperienceTimeline />
      <Education />
      <Specifications />
      <Footer />
    </main>
  );
}