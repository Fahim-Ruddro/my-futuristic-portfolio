"use client";

import React from "react";
import Image from "next/image";
import { Download, ChevronDown } from "lucide-react";
import ParticleBackground from "../components/canvas/ParticleBackground";
import SocialLinks from "../components/sections/SocialLinks";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import TechStack from "../components/sections/TechStack";
import ProjectsGrid from "../components/sections/ProjectsGrid";
import Certificates from "../components/sections/Certificates";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

/**
 * WHAT: Full-Stack Personal Architecture Master Controller (100% Complete Production Shard).
 * WHY: Integrates your complete background, portrait assets, timelines, and credentials into one place.
 * HOW: Controls clean section mounting to force local servers to drop legacy layout versions.
 */
export default function HomePage() {
  
  // WHAT: Real-World CV Download Utility Pipeline.
  // WHY: Gives technical recruiters friction-free access to your verified background history.
  // HOW: Hooks into your local public folder directory to execute an automated asset pull.
  const handleCvDownload = () => {
    const downloadUrl = "/Fahim_Ibne_Sharif_CV.pdf"; // WHY: Points directly to your real PDF name path!
    const linkElement = document.createElement("a");
    linkElement.href = downloadUrl;
    linkElement.setAttribute("download", "Fahim_Ibne_Sharif_FullStack_CV.pdf");
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  return (
    <div id="terminal-top" className="relative min-h-screen w-full bg-transparent text-neutral-200 font-mono">
      {/* 3D GRAPHICS ENVIRONMENT CANVAS BACKGROUND */}
      <ParticleBackground />

      {/* COMPONENT MODULE: Responsive External Social Connections Sidebar HUD Layer */}
      <SocialLinks />

      {/* MODULE 1: INTERACTIVE HERO HOME SCREEN VIEW CHANNELS */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
        <div className="max-w-3xl flex flex-col items-center space-y-6">
          
          {/* WHAT: Your Circular Cybernetic Profile Portrait Container Frame */}
          {/* WHY: Instantly personalizes the landing space with hardware-accelerated glowing boundaries */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-b from-neonCyan to-neonPurple shadow-[0_0_20px_rgba(0,243,255,0.25)] border-neon animate-pulse-slow overflow-hidden group">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0a0a0c]">
              <Image 
                src="/profile.jpg"
                alt="Fahim Ibne Sharif Portrait Shard"
                fill
                priority
                sizes="(max-w-768px) 128px, 160px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 px-3.5 py-1.5 text-[10px] font-semibold text-neonCyan uppercase tracking-widest border-neon">
            <span className="h-1.5 w-1.5 rounded-full bg-neonCyan animate-ping" />
            Core System Engine: Connected // Matrix Shard Active
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white uppercase leading-none">
            Fahim Ibne Sharif <br />
            <span className="bg-gradient-to-r from-neonCyan via-neutral-200 to-neonPurple bg-clip-text text-transparent neon-glow-cyan text-xl sm:text-3xl block mt-3 normal-case tracking-wide font-light">
              Full-Stack Developer & AI Specialist
            </span>
          </h1>
          
          <p className="mx-auto max-w-xl text-xs text-neutral-400 font-light leading-relaxed">
            Architecting production-ready frontends and engineering specialized machine learning workflows. Move your cursor to morph the underlying 3D WebGL particle landscape layout.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 text-xs w-full sm:w-auto">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto relative group overflow-hidden rounded border border-cyan-500/30 bg-cyan-950/10 px-6 py-3 font-semibold tracking-widest uppercase text-neonCyan transition-all duration-300 hover:bg-cyan-500/20 border-neon"
            >
              Access Projects Deck
            </a>

            <button
              onClick={handleCvDownload}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded border border-neutral-800 bg-neutral-900/60 px-6 py-3 font-semibold tracking-widest uppercase text-neutral-300 transition-all duration-300 hover:border-neutral-700 hover:text-white"
            >
              <Download className="w-4 h-4 text-neutral-500" />
              Download CV // .PDF
            </button>
          </div>
        </div>
      </div>

      {/* MODULE 2: ABOUT PROFILE CORE METRICS */}
      <About />

      {/* MODULE 3: HISTORICAL MILESTONES HISTORY TIMELINE */}
      <Experience />

      {/* MODULE 4: ARCHITECTURAL CAPABILITIES MATRIX DATA TECH STACK */}
      <div id="stack" className="relative z-10 border-t border-neutral-900/40 bg-[#070709]/40">
        <TechStack />
      </div>

      {/* MODULE 5: REPOSITORIES CHANNELS SHOWCASE GRIDS DECK */}
      <ProjectsGrid />

      {/* MODULE 6: VERIFIED ACADEMIC CREDENTIAL TOKENS */}
      <Certificates />

      {/* MODULE 7: SECURE TUNNEL INBOUND HANDSHAKE COMMUNICATIONS FORM */}
      <Contact />

      {/* MODULE 8: SYSTEM REPORT TELEMETRY RECONCILIATION FOOTER */}
      <Footer />
    </div>
  );
}
