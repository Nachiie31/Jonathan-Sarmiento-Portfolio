"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import type { ExperienceEntry } from "@/data/experience";

/** Timeline whose centre line fills as the reader scrolls (progress only; no scroll hijacking). */
export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });

  return (
    <div className="relative mt-16">
      <div aria-hidden className="absolute bottom-0 left-[4px] top-0 w-px bg-border md:left-[14.5rem]">
        <m.div
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
          className="h-full origin-top bg-foreground"
        />
      </div>

      <ol ref={ref} className="space-y-16">
        {entries.map((e) => (
          <li key={`${e.role}-${e.organization}`} className="relative pl-8 md:grid md:grid-cols-[13rem_3rem_1fr] md:pl-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle md:pr-2 md:pt-2 md:text-right">
              {e.dates}
            </p>
            <span
              aria-hidden
              className="absolute left-0 top-1 size-[9px] rounded-full border border-foreground bg-background md:static md:col-start-2 md:mt-[0.55rem] md:justify-self-center"
            />
            <Reveal className="mt-3 md:col-start-3 md:mt-0">
              <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">{e.role}</h3>
              <p className="mt-1 text-muted">{e.organization}</p>
              <p className="mt-5 max-w-2xl text-muted">{e.summary}</p>

              <ul className="mt-5 space-y-2 text-sm text-muted">
                {e.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-white/40" />
                    {r}
                  </li>
                ))}
              </ul>

              {e.highlights && e.highlights.length > 0 && (
                <ul className="mt-5 space-y-2 text-sm text-foreground">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-foreground" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <ul aria-label="Tools used" className="mt-6 flex flex-wrap gap-2">
                {e.tools.map((t) => (
                  <li key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
