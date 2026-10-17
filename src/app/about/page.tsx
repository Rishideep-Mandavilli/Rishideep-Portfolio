import Link from "next/link";

const PRINCIPLES: [string, string, string][] = [
  [
    "Ship it on the device",
    "p01",
    "A build that only survives on my laptop is a demo. Voice, retrieval and vision work has to hold up on a real phone, a real microphone and a real network — so that is where I test it first, not last.",
  ],
  [
    "Measure before claiming",
    "p02",
    "Latency numbers over adjectives. If I say something feels instant, there is a measurement behind the sentence — and if there isn't one yet, I say so instead.",
  ],
  [
    "Show the working",
    "p03",
    "Readable state beats a clever black box. That is why this site has a case terminal, why every dossier lists what went wrong, and why the unfinished parts are on the page.",
  ],
  [
    "The screen is part of the system",
    "p04",
    "A model without an interface is a demo, and an interface without an understanding of the model is theatre. I try to own both halves of the same problem.",
  ],
  [
    "Reuse what is already proven",
    "p05",
    "Before inventing a mechanism, I look for the one that already works — in the standard library, in the platform, or in a script I wrote months ago. Novelty is not a feature.",
  ],
];

const SURFACE: [string, string][] = [
  ["Systems", "Python · TypeScript · C · Java"],
  ["Web", "Next.js App Router · React · Tailwind"],
  ["Speech & vision", "Whisper · on-device STT · TTS pipelines"],
  ["Retrieval", "Embeddings · RAG · semantic note graphs"],
  ["Native", "macOS · Android · desktop automation"],
  ["Design", "Figma · design systems · motion specs"],
];

const PATH: [string, string, string][] = [
  ["Now", "VoidLabs — UI/UX design & frontend lead", "2026 — present"],
  ["Now", "CrossStack — full-stack, community platform", "2025 — present"],
  ["Studying", "B.Tech Computer Science, Gitam", "2025 — 2029"],
  ["Long-running", "Teja Visual Arts — edits, films, visual work", "2020 — present"],
];

const BUILD: [string, string][] = [
  ["Next.js 15 · App Router", "framework"],
  ["three.js particle nameplate", "hero"],
  ["framer-motion, gated on reduced-motion", "motion"],
  ["175 kB first-load JS", "weight"],
  ["AA contrast floor, keyboard-complete case browser", "access"],
  ["Print-ready résumé at /resume", "output"],
];

const OPEN: string[] = [
  "Recognition for code-switched Telugu-and-English speech in Chunks is still behind the quality of what it produces on screen.",
  "iTantra has documented gaps between what the design promised and what the build delivers; I have not closed them.",
  "Most of these repositories are private source, so the case files carry reasoning instead of proof links.",
];

export default function AboutPage() {
  return (
    <main id="main" className="relative z-[1] px-4 py-20 sm:px-6 md:px-10 md:py-28 lg:px-14">
      <article className="print-sheet section-shell lg:pl-16">
        <div className="no-print mb-12 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 font-terminal text-xs uppercase tracking-wider">
          <a href="/" className="text-dim transition-colors hover:text-signal">
            ← back to portfolio
          </a>
          <a href="/resume" className="text-dim transition-colors hover:text-signal">
            résumé ↗
          </a>
        </div>

        <div className="max-w-3xl">
          <div className="technical-label mb-6">About</div>
          <h1 className="text-[clamp(2.4rem,8vw,4.75rem)] font-semibold leading-[1.0] tracking-tight text-paper">
            Profile,{" "}
            <span className="text-signal">uncompressed.</span>
          </h1>
          <p className="mt-8 text-lg leading-8 text-mist">
            I build systems that make AI feel physical — voice that lands on a
            real device, retrieval you can interrogate, interfaces that show
            their working. Then I design and ship the surface around them,
            because a model without a UI is a demo.
          </p>
          <p className="mt-5 text-base leading-7 text-dim">
            This page is the part a résumé cannot hold: how I decide, what I
            refuse to round up, and what is still open. The chronology lives at{" "}
            <Link href="/resume" className="text-signal underline-offset-4 hover:underline">
              /resume
            </Link>
            ; the reasoning lives in the{" "}
            <Link href="/#projects" className="text-signal underline-offset-4 hover:underline">
              case files
            </Link>
            .
          </p>
        </div>

        <section className="mt-20">
          <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              Operating principles
            </h2>
            <span className="font-terminal text-[11px] uppercase tracking-widest text-faint">
              five rules
            </span>
          </div>

          <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map(([title, index, body]) => (
              <li key={index} className="bg-ink p-6 sm:p-7">
                <div className="font-terminal text-[11px] uppercase tracking-widest text-signal">
                  {index}
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-paper">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mist">{body}</p>
              </li>
            ))}
            <li className="flex flex-col justify-between bg-ink p-6 sm:p-7">
              <div>
                <div className="font-terminal text-[11px] uppercase tracking-widest text-faint">
                  status
                </div>
                <p className="mt-3 text-sm leading-7 text-mist">
                  Open to selected builds where the interface and the model are
                  the same conversation.
                </p>
              </div>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 border border-line-strong px-4 py-2 font-terminal text-xs uppercase tracking-wider text-mist transition-colors hover:border-signal hover:text-signal"
              >
                route a signal <span aria-hidden>→</span>
              </Link>
            </li>
          </ol>
        </section>

        <section className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <div className="mb-6 border-b border-line pb-4">
              <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                Working surface
              </h2>
            </div>
            <dl className="grid gap-y-5">
              {SURFACE.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[130px_1fr] items-baseline gap-4 border-b border-line pb-4"
                >
                  <dt className="font-terminal text-[11px] uppercase tracking-widest text-faint">
                    {label}
                  </dt>
                  <dd className="text-sm leading-7 text-mist">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <div className="mb-6 border-b border-line pb-4">
              <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                Path so far
              </h2>
            </div>
            <ul>
              {PATH.map(([when, what, span]) => (
                <li
                  key={what}
                  className="grid grid-cols-[1fr] gap-1 border-b border-line py-4 sm:grid-cols-[110px_1fr] sm:gap-4"
                >
                  <span className="font-terminal text-[11px] uppercase tracking-widest text-signal">
                    {when}
                  </span>
                  <span className="text-sm leading-7 text-mist">
                    {what}
                    <span className="mt-1 block font-terminal text-xs text-faint">{span}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <div className="mb-6 border-b border-line pb-4">
                <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                  What is not finished
                </h2>
              </div>
              <ul className="grid gap-4">
                {OPEN.map((item) => (
                  <li key={item} className="flex gap-4 text-sm leading-7 text-mist">
                    <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-prose text-sm leading-7 text-dim">
                The hero of this site promises an honest list of what is not
                done yet. That promise is only worth keeping if the list is
                real, so it stays here and gets shorter over time.
              </p>
            </div>

            <div>
              <div className="mb-6 border-b border-line pb-4">
                <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                  This site is a build
                </h2>
              </div>
              <ul className="grid gap-px bg-line">
                {BUILD.map(([value, label]) => (
                  <li
                    key={label}
                    className="flex items-baseline justify-between gap-4 bg-ink px-4 py-3"
                  >
                    <span className="text-sm text-mist">{value}</span>
                    <span className="shrink-0 font-terminal text-[10px] uppercase tracking-widest text-faint">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20 border border-line bg-panel/60 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="font-terminal text-[11px] uppercase tracking-widest text-faint">
                Elsewhere
              </div>
              <a
                href="mailto:rishideep.mandavilli@gmail.com"
                className="group mt-3 inline-flex items-baseline gap-3 text-xl font-semibold tracking-tight text-paper transition-colors hover:text-signal sm:text-2xl"
              >
                rishideep.mandavilli@gmail.com
                <span aria-hidden className="font-terminal text-base transition-transform group-hover:translate-x-1">→</span>
              </a>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  ["GitHub", "https://github.com/Rishideep-Mandavilli"],
                  ["LinkedIn", "https://linkedin.com/in/rishideep-mandavilli"],
                  ["YouTube", "https://www.youtube.com/@Teja_Visual_Arts"],
                  ["X", "https://x.com/RishideepM15"],
                  ["Instagram", "https://instagram.com/rishideep.mandavilli"],
                ].map(([label, url]) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-line-strong bg-raised px-3 py-1.5 font-terminal text-xs text-mist transition-colors hover:border-signal hover:text-signal"
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 bg-signal px-5 py-3 font-terminal text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_28px_rgba(200,245,80,0.35)]"
              >
                Case files <span aria-hidden>→</span>
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 border border-line-strong px-5 py-3 font-terminal text-sm uppercase tracking-wider text-mist transition-colors hover:border-signal hover:text-signal"
              >
                Résumé <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
