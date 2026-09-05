"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  links?: { label: string; url: string }[];
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
    links: [{ label: "github / rishideep-mandavilli", url: "https://github.com/Rishideep-Mandavilli" }],
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
    links: [{ label: "github / rishideep-mandavilli", url: "https://github.com/Rishideep-Mandavilli" }],
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
    links: [
      { label: "live system ↗", url: "https://rishideep-portfolio.vercel.app/" },
      { label: "github / rishideep-mandavilli", url: "https://github.com/Rishideep-Mandavilli" },
    ],
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
  const [terminalOpen, setTerminalOpen] = useState(false);
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

  const activeIndex = PROJECTS.findIndex((p) => p.id === activeId);

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 md:px-10 md:py-32 lg:px-14">
      <div className="section-shell lg:pl-16">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="technical-label mb-4">Selected work</div>
            <h2 className="text-[clamp(2.2rem,7vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-paper">
              Case files.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-dim">
            Problem, thinking, stack, result — the full dossier on one sheet.
            The terminal stays as an exploration layer for the curious.
          </p>
        </div>

        <div role="tablist" aria-label="Projects" className="flex flex-wrap">
          {PROJECTS.map((project, index) => {
            const active = project.id === activeId;
            return (
              <button
                key={project.id}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveId(project.id)}
                className={`min-w-0 flex-1 basis-full border px-5 py-4 text-left transition-colors sm:basis-0 sm:border-l-0 sm:first:border-l ${
                  active
                    ? "border-signal bg-panel text-paper"
                    : "border-line bg-transparent text-faint hover:text-mist"
                }`}
              >
                <span className={`block font-terminal text-[10px] uppercase tracking-widest ${active ? "text-signal" : ""}`}>
                  file 0{index + 1} / {project.id}
                </span>
                <span className="mt-1 block truncate text-base font-semibold tracking-tight sm:text-lg">
                  {project.name}
                </span>
              </button>
            );
          })}
        </div>

        <motion.article
          key={activeProject.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="noise-surface min-w-0 border border-t-0 border-line bg-panel"
        >
          <div className="border-b border-line p-6 md:p-10">
            <div className="break-words font-terminal text-xs uppercase tracking-widest text-signal">
              {activeProject.type}
            </div>
            <h3 className="mt-3 max-w-[16ch] text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-paper">
              {activeProject.name}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-mist">
              {activeProject.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.signals.map((signal) => (
                <span
                  key={signal}
                  className="border border-line-strong px-3 py-1 font-terminal text-[11px] uppercase tracking-wider text-dim"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_1fr_0.85fr]">
            <div className="border-b border-line p-6 md:p-8 lg:border-b-0 lg:border-r">
              <div className="font-terminal text-[11px] uppercase tracking-widest text-faint">Problem</div>
              <p className="mt-4 text-sm leading-7 text-mist">
                {activeProject.problem}
              </p>
              <div className="mt-8 font-terminal text-[11px] uppercase tracking-widest text-faint">Role</div>
              <p className="mt-3 text-sm leading-7 text-mist">{activeProject.role}</p>
            </div>

            <div className="border-b border-line p-6 md:p-8 lg:border-b-0 lg:border-r">
              <div className="font-terminal text-[11px] uppercase tracking-widest text-faint">Approach</div>
              <ul className="mt-4 space-y-3">
                {activeProject.approach.map((item, i) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-mist">
                    <span className="shrink-0 pt-1 font-terminal text-[10px] text-signal">
                      0{i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 md:p-8">
              <div className="font-terminal text-[11px] uppercase tracking-widest text-faint">Outcome</div>
              <p className="mt-4 text-sm leading-7 text-mist">
                {activeProject.outcome}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {activeProject.stack.map((tool) => (
                  <span
                    key={tool}
                    className="border border-line bg-raised px-2.5 py-1 font-terminal text-xs text-dim"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {(activeProject.links?.length ?? 0) > 0 && (
            <div className="flex flex-wrap items-center gap-3 border-t border-line px-6 py-4 md:px-8">
              <span className="font-terminal text-[11px] uppercase tracking-widest text-faint">proof</span>
              {activeProject.links!.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 border border-line-strong bg-raised px-3 py-1.5 font-terminal text-xs text-mist transition-colors hover:border-signal hover:text-signal"
                >
                  {link.label}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
                </a>
              ))}
            </div>
          )}

          <div className="border-t border-line bg-well">
            <button
              onClick={() => setTerminalOpen((open) => !open)}
              aria-expanded={terminalOpen}
              className="flex w-full items-center justify-between px-5 py-3 font-terminal text-xs uppercase tracking-wider text-faint transition-colors hover:text-mist"
            >
              <span className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_rgba(200,245,80,0.9)]" />
                case-terminal / {activeProject.id} · file 0{activeIndex + 1}
              </span>
              <span className={`transition-transform duration-300 ${terminalOpen ? "rotate-180" : ""}`}>
                ▴
              </span>
            </button>

            <AnimatePresence initial={false}>
              {terminalOpen && (
                <motion.div
                  key="terminal"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    ref={logRef}
                    onClick={() => inputRef.current?.focus()}
                    className="h-56 overflow-y-auto border-t border-line p-4 font-terminal text-xs leading-6 text-mist sm:text-sm"
                  >
                    {history.map((line, index) => (
                      <div key={`${line}-${index}`} className={line.startsWith(">") ? "text-signal" : ""}>
                        {line}
                      </div>
                    ))}
                    <form onSubmit={submit} className="mt-2 flex gap-2">
                      <span className="text-faint">rishi$</span>
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        className="min-w-0 flex-1 bg-transparent text-signal outline-none"
                        aria-label="Project terminal command"
                      />
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

export { ProjectsTerminal };
