// src/components/ui/Footer.tsx
import { personalInfo } from "@/data/resume";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border py-12 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold text-primary">{personalInfo.name}</h2>
          <p className="text-sm text-muted mt-1">{personalInfo.title}</p>
        </div>
        
        <div className="flex space-x-6">
          <a href={`mailto:${personalInfo.email}`} className="text-muted hover:text-primary transition-colors text-sm font-medium">
            Email
          </a>
          <a href="https://linkedin.com/in/henryfebrian" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors text-sm font-medium">
            LinkedIn
          </a>
          <a href="https://github.com/h-ft" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors text-sm font-medium">
            GitHub
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center md:text-left border-t border-border pt-8">
        <p className="text-xs text-muted/60">
          © {currentYear} {personalInfo.name}. Built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </footer>
  );
}