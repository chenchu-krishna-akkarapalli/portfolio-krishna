"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export type BlogCardItem = {
  projectSlug?: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
};

type BlogCardsProps = {
  items: BlogCardItem[];
};

const cardVariants: Variants = {
  rest: {
    y: 0,
    borderColor: "var(--border-frame)",
  },
  hover: {
    y: -6,
    borderColor: "var(--border-strong)",
  },
};

const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

const buttonVariants: Variants = {
  rest: {
    scale: 1,
    borderColor: "var(--border-strong)",
    backgroundColor: "var(--bg-nav-hover)",
  },
  hover: {
    scale: 1.06,
    borderColor: "var(--border-interactive)",
    backgroundColor: "var(--bg-nav-active)",
  },
};

export default function BlogCards({ items }: BlogCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
      {items.map((item) => (
        <Link
          key={`${item.projectSlug ?? "no-slug"}-${item.category}-${item.title}`}
          href={item.projectSlug ? `/projects/${item.projectSlug}` : "/blog"}
          className="block"
          aria-label={item.projectSlug ? `Open project: ${item.title}` : item.title}
        >
          <motion.article
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={cardVariants}
            transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
            className="group relative h-auto w-full cursor-pointer overflow-hidden rounded-[20px] sm:rounded-huge border bg-bg-primary p-[16px] sm:p-[22px] flex flex-col gap-[12px] transform-gpu will-change-transform"
            style={{ borderColor: "var(--border-frame)" }}
          >
            <motion.div
              aria-hidden="true"
              variants={overlayVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(180deg, #21212133 0%, #18181899 100%)",
              }}
            />

            <div className="relative z-10 flex items-center justify-between">
              <p className="text-[11px] sm:text-[12px] font-medium leading-[normal] text-text-placeholder">
                {item.category}
              </p>

              <motion.span
                variants={buttonVariants}
                transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
                className="flex size-6 items-center justify-center overflow-hidden rounded-4xl border"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  src="/assets/figma/0e4f8b666592bdac4c1370729cc9515d040ce092.svg"
                  width={12}
                  height={12}
                  unoptimized
                  className="size-3 opacity-80"
                />
              </motion.span>
            </div>

            <div className="relative z-10 flex flex-col mt-[4px]">
              <p className="text-[16px] sm:text-[18px] font-bold leading-[normal] text-white line-clamp-2 overflow-hidden text-ellipsis">
                {item.title}
              </p>
              <p className="mt-[6px] text-[12px] sm:text-[14px] font-medium leading-[normal] text-text-placeholder">
                {item.date}
              </p>
              <p className="mt-[10px] text-[13px] sm:text-[14px] font-regular leading-relaxed text-text-secondary line-clamp-3 overflow-hidden text-ellipsis">
                {item.excerpt}
              </p>
            </div>
          </motion.article>
        </Link>
      ))}
    </div>
  );
}
