"use client";

import { useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleGrid, AutoCamera } from "./MagneticText";
import { MaskReveal } from "./MaskReveal";
import { TimeGreeting } from "@/components/ui/TimeGreeting";

interface HeroProps {
  skillsRef: React.RefObject<HTMLElement | null>;
  projectsRef: React.RefObject<HTMLElement | null>;
  contactRef: React.RefObject<HTMLElement | null>;
}

function Hero({ skillsRef, projectsRef, contactRef }: HeroProps) {
  const scrollTo = useCallback(
    (ref: React.RefObject<HTMLElement | null>) => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const scrollToSkills = useCallback(() => {
    scrollTo(skillsRef);
  }, [scrollTo, skillsRef]);

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-24 pb-16 md:px-10 lg:px-14">
      <svg
        className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full opacity-60 lg:block"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M118 710 C 366 620, 438 338, 650 360 S 992 640, 1320 232"
          fill="none"
          stroke="rgba(164,211,204,0.16)"
          strokeWidth="1"
        />
        <path
          d="M88 250 C 320 210, 466 120, 690 210 S 1020 360, 1290 120"
          fill="none"
          stroke="rgba(214,174,124,0.11)"
          strokeWidth="1"
        />
      </svg>

      <div className="section-shell relative z-10 grid min-h-[calc(100vh-112px)] items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="max-w-xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-stone-400">
            <TimeGreeting />
            <span className="h-px w-8 bg-stone-700" />
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase text-[#a4d3cc]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a4d3cc]" />
              Available for selected builds
            </span>
          </div>

          <p className="mb-4 font-mono text-xs uppercase text-stone-500">
            Portfolio / AI systems / inspectable interfaces
          </p>
          <h1 className="text-5xl font-semibold leading-[0.98] text-stone-100 md:text-7xl">
            I build AI systems you can inspect.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-stone-400 md:text-lg">
            Interfaces for automation, computer vision, and assistant workflows
            where the logic is not hidden behind a black box. Every section is
            built as something you can test, trace, or route.
          </p>

          <div className="mt-8 grid max-w-lg grid-cols-3 border-y border-stone-800">
            {[
              ["03", "case studies"],
              ["05", "system nodes"],
              ["397kB", "current JS"],
            ].map(([value, label]) => (
              <div key={label} className="border-r border-stone-800 py-4 last:border-r-0">
                <div className="font-mono text-xl text-stone-100">{value}</div>
                <div className="mt-1 text-xs uppercase text-stone-500">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo(projectsRef)}
              className="group inline-flex items-center gap-3 rounded-full border border-[#a4d3cc] bg-[#a4d3cc] px-5 py-3 text-sm font-semibold text-black transition-transform active:scale-[0.98]"
            >
              View case files
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>

            <button
              onClick={scrollToSkills}
              className="inline-flex items-center gap-3 rounded-full border border-stone-700 bg-black/50 px-5 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-500"
            >
              Inspect capabilities
            </button>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-2 gap-2 text-xs text-stone-500 sm:grid-cols-4">
            {["identity renderer", "case engine", "capability map", "signal router"].map((item) => (
              <div key={item} className="border border-stone-800 bg-black/45 px-3 py-2 font-mono uppercase">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="border border-stone-700 bg-[#050505] p-3 shadow-[0_24px_100px_rgba(0,0,0,0.48)]">
            <div className="mb-3 flex items-center justify-between border-b border-stone-800 pb-3 font-mono text-[11px] uppercase">
              <span className="text-[#a4d3cc]">identity renderer</span>
              <span className="text-stone-600">pointer field enabled</span>
            </div>
            <div className="noise-surface h-[310px] overflow-hidden border border-stone-700 bg-stone-100 md:h-[420px]">
              <Canvas
                camera={{ position: [0, 0, 3.5], fov: 50 }}
                style={{ width: "100%", height: "100%" }}
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
              >
                <AutoCamera />
                <ParticleGrid />
              </Canvas>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase text-stone-500">
              <span>move cursor to disturb the name field</span>
              <button
                onClick={() => scrollTo(contactRef)}
                className="border border-stone-700 px-3 py-1.5 text-[#d6ae7c] transition-colors hover:border-[#d6ae7c]"
              >
                route signal
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_240px]">
            <div className="border border-stone-800 bg-black/60 p-4">
              <div className="font-mono text-[11px] uppercase text-stone-500">
                Field note
              </div>
              <div className="mt-2 text-sm leading-6 text-stone-300">
                This is not a static resume surface. The site is arranged as an
                inspectable operating layer: identity, capability, work evidence,
                and contact routing.
              </div>
            </div>
            <div className="hidden border border-stone-800 bg-black/50 p-2 md:block">
              <div className="mb-2 font-mono text-[10px] uppercase text-stone-600">
                operator reveal
              </div>
              <MaskReveal src="/Rishideep-Mandavilli.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
