"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/utils/useIsMobile";


export type ToolStackCardItem = {
  label: string;
  icon: string[];
  href?: string;
};

type ToolStackCardsProps = {
  rows: ToolStackCardItem[][];
  iconBasePath?: string;
  forceMonochromeIcons?: boolean;
};

// Brand colors mapping for premium hover border glows and highlights
const TOOL_BRAND_COLORS: Record<string, { color: string; glow: string }> = {
  "figma": { color: "#f24e1e", glow: "rgba(242,78,30,0.18)" },
  "canva": { color: "#00c4cc", glow: "rgba(0,196,204,0.18)" },
  "next js": { color: "#ffffff", glow: "rgba(255,255,255,0.15)" },
  "react js": { color: "#00f0ff", glow: "rgba(0,240,255,0.18)" },
  "autodesk": { color: "#0696d7", glow: "rgba(6,150,215,0.18)" },
  "git-copilot": { color: "#8b5cf6", glow: "rgba(139,92,246,0.18)" },
  "taland": { color: "#ff3c00", glow: "rgba(255,60,0,0.18)" },
  "talend": { color: "#ff3c00", glow: "rgba(255,60,0,0.18)" },
  "docker": { color: "#2496ed", glow: "rgba(36,150,237,0.18)" },
  "mysql": { color: "#4479a1", glow: "rgba(68,121,161,0.18)" }
};

const cardVariants: Variants = {
  rest: {
    y: 0,
    borderColor: "rgba(255,255,255,0.04)",
  },
  hover: {
    y: -4,
  },
};

const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 0.15 },
};

const viewButtonVariants: Variants = {
  rest: { opacity: 0, x: -14 },
  hover: { opacity: 1, x: 0 },
};

export default function ToolStackCards({
  rows,
  iconBasePath = "/assets/figma",
  forceMonochromeIcons = false,
}: ToolStackCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-[11px] select-none w-full">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex flex-row w-full gap-[12px]">
          {row.map(({ label, icon, href }) => {
            const normalized = label.trim().toLowerCase();
            const brand = TOOL_BRAND_COLORS[normalized] || { color: "rgba(255,255,255,0.12)", glow: "rgba(255,255,255,0.02)" };
            const isHovered = hoveredCard === label;

            const initialFilter = forceMonochromeIcons
              ? "invert(100%) grayscale(100%) contrast(125%)"
              : "grayscale(100%)";
            const activeFilter = forceMonochromeIcons
              ? "invert(0%) grayscale(0%) contrast(100%)"
              : "grayscale(0%)";

            return (
              <motion.div
                key={label}
                initial="rest"
                animate="rest"
                whileHover="hover"
                onMouseEnter={() => setHoveredCard(label)}
                onMouseLeave={() => setHoveredCard(null)}
                variants={cardVariants}
                transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
                className="group relative h-[56px] sm:h-[71px] flex-1 overflow-hidden rounded-[14px] border bg-[#05070a]/40 transform-gpu will-change-transform cursor-pointer transition-all duration-300"
                style={{ 
                  borderColor: isHovered ? brand.color : "rgba(255,255,255,0.04)",
                  boxShadow: isHovered ? `0 6px 20px ${brand.glow}` : "none"
                }}
              >
                {/* Active light beam backdrop underlay */}
                <motion.div
                  aria-hidden="true"
                  variants={overlayVariants}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center, ${brand.glow} 0%, transparent 100%)`,
                  }}
                />

                {/* Brand icon frame slot with dynamic glow background */}
                <div className="absolute left-[10px] sm:left-[16px] top-[10px] sm:top-[15px] z-10 flex size-[32px] sm:size-[39px] items-center justify-center rounded-full bg-white/5 border border-white/5 group-hover:border-white/10 transition-all duration-300">
                  <motion.span
                    aria-hidden="true"
                    initial={{ filter: initialFilter, opacity: 0.8 }}
                    whileInView={isMobile ? { filter: activeFilter, opacity: 1 } : undefined}
                    whileHover={!isMobile ? { filter: activeFilter, opacity: 1 } : undefined}
                    viewport={isMobile ? { once: false, margin: "-15% 0px -15% 0px" } : undefined}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative block size-[20px] sm:size-[24px]"
                  >
                    {icon.map((file) => (
                      <Image
                        key={file}
                        alt=""
                        aria-hidden="true"
                        src={`${iconBasePath}/${file}`}
                        width={40}
                        height={40}
                        unoptimized={file.endsWith(".svg")}
                        className="absolute inset-0 block h-full w-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                    ))}
                  </motion.span>
                </div>

                <p className="absolute left-[50px] sm:left-[64px] top-[19px] sm:top-[25px] z-10 text-[13px] sm:text-[15px] font-bold leading-normal text-gray-300 group-hover:text-white transition-colors duration-300 truncate max-w-[calc(100%-54px)] sm:max-w-[calc(100%-100px)]">
                  {label}
                </p>

                {/* Clickable open link action button */}
                <motion.a
                  href={href ?? "#"}
                  aria-label="Open"
                  variants={viewButtonVariants}
                  transition={{ duration: 0.6, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-[16px] top-[16px] z-10 hidden sm:flex size-[24px] items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noreferrer" : undefined}
                >
                  <ArrowUpRight
                    size={12}
                    className="size-[12px] text-white/80 group-hover:text-white transition-colors duration-300"
                  />
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
