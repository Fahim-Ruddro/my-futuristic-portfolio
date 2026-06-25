import type { Metadata } from "next";
import "./global.css";
import Navbar from "@/components/sections/Navbar";

export const metadata: Metadata = {
  title: "Fahim Ibne Sharif | Full-Stack Creative Engineer",
  description: "Advanced full-stack systems engineering portfolio showcasing production-ready AI models and web deployments.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#0a0a0c] text-neutral-200 selection:bg-cyan-500 selection:text-black">
        {/* Global Navigation HUD Layout Shell */}
        <Navbar />
        
        {/* Core Content Stream */}
        <main className="relative min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
