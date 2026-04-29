"use client";

import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "About", href: "#about" },
];

interface HeaderProps {
  scrollTo: (href: string) => void;
}

export function Header({ scrollTo }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (href: string) => {
    scrollTo(href);
    setMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "bg-black/92 backdrop-blur-md border-b border-stone-800" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavigate("#hero")}
          className="text-lg font-semibold text-stone-100 hover:text-white transition-colors cursor-pointer"
        >
          Rishideep
        </button>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavigate(item.href)}
                className="text-sm text-stone-400 hover:text-stone-200 transition-colors cursor-pointer relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-200 transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-stone-700 bg-black/60 text-stone-200"
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
        <div className="md:hidden border-t border-stone-900 bg-black/96 px-6 pb-5">
          <div className="grid gap-1 pt-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                className="flex items-center justify-between border-b border-stone-900 py-3 text-left text-sm text-stone-300"
              >
                <span>{item.label}</span>
                <span className="text-stone-600">/</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
