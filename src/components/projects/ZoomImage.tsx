"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
import type { QAImage } from "@/data/qa";

/**
 * Image that opens full-size in a native <dialog> (focus trap, Escape, focus restore built in).
 * Keyboard events are stopped at the dialog so that, inside the project overlay,
 * pressing Escape closes only this viewer and not the whole case study.
 */
export function ZoomImage({ image, sizes }: { image: QAImage; sizes: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <figure>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${image.alt}`}
        className="group relative block w-full overflow-hidden border border-border bg-surface transition-colors duration-300 hover:border-foreground"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading="lazy"
          className="h-auto w-full"
        />
        <span
          aria-hidden
          className="absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-full border border-border-strong bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Expand size={16} />
        </span>
      </button>
      {image.caption && <figcaption className="mt-2 text-sm text-muted">{image.caption}</figcaption>}

      <dialog
        ref={ref}
        aria-label={image.alt}
        onClose={() => setOpen(false)}
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          if (e.target === ref.current) setOpen(false);
        }}
        className="m-auto max-h-[94dvh] w-[min(94vw,80rem)] overflow-hidden border border-border-strong bg-background p-0 text-foreground backdrop:bg-black/85"
      >
        {open && (
          <div className="flex max-h-[94dvh] flex-col">
            <div className="min-h-0 flex-1 overflow-auto bg-surface p-3 sm:p-5">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="94vw"
                // Size is set from the known dimensions so the viewer is the right shape before the image loads.
                style={{
                  width: `min(100%, ${((78 * image.width) / image.height).toFixed(2)}dvh)`,
                  maxWidth: `${image.width}px`,
                  height: "auto",
                }}
                className="mx-auto block"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border p-3 sm:p-4">
              <p className="text-sm text-muted">{image.caption ?? image.alt}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close image"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border-strong px-4 text-sm transition-colors hover:border-foreground hover:bg-white/10"
              >
                <X size={16} aria-hidden /> Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </figure>
  );
}
