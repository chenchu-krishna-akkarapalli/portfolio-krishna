import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ZoomableImage } from "@/components/projects/ZoomableImage";
import { ProjectLargeVideo } from "@/components/projects/ProjectLargeVideo";

export type ProjectDetail = {
  slug: string;
  headerLabel: string;
  meta: string[];
  title: string;
  laptop: {
    svgSrc: string;
    alt: string;
  };
  overview: {
    bullets: string[];
    paragraph: string;
  };
  ipad: {
    svgSrc: string;
    alt: string;
  };
  flow: {
    steps: string[];
  };
  largeVideo?:
    | {
        type: "vimeo";
        vimeoId: number;
        title: string;
      }
    | {
        type: "mp4";
        src: string;
        title: string;
      };
  largeImage: {
    src: string;
    alt: string;
  };
  tools: string[];
  impact: string[];
  authorName: string;
};

function MetaLineWithPipes({ parts }: { parts: string[] }) {
  return (
    <div className="flex items-center gap-1.25 text-[14px] font-medium leading-[normal] text-text-secondary">
      {parts.map((part, index) => (
        <div key={`${part}-${index}`} className="contents">
          <p className="shrink-0">{part}</p>
          {index < parts.length - 1 ? <p className="shrink-0">|</p> : null}
        </div>
      ))}
    </div>
  );
}

function Laptop({ svgSrc, alt }: ProjectDetail["laptop"]) {
  return (
    <ZoomableImage
      src={svgSrc}
      alt={alt}
      width={497}
      height={273}
      unoptimized
      priority
      className="block h-auto w-full"
      zoomContainerClassName="w-full cursor-zoom-in"
    />
  );
}

function Ipad({ svgSrc, alt }: ProjectDetail["ipad"]) {
  const isLongBlogLanding = svgSrc.endsWith("/blog-LandingPage.svg");
  const isInsuranceUiTemplate = svgSrc.endsWith("/insurance-Ui-templet.svg");
  const isCaFirmTemplate = svgSrc.endsWith("/CA-Firm-Templet.png");

  if (isLongBlogLanding || isInsuranceUiTemplate || isCaFirmTemplate) {
    return (
      <ZoomableImage
        src={svgSrc}
        alt={alt}
        width={isLongBlogLanding ? 1440 : 1345}
        height={
          isLongBlogLanding ? 12095 : isCaFirmTemplate ? 5931 : 2497
        }
        unoptimized
        className="block h-auto w-full"
        zoomContainerClassName="w-full cursor-zoom-in overflow-hidden rounded-huge"
        modalVariant="fullWidthScroll"
      />
    );
  }

  return (
    <div className="relative h-76.25 w-99.5 overflow-hidden">
      <ZoomableImage
        src={svgSrc}
        alt={alt}
        fill
        unoptimized
        className="cursor-zoom-in"
        style={{ objectFit: "cover", objectPosition: "50% 50%" }}
        zoomContainerClassName="absolute inset-0"
      />
    </div>
  );
}

export function ProjectDetailContent({
  project,
  largeImageSlot,
}: {
  project: ProjectDetail;
  largeImageSlot?: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-145 flex-col gap-10 pb-55 pt-8.75">
      {/* Top header */}
      <div className="flex items-center gap-10">
        <Link
          href="/projects"
          aria-label="Back to projects"
          className="relative size-8 overflow-hidden rounded-4xl border border-border-interactive bg-bg-interactive"
        >
          <Image
            alt=""
            aria-hidden
            src="/assets/figma/cefc0d5c2688499044589a9e2f084f3a84a06235.svg"
            width={16}
            height={16}
            unoptimized
            className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2"
          />
        </Link>

        <p className="w-127 text-[16px] font-bold leading-[normal] text-text-secondary">
          {project.headerLabel}
        </p>
      </div>

      {/* Card */}
      <div className="relative w-full overflow-hidden rounded-huge border-4 border-border-frame bg-linear-to-b from-[rgba(33,33,33,0.2)] to-[rgba(24,24,24,0.6)]">
        <div className="pointer-events-none absolute -inset-1 shadow-[inset_0px_0px_0px_5px_rgba(240,240,240,0.1),inset_0px_0px_9px_5px_rgba(114,180,255,0.1),inset_0px_0px_4px_4px_rgba(26,38,52,0.3)]" />

        <div className="flex w-full flex-col gap-8 px-10.5 pb-8 pt-8">
          <MetaLineWithPipes parts={project.meta} />

          <div className="flex w-full flex-col gap-8">
            <p className="w-full text-[24px] font-bold leading-[normal] text-white">
              {project.title}
            </p>

            <div className="flex w-full flex-col items-center gap-2.5">
              <Laptop {...project.laptop} />

              <div className="flex w-full flex-col gap-0.75 text-[14px] font-medium leading-[normal] text-text-secondary">
                <p className="w-full">{project.overview.paragraph}</p>
                <ul className="w-full list-disc pl-5.25">
                  {project.overview.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              <Ipad {...project.ipad} />

              <div className="flex w-full flex-col gap-0.75 text-[14px] font-medium leading-[normal] text-text-secondary">
                <p className="h-4.25 w-full">
                  <span>✦ </span>
                  <span className="font-bold">OCR Flow & Methodology</span>
                </p>

                <ol className="w-full list-decimal pl-5.25 pb-7.5">
                  {project.flow.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>

              {largeImageSlot ? (
                largeImageSlot
              ) : project.largeVideo ? (
                <ProjectLargeVideo video={project.largeVideo} />
              ) : (
                <div className="relative aspect-496/313 w-full overflow-hidden">
                  <ZoomableImage
                    src={project.largeImage.src}
                    alt={project.largeImage.alt}
                    fill
                    className="pointer-events-none select-none cursor-zoom-in"
                    style={{ objectFit: "cover", objectPosition: "50% 50%" }}
                    zoomContainerClassName="absolute inset-0"
                  />
                </div>
              )}

              <div className="flex w-full flex-col gap-0.75 text-[14px] font-medium leading-[normal] text-text-secondary pt-7.5">
                <p className="h-4.25 w-full">
                  <span>✦ </span>
                  <span className="font-bold">Tools & Technologies</span>
                </p>
                <ul className="w-full list-disc pl-5.25">
                  {project.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col gap-0.75 text-[14px] font-medium leading-[normal] text-text-secondary">
                <p className="h-4.25 w-full font-bold">✦ Impact</p>
                <ul className="w-full list-disc pl-5.25">
                  {project.impact.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex w-59.5 flex-col gap-2.5">
            <p className="min-w-full text-[14px] font-medium leading-[normal] text-text-secondary">
              {project.authorName}
            </p>
            <div className="relative h-4.75 w-25">
              <Image
                src="/assets/figma/81d96eeaf889c9ccb936670c52e31282548ab24c.svg"
                alt="Signature"
                fill
                className="pointer-events-none select-none"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
