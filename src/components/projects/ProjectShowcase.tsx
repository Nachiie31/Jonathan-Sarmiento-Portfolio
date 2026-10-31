"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion, type PanInfo, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/data/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { setOrigin } from "@/lib/transition";

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const count = projects.length;
  const project = projects[index];
  const previewRef = useRef<HTMLAnchorElement>(null);
  const dragged = useRef(false);

  // Remember where the preview sits so the case study can expand out of it.
  // A click that ends a drag must not open the project.
  function openProject(e: React.MouseEvent) {
    if (dragged.current) {
      e.preventDefault();
      return;
    }
    if (previewRef.current) setOrigin(previewRef.current.getBoundingClientRect());
  }

  const paginate = useCallback(
    (dir: 1 | -1) => setPage(([i]) => [(i + dir + count) % count, dir]),
    [count],
  );
  const goTo = (n: number) => setPage(([i]) => (n === i ? [i, 0] : [n, n > i ? 1 : -1]));

  // Direction-aware horizontal slide; reduced motion falls back to a plain fade.
  const dist = reduce ? 0 : 120;
  const slide: Variants = {
    enter: (d: number) => ({ opacity: 0, x: d * dist }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: EASE_OUT_EXPO, staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.08 },
    },
    exit: (d: number) => ({ opacity: 0, x: -d * dist, transition: { duration: 0.4, ease: EASE_OUT_EXPO } }),
  };
  const item: Variants = {
    enter: { opacity: 0, y: reduce ? 0 : 28 },
    center: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
    exit: { opacity: 0 },
  };

  function onDragEnd(_: unknown, info: PanInfo) {
    setTimeout(() => {
      dragged.current = false;
    }, 60);
    if (count < 2) return;
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) paginate(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) paginate(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    // Only react when focus is inside the carousel, so page scrolling is never hijacked.
    if (count < 2) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  }

  const btn =
    "inline-flex size-12 items-center justify-center rounded-full border border-border-strong transition-colors duration-300 hover:border-foreground hover:bg-white/5 disabled:opacity-30";

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal as="p" className="font-mono text-xs uppercase tracking-[0.3em] text-subtle">
              Selected work
            </Reveal>
            <Reveal as="h2" delay={0.05} className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              <span id="projects-heading">Featured Projects</span>
            </Reveal>
          </div>
          <p className="font-mono text-sm tabular-nums text-muted" aria-hidden>
            {pad(index + 1)} <span className="text-subtle">/ {pad(count)}</span>
          </p>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Project carousel"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative mt-14 rounded-sm outline-offset-8"
        >
          <p className="sr-only" aria-live="polite">
            Project {index + 1} of {count}: {project.title}
          </p>

          <div className="grid">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <m.article
                key={project.slug}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                drag={count > 1 ? "x" : false}
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragStart={() => {
                  dragged.current = true;
                }}
                onDragEnd={onDragEnd}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className="grid cursor-grab touch-pan-y items-center gap-12 active:cursor-grabbing lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-5">
                  <m.p
                    variants={item}
                    aria-hidden
                    className="font-display text-[clamp(5rem,13vw,10rem)] font-semibold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)]"
                  >
                    {project.number}
                  </m.p>

                  <m.p variants={item} className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
                    {project.category}
                    {project.year ? ` · ${project.year}` : ""}
                  </m.p>

                  <m.h3 variants={item} className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                    {project.title}
                  </m.h3>

                  <m.p variants={item} className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                    {project.tagline}
                  </m.p>

                  <m.ul variants={item} aria-label="Technology stack" className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li key={tech} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                        {tech}
                      </li>
                    ))}
                  </m.ul>

                  <m.div variants={item} className="mt-8">
                    <Link
                      href={`/projects/${project.slug}`}
                      scroll={false}
                      draggable={false}
                      onClick={openProject}
                      className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-colors hover:bg-white"
                    >
                      View case study
                      <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </m.div>

                  {(project.links.live || project.links.source) && (
                    <m.div variants={item} className="mt-8 flex flex-wrap gap-5 text-sm">
                      {[project.links.live, project.links.source].map(
                        (link) =>
                          link && (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex min-h-11 items-center gap-1.5 border-b border-border-strong pb-0.5 transition-colors hover:border-foreground"
                            >
                              {link.label}
                              <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                          ),
                      )}
                    </m.div>
                  )}
                </div>

                <m.div variants={item} className="lg:col-span-7 lg:-mr-[6vw]">
                  <Link
                    ref={previewRef}
                    href={`/projects/${project.slug}`}
                    scroll={false}
                    draggable={false}
                    onClick={openProject}
                    tabIndex={-1}
                    aria-hidden
                    className="block"
                  >
                    <ProjectPreview project={project} />
                  </Link>
                </m.div>
              </m.article>
            </AnimatePresence>
          </div>
        </div>

        {count > 1 && (
          <div className="mt-16 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2" role="group" aria-label="Choose project">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}: ${p.title}`}
                  aria-current={i === index}
                  className="group flex h-11 items-center px-1"
                >
                  <span
                    className={`block h-px transition-all duration-500 ${
                      i === index ? "w-12 bg-foreground" : "w-6 bg-white/25 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-4 hidden font-mono text-xs text-subtle md:inline">Drag, swipe or use ← →</span>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => paginate(-1)} className={btn} aria-label="Previous project">
                <ArrowLeft size={18} aria-hidden />
              </button>
              <button type="button" onClick={() => paginate(1)} className={btn} aria-label="Next project">
                <ArrowRight size={18} aria-hidden />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
