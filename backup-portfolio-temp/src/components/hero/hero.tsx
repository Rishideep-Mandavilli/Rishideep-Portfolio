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
    <section className="min-h-screen flex items-center px-6 md:px-10 lg:px-14 relative overflow-hidden pt-16">
      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        {/* Time Greeting */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-stone-400">
            <TimeGreeting />
          </span>
        </div>

        {/* Status label */}
        <div className="inline-flex items-center gap-2 mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium text-stone-400 tracking-wider uppercase">
            Available for work
          </span>
        </div>

        {/* Particle Grid Canvas — structured grid with name */}
        <div className="mb-6">
          <div className="h-72 md:h-80 lg:h-96 w-full rounded-2xl overflow-hidden border border-stone-200/40 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_30px_rgba(0,0,0,0.04)]">
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
        </div>

        {/* Subtext */}
        <p className="text-base md:text-lg text-stone-400 mb-8 font-light tracking-wide flex items-center gap-2">
          <span className="w-4 h-[1px] bg-stone-300 inline-block" />
          Building Intelligent Systems
        </p>

        {/* Buttons — working scroll-to-section */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => scrollTo(projectsRef)}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-800 text-stone-50 text-sm font-medium hover:bg-stone-700 active:scale-[0.98] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer"
          >
            View Projects
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => scrollTo(contactRef)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-stone-200 text-stone-500 text-sm font-medium hover:bg-stone-50 hover:border-stone-300 active:scale-[0.98] transition-all cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>

      {/* RIGHT SIDE — profile image mask reveal */}
      <div className="hidden md:flex flex-1 justify-center items-center relative z-10 ml-4">
        <MaskReveal src="/Rishideep-Mandavilli.jpg" />
      </div>
    </section>
  );
}

export { Hero };