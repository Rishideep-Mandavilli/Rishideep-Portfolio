"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Project = {
  id: string;
  name: string;
  type: string;
  summary: string;
  problem: string;
  approach: string[];
  outcome: string;
  role: string;
  stack: string[];
  signals: string[];
};

const PROJECTS: Project[] = [
  {
    id: "attendance-system",
    name: "Vision Attendance System",
    type: "Computer vision automation",
    summary:
      "A face-recognition attendance workflow built to replace manual marking with a faster camera-assisted check-in process.",
    problem:
      "Manual attendance is slow, easy to manipulate, and difficult to audit when many people arrive at the same time.",
    approach: [
      "Captured faces through a controlled webcam flow and matched identities with DeepFace.",
      "Used OpenCV preprocessing to keep recognition stable across lighting and camera variance.",
      "Structured the flow around verification, logging, and review instead of only face detection.",
    ],
    outcome:
      "A working prototype that demonstrates how identity checks, attendance state, and audit trails can sit inside one practical tool.",
    role: "Designed the recognition flow, engineered the prototype, and shaped the system logic.",
    stack: ["Python", "OpenCV", "DeepFace", "CSV/records"],
    signals: ["Identity matching", "Audit trail", "Camera workflow"],
  },
  {
    id: "ai-assistant",
    name: "Realtime AI Assistant",
    type: "LLM interface system",
    summary:
      "A responsive assistant layer for turning user prompts, tool calls, and API responses into a usable working loop.",
    problem:
      "Most assistant demos stop at chat. The useful version needs memory of the task, fast feedback, clear actions, and recoverable states.",
    approach: [
      "Designed the conversation as an operating surface with state, intent, and visible progress.",
      "Connected API responses to action-oriented UI states instead of treating output as plain text.",
      "Kept the interaction lightweight so the assistant feels like a tool, not a landing-page gimmick.",
    ],
    outcome:
      "A reusable pattern for AI-assisted workflows where the interface explains what the system is doing as it works.",
    role: "Built the interaction model, frontend behavior, and API integration approach.",
    stack: ["LLM APIs", "React", "Node.js", "Prompt design"],
    signals: ["Tool loop", "Stateful UI", "Human review"],
  },
  {
    id: "portfolio-engine",
    name: "Portfolio Engine",
    type: "Interactive web system",
    summary:
      "This portfolio itself: a system-themed interface with particles, terminal exploration, draggable contact routing, and a bot-led profile layer.",
    problem:
      "Developer portfolios often look interchangeable. The challenge is to show personality, technical range, and proof without turning the site into visual noise.",
    approach: [
      "Built a React Three Fiber particle nameplate that responds to pointer movement.",
      "Used terminal, graph, and node metaphors to make the portfolio feel like an inspectable system.",
      "Kept each section tied to a job: identity, capability, work evidence, and contact.",
    ],
    outcome:
      "A distinctive foundation for a portfolio that can grow into a case-study driven experience instead of a static resume.",
    role: "Designed and engineered the full interface, motion system, and content structure.",
    stack: ["Next.js", "React", "Three.js", "Framer Motion"],
    signals: ["R3F hero", "Motion system", "Responsive rebuild"],
  },
];

function commandOutput(command: string, active: Project) {
  const [name, arg] = command.trim().split(" ");
  const target = arg ? PROJECTS.find((project) => project.id === arg) : active;

  if (name === "help") {
    return [
      "Available commands:",
      "list",
      "open <project-id>",
      "problem",
      "approach",
      "outcome",
      "stack",
      "clear",
    ];
  }

  if (name === "list" || name === "ls") {
    return PROJECTS.map((project) => `${project.id} — ${project.type}`);
  }

  if (name === "open") {
    if (!target) return ["Project not found. Try: list"];
    return [
      `Opened: ${target.name}`,
      target.summary,
      `Role: ${target.role}`,
      `Stack: ${target.stack.join(", ")}`,
    ];
  }

  if (name === "problem") return [active.problem];
  if (name === "approach") return active.approach.map((item) => `- ${item}`);
  if (name === "outcome") return [active.outcome];
  if (name === "stack") return [active.stack.join(" / ")];
  if (name === "clear") return [];

  return ["Command not found. Type help."];
}

function ProjectsTerminal() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const activeProject =
    PROJECTS.find((project) => project.id === activeId) || PROJECTS[0];

  useEffect(() => {
    setHistory([
      "case engine online",
      "loaded 3 project dossiers",
      "type help or select a file",
    ]);
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [history]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const trimmed = input.trim();
    const [name, arg] = trimmed.split(" ");

    if (name === "open" && arg && PROJECTS.some((project) => project.id === arg)) {
      setActiveId(arg);
    }

    const output = commandOutput(trimmed, activeProject);
    setHistory((previous) =>
      name === "clear" ? [] : [...previous, `> ${trimmed}`, ...output],
    );
    setInput("");
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 md:px-10">
      <div className="section-shell relative z-10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="technical-label mb-4">Selected work</div>
            <h2 className="text-4xl font-semibold text-stone-100 md:text-6xl">
              Case files, not thumbnails.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-stone-400">
            Each file explains the problem, system thinking, stack, and result.
            The terminal remains as an exploration layer, but the evidence is
            visible without knowing commands.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          <div className="border border-stone-800 bg-black/70">
            <div className="border-b border-stone-800 px-4 py-3 font-mono text-xs uppercase text-stone-500">
              Project index
            </div>
            {PROJECTS.map((project, index) => {
              const active = project.id === activeId;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveId(project.id)}
                  className={`block w-full border-b border-stone-900 px-4 py-4 text-left transition-colors ${
                    active ? "bg-[#a4d3cc] text-black" : "hover:bg-stone-950"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs">
                      0{index + 1} / {project.id}
                    </span>
                    <span className={`h-2 w-2 rounded-full ${active ? "bg-black" : "bg-stone-700"}`} />
                  </div>
                  <div className="mt-3 text-lg font-semibold">{project.name}</div>
                  <div className={`mt-1 text-sm ${active ? "text-black/70" : "text-stone-500"}`}>
                    {project.type}
                  </div>
                </button>
              );
            })}
          </div>

          <motion.article
            key={activeProject.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="noise-surface border border-stone-800 bg-black/80"
          >
            <div className="grid border-b border-stone-800 md:grid-cols-[1fr_220px]">
              <div className="p-5 md:p-7">
                <div className="font-mono text-xs uppercase text-[#a4d3cc]">
                  {activeProject.type}
                </div>
                <h3 className="mt-3 text-3xl font-semibold text-stone-100 md:text-5xl">
                  {activeProject.name}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300">
                  {activeProject.summary}
                </p>
              </div>

              <div className="border-t border-stone-800 p-5 md:border-l md:border-t-0">
                <div className="font-mono text-xs uppercase text-stone-500">Signals</div>
                <div className="mt-4 grid gap-2">
                  {activeProject.signals.map((signal) => (
                    <div
                      key={signal}
                      className="border border-stone-800 bg-stone-950 px-3 py-2 text-sm text-stone-300"
                    >
                      {signal}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3">
              <div className="border-b border-stone-800 p-5 md:border-b-0 md:border-r">
                <div className="font-mono text-xs uppercase text-stone-500">Problem</div>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {activeProject.problem}
                </p>
              </div>
              <div className="border-b border-stone-800 p-5 md:border-b-0 md:border-r">
                <div className="font-mono text-xs uppercase text-stone-500">Approach</div>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-300">
                  {activeProject.approach.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#a4d3cc]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5">
                <div className="font-mono text-xs uppercase text-stone-500">Outcome</div>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {activeProject.outcome}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeProject.stack.map((tool) => (
                    <span
                      key={tool}
                      className="border border-stone-800 bg-black px-2.5 py-1 font-mono text-xs text-stone-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-stone-800 bg-[#030303]">
              <div className="flex items-center gap-2 border-b border-stone-900 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#a4d3cc]" />
                <span className="ml-2 font-mono text-xs text-stone-500">
                  case-terminal / {activeProject.id}
                </span>
              </div>
              <div
                ref={logRef}
                onClick={() => inputRef.current?.focus()}
                className="h-48 overflow-y-auto p-4 font-mono text-sm leading-6 text-[#a4d3cc]"
              >
                {history.map((line, index) => (
                  <div key={`${line}-${index}`}>{line}</div>
                ))}
                <form onSubmit={submit} className="mt-2 flex gap-2">
                  <span className="text-stone-500">rishi$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-[#d6ae7c] outline-none"
                    aria-label="Project terminal command"
                  />
                </form>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export { ProjectsTerminal };
