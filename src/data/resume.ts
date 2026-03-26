// src/data/resume.ts

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  gpa: string;
}

export const personalInfo = {
  name: "Henry Febrian",
  title: "Software Engineer",
  email: "henryft51@gmail.com",
  phone: "+6281776757577",
  summary: "Specializing in API development and microservices, focusing on Go (Golang) and Java. Experienced in building robust service infrastructure, improving latency, and driving cost reductions.",
  coreStack: ["Go (Golang)", "Java", "PostgreSQL", "MySQL", "Redis", "Docker", "GCP"],
};

export const experiences: Experience[] = [
  {
    company: "Atome Financial",
    role: "Backend Software Engineer",
    location: "Jakarta, Indonesia",
    period: "July 2025 - Present",
    description: "Handling the core BNPL team, designing infrastructure requirements and database schemas.",
    highlights: [
      "Successfully eliminated a critical bottleneck resulting in >90% latency improvement within 3 months.",
      "Actively developing and maintaining core BNPL services.",
      "Serving as PIC between multiple teams across different regions."
    ],
    techStack: ["Java (Groovy)", "Golang", "MySQL", "Docker", "Redis", "Gitlab"]
  },
  {
    company: "ByteDance",
    role: "Backend Software Engineer",
    location: "Jakarta, Indonesia",
    period: "January 2023 - June 2025",
    description: "In-house delivery and fulfillment solution serving TikTok Shop (UK/ID) and Tokopedia.",
    highlights: [
      "Revamped warehouse management system, reducing cost per order by >90%.",
      "Developed FM fulfillment system for TikTok Shop in 3 UK cities with combined daily volumes >20k orders.",
      "Developed new services from inception to launch, planning, and building robust service infrastructure."
    ],
    techStack: ["Golang", "PostgreSQL", "Docker", "GCP", "Redis", "NewRelic"]
  },
  {
    company: "Tokopedia",
    role: "Backend Software Engineer Intern",
    location: "Jakarta, Indonesia",
    period: "October 2021 - October 2022",
    description: "Internal technology team developing web applications and tools.",
    highlights: [
      "In-charge of the asset management system, managing >4000+ company assets.",
      "Created backend APIs to support internal clients.",
      "Monitored API performance with New Relic and led daily standups."
    ],
    techStack: ["Golang", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "AWS S3"]
  },
  {
    company: "TomTom N.V",
    role: "Technical Support Engineer Working Student",
    location: "Berlin, Germany",
    period: "April 2021 - September 2021",
    description: "Technical support for multinational mapping and navigation company.",
    highlights: [
      "Acted as the Berlin office's primary contact for Dell support inquiries.",
      "Installed, configured, and maintained computer systems and networks."
    ],
    techStack: ["Ubuntu", "ServiceNow", "Active Directory", "Jira"]
  }
];

export const education: Education[] = [
  {
    institution: "University of Illinois Urbana-Champaign: Gies College of Business",
    degree: "Master of Science in Management",
    location: "Illinois, USA",
    period: "October 2024 - Current",
    gpa: "Current GPA: 4.0"
  },
  {
    institution: "University of Applied Sciences (HTW) Berlin",
    degree: "Bachelor of Science",
    location: "Berlin, Germany",
    period: "April 2019 - October 2022",
    gpa: "German Grade: 1.5/1.0 (Graduated with distinction)"
  }
];

export interface Certification {
  title: string;
  issuer: string;
  year?: string;
  score?: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export const certifications: Certification[] = [
  {
    title: "Scrum Foundation Professional Certificate - SFPC",
    issuer: "Certiprof",
  },
  {
    title: "Lean Six Sigma White Belt Professional Certification - LSSWBPC",
    issuer: "Certiprof",
  },
  {
    title: "English Proficiency Certificate",
    issuer: "DET",
    year: "est. 2024",
    score: "155/160",
  },
  {
    title: "German B2 Certificate",
    issuer: "Goethe-Institut",
    year: "est. 2017",
  }
];

export const languages: Language[] = [
  {
    language: "English",
    proficiency: "Professional/Advanced Proficiency",
  },
  {
    language: "German",
    proficiency: "Working Proficiency (B2)",
  },
  {
    language: "Bahasa Indonesia",
    proficiency: "Native Proficiency",
  }
];