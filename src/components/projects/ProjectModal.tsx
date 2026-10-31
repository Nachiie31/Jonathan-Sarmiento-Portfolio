"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { m, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { clearOrigin, peekOrigin } from "@/lib/transition";

const OPEN_CLIP = "inset(0px 0px 0px 0px round 0px)";
const px = (n: number) => `${Math.max(0, Math.round(n))}px`;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen case study overlay. It expands out of the clicked preview, keeps the URL in sync
 * (browser back closes it), locks page scroll, traps focus and restores it on close.
 */
export function ProjectModal({ children, label }: { children: React.ReactNode; label: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const [origin] = useState(() => (typeof window === "undefined" ? null : peekOrigin()));

  const clip =
    origin && !reduce
      ? `inset(${px(origin.top)} ${px(origin.right)} ${px(origin.bottom)} ${px(origin.left)} round 6px)`
      : null;

  const closed = clip ? { clipPath: clip, opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 24 };
  const open = clip ? { clipPath: OPEN_CLIP, opacity: 1, y: 0 } : { opacity: 1, y: 0 };

  // Scroll lock, initial focus, focus restoration.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
      clearOrigin();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  // Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setClosing(true);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Moving to another project inside the overlay starts it at the top.
  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [pathname]);

  function trapTab(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab" || !ref.current) return;
    const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <m.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={trapTab}
      initial={closed}
      animate={closing ? closed : open}
      transition={{ duration: reduce ? 0.2 : closing ? 0.5 : 0.8, ease: EASE_OUT_EXPO }}
      onAnimationComplete={() => {
        if (closing) router.back();
      }}
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-background outline-none"
    >
      <button
        type="button"
        onClick={() => setClosing(true)}
        aria-label="Close project"
        className="fixed right-4 top-4 z-10 inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong bg-background/80 px-5 text-sm backdrop-blur-md transition-colors hover:border-foreground hover:bg-white/10 sm:right-8 sm:top-6"
      >
        <X size={16} aria-hidden /> Close
      </button>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: closing ? 0.2 : 0.5, delay: closing || !clip ? 0 : 0.35 }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
