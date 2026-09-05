"use client";

const CONTACTS = [
  ["location", "Visakhapatnam, India"],
  ["phone", "+91 91339 51588"],
  ["email", "rishideep.edu@gmail.com"],
  ["github", "github.com/Rishideep-Mandavilli"],
  ["linkedin", "linkedin.com/in/rishideepmandavilli"],
  ["web", "rishideep-portfolio.vercel.app"],
];

const SKILLS: [string, string][] = [
  ["languages", "Python · C · JavaScript · TypeScript"],
  [
    "frontend",
    "React · Next.js · HTML/CSS · Tailwind · Framer Motion · Three.js",
  ],
  [
    "ai & vision",
    "Prompt Engineering · LLM APIs · OpenCV · DeepFace · AI video & audio generation",
  ],
  ["workflow", "Git & GitHub · Vercel · Netlify · AWS (basics) · Firebase (familiar)"],
  ["creative", "Brand identity · Pitch decks · Visual storytelling"],
  ["video", "CapCut · DaVinci Resolve · reels · ads · event recaps"],
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer — Technical Team",
    org: "CrossStack · Visakhapatnam developer community (100+ members)",
    period: "2024 — Present",
    points: [
      "Engineered and shipped crossstack.in — a production marketing and event-management platform, as a live client deliverable.",
      "Built responsive interfaces with React/Next.js: event listings, registration flow, and conversion-focused sections.",
      "Own iteration from design feedback through deployment on Vercel; maintain cross-browser and mobile behavior.",
    ],
  },
  {
    role: "Operations Lead",
    org: "CrossStack Buildathon",
    period: "2024 — 2025",
    points: [
      "Ran an offline buildathon end-to-end: participant coordination, logistics, and scheduling.",
      "Designed and executed the complete online evaluation and judging workflow.",
    ],
  },
  {
    role: "Graphic Designer & Brand Strategist",
    org: "Freelance",
    period: "2024 — Present",
    points: [
      "Delivered pitch decks and brand identities for one established business and two startup ideas — logos, presentations, marketing visuals.",
    ],
  },
  {
    role: "Founder & Content Creator",
    org: "Teja Visual Arts · YouTube",
    period: "2019 — Present",
    points: [
      "6+ years of video editing; produce reels, promotional ads, event recaps, and AI-generated video and song content.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Vision Attendance System",
    stack: "Python · OpenCV · DeepFace",
    desc: "Face-recognition check-in replacing manual attendance — identity matching, audit trail, camera-led workflow in one tool.",
  },
  {
    name: "Realtime AI Assistant",
    stack: "LLM APIs · React · Node.js",
    desc: "Assistant interface treating model output as actions with state — visible progress, recoverable states, human review.",
  },
  {
    name: "Portfolio Engine",
    stack: "Next.js · Three.js · Framer Motion",
    desc: "Inspectable operating-layer portfolio: particle identity renderer, case-terminal exploration, node-based contact routing.",
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
    <main className="resume-page relative z-[1] min-h-screen px-4 py-10 sm:px-6">
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
              AI Systems · Full-Stack Web · Computer Vision · Interactive Interfaces
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
              B.Tech CSE undergraduate (Class of 2029) who builds AI-era systems
              end to end — from computer-vision prototypes and LLM-driven
              interfaces to a deployed production website for a 100+ member
              developer community. Six years of video production and hands-on
              brand/design work behind the engineering; operations lead for an
              offline buildathon. I ship working things and document how they
              work.
            </p>
          </Section>

          <Section label="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-paper">
                B.Tech, Computer Science &amp; Engineering
              </p>
              <p className="font-terminal text-xs text-faint">2023 — 2029</p>
            </div>
            <p className="rs-body mt-1 text-sm text-mist">
              Gayatri Vidya Parishad College of Engineering (Autonomous),
              Visakhapatnam
            </p>
          </Section>

          <Section label="Skills">
            <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-[130px_1fr]">
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
                <span className="text-signal">rishideep-portfolio.vercel.app</span>
              </p>
            </div>
          </Section>

          <Section label="Hackathons & Achievements">
            <ul className="grid gap-1.5">
              {[
                "Runner-up — Demo Day Ideathon, Team Leader (Full Stack) · 2024–25",
                "Team waitlisted (Frontend) — Smart India Hackathon · 2025",
                "Ideator — Urvikrithi Ideathon · 2024–25",
              ].map((item) => (
                <li key={item} className="rs-body flex gap-2 text-sm leading-6 text-mist">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Community">
            <ul className="grid gap-1.5">
              {[
                "Technical Team Member — CrossStack: website maintenance, event development, creative execution",
                "Member — Innovation & Incubation Center (IIC), GVP College: innovation challenges and entrepreneurship programs",
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
