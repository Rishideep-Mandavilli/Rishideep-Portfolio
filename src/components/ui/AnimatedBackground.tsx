"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  bvx: number;
  bvy: number;
  springK: number;
  weight: number;
  energy: number;
};

const LINK_DIST = 150;
const CURSOR_DIST = 220;

type Mote = { x: number; y: number; vx: number; vy: number; s: number; a: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number };

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = window.innerWidth;
    let h = window.innerHeight;
    let nodes: Node[] = [];
    let dust: Mote[] = [];
    const sparks: Spark[] = [];

    const buildNodes = () => {
      const count = Math.max(28, Math.min(80, Math.floor((w * h) / 24000)));
      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.03 + Math.random() * 0.05;
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          vx: 0,
          vy: 0,
          ax: x,
          ay: y,
          bvx: Math.cos(angle) * speed,
          bvy: Math.sin(angle) * speed,
          springK: 0.008 + Math.random() * 0.014,
          weight: 0.5 + Math.random() * 1.2,
          energy: 0,
        };
      });
    };

    const buildDust = () => {
      const count = Math.max(36, Math.min(90, Math.floor((w * h) / 20000)));
      dust = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.008 + Math.random() * 0.02;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          s: 0.6 + Math.random() * 0.9,
          a: 0.08 + Math.random() * 0.18,
        };
      });
    };

    const syncSize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
      buildDust();
      if (reducedMotion) draw();
    };

    const pointer = {
      x: -9999,
      y: -9999,
      tx: -9999,
      ty: -9999,
      active: false,
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    const step = () => {
      // eased pointer
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;

      for (const n of nodes) {
        // cursor repulsion — real impulse, felt immediately
        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < CURSOR_DIST && d > 0.001) {
            const falloff = 1 - d / CURSOR_DIST;
            const push = falloff * falloff * 1.6;
            n.vx += (dx / d) * push;
            n.vy += (dy / d) * push;
            const wasEnergized = n.energy;
            n.energy = Math.max(n.energy, falloff);

            // hard shoves eject sparks — disturbance reads as energy, not loss
            if (falloff > 0.45 && wasEnergized < 0.3 && sparks.length < 90 && Math.random() < 0.35) {
              const kick = 0.8 + Math.random() * 1.4;
              sparks.push({
                x: n.x,
                y: n.y,
                vx: (dx / d) * kick + (Math.random() - 0.5) * 0.6,
                vy: (dy / d) * kick + (Math.random() - 0.5) * 0.6,
                life: 1,
              });
            }
          } else {
            n.energy *= 0.94;
          }
        } else {
          n.energy *= 0.96;
        }

        // anchors wander slowly — the formation breathes but keeps its shape
        n.ax += n.bvx;
        n.ay += n.bvy;
        if (n.ax < -24 || n.ax > w + 24) n.bvx *= -1;
        if (n.ay < -24 || n.ay > h + 24) n.bvy *= -1;

        // spring home — the constellation always re-forms after a disturbance
        n.vx += (n.ax - n.x) * n.springK;
        n.vy += (n.ay - n.y) * n.springK;
        n.vx *= 0.95;
        n.vy *= 0.95;
        n.x += n.vx;
        n.y += n.vy;
      }

      for (let i = dust.length - 1; i >= 0; i--) {
        const m = dust[i];
        m.x += m.vx;
        m.y += m.vy;
        if (m.x < 0) m.x = w;
        if (m.x > w) m.x = 0;
        if (m.y < 0) m.y = h;
        if (m.y > h) m.y = 0;
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.95;
        sp.vy *= 0.95;
        sp.life *= 0.92;
        if (sp.life < 0.04) sparks.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // deep field — the sky is never empty, even mid-disturbance
      for (const m of dust) {
        ctx.fillStyle = `rgba(154,162,175,${m.a})`;
        ctx.fillRect(m.x, m.y, m.s, m.s);
      }

      // mesh links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy);
          if (d >= LINK_DIST) continue;
          const t = 1 - d / LINK_DIST;
          const lift = Math.max(a.energy, b.energy);
          const alpha = 0.05 + t * 0.07 + lift * t * 0.22;
          if (lift > 0.25) {
            ctx.strokeStyle = `rgba(200,245,80,${alpha})`;
          } else {
            ctx.strokeStyle = `rgba(154,162,175,${alpha})`;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // the visitor is a hub — wire nearby nodes straight to the cursor
      if (pointer.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d >= CURSOR_DIST) continue;
          const t = 1 - d / CURSOR_DIST;
          ctx.strokeStyle = `rgba(200,245,80,${t * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      // nodes — gray dust that ignites lime under pressure
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const e = n.energy;
        const size = 1.6 + n.weight + e * 1.6;

        if (e > 0.15) {
          ctx.fillStyle = `rgba(200,245,80,${0.16 + e * 0.3})`;
          ctx.fillRect(n.x - size, n.y - size, size * 2, size * 2);
        }
        ctx.fillStyle =
          e > 0.15
            ? `rgba(200,245,80,${0.55 + e * 0.45})`
            : `rgba(154,162,175,${0.34 + n.weight * 0.12})`;
        ctx.fillRect(n.x - size / 2, n.y - size / 2, size, size);
      }

      // ejected sparks
      for (const sp of sparks) {
        const sz = 1.2 + sp.life * 2.4;
        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(200,245,80,${sp.life * 0.75})`;
        ctx.fillRect(-sz / 2, -sz / 2, sz, sz);
        ctx.restore();
      }
    };

    const frame = () => {
      step();
      draw();
      requestAnimationFrame(frame);
    };

    syncSize();

    if (reducedMotion) {
      draw();
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      requestAnimationFrame(frame);
    }

    window.addEventListener("resize", syncSize);

    return () => {
      window.removeEventListener("resize", syncSize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
