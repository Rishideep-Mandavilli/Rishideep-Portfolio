"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// ---------------------------------------------------------------------------
// Font pool — 6 distinct fonts for glitch font-swapping
// ---------------------------------------------------------------------------

const FONTS = [
  "inherit",
  "'Courier New', Courier, monospace",
  "'Arial Black', Gadget, sans-serif",
  "Georgia, 'Times New Roman', serif",
  "'Trebuchet MS', 'Lucida Sans Unicode', sans-serif",
  "'Lucida Console', Monaco, monospace",
];

// ---------------------------------------------------------------------------
// Glitch color layers — each shifts in a different direction with its own font
// ---------------------------------------------------------------------------

interface Layer {
  color: string;
  glow: string;
  baseX: number;
  baseY: number;
}

const LAYERS: Layer[] = [
  { color: "#ff0033", glow: "rgba(255,0,51,0.6)", baseX: -6, baseY: 0 },
  { color: "#0066ff", glow: "rgba(0,102,255,0.6)", baseX: 6, baseY: 0 },
  { color: "#00ff44", glow: "rgba(0,255,68,0.5)", baseX: -4, baseY: 3 },
  { color: "#ffee00", glow: "rgba(255,238,0,0.5)", baseX: 5, baseY: -3 },
  { color: "#ff00ff", glow: "rgba(255,0,255,0.45)", baseX: -3, baseY: 5 },
  { color: "#00ffff", glow: "rgba(0,255,255,0.45)", baseX: 4, baseY: -4 },
  { color: "#ff6600", glow: "rgba(255,102,0,0.4)", baseX: -5, baseY: 2 },
  { color: "#cc33ff", glow: "rgba(204,51,255,0.4)", baseX: 3, baseY: -5 },
];

// ---------------------------------------------------------------------------
// GlitchText — full letter-shape + font + color glitch
// ---------------------------------------------------------------------------

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);
  const [tick, setTick] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Deterministic RNG from seed
  const rng = useCallback(
    (seed: number) => {
      const x = Math.sin(seed * 12.9898 + tick * 78.233) * 43758.5453;
      return x - Math.floor(x);
    },
    [tick],
  );

  const trigger = useCallback(() => {
    if (glitching) return;
    setGlitching(true);
    setTick(0);

    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Flicker every 70ms for rapid visual change
    intervalRef.current = setInterval(() => setTick((t) => t + 1), 70);

    // Random duration 3–5 seconds
    const duration = 3000 + rng(777) * 2000;
    timerRef.current = setTimeout(() => {
      setGlitching(false);
      setTick(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, duration);
  }, [glitching, rng]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ isolation: "isolate" }}
      onMouseEnter={trigger}
      onClick={trigger}
    >
      {/* Base text — hidden during glitch, visible otherwise */}
      <span
        className="relative z-[3] block transition-opacity duration-100"
        style={{ opacity: glitching ? 0 : 1 }}
      >
        {text}
      </span>

      {/* Glitch layers — each is a full text copy with different font/color/shift */}
      {glitching &&
        LAYERS.map((layer, i) => {
          // Each layer is independently randomized per tick
          const r1 = rng(i * 10 + 1);
          const r2 = rng(i * 10 + 2);
          const r3 = rng(i * 10 + 3);
          const r4 = rng(i * 10 + 4);
          const r5 = rng(i * 10 + 5);
          const r6 = rng(i * 10 + 6);

          // Only show ~60% of layers per frame
          if (r1 < 0.4) return null;

          // Pick a random font from the pool
          const fontIdx = Math.floor(r2 * FONTS.length);
          const fontFamily = FONTS[fontIdx];

          // Random horizontal/vertical offset with added jitter
          const offsetX = layer.baseX + (r3 - 0.5) * 8;
          const offsetY = layer.baseY + (r4 - 0.5) * 6;

          // Clip: only 40% of layers get sliced, rest show full text
          // When sliced, use gentle ranges so both words stay visible
          let clipPath = "none";
          if (r5 > 0.6) {
            const clipTop = Math.floor(r5 * 25);
            const clipBottom = 100 - clipTop - Math.floor(r6 * 20);
            clipPath = `inset(${clipTop}% 0 ${clipBottom}% 0)`;
          }

          // Random skew for letter distortion
          const skewX = (r6 - 0.5) * 10;

          // Random letter-spacing distortion
          const letterSpacing = r3 > 0.7 ? "0.06em" : r3 > 0.4 ? "-0.02em" : "normal";

          // Random font-weight
          const fontWeight = r4 > 0.6 ? 900 : r4 > 0.3 ? 700 : 400;

          return (
            <span
              key={i}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2] block"
              style={{
                // Text styling
                color: layer.color,
                fontFamily,
                fontWeight,
                letterSpacing,

                // Shape distortion
                transform: `translate(${offsetX}px, ${offsetY}px) skewX(${skewX}deg)`,
                clipPath,

                // Visual effects
                opacity: 0.55 + r1 * 0.4,
                mixBlendMode: "screen",
                textShadow: `0 0 6px ${layer.glow}, 0 0 14px ${layer.glow}, 0 0 24px ${layer.glow}`,
                filter: r5 > 0.8 ? "blur(0.5px)" : "none",

                // Prevent interaction
                userSelect: "none",
                WebkitFontSmoothing: "none",
                transition: "none",
                overflow: "visible",
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </span>
          );
        })}

      {/* Extra white flash slice — cuts through all layers */}
      {glitching && rng(999) > 0.45 && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] block"
          style={{
            color: "rgba(255,255,255,0.85)",
            clipPath: `inset(${15 + Math.floor(rng(998) * 50)}% 0 ${20 + Math.floor(rng(997) * 50)}% 0)`,
            transform: `translateX(${(rng(996) > 0.5 ? 1 : -1) * (8 + rng(995) * 8)}px) skewX(${(rng(994) - 0.5) * 15}deg)`,
            fontFamily: "'Courier New', Courier, monospace",
            fontWeight: 900,
            letterSpacing: "0.1em",
            textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)",
            userSelect: "none",
            transition: "none",
            overflow: "visible",
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}
