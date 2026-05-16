"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Clock, Users } from "lucide-react";

export default function LiveStatus() {
  const [time, setTime] = useState<string>("");
  const [visitors, setVisitors] = useState(8);
  const [displayVisitors, setDisplayVisitors] = useState("8");
  const [isUpdatingVisitors, setIsUpdatingVisitors] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    
    // oscilacao fake dos visitantes
    let visitorTimeout: NodeJS.Timeout;
    const updateVisitors = () => {
      setVisitors(prev => {
        const diff = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
        let next = prev + diff;
        if (next < 5) next = 5 + Math.floor(Math.random() * 3);
        if (next > 20) next = 20 - Math.floor(Math.random() * 3);
        return next;
      });
      visitorTimeout = setTimeout(updateVisitors, Math.random() * 8000 + 4000);
    };
    
    visitorTimeout = setTimeout(updateVisitors, Math.random() * 4000 + 2000);

    return () => {
      clearInterval(timeInterval);
      clearTimeout(visitorTimeout);
    };
  }, []);

  // animacao quando atualiza
  useEffect(() => {
    if (visitors.toString() === displayVisitors) return;

    const t = setTimeout(() => {
      setIsUpdatingVisitors(true);
    }, 0);
    
    const chars = "0123456789!?#";
    let glitchCount = 0;
    const targetStr = visitors.toString();
    
    const glitchInterval = setInterval(() => {
      setDisplayVisitors(targetStr.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
      glitchCount++;
      if (glitchCount > 3) {
        clearInterval(glitchInterval);
        setDisplayVisitors(targetStr);
        setTimeout(() => setIsUpdatingVisitors(false), 500);
      }
    }, 40);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(t);
    };
  }, [visitors, displayVisitors]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="glassmorphism-dark rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.2)] md:shadow-[0_0_50px_rgba(0,0,0,0.3)]"
      >
        {/* glow da borda - desativado no mobile */}
        {!isMobile && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6d28d9]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}

        {/* avatar e info */}
        <div className="flex flex-col md:flex-row items-center gap-6 z-10">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/profile.gif" 
              alt="Profile Avatar" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#050505] shadow-[0_0_30px_rgba(109,40,217,0.3)] object-cover bg-neutral-900"
            />
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#23a559] border-4 border-[#0b0712]">
              <span className="absolute inset-0 rounded-full bg-[#23a559] animate-ping opacity-75" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-black text-2xl md:text-3xl text-white mb-1 uppercase tracking-tight">JTO</h3>
            <p className="text-sm md:text-base text-white/50 flex items-center justify-center md:justify-start gap-2">
              <Activity className="w-4 h-4 text-[#6d28d9]" />
              Currently building projects
            </p>
          </div>
        </div>

        {/* contadores */}
        <div className="flex gap-10 md:gap-16 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-t-0 pt-8 md:pt-0 z-10">
          <div className="flex flex-col items-center md:items-end">
            <span className="text-xs text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" /> Local Time
            </span>
            <span className="font-mono text-[#6d28d9] text-glow text-2xl md:text-3xl">{time || "00:00:00"}</span>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-xs text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1 font-mono">
              <Users className="w-3 h-3" /> Visitors
            </span>
            <motion.span 
              animate={{
                textShadow: isUpdatingVisitors ? "0 0 15px rgba(109, 40, 217, 0.8), 0 0 30px rgba(109, 40, 217, 0.4)" : "0 0 0px rgba(109, 40, 217, 0)",
                color: isUpdatingVisitors ? "#e2e8f0" : "rgba(255, 255, 255, 0.8)",
                scale: isUpdatingVisitors ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
              className="font-mono text-2xl md:text-3xl inline-block"
            >
              {displayVisitors}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
