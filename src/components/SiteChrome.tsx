"use client";

import BottomFadeBlurOverlay from "@/components/BottomFadeBlurOverlay";
import Footer from "./Footer";
import { SidebarNav } from "@/components/SidebarNav";
import WavingHandLink from "@/components/WavingHandLink";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { FileDown, Terminal, Cpu, HardDrive, ArrowUpRight } from "lucide-react";
import { playDownloadSound } from "@/utils/sounds";
import SmoothScroll from "@/components/SmoothScroll";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#";

  return (
    <SmoothScroll>
      <div className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* Futuristic Telemetry Navigation Header (Mobile View Only) */}
      <header className="fixed top-[16px] left-[16px] right-[16px] z-50 flex h-[56px] w-[calc(100%-32px)] items-center justify-between rounded-full border border-cyan-500/10 bg-bg-secondary/40 backdrop-blur-lg px-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(6,182,212,0.04)] select-none overflow-hidden transition-all duration-300 lg:hidden">
        
        {/* Continuous Horizontal Telemetry Laser Scanner */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-[120px] bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent pointer-events-none z-0 transform-gpu skew-x-12"
        />

        {/* Left Side: Holographic Resume Core Emitter */}
        <HolographicResumeCore />

        {/* Right Side: Say Hi! Coordinated Contact Portal */}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="relative group/btn flex h-[36px] sm:h-[40px] items-center justify-center gap-[8px] rounded-full border border-cyan-500/10 hover:border-cyan-400/40 bg-bg-primary/60 hover:bg-cyan-950/20 px-[14px] sm:px-[18px] text-[12.5px] sm:text-[13.5px] font-mono tracking-wider font-semibold text-gray-200 hover:text-white shadow-[0_2px_10px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 z-10 active:scale-[0.97]"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-400/0 group-hover/btn:bg-cyan-400/5 transition-colors duration-300 pointer-events-none" />
          
          <Image
            src="/assets/figma/waving-hand.svg"
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            unoptimized
            className="animate-hand-micro select-none"
          />
          <span className="flex items-center gap-1.5">
            SAY_HI 
            <ArrowUpRight 
              size={12} 
              className="size-[12px] opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300" 
            />
          </span>
        </a>
      </header>

      <main className="relative w-full max-w-full px-[20px] pt-[152px] pb-[100px] lg:pl-[130px] lg:pr-[204px] lg:pb-[64px] lg:pt-[100px]">
        <WavingHandLink href={LINKEDIN_URL} ariaLabel="Open LinkedIn profile" className="hidden lg:flex" />
        <BottomFadeBlurOverlay />

        {/* Global Desktop Floating Holographic Resume Emitter (Bottom-Left Sidebar-Aligned Widget) */}
        <div className="fixed bottom-[24px] lg:bottom-[32px] left-[24px] lg:left-[50px] z-40 hidden lg:flex rounded-full border border-cyan-500/10 bg-[#05070a]/80 backdrop-blur-md px-[12px] py-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_12px_rgba(6,182,212,0.03)] hover:border-cyan-400/35 transition-all duration-300">
          <HolographicResumeCore />
        </div>

        <div className="fixed bottom-[20px] left-1/2 z-40 -translate-x-1/2 lg:fixed lg:bottom-auto lg:left-[50px] lg:top-[45%] lg:-translate-y-1/2 lg:translate-x-0 lg:z-10">
          <SidebarNav />
        </div>

        {children}

        <Footer />
      </main>
    </div>
    </SmoothScroll>
  );
}

function HolographicResumeCore() {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const triggerDownload = (e: React.MouseEvent) => {
    // Play synthesis chime sound
    playDownloadSound();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    // Add Shockwave Ripple
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1000);

    // Trigger file download (links to Resume.md as defined in repository resources)
    const link = document.createElement("a");
    link.href = "/resume/Resume.md";
    link.download = "Resume_Krishna_Akkarapalli.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerDownload}
      className="relative flex items-center gap-[10px] cursor-pointer group select-none"
    >
      {/* Laser Emission Projection Cone Background */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.2 }}
            animate={{ opacity: 0.18, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.2 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[32px] left-[18px] w-[32px] h-[64px] bg-gradient-to-b from-cyan-400 to-transparent origin-top pointer-events-none z-0"
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              filter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Futuristic Concentric Emitter Core */}
      <div className="relative size-[36px] sm:size-[40px] flex items-center justify-center rounded-full border border-cyan-500/20 bg-black/60 shadow-[0_0_12px_rgba(6,182,212,0.15)] group-hover:border-cyan-400/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 z-10 overflow-hidden">
        
        {/* Rotating Concentric SVG Rings */}
        {/* Outer Ring - Clockwise */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 size-full p-1 text-cyan-500/40 group-hover:text-cyan-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="12" cy="12" r="10" strokeDasharray="4 6" />
        </motion.svg>

        {/* Inner Ring - Counter Clockwise */}
        <motion.svg
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 size-full p-2.5 text-cyan-400/60 group-hover:text-cyan-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="7" strokeDasharray="3 4" />
        </motion.svg>

        {/* Emitter Core Point / Icon */}
        <div className="relative z-10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
          <FileDown size={14} className="size-[14px] text-cyan-400 group-hover:text-white" />
        </div>

        {/* Shockwave expanding circle ripples */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute size-full rounded-full bg-cyan-400/30 border border-cyan-400/80 pointer-events-none"
              style={{
                left: ripple.x - 20,
                top: ripple.y - 20,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Holographic scanner line sweep across core */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 h-[1.5px] bg-cyan-400/60 shadow-[0_0_4px_rgba(6,182,212,0.8)] pointer-events-none"
        />
      </div>

      {/* Emitter Micro-Telemetry Teletext HUD */}
      <div className="hidden sm:flex flex-col font-mono tracking-wider select-none z-10">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest leading-none">SYS: ONLINE</span>
        </div>
        <div className="text-[11px] font-bold text-gray-200 group-hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1">
          <span>[ CV.PRJ // GET ]</span>
        </div>
      </div>
      
      {/* Mobile-only compact telemetry */}
      <span className="sm:hidden font-mono text-[10px] font-extrabold text-cyan-400 border border-cyan-400/20 rounded px-1.5 py-0.5 bg-cyan-950/20 group-hover:bg-cyan-950/40 transition-colors z-10">
        GET CV
      </span>

      {/* Floating Micro-Telemetry Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-[52px] left-0 z-50 min-w-[210px] rounded-[12px] border border-cyan-500/20 bg-black/90 backdrop-blur-xl p-3 shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_12px_rgba(6,182,212,0.1)] pointer-events-none"
          >
            {/* Tooltip Corner Brackets */}
            <span className="absolute top-1.5 left-1.5 size-1.5 border-t border-l border-cyan-400/40" />
            <span className="absolute top-1.5 right-1.5 size-1.5 border-t border-r border-cyan-400/40" />
            <span className="absolute bottom-1.5 left-1.5 size-1.5 border-b border-l border-cyan-400/40" />
            <span className="absolute bottom-1.5 right-1.5 size-1.5 border-b border-r border-cyan-400/40" />

            <div className="flex flex-col gap-2 font-mono text-[9.5px] text-gray-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <Terminal size={10} className="size-[10px]" /> TRANSCEIVER_CV
                </span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Cpu size={10} className="size-[10px]" />
                <span>EMITTER: CHERENKOV_v1.0</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <HardDrive size={10} className="size-[10px]" />
                <span>PAYLOAD: Resume_Krishna.md</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-1.5 text-[8.5px] text-cyan-400/80 font-semibold">
                <span>[ CLICK CONDUIT TO BEAM ]</span>
                <span>6.0 KB</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
