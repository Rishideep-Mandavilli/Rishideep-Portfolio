"use client";

import { useState, useRef, useEffect } from "react";

type Item = { label: string; type: "name" | "sep" | "tag" | "status" };

const ITEMS: Item[] = [
  { label: "Rishideep Mandavilli", type: "name" as const },
  { label: "◆", type: "sep" as const },
  { label: "Portfolio Website", type: "name" as const },
  { label: "◆", type: "sep" as const },
  { label: "Developer", type: "tag" as const },
  { label: "◆", type: "sep" as const },
  { label: "AI & Automation", type: "tag" as const },
  { label: "◆", type: "sep" as const },
  { label: "Full-Stack Engineer", type: "tag" as const },
  { label: "◆", type: "sep" as const },
  { label: "Systems Thinker", type: "tag" as const },
  { label: "◆", type: "sep" as const },
  { label: "Available for Work", type: "status" as const },
  { label: "◆", type: "sep" as const },
];

const ITEM_H = 220;
const STRAP_W = 50; // increased for vertical text
const VISIBLE_ITEMS = 4;
const SCROLL_DURATION = 18;

function VerticalStrap() {
  const [paused, setPaused] = useState(false);
  const [oneSetH, setOneSetH] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      if (innerRef.current) {
        const children = innerRef.current.querySelectorAll("[data-item]");
        const itemCount = children.length;
        const oneSetCount = Math.floor(itemCount / 2);

        if (oneSetCount > 0 && children[oneSetCount]) {
          const h =
            (children[oneSetCount] as HTMLElement).offsetTop -
            (children[0] as HTMLElement).offsetTop;
          setOneSetH(h);
        }
      }
    }, 300);

    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className="fixed z-[9985] pointer-events-none"
      style={{
        bottom: 36,
        right: 96,
        width: STRAP_W,
        height: VISIBLE_ITEMS * ITEM_H + 8,
      }}
    >
      <div
        className="relative w-full h-full overflow-hidden rounded-xl border border-stone-200/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] cursor-default pointer-events-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          background: `
            linear-gradient(
              180deg,
              #c7d2fe,
              #a5f3fc,
              #bbf7d0,
              #fbcfe8,
              #fde68a,
              #c7d2fe
            )
          `,
          backgroundSize: "100% 300%",
          animation: "gradientFlow 8s linear infinite",
        }}
      >
        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-10 z-10 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-10 z-10 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

        {/* Scroll */}
        <div
          ref={innerRef}
          className="flex flex-col items-center py-1"
          style={{
            animationName: oneSetH > 0 ? "vScroll" : "none",
            animationDuration: `${SCROLL_DURATION}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <div
              key={i}
              data-item
              className="flex items-center justify-center text-center flex-shrink-0"
              style={{
                height: ITEM_H,
                width: STRAP_W,
                padding: "0 6px",
              }}
            >
              {item.type === "sep" ? (
                <span className="vertical-text text-[8px] text-stone-400">
                  {item.label}
                </span>
              ) : item.type === "name" ? (
                <span className="vertical-text text-[12px] font-bold text-stone-800">
                  {item.label}
                </span>
              ) : item.type === "status" ? (
                <span className="vertical-text text-[10px] font-semibold text-emerald-700">
                  ● {item.label}
                </span>
              ) : item.type === "tag" ? (
                <span className="vertical-text text-[10px] font-semibold text-stone-600">
                  {item.label}
                </span>
              ) : (
                <span className="vertical-text text-[10px] text-stone-500">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Animations + Vertical Text */}
      <style>{`
        @keyframes vScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(${oneSetH > 0 ? `-${oneSetH}px` : "-400px"}); }
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }

        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          line-height: 1;
        }
      `}</style>
    </div>
  );
}

export { VerticalStrap };