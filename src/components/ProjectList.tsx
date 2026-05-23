"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

export type ProjectListItem = {
  title: string;
  href: string;
  iconSrc?: string;
  iconType?: "ocr" | "cad" | "hr" | "blog";
};

type ProjectListProps = {
  items: ProjectListItem[];
};

const rowVariants: Variants = {
  rest: {
    y: 0,
    borderColor: "var(--border-item)",
  },
  hover: {
    y: -4,
    borderColor: "var(--border-item-hover)",
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

function getProjectIcon(iconType: ProjectListItem["iconType"]) {
  if (!iconType) return null;

  switch (iconType) {
    case "ocr":
      return { src: "/assets/figma/ef50a75a8e2351d36d74c76eef3b23518726e565.svg", unoptimized: true };
    case "cad":
      return { src: "/assets/figma/e647a11b5ab79caceed8311d7b88a4cc3ff9ff87.png", unoptimized: false };
    case "hr":
      return { src: "/assets/figma/0e6e073a2aaa83228f3d95d22d0409e97a0d6c11.png", unoptimized: false };
    case "blog":
    default:
      return { src: "/assets/figma/fa31985a49294e7b673be5246eee89a1fc086d90.png", unoptimized: false };
  }
}

export default function ProjectList({ items }: ProjectListProps) {
  return (
    <div className="flex w-full flex-col gap-[12px]">
      {items.map((project) => {
        const icon = project.iconSrc
          ? {
              src: project.iconSrc,
              unoptimized: project.iconSrc.toLowerCase().endsWith(".svg"),
              mode: "image" as const,
            }
          : (() => {
              const fallback = getProjectIcon(project.iconType);
              return fallback
                ? { ...fallback, mode: "type" as const }
                : { src: "/assets/figma/fa31985a49294e7b673be5246eee89a1fc086d90.png", unoptimized: false, mode: "type" as const };
            })();

        return (
          <motion.div
            key={project.title}
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={rowVariants}
            transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-medium border bg-bg-primary p-[10px] sm:p-[12px] transform-gpu will-change-transform"
            style={{ borderColor: "var(--border-item)" }}
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

            <div className="relative z-10 flex items-center gap-[8px] max-w-[calc(100%-36px)]">
              <span
                aria-hidden="true"
                className="relative size-[32px] shrink-0 overflow-hidden rounded-[32px] bg-white"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  src={icon.src}
                  width={32}
                  height={32}
                  unoptimized={icon.unoptimized}
                  className={
                    icon.mode === "type" && icon.unoptimized
                      ? "absolute left-[4px] top-[5px] size-[23px] grayscale transition duration-300 ease-out group-hover:grayscale-0"
                      : "absolute inset-0 size-full object-cover grayscale transition duration-300 ease-out group-hover:grayscale-0"
                  }
                />
              </span>

              <a
                href={project.href}
                className="truncate text-[15px] sm:text-[16px] font-regular leading-[normal] text-text-secondary outline-none transition-colors duration-300 ease-out group-hover:text-white max-w-[calc(100%-48px)] sm:max-w-none"
              >
                {project.title}
              </a>
            </div>

            <motion.a
              href={project.href}
              aria-label="Open"
              whileFocus="hover"
              whileTap="hover"
              variants={viewButtonVariants}
              transition={{ duration: 0.7, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex size-[24px] items-center justify-center rounded-[32px] border border-border-interactive bg-bg-interactive"
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
        );
      })}
    </div>
  );
}
