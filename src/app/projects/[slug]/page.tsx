import { notFound } from "next/navigation";

import projectDetails from "@/data/project-details.json";
import {
  ProjectDetailContent,
  type ProjectDetail,
} from "@/components/projects/ProjectDetailContent";
import { CADComparisonSlider } from "@/components/projects/CADComparisonSlider";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const project = (projectDetails.projects as ProjectDetail[]).find(
    (p) => p.slug === slug,
  );

  if (!project) {
    notFound();
  }

  const largeImageSlot =
    project.slug === "cad-doctor" || project.slug === "civil-dept-product-cad" ? (
      <CADComparisonSlider
        beforeSrc="/assets/project-content-assets/CAD-comparison-slider-1.png"
        afterSrc="/assets/project-content-assets/CAD-comparison-slider-2.png"
        beforeAlt="CAD comparison image 1"
        afterAlt="CAD comparison image 2"
      />
    ) : undefined;

  return <ProjectDetailContent project={project} largeImageSlot={largeImageSlot} />;
}
