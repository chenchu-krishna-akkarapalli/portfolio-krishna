"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PrevButton, NextButton } from "@/components/NavigationButtons";

export type WorkEducationItem = {
  companyName: string;
  period: string;
  logoSrc?: string;
  frameImageSrc: string;
  screenImageSrc: string;
};

type WorkEducationSectionProps = {
  items: WorkEducationItem[];
};

// Slide variants for carousel items
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 220, damping: 24 },
      opacity: { duration: 0.25 },
      scale: { type: "spring" as const, stiffness: 200, damping: 22 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring" as const, stiffness: 220, damping: 24 },
      opacity: { duration: 0.2 },
      scale: { type: "spring" as const, stiffness: 200, damping: 22 }
    }
  })
};

export default function WorkEducationSection({ items }: WorkEducationSectionProps) {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev

  const safeItems = useMemo(() => items.filter(Boolean), [items]);

  // Scroll-driven vertical pan for the image inside the "screen".
  const { scrollYProgress } = useScroll({
    target: screenRef,
    offset: ["start end", "end start"],
  });

  // Panning transform + dynamic reflection tilt
  const screenImageY = useTransform(scrollYProgress, [0, 1], [-28, 28]);
  const reflectionY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const active = safeItems[activeIndex];
  if (!active) return null;

  const canNavigate = safeItems.length > 1;
  const handlePrev = () => {
    if (!canNavigate) return;
    setDirection(-1);
    setActiveIndex((idx) => (idx - 1 + safeItems.length) % safeItems.length);
  };
  const handleNext = () => {
    if (!canNavigate) return;
    setDirection(1);
    setActiveIndex((idx) => (idx + 1) % safeItems.length);
  };

  return (
    <div className="flex flex-col gap-[16px] select-none w-full">
      
      {/* Immersive Mockup Screen Container with high-tech bezel glare */}
      <div className="relative aspect-[578/330] w-full overflow-hidden rounded-huge border border-white/5 bg-[#030508] shadow-2xl">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 size-full w-full h-full"
          >
            {/* The outer laptop frame casing */}
            <Image
              src={active.frameImageSrc}
              alt=""
              width={578}
              height={330}
              className="h-full w-full object-cover opacity-90 pointer-events-none select-none"
              priority
            />

            {/* Inner screen frame viewport */}
            <div
              ref={screenRef}
              className="absolute left-[6.58%] top-[2.42%] w-[87.02%] h-[94.85%] overflow-hidden rounded-[3.8%] border border-white/5 bg-black"
            >
              <motion.div
                style={{ y: screenImageY }}
                className="absolute inset-0 transform-gpu will-change-transform scale-105"
              >
                <Image
                  src={active.screenImageSrc}
                  alt=""
                  width={503}
                  height={313}
                  className="h-[125%] w-full object-cover filter brightness-[0.9] saturate-[0.95]"
                  priority
                />
              </motion.div>

              {/* Dynamic physical glass glare overlay tracking scroll */}
              <motion.div 
                style={{ y: reflectionY }}
                className="pointer-events-none absolute inset-x-0 top-[-50%] h-[200%] w-full bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent skew-y-12 transform-gpu will-change-transform z-10"
              />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_4px_16px_rgba(255,255,255,0.06),inset_0_-2px_12px_rgba(0,0,0,0.8)] z-15" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Details header bar */}
      <div className="flex w-full items-center justify-between gap-[8px] bg-[#07090e]/40 border border-white/5 p-3 rounded-[16px] backdrop-blur-xs z-10">
        
        {/* Company profile panel info */}
        <div className="flex items-center gap-[10px] max-w-[calc(100%-100px)]">
          {active.logoSrc ? (
            <Image
              src={active.logoSrc}
              alt=""
              width={34}
              height={34}
              className="size-[34px] rounded-[8px] border border-white/10 object-cover shrink-0 bg-white"
            />
          ) : (
            <div
              aria-hidden="true"
              className="size-[34px] rounded-[8px] border border-white/10 bg-white/5 shrink-0"
            />
          )}

          <div className="flex flex-col justify-center min-w-0">
            <p className="text-[14px] sm:text-[16px] font-bold leading-normal text-white truncate max-w-[130px] sm:max-w-[240px] md:max-w-none">
              {active.companyName}
            </p>
            <p className="text-[11px] sm:text-[13px] font-mono leading-normal text-text-secondary truncate mt-0.5 max-w-[130px] sm:max-w-[240px] md:max-w-none">
              {active.period}
            </p>
          </div>
        </div>

        {/* Dynamic navigation state dots & controls */}
        <div className="flex items-center gap-[10px]">
          
          {/* visual progress indicators stepper */}
          <div className="hidden sm:flex items-center gap-[6px] mr-[4px]">
            {safeItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex 
                    ? "w-4 bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
                    : "w-1.5 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-[6px]">
            <PrevButton onClick={handlePrev} />
            <NextButton onClick={handleNext} />
          </div>
        </div>
      </div>
    </div>
  );
}
