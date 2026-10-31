"use client";

import { useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSteps } from "@/data/process";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Connected stepper built as an accessible tab set (arrow keys, Home/End).
 * Every step's text stays in the DOM, so nothing is hidden from search engines.
 */
export function Process() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = processSteps.length - 1;

  function onKeyDown(e: React.KeyboardEvent) {
    const keys: Record<string, number> = {
      ArrowRight: Math.min(active + 1, last),
      ArrowLeft: Math.max(active - 1, 0),
      Home: 0,
      End: last,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = keys[e.key];
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="process" aria-labelledby="process-heading" className="border-t border-border py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader id="process-heading" eyebrow="How I work" title="From concept to delivery" />

        <Reveal className="mt-16">
          <div role="tablist" aria-label="Development process" onKeyDown={onKeyDown} className="relative grid grid-cols-5">
            {/* Connecting line + progress fill, centred on the step markers */}
            <div aria-hidden className="absolute left-[10%] right-[10%] top-6 h-px bg-border">
              <m.div
                className="h-full origin-left bg-foreground"
                initial={false}
                animate={{ scaleX: active / last }}
                transition={{ duration: reduce ? 0 : 0.6, ease: EASE_OUT_EXPO }}
              />
            </div>

            {processSteps.map((step, i) => {
              const selected = i === active;
              const reached = i <= active;
              return (
                <button
                  key={step.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`process-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`process-panel-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group relative flex min-h-16 flex-col items-center gap-3 px-1 text-center"
                >
                  <span
                    className={`relative z-10 flex size-12 items-center justify-center rounded-full border font-mono text-sm transition-colors duration-500 ${
                      reached
                        ? "border-foreground bg-foreground text-background"
                        : "border-border-strong bg-background text-muted group-hover:border-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`sr-only text-sm transition-colors sm:not-sr-only ${
                      selected ? "text-foreground" : "text-subtle group-hover:text-muted"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {processSteps.map((step, i) => (
            <div
              key={step.title}
              role="tabpanel"
              id={`process-panel-${i}`}
              aria-labelledby={`process-tab-${i}`}
              hidden={i !== active}
              className="panel-in mt-14 grid gap-10 border-t border-border pt-12 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <p
                  aria-hidden
                  className="font-display text-[clamp(5rem,12vw,9rem)] font-semibold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)]"
                >
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{step.title}</h3>
              </div>
              <div className="lg:col-span-7 lg:pt-6">
                <p className="max-w-xl text-lg leading-relaxed text-muted">{step.summary}</p>
                <ul className="mt-8 divide-y divide-border border-y border-border">
                  {step.activities.map((a) => (
                    <li key={a} className="flex items-center gap-4 py-4">
                      <span aria-hidden className="h-px w-6 bg-white/40" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
