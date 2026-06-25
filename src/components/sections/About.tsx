"use client";

import React from "react";
import Image from "next/image"; // WHAT: Import Next.js high-performance image handler component
import { User, Terminal } from "lucide-react";

/**
 * WHAT: Identity Assessment Dashboard Shard with Embedded Photo.
 * WHY: Visually introduces your engineering profile to hiring managers.
 * HOW: Combines text containers with optimized structural portrait nodes.
 */
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 font-mono border-t border-neutral-900/40">
      <div className="mb-12 space-y-4 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neonCyan">
          <User className="w-4 h-4 text-neonCyan" />
          [PROFILE_DATA_STREAM] // Identity Mainframe
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
          About // <span className="text-neonPurple">Systems Core</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3 text-xs leading-relaxed font-light text-neutral-400 text-left">
        {/* Core Context Terminal Card */}
        <div className="md:col-span-2 space-y-4 bg-neutral-950/20 border border-neutral-900 rounded p-6">
          
          {/* WHAT: Responsive Image Card for Mobile Phones Layout Views */}
          {/* WHY: Ensures your photo loads beautifully inline when viewed on cell phone viewports */}
          <div className="md:hidden relative w-24 h-24 rounded border border-neutral-800 bg-neutral-900/40 overflow-hidden mb-4 float-left mr-4 p-0.5 border-neon">
            <div className="relative w-full h-full overflow-hidden rounded bg-[#0a0a0c]">
              <Image src="/profile.jpg" alt="Fahim Portrait Inline" fill className="object-cover object-top" />
            </div>
          </div>

          <p>
            I am a highly driven Computer Science and Engineering graduate focused tightly on merging high-performance full-stack web environments with robust machine learning pipelines. My architectural approach centers completely on mathematical scaling accuracy, strict semantic code safety, and clean component definitions.
          </p>
          <p>
            Beyond standard web applications, I actively explore Artificial Intelligence systems—structuring customized clinical Natural Language Processing (NLP) pipeline configurations, fine-tuning transformer array matrices via Hugging Face, and constructing high-efficiency data encoders.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900/60 text-[11px]">
            <div>
              <span className="text-neutral-500 block uppercase font-bold text-[9px]">Location Vector</span>
              <span className="text-white">Rajshahi, Bangladesh // Global Contract Sync</span>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase font-bold text-[9px]">Academic Shard</span>
              <span className="text-white">B.Sc. CSE Graduate // Deep Learning Focus</span>
            </div>
          </div>
        </div>

        {/* WHAT: Large Desktop-Facing Visual Image Frame Card */}
        {/* WHY: Standard sidebar block replacement to fill space with premium portfolio media metrics */}
        <div className="hidden md:flex border border-neutral-900 bg-neutral-950/40 rounded p-6 flex-col items-center justify-center space-y-4 group">
          <div className="relative w-full aspect-[4/5] rounded border border-neutral-800 overflow-hidden bg-[#0a0a0c]">
            <Image 
              src="/profile.jpg" 
              alt="Fahim Corporate Profile Portrait Shard" 
              fill
              sizes="(min-w-768px) 300px"
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-102"
            />
          </div>
          <div className="w-full text-center font-mono text-[10px] text-neutral-500 uppercase tracking-widest border-t border-neutral-900/60 pt-3">
            Identity Node // Verified Signature
          </div>
        </div>
      </div>
    </section>
  );
}
