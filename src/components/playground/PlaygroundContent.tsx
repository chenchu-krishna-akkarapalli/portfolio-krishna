"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Gamepad2, Sparkles, Cpu, Clock } from "lucide-react";

type PlaygroundContentProps = {
  gameImages: readonly string[];
};

type MetadataItem = {
  title: string;
  category: string;
  description: string;
  hours: string;
  colorClass: string;
  borderColor: string;
  glowColor: string;
  accentHex: string;
};

const GAME_METADATA: Record<string, MetadataItem> = {
  "call0fduty.svg": {
    title: "Call of Duty: Warzone",
    category: "🎮 TAC-SHOOTER",
    description: "Battle royale deployments, precision ballistic tracking, and high-intensity tactical coordination.",
    hours: "420+ HRS LOGGED",
    colorClass: "text-amber-400",
    borderColor: "border-amber-500/20",
    glowColor: "rgba(245, 158, 11, 0.15)",
    accentHex: "#f59e0b"
  },
  "forzahorizon.svg": {
    title: "Forza Horizon 5",
    category: "🏎️ RACING SIM",
    description: "High-fidelity vehicle physics calibrations, mechanical gear tuning, and open-world cruising.",
    hours: "380+ HRS LOGGED",
    colorClass: "text-rose-400",
    borderColor: "border-rose-500/20",
    glowColor: "rgba(244, 63, 94, 0.15)",
    accentHex: "#f43f5e"
  },
  "gta5.svg": {
    title: "Grand Theft Auto V",
    category: "🌆 CITY SANDBOX",
    description: "Complex open-world engine simulations, tactical heist planning, and custom sandbox modifications.",
    hours: "ACTIVE CAMPAIGN",
    colorClass: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    glowColor: "rgba(6, 182, 212, 0.15)",
    accentHex: "#06b6d4"
  },
  "needforspeed.svg": {
    title: "Need for Speed: Heat",
    category: "🚗 DRIFT RACING",
    description: "High-octane neon drifting mechanics, illicit street race tuning, and police pursuit survival benchmarks.",
    hours: "180+ HRS LOGGED",
    colorClass: "text-purple-400",
    borderColor: "border-purple-500/20",
    glowColor: "rgba(139, 92, 246, 0.15)",
    accentHex: "#8b5cf6"
  },
  "pubg.svg": {
    title: "PUBG: Battlegrounds",
    category: "🪂 SURVIVAL SQUAD",
    description: "Long-range ballistic tests, high-stress tactical positioning, and late-night co-op survival deployments.",
    hours: "STABLE CORES",
    colorClass: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    glowColor: "rgba(16, 185, 129, 0.15)",
    accentHex: "#10b981"
  },
  "wwf.svg": {
    title: "Retro Wrestling WWE",
    category: "🤼 RETRO RETREAT",
    description: "Nostalgic combat button combo sequences, pixel-perfect frame-data logs, and retro CRT screen ratios.",
    hours: "LOCAL CO-OP",
    colorClass: "text-indigo-400",
    borderColor: "border-indigo-500/20",
    glowColor: "rgba(99, 102, 241, 0.15)",
    accentHex: "#6366f1"
  },
};

export default function PlaygroundContent({ gameImages }: PlaygroundContentProps) {
  const leftColumnImages = gameImages.filter((_, index) => index % 2 === 0);
  const rightColumnImages = gameImages.filter((_, index) => index % 2 === 1);

  return (
    <div className="mx-auto w-full max-w-[620px] pb-[120px] pt-[10px] px-4 md:px-0 overflow-visible">
      {/* Sticky Playground HUD Header */}
      <header className="sticky top-0 z-30 w-full bg-black/75 backdrop-blur-md border-b border-white/5 py-4 mb-8 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-[22px] sm:text-[26px] font-extrabold text-white flex items-center gap-3 tracking-tight">
            <Gamepad2 className="text-cyan-400 animate-pulse size-7" />
            <span>My Playground</span>
          </h1>
          <p className="text-[10px] sm:text-[11px] font-mono text-text-quaternary uppercase tracking-wider mt-1.5">
            Tactical Lifestyle & Creative Confinement
          </p>
        </div>

        {/* Telemetry diagnostics */}
        <div className="hidden sm:flex items-center gap-4 text-[10.5px] font-mono text-text-secondary border border-cyan-500/15 bg-black/40 rounded-medium px-4.5 py-2 shadow-[0_0_12px_rgba(6,182,212,0.04)]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>STEAM LINK: OK</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5">
            <Cpu size={12} className="text-cyan-400" />
            <span>CORES: 96%</span>
          </span>
        </div>
      </header>

      {/* Intro Context */}
      <section className="relative flex flex-col items-start justify-center text-left mb-8">
        <p className="text-[13.5px] sm:text-[14.5px] font-medium leading-[1.65] text-text-secondary">
          Apart from engineering products, I spend my spare cycles analyzing game mechanics, exploring electronic beats, and cataloging digital pop culture artifacts. Hover or tap cards to inspect logs.
        </p>
      </section>

      {/* 2-Column Responsive Dashboard Grid */}
      <section className="relative w-full overflow-visible">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-visible">
          <PlaygroundColumn images={leftColumnImages} />
          <PlaygroundColumn images={rightColumnImages} />
        </div>
      </section>
    </div>
  );
}

function PlaygroundColumn({ images }: { images: readonly string[] }) {
  return (
    <div className="grid gap-6">
      {images.map((src) => {
        // Extract the filename to fetch its matching metadata
        const filename = src.split("/").pop() ?? "";
        const meta = GAME_METADATA[filename] || {
          title: "Alternative Simulation",
          category: "🔮 ADVENTURE",
          description: "Exploratory lifestyle tinkers and sandbox experiences within dynamic web mechanics.",
          hours: "CREATIVE DOCK",
          colorClass: "text-cyan-400",
          borderColor: "border-cyan-500/20",
          glowColor: "rgba(6, 182, 212, 0.1)",
          accentHex: "#06b6d4"
        };

        return (
          <PlaygroundCard key={src} src={src} meta={meta} />
        );
      })}
    </div>
  );
}

function PlaygroundCard({ src, meta }: { src: string; meta: MetadataItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative aspect-[4/3] w-full overflow-hidden rounded-huge border ${meta.borderColor} bg-bg-card transition-all duration-500`}
      style={{
        boxShadow: isHovered
          ? `0 12px 24px rgba(0,0,0,0.65), 0 0 15px ${meta.glowColor}`
          : "0 4px 12px rgba(0,0,0,0.4)"
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
    >
      {/* Background Cover Image */}
      <Image
        alt={meta.title}
        src={src}
        fill
        sizes="(max-width: 640px) 100vw, 300px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority={false}
      />

      {/* Dark interactive overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25 transition-opacity duration-300 z-10" />

      {/* Interactive HUD Details Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-4.5 sm:p-5">
        {/* Category Header Row */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-0.5 rounded-[4px] border border-white/5 bg-black/60 font-mono text-[9px] font-bold tracking-widest uppercase ${meta.colorClass}`}>
            {meta.category}
          </span>

          <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-white/55 px-2 py-0.5 rounded-[4px] border border-white/5 bg-black/60">
            <Clock size={10} className={meta.colorClass} />
            <span>{meta.hours}</span>
          </span>
        </div>

        {/* Dynamic Glassmorphic Sliding Title & Description Details Footer */}
        <div className="mt-auto flex flex-col gap-1.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-y-[24px] sm:translate-y-[40px] group-hover:translate-y-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[14px] sm:text-[15px] font-extrabold text-white leading-tight transition-colors duration-300 group-hover:text-white">
              {meta.title}
            </h3>
            {isHovered && (
              <Sparkles size={11} className={`${meta.colorClass} animate-bounce shrink-0`} />
            )}
          </div>

          <p className="text-[11px] sm:text-[11.5px] font-medium leading-[1.5] text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
            {meta.description}
          </p>

          {/* Spacer block to offset non-hover states */}
          <div className="h-[24px] sm:h-[40px] group-hover:h-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}
