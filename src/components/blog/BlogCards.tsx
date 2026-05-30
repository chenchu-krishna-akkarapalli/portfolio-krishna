"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type BlogCardItem = {
  projectSlug?: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
};

type BlogCardsProps = {
  items: BlogCardItem[];
};

// Static brand maps matching work categories
const CATEGORY_THEMES: Record<string, { color: string; glow: string; text: string; bg: string }> = {
  "HR - OCR": { color: "#ffcc00", glow: "rgba(255,204,0,0.15)", text: "text-[#ffcc00]", bg: "bg-[#ffcc00]/10" },
  "HRMS": { color: "#00f0ff", glow: "rgba(0,240,255,0.15)", text: "text-[#00f0ff]", bg: "bg-[#00f0ff]/10" },
  "Insurance": { color: "#3b82f6", glow: "rgba(59,130,246,0.15)", text: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10" },
  "Blog": { color: "#8b5cf6", glow: "rgba(139,92,246,0.15)", text: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10" },
  "Civil + CAD": { color: "#ff3838", glow: "rgba(255,56,56,0.15)", text: "text-[#ff3838]", bg: "bg-[#ff3838]/10" },
  "Corporate Website": { color: "#ec4899", glow: "rgba(236,72,153,0.15)", text: "text-[#ec4899]", bg: "bg-[#ec4899]/10" }
};

const cardVariants: Variants = {
  rest: {
    y: 0,
    borderColor: "rgba(255,255,255,0.04)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
  },
  hover: {
    y: -6,
    boxShadow: "0 12px 24px rgba(0,0,0,0.6)"
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

export default function BlogCards({ items }: BlogCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => {
        const theme = CATEGORY_THEMES[item.category] || { color: "rgba(255,255,255,0.2)", glow: "rgba(255,255,255,0.02)", text: "text-text-placeholder", bg: "bg-white/5" };
        // Estimate reading time based on excerpt length
        const readingTime = Math.max(3, Math.ceil(item.excerpt.split(/\s+/).length / 25));

        return (
          <Link
            key={`${item.projectSlug ?? "no-slug"}-${item.category}-${item.title}`}
            href={item.projectSlug ? `/blog/${item.projectSlug}` : "/blog"}
            className="block h-full cursor-pointer"
            aria-label={item.projectSlug ? `Open project blog: ${item.title}` : item.title}
          >
            <motion.article
              initial="rest"
              animate="rest"
              whileHover={{ 
                y: -6,
                borderColor: theme.color,
                boxShadow: `0 6px 20px ${theme.glow}`
              }}
              suppressHydrationWarning={true}
              transition={{ type: "spring" as const, stiffness: 260, damping: 26, mass: 0.9 }}
              className="group relative h-full w-full overflow-hidden rounded-[20px] sm:rounded-medium border bg-[#05070a]/40 p-4 sm:p-5 flex flex-col gap-3.5 transform-gpu will-change-transform transition-all duration-300"
              style={{ 
                borderColor: "rgba(255,255,255,0.04)"
              }}
            >
              {/* Subtle dynamic glowing radial gradient following active theme */}
              <motion.div
                aria-hidden="true"
                variants={overlayVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(circle at center, ${theme.glow} 0%, transparent 100%)`,
                }}
              />

              {/* Top row: Category info and dynamic reading time widgets */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[9px] tracking-wider uppercase font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded-[4px] border ${theme.bg} ${theme.text}`} style={{ borderColor: `${theme.color}20` }}>
                    {item.category}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 font-medium">{readingTime} MIN READ</span>
                </div>

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
              </div>

              {/* Main Content details */}
              <div className="relative z-10 flex flex-col flex-1 gap-1">
                <h3 className="text-[15px] sm:text-[16px] font-bold leading-normal text-white group-hover:text-white transition-colors duration-300 line-clamp-2 overflow-hidden text-ellipsis">
                  {item.title}
                </h3>
                
                <span className="text-[10px] sm:text-[11px] font-mono font-medium text-text-quaternary mt-1">
                  {item.date}
                </span>

                <p className="mt-2 text-[12.5px] sm:text-[13.5px] font-medium leading-[1.6] text-text-secondary line-clamp-3 overflow-hidden text-ellipsis">
                  {item.excerpt}
                </p>
              </div>
            </motion.article>
          </Link>
        );
      })}
    </div>
  );
}
