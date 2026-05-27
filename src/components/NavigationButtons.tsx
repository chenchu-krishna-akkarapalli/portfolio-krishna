"use client";

import Link from "next/link";
import Image from "next/image";

type NavigationButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

export function PrevButton({
  onClick,
  href,
  className = "",
  ariaLabel = "Previous",
  disabled,
}: NavigationButtonProps) {
  const baseClasses = `
    relative flex size-[32px] sm:size-[40px] items-center justify-center 
    rounded-full border border-border-interactive bg-bg-interactive 
    cursor-pointer transition-all duration-200 
    hover:bg-bg-nav-hover hover:border-border-card-hover
    active:scale-[0.95] disabled:opacity-40 disabled:pointer-events-none
    ${className}
  `.trim();

  const iconElement = (
    <Image
      alt=""
      aria-hidden="true"
      src="/assets/figma/cefc0d5c2688499044589a9e2f084f3a84a06235.svg"
      width={20}
      height={20}
      unoptimized
      className="size-[16px] sm:size-[20px]"
    />
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel} onClick={onClick}>
        {iconElement}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {iconElement}
    </button>
  );
}

export function NextButton({
  onClick,
  href,
  className = "",
  ariaLabel = "Next",
  disabled,
}: NavigationButtonProps) {
  const baseClasses = `
    relative flex size-[32px] sm:size-[40px] items-center justify-center 
    rounded-full border border-border-interactive bg-bg-interactive 
    cursor-pointer transition-all duration-200 
    hover:bg-bg-nav-hover hover:border-border-card-hover
    active:scale-[0.95] disabled:opacity-40 disabled:pointer-events-none
    ${className}
  `.trim();

  const iconElement = (
    <Image
      alt=""
      aria-hidden="true"
      src="/assets/figma/fe7ccdd71f1c78f173f57f60945af20127f6d5ed.svg"
      width={20}
      height={20}
      unoptimized
      className="size-[16px] sm:size-[20px]"
    />
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel} onClick={onClick}>
        {iconElement}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {iconElement}
    </button>
  );
}

export function CloseButton({
  onClick,
  href,
  className = "",
  ariaLabel = "Close",
  disabled,
}: NavigationButtonProps) {
  const baseClasses = `
    relative flex size-[32px] sm:size-[40px] items-center justify-center 
    rounded-full border border-border-interactive bg-bg-interactive 
    cursor-pointer transition-all duration-200 
    hover:bg-bg-nav-hover hover:border-border-card-hover
    active:scale-[0.95] disabled:opacity-40 disabled:pointer-events-none
    ${className}
  `.trim();

  const iconElement = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="size-[16px] sm:size-[20px] text-white"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel} onClick={onClick}>
        {iconElement}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {iconElement}
    </button>
  );
}
