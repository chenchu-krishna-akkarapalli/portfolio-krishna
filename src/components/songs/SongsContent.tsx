"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type SongCard = {
  href: string;
  coverSrc: string;
};

const cards: SongCard[] = [
  { href: "#", coverSrc: "/assets/songs/album/playlist-1.svg" },
  { href: "#", coverSrc: "/assets/songs/album/playlist-2.svg" },
  { href: "#", coverSrc: "/assets/songs/album/playlist-3.svg" },
  { href: "#", coverSrc: "/assets/songs/album/playlist-4.svg" },
  { href: "#", coverSrc: "/assets/songs/album/playlist-5.svg" },
  { href: "#", coverSrc: "/assets/songs/album/playlist-6.svg" },
  { href: "#", coverSrc: "/assets/songs/album/playlist-7.svg" },
];

export default function SongsContent() {
  return (
    <div className="mx-auto flex w-full max-w-[586px] flex-col pb-[100px] pt-[10px]">
      <section className="relative flex min-h-[130px] w-full flex-col items-start justify-center text-left">
        <h1 className="text-[24px] font-bold leading-[normal] text-white">
          Songs and Playlists that I listen to.
        </h1>
        <p className="mt-3 text-[14px] font-medium leading-5.5 text-text-secondary">
          Discover the soundtrack and playlists to my design genius that I listen depending on my
          different moods, It's like a therapy for me!
        </p>
      </section>

      <section className="relative mt-[24px] sm:mt-[40px] w-full">
        <div className="grid w-full grid-cols-2 gap-[24px] sm:gap-[64px]">
          {cards.map((card) => (
            <MediaDiscCard key={card.coverSrc} href={card.href} coverSrc={card.coverSrc} />
          ))}
          <SuggestSongCard href="https://www.instagram.com/phoenix_akkarapalli?igsh=MTdjM3psbXZzcHR2eg==" />
        </div>
      </section>
    </div>
  );
}

function SuggestSongCard({ href }: { href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="relative block aspect-square w-full select-none"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <motion.div
        className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-huge border border-dashed border-border-card bg-bg-primary/40 text-white transform-gpu"
        style={{ willChange: "transform, box-shadow" }}
        whileHover={{
          boxShadow:
            "rgba(0, 0, 0, 0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.06) 0px 10px 10px -3.75px",
        }}
      >
        <span aria-hidden className="text-[44px] font-light leading-none">
          +
        </span>
        <span className="text-[16px] font-semibold leading-[normal]">Suggest a song</span>
      </motion.div>
    </motion.a>
  );
}

function MediaDiscCard({ href, coverSrc }: { href: string; coverSrc: string }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rawDiscRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const discRotate = useSpring(rawDiscRotate, { stiffness: 120, damping: 25, mass: 0.8 });

  const rawZIndex = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 0]);

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      onClick={(event) => {
        if (href === "#") event.preventDefault();
      }}
      className="relative block aspect-square w-full select-none"
      style={{ zIndex: rawZIndex }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="relative h-full w-full overflow-visible">
        {/* Disc (behind) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-44px] top-1/2 h-[150px] w-[150px] -translate-y-1/2 transform-gpu"
          style={{ rotate: discRotate, willChange: "transform" }}
          whileHover={{ x: 8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <Image
            alt=""
            aria-hidden
            src="/assets/songs/disc/disc.svg"
            width={150}
            height={150}
            className="h-full w-full"
            priority={false}
          />
        </motion.div>

        {/* Cover (front) */}
        <motion.div
          className="relative z-10 h-full w-full overflow-hidden rounded-huge border border-border-strong bg-bg-primary transform-gpu"
          style={{ willChange: "transform, box-shadow" }}
          whileHover={{
            boxShadow:
              "rgba(0, 0, 0, 0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.06) 0px 10px 10px -3.75px",
          }}
        >
          <Image
            alt=""
            src={coverSrc}
            fill
            sizes="(max-width: 640px) 240px, 260px"
            className="object-cover"
            priority={false}
          />
        </motion.div>
      </div>
    </motion.a>
  );
}
