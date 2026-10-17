"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Skill = {
  id: string;
  title: string;
  field: string;
  summary: string;
  stack: string[];
  proof: string[];
};

const SKILLS: Skill[] = [
  {
    id: "ondevice",
    title: "On-device AI",
    field: "Speech & vision layer",
    summary:
      "Transcription, synthesis and generation that run on the handset or the laptop — quantised models, VAD gating, and a local model gateway instead of a per-call API bill.",
    stack: ["whisper.cpp", "sherpa-onnx", "Piper", "Ollama", "Kokoro"],
    proof: ["Memora voice pipeline", "iTantra offline STT/TTS", "Chunks local voice I/O"],
  },
  {
    id: "retrieval",
    title: "Retrieval & RAG",
    field: "Knowledge layer",
    summary:
      "Embedding pipelines and local search that stay fast and cheap — vectors generated on-device through a local gateway, so a query does not carry a per-call API cost.",
    stack: ["pgvector", "Drizzle", "BullMQ", "Qwen3-Embedding"],
    proof: ["Memora embedding retrieval", "Slide-Board keyword index"],
  },
  {
    id: "fullstack",
    title: "Full-stack Product",
    field: "Systems layer",
    summary:
      "Product surfaces that ship and keep working: Next.js frontends, typed APIs, job queues, object storage, and deployment wired into git so releasing is routine.",
    stack: ["Next.js", "Hono", "FastAPI", "PostgreSQL", "Vercel"],
    proof: ["CrossStack platform, live", "Memora API and schema"],
  },
  {
    id: "frontend",
    title: "Interactive Frontend",
    field: "Experience layer",
    summary:
      "High-control React interfaces where motion, canvas and 3D carry meaning — readable state, transitions that explain what just happened, and no decorative noise.",
    stack: ["React", "TypeScript", "Three.js", "Framer Motion", "Radix UI"],
    proof: ["Slide-Board canvas engine", "Split-view layout tree", "This portfolio"],
  },
  {
    id: "native",
    title: "Native & Platform",
    field: "Hardware layer",
    summary:
      "Swift, Kotlin and Electron work for the moments a browser cannot reach the hardware: screen capture, Bluetooth, WiFi Direct, OS credential storage.",
    stack: ["Swift 6", "Kotlin", "Flutter", "Electron", "ScreenCaptureKit"],
    proof: ["Chunks menu-bar app", "iTantra radio plugins", "SurfIn packaged desktop app"],
  },
  {
    id: "design",
    title: "UI/UX & Design Systems",
    field: "Design layer",
    summary:
      "Interface decisions made as systems — tokens, components, wireframes and brand rules that survive handoff, plus the pitch and visual work around a product.",
    stack: ["Figma", "Design systems", "Wireframing", "Brand identity"],
    proof: ["VoidLabs product design", "Client pitch decks"],
  },
  {
    id: "evaluation",
    title: "Evaluation & Measurement",
    field: "Validation layer",
    summary:
      "If a claim is on the screen, a harness sits behind it: error-rate scoring, per-step latency logs, contract tests, and documentation that lists what is not finished.",
    stack: ["WER scoring", "Latency / RTF logging", "Vitest", "XCTest"],
    proof: ["iTantra WER + latency HUD", "Chunks 21 test files", "Slide-Board test chain"],
  },
];

function SkillsConsole() {
  const [activeId, setActiveId] = useState<string | null>(SKILLS[0].id);

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14">
      <div className="section-shell lg:pl-16">
        <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="technical-label mb-4">Capability map</div>
            <h2 className="text-[clamp(2.2rem,7vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-paper">
              The capability ledger.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-dim">
            Not a pile of logos. Each row is a working layer of the system —
            open one to see the stack behind it and where it is proven.
          </p>
        </div>

        <div className="border-t border-line">
          {SKILLS.map((skill, index) => {
            const open = skill.id === activeId;
            return (
              <div key={skill.id} className="border-b border-line">
                <button
                  onClick={() => setActiveId(open ? null : skill.id)}
                  aria-expanded={open}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-5 py-7 text-left sm:gap-8 md:py-8"
                >
                  <span
                    className={`font-terminal text-sm transition-colors ${
                      open ? "text-signal" : "text-faint group-hover:text-dim"
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`block text-[clamp(1.5rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight transition-colors ${
                        open ? "text-signal" : "text-paper group-hover:text-mist"
                      }`}
                    >
                      {skill.title}
                    </span>
                    <span className="mt-1 block font-terminal text-[11px] uppercase tracking-widest text-faint">
                      {skill.field}
                    </span>
                  </span>

                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center self-center border font-terminal text-lg transition-all duration-300 ${
                      open
                        ? "rotate-45 border-signal text-signal"
                        : "border-line-strong text-faint group-hover:border-dim group-hover:text-mist"
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 pl-8 sm:pl-12 lg:grid-cols-[1.3fr_0.85fr_0.85fr] lg:gap-12">
                        <p className="max-w-prose text-base leading-7 text-mist">
                          {skill.summary}
                        </p>

                        <div>
                          <div className="font-terminal text-[11px] uppercase tracking-widest text-faint">
                            Stack
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {skill.stack.map((tool) => (
                              <span
                                key={tool}
                                className="border border-line bg-raised px-2.5 py-1 font-terminal text-xs text-mist"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="font-terminal text-[11px] uppercase tracking-widest text-faint">
                            Proven in
                          </div>
                          <div className="mt-3 grid gap-2">
                            {skill.proof.map((item) => (
                              <div
                                key={item}
                                className="border-l border-signal/60 bg-raised/60 px-3 py-2 text-sm text-mist"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { SkillsConsole };
