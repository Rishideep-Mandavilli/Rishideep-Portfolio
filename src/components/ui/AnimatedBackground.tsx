"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  weight: number;
};

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = {
      x: window.innerWidth * 0.62,
      y: window.innerHeight * 0.38,
      tx: window.innerWidth * 0.62,
      ty: window.innerHeight * 0.38,
      active: false,
    };

    let time = 0;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];

    const buildNodes = () => {
      const count = Math.max(34, Math.min(82, Math.floor((width * height) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        weight: Math.random() * 0.8 + 0.2,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;

      const grid = 64;
      const offsetX = (time * 8) % grid;
      const offsetY = (time * 5) % grid;

      for (let x = -grid; x < width + grid; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, height);
        ctx.stroke();
      }

      for (let y = -grid; y < height + grid; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(width, y + offsetY);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawPointerReticle = () => {
      const radius = pointer.active ? 86 : 48;
      ctx.save();
      ctx.translate(pointer.x, pointer.y);
      ctx.rotate(time * 0.16);
      ctx.strokeStyle = "rgba(164, 211, 204, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0.18, Math.PI * 0.72);
      ctx.arc(0, 0, radius, Math.PI + 0.18, Math.PI * 1.72);
      ctx.stroke();
      ctx.strokeStyle = "rgba(214, 174, 124, 0.18)";
      ctx.beginPath();
      ctx.moveTo(-radius - 12, 0);
      ctx.lineTo(-radius + 12, 0);
      ctx.moveTo(radius - 12, 0);
      ctx.lineTo(radius + 12, 0);
      ctx.moveTo(0, -radius - 12);
      ctx.lineTo(0, -radius + 12);
      ctx.moveTo(0, radius - 12);
      ctx.lineTo(0, radius + 12);
      ctx.stroke();
      ctx.restore();
    };

    const drawNodes = () => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const dx = node.x - pointer.x;
        const dy = node.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (pointer.active && dist < 180 && dist > 0.001) {
          const pull = (1 - dist / 180) * 0.028;
          node.vx += (dx / dist) * pull;
          node.vy += (dy / dist) * pull;
        }

        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.992;
        node.vy *= 0.992;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const lx = other.x - node.x;
          const ly = other.y - node.y;
          const linkDist = Math.sqrt(lx * lx + ly * ly);
          if (linkDist < 132) {
            const opacity = (1 - linkDist / 132) * 0.16;
            ctx.strokeStyle = `rgba(164, 211, 204, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        const pulse = 0.5 + Math.sin(time * 1.2 + i) * 0.5;
        ctx.fillStyle = `rgba(164, 211, 204, ${0.16 + pulse * 0.18})`;
        ctx.fillRect(node.x - 1, node.y - 1, 2 + node.weight, 2 + node.weight);
      }
    };

    const draw = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      time += reducedMotion.matches ? 0.003 : 0.012;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(3, 3, 3, 0.92)";
      ctx.fillRect(0, 0, width, height);
      drawGrid();
      drawNodes();
      drawPointerReticle();

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
