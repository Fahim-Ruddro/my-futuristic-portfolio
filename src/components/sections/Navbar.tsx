"use client";

import React, { useState } from "react";
import { Menu, X, Home, User, Briefcase, Cpu, Award } from "lucide-react";
import { 
  Github, Linkedin, Facebook, Instagram, Mail, 
  MessageSquare, Phone, Twitter, Gamepad2 
} from "lucide-react";

/**
 * WHAT: Clean Responsive Navbar & Mobile Drawer Engine.
 * WHY: Provides unbroken, streamlined viewport routing without loose icon drops.
 * HOW: Maps precise links while filtering secondary direct contact elements out of home grids.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#terminal-top", icon: <Home className="w-3.5 h-3.5" /> },
    { name: "About", href: "#about", icon: <User className="w-3.5 h-3.5" /> },
    { name: "Experience", href: "#experience", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { name: "Tech Stack", href: "#stack", icon: <Cpu className="w-3.5 h-3.5" /> },
    { name: "Projects Deck", href: "#projects", icon: <Cpu className="w-3.5 h-3.5" /> },
    { name: "Certificates", href: "#certificates", icon: <Award className="w-3.5 h-3.5" /> },
    { name: "Contact Me", href: "#contact", icon: <Briefcase className="w-3.5 h-3.5" /> },
  ];

  const mobileSocials = [
    { icon: <Github className="w-4 h-4" />, url: "https://github.com" },
    { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com" },
    { icon: <Twitter className="w-4 h-4" />, url: "https://x.com" },
    { icon: <Facebook className="w-4 h-4" />, url: "https://facebook.com" },
    { icon: <Instagram className="w-4 h-4" />, url: "https://instagram.com" },
    { icon: <Gamepad2 className="w-4 h-4" />, url: "https://discordapp.com" },
    { icon: <MessageSquare className="w-4 h-4" />, url: "https://wa.me" },
    { icon: <Phone className="w-4 h-4" />, url: "tel:+8801798577107" },
    { icon: <Mail className="w-4 h-4" />, url: "mailto:fahimruddro@gmail.com" }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    setIsOpen(false); 
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-neutral-900/80 bg-[#0a0a0c]/90 backdrop-blur-md font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <a href="#terminal-top" onClick={(e) => scrollToSection(e, "#terminal-top")} className="flex items-center gap-2 group cursor-pointer">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neonCyan" />
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-white transition-colors duration-200 group-hover:text-neonCyan">
              Fahim Ibne Sharif
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-neutral-400 transition-colors duration-200 hover:text-neonCyan group">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="rounded border border-cyan-500/20 bg-cyan-950/10 px-3.5 py-1.5 text-[10px] font-semibold text-neonCyan uppercase tracking-widest transition-all duration-300 hover:bg-cyan-500/20 border-neon">Signal Recruiter</a>
          </div>

          <div className="flex lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="p-2 rounded border border-neutral-900 bg-neutral-900/40 text-neutral-400 hover:text-white focus:outline-none">
              {isOpen ? <X className="w-5 h-5 text-neonCyan" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-neutral-900 bg-[#0a0a0c]/98 backdrop-blur-xl w-full px-4 py-5 space-y-4 font-mono shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col space-y-0.5">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="flex items-center gap-3.5 rounded px-4 py-2.5 text-xs font-medium text-neutral-400 hover:bg-neutral-900/60 hover:text-neonCyan transition-all duration-150">
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-900/80">
            <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest block px-4 mb-3">// Direct channels uplink</span>
            <div className="flex flex-wrap items-center justify-start gap-2 px-3">
              {mobileSocials.map((social, idx) => (
                <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="p-2.5 rounded border border-neutral-900 bg-neutral-900/40 text-neutral-400 hover:text-neonCyan hover:border-cyan-500/20 transition-all duration-150">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
