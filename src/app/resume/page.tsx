"use client";

const CONTACTS = [
  ["location", "Visakhapatnam, Andhra Pradesh, India"],
  ["phone", "+91 91339 51588"],
  ["email", "rishideep.mandavilli@gmail.com"],
  ["github", "github.com/Rishideep-Mandavilli"],
  ["linkedin", "linkedin.com/in/rishideep-mandavilli"],
  ["youtube", "youtube.com/@Teja_Visual_Arts"],
  ["web", "rishideep-m.vercel.app"],
];

const SKILLS: [string, string][] = [
  ["languages", "Python · C · Java · JavaScript · TypeScript"],
  [
    "frontend",
    "React · Next.js · HTML/CSS · Tailwind · Framer Motion · Three.js · REST APIs",
  ],
  [
    "ui/ux & design",
    "Figma · Wireframing · UI Prototyping · Design Systems · Pitch Deck Design · Brand Identity",
  ],
  [
    "ai & media",
    "Prompt Engineering · LLM APIs · Generative video & audio · DaVinci Resolve · CapCut",
  ],
  [
    "workflow & cloud",
    "Git & GitHub · Vercel · Netlify · AWS · Firebase · Claude Code and other agent harnesses",
  ],
];

const EXPERIENCE = [
  {
    role: "UI/UX Designer & Frontend Lead",
    org: "VoidLabs · voidlabs.in",
    period: "2026 — Present",
    points: [
      "Lead UI/UX design and frontend architecture for the company's products and its web platform (voidlabs.in) — layouts, wireframes, and responsive web applications.",
      "Own frontend development for performance, accessibility, and cross-browser responsiveness across shipped surfaces.",
      "Work with cross-functional teammates to keep the digital design system aligned with product and business objectives.",
    ],
  },
  {
    role: "Full Stack Developer & Technical Team Member",
    org: "CrossStack · Visakhapatnam developer community (100+ active members)",
    period: "2025 — Present",
    points: [
      "Engineered and launched crossstack.in — a production marketing and event-management platform for a 100+ member regional developer community.",
      "Built modular, responsive UI components with React, Next.js, HTML, CSS, and JavaScript for event listings, registration workflows, and member portals.",
      "Manage version control (Git/GitHub) and continuous deployment pipelines on Vercel and Netlify.",
    ],
  },
  {
    role: "Operations Lead",
    org: "CrossStack Buildathon",
    period: "2025 — 2026",
    points: [
      "Directed operations, logistics, scheduling, and participant management for an offline developer buildathon.",
      "Architected and executed the end-to-end digital judging and online evaluation system.",
    ],
  },
  {
    role: "Brand Strategist & Graphic Designer",
    org: "Freelance",
    period: "2024 — Present",
    points: [
      "Created brand identities, investor pitch decks, and visual assets for one established business and two early-stage startups.",
      "Built cohesive presentation visuals and marketing collateral shaped for stakeholder engagement.",
    ],
  },
  {
    role: "Video Producer & Digital Media Creator",
    org: "Teja Visual Arts · YouTube",
    period: "2020 — Present",
    points: [
      "6+ years of video editing and multimedia production: high-impact video content, promotional reels, and brand recaps.",
      "Integrated generative AI video, audio, and prompt-engineering workflows with CapCut, DaVinci Resolve, and modern AI media tools.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Memora",
    stack: "React Native · FastAPI · whisper.cpp · Ollama",
    desc: "Voice-notes app that transcribes meetings and classes in English, Telugu or code-switched speech, then produces notes, titles, reminders and PDF/Word exports through a local model gateway.",
  },
  {
    name: "iTantra",
    stack: "Flutter · Kotlin · sherpa-onnx · Piper",
    desc: "Offline disaster walkie-talkie: on-device Whisper STT, AES-256 text relay over WiFi Direct and Bluetooth, on-device TTS, with word-error-rate and per-utterance latency instrumentation.",
  },
  {
    name: "Slide-Board",
    stack: "Next.js · React 19 · Python · Prisma",
    desc: "Infinite presentation canvas where a local speech matcher puts the right element on stage as you talk — .pptx import to editable layers, plus a post-talk story export with dwell times.",
  },
  {
    name: "Chunks",
    stack: "Swift 6 · ScreenCaptureKit · Kokoro",
    desc: "macOS menu-bar companion that reads the screen on a held key and answers by voice, using on-device speech in and out and a user-owned plain-text memory file.",
  },
  {
    name: "CrossStack Platform",
    stack: "Next.js · TypeScript · Vercel",
    desc: "Live marketing and event-management platform for a 100+ member developer community — listings, registration flows and member portals, deployed through git-driven CI.",
  },
  {
    name: "SurfIn Browser",
    stack: "Electron · React · Zustand · Vitest",
    desc: "Desktop browser with recursive split-view panes, floating picture-in-picture panels, ad blocking and an OS-backed password manager; v1.0.0 packaged for Intel and Apple Silicon.",
  },
];

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="rs-section mt-7">
      <h2 className="rs-label font-terminal text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
        {label}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <main id="main" className="resume-page relative z-[1] min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-[850px]">
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
          <a
            href="/"
            className="font-terminal text-xs uppercase tracking-wider text-dim transition-colors hover:text-signal"
          >
            ← back to portfolio
          </a>
          <button
            onClick={() => window.print()}
            className="bg-signal px-4 py-2 font-terminal text-xs font-semibold uppercase tracking-wider text-black transition-shadow hover:shadow-[0_0_28px_rgba(200,245,80,0.35)]"
          >
            download pdf ⤓
          </button>
        </div>

        <article className="resume-sheet border border-line bg-panel p-7 shadow-[0_24px_100px_rgba(0,0,0,0.48)] sm:p-10">
          {/* header */}
          <header className="border-b border-line pb-5">
            <h1 className="rs-title text-3xl font-bold tracking-tight text-paper sm:text-4xl">
              RISHIDEEP MANDAVILLI
            </h1>
            <p className="mt-2 font-terminal text-xs uppercase tracking-wider text-mist">
              AI Products · Full-Stack Web · UI/UX Design · Interactive
              Interfaces
            </p>
            <ul className="rs-contacts mt-4 flex flex-wrap gap-x-5 gap-y-1 font-terminal text-xs text-dim">
              {CONTACTS.map(([k, v]) => (
                <li key={k}>
                  <span className="text-faint">{k}: </span>
                  {v}
                </li>
              ))}
            </ul>
          </header>

          <Section label="Summary">
            <p className="rs-body text-sm leading-6 text-mist">
              B.Tech CSE undergraduate (Class of 2029) who works as UI/UX
              Designer &amp; Frontend Lead at voidlabs.in and as a Full-Stack
              Developer for a 100+ member developer-community platform, and
              builds AI products that run on real devices — voice, speech and
              retrieval — instead of stopping at a chat demo. Six years of video
              production and hands-on brand and design work sit behind the
              engineering; operations lead for an offline buildathon, and
              selected for the RTIH Future Founders Program. I ship working
              things and document how they work.
            </p>
          </Section>

          <Section label="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-paper">
                B.Tech, Computer Science &amp; Engineering
              </p>
              <p className="font-terminal text-xs text-faint">Expected 2029</p>
            </div>
            <p className="rs-body mt-1 text-sm text-mist">
              Gayatri Vidya Parishad College of Engineering (Autonomous),
              Visakhapatnam · CGPA 9.31 / 10.0
            </p>
          </Section>

          <Section label="Skills">
            <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-[150px_1fr]">
              {SKILLS.map(([k, v]) => (
                <div key={k} className="contents sm:block">
                  <dt className="rs-label font-terminal text-xs uppercase tracking-wider text-signal sm:py-[2px]">
                    {k}
                  </dt>
                  <dd className="rs-body pb-2 text-sm leading-6 text-mist sm:pb-0">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section label="Experience">
            <div className="grid gap-6">
              {EXPERIENCE.map((job) => (
                <div key={job.role + job.org}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-sm font-semibold text-paper">{job.role}</p>
                    <p className="font-terminal text-xs text-faint">{job.period}</p>
                  </div>
                  <p className="rs-body mt-[2px] text-sm italic text-dim">{job.org}</p>
                  <ul className="mt-2 grid gap-1.5">
                    {job.points.map((point) => (
                      <li key={point} className="rs-body flex gap-2 text-sm leading-6 text-mist">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Projects">
            <div className="grid gap-4">
              {PROJECTS.map((project) => (
                <div key={project.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="text-sm font-semibold text-paper">{project.name}</p>
                    <p className="font-terminal text-xs text-faint">{project.stack}</p>
                  </div>
                  <p className="rs-body mt-1 text-sm leading-6 text-mist">{project.desc}</p>
                </div>
              ))}
              <p className="rs-body text-sm text-mist">
                Full case files with problem, approach, and outcome:{" "}
                <span className="text-signal">rishideep-m.vercel.app</span>
              </p>
            </div>
          </Section>

          <Section label="Hackathons & Recognitions">
            <ul className="grid gap-1.5">
              {[
                "Demo Day Ideathon — Team Leader (Full Stack Development), Runner-up · 2024–25",
                "Smart India Hackathon (SIH) 2025 — Team Lead & Product Designer",
                "Gitam GDG Hackathon — Team Member, 4th place · 2025",
                "Urvikrithi Ideathon — Team Member (Ideator) · 2024–25",
              ].map((item) => (
                <li key={item} className="rs-body flex gap-2 text-sm leading-6 text-mist">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Entrepreneurship & Community">
            <ul className="grid gap-1.5">
              {[
                "RTIH Future Founders Program — selected candidate for the startup incubation and entrepreneurial leadership track",
                "RTIH Spark Program — completed the startup foundation and venture ideation track",
                "CrossStack Technical Team — website maintenance, event development, and creative execution for the community",
                "Institutes & Innovation Council (IIC), GVP College — campus innovation hackathons and venture workshops",
                "Ageion Community & Runway ML meetups — developer build hours, meetups, and founder sessions",
              ].map((item) => (
                <li key={item} className="rs-body flex gap-2 text-sm leading-6 text-mist">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </article>

        <p className="no-print mt-6 text-center font-terminal text-xs text-faint">
          tip: “download pdf” opens the print dialog — choose “save as pdf”.
        </p>
      </div>
    </main>
  );
}
