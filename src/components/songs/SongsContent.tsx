"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, Pause, Music, ExternalLink } from "lucide-react";

type SongCard = {
  id: string;
  href: string;
  coverSrc: string;
  title: string;
  vibe: string;
  vibeTag: string;
  colorClass: string;
  glowClass: string;
  accentHex: string;
};

const cards: SongCard[] = [
  {
    id: "playlist-1",
    href: "https://open.spotify.com/playlist/37i9dQZF1DX8UebhpvM87n",
    coverSrc: "/assets/songs/album/playlist-1.svg",
    title: "Late Night Code Secrets",
    vibe: "NIGHTSHIFT VECTOR",
    vibeTag: "Ambient Lo-Fi / Beats",
    colorClass: "text-cyan-400",
    glowClass: "shadow-[0_0_15px_rgba(6,182,212,0.15)] border-cyan-500/20",
    accentHex: "#06b6d4"
  },
  {
    id: "playlist-2",
    href: "https://open.spotify.com/playlist/37i9dQZF1DXdLTE75A00eg",
    coverSrc: "/assets/songs/album/playlist-2.svg",
    title: "Neon Heavy Industry",
    vibe: "HACKER SPACE",
    vibeTag: "Dark Synthwave / EBM",
    colorClass: "text-rose-400",
    glowClass: "shadow-[0_0_15px_rgba(244,63,94,0.15)] border-rose-500/20",
    accentHex: "#f43f5e"
  },
  {
    id: "playlist-3",
    href: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn",
    coverSrc: "/assets/songs/album/playlist-3.svg",
    title: "Higgs Boson Resonance",
    vibe: "QUANTUM CHILL",
    vibeTag: "Atmospheric Ambient",
    colorClass: "text-emerald-400",
    glowClass: "shadow-[0_0_15px_rgba(16,185,129,0.15)] border-emerald-500/20",
    accentHex: "#10b981"
  },
  {
    id: "playlist-4",
    href: "https://open.spotify.com/playlist/37i9dQZF1DX6VfkwQOct6J",
    coverSrc: "/assets/songs/album/playlist-4.svg",
    title: "CAD Drafting Confinement",
    vibe: "DRAFTING BEATS",
    vibeTag: "Chillhop / Jazzhop Rythms",
    colorClass: "text-purple-400",
    glowClass: "shadow-[0_0_15px_rgba(139,92,246,0.15)] border-purple-500/20",
    accentHex: "#8b5cf6"
  },
  {
    id: "playlist-5",
    href: "https://open.spotify.com/playlist/37i9dQZF1DX3u7yHGupgv9",
    coverSrc: "/assets/songs/album/playlist-5.svg",
    title: "High Velocity Synthesis",
    vibe: "WARP SPEED",
    vibeTag: "Liquid Drum & Bass",
    colorClass: "text-yellow-400",
    glowClass: "shadow-[0_0_15px_rgba(234,179,8,0.15)] border-yellow-500/20",
    accentHex: "#eab308"
  },
  {
    id: "playlist-6",
    href: "https://open.spotify.com/playlist/37i9dQZF1DX8tZ2hk0UNVj",
    coverSrc: "/assets/songs/album/playlist-6.svg",
    title: "Echoes of the Grid",
    vibe: "DIGITAL DEBRIS",
    vibeTag: "Minimalist Techno",
    colorClass: "text-blue-400",
    glowClass: "shadow-[0_0_15px_rgba(59,130,246,0.15)] border-blue-500/20",
    accentHex: "#3b82f6"
  },
  {
    id: "playlist-7",
    href: "https://open.spotify.com/playlist/37i9dQZF1DWZjg7i2vT6rr",
    coverSrc: "/assets/songs/album/playlist-7.svg",
    title: "Holographic Musings",
    vibe: "SOLAR CHORD",
    vibeTag: "Chill Ambient Tech",
    colorClass: "text-indigo-400",
    glowClass: "shadow-[0_0_15px_rgba(99,102,241,0.15)] border-indigo-500/20",
    accentHex: "#6366f1"
  },
];

export default function SongsContent() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setActiveCard((current) => (current === id ? null : id));
  };

  return (
    <div className="mx-auto flex w-full max-w-[620px] flex-col pb-[120px] pt-[10px] px-4 md:px-0 overflow-visible">
      {/* Page Header */}
      <section className="relative flex min-h-[130px] w-full flex-col items-start justify-center text-left">
        <h1 className="text-[26px] sm:text-[30px] font-extrabold tracking-tight leading-[normal] text-white flex items-center gap-3">
          <Music className="text-cyan-400 animate-pulse size-7" />
          <span>Songs & Playlists</span>
        </h1>
        <p className="mt-4 text-[13.5px] sm:text-[14.5px] font-medium leading-[1.65] text-text-secondary">
          Discover the custom soundtracks and mood-calibrated playlists loaded into my design cockpit dashboard. Click a cover to spin up the tactical holographic audio engines!
        </p>
      </section>

      {/* Grid of vinyl disc records */}
      <section className="relative mt-[36px] sm:mt-[48px] w-full overflow-visible">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-x-[36px] gap-y-[48px] overflow-visible">
          {cards.map((card) => (
            <MediaDiscCard
              key={card.id}
              card={card}
              isActive={activeCard === card.id}
              onToggle={() => togglePlay(card.id)}
            />
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
      className="relative block aspect-square w-full max-w-[280px] mx-auto md:max-w-none select-none"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      <motion.div
        className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-huge border border-dashed border-cyan-500/20 bg-bg-card/40 text-gray-400 group overflow-hidden transform-gpu"
        whileHover={{
          borderColor: "rgba(6, 182, 212, 0.4)",
          color: "#ffffff",
          boxShadow: "0 0 20px rgba(6,182,212,0.1)",
        }}
      >
        {/* Confinement brackets */}
        <span className="absolute top-3 left-3 w-2 h-2 border-t border-l border-cyan-500/20 group-hover:border-cyan-400/80 transition-colors duration-300" />
        <span className="absolute top-3 right-3 w-2 h-2 border-t border-r border-cyan-500/20 group-hover:border-cyan-400/80 transition-colors duration-300" />
        <span className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-cyan-500/20 group-hover:border-cyan-400/80 transition-colors duration-300" />
        <span className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-cyan-500/20 group-hover:border-cyan-400/80 transition-colors duration-300" />

        <span aria-hidden className="text-[44px] font-extralight leading-none text-cyan-400 group-hover:scale-110 transition-transform duration-300">
          +
        </span>
        <span className="text-[14.5px] font-bold tracking-wider uppercase font-mono group-hover:text-cyan-300 transition-colors duration-300">
          Suggest a Vibe
        </span>
      </motion.div>
    </motion.a>
  );
}

function MediaDiscCard({
  card,
  isActive,
  onToggle,
}: {
  card: SongCard;
  isActive: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col gap-3 overflow-visible">
      {/* Vinyl Disc Container */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative block aspect-square w-full max-w-[280px] mx-auto md:max-w-none select-none cursor-pointer overflow-visible"
        onClick={onToggle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <div className="relative h-full w-full overflow-visible">
          {/* Dynamic Vinyl Disc (Responsive Sized & Styled) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-[7.5%] z-0 aspect-square w-[85%] h-[85%] transform-gpu origin-center"
            animate={
              isActive
                ? { rotate: 360, x: "28%" }
                : isHovered
                ? { rotate: 45, x: "12%" }
                : { rotate: 0, x: "0%" }
            }
            transition={
              isActive
                ? {
                    rotate: { repeat: Infinity, duration: 4, ease: "linear" },
                    x: { type: "spring", stiffness: 180, damping: 20 },
                  }
                : { type: "spring", stiffness: 220, damping: 22 }
            }
          >
            <Image
              alt=""
              aria-hidden
              src="/assets/songs/disc/disc.svg"
              width={260}
              height={260}
              className="h-full w-full select-none"
              priority={false}
            />
          </motion.div>

          {/* Album Cover Art Capsule */}
          <motion.div
            className={`relative z-10 h-full w-full overflow-hidden rounded-huge border bg-bg-card ${card.glowClass} transition-all duration-300 transform-gpu`}
            style={{ willChange: "transform, box-shadow" }}
          >
            <Image
              alt={card.title}
              src={card.coverSrc}
              fill
              sizes="(max-width: 768px) 280px, 300px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              priority={false}
            />

            {/* Premium Interactive Backdrop Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 z-10" />

            {/* Holographic Playback HUD Controller */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-4.5 sm:p-5">
              {/* Vibe Tag Header */}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-[4px] border border-white/5 bg-black/60 font-mono text-[9px] font-bold tracking-widest uppercase ${card.colorClass}`}>
                  {card.vibe}
                </span>

                {/* Animated Streaming Pulse Indicator */}
                {isActive && (
                  <span className="flex size-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: card.accentHex }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: card.accentHex }} />
                  </span>
                )}
              </div>

              {/* Active Audio Visualizer Overlay */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-end justify-center gap-[4px] h-[36px] w-full"
                  >
                    {[1, 2, 3, 4, 5, 6].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-[3px] rounded-full"
                        style={{ backgroundColor: card.accentHex }}
                        animate={{
                          height: [
                            "10px",
                            `${15 + Math.random() * 20}px`,
                            "6px",
                            `${10 + Math.random() * 26}px`,
                            "10px",
                          ],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8 + bar * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* HUD Control Trigger bar */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex size-[36px] items-center justify-center rounded-full border border-white/15 bg-black/75 backdrop-blur-sm text-white group-hover:scale-105 transition-all duration-300">
                  {isActive ? (
                    <Pause size={14} className="fill-white text-white" />
                  ) : (
                    <Play size={14} className="fill-white text-white translate-x-[1px]" />
                  )}
                </div>

                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Stop toggle playing when launching link
                  className="flex size-[30px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Playlist Meta Details Footer */}
      <div className="flex flex-col px-1 select-none">
        <h3 className="text-[14.5px] font-bold text-white leading-normal truncate group-hover:text-cyan-400 transition-colors duration-300">
          {card.title}
        </h3>
        <p className="text-[11.5px] font-mono font-medium text-text-quaternary mt-0.5 tracking-wide">
          {card.vibeTag}
        </p>
      </div>
    </div>
  );
}
