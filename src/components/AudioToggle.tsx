"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element only on client side
    const audio = new Audio("/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }}
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full glassmorphism-dark hover:bg-white/10 transition-colors group"
      aria-label="Toggle Audio"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-white/80 group-hover:text-[#6d28d9] transition-colors" />
      ) : (
        <VolumeX className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
      )}
    </motion.button>
  );
}
