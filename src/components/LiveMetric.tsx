"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

export type MetricConfig = 
  | { type: "fixed"; value: string }
  | { type: "random"; initialValue: number; min: number; max: number; prefix?: string; suffix?: string }
  | { type: "cumulative"; baseValue: number; baseDate: string; prefix?: string; suffix?: string };

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";

function getInitialValue(config: MetricConfig): string {
    if (config.type === "fixed") return config.value;
    if (config.type === "random") return `${config.prefix || ""}${config.initialValue}${config.suffix || ""}`;
    if (config.type === "cumulative") {
        const msPerDay = 1000 * 60 * 60 * 24;
        const timePassed = Math.max(0, new Date().getTime() - new Date(config.baseDate).getTime());
        const daysPassed = Math.floor(timePassed / msPerDay);
        const msIntoDay = timePassed % msPerDay;
        const fractionalValue = Math.floor((msIntoDay / msPerDay) * 10) * 0.1;
        const totalValue = config.baseValue + daysPassed + fractionalValue;
        
        const formattedValue = Number.isInteger(totalValue) ? totalValue.toString() : totalValue.toFixed(1);
        return `${config.prefix || ""}${formattedValue}${config.suffix || ""}`;
    }
    return "";
}

export function LiveMetric({ config }: { config: MetricConfig }) {
  const initialValue = getInitialValue(config);
  
  const [displayValue, setDisplayValue] = useState("");
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasLoaded = useRef(false);

  // efeito inicial de embaralhar
  useEffect(() => {
    if (!isInView || hasLoaded.current) return;
    hasLoaded.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayValue(
        initialValue
          .split("")
          .map((char, index) => {
            if (index < iteration || char === " " || char === "$" || char === "R") {
              return initialValue[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= initialValue.length) {
        clearInterval(interval);
        setDisplayValue(initialValue);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [initialValue, isInView]);

  const triggerUpdate = useCallback(() => {
    if (config.type !== "random") return;
    
    setIsUpdating(true);
    
    // extrair numero
    const match = currentValue.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
    if (!match) {
        setIsUpdating(false);
        return;
    }

    const num = parseFloat(match[2]);
    
    // alterar valor
    const diff = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
    let newVal = Math.floor(num + diff);
    
    // limite de max e min
    if (newVal < config.min) newVal = config.min;
    if (newVal > config.max) newVal = config.max;
    
    const newFormattedValue = `${config.prefix || ""}${newVal}${config.suffix || ""}`;
    
    // efeito de glitch
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        setDisplayValue(
            newFormattedValue.split('').map(char => {
                if (Math.random() > 0.6) return char;
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('')
        );
        glitchCount++;
        
        if (glitchCount > 3) {
            clearInterval(glitchInterval);
            setDisplayValue(newFormattedValue);
            setCurrentValue(newFormattedValue);
            setTimeout(() => setIsUpdating(false), 800);
        }
    }, 40);

  }, [currentValue, config]);

  // atualizar aleatoriamente
  useEffect(() => {
      if (!hasLoaded.current || !isInView || config.type !== "random") return;

      const delay = Math.random() * 8000 + 4000;
      const timeout = setTimeout(() => {
          triggerUpdate();
      }, delay);

      return () => clearTimeout(timeout);
  }, [currentValue, triggerUpdate, isInView, config.type]);

  // atualizar cumulativo
  useEffect(() => {
      if (!hasLoaded.current || !isInView || config.type !== "cumulative") return;

      const interval = setInterval(() => {
          const newValue = getInitialValue(config);
          if (newValue !== currentValue) {
              setIsUpdating(true);
              
              let glitchCount = 0;
              const glitchInterval = setInterval(() => {
                  setDisplayValue(
                      newValue.split('').map(char => {
                          if (Math.random() > 0.6) return char;
                          return chars[Math.floor(Math.random() * chars.length)];
                      }).join('')
                  );
                  glitchCount++;
                  
                  if (glitchCount > 3) {
                      clearInterval(glitchInterval);
                      setDisplayValue(newValue);
                      setCurrentValue(newValue);
                      setTimeout(() => setIsUpdating(false), 800);
                  }
              }, 40);
          }
      }, 60000);

      return () => clearInterval(interval);
  }, [currentValue, isInView, config]);

  return (
    <div className="flex items-center gap-3">
        <div className="flex items-end gap-2">
            <motion.span 
                ref={ref} 
                animate={{
                    textShadow: isUpdating ? "0 0 15px rgba(109, 40, 217, 0.6), 0 0 30px rgba(109, 40, 217, 0.4)" : "0 0 0px rgba(109, 40, 217, 0)",
                    color: isUpdating ? "#e2e8f0" : "#ffffff"
                }}
                transition={{ duration: 0.3 }}
                className="font-mono text-2xl md:text-3xl tracking-wider relative transition-colors duration-300"
            >
            {displayValue || initialValue.replace(/[^\s$R]/g, "0")}
            </motion.span>
            
            {/* indicador live */}
            {config.type === "random" ? (
                <div className="flex items-center gap-[2px] mb-1.5 h-3">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-[2px] bg-[#6d28d9] rounded-full"
                            animate={{
                                height: ["4px", "10px", "4px"],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex items-center gap-[2px] mb-1.5 h-3">
                    <motion.div
                        className="w-[4px] h-[4px] bg-[#6d28d9] rounded-full"
                        animate={{
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            )}
        </div>
    </div>
  );
}
