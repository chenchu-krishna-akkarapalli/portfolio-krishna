"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Corner Confinement Brackets for inputs and textarea fields
function InputCornerBrackets({ isFocused, isHovered }: { isFocused: boolean; isHovered: boolean }) {
  const show = isFocused || isHovered;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          className="absolute inset-0 pointer-events-none z-10"
        >
          {/* Top-Left Bracket */}
          <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-400/80 rounded-tl-[2px]" />
          {/* Top-Right Bracket */}
          <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyan-400/80 rounded-tr-[2px]" />
          {/* Bottom-Left Bracket */}
          <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-cyan-400/80 rounded-bl-[2px]" />
          {/* Bottom-Right Bracket */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-400/80 rounded-br-[2px]" />
          
          {isFocused && (
            <span className="absolute inset-0 bg-cyan-500/5 rounded-[10px] border border-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.2)]" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Spinning Concentric SVG Transceiver Core
function TransceiverCore({ trigger }: { trigger: number }) {
  return (
    <div className="relative flex items-center justify-center size-[64px] mb-2 select-none pointer-events-none">
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent opacity-60 blur-md" />
      <motion.div
        animate={{
          scale: [1, 0.85, 1.15, 1],
          filter: [
            "drop-shadow(0 0 0px rgba(6,182,212,0))",
            "drop-shadow(0 0 8px rgba(6,182,212,0.6))",
            "drop-shadow(0 0 4px rgba(6,182,212,0.2))",
          ],
        }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        key={trigger}
        className="w-full h-full relative"
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="transceiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.9} />
            </linearGradient>
          </defs>
          
          {/* Segmented outer ring */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="#00f0ff"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            opacity={0.5}
          />
          {/* Solid pulsing shield */}
          <motion.circle
            cx="32"
            cy="32"
            r="22"
            stroke="url(#transceiverGrad)"
            strokeWidth="3"
            fill="none"
            animate={{ scale: [0.96, 1.04, 0.96] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          {/* Rapid inner indicator */}
          <motion.circle
            cx="32"
            cy="32"
            r="16"
            stroke="#ff6b00"
            strokeWidth="1"
            strokeDasharray="2 4"
            fill="none"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            opacity={0.7}
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // Hover & Focus States for each field
  const [fieldFocus, setFieldFocus] = useState<Record<string, boolean>>({});
  const [fieldHover, setFieldHover] = useState<Record<string, boolean>>({});
  
  // Transaction & Telemetry logs states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [typingCommand, setTypingCommand] = useState("");
  const [trigger, setTrigger] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setTrigger(prev => prev + 1);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!isSubmitting) return;

    setTypingCommand("");
    setConsoleLines([]);
    
    let charIndex = 0;
    const commandText = `$ transmission-core --encrypt-package --target [ADMIN]`;
    
    const typingInterval = setInterval(() => {
      if (charIndex < commandText.length) {
        setTypingCommand((prev) => prev + commandText[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Simulating packet routing telemetry log stream
        const logs = [
          "SECURE WARP TRANSMITTER ACTIVATING...",
          `Sender Identity acquired: [${name}]`,
          `Higgs Wave Path generated for: [${email}]`,
          "Compiling message payloads and vector offsets...",
          "ENCRYPTING PAYLOAD WITH QUANTUM SYNC-SHIELD...",
          "TRANSMITTING ENCRYPTED TELEMETRY MATRIX...",
          "COMMUNICATION LINK: 100% COMPLETED",
          "TRANSMISSION SUCCESSFUL! STATE: STABLE"
        ];
        
        let logIndex = 0;
        const logInterval = setInterval(() => {
          if (logIndex < logs.length) {
            setConsoleLines((prev) => [...prev, logs[logIndex]]);
            logIndex++;
          } else {
            clearInterval(logInterval);
            setIsSubmitting(false);
            setIsSubmitted(true);
            
            // Clean inputs
            setName("");
            setEmail("");
            setMessage("");
          }
        }, 180);
      }
    }, 15);

    return () => {
      clearInterval(typingInterval);
    };
  }, [isSubmitting]);

  return (
    <div className="relative mx-auto flex w-full max-w-[586px] flex-col items-center pb-[40px] sm:pb-[100px] pt-[10px] px-4 sm:px-0 select-none">
      
      {/* Quantum Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,240,255,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,240,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "16px 16px"
        }}
      />

      <div className="mt-[10px] flex flex-col items-center gap-[6px] z-10 text-center">
        {/* Concentric Communication core dial */}
        <TransceiverCore trigger={trigger} />

        <p className="text-[24px] font-bold font-mono tracking-wider leading-[normal] text-white uppercase">
          Contact Cockpit
        </p>
        <p className="text-[12px] font-mono tracking-widest text-cyan-400/80 uppercase font-semibold animate-pulse">
          Establishing space-time bridge...
        </p>
      </div>

      <section className="mt-[32px] w-full z-10">
        <motion.div
          animate={isSubmitting ? { scale: [1, 0.98, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="
            relative mx-auto w-full
            overflow-hidden rounded-huge
            border border-white/10
            bg-[#05070a]/75 backdrop-blur-[20px]
            px-[24px] py-[28px] sm:px-[56px] sm:pb-[30px] sm:pt-[34px]
            shadow-[0px_18px_48px_rgba(0,0,0,0.55)]
          "
        >
          {/* Sweeping scanline inside cockpit box */}
          <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none z-0 quantum-scanner-beam" />

          {/* Form states rendering */}
          {!isSubmitting && !isSubmitted && (
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-[20px] z-10">
              
              <Field label="Target Name">
                <div 
                  className="relative"
                  onMouseEnter={() => setFieldHover(prev => ({ ...prev, name: true }))}
                  onMouseLeave={() => setFieldHover(prev => ({ ...prev, name: false }))}
                >
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFieldFocus(prev => ({ ...prev, name: true }))}
                    onBlur={() => setFieldFocus(prev => ({ ...prev, name: false }))}
                    placeholder="Your Full Name"
                    className="
                      h-[46px] w-full rounded-[10px]
                      border border-border-strong
                      bg-bg-primary/80
                      px-[14px] text-[14px] text-white font-mono tracking-wide
                      placeholder:text-text-placeholder
                      outline-none transition-all duration-300
                      focus:border-cyan-500/50
                    "
                  />
                  <InputCornerBrackets isFocused={!!fieldFocus.name} isHovered={!!fieldHover.name} />
                </div>
              </Field>

              <Field label="Emitter Mail Address">
                <div 
                  className="relative"
                  onMouseEnter={() => setFieldHover(prev => ({ ...prev, email: true }))}
                  onMouseLeave={() => setFieldHover(prev => ({ ...prev, email: false }))}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFieldFocus(prev => ({ ...prev, email: true }))}
                    onBlur={() => setFieldFocus(prev => ({ ...prev, email: false }))}
                    placeholder="schats@xyz.com"
                    className="
                      h-[46px] w-full rounded-[10px]
                      border border-border-strong
                      bg-bg-primary/80
                      px-[14px] text-[14px] text-white font-mono tracking-wide
                      placeholder:text-text-placeholder
                      outline-none transition-all duration-300
                      focus:border-cyan-500/50
                    "
                  />
                  <InputCornerBrackets isFocused={!!fieldFocus.email} isHovered={!!fieldHover.email} />
                </div>
              </Field>

              <Field label="Coordinate Vector Loadout (Message)">
                <div 
                  className="relative"
                  onMouseEnter={() => setFieldHover(prev => ({ ...prev, msg: true }))}
                  onMouseLeave={() => setFieldHover(prev => ({ ...prev, msg: false }))}
                >
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFieldFocus(prev => ({ ...prev, msg: true }))}
                    onBlur={() => setFieldFocus(prev => ({ ...prev, msg: false }))}
                    placeholder="You can describe a lot, I can read it all."
                    className="
                      h-[140px] w-full resize-none rounded-[10px]
                      border border-border-strong
                      bg-bg-primary/80
                      px-[14px] py-[12px] text-[14px] text-white font-mono tracking-wide
                      placeholder:text-text-placeholder
                      outline-none transition-all duration-300
                      focus:border-cyan-500/50
                    "
                  />
                  <InputCornerBrackets isFocused={!!fieldFocus.msg} isHovered={!!fieldHover.msg} />
                </div>
              </Field>

              {/* Glowing High-Energy Submit button */}
              <div 
                className="relative mt-[8px]"
                onMouseEnter={() => setFieldHover(prev => ({ ...prev, btn: true }))}
                onMouseLeave={() => setFieldHover(prev => ({ ...prev, btn: false }))}
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 450, damping: 15 }}
                  className="
                    h-[48px] w-full rounded-[10px]
                    bg-white text-[14px] font-bold font-mono tracking-widest text-black uppercase
                    transition-all duration-300
                    hover:bg-cyan-50 focus:outline-none cursor-pointer
                  "
                >
                  Transmit Message
                </motion.button>
                <InputCornerBrackets isFocused={false} isHovered={!!fieldHover.btn} />
              </div>
            </form>
          )}

          {/* Typewriter active telemetry console terminal during submit */}
          {(isSubmitting || isSubmitted) && (
            <div className="relative flex flex-col font-mono text-[12px] leading-relaxed text-gray-400 z-10 min-h-[300px]">
              {/* Terminal Header */}
              <div className="flex justify-between items-center w-full border-b border-white/5 pb-2 mb-4 text-[10px] text-gray-500 font-semibold select-none">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                  <span className="ml-2 uppercase tracking-widest text-cyan-400 animate-pulse">transceiver_uplink</span>
                </div>
                <span>v2.1.0</span>
              </div>

              {/* Command text typing line */}
              <div className="text-white font-semibold text-[13px] break-all">
                {typingCommand}
                {isSubmitting && (
                  <span className="animate-pulse inline-block h-3.5 w-1 bg-white ml-0.5 align-middle" />
                )}
              </div>

              {/* Simulated log stream rows */}
              <div className="flex flex-col gap-1.5 mt-3">
                {consoleLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-start gap-1.5 text-[11.5px]"
                  >
                    <span className="text-cyan-500 shrink-0 select-none">›</span>
                    <span className={line.includes("SUCCESSFUL") || line.includes("100%") ? "text-emerald-400 font-bold" : ""}>
                      {line}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Action recovery button after transmission completes */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative mt-auto pt-6 border-t border-white/5 flex flex-col gap-3"
                >
                  <p className="text-center text-[11px] text-emerald-400/90 font-semibold select-none uppercase tracking-widest">
                    Spacetime synchronization complete. Channel is stable.
                  </p>
                  
                  <div
                    className="relative"
                    onMouseEnter={() => setFieldHover(prev => ({ ...prev, back: true }))}
                    onMouseLeave={() => setFieldHover(prev => ({ ...prev, back: false }))}
                  >
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setTrigger(prev => prev + 1);
                      }}
                      className="
                        h-[44px] w-full rounded-[10px] border border-cyan-500/20
                        bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[13px] font-bold text-cyan-400 font-mono uppercase tracking-widest
                        transition-all duration-300 focus:outline-none cursor-pointer
                      "
                    >
                      Establish New Connection
                    </button>
                    <InputCornerBrackets isFocused={false} isHovered={!!fieldHover.back} />
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-[8px] select-none">
      <span className="text-[13px] font-bold font-mono tracking-widest text-text-secondary uppercase">{label}</span>
      {children}
    </label>
  );
}
