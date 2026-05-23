"use client";

import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
  offsetY?: number;
};

export default function ScrollReveal({
  children,
  className,
  transition,
  offsetY = 14,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const SCROLL_UNLOCK_PX = 64;

  const isInView = useInView(containerRef, {
    margin: "0px 0px -10% 0px",
    amount: 0.15,
    once: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScrollUnlock = () => {
      if (window.scrollY < SCROLL_UNLOCK_PX) return;
      setHasUserScrolled(true);
      window.removeEventListener("scroll", onScrollUnlock);
      window.removeEventListener("wheel", onScrollUnlock);
      window.removeEventListener("touchmove", onScrollUnlock);
    };

    window.addEventListener("scroll", onScrollUnlock, { passive: true });
    window.addEventListener("wheel", onScrollUnlock, { passive: true });
    window.addEventListener("touchmove", onScrollUnlock, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollUnlock);
      window.removeEventListener("wheel", onScrollUnlock);
      window.removeEventListener("touchmove", onScrollUnlock);
    };
  }, []);

  const shouldShow = prefersReducedMotion || (hasUserScrolled && isInView);

  const resolvedTransition: Transition =
    transition ??
    ({
      type: "tween",
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    } satisfies Transition);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: offsetY }}
      animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: offsetY }}
      transition={resolvedTransition}
      className={"transform-gpu will-change-transform" + (className ? " " + className : "")}
    >
      {children}
    </motion.div>
  );
}
