"use client";

import React from "react";
import { 
  Github, Linkedin, Facebook, Instagram, Mail, 
  MessageSquare, Phone, Twitter, Gamepad2 
} from "lucide-react";

/**
 * WHAT: Clean Working Social Media Communications Layer.
 * WHY: Channels visiting interviewers cleanly to your real verified external profiles.
 * HOW: Maps personal absolute URLs with zero dangling array brackets or syntax anomalies.
 */
export default function SocialLinks() {
  const customCoordinates = [
           { icon: <Github className="w-4 h-4" />, url: "https://github.com/Fahim-Ruddro", label: "GitHub" },
           { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com/in/fahim-ruddro", label: "LinkedIn" },
           { icon: <Twitter className="w-4 h-4" />, url: "https://x.com/FahimRuddro", label: "Twitter" },
           { icon: <Facebook className="w-4 h-4" />, url: "https://facebook.com/FahimRuddro", label: "Facebook" },
           { icon: <Instagram className="w-4 h-4" />, url: "https://instagram.com/fahimruddro1", label: "Instagram" },
           { icon: <Gamepad2 className="w-4 h-4" />, url: "https://discordapp.com/users/614010644093599754", label: "Discord" },
           { icon: <MessageSquare className="w-4 h-4" />, url: "https://wa.me/+8801798577107", label: "WhatsApp" },
           { icon: <Phone className="w-4 h-4" />, url: "tel:+8801798577107", label: "Call Mobile" },
           { icon: <Mail className="w-4 h-4" />, url: "mailto:fahimruddro@gmail.com", label: "Email" },
  ];

  return (
    /* WHY: 'hidden md:flex' means this sidebar handles desktops and tablets, then hides safely on mobile phones to prevent layout collisions */
    <div className="hidden md:flex fixed left-6 bottom-0 z-40 flex-col items-center gap-3 animate-fadeIn">
      <div className="flex flex-col gap-2.5 border border-neutral-900 bg-neutral-950/60 backdrop-blur-md p-2 rounded-full border-neon shadow-[0_0_15px_rgba(0,243,255,0.05)]">
        {customCoordinates.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="p-2 rounded-full text-neutral-500 hover:text-neonCyan hover:bg-cyan-950/20 transition-all duration-200 group relative"
          >
            {social.icon}
            <span className="absolute left-11 top-1 scale-0 group-hover:scale-100 transition-all duration-150 rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[9px] font-mono font-bold uppercase text-white shadow-md block whitespace-nowrap z-50">
              {social.label}
            </span>
          </a>
        ))}
      </div>
      <div className="h-12 w-[1px] bg-gradient-to-b from-neutral-800 to-transparent" />
    </div>
  );
}
