"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

export type ToolStackCardItem = {
  label: string;
  icon: string[];
  href?: string;
};

type ToolStackCardsProps = {
  rows: ToolStackCardItem[][];
  iconBasePath?: string;
  forceMonochromeIcons?: boolean;
};

const cardVariants: Variants = {
  rest: {
    y: 0,
    borderColor: "var(--border-frame)",
  },
  hover: {
    y: -4,
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

export default function ToolStackCards({
  rows,
  iconBasePath = "/assets/figma",
  forceMonochromeIcons = false,
}: ToolStackCardsProps) {
  return (
    <div className="flex flex-col gap-[11px]">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex flex-row w-full gap-[12px]">
          {row.map(({ label, icon, href }) => (
            <motion.div
              key={label}
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={cardVariants}
              transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
              className="group relative h-[56px] sm:h-[71px] flex-1 overflow-hidden rounded-[12px] sm:rounded-medium border bg-bg-primary transform-gpu will-change-transform"
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

              <div className="absolute left-[10px] sm:left-[19px] top-[12px] sm:top-[15px] z-10 flex size-[32px] sm:size-[39px] items-center justify-center rounded-[32px] bg-[rgba(240,240,240,0.06)]">
                <span aria-hidden="true" className="relative block size-[24px] sm:size-[40px]">
                  {icon.map((file) => (
                    <Image
                      key={file}
                      alt=""
                      aria-hidden="true"
                      src={`${iconBasePath}/${file}`}
                      width={40}
                      height={40}
                      unoptimized={file.endsWith(".svg")}
                      className={
                        forceMonochromeIcons
                          ? "absolute inset-0 block h-full w-full object-contain filter invert grayscale contrast-125 transition duration-300 ease-out group-hover:invert-0 group-hover:grayscale-0 group-hover:contrast-100"
                          : "absolute inset-0 block h-full w-full object-contain grayscale transition duration-300 ease-out group-hover:grayscale-0"
                      }
                    />
                  ))}
                </span>
              </div>

              <p className="absolute left-[48px] sm:left-[66px] top-[19px] sm:top-[25px] z-10 text-[13px] sm:text-[16px] font-semibold leading-[normal] text-white truncate max-w-[calc(100%-54px)] sm:max-w-[calc(100%-100px)]">
                {label}
              </p>

              <motion.a
                href={href ?? "#"}
                aria-label="Open"
                variants={viewButtonVariants}
                transition={{ duration: 0.7, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-[16px] top-[16px] z-10 hidden sm:flex size-[24px] items-center justify-center overflow-hidden rounded-[32px] border border-border-interactive bg-bg-interactive"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noreferrer" : undefined}
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
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
