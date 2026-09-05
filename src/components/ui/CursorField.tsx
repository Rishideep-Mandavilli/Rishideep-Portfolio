"use client";

import { useEffect, useRef, useState } from "react";

export function CursorField() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");
    return () => document.documentElement.classList.remove("custom-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let hovering = false;
    let raf = 0;
    let last = performance.now();

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement | null;
      hovering = !!target?.closest("a, button, input, [role='button'], [data-cursor]");
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.7, 3);
      last = now;

      ringPos.x += (pos.x - ringPos.x) * 0.13 * dt;
      ringPos.y += (pos.y - ringPos.y) * 0.13 * dt;

      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) rotate(45deg) scale(${hovering ? 0.75 : 1})`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`;
      ring.style.borderColor = hovering ? "rgba(200,245,80,0.85)" : "rgba(53,61,77,0.9)";

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] h-9 w-9 rounded-full border"
        style={{ borderColor: "rgba(53,61,77,0.9)" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10002] h-2 w-2 bg-signal shadow-[0_0_12px_rgba(200,245,80,0.95)]"
      />
    </>
  );
}
