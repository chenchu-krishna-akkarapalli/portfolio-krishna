"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import WavingHandCursorArea from "@/components/WavingHandCursorArea";
import { SectionTitle } from "@/components/SectionTitle";
import WorkEducationSection from "@/components/WorkEducationSection";
import ProjectList, { ProjectListItem } from "@/components/ProjectList";
import ToolStackCards from "@/components/ToolStackCards";
import SpotlightCards from "@/components/SpotlightCards";
import Social from "@/components/Social";
import Newsletter from "@/components/Newsletter";
import HeroSection from "@/components/HeroSection";
import SkillDashboardPreview from "@/components/skillmeter";

import aboutData from "@/data/about.json";
import workEducationData from "@/data/work-education.json";
import projectsData from "@/data/projects.json";
import toolstackData from "@/data/toolstack.json";
import spotlightData from "@/data/spotlight.json";

const SECONDARY_TOOL_FILES = [
  "adobe.svg",
  "adobe_creative-cloud.svg",
  "adobe_illustrator.svg",
  "angular.svg",
  "autodesk.svg",
  "behance.svg",
  "docker.svg",
  "figma.svg",
  "filezilla-plain.svg",
  "git-copilot.svg",
  "git.svg",
  "html_5.svg",
  "js.svg",
  "mongodb-plain-wordmark.svg",
  "ms_excel.svg",
  "ms_word.svg",
  "mysql-plain-wordmark.svg",
  "nextjs.svg",
  "node_js.svg",
  "notion.svg",
  "npm.svg",
  "python.svg",
  "react.svg",
  "redux.svg",
  "shopify.svg",
  "sqlite-original.svg",
  "teams.svg",
  "viber.svg",
  "vs_code.svg",
  "vue.svg",
] as const;

function mapToolStackIcons(iconFiles: string[], label: string): string[] {
  return iconFiles.map((file) => {
    const normalized = file.trim().toLowerCase();
    const normalizedLabel = label.trim().toLowerCase();

    if (normalizedLabel === "docker" && normalized === "dockers.svg") {
      return "secondary/docker.svg";
    }

    if (normalizedLabel === "canva" && normalized === "canva.svg") {
      return "Primary/canva-original.svg";
    }

    if (SECONDARY_TOOL_FILES.includes(normalized as (typeof SECONDARY_TOOL_FILES)[number])) {
      return `secondary/${file}`;
    }

    return file;
  });
}

export default function Home() {
  // Map projects items to ProjectList expected types
  const projectListItems: ProjectListItem[] = projectsData.items.map((item) => {
    let iconType: "ocr" | "cad" | "hr" | "blog" = "blog";
    if (item.slug.includes("ocr")) iconType = "ocr";
    else if (item.slug.includes("cad")) iconType = "cad";
    else if (item.slug.includes("hr")) iconType = "hr";

    return {
      title: item.title,
      href: item.href,
      iconType,
    };
  });

  // Map tool stack items and group into rows of 2 for optimal fit
  const mappedToolStack = toolstackData.toolStack.map((item) => ({
    label: item.label,
    icon: mapToolStackIcons(item.iconFiles, item.label),
    href: item.href,
  }));

  const toolStackRows = [];
  for (let i = 0; i < mappedToolStack.length; i += 2) {
    toolStackRows.push(mappedToolStack.slice(i, i + 2));
  }

  return (
    <div className="mx-auto flex w-full max-w-[580px] flex-col gap-[36px] sm:gap-[56px] pb-[100px] pt-[10px]">
      {/* Hero Section */}
      <HeroSection />

      {/* Work & Education Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]">
          <SectionTitle>Work & Education</SectionTitle>
          <WorkEducationSection items={workEducationData.items} />
        </section>
      </ScrollReveal>

      {/* Curated Projects Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]">
          <SectionTitle>Featured Projects</SectionTitle>
          <ProjectList items={projectListItems} />
        </section>
      </ScrollReveal>

      {/* Toolstack Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]">
          <SectionTitle>My Toolstack</SectionTitle>
          <ToolStackCards rows={toolStackRows} iconBasePath="/assets/tools-stack" />
        </section>
      </ScrollReveal>

      {/* Skillmeter Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]">
          <SectionTitle>Skills</SectionTitle>
          <SkillDashboardPreview />
        </section>
      </ScrollReveal>

      {/* Spotlight Highlights Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]">
          <SectionTitle>Milestones & Spotlight</SectionTitle>
          <SpotlightCards items={spotlightData.items} />
        </section>
      </ScrollReveal>

      {/* Social Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]">
          <SectionTitle>Social</SectionTitle>
          <Social />
        </section>
      </ScrollReveal>

      {/* Newsletter Section */}
      <ScrollReveal>
        <section className="flex w-full flex-col gap-[18px]">
          <SectionTitle>Newsletter</SectionTitle>
          <Newsletter />
        </section>
      </ScrollReveal>
    </div>
  );
}
