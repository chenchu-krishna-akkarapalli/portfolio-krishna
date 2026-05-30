"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

export type SpotlightCardItem = {
  title: string;
  description: string;
  footerLeft: string;
  footerRight: string;
  logoFile: string;
  href?: string;
};

type SpotlightCardsProps = {
  items: SpotlightCardItem[];
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
    boxShadow: "0 12px 24px rgba(0,0,0,0.6)"
  },
};

const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 0.15 },
};

const dividerVariants: Variants = {
  rest: { scaleX: 0.85, opacity: 0.2 },
  hover: { scaleX: 1, opacity: 0.6 },
};

const viewButtonVariants: Variants = {
  rest: { opacity: 0.3, x: -6, scale: 0.95 },
  hover: { opacity: 1, x: 0, scale: 1 },
};

export default function SpotlightCards({ items }: SpotlightCardsProps) {
  return (
    <div className="flex flex-col gap-[16px] select-none w-full">
      {items.map((item) => (
        <motion.div
          key={item.title}
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={cardVariants}
          transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
          className="group relative h-auto w-full overflow-hidden rounded-[20px] sm:rounded-medium border bg-[#05070a]/40 p-4 sm:p-5 flex flex-col gap-[14px] transform-gpu will-change-transform"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          {/* Subtle neon holographic active overlay underlay */}
          <motion.div
            aria-hidden="true"
            variants={overlayVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_100%)] z-0"
          />

          {/* Header row details */}
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="flex items-center gap-[10px] max-w-[calc(100%-36px)]">
              <div className="relative size-[32px] shrink-0 overflow-hidden rounded-full border border-white/5 bg-white/5 group-hover:border-white/10 group-hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                <Image
                  alt=""
                  aria-hidden="true"
                  src={`/assets/figma/${item.logoFile}`}
                  width={24}
                  height={24}
                  className="size-[20px] object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <p className="truncate text-[14.5px] sm:text-[15.5px] font-bold leading-normal text-white group-hover:text-white transition-colors duration-300">
                {item.title}
              </p>
            </div>

            {/* Dynamic launch button */}
            <motion.a
              href={item.href ?? "#"}
              aria-label="Open"
              variants={viewButtonVariants}
              transition={{ duration: 0.6, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex size-[24px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300"
              {...(item.href
                ? { target: "_blank", rel: "noopener noreferrer" }
                : undefined)}
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
          </div>

          {/* Description Block */}
          <div className="relative z-10 flex flex-col gap-[6px]">
            <p className="text-[12.5px] sm:text-[13.5px] font-medium leading-[1.6] text-text-secondary">
              {item.description}
            </p>
          </div>

          {/* Dynamic animated expanding divider & metadata fields */}
          <div className="relative z-10 flex flex-col gap-[10px] mt-auto w-full">
            <motion.div
              variants={dividerVariants}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center transform-gpu"
            />
            <div className="flex w-full items-center justify-between text-[11px] sm:text-[12.5px] font-mono font-medium leading-normal text-text-quaternary gap-[8px]">
              <p className="truncate max-w-[60%] sm:max-w-none uppercase tracking-wider">{item.footerLeft}</p>
              <p className="shrink-0 uppercase tracking-widest text-[9px]">{item.footerRight}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
