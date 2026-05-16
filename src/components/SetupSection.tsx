"use client";

import { motion } from "framer-motion";

export default function SetupSection() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white/90 uppercase">
          Setup
        </h2>
        <div className="w-12 h-1 bg-[#6d28d9] mt-4 rounded-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="group relative rounded-3xl glassmorphism-dark border border-white/5 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] p-2 md:p-3"
      >
        {/* brilho roxo discreto no fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6d28d9]/5 via-transparent to-[#6d28d9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-black/50 border border-white/5">
          {/* overlay escuro suave */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
          
          {/* COMO USAR A IMAGEM DO SETUP:
              Coloque seu arquivo na pasta public/setup/ com o nome setup.png, setup.jpg ou setup.gif
              Altere o src abaixo para corresponder ao formato correto. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/setup/setup.png" 
            alt="My current setup" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
            onError={(e) => {
              // Fallback visual caso a imagem ainda não tenha sido adicionada
              (e.target as HTMLImageElement).style.display = 'none';
              if (e.currentTarget.parentElement) {
                const placeholder = document.createElement('div');
                placeholder.className = 'absolute inset-0 flex flex-col items-center justify-center text-white/20 font-mono text-sm tracking-widest uppercase';
                placeholder.innerHTML = '<span>[ SETUP IMAGE NOT FOUND ]</span><span class="text-[10px] mt-2 opacity-50">Upload /public/setup/setup.png</span>';
                e.currentTarget.parentElement.appendChild(placeholder);
              }
            }}
          />
        </div>

        {/* texto inferior */}
        <div className="absolute bottom-6 right-8 z-20 pointer-events-none hidden md:flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
          <div className="w-8 h-[1px] bg-[#6d28d9]" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/80">my current setup</span>
        </div>
      </motion.div>
    </section>
  );
}
