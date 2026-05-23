"use client";

import BottomFadeBlurOverlay from "@/components/BottomFadeBlurOverlay";
import Footer from "./Footer";
import { SidebarNav } from "@/components/SidebarNav";
import WavingHandLink from "@/components/WavingHandLink";
import Image from "next/image";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#";

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-black">
      {/* Mobile Top Navbar */}
      <header className="fixed top-[16px] left-[16px] right-[16px] z-50 flex h-[56px] w-[calc(100%-32px)] items-center justify-between rounded-full border border-border-light bg-bg-secondary/70 backdrop-blur-md px-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] lg:hidden">
        {/* Left side Logo */}
        <div className="flex size-[36px] items-center justify-center rounded-full border border-border-light bg-[#0a0a0a] text-[16px] font-extrabold text-white shadow-md select-none">
          N
        </div>

        {/* Right side Say Hi! Contact Button */}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-[36px] items-center justify-center gap-[8px] rounded-full border border-border-card bg-bg-primary px-[14px] text-[13px] font-bold text-white shadow-sm transition-transform duration-200 active:scale-[0.97]"
        >
          <Image
            src="/assets/figma/waving-hand.svg"
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            unoptimized
            className="animate-hand-micro select-none"
          />
          <span>Say Hi!</span>
        </a>
      </header>

      <main className="relative w-full max-w-full px-[20px] pt-[88px] pb-[100px] lg:pl-[130px] lg:pr-[204px] lg:pb-[64px] lg:pt-[100px]">
        <WavingHandLink href={LINKEDIN_URL} ariaLabel="Open LinkedIn profile" className="hidden lg:flex" />
        <BottomFadeBlurOverlay />

        <div className="fixed bottom-[20px] left-1/2 z-40 -translate-x-1/2 lg:fixed lg:bottom-auto lg:left-[50px] lg:top-[45%] lg:-translate-y-1/2 lg:translate-x-0 lg:z-10">
          <SidebarNav />
        </div>

        {children}

        <Footer />
      </main>
    </div>
  );
}

