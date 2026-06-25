"use client";

import React from "react";
import { Award, GraduationCap } from "lucide-react";

/**
 * WHAT: Full-Stack Academic & AI/ML Certificate Registry.
 * WHY: Proves continuous learning matrices directly to hiring technical managers.
 * HOW: Iterates through an expanded data array to populate a balanced 3-column desktop layout.
 */
export default function Certificates() {
  // WHAT: Your complete registry of 6 specialized achievements and degrees.
  const verifiedCredentials = [
    { title: "B.Sc. in Computer Science & Engineering", authority: "University Graduate Profile Shard", year: "2024" },
    { title: "Advanced Full-Stack Engineering Blueprint", authority: "Technical Systems Core Lab", year: "2025" },
    { title: "Natural Language Processing & Advanced AI Architectures", authority: "Academic Data Science Cohort", year: "2025" },
    { title: "Deep Learning Specialization & Neural Networks", authority: "Machine Intelligence Shard Matrix", year: "2025" },
    { title: "Clinical Data Science & Electronic Health Records Pipeline", authority: "Bioinformatics Systems Center", year: "2026" },
    { title: "Enterprise Database Systems & Query Optimization", authority: "SQL Architectural Engineering Group", year: "2026" }
  ];

  return (
    <section id="certificates" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 font-mono border-t border-neutral-900/40">
      
      {/* CAPABILITIES SECTION SUB-HEADER */}
      <div className="mb-12 space-y-4 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neonCyan">
          <Award className="w-4 h-4 text-neonCyan animate-pulse" />
          [REGISTRY_CREDENTIALS] // Shard Verification Signatures
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
          Certificates & // <span className="text-neonPurple">Education Nodes</span>
        </h2>
        <p className="max-w-2xl text-xs text-neutral-400 leading-relaxed font-light">
          Review the authenticated cryptographic signatures validating my computer science background and machine intelligence specializations.
        </p>
      </div>

      {/* THREE-COLUMN CARDS GRID LAYOUT LAYER */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
        {verifiedCredentials.map((cert) => (
          <div 
            key={cert.title}
            className="group relative border border-neutral-900 bg-neutral-950/20 p-5 rounded space-y-4 flex flex-col justify-between hover:border-neutral-800 transition-all duration-300"
          >
            {/* Visual Hover Edge Shard Glow Highlight */}
            <div className="absolute top-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-neonCyan to-neonPurple transition-all duration-500 group-hover:w-full" />
            
            <div className="space-y-2">
              <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-neutral-600 transition-colors group-hover:text-neonCyan" />
                VERIFIED_NODE // {cert.year}
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wide leading-snug line-clamp-2 transition-colors group-hover:text-neonCyan">
                {cert.title}
              </h3>
            </div>
            
            <p className="text-[11px] font-light text-neutral-400 border-t border-neutral-900/60 pt-2.5 font-mono">
              {cert.authority}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
