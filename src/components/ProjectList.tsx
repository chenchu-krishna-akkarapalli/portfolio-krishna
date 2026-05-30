"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

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

function getProjectIcon(iconType: ProjectListItem["iconType"]) {
  if (!iconType) return null;

  switch (iconType) {
    case "ocr":
      return { src: "/assets/figma/ef50a75a8e2351d36d74c76eef3b23518726e565.svg", unoptimized: true, brandColor: "group-hover:bg-[#ffcc00]/10 border-white/5 group-hover:border-[#ffcc00]/20" };
    case "cad":
      return { src: "/assets/figma/e647a11b5ab79caceed8311d7b88a4cc3ff9ff87.png", unoptimized: false, brandColor: "group-hover:bg-[#ff3838]/10 border-white/5 group-hover:border-[#ff3838]/20" };
    case "hr":
      return { src: "/assets/figma/0e6e073a2aaa83228f3d95d22d0409e97a0d6c11.png", unoptimized: false, brandColor: "group-hover:bg-[#00f0ff]/10 border-white/5 group-hover:border-[#00f0ff]/20" };
    case "blog":
    default:
      return { src: "/assets/figma/fa31985a49294e7b673be5246eee89a1fc086d90.png", unoptimized: false, brandColor: "group-hover:bg-[#8b5cf6]/10 border-white/5 group-hover:border-[#8b5cf6]/20" };
  }
}

export default function ProjectList({ items }: ProjectListProps) {
  return (
    <div className="flex w-full flex-col gap-[12px] select-none">
      {items.map((project) => {
        const icon = project.iconSrc
          ? {
              src: project.iconSrc,
              unoptimized: project.iconSrc.toLowerCase().endsWith(".svg"),
              mode: "image" as const,
              brandColor: "border-white/5 group-hover:border-white/20"
            }
          : (() => {
              const fallback = getProjectIcon(project.iconType);
              return fallback
                ? { ...fallback, mode: "type" as const }
                : { src: "/assets/figma/fa31985a49294e7b673be5246eee89a1fc086d90.png", unoptimized: false, mode: "type" as const, brandColor: "border-white/5" };
            })();

        return (
          <motion.div
            key={project.title}
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={rowVariants}
            transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-[14px] border p-3.5 sm:p-4 transform-gpu will-change-transform cursor-pointer"
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
                className={`relative size-[34px] shrink-0 overflow-hidden rounded-full border bg-white/5 flex items-center justify-center transition-all duration-300 ${icon.brandColor}`}
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  src={icon.src}
                  width={24}
                  height={24}
                  unoptimized={icon.unoptimized}
                  className={
                    icon.mode === "type" && icon.unoptimized
                      ? "size-[18px] grayscale group-hover:grayscale-0 transition duration-300 ease-out group-hover:scale-105"
                      : "size-full object-cover grayscale group-hover:grayscale-0 transition duration-300 ease-out group-hover:scale-105"
                  }
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
              className="relative z-10 flex size-[24px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300"
            >
              <Image
                alt=""
                aria-hidden="true"
                src="/assets/figma/0e4f8b666592bdac4c1370729cc9515d040ce092.svg"
                width={10}
                height={10}
                unoptimized
                className="size-[10px] invert opacity-80"
              />
            </motion.a>
          </motion.div>
        );
      })}
    </div>
  );
}
