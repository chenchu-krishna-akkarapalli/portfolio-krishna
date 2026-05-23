"use client";

import projectsData from "@/data/projects.json";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ProjectsData = typeof projectsData;

type ProjectItem = ProjectsData["items"][number];

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
    borderColor: "var(--border-interactive)",
    backgroundColor: "var(--bg-interactive)",
  },
  hover: {
    scale: 1.06,
    borderColor: "var(--border-strong)",
    backgroundColor: "var(--bg-nav-active)",
  },
};

export default function ProjectsContent() {
  const data: ProjectsData = projectsData;

  return (
    <div className="mx-auto flex w-full max-w-145 flex-col gap-12.5 pb-25 pt-8.75">
      <section className="flex w-full flex-col gap-4">
        <p className="min-w-full text-[24px] font-bold leading-[normal] text-white">{data.title}</p>
        <p className="w-full max-w-xl text-[14px] font-medium leading-[normal] tracking-[0.56px] text-text-secondary">
          {data.description}
        </p>
      </section>

      <div className="flex w-full flex-col gap-5">
        {data.items.map((item) => (
          <ProjectCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
      className="group relative h-auto w-full overflow-hidden rounded-[20px] sm:rounded-huge border bg-bg-primary p-[16px] sm:p-[24px] transform-gpu will-change-transform"
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

      <div className="relative z-10 flex w-full max-w-[526px] mx-auto flex-col sm:flex-row items-center sm:items-start justify-between gap-[16px] sm:gap-[24px]">
        <div className="relative h-34 w-full sm:w-52.5 aspect-[210/136] sm:aspect-auto overflow-hidden rounded-medium shrink-0">
          <Image
            alt=""
            src={item.imageSrc}
            width={210}
            height={136}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-full sm:w-73.25 flex-col gap-0.75">
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <p className="w-[80%] sm:w-52.5 text-[15px] sm:text-[16px] font-bold leading-[normal] text-text-secondary truncate">
                {item.title}
              </p>

              <Link
                href={item.href}
                aria-label={`View ${item.title}`}
                className="flex size-6 items-center justify-center shrink-0"
              >
                <motion.span
                  variants={buttonVariants}
                  transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
                  className="flex size-6 items-center justify-center overflow-hidden rounded-4xl border"
                >
                  <Image
                    alt=""
                    aria-hidden
                    src="/assets/figma/0e4f8b666592bdac4c1370729cc9515d040ce092.svg"
                    width={12}
                    height={12}
                    unoptimized
                    className="size-3"
                  />
                </motion.span>
              </Link>
            </div>

            <p className="text-[13px] sm:text-[14px] font-medium leading-relaxed text-text-secondary line-clamp-3 sm:line-clamp-none overflow-hidden text-ellipsis">
              {item.description}
            </p>
          </div>

          <p className="text-[12px] sm:text-[14px] font-medium leading-[normal] text-text-quaternary">
            {item.meta}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
