"use client";

import { useState, useRef, useEffect } from "react";

const SKILLS = [
  { title: "AI", color: "#22c55e" },
  { title: "ML", color: "#a855f7" },
  { title: "DEV", color: "#f59e0b" },
  { title: "REACT", color: "#3b82f6" },
  { title: "NEXT", color: "#64748b" },
];

function SkillsDrop() {
  const [index, setIndex] = useState(0);
  const [isCutting, setIsCutting] = useState(false);

  const lockRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 🔥 physics refs
  const angle = useRef(0.4);
  const velocity = useRef(0);

  const fallY = useRef(0);
  const fallVel = useRef(0);

  const rafRef = useRef<number | null>(null);

  const skill = SKILLS[index];

  // ✅ UPDATED PHYSICS CONSTANTS
  const GRAVITY = 0.035;
  const DAMPING = 0.992;

  // ✅ REAL PHYSICS LOOP (IMPROVED)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf: number;

    const loop = () => {
      const deg = (angle.current * 180) / Math.PI;
      const stretch = 1 + Math.abs(velocity.current) * 0.15;

      if (!isCutting) {
        // pendulum physics
        const acc = -GRAVITY * Math.sin(angle.current);

        velocity.current += acc;
        velocity.current *= DAMPING;
        angle.current += velocity.current;

        el.style.transform = `rotate(${deg}deg) scaleY(${stretch})`;
      } else {
        // falling physics (momentum preserved)
        fallVel.current += 0.9;
        fallY.current += fallVel.current;

        const spin = velocity.current * 50;

        // rope bending illusion
        const bendRaw = velocity.current * 120;
        const bend = Math.max(-8, Math.min(8, bendRaw));

        el.style.transform = `
           rotate(${deg}deg)
           skewX(${bend}deg)
           scaleY(${stretch})
        `;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [isCutting]);

  // ✅ CUT HANDLER (IMPROVED RESET)
  const triggerCut = () => {
    if (lockRef.current) return;

    lockRef.current = true;
    setIsCutting(true);

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % SKILLS.length);

      // 🔥 better reset (natural variation)
      angle.current = Math.random() * 0.4 + 0.2;
      velocity.current = (Math.random() - 0.5) * 0.1;

      fallY.current = 0;
      fallVel.current = 0;

      setIsCutting(false);
      lockRef.current = false;
    }, 900);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">

      {/* HEADER */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/80 shadow-sm mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
          <span className="text-[11px] font-medium text-stone-500 uppercase">
            Expertise
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
          Skills
        </h2>
      </div>

      <div className="relative flex flex-col items-center">

        {/* ROD */}
        <div className="w-[420px] h-[8px] bg-gradient-to-r from-stone-700 via-stone-900 to-stone-700 rounded-full mb-4" />

        {/* HOVER ZONE */}
        <div
          onMouseEnter={triggerCut}
          className="absolute top-[8px] w-[20px] h-[160px] z-20 cursor-pointer"
        />

        {/* SYSTEM */}
        <div
          ref={containerRef}
          style={{ transformOrigin: "50% 0%" }}
          className="flex flex-col items-center"
        >

          {/* ROPE */}
          {!isCutting && (
            <div
              style={{
                width: 2,
                height: 140,
                background: "linear-gradient(#888, #444)",
              }}
            />
          )}

          {/* CARD */}
          <div
            className="relative mt-2 rounded-xl p-6 flex flex-col justify-between"
            style={{
              width: 340,
              height: 240,

              background: `linear-gradient(145deg, ${skill.color}20, #f5f5f4)`,
              border: `1px solid ${skill.color}80`,

              boxShadow:
                "0 20px 40px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.6)",
            }}
          >
            {/* HOLE */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
              style={{
                background: "#e7e5e4",
                border: `2px solid ${skill.color}`,
              }}
            />

            <div>
              <h3 className="text-2xl font-bold text-stone-900">
                {skill.title}
              </h3>
            </div>

            <div className="text-sm text-stone-600">
              {index + 1} / {SKILLS.length}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export { SkillsDrop };