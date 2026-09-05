"use client";

import { useRef, useCallback, useEffect, useState } from "react";

const MASK_RADIUS = 82;
const COMPACT_RADIUS = 56;
const SMOOTHING = 0.12;

function MaskReveal({ src, compact = false }: { src: string; compact?: boolean }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const radius = compact ? COMPACT_RADIUS : MASK_RADIUS;

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
    setHidden();
  }, [setHidden]);

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
        const mask = `radial-gradient(circle ${radius}px at ${p.x}px ${p.y}px, white 85%, transparent 100%)`;
        imgRef.current.style.webkitMaskImage = mask;
        imgRef.current.style.maskImage = mask;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    setHidden();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hovering, setHidden, radius]);

  return (
    <div
      className={`relative overflow-hidden cursor-crosshair border border-line bg-raised ${
        compact ? "h-16 w-16 shrink-0" : ""
      }`}
      style={compact ? undefined : { width: "100%", height: 220 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <img
        ref={imgRef}
        src={src}
        alt="profile"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        style={{ willChange: "mask, -webkit-mask" }}
      />

      {!compact && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200"
          style={{ opacity: hovering ? 0 : 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-terminal text-[11px] uppercase tracking-wider text-mist">Hover to reveal</span>
          </div>
        </div>
      )}
    </div>
  );
}

export { MaskReveal };
