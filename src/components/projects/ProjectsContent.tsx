"use client";

import projectsData from "@/data/projects.json";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Cpu, Compass, Layout, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/utils/useIsMobile";


type ProjectsData = typeof projectsData;
type ProjectItem = ProjectsData["items"][number] & { category?: string; liveUrl?: string };

// Complete tech-stack mapping for all 11 projects (SaaS & UI/UX)
const PROJECT_TECH_STACKS: Record<string, { label: string; color: string }[]> = {
  "goyaz-jewellery": [
    { label: "Figma UI/UX", color: "text-[#f24e1e] bg-[#f24e1e]/10 border-[#f24e1e]/20" },
    { label: "Storytelling", color: "text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/20" },
    { label: "Browse Flow", color: "text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/20" },
    { label: "PDP Trust", color: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20" }
  ],
  "sturdy-studio": [
    { label: "Figma UI/UX", color: "text-[#f24e1e] bg-[#f24e1e]/10 border-[#f24e1e]/20" },
    { label: "Zustand", color: "text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/20" },
    { label: "CSS Tokens", color: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20" },
    { label: "Responsive", color: "text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/20" }
  ],
  "tarun-cma": [
    { label: "Figma UI/UX", color: "text-[#f24e1e] bg-[#f24e1e]/10 border-[#f24e1e]/20" },
    { label: "Conversion IA", color: "text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/20" },
    { label: "Lead Tunnels", color: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20" },
    { label: "Copy Strategy", color: "text-[#ffcc00] bg-[#ffcc00]/10 border-[#ffcc00]/20" }
  ],
  "mali-cma": [
    { label: "Figma UI/UX", color: "text-[#f24e1e] bg-[#f24e1e]/10 border-[#f24e1e]/20" },
    { label: "Web Vitals", color: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20" },
    { label: "Audit Flow", color: "text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/20" },
    { label: "Low Latency", color: "text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/20" }
  ],
  "showoff-salon": [
    { label: "Figma UI/UX", color: "text-[#f24e1e] bg-[#f24e1e]/10 border-[#f24e1e]/20" },
    { label: "Funnel Optimize", color: "text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/20" },
    { label: "Prefill Logic", color: "text-[#ffcc00] bg-[#ffcc00]/10 border-[#ffcc00]/20" },
    { label: "Luxury Style", color: "text-[#ff3838] bg-[#ff3838]/10 border-[#ff3838]/20" }
  ],
  "ocr-handwritten-text-extraction": [
    { label: "Python", color: "text-[#3572a5] bg-[#3572a5]/10 border-[#3572a5]/20" },
    { label: "YOLOv8", color: "text-[#ff3838] bg-[#ff3838]/10 border-[#ff3838]/20" },
    { label: "OpenCV", color: "text-[#5c3bf6] bg-[#5c3bf6]/10 border-[#5c3bf6]/20" },
    { label: "Transformers", color: "text-[#ffcc00] bg-[#ffcc00]/10 border-[#ffcc00]/20" }
  ],
  "multi-tenant-hr-product": [
    { label: "React.js", color: "text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/20" },
    { label: "Node.js", color: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20" },
    { label: "Prisma", color: "text-[#5a67d8] bg-[#5a67d8]/10 border-[#5a67d8]/20" },
    { label: "Redis", color: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20" },
    { label: "Docker", color: "text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/20" }
  ],
  "civil-dept-product-cad": [
    { label: "React.js", color: "text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/20" },
    { label: "Three.js", color: "text-[#ffffff] bg-white/10 border-white/20" },
    { label: "Django", color: "text-[#092e20] bg-[#092e20]/20 border-[#092e20]/30" },
    { label: "AWS Lambda", color: "text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/20" }
  ],
  "blog-publishing-platform": [
    { label: "Next.js", color: "text-[#ffffff] bg-white/10 border-white/20" },
    { label: "TypeScript", color: "text-[#3178c6] bg-[#3178c6]/10 border-[#3178c6]/20" },
    { label: "Prisma", color: "text-[#5a67d8] bg-[#5a67d8]/10 border-[#5a67d8]/20" },
    { label: "AWS S3", color: "text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/20" }
  ],
  "insurance-product": [
    { label: "Next.js", color: "text-[#ffffff] bg-white/10 border-white/20" },
    { label: "TypeScript", color: "text-[#3178c6] bg-[#3178c6]/10 border-[#3178c6]/20" },
    { label: "Prisma", color: "text-[#5a67d8] bg-[#5a67d8]/10 border-[#5a67d8]/20" },
    { label: "NextAuth", color: "text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/20" }
  ],
  "cma-firm-website-strategy-led-ui": [
    { label: "Next.js", color: "text-[#ffffff] bg-white/10 border-white/20" },
    { label: "Figma", color: "text-[#f24e1e] bg-[#f24e1e]/10 border-[#f24e1e]/20" },
    { label: "Tailwind CSS", color: "text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/20" }
  ]
};

const cardVariants: Variants = {
  rest: {
    y: 0,
    borderColor: "rgba(255,255,255,0.04)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
  },
  hover: {
    y: -6,
    borderColor: "rgba(255,255,255,0.12)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.6)"
  },
};

const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 0.15 },
};

const buttonVariants: Variants = {
  rest: {
    scale: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  hover: {
    scale: 1.08,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
};

export default function ProjectsContent() {
  const data: ProjectsData = projectsData;
  const [activeTab, setActiveTab] = useState<"all" | "uiux" | "saas">("all");
  const isMobile = useIsMobile();


  const filteredItems = (data.items as ProjectItem[]).filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <div className="mx-auto flex w-full max-w-[620px] flex-col gap-8 pb-24 pt-6 px-4 md:px-0 overflow-visible">
      {/* Header section with telemetry detail layout */}
      <section className="flex w-full flex-col gap-4 border-b border-white/5 pb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gray-500 uppercase font-semibold">
            Deployments catalog
          </span>
          <h1 className="text-[26px] font-bold leading-normal text-white">{data.title}</h1>
        </div>
        <p className="w-full text-[13.5px] sm:text-[14px] font-medium leading-[1.65] text-text-secondary">
          Explore a calibrated selection of product-design case studies and full-stack SaaS engineering architectures.
        </p>

        {/* Categories Tab Selector */}
        <div className="flex items-center gap-1.5 bg-[#05070a] border border-white/5 rounded-full p-1 w-fit mt-2 self-start text-[11px] font-mono">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 rounded-full transition-all duration-300 ${
              activeTab === "all" ? "text-cyan-400 bg-white/5 font-semibold" : "text-gray-500 hover:text-white"
            }`}
          >
            ALL
          </button>
          <span className="text-white/10 select-none">•</span>
          <button
            onClick={() => setActiveTab("uiux")}
            className={`px-3 py-1 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === "uiux" ? "text-cyan-400 bg-white/5 font-semibold" : "text-gray-500 hover:text-white"
            }`}
          >
            <Layout size={11} className={activeTab === "uiux" ? "text-cyan-400" : "text-gray-500"} />
            <span>UI/UX DESIGN</span>
          </button>
          <span className="text-white/10 select-none">•</span>
          <button
            onClick={() => setActiveTab("saas")}
            className={`px-3 py-1 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === "saas" ? "text-cyan-400 bg-white/5 font-semibold" : "text-gray-500 hover:text-white"
            }`}
          >
            <Cpu size={11} className={activeTab === "saas" ? "text-cyan-400" : "text-gray-500"} />
            <span>SAAS / TECH</span>
          </button>
        </div>
      </section>

      {/* Projects Cards Grid */}
      <div className="flex w-full flex-col gap-6 overflow-visible">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="overflow-visible"
            >
              <ProjectCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectCard({ item }: { item: ProjectItem }) {
  const techStack = PROJECT_TECH_STACKS[item.slug] || [];
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const isEmbeddable = item.liveUrl && !["tarun-cma", "sturdy-studio", "showoff-salon"].includes(item.slug);
  const isMobile = useIsMobile();


  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
      className="group relative h-auto w-full overflow-visible rounded-[20px] sm:rounded-medium border bg-[#05070a]/40 p-4 sm:p-5 transform-gpu will-change-transform"
      style={{ borderColor: "rgba(255,255,255,0.04)" }}
    >
      {/* Subtle active glow overlay tracking card hover */}
      <motion.div
        aria-hidden="true"
        variants={overlayVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] rounded-[20px] sm:rounded-medium"
      />

      <div className="relative z-10 flex w-full flex-col gap-4 overflow-visible">
        
        {/* Top: Image and Meta Details Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start overflow-visible">
          {/* Laptop mock view screen preview / Smart Telemetry Live Preview Container */}
          <div className="relative h-[130px] w-full sm:w-[190px] shrink-0 overflow-hidden rounded-lg border border-white/5 bg-black/90">
            {item.liveUrl ? (
              isEmbeddable ? (
                <div className="relative h-full w-full overflow-hidden">
                  {/* Glowing Skeleton Loader */}
                  {isIframeLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#030508] p-3 text-center">
                      <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-2" />
                      <span className="text-[8px] font-mono text-cyan-400/80 animate-pulse uppercase tracking-wider">
                        PROBING VIEWPORT...
                      </span>
                    </div>
                  )}

                  {/* Iframe with retina preview effect */}
                  <iframe
                    src={item.liveUrl}
                    title={`${item.title} live preview`}
                    onLoad={() => setIsIframeLoading(false)}
                    className={`absolute inset-0 w-[200%] h-[200%] scale-[0.5] origin-top-left border-0 transition-all duration-500 bg-black/95 ${
                      isInteracting ? "pointer-events-auto" : "pointer-events-none select-none"
                    } ${isIframeLoading ? "opacity-0" : "opacity-95 group-hover:opacity-100"}`}
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
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/45 hover:bg-black/25 backdrop-blur-[0.5px] transition-all duration-300 cursor-pointer select-none"
                    >
                      <div className="px-2 py-1 rounded border border-white/10 bg-black/95 text-[9px] font-mono text-cyan-400 font-semibold tracking-wider flex items-center gap-1 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                        <Compass size={8} className="animate-spin-slow text-cyan-400" />
                        <span>TAP TO PLAY</span>
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
                      className="absolute bottom-2 right-2 z-30 px-1.5 py-0.5 rounded border border-red-500/20 bg-black/90 text-[8px] font-mono text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all shadow-md"
                    >
                      EXIT PLAY
                    </button>
                  )}

                  {/* Live Badge HUD */}
                  {!isIframeLoading && !isInteracting && (
                    <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-black/80 border border-white/5 rounded-full px-1.5 py-0.5 text-[7.5px] font-mono text-emerald-400">
                      <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
                      <span>LIVE VIEWPORT</span>
                    </div>
                  )}
                </div>
              ) : (
                /* Clickable live link image fallback */
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-full w-full block overflow-hidden group/frame cursor-pointer"
                  title="Click to visit live website"
                >
                  <motion.div
                    initial={{ filter: "grayscale(100%)", opacity: 0.8 }}
                    whileInView={isMobile ? { filter: "grayscale(0%)", opacity: 1 } : undefined}
                    whileHover={!isMobile ? { filter: "grayscale(0%)", opacity: 1 } : undefined}
                    viewport={isMobile ? { once: false, margin: "-15% 0px -15% 0px" } : undefined}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="h-full w-full relative"
                  >
                    <Image
                      alt=""
                      src={item.imageSrc}
                      fill
                      sizes="(max-width: 640px) 100vw, 190px"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/frame:scale-102"
                    />
                  </motion.div>
                </a>
              )
            ) : (
              <div className="h-full w-full relative">
                <motion.div
                  initial={{ filter: "grayscale(100%)", opacity: 0.8 }}
                  whileInView={isMobile ? { filter: "grayscale(0%)", opacity: 1 } : undefined}
                  whileHover={!isMobile ? { filter: "grayscale(0%)", opacity: 1 } : undefined}
                  viewport={isMobile ? { once: false, margin: "-15% 0px -15% 0px" } : undefined}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="h-full w-full relative"
                >
                  <Image
                    alt=""
                    src={item.imageSrc}
                    fill
                    sizes="(max-width: 640px) 100vw, 190px"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* Details Content info */}
          <div className="flex flex-col flex-1 gap-2 min-w-0">
            {/* Title & Launch Button */}
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2 max-w-[85%]">
                <p className="text-[15px] sm:text-[16px] font-bold leading-normal text-white truncate group-hover:text-white transition-colors duration-300">
                  {item.title}
                </p>
                <span className={`px-1.5 py-0.5 rounded-[4px] border text-[8px] font-mono tracking-wider font-bold uppercase shrink-0 ${
                  item.category === "uiux" ? "text-cyan-400 border-cyan-500/20 bg-cyan-500/5" : "text-amber-400 border-amber-500/20 bg-amber-500/5"
                }`}>
                  {item.category === "uiux" ? "UI/UX" : "SAAS"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Real direct liveUrl link */}
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit live link for ${item.title}`}
                    className="flex size-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <ExternalLink size={10} />
                  </a>
                )}

                <Link
                  href={item.href}
                  aria-label={`View details for ${item.title}`}
                  className="flex size-6 items-center justify-center cursor-pointer"
                >
                  <motion.span
                    variants={buttonVariants}
                    transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
                    className="flex size-6 items-center justify-center overflow-hidden rounded-full border"
                  >
                    <ArrowUpRight
                      size={10}
                      className="size-2.5 text-white/80 group-hover:text-white transition-colors duration-300"
                    />
                  </motion.span>
                </Link>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-[12.5px] sm:text-[13px] font-medium leading-[1.6] text-text-secondary">
              {item.description}
            </p>
          </div>
        </div>

        {/* Bottom Row: Dynamic brand-colored tech tags & metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3 mt-1 font-mono text-[10px]">
          
          {/* Active tech stack indicator tags */}
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech.label}
                className={`px-2 py-0.5 rounded-[4px] border text-[9px] font-medium uppercase tracking-wider ${tech.color}`}
              >
                {tech.label}
              </span>
            ))}
          </div>

          {/* Date / Category telemetries */}
          <span className="text-text-quaternary font-medium shrink-0 uppercase tracking-widest text-[9px]">
            {item.meta.split("/")[1] || item.meta}
          </span>
        </div>

      </div>
    </motion.div>
  );
}
