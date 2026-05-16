"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("INITIALIZING REALGANG...");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setText("ACCESS GRANTED");
    }, 1500);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        className="text-[#6d28d9] font-mono text-xl md:text-3xl tracking-widest uppercase text-glow"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.div>
      
      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.5))',
          backgroundSize: '100% 4px'
        }}
      />
    </motion.div>
  );
}
