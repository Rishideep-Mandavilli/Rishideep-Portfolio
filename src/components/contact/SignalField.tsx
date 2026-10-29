"use client";

import { useEffect, useRef } from "react";

const WORDS = ["RISHIDEEP", "MANDAVILLI"];
const ROWS = 26;
const STEPS_PER_BAR = 16;
const HIT_PERIOD = 4; // a row re-rolls every 4 steps, so the hit travels one row per step
const STEP_MS = Math.round(60000 / 132 / 4); // 16th notes at 132bpm
const TOKENS_PER_ROW = 9;

type Token = { text: string; weights: number[] };

function rollToken(): Token {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const chars = [...word];
  const head = Math.floor(Math.random() * 3);
  const tail = chars.length - Math.floor(Math.random() * 2);
  const text = chars.slice(head, tail);
  if (text.length < 2) return { text: word, weights: [...word].flatMap(() => [Math.random(), Math.random()]) };
  return { text: text.join(""), weights: text.flatMap(() => [Math.random(), Math.random()]) };
}

function rollTokens(): Token[] {
  return Array.from({ length: TOKENS_PER_ROW }, rollToken);
}

// Length-preserving mutation: adjacent swaps and in-word substitutions. This is
// what keeps the glyphs glitching on every tick while a row's width stays tied
// to the beat.
function glitch(text: string) {
  const chars = [...text];
  const passes = Math.random() < 0.45 ? 2 : 1;
  for (let p = 0; p < passes; p++) {
    const i = Math.floor(Math.random() * chars.length);
    const j = Math.floor(Math.random() * chars.length);
    if (Math.random() < 0.55) {
      const k = Math.min(i + 1, chars.length - 1);
      [chars[i], chars[k]] = [chars[k], chars[i]];
    } else {
      chars[i] = chars[j];
    }
  }
  return chars.join("");
}

function line(tokens: Token[], energy: number) {
  const gap = "-".repeat(2 + Math.round(energy * 4));
  let out = "";
  for (const token of tokens) {
    const text = glitch(token.text);
    for (let i = 0; i < text.length; i++) {
      const extra =
        (token.weights[i * 2] < energy ? 1 : 0) +
        (token.weights[i * 2 + 1] < energy * 0.35 ? 1 : 0);
      out += text[i].repeat(1 + extra);
    }
    out += gap;
  }
  return out;
}

export function SignalField() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const tokens = Array.from({ length: ROWS }, rollTokens);
    let step = 0;
    let timer: ReturnType<typeof setInterval> | null = null;

    const render = () => {
      const downbeat = step % STEPS_PER_BAR === 0;

      for (let row = 0; row < ROWS; row++) {
        const el = rowRefs.current[row];
        if (!el) continue;

        if (downbeat || (step - row) % HIT_PERIOD === 0) {
          tokens[row] = rollTokens();
        }

        // A smooth wave, so the band of stretched rows travels one row per step
        // instead of firing in phase groups.
        const wave = Math.max(0, Math.sin((((step - row) * 2 / ROWS) * Math.PI)));
        const accent = downbeat ? 0.55 : 0;

        el.textContent = line(tokens[row], Math.max(wave, accent));
      }
      wrap.dataset.step = String(step);
      step += 1;
    };

    render();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)");

    const start = () => {
      if (!reduced && desktop.matches && !timer) timer = setInterval(render, STEP_MS);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    // The canvas is display:none below lg, so the clock only earns its keep on
    // desktop. Visibility gating via IntersectionObserver was tried and dropped:
    // a missed callback left the field frozen, which is worse than the waste.
    const onBreakpoint = () => (desktop.matches ? start() : stop());
    desktop.addEventListener("change", onBreakpoint);
    start();

    return () => {
      desktop.removeEventListener("change", onBreakpoint);
      stop();
    };
  }, []);

  return (
    <div className="signal-field" aria-hidden ref={wrapRef}>
      {Array.from({ length: ROWS }, (_, row) => (
        <div
          key={row}
          className="signal-row"
          style={{ opacity: 0.5 + ((row * 5) % 9) / 20 }}
        >
          <span
            ref={(el) => {
              rowRefs.current[row] = el;
            }}
          />
        </div>
      ))}
    </div>
  );
}
