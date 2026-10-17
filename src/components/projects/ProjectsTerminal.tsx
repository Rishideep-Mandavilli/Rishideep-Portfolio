"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
    id: "memora",
    name: "Memora",
    type: "On-device AI voice assistant",
    summary:
      "A mobile voice-notes app that records meetings and classes, transcribes them with Whisper, and turns the transcript into notes, titles, reminders and exports — in English, Telugu, or both mixed together.",
    problem:
      "Recording a lecture or a client call is easy; getting usable text out of it is not. Cloud transcription breaks on Indian-English-Telugu code-switching, bills per minute, and quietly uploads audio people would rather keep local.",
    approach: [
      "Route language to the right model: whisper.cpp base and medium for English, large-v3 for Telugu, selected from the recording's language mode.",
      "Clean and translate the transcript through a local Ollama gateway — Gemma for generation, Qwen3-Embedding for retrieval — so no per-call API cost is incurred.",
      "Fan the cleaned transcript out in parallel: title, three note formats, event and deadline extraction, topic tags, and reference links pulled from web search in study mode.",
      "Keep state honest. Every recording carries an explicit pipeline status in SQLite, and a reminder is created from the exact quoted span of transcript that triggered it.",
    ],
    outcome:
      "Runs as a daily tool: 36 real recordings processed through the pipeline, exports to PDF and Word, and share-out to WhatsApp or email. Telugu slang accuracy and model cold-start time are written down as open issues, not hidden.",
    role: "Designed the product, built the Expo/React Native app and the FastAPI pipeline, and wrote the local LLM gateway and schema.",
    stack: ["React Native", "Expo", "Python", "FastAPI", "whisper.cpp", "Ollama", "SQLite"],
    signals: ["On-device STT", "Code-switch handling", "Parallel AI tasks"],
  },
  {
    id: "itantra",
    name: "iTantra",
    type: "Offline multilingual voice relay",
    summary:
      "A walkie-talkie for disasters: speech is transcribed on the phone, sent as text over WiFi Direct or Bluetooth, and spoken back by TTS on the receiving handset. No network, no cloud, no voice SDK.",
    problem:
      "Distress communication collapses exactly when infrastructure does. Streaming audio over a peer link is bandwidth-hungry and fragile; a text relay survives weak radios, but only if both ends can turn speech into text and back without a server.",
    approach: [
      "Run quantised Whisper-tiny (int8 ONNX) with Silero VAD on mid-range Android through sherpa-onnx, so transcription only starts when speech is actually present.",
      "Carry Hindi and English output on Piper voices, LRU-capped at two resident models to protect memory.",
      "Send text instead of audio, encrypted with AES-256, over WiFi Direct as primary and Bluetooth RFCOMM as fallback.",
      "Instrument what the brief scores: word error rate against reference transcripts, and per-utterance latency from end-of-speech to TTS start, with a live HUD and CSV export.",
      "Add SOS presets that broadcast at max volume with vibration and GPS coordinates, backed by a store-and-forward queue for peers that were out of range.",
    ],
    outcome:
      "Built through v0.7.1 with installable APKs and seven test suites covering WER, codec, protocol framing, payload ciphering and SOS relay. Known gaps stay in the README: single-hop rather than mesh, Hindi and English voices only, and efficiency figures not yet measured on hardware.",
    role: "Built the Flutter client and the Kotlin platform plugins, and designed the wire protocol and the measurement harness.",
    stack: ["Flutter", "Kotlin", "sherpa-onnx", "Whisper int8", "Silero VAD", "Piper TTS", "AES-256"],
    signals: ["Fully offline", "WiFi Direct + BLE", "WER & latency measured"],
  },
  {
    id: "slide-board",
    name: "Slide-Board",
    type: "Speech-driven presentation canvas",
    summary:
      "A Figma-shaped infinite canvas that is not for design — you arrange slides, stats, notes and video, then talk, and a local speech matcher puts the right element on stage the moment you say it.",
    problem:
      "Presentation tools assume a fixed order. Real talks move between numbers, demos and answers in whatever order the room demands, and clicking through slides while explaining something is what makes presenters look at the screen instead of the audience.",
    approach: [
      "Match speech to canvas elements locally with the browser's own speech recognition — the “0 AI calls” badge on the stage is a live status readout, not marketing copy.",
      "Show the reasoning: when an element switches in, the stage names the words that triggered it, so a presenter can debug a miss mid-talk instead of guessing.",
      "Import .pptx and .pdf into editable native layers through a Python pipeline — python-pptx, PyMuPDF, and headless LibreOffice rasterisation — with pixel-faithful previews.",
      "Export the story afterwards: chronological, numbered, with per-stop dwell time and the filler words leaned on, which no design tool produces.",
    ],
    outcome:
      "20,336 lines of TypeScript across 61 commits, a twelve-script self-running test chain including a latency benchmark and matcher self-tests, and around forty committed end-to-end screenshots. Deliberately localhost-only — the hosted deployment was retired once it could not meet the import guarantee.",
    role: "Designed and built the whole thing: canvas engine, speech matcher, import pipeline, and test harness.",
    stack: ["Next.js", "React 19", "TypeScript", "Radix UI", "Zustand", "Python", "Prisma"],
    signals: ["Local speech matching", "Inspectable triggers", "PPTX round-trip"],
  },
  {
    id: "chunks",
    name: "Chunks",
    type: "Native macOS screen companion",
    summary:
      "Hold a key, ask about whatever is on screen, get the answer spoken back. Circle a region to narrow the question, or ask where a control is and watch the cursor fly to it.",
    problem:
      "Screen-aware assistants usually arrive as an agent loop with cloud accounts, per-token bills, and a memory store you cannot read. The interesting part — seeing the screen and answering in voice — does not need any of that.",
    approach: [
      "Stay native: Swift 6 with ScreenCaptureKit for capture, macOS on-device speech transcription for input, and Kokoro for local speech output, so nothing about your voice is uploaded.",
      "Keep the vision call cheap and private — screenshots go to the model with store disabled, and a full 3420×2214 display measures out at roughly a thousand image tokens on a free tier.",
      "Make memory a plain-text file the user owns: capped at 2KB, never silently truncated, scanned for credentials before writing, and edited only by proposal rather than by the model directly.",
      "Gate the dangerous parts behind explicit consent and policy layers before touching the Accessibility API to move the cursor.",
      "Support four model backends through one provider registry — OpenAI-compatible, Anthropic, Gemini and Ollama — so the assistant is not married to a vendor.",
    ],
    outcome:
      "15,890 lines of Swift with 21 test files and a running app bundle. Built as a native rebuild of an existing open-source concept, on MIT-licensed source with every adapted file itemised in a notices document.",
    role: "Scoped the rebuild, wrote the Swift client plus the memory and consent layers, and kept the cost and privacy posture documented.",
    stack: ["Swift 6", "AppKit", "ScreenCaptureKit", "Kokoro TTS", "Gemini API", "SwiftPM"],
    signals: ["On-device voice I/O", "User-owned memory", "$0 run cost"],
  },
  {
    id: "crossstack",
    name: "CrossStack",
    type: "Community & event platform",
    summary:
      "The live marketing and event-management site for a 100+ member developer community — event listings, registration flows and member portals, shipped and maintained in production.",
    problem:
      "A regional developer community runs on scattered links: events on one platform, signups on a form, announcements in a chat group. Nothing converts a visitor into an attendee, and nothing survives the next organizer leaving.",
    approach: [
      "Build modular, responsive components in React and Next.js for event listings, registration and conversion-focused sections, so non-developers can update a page without touching layout.",
      "Wire deployment into Git and GitHub with continuous delivery to Vercel and Netlify, making release a routine instead of an event.",
      "Iterate against design feedback from community members and hold cross-browser and mobile behaviour as an acceptance condition, not a follow-up.",
    ],
    outcome:
      "A public, live product carrying the community's events — and the same platform work behind running an offline buildathon's digital judging system end to end.",
    role: "Full-stack developer and technical team member; own the interface, the deployment pipeline, and ongoing maintenance.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "Netlify"],
    signals: ["Live in production", "100+ members", "CI on Git"],
    links: [{ label: "crossstack.in ↗", url: "https://www.crossstack.in" }],
  },
  {
    id: "surfin",
    name: "SurfIn",
    type: "Desktop browser build",
    summary:
      "A Chromium-based desktop browser with split-view tiling, floating picture-in-picture panels, a password manager and an ad blocker — built on Electron over real browser tabs rather than a webview skin.",
    problem:
      "Research work means holding twelve sources open and comparing them. Existing browsers either force tab-switching or push split-view behind a paid extension, and few keep credentials local without a cloud account.",
    approach: [
      "Compose each tab as a real WebContentsView layered above the React chrome, so panes are actual Chromium instances rather than iframes.",
      "Model split view as a recursive binary tree of pane and split nodes with twelve presets, draggable 60Hz dividers, nested splits, and tabs that move between panes.",
      "Store passwords with the OS-backed safeStorage layer, captured by a content script that also handles single-page submit flows, with a never-save-per-origin rule.",
      "Ship the boring reliability work: session restore, crash recovery, download pause and resume, a 10,000-entry history ring, and an internal-page suite behind a custom scheme.",
    ],
    outcome:
      "Version 1.0.0 packaged for macOS on both Intel and Apple Silicon with hardened runtime and auto-update configuration, plus unit tests over the layout tree, omnibox and closed-tab stack.",
    role: "Designed the architecture and wrote the client end to end, from the split-tree layout engine to the packaging config.",
    stack: ["Electron", "React", "TypeScript", "Vite", "Zustand", "Vitest"],
    signals: ["Real multi-pane tabs", "Local credential store", "Packaged v1.0.0"],
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  const activeProject =
    PROJECTS.find((project) => project.id === activeId) || PROJECTS[0];

  // Dossier is addressable: #file-<id> opens straight onto that case.
  const selectProject = useCallback((id: string) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#file-${id}`);
  }, []);

  useEffect(() => {
    const hashed = window.location.hash.replace("#file-", "");
    if (PROJECTS.some((project) => project.id === hashed)) setActiveId(hashed);

    setHistory([
      "case engine online",
      "loaded 6 project dossiers",
      "type help or select a file",
    ]);
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [history]);

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = PROJECTS.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    selectProject(PROJECTS[next].id);
    tabRefs.current[next]?.focus();
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const trimmed = input.trim();
    const [name, arg] = trimmed.split(" ");

    if (name === "open" && arg && PROJECTS.some((project) => project.id === arg)) {
      selectProject(arg);
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
            Most of this is private source; ask and I will walk you through the
            repo. The terminal stays as an exploration layer for the curious.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Projects"
          aria-orientation="horizontal"
          className="tabstrip flex snap-x snap-mandatory gap-2 overflow-x-auto sm:gap-0 sm:overflow-visible"
        >
          {PROJECTS.map((project, index) => {
            const active = project.id === activeId;
            return (
              <button
                key={project.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`tab-${project.id}`}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${project.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => selectProject(project.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`min-w-0 shrink-0 basis-[72vw] snap-start border px-5 py-4 text-left transition-colors sm:basis-0 sm:flex-1 sm:shrink sm:border-l-0 sm:first:border-l ${
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
          id={`panel-${activeProject.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeProject.id}`}
          tabIndex={0}
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
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
