"use client";

import { m, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

// ViewBox is 460 x 400. Labels sit outside the circles, anchored to the edges so none can clip.
const circles = [
  { cx: 230, cy: 135, label: "Web development", x: 230, y: 16, anchor: "middle" as const },
  { cx: 160, cy: 250, label: "Software engineering", x: 0, y: 392, anchor: "start" as const },
  { cx: 300, cy: 250, label: "Quality assurance", x: 460, y: 392, anchor: "end" as const },
];

/** Three overlapping areas of interest, with an IT background at the centre. */
export function InterestDiagram() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 460 400"
      role="img"
      aria-label="Diagram: web development, software engineering and quality assurance overlap, with an Information Technology background at the centre."
      className="h-auto w-full max-w-md"
    >
      {circles.map((c, i) => (
        <m.circle
          key={c.label}
          cx={c.cx}
          cy={c.cy}
          r={100}
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: i * 0.18 }}
        />
      ))}
      {circles.map((c) => (
        <text
          key={c.label}
          x={c.x}
          y={c.y}
          textAnchor={c.anchor}
          fill="#a1a1aa"
          fontSize={14}
          letterSpacing={1.5}
          fontFamily="var(--font-geist-mono), monospace"
        >
          {c.label.toUpperCase()}
        </text>
      ))}
      <text
        x={230}
        y={214}
        textAnchor="middle"
        fill="#f4f4f5"
        fontSize={13}
        letterSpacing={1.5}
        fontFamily="var(--font-geist-mono), monospace"
      >
        IT BACKGROUND
      </text>
    </svg>
  );
}
