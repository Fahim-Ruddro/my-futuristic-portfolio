"use client";

import React, { useState, useEffect } from "react";
import { Cpu, ExternalLink, Github, Terminal, AlertCircle } from "lucide-react";
import { Project } from "@/types";

/**
 * WHAT: Full-Stack Project Showcase Grid Deck (Reconciled Type-Safe Shard).
 * WHY: Connects directly to our backend API to render recruiter-crushing apps fluidly.
 * HOW: Executes a runtime data fetch, handles loading states, and provides dynamic data category filtering.
 */
export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Aligned perfectly with your strict types definition schema categories
  const filterCategories = [
    { id: "all", label: "ALL.SYS" },
    { id: "realtime", label: "REALTIME" },
    { id: "fintech", label: "FINTECH" },
    { id: "ai", label: "AI_NATIVE" },
    { id: "security", label: "SECURITY" },
    { id: "microservices", label: "DISTRIBUTED" },
    { id: "utilities", label: "UTILITIES" }
  ];

  useEffect(() => {
    async function fetchProjectData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error(`Network protocol failure: HTTP status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle structural normalization if the payload arrives as an unexpected wrapper object
        const normalizedProjects: Project[] = Array.isArray(data) 
          ? data 
          : (data as any).data || [];

        setProjects(normalizedProjects);
      } catch (err: any) {
        console.error("Fetch failure inside project grid module:", err);
        setError(err.message || "Unknown system stream parsing failure.");
      } finally {
        setLoading(false);
      }
    }
    fetchProjectData();
  }, []);

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 font-mono">
      
      {/* SECTION HEADER BLOCK */}
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
          <Terminal className="w-4 h-4 animate-pulse" />
          [DEPLOYMENT_LOG] // Core Repositories
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
          System Core <span className="text-purple-500">Projects Deck</span>
        </h2>
        <p className="max-w-2xl text-xs text-neutral-400 leading-relaxed font-light text-left">
          Click indexing nodes below to traverse isolated full-stack system topologies. Each entry validates advanced data orchestrations.
        </p>
      </div>

      {/* DYNAMIC FILTERING HUD CONTROL */}
      <div className="mb-10 flex flex-wrap gap-2 border-b border-neutral-900 pb-6">
        {filterCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`rounded px-3 py-1.5 text-xs tracking-wider border transition-all duration-200 ${
              activeFilter === category.id
                ? "border-cyan-500 bg-cyan-950/20 text-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.1)]"
                : "border-neutral-800 bg-neutral-900/40 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* CORE INTERACTIVE RENDERING STATE PIPELINES */}
      {loading && (
        <div className="flex h-48 flex-col items-center justify-center gap-3 text-neutral-500 text-xs">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-800 border-t-cyan-400" />
          Indexing operational data sectors...
        </div>
      )}

      {error && (
        <div className="flex p-4 rounded border border-red-500/20 bg-red-950/10 text-red-400 text-xs items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>System Threat Warning: {error} - Check network client configuration credentials.</span>
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            // Safely read out the technology array pills mapped straight from types index requirements
            const displayStackPills = Array.isArray(project.techStack) ? project.techStack.slice(0, 6) : [];

            // Read metrics cleanly as an explicit singular object node
            const cardMetric = project.metrics && project.metrics.label ? project.metrics : null;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-neutral-950/70"
              >
                {/* Card Cyber Layout Accent Line */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 group-hover:w-full" />
                
                <div className="p-5 space-y-4">
                  {/* CARD METADATA TIMELINE NODE */}
                  <div className="flex items-center justify-between text-[10px] text-neutral-500">
                    <span className="uppercase tracking-widest text-neutral-600">ID: {project.id.slice(0, 8)}</span>
                    {cardMetric && (
                      <span className="rounded bg-cyan-950/30 border border-cyan-500/20 px-2 py-0.5 text-cyan-400">
                        {cardMetric.label}: {cardMetric.value}
                      </span>
                    )}
                  </div>

                  {/* CARD TITLE & TEXT PARAMETERS */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="text-sm font-bold text-white transition-colors group-hover:text-cyan-400">
                      {project.title}
                    </h3>
                    <p className="text-xs font-light leading-relaxed text-neutral-400 line-clamp-3">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* CARD TECH STACK PILLS CONSOLE */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {displayStackPills.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-neutral-900 border border-neutral-800/80 px-2 py-0.5 text-[10px] text-neutral-400 group-hover:border-neutral-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CARD DEPLOYMENT CONTROLS FOOTER */}
                <div className="flex items-center justify-between border-t border-neutral-900/80 bg-neutral-950/60 px-5 py-3 text-xs">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-colors duration-200"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Codebase
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-200 hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Shard
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
