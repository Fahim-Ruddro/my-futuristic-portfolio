"use client";

import React from "react";
import { Terminal, RefreshCw } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-neutral-900/60 bg-[#070709] py-8 font-mono text-[11px] text-neutral-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 order-2 sm:order-1 text-center sm:text-left">
          <Terminal className="w-3.5 h-3.5 text-neutral-700" />
          <span>© {currentYear} FAHIM.ALL_RIGHTS_RESERVED // NEXT15_BUILD</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 order-1 sm:order-2">
          <div className="flex items-center gap-1.5 rounded bg-neutral-950 border border-neutral-900 px-2.5 py-1 text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            STATUS_OK
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded bg-neutral-950 border border-neutral-900 px-2.5 py-1 text-neutral-600">
            <RefreshCw className="w-3 h-3 text-neutral-700 animate-spin" style={{ animationDuration: '6s' }} />
            V1.0.42 // PRODUCTION
          </div>
        </div>
      </div>
    </footer>
  );
}
