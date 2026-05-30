"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import workData from "@/data/work.json";
import VimeoPlayerCard from "@/components/work/VimeoPlayerCard";
import LocalVideoCard from "@/components/work/LocalVideoCard";
import WorkBentoGrid, { BentoItem } from "@/components/work/WorkBentoGrid";

type WorkData = typeof workData;

export default function WorkContent() {
  const data: WorkData = workData;

  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col gap-[36px] sm:gap-[48px] pb-[80px] pt-4 select-none">
      
      {/* Header section with telemetry detail layout */}
      <motion.section 
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full flex-col gap-[14px] border-b border-white/5 pb-6"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gray-500 uppercase font-semibold">
            Operational Feed
          </span>
          <h1 className="text-[26px] sm:text-[36px] font-bold leading-normal text-white">
            {data.title}
          </h1>
        </div>
        <p className="w-full text-[13px] sm:text-[14px] font-medium leading-[1.6] text-text-secondary whitespace-pre-line">
          {data.description}
        </p>
      </motion.section>

      {/* Video Showcase Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]" aria-label={data.videosTitle}>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 uppercase">
              Demonstrations
            </span>
            <p className="text-[20px] sm:text-[22px] font-bold leading-[normal] text-white">
              {data.videosTitle}
            </p>
          </div>
          
          <div className="flex flex-col gap-[20px] mt-1">
            {data.videos.map((video: any) => {
              if ("vimeoId" in video) {
                return (
                  <VimeoPlayerCard
                    key={`vimeo:${video.vimeoId}`}
                    vimeoId={video.vimeoId}
                    title={video.title}
                  />
                );
              }

              return (
                <LocalVideoCard
                  key={`file:${video.src}`}
                  src={video.src}
                  title={video.title}
                />
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Bento Image Gallery Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]" aria-label={data.galleryTitle}>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 uppercase">
              Render catalog
            </span>
            <p className="text-[20px] sm:text-[22px] font-bold leading-[normal] text-white">
              {data.galleryTitle}
            </p>
          </div>

          <div className="mt-1">
            <WorkBentoGrid items={data.bento as BentoItem[]} />
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
