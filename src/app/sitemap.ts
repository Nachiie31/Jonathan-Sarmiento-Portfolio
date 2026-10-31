import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { isPlaceholder } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    // Placeholder projects are noindexed, so they are left out until real content is added.
    ...projects
      .filter((p) => !isPlaceholder(p))
      .map((p) => ({
        url: `${siteConfig.url}/projects/${p.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
