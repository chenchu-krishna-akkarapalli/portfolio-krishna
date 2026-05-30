"use client";

import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { CloseButton } from "@/components/NavigationButtons";

type CADComparisonSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

const HANDLE_SIZE_PX = 32;

type CADComparisonSliderBaseProps = CADComparisonSliderProps & {
  layoutId: string;
  onRequestOpen?: () => void;
  className?: string;
  sliderPct: number;
  onSliderPctChange: (nextPct: number) => void;
};

function CADComparisonSliderBase({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  layoutId,
  onRequestOpen,
  className,
  sliderPct,
  onSliderPctChange,
}: CADComparisonSliderBaseProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragBoundsRef = useRef<HTMLDivElement | null>(null);
  const sliderPctRef = useRef(sliderPct);

  useEffect(() => {
    sliderPctRef.current = sliderPct;
  }, [sliderPct]);

  const [containerWidth, setContainerWidth] = useState(0);
  const widthMv = useMotionValue(1);

  const handleX = useMotionValue(0); // left edge (px)
  const dividerX = useTransform(handleX, (x) => x + HANDLE_SIZE_PX / 2);

  const clipPath = useTransform([dividerX, widthMv], ([divider, width]) => {
    const w = typeof width === "number" ? width : Number(width);
    const d = typeof divider === "number" ? divider : Number(divider);
    if (!w || w <= 0) return "inset(0 50% 0 0)";
    const clampedDivider = Math.max(0, Math.min(w, d));
    const rightInsetPct = ((w - clampedDivider) / w) * 100;
    return `inset(0 ${rightInsetPct}% 0 0)`;
  });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const update = () => {
      const width = node.getBoundingClientRect().width;
      setContainerWidth(width);
      widthMv.set(width || 1);
      const desiredPct = sliderPctRef.current;
      const desiredDivider = (desiredPct / 100) * (width || 0);
      const desiredHandleLeft = desiredDivider - HANDLE_SIZE_PX / 2;
      handleX.set(Math.max(0, desiredHandleLeft));
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(node);

    return () => ro.disconnect();
  }, [handleX, widthMv]);

  return (
    <motion.div
      layoutId={layoutId}
      ref={containerRef}
      className={
        "relative aspect-488/268 w-full overflow-hidden rounded-medium sm:rounded-huge border border-white/5 shadow-2xl bg-[#030508]" +
        (className ? ` ${className}` : "")
      }
      aria-label="CAD comparison slider"
      onClick={onRequestOpen}
      role={onRequestOpen ? "button" : undefined}
      tabIndex={onRequestOpen ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onRequestOpen) return;
        if (e.key === "Enter" || e.key === " ") onRequestOpen();
      }}
    >
      
      {/* Visual Corner Calibration Marks */}
      <div className="absolute top-3 left-3 z-10 font-mono text-[9px] text-white/50 bg-black/60 backdrop-blur-xs border border-white/5 px-2 py-0.5 rounded-sm select-none uppercase tracking-wider">
        [ Before // Original ]
      </div>
      <div className="absolute top-3 right-3 z-10 font-mono text-[9px] text-cyan-400 bg-black/60 backdrop-blur-xs border border-cyan-500/10 px-2 py-0.5 rounded-sm select-none uppercase tracking-wider">
        [ After // Render ]
      </div>

      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        sizes="(max-width: 640px) 100vw, 580px"
        className="pointer-events-none select-none grayscale opacity-80"
        style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        priority
      />

      <motion.div
        className="absolute inset-0"
        style={{ clipPath }}
        aria-hidden="true"
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 640px) 100vw, 580px"
          className="pointer-events-none select-none"
          style={{ objectFit: "cover", objectPosition: "50% 50%" }}
          priority
        />
      </motion.div>

      {/* Neon Cyan laser glowing divider line */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] transform-gpu"
        style={{ x: dividerX }}
        aria-hidden="true"
      />

      <div ref={dragBoundsRef} className="absolute inset-0">
        <motion.div
          drag={containerWidth > 0 ? "x" : false}
          dragConstraints={dragBoundsRef}
          dragElastic={0}
          dragMomentum={false}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="absolute left-0 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/80 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-grab active:cursor-grabbing hover:border-cyan-400/40 transition-all duration-300"
          style={{ x: handleX }}
          aria-label="Drag to compare"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={
            containerWidth > 0
              ? Math.round(
                  ((handleX.get() + HANDLE_SIZE_PX / 2) / containerWidth) * 100,
                )
              : 50
          }
          onDragEnd={() => {
            const width = containerRef.current?.getBoundingClientRect().width ?? 0;
            if (!width) return;
            const pct = ((handleX.get() + HANDLE_SIZE_PX / 2) / width) * 100;
            onSliderPctChange(Math.max(0, Math.min(100, pct)));
          }}
          onClick={(e) => {
            // Prevent handle clicks from triggering the popover open.
            e.stopPropagation();
          }}
        >
          {/* Double chevrons icons pointing left/right */}
          <svg 
            className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 select-none pointer-events-none" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="8 17 3 12 8 7" />
            <polyline points="16 17 21 12 16 7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function CADComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: CADComparisonSliderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sliderPct, setSliderPct] = useState(50);
  const layoutId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <CADComparisonSliderBase
        beforeSrc={beforeSrc}
        afterSrc={afterSrc}
        beforeAlt={beforeAlt}
        afterAlt={afterAlt}
        layoutId={layoutId}
        sliderPct={sliderPct}
        onSliderPctChange={setSliderPct}
        onRequestOpen={() => setIsOpen(true)}
        className="cursor-zoom-in"
      />

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <CloseButton
              className="fixed top-[20px] right-[20px] z-[60]"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            />
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-lg"
              aria-hidden="true"
            />

            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <CADComparisonSliderBase
                beforeSrc={beforeSrc}
                afterSrc={afterSrc}
                beforeAlt={beforeAlt}
                afterAlt={afterAlt}
                layoutId={layoutId}
                sliderPct={sliderPct}
                onSliderPctChange={setSliderPct}
                className="cursor-zoom-out"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
