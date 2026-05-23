"use client";

import VimeoPlayerCard from "@/components/work/VimeoPlayerCard";

type ProjectLargeVideoProps = {
  video:
    | {
        type: "vimeo";
        vimeoId: number;
        title: string;
      }
    | {
        type: "mp4";
        src: string;
        title: string;
      };
};

export function ProjectLargeVideo({ video }: ProjectLargeVideoProps) {
  if (video.type === "vimeo") {
    return <VimeoPlayerCard vimeoId={video.vimeoId} title={video.title} />;
  }

  return (
    <section aria-label={video.title} className="flex w-full flex-col gap-3">
      <p className="text-[16px] font-bold leading-[normal] text-white">{video.title}</p>

      <div className="relative w-full overflow-hidden rounded-[30px] border border-[rgba(255,255,255,0.22)] bg-black">
        <video
          className="block h-auto w-full"
          src={video.src}
          autoPlay
          loop
          muted
          controls
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
