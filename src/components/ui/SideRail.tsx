"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "hero", label: "identity" },
  { id: "skills", label: "capability" },
  { id: "projects", label: "case files" },
  { id: "contact", label: "contact" },
];

export function SideRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-5"
    >
      <span className="h-2 w-2 rotate-45 bg-signal shadow-[0_0_10px_rgba(200,245,80,0.8)]" />

      <span className="h-8 w-px bg-line-strong" />

      <ul className="flex flex-col items-center gap-4">
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id} className="group relative flex items-center">
              <button
                onClick={() =>
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                }
                aria-label={`Go to ${label}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex h-6 items-center"
              >
                <span
                  className={`w-px transition-all duration-300 ${
                    isActive
                      ? "h-6 bg-signal shadow-[0_0_8px_rgba(200,245,80,0.9)]"
                      : "h-2 bg-line-strong group-hover:bg-dim"
                  }`}
                />
              </button>
              <span className="pointer-events-none absolute left-6 whitespace-nowrap border border-line-strong bg-panel/95 px-2 py-1 font-terminal text-[10px] uppercase tracking-wider text-mist opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {label}
              </span>
            </li>
          );
        })}
      </ul>

      <span className="h-8 w-px bg-line-strong" />

      <span className="font-terminal text-[9px] uppercase tracking-[0.3em] text-faint [writing-mode:vertical-rl]">
        scroll
      </span>
    </nav>
  );
}
