"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Hero } from "@/components/hero/hero";
import { SkillsConsole } from "@/components/skills/Skills-any";
import { ProjectsTerminal } from "@/components/projects/ProjectsTerminal";
import { Contact } from "@/components/contact/Contact";
import { Bot } from "@/components/ui/Bot";
import { VerticalStrap } from "@/components/ui/VerticalStrap";
import { Header } from "@/components/ui/Header";

export default function Home() {
  const [botOpen, setBotOpen] = useState(false);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Ensure page starts at top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (href: string) => {
    if (href === "#about") {
      setBotOpen(true);
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex flex-col">
      {/* Header */}
      <Header scrollTo={scrollTo} />

      {/* HERO */}
      <section id="hero" className="min-h-screen">
        <Hero
          skillsRef={skillsRef}
          projectsRef={projectsRef}
          contactRef={contactRef}
        />
      </section>

      {/* SKILLS */}
      <SectionReveal>
        <section id="skills" ref={skillsRef}>
          <SkillsConsole />
        </section>
      </SectionReveal>

      {/* PROJECTS */}
      <SectionReveal>
        <section id="projects" ref={projectsRef}>
          <ProjectsTerminal />
        </section>
      </SectionReveal>

      {/* CONTACT */}
      <SectionReveal>
        <section id="contact" ref={contactRef}>
          <Contact />
        </section>
      </SectionReveal>

      {/* Vertical Scrolling Strap */}
      <VerticalStrap />

      {/* Bot - positioned fixed, not in scroll flow */}
      <Bot open={botOpen} onOpenChange={setBotOpen} />
    </main>
  );
}

// ---------------------------------------------------------------------------
// SectionReveal — smooth entrance animation
// ---------------------------------------------------------------------------

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