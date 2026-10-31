"use client";

import { m, useReducedMotion } from "motion/react";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h2" | "li";
  id?: string;
};

/** Fade-and-rise entrance, fired once when scrolled into view. Skipped for reduced motion. */
export function Reveal({ children, className, delay = 0, as = "div", id }: Props) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  return (
    <Tag
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </Tag>
  );
}
