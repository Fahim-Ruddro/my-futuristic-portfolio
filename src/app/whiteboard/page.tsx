"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Activity, ShieldAlert, Cpu } from "lucide-react";
import CanvasEngine from "@/components/whiteboard/CanvasEngine";

/**
 * WHAT: Full-Screen Structural Application Container Page for Project 1.
 * WHY: Sets up an isolated deployment view matrix to test and showcase the digital whiteboard.
 * HOW: Wraps our functional canvas engineering view inside an advanced systemic layout HUD.
 */
export default function WhiteboardProjectPage() {
  return (
    <div className="min-h-screen bg-transparent px-4 pb-12 pt-28 sm:px-6 lg:px-8 font-mono text-neutral-300 selection:bg-cyan-500/30 selection:text-cyan-400 relative z-10">
      
      {/* HUD HEADER DASHBOARD NAVIGATION BAR */}
      <header className="mx-auto max-w-7xl border border-neutral-900 bg-black/80 backdrop-blur-md rounded p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded border border-neutral-800 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-400 hover:border-neutral-700 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            RETURN.SYS
          </Link>
          <div className="h-4 w-[1px] bg-neutral-900 hidden sm:block" />
          <div className="space-y-0.5">
            <h1 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              Project_01 // Core Canvas Matrix
            </h1>
            <p className="text-[10px] text-neutral-500">
              SHARD ID: WR_NODE_01 // REAL-TIME MESH NODE
            </p>
          </div>
        </div>

        {/* CLOUD STATS MONITORING DISPLAYS */}
        <div className="flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5 rounded border border-neutral-900 bg-neutral-950/40 px-2.5 py-1">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span className="text-neutral-500">LATENCY:</span>
            <span className="text-cyan-400 font-bold">12.4ms</span>
          </div>
          <div className="flex items-center gap-1.5 rounded border border-neutral-900 bg-neutral-950/40 px-2.5 py-1">
            <ShieldAlert className="w-3 h-3 text-emerald-400" />
            <span className="text-neutral-500">SECURITY:</span>
            <span className="text-emerald-400 font-bold">RLS_ACTIVE</span>
          </div>
        </div>
      </header>

      {/* MAIN SYSTEM APPLICATION MATRIX */}
      <main className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-4">
        {/* SIDE ARCHITECTURAL OVERVIEW HUD */}
        <div className="rounded border border-neutral-900 bg-black/50 backdrop-blur-md p-5 space-y-4 lg:col-span-1 text-xs shadow-lg">
          <div className="text-cyan-400 uppercase tracking-widest font-bold border-b border-neutral-900 pb-2 text-[10px]">
            [SYSTEM_PARAMETERS]
          </div>
          <p className="text-neutral-400 leading-relaxed font-light text-[11px]">
            This sandbox isolates a real-time drawing module. It handles continuous coordinate generation pipelines directly inside the browser viewport.
          </p>
          <div className="space-y-2 pt-2">
            <div className="rounded bg-neutral-900/60 p-2 border border-neutral-900">
              <span className="block text-[9px] text-neutral-500 uppercase font-bold">Render Method</span>
              <span className="text-white font-medium">HTML5 Canvas 2D Context</span>
            </div>
            <div className="rounded bg-neutral-900/60 p-2 border border-neutral-900">
              <span className="block text-[9px] text-neutral-500 uppercase font-bold">Interpolation Loop</span>
              <span className="text-white font-medium">RequestAnimationFrame</span>
            </div>
            <div className="rounded bg-neutral-900/60 p-2 border border-neutral-900">
              <span className="block text-[9px] text-neutral-500 uppercase font-bold">Data Architecture</span>
              <span className="text-white font-medium">JSON Geometry Vector Shards</span>
            </div>
          </div>
        </div>

        {/* WORKSPACE DRAWING ENGAGEMENT SURFACE */}
        <div className="lg:col-span-3">
          <CanvasEngine />
        </div>
      </main>

    </div>
  );
}
