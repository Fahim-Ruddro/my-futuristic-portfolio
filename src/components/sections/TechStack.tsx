"use client";

import React, { useState } from "react";
import { Layers, Layers3, Server, Database, BrainCircuit, Cpu } from "lucide-react";
import { Technology } from "@/types";

/**
 * WHAT: Full-Stack Engineering & AI/ML Tech Matrix Component.
 * WHY: Groups your specialized tech skills and AI models into a clean, searchable dashboard interface.
 * HOW: Controls active view categories using component states and renders animated percentage meters.
 */
export default function TechStack() {
  // WHAT: Establish a state tracker to store the id of the active capability category lane.
  const [activeTab, setActiveTab] = useState<string>("all");

  // WHAT: Highly descriptive data matrix reflecting your complete engineering skillset profile.
  const coreTechnologies: Technology[] = [
    // Category 1: Frontend Interface Layer
    { name: "React 19 / Next.js 15 (App Router)", category: "frontend", iconName: "frontend", proficiencyLevel: 90 },
    { name: "TypeScript Core Integration", category: "frontend", iconName: "frontend", proficiencyLevel: 85 },
    { name: "Tailwind CSS & Responsive UI Layouts", category: "frontend", iconName: "frontend", proficiencyLevel: 95 },
    
    // Category 2: Backend Shards Layer
    { name: "Node.js / Express Architecture", category: "backend", iconName: "backend", proficiencyLevel: 80 },
    { name: "RESTful APIs / Asynchronous Data Fetching", category: "backend", iconName: "backend", proficiencyLevel: 85 },
    
    // Category 3: Database Core Layer
    { name: "PostgreSQL Relational Systems", category: "database", iconName: "database", proficiencyLevel: 75 },
    { name: "MongoDB Document Schema Storage", category: "database", iconName: "database", proficiencyLevel: 80 },
    { name: "Supabase Backend-as-a-Service Module", category: "database", iconName: "database", proficiencyLevel: 85 },
    
    // Category 4: AI/ML & Machine Intelligence Data Shards (NEW EXPANDED SECTION)
    { name: "AI/ML Modeling (PyTorch Workspace)", category: "aiml", iconName: "aiml", proficiencyLevel: 85 },
    { name: "Large Language Models (LLM Engineering)", category: "aiml", iconName: "aiml", proficiencyLevel: 80 },
    { name: "Hugging Face Ecosystem & BERT Implementations", category: "aiml", iconName: "aiml", proficiencyLevel: 100 },
    { name: "Clinical NLP Pipeline Construction", category: "aiml", iconName: "aiml", proficiencyLevel: 75 },
    { name: "Python Mathematical Science (NumPy / SciPy)", category: "aiml", iconName: "aiml", proficiencyLevel: 90 },
    { name: "Academic Research Methodologies", category: "aiml", iconName: "aiml", proficiencyLevel: 85 },
    { name: "Mental Health Tech Design Patterns", category: "aiml", iconName: "aiml", proficiencyLevel: 80 }
  ];

  // WHAT: HUD Filtering Tab Button Configurations Array
  const sortingTabs = [
    { id: "all", label: "ALL.SYS", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "frontend", label: "FRONTEND UI", icon: <Layers3 className="w-3.5 h-3.5" /> },
    { id: "backend", label: "BACKEND INFRA", icon: <Server className="w-3.5 h-3.5" /> },
    { id: "database", label: "DB ENGINES", icon: <Database className="w-3.5 h-3.5" /> },
    { id: "aiml", label: "AI_ML MATRIX", icon: <BrainCircuit className="w-3.5 h-3.5 text-neonCyan" /> }
  ];

  // HOW: Filter the tech array rows down dynamically based on which button token is clicked.
  const visibleTechnologies = activeTab === "all"
    ? coreTechnologies
    : coreTechnologies.filter((tech) => tech.category === activeTab);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 font-mono">
      
      {/* CAPABILITIES SECTION HEADER GRAPHIC BLOCK */}
      <div className="mb-12 space-y-4 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neonCyan">
          <Cpu className="w-4 h-4 animate-pulse" />
          [CAPABILITIES_SCHEMA] // Technical Systems Core
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
          Architectural <span className="text-neonCyan">Tech Stack Matrix</span>
        </h2>
        <p className="max-w-2xl text-xs text-neutral-400 leading-relaxed font-light">
          Review the localized engineering systems and machine learning parameters comprising my active development stack. Hover over individual nodes to activate processing tracking bars.
        </p>
      </div>

      {/* DYNAMIC FILTERING HUD CONSOLE PILLED CONTROL ROW */}
      <div className="mb-10 flex flex-wrap gap-2 border-b border-neutral-900 pb-6">
        {sortingTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded px-3 py-1.5 text-xs tracking-wider border transition-all duration-200 ${
              activeTab === tab.id
                ? "border-neon bg-cyan-950/20 text-neonCyan shadow-[0_0_12px_rgba(0,243,255,0.15)]"
                : "border-neutral-800 bg-neutral-900/40 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* MATRIX DISPLAY CARD ROW GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleTechnologies.map((tech) => (
          <div
            key={tech.name}
            className="group relative overflow-hidden rounded border border-neutral-900/80 bg-neutral-950/20 backdrop-blur-sm p-4 space-y-3 transition-all duration-300 hover:border-neutral-800 hover:bg-neutral-950/50"
          >
            {/* Hover Accent Edge Shard Lighting Indicator */}
            <div className="absolute left-0 top-0 h-full w-[1.5px] bg-transparent group-hover:bg-neonCyan transition-all duration-200" />
            
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-300 group-hover:text-white transition-colors duration-150">
                  {tech.name}
                </span>
                <span className="text-[10px] text-neutral-500 font-bold tracking-wider uppercase">
                  {tech.proficiencyLevel}%
                </span>
              </div>

              {/* Progress Rail Track Level Meter Container */}
              <div className="h-1 w-full rounded bg-neutral-900 overflow-hidden relative">
                <div
                  className="h-full bg-neutral-800 group-hover:bg-gradient-to-r group-hover:from-neonCyan group-hover:to-neonPurple transition-all duration-500"
                  style={{ width: `${tech.proficiencyLevel}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-[9px] font-bold text-neutral-600 uppercase tracking-widest pt-1 border-t border-neutral-900/40">
              <span>Sector // {tech.category}</span>
              <span className="text-neutral-700 group-hover:text-neonCyan transition-colors duration-150">Compiled</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
