"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CNode {
  id: string;
  label: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  action: () => void;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const DATA: CNode[] = [
  {
    id: "mail", label: "Email", desc: "Send a direct message", color: "#3b82f6",
    action: () => (window.location.href = "mailto:rishideep.edu@gmail.com"),
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
  },
  {
    id: "github", label: "GitHub", desc: "View repositories", color: "#6b7280",
    action: () => window.open("https://github.com/Rishideep-Mandavilli", "_blank"),
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: "linkedin", label: "LinkedIn", desc: "Connect professionally", color: "#2563eb",
    action: () => window.open("https://linkedin.com/in/rishideepmandavilli", "_blank"),
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "instagram", label: "Instagram", desc: "Follow visual updates", color: "#e1306c",
    action: () => window.open("https://instagram.com/rishideep.mandavilli", "_blank"),
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "x", label: "X (Twitter)", desc: "Follow my thoughts", color: "#464950",
    action: () => window.open("https://x.com/RishideepM15", "_blank"),
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// Bezier S-curve
// ---------------------------------------------------------------------------

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const c = Math.max(Math.abs(x2 - x1) * 0.5, 60);
  return `M${x1} ${y1} C${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`;
}

// ---------------------------------------------------------------------------
// Animated flow dot on connection
// ---------------------------------------------------------------------------

function FlowDot({ path, color, delay }: { path: string; color: string; delay: number }) {
  return (
    <>
      <motion.circle r={3} fill={color} opacity={0.8} initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay }} />
      <motion.circle r={6} fill={color} opacity={0.15} initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ delay }} />
      <animateMotion dur="4s" repeatCount="indefinite" begin={`${delay}s`} path={path} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Contact Section
// ---------------------------------------------------------------------------

const CW = 200;
const CH = 70;
const SRC_W = 220;
const SRC_H = 70;

export function Contact() {
  const boxRef = useRef<HTMLDivElement>(null);

  // Dimensions
  const [W, setW] = useState(960);
  const [H, setH] = useState(520);

  // Layout
  const sx = W * 0.3;
  const sy = H / 2;
  const spX = sx + SRC_W / 2; // right edge of source card
  const spY = sy;

  const nx = W * 0.85;
  const spacing = Math.min(100, (H - 110) / DATA.length);
  const startY = (H - (DATA.length - 1) * spacing) / 2;

  // State
  const [dragging, setDragging] = useState(false);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [nearId, setNearId] = useState<string | null>(null);
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Resize
  useEffect(() => {
    const update = () => {
      if (boxRef.current) {
        const r = boxRef.current.getBoundingClientRect();
        setW(r.width);
        setH(Math.max(r.height, 480));
      }
    };
    const id = setTimeout(update, 100);
    window.addEventListener("resize", update);
    return () => { clearTimeout(id); window.removeEventListener("resize", update); };
  }, []);

  // Nearest target port
  const nearest = useCallback((x: number, y: number): string | null => {
    let best: string | null = null;
    let bestD = 55;
    DATA.forEach((_, i) => {
      const px = nx - CW / 2;
      const py = startY + i * spacing;
      const d = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      if (d < bestD) { bestD = d; best = DATA[i].id; }
    });
    return best;
  }, [nx, spacing]);

  // Pointer: drag from output port
  const onDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault(); // Prevent page drag
    if (!boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    // Port is at right edge of source card
    if (Math.abs(x - spX) < 20 && Math.abs(y - spY) < 20) {
      setDragging(true);
      setMx(x);
      setMy(y);
    }
  }, [spX, spY]);

  const onMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    if (!dragging || !boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    setMx(e.clientX - r.left);
    setMy(e.clientY - r.top);
    setNearId(nearest(e.clientX - r.left, e.clientY - r.top));
  }, [dragging, nearest]);

  const onUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    if (nearId) {
      const node = DATA.find((n) => n.id === nearId);
      if (node) {
        node.action();
        setConnected((p) => new Set(p).add(nearId));
        setPulseId(nearId);
        setTimeout(() => setPulseId(null), 500);
      }
    }
    setNearId(null);
  }, [dragging, nearId]);

  const onNodeClick = useCallback((id: string) => {
    const node = DATA.find((n) => n.id === id);
    if (node) {
      node.action();
      setConnected((p) => new Set(p).add(id));
      setPulseId(id);
      setTimeout(() => setPulseId(null), 500);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Header - fixed visibility */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-stone-700 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-[11px] font-medium text-green-500 tracking-wider uppercase">Connect</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Get in Touch</h2>
        <p className="text-stone-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
          Connect with me across platforms. Drag from the output port or click any card.
        </p>
      </div>

      {/* Canvas */}
      <div
        ref={boxRef}
        className="relative w-full max-w-[1200px] mx-auto rounded-2xl overflow-hidden select-none"
        draggable={false}
        style={{
          height: H,
          backgroundColor: "#1a1612",
          border: "5px solid #42f18b",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.8)",
          touchAction: "none",
          userSelect: "none",
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={() => { if (dragging) onUp(); }}
      >
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, #d8d5d0 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.35,
        }} />

        {/* Decorative corner labels — technical feel */}
        <div className="absolute top-3 left-4 pointer-events-none">
          <span className="text-[9px] font-mono text-stone-300 tracking-wider uppercase">canvas:contact_flow</span>
        </div>
        <div className="absolute top-3 right-4 pointer-events-none">
          <span className="text-[9px] font-mono text-stone-300 tracking-wider uppercase">nodes: {DATA.length} · edges: {connected.size}</span>
        </div>

        {/* SVG layer */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1, pointerEvents: "none" }}>
          {/* Connected edges */}
          {[...connected].map((id) => {
            const i = DATA.findIndex((n) => n.id === id);
            if (i < 0) return null;
            const px = nx - CW / 2;
            const py = startY + i * spacing;
            const d = bezier(spX, spY, px, py);
            return (
              <g key={id}>
                {/* Wide glow */}
                <path d={d} fill="none" stroke={DATA[i].color} strokeWidth={8} strokeLinecap="round" opacity={0.05} />
                {/* Main edge */}
                <motion.path
                  d={d}
                  fill="none"
                  stroke={DATA[i].color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ pointerEvents: "auto", cursor: "pointer" }}
                  onClick={() => onNodeClick(id)}
                />
                {/* Flow dots */}
                <g>
                  <FlowDot path={d} color={DATA[i].color} delay={0} />
                  <FlowDot path={d} color={DATA[i].color} delay={2} />
                </g>
              </g>
            );
          })}

          {/* Drag line */}
          {dragging && (() => {
            const nearIdx = nearId ? DATA.findIndex((n) => n.id === nearId) : -1;
            const target = nearIdx >= 0 ? { x: nx - CW / 2, y: startY + nearIdx * spacing } : null;
            const tx = target ? target.x : mx;
            const ty = target ? target.y : my;
            const snapColor = nearId ? DATA[nearIdx]?.color : "#a8a29e";
            return (
              <>
                <path
                  d={bezier(spX, spY, tx, ty)}
                  fill="none"
                  stroke={snapColor}
                  strokeWidth={nearId ? 2 : 1.5}
                  strokeLinecap="round"
                  strokeDasharray={nearId ? "none" : "6 4"}
                  style={{ transition: "stroke 0.15s, stroke-dasharray 0.15s" }}
                />
                {/* Drag end indicator */}
                <circle cx={tx} cy={ty} r={5} fill={snapColor} opacity={0.6} />
                <circle cx={tx} cy={ty} r={10} fill={snapColor} opacity={0.12} />
                {nearId && (
                  <circle cx={tx} cy={ty} r={16} fill="none" stroke={snapColor} strokeWidth={1} opacity={0.3} strokeDasharray="3 3">
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${tx} ${ty}`} to={`360 ${tx} ${ty}`} dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
              </>
            );
          })()}
        </svg>

        {/* Source node */}
        <div className="absolute select-none" style={{ left: sx - SRC_W / 2, top: sy - SRC_H / 2, width: SRC_W, height: SRC_H, zIndex: 15 }}>
          <div
            className="w-full h-full rounded-xl overflow-hidden border border-stone-200/80 bg-white/90 backdrop-blur-sm"
            style={{
              boxShadow: dragging
                ? "0 0 0 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)"
                : "0 1px 3px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            {/* Header */}
            <div className="h-[3px] w-full bg-gradient-to-r from-stone-400 via-stone-500 to-stone-400" />
            {/* Body */}
            <div className="flex items-center gap-3 px-3.5 py-2.5">
              <div className="w-9 h-9 rounded-lg bg-stone-100 border border-stone-200/60 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div>
                <div className="text-[12px] font-semibold text-stone-700">Contact</div>
                <div className="text-[10.5px] text-stone-400 font-medium">Trigger node</div>
              </div>
            </div>
          </div>
          {/* Output port — RIGHT edge of card */}
          <div
            className="absolute w-4 h-4 rounded-full border-2 bg-white border-stone-400 cursor-grab active:cursor-grabbing transition-all duration-150"
            style={{
              left: SRC_W - 8, // right edge minus half width
              top: SRC_H / 2 - 8,
              boxShadow: dragging ? "0 0 0 4px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            {/* Inner dot */}
            <div className="absolute inset-1.5 rounded-full bg-stone-400" />
          </div>
        </div>

        {/* Target nodes */}
        {DATA.map((node, i) => {
          const py = startY + i * spacing;
          const active = connected.has(node.id);
          const near = nearId === node.id;
          const hovered = hoveredId === node.id;
          const pulsing = pulseId === node.id;

          return (
            <motion.div
              key={node.id}
              className="absolute select-none"
              style={{ left: nx - CW / 2, top: py - CH / 2, width: CW, height: CH, zIndex: near ? 20 : 10, cursor: "pointer" }}
              animate={{ scale: near ? 1.04 : pulsing ? 1.02 : hovered ? 1.015 : 1, y: near ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              onPointerEnter={() => setHoveredId(node.id)}
              onPointerLeave={() => setHoveredId(null)}
              onClick={() => onNodeClick(node.id)}
            >
              {/* Card */}
              <div
                className="w-full h-full rounded-xl overflow-hidden border bg-white/90 backdrop-blur-sm transition-all duration-150"
                style={{
                  borderColor: near ? node.color : active ? node.color : hovered ? "#d6d3cd" : "#e8e6e3",
                  borderWidth: near ? 2 : active ? 1.5 : 1,
                  boxShadow: near
                    ? `0 0 0 3px ${node.color}12, 0 8px 20px rgba(0,0,0,0.07)`
                    : active
                      ? `0 0 0 2px ${node.color}08, 0 4px 14px rgba(0,0,0,0.05)`
                      : "0 1px 3px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                {/* Header strip */}
                <div className="h-[3px] w-full" style={{ backgroundColor: node.color }} />
                {/* Body */}
                <div className="flex items-center gap-3 px-3.5 py-2.5">
                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors duration-150"
                    style={{
                      backgroundColor: active || near ? `${node.color}12` : "#f7f6f4",
                      borderColor: active || near ? `${node.color}20` : "#e8e6e3",
                    }}
                  >
                    <div style={{ color: active || near ? node.color : "#a8a29e" }}>{node.icon}</div>
                  </div>
                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold truncate" style={{ color: active || near ? node.color : "#374151" }}>
                      {node.label}
                    </div>
                    <div className="text-[10.5px] text-stone-400 truncate mt-0.5 leading-tight">{node.desc}</div>
                  </div>
                  {/* Status dot */}
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200"
                    style={{
                      backgroundColor: active ? node.color : "#e8e6e3",
                      boxShadow: active ? `0 0 0 2px ${node.color}20` : "none",
                    }}
                  />
                </div>
              </div>
              {/* Input port — LEFT edge */}
              <div
                className="absolute w-4 h-4 rounded-full border-2 bg-white transition-all duration-150"
                style={{
                  left: -8,
                  top: CH / 2 - 8,
                  borderColor: near ? node.color : active ? node.color : "#d6d3cd",
                  borderWidth: near ? 2.5 : 1.5,
                  boxShadow: near ? `0 0 0 3px ${node.color}18` : active ? `0 0 0 2px ${node.color}10` : "none",
                }}
              >
                <div className="absolute inset-1.5 rounded-full" style={{ backgroundColor: near || active ? node.color : "#d6d3cd" }} />
              </div>
            </motion.div>
          );
        })}

        {/* Status bar */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/70 backdrop-blur-sm border-t border-stone-200/50 flex items-center px-4 gap-4" style={{ zIndex: 10 }}>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${dragging ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
            <span className="text-[10px] font-mono font-medium text-green-600">
              {dragging ? "connecting…" : `${connected.size}/${DATA.length} edges`}
            </span>
          </div>
          {nearId && (
            <span className="text-[10px] font-mono font-medium" style={{ color: DATA.find((n) => n.id === nearId)?.color }}>
              → {DATA.find((n) => n.id === nearId)?.label}
            </span>
          )}
          <div className="flex-1" />
          <span className="text-[10px] font-mono text-stone-600">drag from ● port to connect</span>
        </div>
      </div>
    </div>
  );
}
