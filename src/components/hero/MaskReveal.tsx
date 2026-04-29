"use client";

import { useRef, useCallback, useEffect, useState } from "react";

const MASK_RADIUS = 82;
const SMOOTHING = 0.12;

function MaskReveal({ src }: { src: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const setHidden = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.style.webkitMaskImage =
        "radial-gradient(circle 0px at 0px 0px, white 0%, transparent 100%)";
      imgRef.current.style.maskImage =
        "radial-gradient(circle 0px at 0px 0px, white 0%, transparent 100%)";
    }
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    posRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!hovering) setHovering(true);
  }, [hovering]);

  const handleLeave = useCallback(() => {
    setHovering(false);
    // Immediately hide
    setHidden();
  }, [setHidden]);

  // rAF loop — ALWAYS runs, shows mask when hovering, hides when not
  useEffect(() => {
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (!imgRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (hovering) {
        const p = posRef.current;
        const mask = `radial-gradient(circle ${MASK_RADIUS}px at ${p.x}px ${p.y}px, white 85%, transparent 100%)`;
        imgRef.current.style.webkitMaskImage = mask;
        imgRef.current.style.maskImage = mask;
      }
      // When NOT hovering, do nothing — handleLeave already set it to hidden

      rafRef.current = requestAnimationFrame(tick);
    };

    // Start hidden
    setHidden();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hovering, setHidden]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-crosshair border border-stone-200/60 bg-white/50 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
      style={{ width: "100%", height: 220 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Image — mask updated directly via DOM (no React re-render) */}
      <img
        ref={imgRef}
        src={src}
        alt="profile"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        style={{ willChange: "mask, -webkit-mask" }}
      />

      {/* Hint overlay — shown when not hovering */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
        style={{ opacity: hovering ? 0 : 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <svg className="w-6 h-6 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[11px] font-medium text-stone-300 tracking-wide">Hover to reveal</span>
        </div>
      </div>
    </div>
  );
}

export { MaskReveal };
