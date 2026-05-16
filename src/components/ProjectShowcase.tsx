"use client";

import { motion } from "framer-motion";
import { LiveMetric, MetricConfig } from "./LiveMetric";

type Project = {
  description: string;
  metric: string;
  config: MetricConfig;
  accent: string;
  border: string;
};

const projects: Project[] = [
  {
    description: "Private English learning platform.",
    metric: "PRIVATE SCHOOL",
    config: { type: "fixed", value: "01" },
    accent: "from-[#6d28d9]/20 to-transparent",
    border: "group-hover:border-[#6d28d9]/50",
  },
  {
    description: "Private Brazilian PvP experience.",
    metric: "ONLINE PLAYERS",
    config: { type: "random", min: 2, max: 20, initialValue: 8 },
    accent: "from-[#6d28d9]/20 to-transparent",
    border: "group-hover:border-[#6d28d9]/50",
  },
  {
    description: "Private outlet and supplier project.",
    metric: "MONTHLY FLOW",
    config: { type: "cumulative", baseDate: "2026-05-15T00:00:00-03:00", baseValue: 304, prefix: "R$ ", suffix: "K" },
    accent: "from-[#6d28d9]/20 to-transparent",
    border: "group-hover:border-[#6d28d9]/50",
  },
  {
    description: "Private local business landing page.",
    metric: "DAILY VISITS",
    config: { type: "random", min: 5, max: 50, initialValue: 12 },
    accent: "from-[#6d28d9]/20 to-transparent",
    border: "group-hover:border-[#6d28d9]/50",
  },
];

export default function ProjectShowcase() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-right flex flex-col items-end"
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white/90">
          PROJECTS
        </h2>
        <div className="w-12 h-1 bg-[#6d28d9] mt-4 rounded-full" />
      </motion.div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="glassmorphism-dark rounded-3xl p-6 md:p-8 border border-white/5 relative overflow-hidden group transition-all duration-500 hover:border-[#6d28d9]/30 shadow-[0_0_30px_rgba(0,0,0,0.2)] md:shadow-[0_0_50px_rgba(0,0,0,0.3)]"
          >
            {/* Glow de fundo - desativado no mobile */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6d28d9]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden md:block" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-md">
                <p className="text-white/80 font-medium text-lg md:text-xl tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 mt-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-8 h-[1px] bg-[#6d28d9]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#6d28d9]">Private</span>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.3em]">
                  {project.metric}
                </span>

                <div className="flex flex-col items-start md:items-end">
                  <LiveMetric config={project.config} />
                </div>
              </div>
            </div>

            {/* detalhe no canto superior */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-2 right-[-24px] rotate-45 w-full h-[1px] bg-[#6d28d9]/30" />
              <div className="absolute top-4 right-[-20px] rotate-45 w-full h-[1px] bg-[#6d28d9]/10" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* mensagem final */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-16 flex flex-col items-center justify-center text-center gap-1 group cursor-default"
      >
        <div className="flex items-center gap-3 mb-2 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
          <div className="w-8 h-[1px] bg-[#6d28d9]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#6d28d9] animate-pulse" />
          <div className="w-8 h-[1px] bg-[#6d28d9]" />
        </div>
        <p className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-[0.3em] group-hover:text-white/50 transition-colors duration-500">
          undisclosed projects running
        </p>
        <p className="text-[9px] md:text-[10px] font-mono text-[#6d28d9]/60 uppercase tracking-[0.4em] group-hover:text-glow transition-all duration-500">
          some operations remain encrypted
        </p>
      </motion.div>
    </section>
  );
}
