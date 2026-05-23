"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const socialButtonVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    borderColor: "var(--border-social)",
    backgroundColor: "var(--bg-primary)",
  },
  hover: {
    y: -6,
    scale: 1.04,
    borderColor: "var(--border-social-hover)",
    backgroundColor: "var(--bg-nav-hover)",
  },
};

export default function Footer() {
  const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#";
  const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "#";
  const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#";
  const PINTEREST_URL = process.env.NEXT_PUBLIC_PINTEREST_URL ?? "#";

  return (
    <footer className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-3.5 pb-35 pt-5 px-[20px] sm:px-0">
      <div className="flex h-11 w-full items-center justify-between" aria-label="Social links">
        <Image
          alt=""
          aria-hidden="true"
          src="/assets/figma/af34c0eeefce53ef5ec83ee8a473bd6aaaca1726.svg"
          width={103}
          height={1}
          unoptimized
          className="hidden sm:block h-px w-25.75"
        />

        <div className="flex h-11 w-full max-w-[280px] sm:max-w-[336px] items-center justify-between sm:justify-center gap-[8px] sm:gap-[16px]">
          <motion.a
            href={INSTAGRAM_URL}
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer noopener"
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={socialButtonVariants}
            transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
            className="relative h-11 w-16 sm:w-18 overflow-hidden rounded-medium border bg-bg-primary transform-gpu will-change-transform shrink-0"
          >
            <div className="flex h-full w-full items-center justify-center">
              <Image
                alt=""
                aria-hidden="true"
                src="/assets/social/instagram.svg"
                width={32}
                height={32}
                unoptimized
                className="size-8"
              />
            </div>
          </motion.a>

          <motion.a
            href={FACEBOOK_URL}
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer noopener"
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={socialButtonVariants}
            transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
            className="relative h-11 w-16 sm:w-18 overflow-hidden rounded-medium border bg-bg-primary transform-gpu will-change-transform shrink-0"
          >
            <div className="flex h-full w-full items-center justify-center">
              <Image
                alt=""
                aria-hidden="true"
                src="/assets/social/Facebook.svg"
                width={32}
                height={32}
                unoptimized
                className="size-8"
              />
            </div>
          </motion.a>

          <motion.a
            href={LINKEDIN_URL}
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer noopener"
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={socialButtonVariants}
            transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
            className="relative h-11 w-16 sm:w-18 overflow-hidden rounded-medium border bg-bg-primary transform-gpu will-change-transform shrink-0"
          >
            <div className="flex h-full w-full items-center justify-center">
              <Image
                alt=""
                aria-hidden="true"
                src="/assets/social/linkedin.svg"
                width={32}
                height={32}
                unoptimized
                className="size-8"
              />
            </div>
          </motion.a>

          <motion.a
            href={PINTEREST_URL}
            aria-label="Pinterest"
            target="_blank"
            rel="noreferrer noopener"
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={socialButtonVariants}
            transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
            className="relative h-11 w-16 sm:w-18 overflow-hidden rounded-medium border bg-bg-primary transform-gpu will-change-transform shrink-0"
          >
            <div className="flex h-full w-full items-center justify-center">
              <Image
                alt=""
                aria-hidden="true"
                src="/assets/social/pinterest.svg"
                width={32}
                height={32}
                unoptimized
                className="size-8"
              />
            </div>
          </motion.a>
        </div>

        <Image
          alt=""
          aria-hidden="true"
          src="/assets/figma/af34c0eeefce53ef5ec83ee8a473bd6aaaca1726.svg"
          width={103}
          height={1}
          unoptimized
          className="hidden sm:block h-px w-25.75"
        />
      </div>

      <Image
        alt=""
        aria-hidden="true"
        src="/assets/figma/81d96eeaf889c9ccb936670c52e31282548ab24c.svg"
        width={100}
        height={19}
        unoptimized
        className="h-4.75 w-25"
      />

      <div className="flex flex-col items-center gap-1 text-[13px] sm:text-[14px] font-medium leading-[normal]">
        <p className="text-center text-white">Thanks for Visiting.</p>
        <p className="text-text-secondary">Explore Around. Until Next Time.</p>
      </div>
    </footer>
  );
}
