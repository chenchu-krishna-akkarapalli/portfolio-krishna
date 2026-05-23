"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type PlaygroundContentProps = {
  gameImages: readonly string[];
};

export default function PlaygroundContent({ gameImages }: PlaygroundContentProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLElement | null>(null);
  const badgeAnchorRef = useRef<HTMLDivElement | null>(null);

  const leftColumnImages = gameImages.filter((_, index) => index % 2 === 0);
  const rightColumnImages = gameImages.filter((_, index) => index % 2 === 1);

  const [badgeLayout, setBadgeLayout] = useState<{
    ready: boolean;
    top: number;
    left: number;
  }>({
    ready: false,
    top: 0,
    left: 0,
  });

  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "start start"],
  });

  useLayoutEffect(() => {
    function measure() {
      const badgeAnchorEl = badgeAnchorRef.current;
      if (!badgeAnchorEl) return;

      const anchorRect = badgeAnchorEl.getBoundingClientRect();

      setBadgeLayout({
        ready: true,
        top: anchorRect.top,
        left: anchorRect.left,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const badgeScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.7]), {
    stiffness: 260,
    damping: 30,
    mass: 0.9,
  });

  return (
    <div className="mx-auto w-full max-w-145 pb-15 pt-8.75">
      <motion.div
        className="pointer-events-none fixed z-30"
        style={{
          top: badgeLayout.top,
          left: badgeLayout.left,
          scale: badgeScale,
          opacity: badgeLayout.ready ? 1 : 0,
        }}
      >
        <PlaygroundBadge />
      </motion.div>

      <section
        ref={heroRef}
        className="relative flex min-h-130 w-full flex-col items-center justify-center text-center"
      >
        <div
          ref={badgeAnchorRef}
          className="mb-7 flex justify-center"
          style={{ opacity: badgeLayout.ready ? 0 : 1 }}
        >
          <PlaygroundBadge />
        </div>

        <p className="max-w-115 text-[14px] font-medium leading-5.5 text-text-secondary">
          Apart from the regular work, I spend my time learning new stuffs, playing games, or creating
          music. Explore my entire collection and lifestyle.
        </p>

        <p className="mt-9.5 text-[14px] font-semibold leading-[normal] text-text-secondary">
          Scroll Down
        </p>
      </section>

      <section ref={carouselRef} className="relative w-full pt-11.5">
        <div className="grid grid-cols-2 gap-5">
          <StaticTileColumn images={leftColumnImages} />
          <StaticTileColumn images={rightColumnImages} />
        </div>
      </section>
    </div>
  );
}

function PlaygroundBadge() {
  return (
    <div
      className="px-5.5 py-3"
      style={{
        backdropFilter: "blur(30px)",
        backgroundColor: "var(--bg-nav-active)",
        borderRadius: "var(--radius-medium)",
        boxShadow:
          "rgba(0, 0, 0, 0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.06) 0px 10px 10px -3.75px",
      }}
    >
      <p className="text-[20px] font-bold leading-[normal] text-white">My Playground</p>
    </div>
  );
}

function StaticTileColumn({ images }: { images: readonly string[] }) {
  return (
    <div aria-hidden="true" className="grid gap-5">
      {images.map((src) => (
        <div
          key={src}
          className="relative aspect-4/3 w-full overflow-hidden rounded-huge border border-border-light bg-bg-primary"
        >
          <Image
            alt=""
            aria-hidden
            src={src}
            fill
            sizes="(max-width: 640px) 100vw, 280px"
            className="object-cover"
            priority={false}
          />
        </div>
      ))}
    </div>
  );
}
