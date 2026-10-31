import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { getProject, isPlaceholder } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const placeholder = isPlaceholder(project);
  const description = placeholder ? siteConfig.description : project.overview;
  const url = `/projects/${slug}`;
  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    // Placeholder pages stay out of search results until real content replaces them.
    robots: placeholder ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      title: `${project.title} | ${siteConfig.name}`,
      description,
      siteName: `${siteConfig.name} | ${siteConfig.title}`,
      locale: siteConfig.locale,
    },
    twitter: { card: "summary_large_image", title: project.title, description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const jsonLd = isPlaceholder(project)
    ? null
    : {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CreativeWork",
            name: project.title,
            description: project.overview,
            url: `${siteConfig.url}/projects/${project.slug}`,
            keywords: project.stack.join(", "),
            author: { "@id": `${siteConfig.url}/#person` },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
              { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.url}/#projects` },
              { "@type": "ListItem", position: 3, name: project.title },
            ],
          },
        ],
      };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
            <ArrowLeft size={16} aria-hidden /> All projects
          </Link>
          <Link href="/" className="font-display text-base font-semibold tracking-tight">
            {siteConfig.name}
            <span className="text-subtle">.</span>
          </Link>
        </div>
      </header>
      <main id="main">
        <ProjectDetail project={project} variant="page" />
      </main>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </>
  );
}
