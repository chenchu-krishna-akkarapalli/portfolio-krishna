"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import aboutData from "@/data/about.json";
import Image from "next/image";

type AboutData = typeof aboutData;

type BodyNode =
  | { type: "p"; text: string }
  | { type: "p"; segments: Array<{ text: string; bold?: boolean }> }
  | { type: "list"; title?: string; items: string[] };

export default function AboutContent() {
  const data: AboutData = aboutData;

  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col gap-[36px] sm:gap-[64px] pb-[80px] pt-4 select-none">
      
      {/* Header section with telemetry detail layout */}
      <motion.section 
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full flex-col gap-[14px] border-b border-white/5 pb-6"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gray-500 uppercase font-semibold">
            Identity & Logs
          </span>
          <h1 className="text-[26px] sm:text-[36px] font-bold leading-normal text-white">
            {data.hero.heading}
          </h1>
        </div>

        {/* Current Org Telemetry Badge */}
        <div className="flex items-center gap-[8px] bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 w-fit font-mono text-xs text-gray-300">
          <span>{data.hero.currentAt.label}:</span>
          <Image
            alt=""
            aria-hidden
            src={data.hero.currentAt.logoSrc}
            width={16}
            height={16}
            className="size-[14px] rounded-[3px] border border-white/10 object-cover bg-white"
          />
          <span className="font-semibold text-white">{data.hero.currentAt.org}</span>
        </div>
      </motion.section>

      {/* Glassmorphic Collage Bento Grid */}
      <section className="flex w-full flex-col gap-[12px] sm:gap-[15px]">
        {/* Main large collage card */}
        <div className="group relative aspect-[577/306] w-full overflow-hidden rounded-[16px] sm:rounded-medium border bg-[#05070a]/40 transform-gpu will-change-transform cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <motion.div
            initial={{ filter: "grayscale(100%)", opacity: 0.8 }}
            whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
            whileHover={{ filter: "grayscale(0%)", opacity: 1 }}
            viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="size-full"
          >
            <Image
              alt=""
              src={data.collage.heroImage.src}
              width={data.collage.heroImage.width}
              height={data.collage.heroImage.height}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              priority
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Glassmorphic HUD telemetry badge */}
          <div className="absolute bottom-[14px] right-[14px] sm:bottom-[18px] sm:right-[18px] z-10 transition-all duration-300 group-hover:scale-103">
            <div className="backdrop-blur-md bg-black/60 border border-white/5 group-hover:border-white/15 rounded-medium px-4 py-2 sm:px-4.5 sm:py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <p className="text-[12px] sm:text-[13px] font-mono tracking-wider font-semibold text-gray-200 group-hover:text-white uppercase transition-colors duration-300">
                {data.collage.heroImage.badgeText}
              </p>
            </div>
          </div>
        </div>

        {/* Small thumbnail cards row */}
        <div className="flex w-full items-center gap-[12px] sm:gap-[15px]">
          {data.collage.thumbnails.map((thumb) => (
            <div
              key={thumb.src}
              className="group relative aspect-[182/187] flex-1 overflow-hidden rounded-[16px] sm:rounded-medium border bg-[#05070a]/40 transform-gpu will-change-transform cursor-pointer"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              <motion.div
                initial={{ filter: "grayscale(100%)", opacity: 0.8 }}
                whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                whileHover={{ filter: "grayscale(0%)", opacity: 1 }}
                viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 size-full"
              >
                <Image
                  alt=""
                  src={thumb.src}
                  width={thumb.width}
                  height={thumb.height}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Historical Timeline Guideline Intro Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[12px]">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 uppercase">
              Introduction
            </span>
            <h2 className="text-[20px] sm:text-[22px] font-bold leading-[normal] text-white">
              {data.journeyIntro.title}
            </h2>
          </div>
          <p className="text-[13px] sm:text-[14px] font-medium leading-[1.6] text-text-secondary">
            {data.journeyIntro.description}
          </p>
        </section>
      </ScrollReveal>

      {/* The Unified Historical Journey Timeline Blocks */}
      <div className="relative flex flex-col gap-10">
        
        {/* The Neon Vertical Timeline Guideline */}
        <div className="absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-px bg-white/10 pointer-events-none z-0" />

        {data.journeyBlocks.map((block) => (
          <ScrollReveal key={`${block.title}:${block.subtitle}`}>
            <div className="pl-[32px] sm:pl-[44px] relative z-10">
              
              {/* Pulsing visual milestone node dot */}
              <div className="absolute left-[8px] sm:left-[12px] top-[6px] flex h-[7px] w-[7px] items-center justify-center z-20 select-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 border border-black/80"></span>
              </div>

              <JourneyBlock
                title={block.title}
                subtitle={block.subtitle}
                leftImageFile={block.leftImageFile}
                rightImageFile={block.rightImageFile}
                body={block.body as BodyNode[]}
              />
            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}

function JourneyBlock({
  title,
  subtitle,
  leftImageFile,
  rightImageFile,
  body,
}: {
  title: string;
  subtitle: string;
  leftImageFile: string;
  rightImageFile: string;
  body: BodyNode[];
}) {
  return (
    <section className="flex w-full flex-col gap-[14px] select-none">
      <div className="flex w-full flex-col gap-0.5">
        <h3 className="text-[14.5px] sm:text-[15.5px] font-bold leading-normal text-white">{title}</h3>
        <p className="text-[11.5px] sm:text-[12.5px] font-mono leading-normal text-text-secondary">
          {subtitle}
        </p>
      </div>

      {/* Visual images carousel bento block */}
      <div className="flex w-full items-center gap-[10px]">
        {[leftImageFile, rightImageFile].map((file, index) => (
          <div 
            key={index} 
            className="group relative aspect-[283/196] flex-1 overflow-hidden rounded-[16px] sm:rounded-medium border bg-[#05070a]/40 transform-gpu will-change-transform cursor-pointer"
            style={{ borderColor: "rgba(255,255,255,0.04)" }}
          >
            <motion.div
              initial={{ filter: "grayscale(100%)", opacity: 0.85 }}
              whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
              whileHover={{ filter: "grayscale(0%)", opacity: 1 }}
              viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="size-full"
            >
              <Image
                alt=""
                src={file.startsWith("/") ? file : `/assets/figma/${file}`}
                width={283}
                height={196}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
          </div>
        ))}
      </div>

      {/* Document blockquote details */}
      <div className="flex w-full flex-col gap-[10px] text-[13px] sm:text-[13.5px] font-medium leading-[1.65] text-text-secondary mt-1">
        {body.map((node, idx) => (
          <BodyNodeView key={idx} node={node} />
        ))}
      </div>
    </section>
  );
}

function BodyNodeView({ node }: { node: BodyNode }) {
  if (node.type === "p") {
    if ("segments" in node) {
      return (
        <p>
          {node.segments.map((seg, idx) =>
            seg.bold ? (
              <strong key={idx} className="font-bold text-white">
                {seg.text}
              </strong>
            ) : (
              <span key={idx}>{seg.text}</span>
            ),
          )}
        </p>
      );
    }

    return <p>{node.text}</p>;
  }

  return (
    <div className="relative border-l border-white/5 pl-4 py-1.5 flex flex-col gap-2 mt-2 bg-white/[0.01] rounded-r-lg">
      {node.title ? (
        <p className="font-bold text-white uppercase tracking-wider text-[10px] font-mono select-none">{node.title.replace("# ", "")}</p>
      ) : null}
      <ul className="list-disc pl-[16px] text-text-secondary flex flex-col gap-1.5">
        {node.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
