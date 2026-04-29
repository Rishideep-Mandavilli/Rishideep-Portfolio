"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
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
    const maxMove = 3;
    pos.current.x += (targetX * maxMove - pos.current.x) * 0.1;
    pos.current.y += (targetY * maxMove - pos.current.y) * 0.1;
    pupilRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
  });

  return (
    <motion.div
      className="relative w-[10px] h-[10px] rounded-full overflow-hidden bg-white"
      animate={blink ? { scaleY: 0.1 } : { scaleY: 1 }}
      transition={blink ? { duration: 0.08 } : { duration: 0.12 }}
    >
      <div
        ref={pupilRef}
        className="absolute w-[5px] h-[5px] rounded-full bg-stone-700"
        style={{ left: "2.5px", top: "2.5px" }}
      />
    </motion.div>
  );
}

interface AboutPanelProps {
  visible: boolean;
  onClose: () => void;
}

function AboutPanel({ visible, onClose }: AboutPanelProps) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="fixed inset-0 z-[9998] bg-stone-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2 w-[520px] max-w-[90vw]"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-stone-200/30">
              <div className="h-[3px] w-full bg-gradient-to-r from-stone-400 via-stone-500 to-stone-400" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center text-stone-300 hover:text-stone-500 hover:bg-stone-100/80 transition-colors"
                aria-label="Close"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="px-7 pt-5 pb-6">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-b from-stone-100 to-stone-200/80 border border-stone-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.6)_inset]">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-400 shadow-[0_0_4px_rgba(0,0,0,0.1)]" />
                    <span className="text-[10px] font-semibold text-stone-500 tracking-[0.15em] uppercase">About</span>
                  </div>
                </div>
                <GlitchText
                  text="Rishideep Mandavilli"
                  className="text-[32px] font-bold text-stone-800 tracking-tight leading-tight"
                />
                <div className="my-4 w-10 h-[2px] rounded-full bg-gradient-to-r from-stone-300 to-stone-200" />
                <p className="text-[14px] leading-[1.75] text-stone-500">
                  I&apos;m Rishideep, a developer focused on AI, automation, and building intelligent systems. I design and build solutions that combine logic, performance, and real-world usability.
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {["AI & ML", "Automation", "Computer Vision", "Full-Stack", "Systems Design"].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 text-[10.5px] font-medium rounded-full bg-stone-50 text-stone-500 border border-stone-200/60"
                    >
                      {t}
                    </span>
                  ))}
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

  const BW = 56;
  const BH = 96;

  useEffect(() => {
    const handler = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
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
        }, 140);
      }, 2500 + Math.random() * 2500);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  // Handle staged animation: bot moves first, then wait, then show panel
  useEffect(() => {
    if (open) {
      setBotAtCenter(true);
      // Wait for bot to reach center (600ms), then wait 200ms more, then show panel
      const timer = setTimeout(() => {
        setTimeout(() => {
          setPanelVisible(true);
        }, 200);
      }, 600);
      return () => {
        clearTimeout(timer);
        setPanelVisible(false);
      };
    } else {
      setBotAtCenter(false);
      setPanelVisible(false);
    }
  }, [open]);

  const idleCx = viewport.w - 24 - BW / 2;
  const idleCy = viewport.h - 24 - BH / 2;
  const dx = cursorPos.x - idleCx;
  const dy = cursorPos.y - idleCy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const nX = dist > 0 ? (dx / dist) * Math.min(dist / 350, 1) : 0;
  const nY = dist > 0 ? (dy / dist) * Math.min(dist / 350, 1) : 0;

  const toCX = viewport.w / 2 - BW / 2;
  const toCY = viewport.h / 2 - 60;
  
  const targetX = botAtCenter ? toCX - idleCx : 0;
  const targetY = botAtCenter ? toCY - idleCy : 0;

  const handleInteraction = useCallback(() => {
    if (!open) {
      onOpenChange(true);
    }
  }, [open, onOpenChange]);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <>
      <motion.div
        className="fixed z-[9990] cursor-pointer select-none"
        style={{ bottom: 24, right: 24 }}
        animate={{ x: targetX, y: targetY }}
        transition={{ 
          type: "spring", 
          stiffness: 80, 
          damping: 24, 
          mass: 1 
        }}
        onClick={handleInteraction}
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={!botAtCenter ? { y: [0, -3, 0] } : { y: 0 }}
            transition={
              !botAtCenter
                ? { duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
                : {}
            }
          >
            <motion.div
              className="relative w-[56px] h-[56px] rounded-[16px] overflow-hidden border border-stone-300/30"
              style={{
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #c4b5a0 0%, #a89b8c 25%, #8b7d6b 50%, #a89b8c 75%, #c4b5a0 100%)",
                  backgroundSize: "300% 300%",
                  animation: "botGradient 5s ease infinite",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none rounded-[16px]" />
              <div className="absolute inset-[1px] rounded-[15px] border border-white/15 pointer-events-none" />
              <div className="absolute inset-[7px] rounded-[10px] bg-stone-800 flex items-center justify-center gap-[8px]">
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.3) 1px, rgba(255,255,255,0.3) 2px)",
                  }}
                />
                <Eye targetX={nX} targetY={nY} blink={blink} />
                <Eye targetX={nX} targetY={nY} blink={blink} />
              </div>
            </motion.div>
            <div className="flex justify-center">
              <motion.div
                className="w-[14px] h-[5px]"
                style={{
                  background: "linear-gradient(90deg, #b0a090, #8b7d6b, #b0a090)",
                  animation: "botGradient 5s ease infinite",
                  backgroundSize: "300% 300%",
                  borderRadius: 2,
                }}
              />
            </div>
            <div className="flex justify-center">
              <motion.div
                className="relative w-[44px] h-[30px] rounded-[10px] border border-stone-300/25"
                style={{
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  background: "linear-gradient(135deg, #c4b5a0 0%, #a89b8c 25%, #8b7d6b 50%, #a89b8c 75%, #c4b5a0 100%)",
                  backgroundSize: "300% 300%",
                  animation: "botGradient 5s ease infinite",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none rounded-[10px]" />
                <motion.div
                  className="w-[4px] h-[4px] rounded-full bg-stone-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black/[0.04]" />
          </motion.div>
        </div>
      </motion.div>

      <AboutPanel visible={panelVisible} onClose={handleClose} />

      <style>{`
        @keyframes botGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}