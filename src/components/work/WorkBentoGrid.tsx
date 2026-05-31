"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type BentoBaseItem = {
  badgeText: string;
  layout: "hero" | "wide" | "tall" | "square" | "small";
};

type BentoImageItem = BentoBaseItem & {
  type: "image";
  src: string;
};

type BentoVideoItem = BentoBaseItem & {
  type: "video";
  src: string;
};

export type BentoItem = BentoImageItem | BentoVideoItem;

type WorkBentoGridProps = {
  items: BentoItem[];
};

// Bento staggered animations variants
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 160,
      damping: 18
    }
  }
};

export default function WorkBentoGrid({ items }: WorkBentoGridProps) {
  return (
    <motion.div 
      variants={gridContainerVariants}
      initial="hidden"
      animate="show"
      className="grid w-full grid-cols-6 gap-[12px] sm:gap-[15px] select-none"
    >
      {items.map((item) => {
        const layout = getLayoutClasses(item.layout);

        return (
          <motion.div
            key={`${item.src}:${item.badgeText}`}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className={`group relative overflow-hidden rounded-[20px] sm:rounded-huge border bg-[#05070a]/40 cursor-pointer transform-gpu will-change-transform transition-all duration-300 hover:border-white/12 ${layout.wrapper}`}
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            {item.type === "image" ? (
              <motion.div
                initial={{ filter: "grayscale(100%)", opacity: 0.8 }}
                whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                whileHover={{ filter: "grayscale(0%)", opacity: 1 }}
                viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  alt=""
                  aria-hidden
                  src={item.src}
                  fill
                  sizes={layout.sizes}
                  unoptimized={item.src.endsWith(".svg")}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </motion.div>
            ) : (
              <video
                className="absolute inset-0 h-full w-full object-cover filter brightness-[0.8] saturate-[0.9] group-hover:brightness-[0.95] group-hover:saturate-[1.05] transition-all duration-500"
                src={item.src}
                controls
                playsInline
                preload="metadata"
              />
            )}

            {/* Glowing active card borders on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />

            {/* Glassmorphic sci-fi telemetry badge */}
            <div className="absolute bottom-[14px] right-[14px] sm:bottom-[18px] sm:right-[18px] z-10 transition-all duration-300 group-hover:scale-103">
              <div className="backdrop-blur-md bg-black/60 border border-white/5 group-hover:border-white/15 rounded-medium px-4 py-2 sm:px-4.5 sm:py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <p className="text-[12px] sm:text-[13px] font-mono tracking-wider font-semibold text-gray-200 group-hover:text-white uppercase transition-colors duration-300">
                  {item.badgeText}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function getLayoutClasses(layout: BentoBaseItem["layout"]) {
  if (layout === "hero") {
    return {
      wrapper: "col-span-6 h-[260px] sm:h-[306px]",
      sizes: "(max-width: 640px) 100vw, 580px",
    };
  }

  if (layout === "wide") {
    return {
      wrapper: "col-span-6 sm:col-span-4 h-[180px] sm:h-[196px]",
      sizes: "(max-width: 640px) 100vw, 380px",
    };
  }

  if (layout === "tall") {
    return {
      wrapper: "col-span-3 sm:col-span-2 h-[340px] sm:h-[408px]",
      sizes: "(max-width: 640px) 50vw, 182px",
    };
  }

  if (layout === "square") {
    return {
      wrapper: "col-span-3 h-[180px] sm:h-[196px]",
      sizes: "50vw",
    };
  }

  return {
    wrapper: "col-span-3 sm:col-span-2 h-[160px] sm:h-[187px]",
    sizes: "(max-width: 640px) 50vw, 182px",
  };
}
