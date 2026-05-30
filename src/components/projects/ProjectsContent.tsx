"use client";

import projectsData from "@/data/projects.json";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProjectsData = typeof projectsData;
type ProjectItem = ProjectsData["items"][number];

// Static tech-stack mapping to display on each card
const PROJECT_TECH_STACKS: Record<string, { label: string; color: string }[]> = {
  "ocr-handwritten-text-extraction": [
    { label: "Python", color: "text-[#3572a5] bg-[#3572a5]/10 border-[#3572a5]/20" },
    { label: "YOLOv8", color: "text-[#ff3838] bg-[#ff3838]/10 border-[#ff3838]/20" },
    { label: "OpenCV", color: "text-[#5c3bf6] bg-[#5c3bf6]/10 border-[#5c3bf6]/20" },
    { label: "Transformers", color: "text-[#ffcc00] bg-[#ffcc00]/10 border-[#ffcc00]/20" }
  ],
  "multi-tenant-hr-product": [
    { label: "React.js", color: "text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/20" },
    { label: "Node.js", color: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20" },
    { label: "Prisma", color: "text-[#5a67d8] bg-[#5a67d8]/10 border-[#5a67d8]/20" },
    { label: "Redis", color: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20" },
    { label: "Docker", color: "text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/20" }
  ],
  "civil-dept-product-cad": [
    { label: "React.js", color: "text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/20" },
    { label: "Three.js", color: "text-[#ffffff] bg-white/10 border-white/20" },
    { label: "Django", color: "text-[#092e20] bg-[#092e20]/20 border-[#092e20]/30" },
    { label: "AWS Lambda", color: "text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/20" }
  ],
  "blog-publishing-platform": [
    { label: "Next.js", color: "text-[#ffffff] bg-white/10 border-white/20" },
    { label: "TypeScript", color: "text-[#3178c6] bg-[#3178c6]/10 border-[#3178c6]/20" },
    { label: "Prisma", color: "text-[#5a67d8] bg-[#5a67d8]/10 border-[#5a67d8]/20" },
    { label: "AWS S3", color: "text-[#ff9900] bg-[#ff9900]/10 border-[#ff9900]/20" }
  ],
  "insurance-product": [
    { label: "Next.js", color: "text-[#ffffff] bg-white/10 border-white/20" },
    { label: "TypeScript", color: "text-[#3178c6] bg-[#3178c6]/10 border-[#3178c6]/20" },
    { label: "Prisma", color: "text-[#5a67d8] bg-[#5a67d8]/10 border-[#5a67d8]/20" },
    { label: "NextAuth", color: "text-[#8b5cf6] bg-[#8b5cf6]/10 border-[#8b5cf6]/20" }
  ],
  "cma-firm-website-strategy-led-ui": [
    { label: "Next.js", color: "text-[#ffffff] bg-white/10 border-white/20" },
    { label: "Figma", color: "text-[#f24e1e] bg-[#f24e1e]/10 border-[#f24e1e]/20" },
    { label: "Tailwind CSS", color: "text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/20" }
  ]
};

const cardVariants: Variants = {
  rest: {
    y: 0,
    borderColor: "rgba(255,255,255,0.04)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
  },
  hover: {
    y: -6,
    borderColor: "rgba(255,255,255,0.12)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.6)"
  },
};

const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 0.15 },
};

const buttonVariants: Variants = {
  rest: {
    scale: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  hover: {
    scale: 1.08,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
};

export default function ProjectsContent() {
  const data: ProjectsData = projectsData;

  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col gap-8 pb-20 pt-6">
      {/* Header section with telemetry detail layout */}
      <section className="flex w-full flex-col gap-3.5 border-b border-white/5 pb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gray-500 uppercase font-semibold">
            Deployments catalog
          </span>
          <h1 className="text-[24px] font-bold leading-normal text-white">{data.title}</h1>
        </div>
        <p className="w-full text-[13px] sm:text-[14px] font-medium leading-[1.6] text-text-secondary">
          {data.description}
        </p>
      </section>

      {/* Projects Cards Grid */}
      <div className="flex w-full flex-col gap-4">
        {data.items.map((item) => (
          <ProjectCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ item }: { item: ProjectItem }) {
  const techStack = PROJECT_TECH_STACKS[item.slug] || [];

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
      className="group relative h-auto w-full overflow-hidden rounded-[20px] sm:rounded-medium border bg-[#05070a]/40 p-4 sm:p-5 transform-gpu will-change-transform"
      style={{ borderColor: "rgba(255,255,255,0.04)" }}
    >
      {/* Subtle active glow overlay tracking card hover */}
      <motion.div
        aria-hidden="true"
        variants={overlayVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_100%)]"
      />

      <div className="relative z-10 flex w-full flex-col gap-4">
        
        {/* Top: Image and Meta Details Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start">
          {/* Laptop mock view screen preview */}
          <div className="relative h-32 w-full sm:w-44 aspect-[16/10] sm:aspect-auto overflow-hidden rounded-lg border border-white/5 shrink-0 bg-black">
            <Image
              alt=""
              src={item.imageSrc}
              width={210}
              height={136}
              className="h-full w-full object-cover grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-103"
            />
          </div>

          <div className="flex flex-col flex-1 gap-2 min-w-0">
            {/* Title & Launch Button */}
            <div className="flex w-full items-center justify-between gap-2">
              <p className="text-[15px] sm:text-[16px] font-bold leading-normal text-white truncate max-w-[85%] group-hover:text-white transition-colors duration-300">
                {item.title}
              </p>

              <Link
                href={item.href}
                aria-label={`View ${item.title}`}
                className="flex size-6 items-center justify-center shrink-0 cursor-pointer"
              >
                <motion.span
                  variants={buttonVariants}
                  transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7 }}
                  className="flex size-6 items-center justify-center overflow-hidden rounded-full border"
                >
                  <ArrowUpRight
                    size={10}
                    className="size-2.5 text-white/80 group-hover:text-white transition-colors duration-300"
                  />
                </motion.span>
              </Link>
            </div>

            {/* Description Text */}
            <p className="text-[12.5px] sm:text-[13.5px] font-medium leading-[1.6] text-text-secondary">
              {item.description}
            </p>
          </div>
        </div>

        {/* Bottom Row: Dynamic brand-colored tech tags & metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3 mt-1 font-mono text-[10px]">
          
          {/* Active tech stack indicator tags */}
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech.label}
                className={`px-2 py-0.5 rounded-[4px] border text-[9px] font-medium uppercase tracking-wider ${tech.color}`}
              >
                {tech.label}
              </span>
            ))}
          </div>

          {/* Date / Category telemetries */}
          <span className="text-text-quaternary font-medium shrink-0 uppercase tracking-widest text-[9px]">
            {item.meta.split("/")[1] || item.meta}
          </span>
        </div>

      </div>
    </motion.div>
  );
}
