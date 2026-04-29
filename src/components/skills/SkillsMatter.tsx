"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const SKILLS = [
  { title: "AI", color: "#22c55e" },
  { title: "ML", color: "#a855f7" },
  { title: "DEV", color: "#f59e0b" },
  { title: "REACT", color: "#3b82f6" },
  { title: "NEXT", color: "#64748b" },
];

function SkillsMatter() {
  const [index, setIndex] = useState(0);
  const [cut, setCut] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodyRef = useRef<Matter.Body | null>(null);
  const rafRef = useRef<number | null>(null);

  const lockRef = useRef(false);

  const skill = SKILLS[index];

  // 🔥 PHYSICS (ONLY AFTER CUT)
  useEffect(() => {
    if (!cut || !cardRef.current) return;

    const Engine = Matter.Engine;
    const Bodies = Matter.Bodies;
    const World = Matter.World;

    const engine = Engine.create();
    engine.gravity.y = 1.2;

    const body = Bodies.rectangle(0, 0, 260, 150, {
      restitution: 0.2,
      frictionAir: 0.02,
    });

    engineRef.current = engine;
    bodyRef.current = body;

    World.add(engine.world, body);

    // ✅ SIMPLE POSITION (NO COMPLEX MATH)
    body.position.x = window.innerWidth / 2;
    body.position.y = 250;

    Matter.Engine.run(engine);

    const loop = () => {
      if (!bodyRef.current || !cardRef.current) return;

      const b = bodyRef.current;

      cardRef.current.style.transform = `
        translate(-50%, -50%)
        translate(${b.position.x}px, ${b.position.y}px)
        rotate(${b.angle}rad)
      `;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [cut]);

  // ✂️ CUT
  const handleCut = () => {
    if (lockRef.current) return;

    lockRef.current = true;
    setCut(true);

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % SKILLS.length);
      setCut(false);
      lockRef.current = false;

      if (cardRef.current) {
        cardRef.current.style.transform = "translate(-50%, 0)";
      }
    }, 1800);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-16">Skills</h2>

      {/* STRAP */}
      {!cut && (
        <div
          onMouseEnter={handleCut}
          className="absolute top-[120px] cursor-pointer"
        >
          <div
            style={{
              width: 18,
              height: 160,
              background:
                "linear-gradient(180deg, #0f172a, #1e293b, #0f172a)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              writingMode: "vertical-rl",
              color: "#cbd5f5",
              fontSize: 10,
              letterSpacing: 2,
            }}
          >
            CREATIVE
          </div>
        </div>
      )}

      {/* CARD */}
      <div
        ref={cardRef}
        className="absolute top-[280px] left-1/2 -translate-x-1/2 rounded-xl p-6 flex flex-col justify-between"
        style={{
          width: 260,
          height: 150,
          background: `linear-gradient(145deg, ${skill.color}30, #f5f5f4)`,
          border: `1px solid ${skill.color}80`,
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.6)",
        }}
      >
        <h3 className="text-xl font-bold text-stone-900">
          {skill.title}
        </h3>

        <div className="text-sm text-stone-600">
          {index + 1} / {SKILLS.length}
        </div>
      </div>
    </section>
  );
}

export { SkillsMatter };