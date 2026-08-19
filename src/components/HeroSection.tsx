"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/utils/useIsMobile";
import HoloButton from "@/components/HoloButton";


// Day-specific styling configurations
const DAY_THEMES: Record<string, { label: string; text: string; glow: string }> = {
  "Monday": { label: "Monday", text: "text-[#3b82f6]", glow: "shadow-[#3b82f6]/20" },
  "Tuesday": { label: "Tuesday", text: "text-[#a855f7]", glow: "shadow-[#a855f7]/20" },
  "Wednesday": { label: "Wednesday", text: "text-[#10b981]", glow: "shadow-[#10b981]/20" },
  "Thursday": { label: "Thursday", text: "text-[#f59e0b]", glow: "shadow-[#f59e0b]/20" },
  "Friday": { label: "Friday", text: "text-[#06b6d4]", glow: "shadow-[#06b6d4]/20" },
  "Saturday": { label: "Saturday", text: "text-[#ec4899]", glow: "shadow-[#ec4899]/20" },
  "Sunday": { label: "Sunday", text: "text-[#ef4444]", glow: "shadow-[#ef4444]/20" }
};

export default function HeroSection() {
  const [day, setDay] = useState("day");
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setDay(days[new Date().getDay()]);
  }, []);

  const activeTheme = DAY_THEMES[day] || { label: "day", text: "text-text-secondary", glow: "shadow-black" };

  return (
    <section id="home" className="flex w-full flex-col gap-[20px] relative select-none">
      
      {/* High-fidelity profile avatar block with double rotating CAD dials */}
      <div 
        className="relative flex items-center justify-center size-[96px] sm:size-[112px] group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Outer clockwise rotating calibration scope */}
        <motion.div
          animate={{ rotate: isHovered ? 360 : 120 }}
          transition={{
            repeat: Infinity,
            duration: isHovered ? 4 : 12,
            ease: "linear"
          }}
          className="absolute inset-0 rounded-full border border-dashed border-white/20 pointer-events-none scale-[1.08] filter drop-shadow-[0_0_4px_rgba(255,255,255,0.1)]"
        />

        {/* Inner counter-clockwise rotating precision ticks */}
        <motion.div
          animate={{ rotate: isHovered ? -360 : -45 }}
          transition={{
            repeat: Infinity,
            duration: isHovered ? 3 : 8,
            ease: "linear"
          }}
          className="absolute inset-0 rounded-full border border-double border-white/10 pointer-events-none scale-[1.04]"
          style={{ borderStyle: "double", borderWidth: "3px" }}
        />

        {/* Profile Image container with soft glowing overlay */}
        <div className="relative size-[80px] sm:size-[96px] overflow-hidden rounded-full border border-white/10 bg-black/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)] z-10 transition-all duration-300 group-hover:border-white/20">
          <motion.div
            initial={{ filter: "grayscale(100%)" }}
            whileInView={isMobile ? { filter: "grayscale(0%)" } : undefined}
            whileHover={!isMobile ? { filter: "grayscale(0%)" } : undefined}
            viewport={isMobile ? { once: false, margin: "-10% 0px" } : undefined}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="size-full"
          >
            <Image
              alt="Krishna Avatar"
              src="/assets/profile/iam3.svg"
              width={96}
              height={96}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Ambient brand color ping on active avatar state */}
        <span className="absolute bottom-1 right-2 flex h-3 w-3 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-black/80"></span>
        </span>
      </div>

      {/* Futuristic monospace telemetry status badge info */}
      <div className="flex items-center gap-2 mt-[4px] z-10 font-mono text-[9px] tracking-[0.25em] text-gray-500 uppercase">
        <span>gps.bangalore</span>
        <span className="text-white/10 select-none">|</span>
        <span>role.fullstack_dev</span>
        <span className="text-white/10 select-none">|</span>
        <span className="text-emerald-500 animate-pulse font-semibold">sys.active</span>
      </div>

      <div className="flex flex-col gap-[4px] z-10">
        <h1 className="text-[22px] sm:text-[28px] font-bold leading-[normal] tracking-[0.3px] text-white">
          Hey, Krishna here!
        </h1>
        <p className="text-[14px] sm:text-[16px] font-semibold leading-[normal] text-text-secondary flex items-center gap-1">
          How's your 
          <span className={`font-bold transition-all duration-300 ${activeTheme.text}`}>
            {day}
          </span>
          ?
        </p>
      </div>

      <p className="w-full max-w-[576px] text-[14px] sm:text-[16px] font-medium leading-[1.6] text-text-secondary z-10">
        Full-Stack Developer with 4+ years of experience building scalable enterprise web applications using React.js, Next.js, Node.js, FastAPI, and microservices architecture. Delivered production systems in Insurance, HRMS, Civil Project Management, and Financial Reconciliation domains. Former UI/UX Designer skilled in Figma design systems and passionate about building secure, high-performance digital products.
      </p>

      {/* Action button featuring dynamic shifting glare shine hover */}
      <div className="mt-[12px] flex z-10">
        <HoloButton 
          label="Contact" 
          href="/contact" 
          accent="cyan" 
        />
      </div>
    </section>
  );
}
