"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  {
    name: "AI",
    color: "#22c55e",
    deps: ["ML"],
    pos: { x: 180, y: 120 },
    info: {
      role: "Core Intelligence",
      capabilities: ["Prediction", "Automation"],
      stack: ["Python", "TensorFlow"],
    },
  },
  {
    name: "ML",
    color: "#f755f2",
    deps: ["AI"],
    pos: { x: 420, y: 220 },
    info: {
      role: "Learning Engine",
      capabilities: ["Training", "Pattern Analysis"],
      stack: ["PyTorch"],
    },
  },
  {
    name: "React",
    color: "#3b82f6",
    deps: ["Backend"],
    pos: { x: 140, y: 300 },
    info: {
      role: "UI Engine",
      capabilities: ["Rendering", "State"],
      stack: ["Next.js"],
    },
  },
  {
    name: "Backend",
    color: "#f59e0b",
    deps: ["React"],
    pos: { x: 460, y: 100 },
    info: {
      role: "Core System",
      capabilities: ["API", "Auth"],
      stack: ["Node.js"],
    },
  },
];

function SkillsConsole() {
  const [active, setActive] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [state, setState] = useState<
    "IDLE" | "BOOT" | "PROCESSING" | "LINKING" | "ACTIVE"
  >("IDLE");

  const [cpu, setCpu] = useState(20);
  const [mem, setMem] = useState(40);

  // 🔥 Boot sequence
  useEffect(() => {
    setState("BOOT");
    setLogs([
      "Booting system...",
      "Initializing modules...",
      "Loading graph engine...",
      "System ready.",
    ]);
  }, []);

  // 🔥 Telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 60) + 20);
      setMem(Math.floor(Math.random() * 50) + 30);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Typing log effect
  const pushLog = (message: string) => {
    let i = 0;
    setLogs((prev) => [...prev, ""]);
    const interval = setInterval(() => {
      setLogs((prev) => {
        const last = prev[prev.length - 1] || "";
        const updated = last + message[i];
        return [...prev.slice(0, -1), updated];
      });
      i++;
      if (i >= message.length) clearInterval(interval);
    }, 10);
  };

  const activate = (skill: typeof SKILLS[0]) => {
    setActive(skill.name);

    setState("BOOT");
    pushLog(`> Booting ${skill.name} module...`);

    setTimeout(() => {
      setState("PROCESSING");
      pushLog(`> Processing dependencies...`);
    }, 300);

    setTimeout(() => {
      setState("LINKING");
      pushLog(`> Linking system graph...`);
    }, 700);

    setTimeout(() => {
      setState("ACTIVE");
      pushLog(`> ${skill.name} ACTIVE`);
    }, 1200);
  };

  const current = SKILLS.find((s) => s.name === active);

  return (
    <section className="flex min-h-screen text-white flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Scanline Effect */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px]" />

      {/* HEADER */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/80 shadow-sm mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
          <span className="text-[11px] font-medium text-stone-500 uppercase">
            Experience
          </span>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
            Skills
          </h2>
        </div>
      </div>

      <div className="w-[100%] max-w-6xl h-[70vh] rounded-2xl border border-stone-800 bg-stone-950 shadow-[0_0_40px_rgba(0,0,0,0.6)] p-6">

        {/* TOP BAR */}
        <div className="flex justify-between mb-4 text-sm text-green-400">
          <div>System Core</div>

          <div className="flex gap-6">
            <div>STATE: {state}</div>
            <div>CPU {cpu}%</div>
            <div>MEM {mem}%</div>
          </div>
        </div>

        <div className="grid grid-cols-[200px_1fr_300px] gap-4 h-[70%]">

          {/* LEFT PANEL */}
          <div className="border border-stone-800 p-4">
            <div className="text-sm text-stone-400 mb-3">MODULES</div>
            {SKILLS.map((s) => (
              <div
                key={s.name}
                onClick={() => activate(s)}
                className="cursor-pointer mb-2 hover:text-green-400 font-mono"
              >
                {s.name}
              </div>
            ))}
          </div>

          {/* CENTER GRAPH */}
          <div className="relative border border-stone-800">

            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {SKILLS.map((s) =>
                s.deps.map((dep) => {
                  const target = SKILLS.find((x) => x.name === dep);
                  if (!target) return null;

                  return (
                    <motion.line
                      key={`${s.name}-${dep}`}
                      x1={s.pos.x + 40}
                      y1={s.pos.y + 20}
                      x2={target.pos.x + 40}
                      y2={target.pos.y + 20}
                      stroke={active === s.name ? s.color : "#444"}
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                      animate={{
                        strokeDashoffset: active === s.name ? -20 : 0,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    />
                  );
                })
              )}
            </svg>

            {/* Nodes */}
            {SKILLS.map((s) => {
              const isActive = active === s.name;
              const isLinked = active && s.deps.includes(active);

              return (
                <motion.div
                  key={s.name}
                  onClick={() => activate(s)}
                  style={{
                    position: "absolute",
                    left: s.pos.x,
                    top: s.pos.y,
                  }}
                  whileHover={{ scale: 1.08 }}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    opacity:
                      active && !isActive && !isLinked ? 0.4 : 1,
                    boxShadow: isActive
                      ? `0 0 25px ${s.color}`
                      : isLinked
                      ? `0 0 15px ${s.color}66`
                      : "none",
                  }}
                  className="px-4 py-2 rounded bg-stone-900 border border-stone-700 cursor-pointer relative transition-all duration-300 font-mono text-sm"
                >
                  <div className="text-[10px] text-stone-500">
                    MODULE
                  </div>
                  <div>{s.name}</div>

                  {/* Pulse */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded"
                      initial={{ scale: 1, opacity: 0.4 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      style={{ border: `1px solid ${s.color}` }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT PANEL */}
          <div className="border border-stone-800 p-4">
            <div className="text-sm text-stone-400 mb-2">
              INTELLIGENCE
            </div>

            {current ? (
              <>
                <div className="mb-3">{current.info.role}</div>

                <div className="text-xs text-stone-400">
                  CAPABILITIES
                </div>
                <ul className="mb-3 text-sm">
                  {current.info.capabilities.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>

                <div className="text-xs text-stone-400">
                  STACK
                </div>
                <div className="flex gap-2 flex-wrap">
                  {current.info.stack.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-stone-800 text-xs rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-stone-500 text-sm">
                Select a module
              </div>
            )}
          </div>
        </div>

        {/* LOG PANEL */}
        <div className="mt-4 border border-stone-800 p-3 h-[140px] overflow-hidden text-sm font-mono text-green-400">
          {logs.slice(-6).map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { SkillsConsole };