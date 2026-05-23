"use client";

import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

type WavingHandCursorAreaProps = {
  children: React.ReactNode;
  className?: string;
};

export default function WavingHandCursorArea({
  children,
  className,
}: WavingHandCursorAreaProps) {
  const [isActive, setIsActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const latestPosRef = useRef({ x: 0, y: 0 });

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current != null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const el = cursorRef.current;
      if (!el) return;

      const { x, y } = latestPosRef.current;
      const offsetX = 10;
      const offsetY = 10;
      el.style.transform = `translate3d(${x + offsetX}px, ${y + offsetY}px, 0)`;
    });
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      latestPosRef.current = { x: e.clientX, y: e.clientY };
      scheduleUpdate();
    },
    [scheduleUpdate],
  );

  const onMouseEnter = useCallback(() => {
    setIsActive(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={(isActive ? "cursor-none " : "") + (className ?? "")}
    >
      {children}

      {isActive ? (
        <div
          ref={cursorRef}
          className="pointer-events-none fixed left-0 top-0 z-60 select-none"
          style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
          aria-hidden="true"
        >
          <Image
            src="/assets/figma/waving-hand.svg"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            unoptimized
            className="h-7 w-7 animate-hand-micro"
            draggable={false}
          />
        </div>
      ) : null}
    </div>
  );
}
