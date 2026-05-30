import { notFound } from "next/navigation";
import projectDetails from "@/data/project-details.json";
import BlogDetailContent from "@/components/blog/BlogDetailContent";
import { type ProjectDetail } from "@/components/projects/ProjectDetailContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const project = (projectDetails.projects as ProjectDetail[]).find(
    (p) => p.slug === slug
  );

  if (!project) {
    notFound();
  }

  return <BlogDetailContent project={project} />;
}
