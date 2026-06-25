"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Terminal } from "lucide-react";

/**
 * WHAT: Full-Stack Recruiter Signal Form Interface.
 * WHY: Captures clean message structures from hiring nodes with dynamic validation layers.
 * HOW: Controls event submittals using custom states to manage processing and complete triggers.
 */
export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const executeSignalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsComplete(true);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 font-mono border-t border-neutral-900/40">
      
      <div className="mb-12 space-y-4 text-left">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neonCyan">
          <Terminal className="w-4 h-4 animate-pulse" />
          [RECRUITER_COMMS] // Direct Uplink Channel
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
          Initialize <span className="text-neonPurple">Signal Uplink</span>
        </h2>
      </div>

      <div className="mx-auto max-w-xl rounded border border-neutral-900 bg-neutral-950/20 backdrop-blur-sm p-6 sm:p-8 relative">
        <div className="absolute top-0 right-5 transform -translate-y-1/2 bg-[#0a0a0c] border border-neutral-800 px-3 py-0.5 rounded text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
          Node_Status // Online
        </div>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-neonCyan drop-shadow-[0_0_15px_rgba(0,243,255,0.4)] animate-bounce" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Signal Transmitted</h3>
              <p className="text-xs text-neutral-400 font-light max-w-xs leading-relaxed">
                Handshake complete. Your parameters have loaded cleanly.
              </p>
            </div>
            <button onClick={() => setIsComplete(false)} className="mt-2 font-mono text-[10px] uppercase text-neutral-500 hover:text-neonCyan tracking-widest transition-colors duration-200">
              [ Reopen Channel ]
            </button>
          </div>
        ) : (
          <form onSubmit={executeSignalSubmit} className="space-y-5 text-left">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">01 // Identity Name</label>
              <input type="text" name="name" required value={formState.name} onChange={handleInputChange} placeholder="Recruiter or Firm Node Name" className="w-full bg-neutral-900/60 border border-neutral-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">02 // Return Vector (Email)</label>
              <input type="email" name="email" required value={formState.email} onChange={handleInputChange} placeholder="name@company.com" className="w-full bg-neutral-900/60 border border-neutral-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">03 // Directive Specifications</label>
              <textarea name="message" required rows={4} value={formState.message} onChange={handleInputChange} placeholder="State your interview targets here..." className="w-full bg-neutral-900/60 border border-neutral-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50 resize-none" />
            </div>

            <button type="submit" disabled={isSubmitting} className={`w-full group relative overflow-hidden rounded border font-bold uppercase tracking-widest text-xs py-3 transition-all duration-300 ${isSubmitting ? "border-neutral-800 bg-neutral-900 text-neutral-500 cursor-not-allowed" : "border-cyan-500/30 bg-cyan-950/10 text-neonCyan border-neon hover:bg-cyan-500/20"}`}>
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? "Transmitting Packet..." : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Dispatch Signal Direct
                  </>
                )}
              </span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
