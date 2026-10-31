"use client";

import Image from "next/image";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { Project, ProjectImage } from "@/data/projects";

function Shot({ img, label }: { img?: ProjectImage; label: string }) {
  if (img) {
    return (
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes="(min-width: 1024px) 56vw, 92vw"
        className="h-full w-full object-cover object-top"
        draggable={false}
      />
    );
  }
  // Clearly replaceable placeholder: abstract UI skeleton plus an instruction label.
  return (
    <div className="relative flex h-full w-full flex-col gap-3 bg-surface p-5" aria-hidden>
      <div className="h-3 w-1/3 rounded-sm bg-white/10" />
      <div className="h-24 w-full rounded-sm bg-gradient-to-br from-white/10 to-white/[0.02]" />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-12 rounded-sm bg-white/[0.06]" />
        <div className="h-12 rounded-sm bg-white/[0.06]" />
        <div className="h-12 rounded-sm bg-white/[0.06]" />
      </div>
      <div className="h-2 w-2/3 rounded-sm bg-white/[0.08]" />
      <div className="h-2 w-1/2 rounded-sm bg-white/[0.08]" />
      <p className="mt-auto font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">{label}</p>
    </div>
  );
}

/** Layered browser + device mockup with subtle pointer-driven depth (mouse only). */
export function ProjectPreview({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spring = { stiffness: 120, damping: 20, mass: 0.4 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), spring);
  const backX = useSpring(useTransform(mx, [-0.5, 0.5], [16, -16]), spring);
  const backY = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), spring);
  const frontX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), spring);
  const frontY = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), spring);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  const isPlaceholder = !project.image;
  const placeholderLabel = `Preview placeholder · /public/projects/${project.slug}/`;

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={reset}
      role="img"
      aria-label={project.image ? project.image.alt : `Preview placeholder for ${project.title}`}
      className="relative mx-auto w-full max-w-3xl [perspective:1400px]"
    >
      {/* Back plate: sits furthest away */}
      <m.div
        aria-hidden
        style={{ x: backX, y: backY }}
        className="absolute inset-0 -z-10 translate-x-4 translate-y-5 rounded-md border border-border bg-surface-2/60 sm:translate-x-8 sm:translate-y-9"
      />

      {/* Main browser frame */}
      <m.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-md border border-border-strong bg-surface shadow-[0_40px_120px_-30px_rgba(255,255,255,0.12)]"
      >
        <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5" aria-hidden>
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="ml-3 truncate rounded-sm bg-white/5 px-3 py-1 font-mono text-[10px] text-subtle">
            {project.slug}.example
          </span>
        </div>
        <div className="aspect-[16/10]">
          <Shot img={project.image} label={placeholderLabel} />
        </div>
      </m.div>

      {/* Front device frame: closest layer */}
      <m.div
        aria-hidden
        style={{ x: frontX, y: frontY }}
        className="absolute -bottom-6 -right-2 hidden w-[19%] min-w-24 sm:block"
      >
        <div className="aspect-[9/18] overflow-hidden rounded-[1.25rem] border border-border-strong bg-background p-1 shadow-2xl">
          <div className="h-full overflow-hidden rounded-[1rem] bg-surface">
            {isPlaceholder || !project.gallery[0] ? (
              <div className="flex h-full flex-col gap-2 p-3">
                <div className="h-2 w-1/2 rounded-sm bg-white/10" />
                <div className="h-14 rounded-sm bg-white/[0.07]" />
                <div className="h-2 w-3/4 rounded-sm bg-white/[0.08]" />
                <div className="h-2 w-1/2 rounded-sm bg-white/[0.08]" />
              </div>
            ) : (
              <Shot img={project.gallery[0]} label="" />
            )}
          </div>
        </div>
      </m.div>
    </div>
  );
}
