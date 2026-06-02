"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface HoloButtonProps {
  label?: string;
  prefix?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  accent?: "cyan" | "purple";
  href?: string;
  className?: string;
}

export default function HoloButton({
  label = "Contact",
  prefix,
  onClick,
  accent = "cyan",
  href,
  className = "",
}: HoloButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [flashActive, setFlashActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Color mappings for tactical HUD cockpit
  const accentColor = accent === "cyan" ? "#00f0ff" : "#a855f7";
  const accentGlow = accent === "cyan" ? "rgba(0,240,255,0.15)" : "rgba(168,85,247,0.15)";
  const accentHoverGlow = accent === "cyan" ? "rgba(0,240,255,0.45)" : "rgba(168,85,247,0.45)";

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (shouldReduceMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    buttonRef.current.style.setProperty("--mx", `${x}px`);
    buttonRef.current.style.setProperty("--my", `${y}px`);

    // Tactical 3D cockpit perspective tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((centerY - y) / centerY) * 5;
    const tiltY = ((x - centerX) / centerX) * 5;
    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 150);

    if (!shouldReduceMotion && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    }

    if (onClick) {
      onClick(e);
    }
  };

  // Append keyframe animations for high-tech HUD elements
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "holo-button-hud-effects";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @keyframes hud-laser-sweep {
        0% { top: 0%; opacity: 0; }
        15% { opacity: 0.75; }
        85% { opacity: 0.75; }
        100% { top: 100%; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const Tag = href ? Link : "button";

  const motionProps = {
    ref: (el: any) => { buttonRef.current = el; },
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    style: shouldReduceMotion ? {} : {
      rotateX,
      rotateY,
      transformStyle: "preserve-3d" as const,
      perspective: 600,
    },
    whileTap: shouldReduceMotion ? {} : { scale: 0.98 },
    transition: { type: "spring", stiffness: 350, damping: 20 },
    className: `
      group relative select-none cursor-pointer outline-none overflow-hidden rounded-[2px] px-[36px] py-[16px] min-w-[200px] flex items-center justify-center bg-[#05070a]/40 backdrop-blur-md border transition-all duration-300
      ${className}
    `,
    ...(href ? { href } : {}),
  };

  return (
    <div 
      className="relative select-none inline-block overflow-visible"
      style={{
        perspective: 600,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Corner HUD targeting brackets (Clamps and slides inward exactly on hover) */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
        {/* Top-Left Bracket */}
        <motion.span 
          animate={isHovered ? { x: 0, y: 0, opacity: 0.85 } : { x: -6, y: -6, opacity: 0.25 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l rounded-none"
          style={{ borderColor: accentColor }}
        />
        {/* Top-Right Bracket */}
        <motion.span 
          animate={isHovered ? { x: 0, y: 0, opacity: 0.85 } : { x: 6, y: -6, opacity: 0.25 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r rounded-none"
          style={{ borderColor: accentColor }}
        />
        {/* Bottom-Left Bracket */}
        <motion.span 
          animate={isHovered ? { x: 0, y: 0, opacity: 0.85 } : { x: -6, y: 6, opacity: 0.25 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l rounded-none"
          style={{ borderColor: accentColor }}
        />
        {/* Bottom-Right Bracket */}
        <motion.span 
          animate={isHovered ? { x: 0, y: 0, opacity: 0.85 } : { x: 6, y: 6, opacity: 0.25 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r rounded-none"
          style={{ borderColor: accentColor }}
        />
      </div>

      <motion.button {...(motionProps as any)}
        style={{
          borderColor: isHovered ? accentColor : `${accentColor}33`,
          boxShadow: isHovered 
            ? `0 0 20px ${accentHoverGlow}, inset 0 0 10px ${accentGlow}` 
            : `0 0 8px ${accentGlow}`
        }}
      >
        {/* Layer 1: Embedded Vector Circuitry / Neural network background traces */}
        <svg 
          width="100%" 
          height="100%" 
          fill="none" 
          className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-45 transition-all duration-500 z-0 select-none"
          preserveAspectRatio="none"
        >
          {/* Symmetrical circuitry telemetry paths */}
          <path d="M 8,6 L 16,6 L 22,12 L 22,24 L 16,30 L 8,30" stroke={accentColor} strokeWidth="0.8" opacity="0.6" />
          <path d="M 192,6 L 184,6 L 178,12 L 178,24 L 184,30 L 192,30" stroke={accentColor} strokeWidth="0.8" opacity="0.6" />
          
          <line x1="26" y1="6" x2="174" y2="6" stroke={accentColor} strokeWidth="0.6" opacity="0.25" strokeDasharray="3,3" />
          <line x1="26" y1="30" x2="174" y2="30" stroke={accentColor} strokeWidth="0.6" opacity="0.25" strokeDasharray="3,3" />
          
          {/* Active Synaptic grid nodes */}
          <circle cx="22" cy="12" r="1.2" fill={accentColor} opacity="0.75" />
          <circle cx="22" cy="24" r="1.2" fill={accentColor} opacity="0.75" />
          <circle cx="178" cy="12" r="1.2" fill={accentColor} opacity="0.75" />
          <circle cx="178" cy="24" r="1.2" fill={accentColor} opacity="0.75" />
        </svg>

        {/* Layer 2: CRT Monitor Scanline Readout Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 select-none"
          style={{
            background: `repeating-linear-gradient(0deg, ${accentColor} 0px, ${accentColor} 1.2px, transparent 1.2px, transparent 2.5px)`
          }}
        />

        {/* Layer 3: Vertical Neon Laser Scanner Sweep (Slices down on hover) */}
        {isHovered && !shouldReduceMotion && (
          <div 
            className="absolute left-0 right-0 h-[1.5px] pointer-events-none z-10 select-none"
            style={{
              background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
              animation: "hud-laser-sweep 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite",
              boxShadow: `0 0 8px ${accentColor}`,
            }}
          />
        )}

        {/* Layer 4: Mouse Cursor-tracked radial spotlight highlight */}
        {!shouldReduceMotion && isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none z-10 opacity-100 transition-opacity duration-300 select-none"
            style={{
              background: `radial-gradient(circle 80px at var(--mx, 50%) var(--my, 50%), ${accentColor} 12%, transparent 100%)`,
              mixBlendMode: "screen",
            }}
          />
        )}

        {/* Layer 5: Active Flash Overlay */}
        <AnimatePresence>
          {flashActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-20 pointer-events-none rounded-[2px]"
              style={{ filter: `drop-shadow(0 0 8px ${accentColor})` }}
            />
          )}
        </AnimatePresence>

        {/* Layer 6: Symmetrical HUD Telemetry & Text Label */}
        <div className="relative z-30 flex items-center justify-center gap-3.5 leading-none select-none text-center">
          
          {/* HUD Left Prefix Status Light */}
          <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-95 transition-opacity duration-300">
            <span className="size-[4px] rounded-full bg-cyan-400 animate-pulse" style={{ backgroundColor: accentColor }} />
            <span className="font-mono text-[8px] tracking-wider text-white/50 uppercase select-none">
              [ {prefix || "01"} ]
            </span>
          </div>

          {/* Core Text Label styled with custom Google Font */}
          <span 
            className="holo-button__label text-sm font-bold text-white/95 group-hover:text-white transition-all duration-300"
            style={{
              fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif',
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textShadow: isHovered 
                ? `0 0 10px rgba(255,255,255,0.7), 0 0 15px ${accentHoverGlow}` 
                : "none"
            }}
          >
            {label}
          </span>

          {/* HUD Right Coordinate Tag */}
          <div className="font-mono text-[8px] tracking-wider text-white/40 group-hover:text-white/60 transition-colors duration-300 uppercase select-none">
            [ ACT ]
          </div>
          
        </div>

        {/* Expanding Shockwave Click Ripple */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0.1, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute rounded-full border pointer-events-none z-20"
              style={{
                left: ripple.x - 20,
                top: ripple.y - 20,
                width: 40,
                height: 40,
                borderColor: accentColor,
                background: `radial-gradient(circle, ${accentGlow} 10%, transparent 80%)`,
              }}
            />
          ))}
        </AnimatePresence>

      </motion.button>
    </div>
  );
}
