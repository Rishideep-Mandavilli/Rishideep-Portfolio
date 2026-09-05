"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Hero } from "@/components/hero/hero";
import { SkillsConsole } from "@/components/skills/Skills-any";
import { ProjectsTerminal } from "@/components/projects/ProjectsTerminal";
import { Contact } from "@/components/contact/Contact";
import { Bot } from "@/components/ui/Bot";
import { SideRail } from "@/components/ui/SideRail";
import { Ticker } from "@/components/ui/Ticker";
import { Header } from "@/components/ui/Header";

export default function Home() {
  const [botOpen, setBotOpen] = useState(false);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (href: string) => {
    if (href === "#about") {
      setBotOpen(true);
      return;
    }
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex flex-col">
      <Header scrollTo={scrollTo} />
      <SideRail />

      <section id="hero">
        <Hero
          skillsRef={skillsRef}
          projectsRef={projectsRef}
          contactRef={contactRef}
        />
      </section>

      <Ticker />

      <SectionReveal>
        <section id="skills" ref={skillsRef}>
          <SkillsConsole />
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="projects" ref={projectsRef}>
          <ProjectsTerminal />
        </section>
      </SectionReveal>

      <SectionReveal>
        <section id="contact" ref={contactRef}>
          <Contact />
        </section>
      </SectionReveal>

      <footer className="border-t border-line">
        <div className="section-shell flex flex-col items-start justify-between gap-3 py-6 font-terminal text-xs text-faint sm:flex-row sm:items-center lg:pl-16">
          <span>
            © 2026 Rishideep Mandavilli ·{" "}
            <a href="/resume" className="text-dim transition-colors hover:text-signal">
              résumé ↗
            </a>
          </span>
          <span className="hidden md:block">
            built with next.js · three.js · framer motion
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-colors hover:text-signal"
          >
            back to top ↑
          </button>
        </div>
      </footer>

      <Bot open={botOpen} onOpenChange={setBotOpen} />
    </main>
  );
}

function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
