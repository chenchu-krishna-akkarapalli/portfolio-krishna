"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

// Micro Corner Brackets for interactive locking
function InputCornerBrackets({ isFocused, isHovered }: { isFocused: boolean; isHovered: boolean }) {
  const show = isFocused || isHovered;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 450, damping: 26 }}
          className="absolute inset-0 pointer-events-none z-10"
        >
          {/* Top-Left Bracket */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/80 rounded-tl-[2px]" />
          {/* Top-Right Bracket */}
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400/80 rounded-tr-[2px]" />
          {/* Bottom-Left Bracket */}
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400/80 rounded-bl-[2px]" />
          {/* Bottom-Right Bracket */}
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/80 rounded-br-[2px]" />
          
          {isFocused && (
            <span className="absolute inset-0 bg-cyan-500/5 rounded-medium border border-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.2)]" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  
  // Subscriber telemetry states
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [typingCommand, setTypingCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Trigger sci-fi subscription transaction sequence
    setSubscribedEmail(email);
    setEmail("");
  };

  useEffect(() => {
    if (!subscribedEmail) return;

    setTypingCommand("");
    setConsoleLines([]);

    let charIndex = 0;
    const commandText = `$ npx subscribe --email ${subscribedEmail}`;
    
    // Typewriter command simulation
    const typingInterval = setInterval(() => {
      if (charIndex < commandText.length) {
        setTypingCommand((prev) => prev + commandText[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Log stream sequence
        const logs = [
          "CONNECTING TO VECTOR ANCHORS...",
          "PRIMING Higgs Boson Confinement Field: OK",
          "Warpage Factor: 96% Buoyancy Synced",
          "SECURE DIGITAL METRIC CHANNEL LINKED!",
          "TRANSMISSION COMPLETED: STATUS 200 (SUCCESS)"
        ];
        
        let logIndex = 0;
        const logInterval = setInterval(() => {
          if (logIndex < logs.length) {
            setConsoleLines((prev) => [...prev, logs[logIndex]]);
            logIndex++;
          } else {
            clearInterval(logInterval);
          }
        }, 150);
      }
    }, 20);

    return () => {
      clearInterval(typingInterval);
    };
  }, [subscribedEmail]);

  return (
    <div className="relative flex w-full flex-col gap-[20px] overflow-hidden select-none">
      {/* Quantum Grid Backdrop */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,240,255,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,240,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "14px 14px"
        }}
      />

      <p className="w-full max-w-[576px] text-[13px] sm:text-[14px] font-medium leading-[1.6] text-text-secondary z-10 font-mono tracking-wide">
        I document my learnings once a month. I would love to share them with you over mail. No bulls**t. No spam. Straight up value.
      </p>

      <form 
        onSubmit={handleSubmit} 
        className="relative flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-[14px] z-10"
      >
        {/* Email Input Field with Corner Brackets */}
        <div 
          className="relative flex-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="you@example.com"
            suppressHydrationWarning={true}
            className="h-[50px] w-full rounded-medium border border-border-strong bg-bg-primary/80 px-[18px] text-[14px] sm:text-[15px] font-medium text-white placeholder-text-placeholder outline-none transition-all duration-300 focus:border-cyan-500/50 font-mono tracking-wide"
          />
          <InputCornerBrackets isFocused={isFocused} isHovered={isHovered} />
        </div>

        {/* Action Button with Confinement Brackets */}
        <div 
          className="relative shrink-0"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
        >
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 450, damping: 15 }}
            suppressHydrationWarning={true}
            className="flex h-[50px] w-full sm:w-auto cursor-pointer items-center justify-center rounded-medium bg-white px-[28px] text-[14px] sm:text-[15px] font-bold text-black hover:bg-cyan-50 transition-colors focus:outline-none shrink-0 font-mono uppercase tracking-widest relative"
          >
            Subscribe
          </motion.button>
          <InputCornerBrackets isFocused={false} isHovered={btnHovered} />
        </div>
      </form>

      {/* Subscription Cockpit Terminal logs */}
      <AnimatePresence>
        {subscribedEmail && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="relative border border-cyan-500/10 bg-[#040609]/90 rounded-lg p-3.5 font-mono text-[11px] leading-relaxed shadow-inner overflow-hidden max-w-[576px] z-10"
          >
            {/* Header info */}
            <div className="flex justify-between items-center text-[9px] text-gray-500 border-b border-white/5 pb-2 mb-2 select-none">
              <span>TRANSMISSION_CONDUIT // SYNCHED</span>
              <span className="text-cyan-400 animate-pulse">SECURE_LINK</span>
            </div>
            
            <div className="text-white font-medium break-all">
              {typingCommand}
              <span className="animate-pulse inline-block h-3 w-1 bg-white ml-0.5 align-middle" />
            </div>

            <div className="flex flex-col gap-1 mt-2 text-gray-400">
              {consoleLines.map((line, idx) => (
                <div key={idx} className="flex items-start gap-1">
                  <span className="text-cyan-500 shrink-0 select-none">›</span>
                  <span className={line.includes("SUCCESS") || line.includes("OK") ? "text-emerald-400 font-semibold" : ""}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
