import { projects, type Project } from "@/data/projects";

/** Placeholder projects are kept out of search results and the sitemap until replaced with real content. */
export const isPlaceholder = (p: Project) => p.title.startsWith("[Placeholder]");

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function getNeighbors(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return {
    index: i,
    prev: projects[(i - 1 + n) % n],
    next: projects[(i + 1) % n],
  };
}
