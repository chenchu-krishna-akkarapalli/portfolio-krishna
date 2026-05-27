"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function WorkEducationSection({ items }: WorkEducationSectionProps) {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const safeItems = useMemo(() => items.filter(Boolean), [items]);

  // Scroll-driven vertical pan for the image inside the "screen".
  const { scrollYProgress } = useScroll({
    target: screenRef,
    offset: ["start end", "end start"],
  });

  // Keep movement subtle so the image stays contained.
  const screenImageY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  const active = safeItems[activeIndex];
  if (!active) return null;

  const canNavigate = safeItems.length > 1;
  const handlePrev = () => {
    if (!canNavigate) return;
    setActiveIndex((idx) => (idx - 1 + safeItems.length) % safeItems.length);
  };
  const handleNext = () => {
    if (!canNavigate) return;
    setActiveIndex((idx) => (idx + 1) % safeItems.length);
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="relative aspect-[578/330] w-full overflow-hidden rounded-huge border border-border-frame bg-bg-primary">
        <Image
          src={active.frameImageSrc}
          alt=""
          width={578}
          height={330}
          className="h-full w-full object-cover"
          priority
        />

        <div
          ref={screenRef}
          className="absolute left-[6.58%] top-[2.42%] w-[87.02%] h-[94.85%] overflow-hidden rounded-[3.8%] border border-border-screen"
        >
          <motion.div
            style={{ y: screenImageY }}
            className="absolute inset-0 transform-gpu will-change-transform"
          >
            <Image
              src={active.screenImageSrc}
              alt=""
              width={503}
              height={313}
              // Slight oversize so vertical panning doesn't reveal empty space.
              className="h-[120%] w-full object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-[8px]">
        <div className="flex items-center gap-[8px] max-w-[calc(100%-80px)]">
          {active.logoSrc ? (
            <Image
              src={active.logoSrc}
              alt=""
              width={32}
              height={32}
              className="size-[32px] rounded-[6px] border border-border-strong object-cover shrink-0"
            />
          ) : (
            <div
              aria-hidden="true"
              className="size-[32px] rounded-[6px] border border-border-strong bg-bg-primary shrink-0"
            />
          )}

          <div className="flex flex-col justify-center min-w-0">
            <p className="text-[14px] sm:text-[16px] font-bold leading-[normal] text-white truncate max-w-[130px] sm:max-w-[240px] md:max-w-none">
              {active.companyName}
            </p>
            <p className="text-[12px] sm:text-[14px] font-medium leading-[normal] text-text-secondary truncate max-w-[130px] sm:max-w-[240px] md:max-w-none">
              {active.period}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[7px]">
          <PrevButton onClick={handlePrev} />
          <NextButton onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}
