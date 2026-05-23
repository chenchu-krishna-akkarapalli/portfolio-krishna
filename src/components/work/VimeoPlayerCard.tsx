"use client";

import Player from "@vimeo/player";
import { useEffect, useId, useRef } from "react";

type VimeoPlayerCardProps = {
  vimeoId: number;
  title: string;
};

export default function VimeoPlayerCard({ vimeoId, title }: VimeoPlayerCardProps) {
  const wrapperId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const player = new Player(containerRef.current, {
      id: vimeoId,
      responsive: true,
      autoplay: false,
      autopause: true,
      controls: true,
      title: false,
      byline: false,
      portrait: false,
    });

    return () => {
      void player.destroy();
    };
  }, [vimeoId]);

  return (
    <section aria-label={title} className="flex flex-col gap-[12px]">
      <p className="text-[16px] font-bold leading-[normal] text-white">{title}</p>

      <div className="relative h-[330px] w-full overflow-hidden rounded-huge border border-border-strong bg-bg-primary">
        <div
          id={wrapperId}
          ref={containerRef}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </section>
  );
}
