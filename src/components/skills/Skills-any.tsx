"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Skill = {
  id: string;
  title: string;
  field: string;
  summary: string;
  stack: string[];
  proof: string[];
  level: number;
};

const SKILLS: Skill[] = [
  {
    id: "vision",
    title: "Computer Vision",
    field: "Perception layer",
    summary:
      "Face recognition, frame processing, and camera-led workflows that turn visual input into useful system state.",
    stack: ["OpenCV", "DeepFace", "Python"],
    proof: ["Attendance recognition prototype", "Image preprocessing", "Identity verification flow"],
    level: 82,
  },
  {
    id: "ai",
    title: "AI Interfaces",
    field: "Reasoning layer",
    summary:
      "LLM-powered interactions shaped around intent, tool output, user review, and recoverable states.",
    stack: ["LLM APIs", "Prompt design", "Node.js"],
    proof: ["Assistant workflow model", "API response handling", "Action-oriented UI"],
    level: 78,
  },
  {
    id: "frontend",
    title: "Interactive Frontend",
    field: "Experience layer",
    summary:
      "High-control React interfaces with motion, canvas, and 3D used to communicate how a system behaves.",
    stack: ["Next.js", "React", "Three.js", "Framer Motion"],
    proof: ["Particle nameplate", "Case-file interface", "Responsive rebuild"],
    level: 86,
  },
  {
    id: "automation",
    title: "Automation Logic",
    field: "Workflow layer",
    summary:
      "Process design for replacing repetitive manual steps with clear, observable software flows.",
    stack: ["Python", "APIs", "Data records"],
    proof: ["Attendance logging", "Command-style exploration", "Stateful task flow"],
    level: 74,
  },
  {
    id: "systems",
    title: "System Design",
    field: "Architecture layer",
    summary:
      "Breaking vague product ideas into states, inputs, outputs, constraints, and interfaces people can trust.",
    stack: ["TypeScript", "Data modeling", "UI architecture"],
    proof: ["Section architecture", "Case-study schema", "Interaction states"],
    level: 80,
  },
];

function SkillsConsole() {
  const [activeId, setActiveId] = useState(SKILLS[0].id);
  const active = useMemo(
    () => SKILLS.find((skill) => skill.id === activeId) || SKILLS[0],
    [activeId],
  );

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-10">
      <div className="section-shell relative z-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="technical-label mb-4">Capability map</div>
            <h2 className="text-4xl font-semibold text-stone-100 md:text-6xl">
              Skills with operating context.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-stone-400">
            The goal is not a pile of logos. Each capability below is tied to a
            role in the system, a stack, and proof from the current portfolio.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
          <div className="noise-surface border border-stone-800 bg-black/75 p-4 md:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-stone-900 pb-4">
              <div className="font-mono text-xs uppercase text-[#a4d3cc]">
                System core
              </div>
              <div className="font-mono text-xs text-stone-500">
                {SKILLS.length} nodes / live map
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {SKILLS.map((skill, index) => {
                const selected = skill.id === activeId;
                return (
                  <motion.button
                    key={skill.id}
                    onClick={() => setActiveId(skill.id)}
                    whileHover={{ y: -3 }}
                    className={`group border p-4 text-left transition-colors ${
                      selected
                        ? "border-[#a4d3cc] bg-[#a4d3cc] text-black"
                        : "border-stone-800 bg-stone-950/70 text-stone-300 hover:border-stone-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs">0{index + 1}</span>
                      <span className={`h-2 w-2 rounded-full ${selected ? "bg-black" : "bg-[#a4d3cc]/60"}`} />
                    </div>
                    <div className="mt-5 text-xl font-semibold">{skill.title}</div>
                    <div className={`mt-1 font-mono text-xs uppercase ${selected ? "text-black/65" : "text-stone-500"}`}>
                      {skill.field}
                    </div>
                    <div className={`mt-5 h-1 w-full ${selected ? "bg-black/15" : "bg-stone-900"}`}>
                      <div
                        className={`h-full ${selected ? "bg-black" : "bg-[#a4d3cc]"}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.aside
            key={active.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-stone-800 bg-black/80"
          >
            <div className="border-b border-stone-800 p-5">
              <div className="font-mono text-xs uppercase text-[#a4d3cc]">
                Active node
              </div>
              <h3 className="mt-3 text-3xl font-semibold text-stone-100">
                {active.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-stone-400">
                {active.summary}
              </p>
            </div>

            <div className="border-b border-stone-800 p-5">
              <div className="font-mono text-xs uppercase text-stone-500">Stack</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.stack.map((tool) => (
                  <span
                    key={tool}
                    className="border border-stone-800 bg-stone-950 px-2.5 py-1 font-mono text-xs text-stone-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5">
              <div className="font-mono text-xs uppercase text-stone-500">Proof</div>
              <div className="mt-3 grid gap-2">
                {active.proof.map((item) => (
                  <div
                    key={item}
                    className="border-l border-[#a4d3cc] bg-stone-950 px-3 py-2 text-sm text-stone-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

export { SkillsConsole };
