"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const SKILLS = [
  { title: "AI", color: "#22c55e", depth: 0.2 },
  { title: "ML", color: "#a855f7", depth: 0.4 },
  { title: "DEV", color: "#f59e0b", depth: 0.6 },
  { title: "REACT", color: "#3b82f6", depth: 0.8 },
  { title: "NEXT", color: "#64748b", depth: 1 },
];

export function SkillsDepth() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  // motion value representing 0..1 progress of section visibility
  const progress = useMotionValue(0);

  // custom scroll loop calculates progress reliably
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;

    function update() {
      const rect = (root as HTMLDivElement).getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // compute progress where:
      // when section top is at bottom -> 0
      // when section bottom is at top -> 1
      const total = rect.height + vh;
      const visibleFromTop = vh - rect.top; // how many px of section passed top of viewport
      const raw = visibleFromTop / total;
      const clamped = Math.max(0, Math.min(1, raw));

      progress.set(clamped);
    }

    function loop() {
      update();
      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    // also update on resize (keeps values accurate)
    const onResize = () => update();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [progress]);

  return (
    <section
      ref={rootRef}
      className="h-[200vh] flex flex-col items-center justify-start relative"
      style={{ perspective: 1000 }}
    >
      <div className="text-center mb-20 z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Skills</h2>
      </div>

      <div className="relative w-full h-[520px] flex items-center justify-center">
        {SKILLS.map((skill, i) => {
          // map progress (0..1) to transforms per-card
          const y = useTransform(
            progress,
            [0, 1],
            [400 * skill.depth, -400 * skill.depth]
          );

          const x = useTransform(
            progress,
            [0, 1],
            [-150 * skill.depth, 150 * skill.depth]
          );
          const scale = useTransform(progress, [0, 1], [1 + skill.depth * 0.08, 1 - skill.depth * 0.02]);
          const opacity = useTransform(progress, [0, 0.5, 1], [0.35, 1, 0.35]);

          return (
            <motion.div
              key={i}
              style={{ y, scale, opacity }}
              whileHover={{ scale: 1.06, rotateX: -6, rotateY: 6 }}
              className="absolute"
            >
              <div
                className="rounded-xl p-6 flex items-center justify-center"
                style={{
                  width: 320,
                  height: 180,
                  background: `linear-gradient(145deg, ${skill.color}30, #f5f5f4)`,
                  border: `1px solid ${skill.color}80`,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.6)",
                }}
              >
                <h3 className="text-2xl font-bold text-stone-900">{skill.title}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}