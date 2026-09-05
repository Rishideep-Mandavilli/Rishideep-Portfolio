"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { GlitchText } from "@/components/ui/GlitchText";

function AboutPanel({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="fixed inset-0 z-[9998] bg-[radial-gradient(circle_at_50%_38%,rgba(200,245,80,0.18),rgba(0,0,0,0.78)_48%,rgba(0,0,0,0.92))] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[9999] w-[760px] max-w-[calc(100vw-24px)] -translate-x-1/2 -translate-y-1/2 sm:max-w-[92vw]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="noise-surface relative max-h-[calc(100svh-28px)] overflow-y-auto border border-[#c8f550]/35 bg-panel shadow-[0_30px_120px_rgba(0,0,0,0.6),0_0_70px_rgba(200,245,80,0.12)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(200,245,80,0.13),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(154,162,175,0.1),transparent_35%)]" />
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-panel/96 px-4 py-3 backdrop-blur sm:px-5">
                <div className="flex min-w-0 items-center gap-2 truncate font-terminal text-[10px] uppercase text-[#c8f550] sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c8f550] shadow-[0_0_14px_rgba(200,245,80,0.8)]" />
                  companion node / profile
                </div>
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-full border border-line-strong text-dim transition-colors hover:border-dim hover:text-paper"
                  aria-label="Close"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative z-[1] grid md:grid-cols-[1fr_260px]">
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="mb-5 inline-flex items-center gap-2 border border-[#c8f550]/35 bg-[#c8f550]/5 px-3 py-1.5 font-terminal text-[11px] uppercase text-[#c8f550]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c8f550]" />
                    Rishi.OS
                  </div>
                  <GlitchText
                    text="Rishideep Mandavilli"
                    className="block text-[clamp(1.8rem,9vw,3rem)] font-semibold leading-tight text-paper drop-shadow-[0_0_24px_rgba(200,245,80,0.12)]"
                  />
                  <p className="mt-5 max-w-xl text-sm leading-7 text-dim md:text-base">
                    Developer focused on AI interfaces, automation systems,
                    computer vision workflows, and full-stack products that make
                    complex logic visible enough for people to trust.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Builds", "working prototypes"],
                      ["Thinks in", "systems and states"],
                      ["Currently", "available selectively"],
                    ].map(([label, value]) => (
                      <div key={label} className="border border-line bg-panel/60 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                        <div className="font-terminal text-[10px] uppercase text-faint">{label}</div>
                        <div className="mt-2 text-sm text-paper">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-line bg-well/40 p-5 sm:p-6 md:border-l md:border-t-0">
                  <div className="font-terminal text-xs uppercase text-faint">Operating modes</div>
                  <div className="mt-4 grid gap-2">
                    {[
                      "AI workflow design",
                      "Computer vision prototypes",
                      "Interactive frontend systems",
                      "Automation logic",
                      "Product-quality polish",
                    ].map((mode) => (
                      <div key={mode} className="border-l border-[#c8f550] bg-raised px-3 py-2 text-sm text-mist shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
                        {mode}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface BotProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BUBBLES = [
  "rishi.os // profile companion",
  "sys.nominal",
  "inspecting you back…",
  "hire signal located ↓",
  "0 open bugs*",
  "*that i admit to",
];

export function Bot({ open, onOpenChange }: BotProps) {
  const [viewport, setViewport] = useState({ w: 1024, h: 768 });
  const [blink, setBlink] = useState(false);
  const [botAtCenter, setBotAtCenter] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);

  const [sleeping] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 23 || hour < 6;
  });

  const headRef = useRef<HTMLDivElement | null>(null);
  const antennaRef = useRef<HTMLSpanElement | null>(null);
  const pupilRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pos = useRef({ x: -200, y: -200 });
  const lastMove = useRef(0);
  const sleepF = useRef(sleeping ? 1 : 0);

  const botWidth = 76;
  const botHeight = 118;

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // blink scheduler — slow, heavy lids when drowsy
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          schedule();
        }, sleepF.current > 0.5 ? 340 : 130);
      }, (sleepF.current > 0.5 ? 4200 : 2400) + Math.random() * 2800);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (open) {
      setBotAtCenter(true);
      const timer = setTimeout(() => setPanelVisible(true), 520);
      return () => {
        clearTimeout(timer);
        setPanelVisible(false);
      };
    }
    setBotAtCenter(false);
    setPanelVisible(false);
  }, [open]);

  // tracking, head tilt, idle curiosity, sleep drift — zero re-renders
  useEffect(() => {
    let raf = 0;
    let nextDart = 0;
    const dart = { x: 0, y: 0 };

    const onMove = (event: MouseEvent) => {
      pos.current.x = event.clientX;
      pos.current.y = event.clientY;
      lastMove.current = performance.now();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const now = performance.now();
      const idle = now - lastMove.current > 8000;

      const cx = 28 + botWidth / 2;
      const cy = window.innerHeight - 28 - botHeight / 2;
      const dx = pos.current.x - cx;
      const dy = pos.current.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(dist / 320, 1);
      const nX = (dx / dist) * reach;
      const nY = (dy / dist) * reach;

      sleepF.current += ((sleeping ? 1 : 0) - sleepF.current) * 0.01;
      const sf = sleepF.current;

      if (idle && !document.hidden && now > nextDart) {
        nextDart = now + 1400 + Math.random() * 1600;
        dart.x = (Math.random() - 0.5) * 5;
        dart.y = (Math.random() - 0.5) * 4;
        setBlink(true);
        setTimeout(() => setBlink(false), 110);
        if (Math.random() < 0.4) {
          setTimeout(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 110);
          }, 260);
        }
        if (antennaRef.current) {
          animate(
            antennaRef.current,
            { rotate: [0, -14, 10, -6, 0] },
            { duration: 0.7 },
          );
        }
      }

      const lookX = idle ? dart.x : nX * 2.5;
      const lookY = idle ? dart.y : nY * 2.5;

      if (headRef.current) {
        headRef.current.style.transform = `rotate(${idle ? 0 : nX * 6}deg)`;
      }
      for (const pupil of pupilRefs.current) {
        if (!pupil) continue;
        pupil.style.transform = `translate(${lookX}px, ${lookY}px) scale(${1 - sf * 0.35})`;
        pupil.style.opacity = String(1 - sf * 0.62);
      }
      if (antennaRef.current) {
        antennaRef.current.style.opacity = String(1 - sf * 0.85);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [sleeping]);

  const idleCx = 28 + botWidth / 2;
  const idleCy = viewport.h - 28 - botHeight / 2;

  const targetX = botAtCenter ? viewport.w / 2 - botWidth / 2 - idleCx : 0;
  const targetY = botAtCenter ? viewport.h / 2 - 90 - idleCy : 0;

  const handleInteraction = useCallback(() => {
    if (!open) onOpenChange(true);
  }, [open, onOpenChange]);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open profile companion"
        aria-expanded={open}
        className="fixed bottom-7 left-7 z-[9990] hidden select-none md:block"
        animate={{ x: targetX, y: targetY }}
        transition={{ type: "spring", stiffness: 86, damping: 24, mass: 1 }}
        onClick={handleInteraction}
        onMouseEnter={() =>
          setBubble(BUBBLES[Math.floor(Math.random() * BUBBLES.length)])
        }
        onMouseLeave={() => setBubble(null)}
      >
        <motion.div
          className="group relative flex h-[118px] w-[76px] flex-col items-center"
          animate={!botAtCenter ? { y: [0, -5, 0] } : { y: 0 }}
          transition={
            !botAtCenter
              ? { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
              : {}
          }
        >
          <AnimatePresence>
            {bubble && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                className="absolute -top-9 left-1/2 z-[1] -translate-x-1/2 whitespace-nowrap border border-line-strong bg-panel/95 px-2.5 py-1 font-terminal text-[10px] uppercase tracking-wider text-signal shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              >
                {bubble}
              </motion.div>
            )}
          </AnimatePresence>

          {/* antenna */}
          <span aria-hidden className="z-[1] mb-[1px] h-3 w-px bg-line-strong" />
          <span
            aria-hidden
            ref={antennaRef}
            className="z-[1] -mt-[13px] h-1 w-1 bg-signal shadow-[0_0_8px_rgba(200,245,80,0.9)]"
            style={{ transformOrigin: "bottom center" }}
          />

          {/* head — tilts toward you */}
          <div
            ref={headRef}
            className="relative z-[1] mt-3 h-9 w-14 rounded-lg border border-line-strong bg-[linear-gradient(180deg,#1b222e,#131824)] shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
            style={{ willChange: "transform" }}
          >
            <span aria-hidden className="absolute -left-1.5 top-1/2 h-3 w-1 -translate-y-1/2 rounded-sm border border-line-strong bg-raised" />
            <span aria-hidden className="absolute -right-1.5 top-1/2 h-3 w-1 -translate-y-1/2 rounded-sm border border-line-strong bg-raised" />
            <div className="absolute inset-x-2 inset-y-[7px] overflow-hidden rounded-md border border-line bg-well">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(200,245,80,0.35) 3px, rgba(200,245,80,0.35) 4px)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2.5">
                {[0, 1].map((eye) => (
                  <motion.span
                    key={eye}
                    className="grid h-3 w-3 place-items-center rounded-full border border-line bg-[#10151c]"
                    animate={{ scaleY: blink ? 0.15 : 1 }}
                    transition={{ duration: sleepF.current > 0.5 ? 0.3 : 0.09 }}
                  >
                    <span
                      ref={(el) => {
                        pupilRefs.current[eye] = el;
                      }}
                      className="block h-1 w-1 rounded-full bg-signal shadow-[0_0_6px_rgba(200,245,80,0.95)]"
                    />
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* neck */}
          <span aria-hidden className="relative z-[1] h-1.5 w-5 border-x border-b border-line-strong bg-raised" />

          {/* torso */}
          <div className="relative z-[1] h-11 w-16 rounded-lg border border-line-strong bg-[linear-gradient(180deg,#181f2b,#111622)] shadow-[0_14px_36px_rgba(0,0,0,0.45)]">
            <span aria-hidden className="absolute -left-2 top-2 h-7 w-1.5 rounded-l-full border border-r-0 border-line-strong bg-raised" />
            <span aria-hidden className="absolute -right-2 top-2 h-7 w-1.5 rounded-r-full border border-l-0 border-line-strong bg-raised" />
            <span aria-hidden className="absolute -bottom-1 left-2 h-2 w-1.5 rounded-sm border border-line-strong bg-raised" />
            <span aria-hidden className="absolute -bottom-1 right-2 h-2 w-1.5 rounded-sm border border-line-strong bg-raised" />
            <div className="flex h-full flex-col items-center justify-center gap-1.5">
              <motion.span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_rgba(200,245,80,0.85)]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.6, repeat: Infinity }}
              />
              <span aria-hidden className="block h-px w-8 bg-line" />
              <span aria-hidden className="block h-px w-5 bg-line" />
            </div>
          </div>

          {/* legs */}
          <div className="relative z-[1] flex gap-4">
            <span aria-hidden className="h-3 w-2 rounded-b-sm border-x border-b border-line-strong bg-raised" />
            <span aria-hidden className="h-3 w-2 rounded-b-sm border-x border-b border-line-strong bg-raised" />
          </div>
          <span aria-hidden className="relative z-[1] mt-[1px] block h-1.5 w-14 rounded-sm border border-line-strong bg-panel" />

          {/* floor glow */}
          <span aria-hidden className="absolute -bottom-2 left-1/2 h-2.5 w-16 -translate-x-1/2 rounded-full bg-signal/10 blur-md" />
        </motion.div>
      </motion.button>

      <AboutPanel visible={panelVisible} onClose={handleClose} />
    </>
  );
}
