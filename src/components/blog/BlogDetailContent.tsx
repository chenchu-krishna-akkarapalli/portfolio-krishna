"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { PrevButton } from "@/components/NavigationButtons";
import { type ProjectDetail } from "@/components/projects/ProjectDetailContent";

// Static brand-colors map matching slug
const SLUG_PALETTES: Record<string, { primary: string; glow: string; text: string; bg: string }> = {
  "ocr-handwritten-text-extraction": { primary: "#ffcc00", glow: "rgba(255,204,0,0.15)", text: "text-[#ffcc00]", bg: "bg-[#ffcc00]/10" },
  "multi-tenant-hr-product": { primary: "#00f0ff", glow: "rgba(0,240,255,0.15)", text: "text-[#00f0ff]", bg: "bg-[#00f0ff]/10" },
  "insurance-product": { primary: "#3b82f6", glow: "rgba(59,130,246,0.15)", text: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10" },
  "blog-publishing-platform": { primary: "#8b5cf6", glow: "rgba(139,92,246,0.15)", text: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10" },
  "civil-dept-product-cad": { primary: "#ff3838", glow: "rgba(255,56,56,0.15)", text: "text-[#ff3838]", bg: "bg-[#ff3838]/10" },
  "cma-firm-website-strategy-led-ui": { primary: "#ec4899", glow: "rgba(236,72,153,0.15)", text: "text-[#ec4899]", bg: "bg-[#ec4899]/10" }
};

export default function BlogDetailContent({ project }: { project: ProjectDetail }) {
  const { scrollYProgress } = useScroll();
  const theme = SLUG_PALETTES[project.slug] || { primary: "#ffffff", glow: "rgba(255,255,255,0.1)", text: "text-white", bg: "bg-white/10" };

  return (
    <div className="relative flex flex-col w-full max-w-[580px] mx-auto pb-20 pt-4 font-sans select-none">
      
      {/* 60fps dynamic scroll progress bar at the very top of viewport */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 z-50 origin-left" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* Futuristic back prompt navigation and telemetry label */}
      <div className="relative flex items-center justify-between w-full border-b border-white/5 pb-3 mb-6 z-10">
        <div className="flex items-center gap-3">
          <PrevButton href="/blog" ariaLabel="Back to writings" />
          <span className="text-[10px] tracking-[0.25em] text-gray-500 font-mono font-semibold uppercase">
            {project.headerLabel || "Writings"} / REPORT_DOC
          </span>
        </div>
        <span className="text-[9px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-sm border border-white/5 uppercase">
          STABLE_RECON
        </span>
      </div>

      {/* Main glass-panel article view container */}
      <div className="relative flex flex-col w-full bg-[#030508] border border-white/5 rounded-[16px] overflow-hidden p-4 sm:p-6 shadow-2xl z-10">
        
        {/* Core telemetry details sidebar */}
        <div className="relative flex flex-col gap-3.5 bg-[#07090e] border border-white/5 rounded-xl p-4 mb-6 text-xs font-mono">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[10px] text-gray-500 uppercase font-bold">
            <span>Diagnostic Summary</span>
            <span style={{ color: theme.primary }}>METRIC.SYS</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex flex-col">
              <span className="text-gray-500">ENGINEER</span>
              <span className="text-white font-sans font-medium mt-0.5">{project.authorName}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-gray-500">TIMELINE</span>
              <span className="text-white mt-0.5">{project.meta[2] || project.meta[0]}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">CATEGORY</span>
              <span className="text-white mt-0.5" style={{ color: theme.primary }}>{project.meta[0]}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-gray-500">READ_TIME</span>
              <span className="text-white mt-0.5">~ 5 MIN READ</span>
            </div>
          </div>
        </div>

        {/* Dynamic rich article content */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* Post Title */}
          <h2 className="text-[20px] sm:text-[24px] font-bold leading-snug text-white tracking-wide">
            {project.title}
          </h2>

          {/* Large mock screen frame image preview */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/5 bg-black">
            <Image
              alt={project.largeImage.alt}
              src={project.largeImage.src}
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-transparent opacity-85" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
          </div>

          {/* Section 1: The Executive Overview */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-gray-500">
              01 // Technical Overview
            </h3>
            <p className="text-[13.5px] sm:text-[14.5px] font-medium leading-[1.65] text-text-secondary">
              {project.overview.paragraph}
            </p>
          </div>

          {/* Section 2: Checklist of Core Accomplishments */}
          <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
            <h3 className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-gray-500">
              02 // Core Architecture
            </h3>
            <div className="flex flex-col gap-2.5">
              {project.overview.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[13px] text-text-secondary leading-[1.6]">
                  <span 
                    className="h-1.5 w-1.5 rounded-full mt-1.5 shrink-0" 
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Methodology Sequence Flow */}
          <div className="flex flex-col gap-3.5 border-t border-white/5 pt-5">
            <h3 className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-gray-500">
              03 // Flow & Methodology
            </h3>
            <div className="flex flex-col gap-2.5">
              {project.flow.steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3.5 bg-white/[0.02] border border-white/5 rounded-lg px-3.5 py-2.5 text-[12.5px] text-gray-300 hover:border-white/10 transition-colors duration-300 font-mono"
                >
                  <span className="flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 shrink-0 text-white select-none">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed break-all">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Tools & Code block Console Terminal */}
          <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
            <h3 className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-gray-500">
              04 // Tech Stack & Environment
            </h3>
            <div className="relative flex flex-col bg-[#040609] border border-white/5 rounded-xl p-3.5 font-mono text-[11.5px] text-gray-300 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-[10px] text-gray-500 font-bold select-none uppercase">
                <span>Core Tooling Telemetry</span>
                <span>SYS.READY</span>
              </div>
              <div className="flex flex-col gap-2">
                {project.tools.map((tool, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-gray-600 select-none">›</span>
                    <span className="break-all">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Impact & Achievements */}
          <div className="flex flex-col gap-3.5 border-t border-white/5 pt-5">
            <h3 className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-gray-500">
              05 // Impact Analysis
            </h3>
            <div className="flex flex-col gap-2.5">
              {project.impact.map((impactItem, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 bg-[#0a0f18]/30 border border-white/5 rounded-xl p-3.5 text-[13px] text-text-secondary leading-[1.6]"
                  style={{ borderColor: `${theme.primary}12` }}
                >
                  <span className="text-[12px] mt-0.5 shrink-0 select-none" style={{ color: theme.primary }}>✦</span>
                  <span>{impactItem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures */}
          <div className="flex flex-col gap-1 border-t border-white/5 pt-5 text-[11px] font-mono text-gray-500">
            <span>REPORT GENERATED BY</span>
            <span className="text-white text-xs font-semibold">{project.authorName}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
