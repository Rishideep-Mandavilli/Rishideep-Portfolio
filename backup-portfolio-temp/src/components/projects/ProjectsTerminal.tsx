"use client";

import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "attendance-system",
    name: "Attendance System",
    description: "Face recognition using DeepFace.",
    tech: ["Python", "OpenCV"],
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    description: "Real-time AI assistant.",
    tech: ["LLM", "APIs"],
  },
  {
    id: "portfolio-engine",
    name: "Portfolio Engine",
    description: "Interactive portfolio system.",
    tech: ["Next.js", "Framer Motion"],
  },
];

function ProjectsTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeProject, setActiveProject] = useState<any>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ---------------- BOOT ----------------
  useEffect(() => {
    const boot = [
      "Booting system...",
      "Loading project modules...",
      "Initializing terminal...",
      "Ready.",
      "",
      "Type 'help' to explore projects.",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < boot.length) {
        setHistory((prev) => [...prev, boot[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    inputRef.current?.focus();
  }, []);

  // ---------------- AUTO SCROLL ----------------
  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  // ---------------- AUTO FOCUS WHEN VISIBLE ----------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inputRef.current?.focus();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // ---------------- COMMAND SYSTEM ----------------
  const runCommand = (cmd: string) => {
    const args = cmd.trim().split(" ");
    const command = args[0];

    if (command === "help") {
      return [
        "Project Commands:",
        "projects | ls",
        "open <name>",
        "info <name>",
        "tech <name>",
        "cd <name> | back",
        "search <keyword>",
        "run <name>",
        "stats",
        "clear",
      ];
    }

    if (command === "projects" || command === "ls") {
      return PROJECTS.map((p) => p.id);
    }

    if (command === "open") {
      const name = args[1];
      const p = PROJECTS.find((p) => p.id === name);
      if (!p) return ["Project not found"];

      return [
        `Opening ${p.name}...`,
        p.description,
        `Tech → ${p.tech.join(", ")}`,
      ];
    }

    if (command === "info") {
      const name = args[1];
      const p = PROJECTS.find((p) => p.id === name);
      if (!p) return ["Project not found"];

      return [`Name: ${p.name}`, `Description: ${p.description}`];
    }

    if (command === "tech") {
      const name = args[1];
      const p = PROJECTS.find((p) => p.id === name);
      if (!p) return ["Project not found"];

      return [`Tech Stack → ${p.tech.join(", ")}`];
    }

    if (command === "cd") {
      const name = args[1];
      const p = PROJECTS.find((p) => p.id === name);
      if (!p) return ["Directory not found"];

      setActiveProject(p);
      return [`Entered ${p.name}`];
    }

    if (command === "back") {
      setActiveProject(null);
      return ["Returned to projects root"];
    }

    if (command === "search") {
      const keyword = args[1]?.toLowerCase();
      if (!keyword) return ["Provide a keyword"];

      const results = PROJECTS.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.description.toLowerCase().includes(keyword)
      );

      if (!results.length) return ["No matches found"];
      return results.map((p) => p.id);
    }

    if (command === "stats") {
      return [
        `Total Projects: ${PROJECTS.length}`,
        "Domains: AI, Web, Automation",
      ];
    }

    if (command === "run") {
      const name = args[1];
      const p = PROJECTS.find((p) => p.id === name);
      if (!p) return ["Execution failed"];

      return [
        `Running ${p.name}...`,
        "Initializing...",
        "Execution complete ✅",
      ];
    }

    if (command === "clear") {
      setHistory([]);
      return [];
    }

    return ["command not found"];
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const output = runCommand(input);

    setHistory((prev) => [...prev, `➜ ~ ${input}`, ...output]);
    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  // ---------------- ARROW HISTORY ----------------
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex =
        historyIndex < commandHistory.length - 1
          ? historyIndex + 1
          : historyIndex;

      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;

      setHistoryIndex(newIndex);
      setInput(
        newIndex === -1
          ? ""
          : commandHistory[commandHistory.length - 1 - newIndex]
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* HEADER */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm border border-stone-200/80 shadow-sm mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-[11px] font-medium text-stone uppercase">
            Experience
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Projects
        </h2>
      </div>

      {/* TERMINAL */}
      <div className="w-full max-w-6xl rounded-xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,1)] border border-[#00000040]">
        {/* TOP BAR */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border-b border-[#2a2a2a]">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-400">
            rishideep@portfolio — projects
          </span>
        </div>

        {/* BODY */}
        <div
          ref={containerRef}
          onClick={() => inputRef.current?.focus()}
          className="bg-black/70 text-green-400 font-mono text-sm p-4 h-[70vh] overflow-y-auto cursor-text"
        >
          {history.map((line, i) => (
            <div key={i}>{line}</div>
          ))}

          {/* INPUT */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
            <span className="text-green-500">➜</span>
            <span className="text-green-400">~</span>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-green-300 caret-green-400"
            />

            <span className="w-2 h-5 bg-green-600 animate-pulse" />
          </form>
        </div>
      </div>
    </section>
  );
}

export { ProjectsTerminal };