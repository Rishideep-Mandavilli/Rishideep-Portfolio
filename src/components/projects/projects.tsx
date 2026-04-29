"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------

const PROJECTS = [
  {
    title: "AI Code Reviewer",
    description: "Automated PR analysis with LLM-powered code quality checks",
    gradient: "from-violet-600 to-indigo-900",
    tags: ["TypeScript", "Python", "LLM"],
    icon: "🤖",
  },
  {
    title: "Real-time Collab Whiteboard",
    description: "Multiplayer canvas with WebSocket sync and vector tools",
    gradient: "from-emerald-600 to-teal-900",
    tags: ["React", "WebSocket", "Canvas"],
    icon: "🎨",
  },
  {
    title: "Portfolio Motion Engine",
    description: "Scroll-driven 3D animations with physics-based transitions",
    gradient: "from-amber-500 to-orange-800",
    tags: ["Three.js", "Framer", "Next"],
    icon: "⚡",
  },
  {
    title: "Distributed Task Queue",
    description: "Fault-tolerant job scheduling with Redis-backed workers",
    gradient: "from-rose-600 to-pink-900",
    tags: ["Go", "Redis", "Docker"],
    icon: "📦",
  },
  {
    title: "Design System Library",
    description: "Accessible component kit with automated visual regression",
    gradient: "from-sky-500 to-blue-800",
    tags: ["React", "Storybook", "A11y"],
    icon: "🎯",
  },
];

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CARD_WIDTH = 420;
const CARD_HEIGHT = 260;
const EASING = "cubic-bezier(0.19, 1, 0.22, 1)";
const TRANSITION_DURATION = 600;

// ---------------------------------------------------------------------------
// ProjectCard — 3D transformed card
// ---------------------------------------------------------------------------

interface CardProps {
  project: (typeof PROJECTS)[number];
  offset: number;
  onClick: () => void;
}

function ProjectCard({ project, offset, onClick }: CardProps) {
  const absOffset = Math.abs(offset);

  const transform = `
    translate(-50%, -50%)
    rotateY(${offset * 55}deg)
    translateX(${offset * 360}px)
    translateZ(${Math.abs(offset) * -220}px)
    scale(${offset === 0 ? 1.08 : 0.85})
  `;

  const opacity = absOffset > 2 ? 0 : 1;
  const zIndex = 100 - absOffset;

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      onClick={onClick}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        left: "50%",
        top: "50%",
        transform,
        opacity,
        zIndex,
        boxShadow:
          offset === 0
            ? "0 30px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)"
            : "0 10px 30px rgba(0,0,0,0.12)",
        transition: `all ${TRANSITION_DURATION}ms ${EASING}`,
        transformStyle: "preserve-3d" as const,
        backfaceVisibility: "hidden",
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-6">
          {/* Top: icon + tags */}
          <div className="flex items-start justify-between">
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/15 text-white/90 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-2xl opacity-80">{project.icon}</span>
          </div>

          {/* Bottom: title + description */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-1.5 tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-white/65 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Active card border */}
        {offset === 0 && (
          <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Projects — 3D curved carousel
// ---------------------------------------------------------------------------

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = PROJECTS.length;

  const goLeft = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goRight = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Heading */}
      <div className="relative z-10 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200/80 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
          <span className="text-[11px] font-medium text-stone-500 tracking-wider uppercase">Portfolio</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight">Select Projects</h2>
      </div>

      {/* Carousel viewport */}
      <div
        className="relative h-[520px] flex items-center justify-center w-full max-w-6xl mx-auto"
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      >
        {PROJECTS.map((project, i) => {
          const offset = i - activeIndex;
          const half = Math.floor(total / 2);
          const wrappedOffset =
            offset > half ? offset - total : offset < -half ? offset + total : offset;

          return (
            <ProjectCard
              key={project.title}
              project={project}
              offset={wrappedOffset}
              onClick={() => setActiveIndex(i)}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex items-center gap-5 mt-10">
        <button
          onClick={goLeft}
          className="group w-11 h-11 rounded-full border border-stone-200 bg-white flex items-center justify-center transition-all hover:bg-stone-50 hover:border-stone-300 hover:shadow-sm active:scale-95"
          aria-label="Previous project"
        >
          <svg className="w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 h-2 bg-stone-700"
                  : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goRight}
          className="group w-11 h-11 rounded-full border border-stone-200 bg-white flex items-center justify-center transition-all hover:bg-stone-50 hover:border-stone-300 hover:shadow-sm active:scale-95"
          aria-label="Next project"
        >
          <svg className="w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
