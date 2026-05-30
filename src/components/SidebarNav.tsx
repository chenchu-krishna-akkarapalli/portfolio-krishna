"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  Notebook, 
  Layers, 
  BookOpen, 
  Briefcase, 
  Music, 
  Gamepad2, 
  Mail,
  Menu,
  X,
  LucideIcon
} from "lucide-react";

type SidebarNavItem = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

const navItems: SidebarNavItem[] = [
  { label: "Home", href: "/#home", Icon: Home },
  { label: "About", href: "/about", Icon: User },
  { label: "Projects", href: "/projects", Icon: Notebook },
  { label: "Toolstack", href: "/toolstack", Icon: Layers },
  { label: "Blogs", href: "/blog", Icon: BookOpen },
  { label: "Work", href: "/work", Icon: Briefcase },
  { label: "Songs", href: "/songs", Icon: Music },
  { label: "Playground", href: "/playground", Icon: Gamepad2 },
  { label: "Contact", href: "/contact", Icon: Mail },
];

// Mobile Bottombar Primary Items (5 items max)
const mobileBottomBarItems = [
  { label: "Home", href: "/#home", Icon: Home, type: "link" as const },
  { label: "About", href: "/about", Icon: User, type: "link" as const },
  { label: "Projects", href: "/projects", Icon: Notebook, type: "link" as const },
  { label: "Toolstack", href: "/toolstack", Icon: Layers, type: "link" as const },
  { label: "Menu", href: "#menu", Icon: Menu, type: "toggle" as const },
];

// Mobile Drawer Pop-up Secondary Items
const mobileDrawerItems = [
  { label: "Blogs", href: "/blog", Icon: BookOpen },
  { label: "Work", href: "/work", Icon: Briefcase },
  { label: "Songs", href: "/songs", Icon: Music },
  { label: "Playground", href: "/playground", Icon: Gamepad2 },
  { label: "Contact", href: "/contact", Icon: Mail },
];

// Interactive Corner Confinement Brackets
function CornerBrackets({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const show = isActive || isHovered;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          {/* Top-Left Bracket */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/80 rounded-tl-[2px]" />
          {/* Top-Right Bracket */}
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400/80 rounded-tr-[2px]" />
          {/* Bottom-Left Bracket */}
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400/80 rounded-bl-[2px]" />
          {/* Bottom-Right Bracket */}
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/80 rounded-br-[2px]" />
          
          {/* Micro-flare plasma spot at active position */}
          {isActive && (
            <span className="absolute inset-0 bg-cyan-500/10 rounded-medium border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.25)] animate-pulse" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mini Alcubierre Resonance Holographic Core
function MiniAlcubierreCore({ isExpanded, trigger }: { isExpanded: boolean; trigger: number }) {
  const [displayVal, setDisplayVal] = useState(96);

  useEffect(() => {
    let current = 0;
    setDisplayVal(0);
    const interval = setInterval(() => {
      if (current < 96) {
        current += Math.ceil((96 - current) * 0.2) || 1;
        if (current > 96) current = 96;
        setDisplayVal(current);
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [trigger]);

  return (
    <div className="relative flex flex-col items-center justify-center py-2.5 border-b border-white/5 mb-3 w-full shrink-0 overflow-hidden select-none">
      {/* Quantum Vacuum Shield Aura */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 via-transparent to-transparent pointer-events-none opacity-40 blur-sm" />
      
      {/* Dynamic boot sequence and field adjustments */}
      <motion.div
        animate={{
          scale: [1, 0, 1.2, 1],
          filter: [
            "drop-shadow(0 0 0px rgba(6,182,212,0))",
            "drop-shadow(0 0 12px rgba(6,182,212,0.8))",
            "drop-shadow(0 0 6px rgba(6,182,212,0.3))",
            "drop-shadow(0 0 2px rgba(6,182,212,0.1))",
          ],
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        key={trigger}
        className="relative flex items-center justify-center size-[38px] group-hover:size-[64px] transition-all duration-300"
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="sidebarDialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.9} />
            </linearGradient>
          </defs>

          {/* Outer Segmented Space-Time Tracker Ring */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="#00f0ff"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
            opacity={0.5}
          />
          {/* Middle Cherenkov Ring */}
          <motion.circle
            cx="32"
            cy="32"
            r="22"
            stroke="url(#sidebarDialGrad)"
            strokeWidth="3.5"
            fill="none"
            animate={{
              scale: [0.97, 1.03, 0.97],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
          />
          {/* Inner Calibration Ring */}
          <motion.circle
            cx="32"
            cy="32"
            r="16"
            stroke="#ff6b00"
            strokeWidth="1"
            strokeDasharray="2 4"
            fill="none"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            opacity={0.6}
          />
        </svg>

        {/* Gravitational Chromatic Aberration numeric telemetry */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span
            animate={{
              x: [0, -1, 1, 0],
              y: [0, 0.5, -0.5, 0],
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
            key={trigger}
            className="text-[9px] group-hover:text-[11px] font-mono font-bold text-white transition-all duration-300 tracking-tighter"
          >
            {displayVal}%
          </motion.span>
        </div>
      </motion.div>

      {/* Dynamic Diagnostics text printout */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-col items-center mt-2 font-mono text-[9px] text-center select-none"
        >
          <div className="text-cyan-400 font-bold uppercase tracking-wider animate-pulse">
            Alcubierre Core Synched
          </div>
          <div className="text-gray-500 text-[8px] uppercase tracking-widest mt-0.5">
            Buoyancy: Nominal // Shield: 96%
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function SidebarNav() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState("/#home");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Anti-gravity Core transition and Particle Stream trigger states
  const [transitionTrigger, setTransitionTrigger] = useState(0);
  const [pulseStartIdx, setPulseStartIdx] = useState<number | null>(null);
  const [pulseTrigger, setPulseTrigger] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mobile menu bottom-dock drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateFromLocation = () => {
      const path = window.location.pathname;
      let detectedHref = "/#home";
      
      if (path === "/about") {
        detectedHref = "/about";
      } else if (path === "/toolstack") {
        detectedHref = "/toolstack";
      } else if (path === "/blog" || path.startsWith("/blog/")) {
        detectedHref = "/blog";
      } else if (path === "/playground") {
        detectedHref = "/playground";
      } else if (path === "/songs") {
        detectedHref = "/songs";
      } else if (path === "/contact") {
        detectedHref = "/contact";
      } else if (path === "/projects" || path.startsWith("/projects/")) {
        detectedHref = "/projects";
      } else if (path === "/work") {
        detectedHref = "/work";
      } else {
        const hash = window.location.hash || "#home";
        detectedHref = `/${hash}`;
      }
      
      setActiveHref(detectedHref);
      
      // Trigger a transition anomaly when route locks on
      setTransitionTrigger(prev => prev + 1);
      
      // Match the particle emitter anchor to the activated item's index
      const itemIdx = navItems.findIndex(i => i.href === detectedHref);
      if (itemIdx !== -1) {
        setPulseStartIdx(itemIdx);
        setPulseTrigger(prev => prev + 1);
      }
    };

    updateFromLocation();
    window.addEventListener("hashchange", updateFromLocation);
    window.addEventListener("popstate", updateFromLocation);
    return () => {
      window.removeEventListener("hashchange", updateFromLocation);
      window.removeEventListener("popstate", updateFromLocation);
    };
  }, [pathname]);

  const handleLinkClick = (href: string, index: number) => {
    setActiveHref(href);
    setPulseStartIdx(index);
    setPulseTrigger(prev => prev + 1);
    setTransitionTrigger(prev => prev + 1);
  };

  return (
    <>
      {/* Global Embedded Sci-fi Scanning Keyframe styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline-sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(420px); }
        }
        .quantum-scanner-beam {
          animation: scanline-sweep 5s linear infinite;
        }
      `}} />

      {/* Desktop Expanding Sidebar Navigation */}
      <aside 
        className="group shrink-0 hidden lg:block"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div
          className="
            relative
            flex flex-col
            overflow-hidden
            rounded-medium
            bg-[#05070a]/80 backdrop-blur-md
            border border-cyan-500/15
            shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_20px_rgba(0,240,255,0.06)]
            p-1.5 group-hover:p-2.5
            transition-all duration-300 ease-[0.16,1,0.3,1]
            w-[54px] group-hover:w-[220px]
          "
        >
          {/* Quantum-vacuum Low-Energy Grid Backdrop */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.09] z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,240,255,0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,240,255,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "12px 12px"
            }}
          />

          {/* Sweeping electromagnetic scanner laser */}
          <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-500/[0.04] to-transparent pointer-events-none z-0 quantum-scanner-beam" />

          {/* Mini Alcubierre Resonance Cockpit Engine */}
          <MiniAlcubierreCore isExpanded={isExpanded} trigger={transitionTrigger} />

          <nav aria-label="Primary" className="relative flex flex-col gap-1 w-full z-10">
            {/* The Particle Conduit Stream track */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-white/5 pointer-events-none z-0" />

            {/* Glowing Graviton/Tachyon particle pulse traveling to the Core */}
            {pulseStartIdx !== null && (
              <motion.div
                key={pulseTrigger}
                initial={{ y: pulseStartIdx * 42 + 19, opacity: 1, scale: 1.6 }}
                animate={{ y: -20, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-[19px] w-1.5 h-1.5 -ml-[3px] rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] pointer-events-none z-20"
              />
            )}

            {navItems.map((item, idx) => {
              const isActive = activeHref === item.href;
              const isHovered = hoveredIndex === idx;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href, idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    relative flex h-[38px] items-center rounded-medium text-[13px] font-mono font-semibold tracking-wide transition-all duration-300 select-none outline-none group/link overflow-visible
                    ${isActive ? "text-cyan-400" : "text-text-tertiary hover:text-white"}
                  `}
                >
                  {/* Sliding capsule background indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActiveBackground"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent border-l-2 border-cyan-400 rounded-r-medium rounded-l-[1px] shadow-[inset_1px_0_8px_rgba(6,182,212,0.15)] z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Corner confinement brackets around link */}
                  <CornerBrackets isActive={isActive} isHovered={isHovered} />

                  {/* Icon container explicitly setting color & stroke-current */}
                  <div className="relative z-10 flex size-[38px] shrink-0 items-center justify-center">
                    <item.Icon
                      size={18}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`shrink-0 transition-all duration-300 stroke-current ${
                        isActive 
                          ? "text-cyan-400 opacity-100 scale-110 filter drop-shadow-[0_0_5px_rgba(0,240,255,0.85)]" 
                          : "text-text-tertiary opacity-60 group-hover/link:text-white group-hover/link:opacity-100 group-hover/link:scale-105 group-hover/link:filter group-hover/link:drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]"
                      }`}
                    />
                    {/* Glowing active indicator light */}
                    {isActive && (
                      <span className="absolute left-[2px] top-1/2 -translate-y-1/2 flex h-1 w-1 z-20">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                      </span>
                    )}
                  </div>

                  {/* Text label inheriting active parent color */}
                  <span className={`relative z-10 whitespace-nowrap overflow-hidden transition-all duration-300 ease-[0.16,1,0.3,1] w-0 opacity-0 group-hover:w-[150px] group-hover:opacity-100 group-hover:ml-2 text-[12.5px] uppercase tracking-wider ${isActive ? "font-bold tracking-widest" : ""}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Floating Bottom Navigation */}
      <nav aria-label="Mobile Primary" className="block lg:hidden shrink-0 relative">
        {/* Floating pop-up sheet containing missing items */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Screen backdrop layer to enable clicking outside */}
              <div 
                className="absolute -bottom-[20px] -left-[100vw] w-[200vw] h-[200vh] z-40 bg-black/10 backdrop-blur-[1px]"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* POP-UP TACTICAL DRAWER PANEL */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="absolute bottom-[68px] left-1/2 -translate-x-1/2 z-50 w-[240px] rounded-huge border border-cyan-500/15 bg-[#05070a]/95 backdrop-blur-lg p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.06)]"
              >
                {/* Header diagnostic */}
                <div className="flex justify-between items-center text-[9px] text-gray-500 font-mono border-b border-white/5 pb-2 mb-2 font-bold select-none">
                  <span>WARP_DRAWER // SYNCHED</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <X size={12} className="stroke-current" />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  {mobileDrawerItems.map((item, idx) => {
                    const isActive = activeHref === item.href;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          handleLinkClick(item.href, idx + 4);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`relative flex h-[38px] items-center rounded-medium px-3 text-[12px] font-mono font-semibold tracking-wide transition-all duration-300 select-none outline-none group/link overflow-visible ${
                          isActive 
                            ? "text-cyan-400 bg-white/5 border border-white/5" 
                            : "text-text-tertiary hover:text-white"
                        }`}
                      >
                        <CornerBrackets isActive={isActive} isHovered={false} />
                        
                        <item.Icon
                          size={16}
                          strokeWidth={isActive ? 2.5 : 2}
                          className={`mr-2.5 shrink-0 transition-all duration-200 stroke-current ${
                            isActive 
                              ? "opacity-100 scale-105 filter drop-shadow-[0_0_4px_rgba(0,240,255,0.6)]" 
                              : "opacity-60"
                          }`}
                        />
                        <span className="uppercase tracking-wider">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="relative z-40 flex flex-row items-center justify-center rounded-full border border-cyan-500/15 bg-[#05070a]/80 backdrop-blur-md px-3 py-2 gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.65),0_0_15px_rgba(0,240,255,0.05)] overflow-visible">
          {/* Mobile electromagnetic background grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 rounded-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,240,255,0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,240,255,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "12px 12px"
            }}
          />

          {mobileBottomBarItems.map((item, idx) => {
            const isMenuToggle = item.type === "toggle";
            const isActive = isMenuToggle ? isMobileMenuOpen : activeHref === item.href;

            if (isMenuToggle) {
              const ToggleIcon = isMobileMenuOpen ? X : item.Icon;
              return (
                <button
                  key={item.label}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`
                    relative flex h-[38px] w-[46px] items-center justify-center rounded-full transition-all duration-200 focus:outline-none overflow-visible cursor-pointer
                    ${isActive ? "text-cyan-400" : "text-text-tertiary hover:text-white"}
                  `}
                  aria-label="Toggle Navigation Menu"
                >
                  {/* Active sliding backdrop capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveBackground"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 border border-cyan-400/30 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.15)] z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Corner brackets */}
                  <CornerBrackets isActive={isActive} isHovered={false} />

                  <ToggleIcon
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`relative z-10 shrink-0 transition-all duration-200 stroke-current ${
                      isActive 
                        ? "opacity-100 scale-105 filter drop-shadow-[0_0_4px_rgba(0,240,255,0.6)]" 
                        : "opacity-60"
                    }`}
                  />
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleLinkClick(item.href, idx)}
                className={`
                  relative flex h-[38px] w-[46px] items-center justify-center rounded-full transition-all duration-200 focus:outline-none overflow-visible
                  ${isActive ? "text-cyan-400" : "text-text-tertiary hover:text-white"}
                `}
                aria-label={item.label}
              >
                {/* Mobile active sliding backdrop capsule */}
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveBackground"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 border border-cyan-400/30 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.15)] z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Corner brackets on mobile item */}
                <CornerBrackets isActive={isActive} isHovered={false} />

                <item.Icon
                  size={18}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`relative z-10 shrink-0 transition-all duration-200 stroke-current ${
                    isActive 
                      ? "opacity-100 scale-105 filter drop-shadow-[0_0_4px_rgba(0,240,255,0.6)]" 
                      : "opacity-60"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
