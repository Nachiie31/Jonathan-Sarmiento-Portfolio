"use client";

import { LazyMotion, MotionConfig } from "motion/react";

// Animation features are fetched after first paint, keeping the initial JavaScript small.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

/**
 * Provides lazy-loaded animation features and makes every animation honour the
 * visitor's "reduce motion" OS setting. `strict` makes any stray full `motion.*` import fail loudly.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
