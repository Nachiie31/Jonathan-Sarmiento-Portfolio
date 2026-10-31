import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { projects } from "@/data/projects";
import { getProject } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Intercepts in-app navigation to /projects/[slug] and shows it as an overlay on top of the home page. */
export default async function ProjectOverlay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <ProjectModal label={`${project.title} case study`}>
      <ProjectDetail project={project} variant="modal" />
    </ProjectModal>
  );
}
