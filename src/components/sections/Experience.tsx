"use client";

import React from "react";
import { Briefcase } from "lucide-react";

/**
 * WHAT: Commercial Logistics Milestone Track.
 * WHY: Highlights past professional developer tenures to clear technical screenings.
 * HOW: Iterates through background arrays while outputting clean timeline nodes.
 */
export default function Experience() {
  const engineeringLogs = [
    {
      role: "Frontend Web Developer (Remote)",
      company: "Auto Spark",
      period: "Jan 2024 - Mar 2024",
      points: [
        "Constructed intuitive dashboard screens using modular React hooks, increasing layout loading speeds.",
        "Refactored visual interfaces to maintain strict responsive layout parameters across variable screen viewports.",
        "Synchronized frontend state parameters with async JSON data payloads delivered by API backend developers."
      ]
    },
    {
      role: "Web Application Developer (Internship)",
      company: "TechNest Solutions",
      period: "Jul 2023 - Sep 2023",
      points: [
        "Designed clean UI components, decreasing boilerplate code reproduction across engineering cohorts.",
        "Wiped out rendering anomalies across legacy web elements using Tailwind CSS class parameters.",
        "Participated in structural project standups to review application builds pre-deployment."
      ]
    }
  ];

  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 font-mono border-t border-neutral-900/40">
      <div className="mb-12 space-y-4 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neonCyan">
          <Briefcase className="w-4 h-4 text-neonCyan" />
          [LOGISTICS_DECK] // Corporate Ledger
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
          Work // <span className="text-neonCyan">Experience History</span>
        </h2>
      </div>

      <div className="space-y-6 max-w-4xl text-left">
        {engineeringLogs.map((log) => (
          <div 
            key={log.company}
            className="group relative border border-neutral-900 bg-neutral-950/20 p-6 rounded transition-all duration-300 hover:border-neutral-800"
          >
            {/* Animated Left Accent Rail */}
            <div className="absolute top-0 left-0 h-full w-[2px] bg-neutral-900 group-hover:bg-neonCyan transition-colors duration-300" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900/60 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white transition-colors group-hover:text-neonCyan">{log.role}</h3>
                <span className="text-xs text-neutral-500 font-medium">{log.company}</span>
              </div>
              <span className="text-[11px] text-neutral-400 font-bold bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800 h-fit w-fit">
                {log.period}
              </span>
            </div>
            
            <ul className="space-y-2 text-xs text-neutral-400 font-light list-none">
              {log.points.map((point, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="text-neutral-600 font-bold font-mono">&gt;</span>
                  <li>{point}</li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
