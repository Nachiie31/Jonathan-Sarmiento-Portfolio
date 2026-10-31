"use client";

import { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium tracking-wide transition-colors duration-300";
const variants = {
  primary: "bg-foreground text-background hover:bg-white",
  secondary: "border border-border-strong text-foreground hover:border-foreground hover:bg-white/5",
};

/** Link that gently follows the pointer. Disabled for touch devices and reduced motion. */
export function MagneticLink({ href, children, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </m.a>
  );
}
