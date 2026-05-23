"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

export type SpotlightCardItem = {
  title: string;
  description: string;
  footerLeft: string;
  footerRight: string;
  logoFile: string;
  href?: string;
};

type SpotlightCardsProps = {
  items: SpotlightCardItem[];
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

const viewButtonVariants: Variants = {
  rest: { opacity: 0, x: -14 },
  hover: { opacity: 1, x: 0 },
};

export default function SpotlightCards({ items }: SpotlightCardsProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      {items.map((item) => (
        <motion.div
          key={item.title}
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={cardVariants}
          transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
          className="group relative h-auto w-full overflow-hidden rounded-[20px] sm:rounded-huge border bg-bg-primary p-[16px] sm:p-[25px] flex flex-col gap-[16px] transform-gpu will-change-transform"
          style={{ borderColor: "var(--border-frame)" }}
        >
          <motion.div
            aria-hidden="true"
            variants={overlayVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #21212133 0%, #18181899 100%)",
            }}
          />

          {/* Header row */}
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="flex items-center gap-[8px] max-w-[calc(100%-36px)]">
              <div className="relative size-[32px] shrink-0 overflow-hidden rounded-[32px] bg-white">
                <Image
                  alt=""
                  aria-hidden="true"
                  src={`/assets/figma/${item.logoFile}`}
                  width={32}
                  height={32}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <p className="truncate text-[15px] sm:text-[16px] font-bold leading-[normal] text-text-secondary">
                {item.title}
              </p>
            </div>

            <motion.a
              href={item.href ?? "#"}
              aria-label="Open"
              variants={viewButtonVariants}
              transition={{ duration: 0.7, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex size-[24px] shrink-0 items-center justify-center overflow-hidden rounded-[32px] border border-border-interactive bg-bg-interactive focus:opacity-100"
              {...(item.href
                ? { target: "_blank", rel: "noopener noreferrer" }
                : undefined)}
            >
              <Image
                alt=""
                aria-hidden="true"
                src="/assets/figma/0e4f8b666592bdac4c1370729cc9515d040ce092.svg"
                width={12}
                height={12}
                unoptimized
                className="size-[12px]"
              />
            </motion.a>
          </div>

          {/* Description */}
          <div className="relative z-10 flex flex-col gap-[6px]">
            <p className="text-[13px] sm:text-[14px] font-regular leading-relaxed text-text-secondary line-clamp-3 overflow-hidden text-ellipsis">
              {item.description}
            </p>
          </div>

          {/* Divider & Footer Details */}
          <div className="relative z-10 flex flex-col gap-[10px] mt-auto w-full">
            <Image
              alt=""
              aria-hidden="true"
              src="/assets/figma/a8ce72b6c4ad6519beb03028a97fe82d27b77ca0.svg"
              width={526}
              height={2}
              unoptimized
              className="h-[2px] w-full"
            />
            <div className="flex w-full items-center justify-between text-[12px] sm:text-[14px] font-medium leading-[normal] text-text-quaternary gap-[8px]">
              <p className="truncate max-w-[60%] sm:max-w-none">{item.footerLeft}</p>
              <p className="shrink-0">{item.footerRight}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
