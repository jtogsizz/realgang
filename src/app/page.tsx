"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import SocialSection from "@/components/SocialSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import LiveStatus from "@/components/LiveStatus";
import InteractiveTerminal from "@/components/InteractiveTerminal";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // forcar scroll pro topo
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* esconde conteudo ate carregar */}
      <div
        className="w-full relative z-10 transition-opacity duration-1000"
        style={{ opacity: loading ? 0 : 1, pointerEvents: loading ? "none" : "auto" }}
      >
        <HeroSection />
        
        <div className="relative z-20 pb-20">
          <LiveStatus />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />
          
          <SocialSection />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />
          
          <ProjectShowcase />
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />
          
          <InteractiveTerminal />
        </div>

        {/* rodape */}
        <footer className="text-center py-8 border-t border-white/5 bg-black/50 backdrop-blur-md relative z-20">
          <p className="text-white/30 text-sm font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} REALGANG. No fake. No weak.
          </p>
        </footer>
      </div>
    </main>
  );
}
