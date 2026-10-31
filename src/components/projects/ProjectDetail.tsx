import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { Reveal } from "@/components/ui/Reveal";
import { projects, type Project } from "@/data/projects";
import { getNeighbors } from "@/lib/projects";

type Props = { project: Project; variant: "page" | "modal" };

function Row({ label, as: Heading, children }: { label: string; as: "h2" | "h3"; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-6 border-t border-border py-10 sm:py-14 md:grid-cols-[13rem_1fr] md:gap-12">
      <Heading className="self-start font-mono text-xs uppercase tracking-[0.25em] text-subtle md:sticky md:top-24">
        {label}
      </Heading>
      <div>{children}</div>
    </Reveal>
  );
}

const lead = "max-w-3xl text-lg leading-relaxed text-muted sm:text-xl";

/** Data-driven case study. Used by both the full page and the overlay, so content never diverges. */
export function ProjectDetail({ project, variant }: Props) {
  const isModal = variant === "modal";
  const Title = isModal ? "h2" : "h1";
  const Sub = isModal ? "h3" : "h2";
  const { prev, next } = getNeighbors(project.slug);

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-24 sm:px-8">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          {project.number} <span className="text-subtle">/</span> {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <Title className="mt-5 max-w-4xl font-display text-[clamp(2.25rem,7vw,5.5rem)] font-semibold leading-[1] tracking-[-0.03em]">
          {project.title}
        </Title>
        <p className={`mt-6 ${lead}`}>{project.tagline}</p>
      </header>

      <div className="mt-14 sm:mt-20">
        <ProjectPreview project={project} />
      </div>

      <div className="mt-24">
        <Row label="Overview" as={Sub}>
          <p className={lead}>{project.overview}</p>
          {(project.links.live || project.links.source) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-white"
                >
                  {project.links.live.label} <ArrowUpRight size={16} aria-hidden />
                </a>
              )}
              {project.links.source && (
                <a
                  href={project.links.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong px-6 text-sm font-medium transition-colors hover:border-foreground hover:bg-white/5"
                >
                  {project.links.source.label} <ArrowUpRight size={16} aria-hidden />
                </a>
              )}
            </div>
          )}
        </Row>

        <Row label="Problem & purpose" as={Sub}>
          <p className={lead}>{project.problem}</p>
        </Row>

        <Row label="My role" as={Sub}>
          <p className="font-display text-2xl font-medium tracking-tight">{project.role}</p>
          <ul className="mt-6 space-y-3 text-muted">
            {project.responsibilities.map((r) => (
              <li key={r} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-white/40" />
                {r}
              </li>
            ))}
          </ul>
        </Row>

        <Row label="Features" as={Sub}>
          <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {project.features.map((f, i) => (
              <li key={f} className="flex gap-4 text-muted">
                <span aria-hidden className="font-mono text-xs text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f}
              </li>
            ))}
          </ol>
        </Row>

        <Row label="Stack & tools" as={Sub}>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <li key={t} className="rounded-full border border-border-strong px-4 py-1.5 font-mono text-sm">
                {t}
              </li>
            ))}
          </ul>
        </Row>

        <Row label="Implementation decisions" as={Sub}>
          <dl className="space-y-8">
            {project.decisions.map((d) => (
              <div key={d.title}>
                <dt className="font-display text-xl font-medium tracking-tight">{d.title}</dt>
                <dd className="mt-2 max-w-2xl text-muted">{d.detail}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row label="Challenges" as={Sub}>
          <dl className="space-y-8">
            {project.challenges.map((c) => (
              <div key={c.challenge} className="grid gap-2 sm:grid-cols-2 sm:gap-10">
                <dt className="font-display text-xl font-medium tracking-tight">{c.challenge}</dt>
                <dd className="text-muted">{c.resolution}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row label="Gallery" as={Sub}>
          {project.gallery.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((img) => (
                <li key={img.src} className="overflow-hidden rounded-md border border-border">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {[0, 1].map((n) => (
                <div
                  key={n}
                  aria-hidden
                  className="flex aspect-[16/10] items-end rounded-md border border-dashed border-border-strong bg-surface p-4"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
                    Screenshot placeholder · /public/projects/{project.slug}/
                  </span>
                </div>
              ))}
              <p className="sr-only">Screenshots for this project have not been added yet.</p>
            </div>
          )}
        </Row>

        <Row label="Testing & quality" as={Sub}>
          <p className={lead}>{project.testing}</p>
        </Row>
      </div>

      {projects.length > 1 && (
        <nav aria-label="More projects" className="grid gap-px border border-border bg-border sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            replace={isModal}
            scroll={!isModal}
            className="group flex min-h-32 flex-col justify-between bg-background p-6 transition-colors hover:bg-surface"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
              <ArrowLeft size={14} aria-hidden className="transition-transform group-hover:-translate-x-1" /> Previous
            </span>
            <span className="mt-6 font-display text-xl tracking-tight sm:text-2xl">{prev.title}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            replace={isModal}
            scroll={!isModal}
            className="group flex min-h-32 flex-col items-end justify-between bg-background p-6 text-right transition-colors hover:bg-surface"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
              Next <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-6 font-display text-xl tracking-tight sm:text-2xl">{next.title}</span>
          </Link>
        </nav>
      )}
    </article>
  );
}
