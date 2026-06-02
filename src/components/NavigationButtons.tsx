"use client";

import React from "react";
import Link from "next/link";

type NavigationButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  accent?: "cyan" | "purple";
};

export function PrevButton({
  onClick,
  href,
  className = "",
  ariaLabel = "Previous",
  disabled,
  accent = "cyan",
}: NavigationButtonProps) {
  const accentColor = accent === "cyan" ? "rgba(0,240,255,0.2)" : "rgba(168,85,247,0.2)";
  const accentHoverColor = accent === "cyan" ? "#00f0ff" : "#a855f7";
  const accentGlow = accent === "cyan" ? "rgba(0,240,255,0.25)" : "rgba(168,85,247,0.25)";

  const baseClasses = `
    group relative flex size-[32px] sm:size-[40px] items-center justify-center 
    rounded-[2px] border bg-transparent transition-all duration-300 
    active:scale-[0.95] disabled:opacity-40 disabled:pointer-events-none
    ${className}
  `.trim();

  const iconElement = (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className="size-[16px] sm:size-[20px] text-white group-hover:text-cyan-400 transition-colors duration-300"
    >
      <path 
        d="M15 19L8 12L15 5" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );

  const styleProps = {
    borderColor: accentColor,
    boxShadow: `0 0 6px ${accentGlow}`,
  };

  const hoverStyleProps = {
    borderColor: accentHoverColor,
    boxShadow: `0 0 15px ${accentGlow}`,
    backgroundColor: `${accentHoverColor}0D`, // 5% opacity background on hover
  };

  // Ssince dynamic hover styles are best handled in React inline states for Framer-like precision
  const [isBtnHovered, setIsBtnHovered] = React.useState(false);

  const mergedStyle = isBtnHovered && !disabled ? { ...styleProps, ...hoverStyleProps } : styleProps;

  if (href) {
    return (
      <Link 
        href={href} 
        className={baseClasses} 
        aria-label={ariaLabel} 
        onClick={onClick}
        onMouseEnter={() => setIsBtnHovered(true)}
        onMouseLeave={() => setIsBtnHovered(false)}
        style={mergedStyle}
      >
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
      onMouseEnter={() => setIsBtnHovered(true)}
      onMouseLeave={() => setIsBtnHovered(false)}
      style={mergedStyle}
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
  accent = "cyan",
}: NavigationButtonProps) {
  const accentColor = accent === "cyan" ? "rgba(0,240,255,0.2)" : "rgba(168,85,247,0.2)";
  const accentHoverColor = accent === "cyan" ? "#00f0ff" : "#a855f7";
  const accentGlow = accent === "cyan" ? "rgba(0,240,255,0.25)" : "rgba(168,85,247,0.25)";

  const baseClasses = `
    group relative flex size-[32px] sm:size-[40px] items-center justify-center 
    rounded-[2px] border bg-transparent transition-all duration-300 
    active:scale-[0.95] disabled:opacity-40 disabled:pointer-events-none
    ${className}
  `.trim();

  const iconElement = (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className="size-[16px] sm:size-[20px] text-white group-hover:text-cyan-400 transition-colors duration-300"
    >
      <path 
        d="M9 5L16 12L9 19" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );

  const styleProps = {
    borderColor: accentColor,
    boxShadow: `0 0 6px ${accentGlow}`,
  };

  const hoverStyleProps = {
    borderColor: accentHoverColor,
    boxShadow: `0 0 15px ${accentGlow}`,
    backgroundColor: `${accentHoverColor}0D`,
  };

  const [isBtnHovered, setIsBtnHovered] = React.useState(false);

  const mergedStyle = isBtnHovered && !disabled ? { ...styleProps, ...hoverStyleProps } : styleProps;

  if (href) {
    return (
      <Link 
        href={href} 
        className={baseClasses} 
        aria-label={ariaLabel} 
        onClick={onClick}
        onMouseEnter={() => setIsBtnHovered(true)}
        onMouseLeave={() => setIsBtnHovered(false)}
        style={mergedStyle}
      >
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
      onMouseEnter={() => setIsBtnHovered(true)}
      onMouseLeave={() => setIsBtnHovered(false)}
      style={mergedStyle}
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
  accent = "cyan",
}: NavigationButtonProps) {
  const accentColor = accent === "cyan" ? "rgba(0,240,255,0.2)" : "rgba(168,85,247,0.2)";
  const accentHoverColor = accent === "cyan" ? "#00f0ff" : "#a855f7";
  const accentGlow = accent === "cyan" ? "rgba(0,240,255,0.25)" : "rgba(168,85,247,0.25)";

  const baseClasses = `
    group relative flex size-[32px] sm:size-[40px] items-center justify-center 
    rounded-[2px] border bg-transparent transition-all duration-300 
    active:scale-[0.95] disabled:opacity-40 disabled:pointer-events-none
    ${className}
  `.trim();

  const iconElement = (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      className="size-[16px] sm:size-[20px] text-white group-hover:text-cyan-400 transition-colors duration-300"
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

  const styleProps = {
    borderColor: accentColor,
    boxShadow: `0 0 6px ${accentGlow}`,
  };

  const hoverStyleProps = {
    borderColor: accentHoverColor,
    boxShadow: `0 0 15px ${accentGlow}`,
    backgroundColor: `${accentHoverColor}0D`,
  };

  const [isBtnHovered, setIsBtnHovered] = React.useState(false);

  const mergedStyle = isBtnHovered && !disabled ? { ...styleProps, ...hoverStyleProps } : styleProps;

  if (href) {
    return (
      <Link 
        href={href} 
        className={baseClasses} 
        aria-label={ariaLabel} 
        onClick={onClick}
        onMouseEnter={() => setIsBtnHovered(true)}
        onMouseLeave={() => setIsBtnHovered(false)}
        style={mergedStyle}
      >
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
      onMouseEnter={() => setIsBtnHovered(true)}
      onMouseLeave={() => setIsBtnHovered(false)}
      style={mergedStyle}
    >
      {iconElement}
    </button>
  );
}
