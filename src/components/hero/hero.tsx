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

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-10 pt-24 sm:px-6 md:px-10 lg:px-14">
      <div className="section-shell w-full max-w-none lg:pl-16">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-terminal text-[13px] text-dim">
          <TimeGreeting />
          <span className="hidden h-px w-8 bg-line-strong sm:block" />
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_rgba(200,245,80,0.9)]" />
            Available for selected builds
          </span>
          <span className="ml-auto hidden font-terminal text-[11px] uppercase tracking-widest text-faint md:block">
            portfolio / ai systems / inspectable interfaces
          </span>
        </div>

        <h1 className="max-w-[14ch] text-[clamp(3rem,9.5vw,7.75rem)] font-semibold leading-[0.94] tracking-tighter text-paper">
          I build AI systems you can{" "}
          <span className="text-signal">inspect</span>.
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="flex flex-col justify-between gap-10">
            <p className="max-w-md text-lg leading-8 text-mist">
              Interfaces for automation, computer vision, and assistant
              workflows where the logic is not hidden behind a black box. Every
              section is built as something you can test, trace, or route.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo(projectsRef)}
                className="group inline-flex min-h-12 items-center justify-center gap-3 bg-signal px-6 py-3 font-terminal text-sm font-semibold text-black shadow-[0_0_28px_rgba(200,245,80,0.22)] transition-all hover:shadow-[0_0_40px_rgba(200,245,80,0.38)] active:scale-[0.98]"
              >
                View case files
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => scrollTo(contactRef)}
                className="min-h-9 border border-line-strong px-3 py-1.5 font-terminal text-[11px] uppercase tracking-wider text-mist transition-colors hover:border-signal hover:text-signal"
              >
                route signal →
              </button>
            </div>

            <div className="hidden max-w-md border-l border-line pl-5 lg:block">
              <div className="font-terminal text-[11px] uppercase tracking-wider text-faint">
                Field note
              </div>
              <div className="mt-2 text-sm leading-6 text-mist">
                This is not a static resume surface. The site is arranged as an
                inspectable operating layer: identity, capability, work
                evidence, and contact routing.
              </div>
            </div>
          </div>

          <div className="border border-line bg-panel p-3 shadow-[0_24px_100px_rgba(0,0,0,0.48)]">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 font-terminal text-[11px] uppercase tracking-wider">
              <span className="text-signal">identity renderer</span>
              <span className="text-faint">pointer field enabled</span>
            </div>
            <div className="noise-surface relative h-[min(58vw,300px)] min-h-[220px] overflow-hidden border border-line bg-well md:h-[360px]">
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
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <span className="font-terminal text-[11px] uppercase tracking-wider text-faint">
                move cursor to disturb the name field
              </span>
              <MaskReveal compact src="/Rishideep-Mandavilli.jpg" />
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-y-4 border-t border-line py-6 md:grid-cols-4">
          {[
            ["03", "case studies"],
            ["05", "system nodes"],
            ["397kB", "current JS"],
            ["1M", "context tokens"],
          ].map(([value, label]) => (
            <div key={label} className="pr-4">
              <div className="font-terminal text-xl text-paper">{value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-faint">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Hero };
