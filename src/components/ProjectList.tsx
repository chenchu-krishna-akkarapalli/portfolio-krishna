"use client";

import { motion, type Variants } from "framer-motion";
import { ScanText, Compass, Users, BookOpen, ArrowUpRight, LucideIcon } from "lucide-react";

export type ProjectListItem = {
  title: string;
  href: string;
  iconSrc?: string;
  iconType?: "ocr" | "cad" | "hr" | "blog";
};

type ProjectListProps = {
  items: ProjectListItem[];
};

const rowVariants: Variants = {
  rest: {
    y: 0,
    borderColor: "rgba(255,255,255,0.04)",
    backgroundColor: "rgba(5,7,10,0.3)"
  },
  hover: {
    y: -3,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.02)"
  },
};

const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 0.15 },
};

const viewButtonVariants: Variants = {
  rest: { opacity: 0.3, x: -6, scale: 0.95 },
  hover: { opacity: 1, x: 0, scale: 1 },
};

type ProjectIconConfig = {
  Icon: LucideIcon;
  brandColor: string;
  activeColor: string;
};

function getProjectIcon(iconType: ProjectListItem["iconType"]): ProjectIconConfig {
  switch (iconType) {
    case "ocr":
      return {
        Icon: ScanText,
        brandColor: "group-hover:bg-[#ffcc00]/10 border-white/5 group-hover:border-[#ffcc00]/20",
        activeColor: "text-gray-400 group-hover:text-[#ffcc00] group-hover:filter group-hover:drop-shadow-[0_0_6px_rgba(255,204,0,0.5)]"
      };
    case "cad":
      return {
        Icon: Compass,
        brandColor: "group-hover:bg-[#ff3838]/10 border-white/5 group-hover:border-[#ff3838]/20",
        activeColor: "text-gray-400 group-hover:text-[#ff3838] group-hover:filter group-hover:drop-shadow-[0_0_6px_rgba(255,56,56,0.5)]"
      };
    case "hr":
      return {
        Icon: Users,
        brandColor: "group-hover:bg-[#00f0ff]/10 border-white/5 group-hover:border-[#00f0ff]/20",
        activeColor: "text-gray-400 group-hover:text-[#00f0ff] group-hover:filter group-hover:drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]"
      };
    case "blog":
    default:
      return {
        Icon: BookOpen,
        brandColor: "group-hover:bg-[#8b5cf6]/10 border-white/5 group-hover:border-[#8b5cf6]/20",
        activeColor: "text-gray-400 group-hover:text-[#8b5cf6] group-hover:filter group-hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]"
      };
  }
}

export default function ProjectList({ items }: ProjectListProps) {
  return (
    <div className="flex w-full flex-col gap-[12px] select-none">
      {items.map((project) => {
        const iconConfig = getProjectIcon(project.iconType);

        return (
          <motion.div
            key={project.title}
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={rowVariants}
            transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-[4px] border p-3.5 sm:p-4 transform-gpu will-change-transform cursor-pointer"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            {/* Spotlight halo effect tracking row hover */}
            <motion.div
              aria-hidden="true"
              variants={overlayVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_100%)] z-0"
            />

            {/* Left elements: Icon and clickable link */}
            <div className="relative z-10 flex items-center gap-[12px] max-w-[calc(100%-36px)]">
              
              {/* Dynamic brand-highlight active ring icon container */}
              <span
                aria-hidden="true"
                className={`relative size-[34px] shrink-0 overflow-hidden rounded-[2px] border bg-white/5 flex items-center justify-center transition-all duration-300 ${iconConfig.brandColor}`}
              >
                <iconConfig.Icon
                  size={16}
                  strokeWidth={2}
                  className={`size-[16px] transition-all duration-300 stroke-current ${iconConfig.activeColor}`}
                />
              </span>

              <a
                href={project.href}
                className="truncate text-[14.5px] sm:text-[15.5px] font-semibold leading-normal text-gray-300 outline-none transition-colors duration-300 ease-out group-hover:text-white max-w-[calc(100%-48px)] sm:max-w-none"
              >
                {project.title}
              </a>
            </div>

            {/* Launch link button sliding out dynamically */}
            <motion.a
              href={project.href}
              aria-label="Open"
              whileFocus="hover"
              whileTap="hover"
              variants={viewButtonVariants}
              transition={{ duration: 0.6, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex size-[24px] shrink-0 items-center justify-center rounded-[2px] border border-cyan-500/20 bg-transparent group-hover:border-cyan-400 group-hover:bg-cyan-500/5 group-hover:shadow-[0_0_8px_rgba(0,240,255,0.25)] transition-all duration-300"
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
  );
}
