"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import { GlitchText } from "@/components/ui/GlitchText";

interface EyeProps {
  targetX: number;
  targetY: number;
  blink: boolean;
}

function Eye({ targetX, targetY, blink }: EyeProps) {
  const pupilRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  useAnimationFrame(() => {
    if (!pupilRef.current || blink) return;
    pos.current.x += (targetX * 3 - pos.current.x) * 0.12;
    pos.current.y += (targetY * 3 - pos.current.y) * 0.12;
    pupilRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
  });

  return (
    <motion.div
      className="relative h-3 w-3 overflow-hidden rounded-full bg-[#dfe7e2]"
      animate={blink ? { scaleY: 0.08 } : { scaleY: 1 }}
      transition={{ duration: 0.1 }}
    >
      <div
        ref={pupilRef}
        className="absolute h-1.5 w-1.5 rounded-full bg-[#0a0a0a]"
        style={{ left: 3, top: 3 }}
      />
    </motion.div>
  );
}

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
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[9999] w-[760px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden border border-stone-700 bg-[#070706] shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between border-b border-stone-800 px-5 py-3">
                <div className="font-mono text-xs uppercase text-[#a4d3cc]">
                  companion node / profile
                </div>
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-full border border-stone-700 text-stone-400 transition-colors hover:border-stone-500 hover:text-stone-100"
                  aria-label="Close"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-[1fr_260px]">
                <div className="p-6 md:p-8">
                  <div className="mb-5 inline-flex items-center gap-2 border border-stone-800 px-3 py-1.5 font-mono text-[11px] uppercase text-[#d6ae7c]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d6ae7c]" />
                    Rishi.OS
                  </div>
                  <GlitchText
                    text="Rishideep Mandavilli"
                    className="block text-2xl font-semibold leading-tight text-stone-100 md:text-5xl"
                  />
                  <p className="mt-5 max-w-xl text-sm leading-7 text-stone-400 md:text-base">
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
                      <div key={label} className="border border-stone-800 bg-black/60 p-3">
                        <div className="font-mono text-[10px] uppercase text-stone-500">{label}</div>
                        <div className="mt-2 text-sm text-stone-200">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-stone-800 p-6 md:border-l md:border-t-0">
                  <div className="font-mono text-xs uppercase text-stone-500">Operating modes</div>
                  <div className="mt-4 grid gap-2">
                    {[
                      "AI workflow design",
                      "Computer vision prototypes",
                      "Interactive frontend systems",
                      "Automation logic",
                      "Product-quality polish",
                    ].map((mode) => (
                      <div key={mode} className="border-l border-[#a4d3cc] bg-stone-950 px-3 py-2 text-sm text-stone-300">
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

export function Bot({ open, onOpenChange }: BotProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 1024, h: 768 });
  const [blink, setBlink] = useState(false);
  const [botAtCenter, setBotAtCenter] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  const botWidth = 82;
  const botHeight = 124;

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          schedule();
        }, 130);
      }, 2200 + Math.random() * 2600);
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

  const idleCx = 28 + botWidth / 2;
  const idleCy = viewport.h - 28 - botHeight / 2;
  const dx = cursorPos.x - idleCx;
  const dy = cursorPos.y - idleCy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const nX = dist > 0 ? (dx / dist) * Math.min(dist / 320, 1) : 0;
  const nY = dist > 0 ? (dy / dist) * Math.min(dist / 320, 1) : 0;

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
      >
        <motion.div
          className="group relative flex h-[124px] w-[82px] flex-col items-center"
          animate={!botAtCenter ? { y: [0, -4, 0] } : { y: 0 }}
          transition={
            !botAtCenter
              ? { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
              : {}
          }
        >
          <div className="absolute -right-[132px] top-4 hidden w-[118px] border border-stone-800 bg-black/85 px-3 py-2 text-left opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-opacity group-hover:opacity-100 lg:block">
            <div className="font-mono text-[10px] uppercase text-[#a4d3cc]">Rishi.OS</div>
            <div className="mt-1 text-[11px] text-stone-400">profile companion</div>
          </div>

          <div className="relative h-[66px] w-[72px] rounded-[22px] border border-stone-700 bg-[var(--color-accent)] shadow-[0_18px_48px_rgba(11,11,11,0.45)]">
            <div className="absolute inset-[3px] rounded-[19px] border border-red/[0.04]" />
            <div className="absolute left-4 right-4 top-2 flex items-center justify-between">
              <span className="h-1 w-1 rounded-full bg-[#d6ae7c]" />
              <span className="h-px w-5 bg-stone-700" />
              <span className="h-1 w-1 rounded-full bg-[#d6ae7c]" />
            </div>

            <div className="absolute inset-x-[10px] bottom-[10px] top-[18px] overflow-hidden rounded-[13px] border border-stone-700 bg-[var(--color-accent)]">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, white 3px, white 4px)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2.5">
                <Eye targetX={nX} targetY={nY} blink={blink} />
                <Eye targetX={nX} targetY={nY} blink={blink} />
              </div>
              <motion.div
                className="absolute bottom-1.5 left-1/2 h-px w-5 -translate-x-1/2 bg-[#a4d3cc]/70"
                animate={{ opacity: [0.35, 0.9, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
            </div>
          </div>

          <div className="relative h-3 w-[18px]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-stone-700" />
            <div className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-white-700 bg-green-500" />
          </div>

          <div className="relative h-[44px] w-[58px] rounded-[16px] border border-white-700 bg-[var(--color-accent)] shadow-[0_12px_34px_rgba(0,0,0,0.36)]">
            <div className="absolute inset-[3px] rounded-[13px] border border-stone-700/[0.04]" />
            <div className="absolute -left-2 top-3 h-5 w-2 rounded-l-full border border-r-0 border-stone-700 bg-[var(--color-accent)]" />
            <div className="absolute -right-2 top-3 h-5 w-2 rounded-r-full border border-l-0 border-stone-700 bg-[var(--color-accent)]" />
            <motion.div
              className="absolute left-1/2 top-3 h-2 w-2 -translate-x-1/2 rounded-full bg-[#a4d3cc]"
              animate={{ boxShadow: ["0 0 0 rgba(164,211,204,0)", "0 0 14px rgba(104, 239, 218, 0.7)", "0 0 0 rgba(164,211,204,0)"] }}
              transition={{ duration: 2.6, repeat: Infinity }}
            />
            <div className="absolute bottom-3 left-4 right-4 h-px bg-stone-700" />
            <div className="absolute bottom-5 left-5 right-5 h-px bg-stone-800" />
          </div>

          <div className="mt-2 h-px w-14 bg-stone-800" />
          <div className="mt-1 h-px w-8 bg-stone-900" />
        </motion.div>
      </motion.button>

      <AboutPanel visible={panelVisible} onClose={handleClose} />
    </>
  );
}
