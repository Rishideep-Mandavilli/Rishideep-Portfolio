"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Skills", href: "#skills" },
  { label: "Case files", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "About", href: "/about" },
];

const isSectionLink = (href: string) => href.startsWith("#");

interface HeaderProps {
  scrollTo: (href: string) => void;
}

export function Header({ scrollTo }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (event: React.MouseEvent, href: string) => {
    event.preventDefault();
    scrollTo(href);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-8">
        <a
          href="/"
          className="flex min-w-0 items-center gap-2.5 font-terminal text-sm font-semibold tracking-wide text-paper transition-colors hover:text-white"
        >
          <span className="h-2 w-2 rotate-45 bg-signal shadow-[0_0_10px_rgba(200,245,80,0.8)]" />
          RISHIDEEP.M
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const className =
              "group relative font-terminal text-[13px] text-dim transition-colors hover:text-paper";
            const underline = (
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
            );

            return isSectionLink(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className={className}
              >
                {item.label}
                {underline}
              </a>
            ) : (
              <a key={item.href} href={item.href} className={className}>
                {item.label}
                {underline}
              </a>
            );
          })}
          <a
            href="/resume"
            className="group relative font-terminal text-[13px] text-signal transition-colors hover:text-paper"
          >
            Résumé
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-panel/60 text-mist md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="relative h-3.5 w-4">
            <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-px w-4 bg-current transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 top-[14px] h-px w-4 bg-current transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-line bg-ink/95 px-4 pb-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] md:hidden">
          <div className="grid gap-1 pt-2">
            {NAV_ITEMS.map((item, i) => {
              const className =
                "flex items-baseline justify-between border-b border-line py-3.5 text-left";
              const inner = (
                <>
                  <span className="text-lg font-semibold tracking-tight text-paper">{item.label}</span>
                  <span className="font-terminal text-xs text-faint">
                    {isSectionLink(item.href) ? `0${i + 1}` : "↗"}
                  </span>
                </>
              );

              return isSectionLink(item.href) ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavigate(event, item.href)}
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <a key={item.href} href={item.href} className={className}>
                  {inner}
                </a>
              );
            })}
            <a
              href="/resume"
              className="flex items-baseline justify-between border-b border-line py-3.5 text-left"
            >
              <span className="text-lg font-semibold tracking-tight text-signal">Résumé</span>
              <span className="font-terminal text-xs text-faint">↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Scroll progress — the SideRail is desktop-only, so phones get a hairline */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-signal lg:hidden"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
