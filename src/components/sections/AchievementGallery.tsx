"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Expand, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Achievement } from "@/data/achievements";

/**
 * Grid of achievements. Images open in a native <dialog> viewer, which gives
 * focus trapping, Escape-to-close and focus restoration without extra code.
 * Frames use object-contain so certificates are never cropped.
 */
export function AchievementGallery({ items }: { items: Achievement[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = active !== null ? items[active] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) dialog.showModal();
    if (active === null && dialog.open) dialog.close();
  }, [active]);

  // Lock page scroll while the viewer is open.
  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={`${item.title}-${i}`} delay={(i % 3) * 0.08}>
            {item.image ? (
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View larger: ${item.title}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden border border-border bg-surface transition-colors duration-300 hover:border-foreground"
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  loading="lazy"
                  className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-full border border-border-strong bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand size={16} />
                </span>
              </button>
            ) : (
              <div
                aria-hidden
                className="flex aspect-[4/3] w-full items-end border border-dashed border-border-strong bg-surface p-4"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
                  Image placeholder · /public/achievements/
                </span>
              </div>
            )}

            <div className="mt-5 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              <span>{item.category}</span>
              <span>{item.date}</span>
            </div>
            <h3 className="mt-3 font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{item.issuer}</p>
            <p className="mt-4 text-muted">{item.description}</p>
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-4 inline-flex min-h-11 items-center gap-1.5 border-b border-border-strong text-sm transition-colors hover:border-foreground"
              >
                {item.link.label}
                <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
          </Reveal>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current ? current.title : "Achievement image"}
        onClose={() => setActive(null)}
        onClick={(e) => {
          // A click on the dimmed backdrop targets the dialog element itself.
          if (e.target === dialogRef.current) setActive(null);
        }}
        className="m-auto max-h-[94dvh] w-[min(94vw,72rem)] overflow-hidden border border-border-strong bg-background p-0 text-foreground backdrop:bg-black/85"
      >
        {current?.image && (
          <figure className="flex max-h-[94dvh] flex-col">
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-surface p-3 sm:p-6">
              <Image
                src={current.image.src}
                alt={current.image.alt}
                width={current.image.width}
                height={current.image.height}
                sizes="(min-width: 1024px) 70vw, 94vw"
                className="h-auto max-h-[72dvh] w-auto max-w-full object-contain"
              />
            </div>
            <figcaption className="flex items-start justify-between gap-4 border-t border-border p-4 sm:p-5">
              <div>
                <p className="font-display text-lg font-medium tracking-tight">{current.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {current.issuer} · {current.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close image"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border-strong px-4 text-sm transition-colors hover:border-foreground hover:bg-white/10"
              >
                <X size={16} aria-hidden /> Close
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
