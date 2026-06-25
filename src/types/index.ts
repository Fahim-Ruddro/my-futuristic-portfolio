export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  category: "realtime" | "fintech" | "ai" | "security" | "microservices" | "utilities";
  imageUrl: string;
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  };
}

export interface Technology {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "aiml";
  proficiencyLevel: number; // Value out of 100
  metricLabel?: string; // WHY: Marked optional so elements without a metric label don't crash compilation!
  iconName?: string;    // WHY: Formally permitted so TechStack.tsx dataset objects parse seamlessly!
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  bulletPoints: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verificationUrl: string;
}
