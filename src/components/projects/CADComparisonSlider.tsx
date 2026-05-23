"use client";

import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type CADComparisonSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

const HANDLE_SIZE_PX = 28;

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
        "relative aspect-488/268 w-full overflow-hidden rounded-huge" +
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
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        className="pointer-events-none select-none"
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
          className="pointer-events-none select-none"
          style={{ objectFit: "cover", objectPosition: "50% 50%" }}
          priority
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-px bg-linear-to-b from-[rgba(255,255,255,0.75)] via-[rgba(0,0,0,0.35)] to-[rgba(255,255,255,0.75)] transform-gpu"
        style={{ x: dividerX }}
        aria-hidden="true"
      />

      <div ref={dragBoundsRef} className="absolute inset-0">
        <motion.div
          drag={containerWidth > 0 ? "x" : false}
          dragConstraints={dragBoundsRef}
          dragElastic={0}
          dragMomentum={false}
          className="absolute left-0 top-1/2 z-20 flex size-7 -translate-y-1/2 items-center justify-center rounded-4xl border border-border-frame bg-linear-to-b from-[rgba(255,255,255,0.25)] via-[rgba(0,0,0,0.28)] to-[rgba(255,255,255,0.12)] backdrop-blur-md shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.25)] cursor-grab active:cursor-grabbing"
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
          <div className="h-3 w-px bg-linear-to-b from-[rgba(255,255,255,0.85)] via-[rgba(0,0,0,0.35)] to-[rgba(255,255,255,0.85)]" />
          <div className="mx-0.75 h-3 w-px bg-linear-to-b from-[rgba(255,255,255,0.85)] via-[rgba(0,0,0,0.35)] to-[rgba(255,255,255,0.85)]" />
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
            <motion.div
              className="absolute inset-0 bg-black/55 backdrop-blur-lg"
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
