/**
 * Remembers where the clicked preview sat on screen so the project overlay can
 * expand out of it. Stored as clip-path inset values (px from each viewport edge).
 */
export type Origin = { top: number; right: number; bottom: number; left: number };

let origin: Origin | null = null;

export function setOrigin(rect: DOMRect) {
  origin = {
    top: rect.top,
    right: window.innerWidth - rect.right,
    bottom: window.innerHeight - rect.bottom,
    left: rect.left,
  };
}

export const peekOrigin = () => origin;
export const clearOrigin = () => {
  origin = null;
};
