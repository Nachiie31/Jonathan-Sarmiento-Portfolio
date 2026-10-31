"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { siteConfig } from "@/data/site";

const headline = ["Building", "Digital", "Experiences", "That", "Work."];

/**
 * The entrance (word reveal, fade-ups) is pure CSS, so text paints immediately on load
 * instead of waiting for JavaScript to hydrate. Motion is used only for scroll-linked parallax.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Gentle parallax: background drifts slower than content, content fades as you leave.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section
      id="top"
      ref={ref}
      data-offscreen={!inView}
      className="relative isolate flex min-h-dvh items-end overflow-hidden"
    >
      {/* Ambient background: light, rings and a faint grid. Transforms only, so it stays cheap. */}
      <m.div aria-hidden style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-1/4 -top-1/4 size-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)]" />
        <div className="hero-grid absolute inset-0" />
        <div className="absolute right-[-12vmax] top-[8vh] size-[52vmax] max-w-[900px] max-h-[900px]">
          <div className="hero-ring absolute inset-0 rounded-full border border-white/10" />
          <div className="hero-ring-reverse absolute inset-[12%] rounded-full border border-dashed border-white/10" />
          <div className="hero-ring absolute inset-[28%] rounded-full border border-white/15" />
          <div className="absolute inset-[44%] rounded-full bg-white/[0.04] ring-1 ring-white/20" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </m.div>

      <m.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pb-28"
      >
        <p
          className="fade-up font-mono text-xs uppercase tracking-[0.3em] text-muted sm:text-sm"
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          {siteConfig.name} <span className="text-subtle">/</span> {siteConfig.title}
        </p>

        <h1 className="mt-6 max-w-5xl font-display text-[clamp(3rem,12.5vw,8.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
          {headline.map((word, i) => (
            <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <span
                className={`word-in inline-block ${i >= 3 ? "text-muted" : ""}`}
                style={{ "--d": `${200 + i * 90}ms` } as React.CSSProperties}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <p
            className="fade-up text-base leading-relaxed text-muted sm:text-lg"
            style={{ "--d": "450ms" } as React.CSSProperties}
          >
            I build functional, responsive, user-focused web applications, with an emphasis on clean
            implementation, thoughtful design and reliable functionality.
          </p>

          <div className="fade-up flex flex-wrap gap-3 md:justify-end" style={{ "--d": "600ms" } as React.CSSProperties}>
            <MagneticLink href="#projects">
              Explore My Work <ArrowDown size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </MagneticLink>
            <MagneticLink href="#contact" variant="secondary">
              Contact Me <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </MagneticLink>
          </div>
        </div>
      </m.div>

      {/* Scroll indicator (CSS only) */}
      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="fade-up absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-subtle transition-colors hover:text-foreground sm:flex"
        style={{ "--d": "1200ms" } as React.CSSProperties}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span aria-hidden className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="scroll-line absolute inset-x-0 top-0 h-1/2 bg-foreground" />
        </span>
      </a>
    </section>
  );
}
