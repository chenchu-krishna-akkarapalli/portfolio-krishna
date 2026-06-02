"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PrevButton } from "@/components/NavigationButtons";
import { motion, useScroll } from "framer-motion";
import type { ReactNode } from "react";
import { ZoomableImage } from "@/components/projects/ZoomableImage";
import { ProjectLargeVideo } from "@/components/projects/ProjectLargeVideo";
import { Compass } from "lucide-react";

export type ProjectDetail = {
  slug: string;
  headerLabel: string;
  meta: string[];
  title: string;
  liveUrl?: string;
  laptop: {
    svgSrc: string;
    alt: string;
  };
  overview: {
    bullets: string[];
    paragraph: string;
  };
  ipad: {
    svgSrc: string;
    alt: string;
  };
  flow: {
    steps: string[];
  };
  largeVideo?:
    | {
        type: "vimeo";
        vimeoId: number;
        title: string;
      }
    | {
        type: "mp4";
        src: string;
        title: string;
      };
  largeImage: {
    src: string;
    alt: string;
  };
  tools: string[];
  impact: string[];
  authorName: string;
};

// Static brand-colors map matching slug
const SLUG_PALETTES: Record<string, { primary: string; glow: string; text: string; bg: string }> = {
  "ocr-handwritten-text-extraction": { primary: "#ffcc00", glow: "rgba(255,204,0,0.15)", text: "text-[#ffcc00]", bg: "bg-[#ffcc00]/10" },
  "multi-tenant-hr-product": { primary: "#00f0ff", glow: "rgba(0,240,255,0.15)", text: "text-[#00f0ff]", bg: "bg-[#00f0ff]/10" },
  "insurance-product": { primary: "#3b82f6", glow: "rgba(59,130,246,0.15)", text: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10" },
  "blog-publishing-platform": { primary: "#8b5cf6", glow: "rgba(139,92,246,0.15)", text: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10" },
  "civil-dept-product-cad": { primary: "#ff3838", glow: "rgba(255,56,56,0.15)", text: "text-[#ff3838]", bg: "bg-[#ff3838]/10" },
  "cma-firm-website-strategy-led-ui": { primary: "#ec4899", glow: "rgba(236,72,153,0.15)", text: "text-[#ec4899]", bg: "bg-[#ec4899]/10" }
};

function Laptop({ svgSrc, alt }: ProjectDetail["laptop"]) {
  return (
    <ZoomableImage
      src={svgSrc}
      alt={alt}
      width={497}
      height={273}
      unoptimized
      priority
      className="block h-auto w-full"
      zoomContainerClassName="w-full cursor-zoom-in"
    />
  );
}

function Ipad({ svgSrc, alt }: ProjectDetail["ipad"]) {
  const isLongBlogLanding = svgSrc.endsWith("/blog-LandingPage.svg");
  const isInsuranceUiTemplate = svgSrc.endsWith("/insurance-Ui-templet.svg");
  const isCaFirmTemplate = svgSrc.endsWith("/CA-Firm-Templet.png");

  if (isLongBlogLanding || isInsuranceUiTemplate || isCaFirmTemplate) {
    return (
      <ZoomableImage
        src={svgSrc}
        alt={alt}
        width={isLongBlogLanding ? 1440 : 1345}
        height={
          isLongBlogLanding ? 12095 : isCaFirmTemplate ? 5931 : 2497
        }
        unoptimized
        className="block h-auto w-full"
        zoomContainerClassName="w-full cursor-zoom-in overflow-hidden rounded-huge"
        modalVariant="fullWidthScroll"
      />
    );
  }

  return (
    <div className="relative h-76.25 w-full overflow-hidden rounded-medium sm:rounded-huge border border-white/5 bg-black">
      <ZoomableImage
        src={svgSrc}
        alt={alt}
        fill
        unoptimized
        className="cursor-zoom-in"
        style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        zoomContainerClassName="absolute inset-0 size-full w-full h-full"
      />
    </div>
  );
}

export function ProjectDetailContent({
  project,
  largeImageSlot,
}: {
  project: ProjectDetail;
  largeImageSlot?: ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const theme = SLUG_PALETTES[project.slug] || { primary: "#ffffff", glow: "rgba(255,255,255,0.1)", text: "text-white", bg: "bg-white/10" };
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const isEmbeddable = project.liveUrl && !["tarun-cma", "sturdy-studio", "showoff-salon"].includes(project.slug);

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
          <PrevButton href="/projects" ariaLabel="Back to projects" />
          <span className="text-[10px] tracking-[0.25em] text-gray-500 font-mono font-semibold uppercase">
            {project.headerLabel || "Projects"} / REPORT_DOC
          </span>
        </div>
        <span className="text-[9px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-[2px] border border-white/5 uppercase">
          STABLE_RECON
        </span>
      </div>

      {/* Main glass-panel project details container */}
      <div className="relative flex flex-col w-full bg-[#030508] border border-white/5 rounded-[16px] overflow-hidden p-4 sm:p-6 shadow-2xl z-10">
        
        {/* Core telemetry details summary sidebar card */}
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
              <span className="text-gray-500">STACK_BASE</span>
              <span className="text-white mt-0.5 truncate">{project.meta[1] || "Full Stack"}</span>
            </div>
          </div>
        </div>

        {/* Dynamic rich project details content */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* Post Title */}
          <h2 className="text-[20px] sm:text-[24px] font-bold leading-snug text-white tracking-wide">
            {project.title}
          </h2>

          {/* MOCKUP SLOT 1: LAPTOP SCREEN MOCK / LIVE IFRAME VIEWPORT */}
          <div className="relative w-full aspect-[497/273] rounded-xl overflow-hidden border border-white/5 bg-[#030508]">
            {project.liveUrl ? (
              isEmbeddable ? (
                <div className="relative h-full w-full overflow-hidden">
                  {/* Glowing Skeleton Loader */}
                  {isIframeLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#030508] p-3 text-center">
                      <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-2" />
                      <span className="text-[8px] font-mono text-cyan-400/80 animate-pulse uppercase tracking-wider">
                        PROBING LIVE SITE...
                      </span>
                    </div>
                  )}

                  {/* Iframe with retina preview effect */}
                  <iframe
                    src={project.liveUrl}
                    title={`${project.title} live viewport`}
                    onLoad={() => setIsIframeLoading(false)}
                    className={`absolute inset-0 w-[200%] h-[200%] scale-[0.5] origin-top-left border-0 transition-all duration-500 bg-black/95 ${
                      isInteracting ? "pointer-events-auto" : "pointer-events-none select-none"
                    } ${isIframeLoading ? "opacity-0" : "opacity-95"}`}
                    loading="lazy"
                  />

                  {/* Click to Interact Overlay */}
                  {!isIframeLoading && !isInteracting && (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsInteracting(true);
                      }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 hover:bg-black/30 backdrop-blur-[0.5px] transition-all duration-300 cursor-pointer select-none"
                    >
                      <div className="px-3 py-1.5 rounded-[2px] border border-cyan-500/20 bg-black/95 text-[10px] font-mono text-cyan-400 font-semibold tracking-[0.08em] flex items-center gap-1.5 shadow-[0_0_8px_rgba(0,240,255,0.15)] hover:border-cyan-400 hover:bg-cyan-500/5 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-300">
                        <Compass size={10} className="animate-spin-slow text-cyan-400" />
                        <span>CLICK TO INTERACT LIVE</span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Mode Exit Action */}
                  {isInteracting && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsInteracting(false);
                      }}
                      className="absolute bottom-3 right-3 z-30 px-2 py-1 rounded-[2px] border border-red-500/30 bg-black/90 text-[9px] font-mono text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all duration-300 uppercase tracking-wider"
                    >
                      EXIT INTERACTION
                    </button>
                  )}

                  {/* Live Badge HUD */}
                  {!isIframeLoading && !isInteracting && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-black/80 border border-white/5 rounded-[2px] px-2 py-0.5 text-[8px] font-mono text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>LIVE DEMO</span>
                    </div>
                  )}
                </div>
              ) : (
                /* Clickable live link image fallback */
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-full w-full block overflow-hidden group/frame cursor-pointer"
                  title="Click to visit live website"
                >
                  <Laptop {...project.laptop} />
                </a>
              )
            ) : (
              <Laptop {...project.laptop} />
            )}
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

          {/* Section 2: Checklist of Core Architecture Accomplishments */}
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

          {/* MOCKUP SLOT 2: IPAD MOCK */}
          <div className="relative w-full rounded-xl overflow-hidden border border-white/5 bg-[#030508]">
            <Ipad {...project.ipad} />
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

          {/* MOCKUP SLOT 3: COMPARISON SLIDER OR LARGE IMAGE/VIDEO VIEW */}
          <div className="relative w-full rounded-xl overflow-hidden border border-white/5 bg-[#030508]">
            {largeImageSlot ? (
              largeImageSlot
            ) : project.largeVideo ? (
              <ProjectLargeVideo video={project.largeVideo} />
            ) : (
              project.largeImage.src.endsWith("full-height-screenshot.png") ? (
                <ZoomableImage
                  src={project.largeImage.src}
                  alt={project.largeImage.alt}
                  width={1345}
                  height={project.slug === "showoff-salon" ? 8000 : 5000}
                  unoptimized
                  className="block h-auto w-full"
                  zoomContainerClassName="w-full cursor-zoom-in overflow-hidden rounded-xl"
                  modalVariant="fullWidthScroll"
                />
              ) : (
                <div className="relative aspect-[496/313] w-full overflow-hidden">
                  <ZoomableImage
                    src={project.largeImage.src}
                    alt={project.largeImage.alt}
                    fill
                    className="pointer-events-none select-none cursor-zoom-in"
                    style={{ objectFit: "cover", objectPosition: "50% 50%" }}
                    zoomContainerClassName="absolute inset-0 size-full w-full h-full"
                  />
                </div>
              )
            )}
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
          <div className="flex items-center justify-between border-t border-white/5 pt-5 text-[11px] font-mono text-gray-500">
            <div className="flex flex-col gap-1">
              <span>REPORT GENERATED BY</span>
              <span className="text-white text-xs font-semibold">{project.authorName}</span>
            </div>
            
            <div className="relative h-6 w-20">
              <Image
                src="/assets/figma/81d96eeaf889c9ccb936670c52e31282548ab24c.svg"
                alt="Signature"
                fill
                className="pointer-events-none select-none invert opacity-60 hover:opacity-100 transition-opacity duration-300"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
