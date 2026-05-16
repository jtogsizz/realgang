"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative pt-12 md:pt-20 px-4 overflow-hidden">
      {/* BANNER SEPARADO - Mantendo visual premium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(109,40,217,0.15)]"
      >
        <div className="w-full h-40 md:h-64 relative bg-neutral-900/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/banner.gif"
            alt="Profile Banner"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
