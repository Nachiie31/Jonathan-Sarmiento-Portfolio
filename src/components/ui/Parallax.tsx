"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Moves its children vertically at a different rate than the page. Static for reduced motion. */
export function Parallax({
  children,
  distance = 80,
  className,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <m.div ref={ref} style={{ y: reduce ? 0 : y }} className={className}>
      {children}
    </m.div>
  );
}
