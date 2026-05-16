"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

const COMMANDS: Record<string, React.ReactNode> = {
  whoami: <span className="text-white">JTO</span>,
  status: <span className="text-[#23a559]">online</span>,
  projects: (
    <div className="flex flex-col gap-1 mt-1 text-white/70">
      <span>Private projects loaded. Directory access restricted.</span>
    </div>
  ),
  mood: <span className="text-[#6d28d9] text-glow">locked in</span>,
  help: (
    <div className="flex flex-col gap-1 mt-1 text-white/70">
      <span>Available commands:</span>
      <span>- whoami</span>
      <span>- status</span>
      <span>- projects</span>
      <span>- mood</span>
      <span>- clear</span>
    </div>
  )
};

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    { command: "help", output: COMMANDS.help }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = COMMANDS[cmd] || <span className="text-[#7c3aed]">Command not found. Type &apos;help&apos; for available commands.</span>;

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="glassmorphism-dark rounded-xl border border-white/10 overflow-hidden box-glow"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-black/80 px-4 py-3 flex items-center gap-2 border-b border-white/10">
          <Terminal className="w-4 h-4 text-white/50" />
          <span className="text-xs font-mono text-white/50">jto@realgang.life: ~</span>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="p-4 h-[300px] overflow-y-auto font-mono text-sm"
        >
          {history.map((log, i) => (
            <div key={i} className="mb-4">
              <div className="flex items-center gap-2 text-white/70">
                <span className="text-[#6d28d9]">❯</span>
                <span>{log.command}</span>
              </div>
              <div className="mt-1 ml-4">{log.output}</div>
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex items-center gap-2 text-white/70">
            <span className="text-[#6d28d9]">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono"
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      </motion.div>
    </section>
  );
}
