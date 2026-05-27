"use strict";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  gradientId: string;
}

// Reusable Circular Gauge Sub-component
const GaugeCircle: React.FC<GaugeProps> = ({ value, max, label, unit, gradientId }) => {
  const radius = 85;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  
  // Maps the value to a semi-arc matching the video graphic (leaving the bottom open)
  const arcLength = circumference * 0.75; 
  const strokeDashoffset = arcLength - (value / max) * arcLength;
  const rotationAngle = 135; // Centers the 270-degree arc perfectly

  return (
    <div className="relative flex flex-col items-center justify-center w-[300px] h-[300px]">
      {/* Background Deep Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-orange-950/15 blur-3xl" />

      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        <defs>
          {/* Exact color palette gradient from reference video */}
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4500" stopOpacity={0.8} />
            <stop offset="60%" stopColor="#ffaa44" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
          </linearGradient>
          
          {/* Subtle Outer Track Glow Definition */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dark Inner Track Rings */}
        <circle cx="100" cy="100" r={radius} stroke="#111622" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={`${arcLength} ${circumference}`} strokeLinecap="round" transform={`rotate(${rotationAngle} 100 100)`} />
        <circle cx="100" cy="100" r={radius - 8} stroke="#0b0e14" strokeWidth={1} fill="transparent" />

        {/* Dynamic Glowing Value Arc */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${arcLength} ${circumference}`}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset }}
          transition={{ type: "spring", stiffness: 35, damping: 12 }}
          strokeLinecap="round"
          transform={`rotate(${rotationAngle} 100 100)`}
          filter="url(#glow)"
        />

        {/* Ticks & Limit Indicators */}
        <text x="55" y="175" fill="#4a5568" fontSize="8" textAnchor="middle" transform="rotate(90 100 100)">0</text>
        <text x="145" y="175" fill="#4a5568" fontSize="8" textAnchor="middle" transform="rotate(90 100 100)">{max}</text>
      </svg>

      {/* Central Counter Text Metrics */}
      <div className="absolute flex flex-col items-center justify-center text-center select-none">
        <motion.span 
          className="text-6xl font-light tracking-tight text-white/95 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(value)}
        </motion.span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1 bg-black/40 px-2 py-0.5 rounded-sm backdrop-blur-xs border border-white/5">
          {unit}
        </span>
        {label && <span className="text-xs text-orange-400/80 font-medium tracking-wide mt-2">{label}</span>}
      </div>
    </div>
  );
};

export default function SkillDashboardPreview() {
  const [isDual, setIsDual] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(0);
  const [rpm, setRpm] = useState<number>(0);

  // Simulation loop replicating the physics-based acceleration curve from the clip
  useEffect(() => {
    let frameId: number;
    let startTime = Date.now();

    const updateMetrics = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Step 1: Single gauge acceleration behavior (0s to 6s)
      if (elapsed < 6) {
        setIsDual(false);
        const progress = elapsed / 6;
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setSpeed(easeOutCubic * 76);
      } 
      // Step 2: Switch context layouts to Dual Gauge (6s to 12s)
      else if (elapsed >= 6 && elapsed < 12) {
        setIsDual(true);
        setSpeed(76);
        setRpm(3.6);
      } 
      // Step 3: Deceleration phase loop reset (12s to 18s)
      else if (elapsed >= 12 && elapsed < 18) {
        const decelProgress = (elapsed - 12) / 6;
        setSpeed(76 * (1 - decelProgress));
        setRpm(3.6 * (1 - decelProgress));
      } else {
        startTime = Date.now();
      }

      frameId = requestAnimationFrame(updateMetrics);
    };

    frameId = requestAnimationFrame(updateMetrics);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[500px] w-full bg-[#030508] overflow-hidden rounded-xl p-8 border border-white/5">
      
      {/* Immersive Cosmic Deep Space Background Graphic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,24,48,0.25),transparent_70%)]" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200')] bg-cover bg-center mix-blend-screen pointer-events-none filter saturate-50 contrast-125" />
      
      {/* Title Header Display */}
      <div className="absolute top-8 left-8 flex flex-col gap-1 z-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-orange-500/70 font-semibold">
          SINGLE TO DUAL GAUGES
        </h2>
        <div className="h-[1px] w-12 bg-gradient-to-r from-orange-500/50 to-transparent" />
      </div>

      {/* Main Orchestrated Flex Layout Frame */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 max-w-5xl w-full min-h-[320px] transition-all duration-500">
        <AnimatePresence mode="popLayout">
          {/* Left Conditional RPM Cluster */}
          {isDual && (
            <motion.div
              key="rpm-gauge"
              initial={{ opacity: 0, x: -60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 40, damping: 14 }}
              className="z-10"
            >
              <GaugeCircle value={rpm} max={8} label="ENGINE POWER" unit="RPM ×1000" gradientId="rpmGrad" />
            </motion.div>
          )}

          {/* Right/Center Speedometer Cluster */}
          <motion.div
            key="speed-gauge"
            layout
            transition={{ type: "spring", stiffness: 45, damping: 15 }}
            className="z-10"
          >
            <GaugeCircle value={speed} max={220} label="VELOCITY" unit="km / h" gradientId="speedGrad" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Persistent Horizontal Status Telemetry Bar */}
      <div className="w-full max-w-4xl px-4 mt-4 flex justify-between items-center text-[10px] tracking-widest text-gray-500 font-mono border-t border-white/5 pt-4 z-10">
        <div className="flex gap-4">
          <span>SYS. OK</span>
          <span className="hidden sm:inline">TEMP: <span className="text-blue-400">98°C</span></span>
        </div>
        <div className="flex gap-2 text-white/40">
          <span>P</span><span>R</span><span>N</span><span className="text-orange-500 font-bold scale-110">D</span><span>M</span>
        </div>
        <div>
          <span>RANGE: <span className="text-orange-400/80">502 KM</span></span>
        </div>
      </div>
    </div>
  );
}

