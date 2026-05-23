"use client";

import Image from "next/image";

type WavingHandLinkProps = {
  href: string;
  ariaLabel?: string;
  className?: string;
};

export default function WavingHandLink({
  href,
  ariaLabel = "Open LinkedIn",
  className,
}: WavingHandLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noreferrer noopener"
      className={
        "fixed bottom-[24px] right-[24px] z-50 flex h-[56px] items-center justify-center gap-[12px] rounded-[16px] border border-[rgba(255,255,255,0.18)] bg-black px-[20px] py-[14px] shadow-[0px_10px_24px_rgba(0,0,0,0.55)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] " +
        (className ?? "")
      }
    >
      <Image
        src="/assets/figma/waving-hand.svg"
        alt=""
        aria-hidden="true"
        width={28}
        height={28}
        unoptimized
        className="animate-hand-micro select-none"
      />

      <span className="text-[18px] font-bold leading-[normal] text-white">Say Hi!</span>
    </a>
  );
}
