"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { useFrame, ThreeEvent, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const GRID_SPACING = 6; // px between particles — uniform grid
const PARTICLE_SIZE = 0.04; // Three.js point size
const TEXT = "RISHIDEEP\nMANDAVILLI";
const REPEL_RADIUS = 0.4;
const REPEL_STRENGTH = 0.7;
const RETURN_SPEED = 0.05;

// Pastel colors for background particles
const PASTELS = [
  new THREE.Color("#54a0ec"), // soft blue
  new THREE.Color("#bf8af5"), // soft lavender
  new THREE.Color("#88f4be"), // soft mint
  new THREE.Color("#f88fc3"), // soft pink
  new THREE.Color("#f9f37e"), // soft cream
  new THREE.Color("#76fcf5"), // soft cyan
  new THREE.Color("#fd8efd"), // soft magenta
  new THREE.Color("#b18af1"), // soft violet
];

const BLACK = new THREE.Color("#000000");

// ---------------------------------------------------------------------------
// Auto-camera — adjusts FOV and Z to fit grid nicely
// ---------------------------------------------------------------------------

function AutoCamera() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const resize = () => {
      if (camera instanceof THREE.PerspectiveCamera) {
        const rect = gl.domElement.getBoundingClientRect();
        const aspect = rect.width / rect.height;
        camera.fov = aspect > 1.5 ? 45 : 55;
        camera.position.z = aspect > 1.5 ? 2.8 : 3.2;
        camera.updateProjectionMatrix();
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [camera, gl]);

  return null;
}

// ---------------------------------------------------------------------------
// Build uniform grid + text mask
// ---------------------------------------------------------------------------

interface ParticleData {
  ox: number; // original x (world coords)
  oy: number; // original y (world coords)
  color: THREE.Color;
  isText: boolean;
}

function buildGrid(canvasWidth: number, canvasHeight: number) {
  const particles: ParticleData[] = [];

  // 1. Build high-res text mask
  const maskCanvas = document.createElement("canvas");
  const maskCtx = maskCanvas.getContext("2d");
  if (!maskCtx) return particles;

  const maskW = canvasWidth;
  const maskH = canvasHeight;
  maskCanvas.width = maskW;
  maskCanvas.height = maskH;

  maskCtx.clearRect(0, 0, maskW, maskH);
  maskCtx.fillStyle = "#ffffff";
  const textFontSize = Math.floor(Math.min(canvasWidth / 7.2, canvasHeight / 2.75, 132));
  maskCtx.font = `900 ${textFontSize}px "Inter", "Arial", sans-serif`;
  maskCtx.textAlign = "center";
  maskCtx.textBaseline = "middle";

  // Handle multi-line text
  const lines = TEXT.includes("\n") ? TEXT.split("\n") : [TEXT];
  const lineH = textFontSize * 1.08;
  const totalH = lines.length * lineH;
  const startY = (maskH - totalH) / 2 + lineH / 2;

  lines.forEach((line, i) => {
    maskCtx.fillText(line, maskW / 2, startY + i * lineH);
  });

  const imageData = maskCtx.getImageData(0, 0, maskW, maskH);
  const data = imageData.data;

  // 2. Sample uniform grid positions
  const cols = Math.floor(maskW / GRID_SPACING);
  const rows = Math.floor(maskH / GRID_SPACING);

  // World-space scale factor: map canvas pixels to Three.js units
  const worldW = 4.2; // total width in world coords
  const worldH = (canvasHeight / canvasWidth) * worldW;
  const scaleX = worldW / maskW;
  const scaleY = worldH / maskH;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const px = col * GRID_SPACING + GRID_SPACING / 2;
      const py = row * GRID_SPACING + GRID_SPACING / 2;

      // Check if this grid position falls within text
      const idx = (Math.floor(py) * maskW + Math.floor(px)) * 4;
      const alpha = idx < data.length ? data[idx + 3] : 0;
      const isText = alpha > 128;

      // Convert to world coordinates (centered at origin)
      const wx = (px - maskW / 2) * scaleX;
      const wy = -(py - maskH / 2) * scaleY; // flip Y for Three.js

      const color = isText
        ? BLACK.clone()
        : PASTELS[Math.floor(Math.random() * PASTELS.length)].clone();

      particles.push({ ox: wx, oy: wy, color, isText });
    }
  }

  return particles;
}

// ---------------------------------------------------------------------------
// ParticleGrid — renders the structured grid with magnetic physics
// ---------------------------------------------------------------------------

function ParticleGrid() {
  const pointsRef = useRef<THREE.Points>(null);
  const colorsRef = useRef<Float32Array | null>(null);
  const mouseRef = useRef({ x: Infinity, y: Infinity });
  const [dims, setDims] = useState({ w: 500, h: 384 });

  // Get canvas dimensions from Three.js renderer
  const { gl } = useThree();
  useEffect(() => {
    const update = () => {
      const rect = gl.domElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDims({ w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    };
    update();
    const id = setTimeout(update, 150);
    window.addEventListener("resize", update);
    return () => { clearTimeout(id); window.removeEventListener("resize", update); };
  }, [gl]);

  // Build grid geometry
  const { geometry, particleData } = useMemo(() => {
    const particles = buildGrid(dims.w, dims.h);
    const count = particles.length;

    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(count * 3);
    const colArray = new Float32Array(count * 3);

    particles.forEach((p, i) => {
      posArray[i * 3] = p.ox;
      posArray[i * 3 + 1] = p.oy;
      posArray[i * 3 + 2] = 0;

      colArray[i * 3] = p.color.r;
      colArray[i * 3 + 1] = p.color.g;
      colArray[i * 3 + 2] = p.color.b;
    });

    geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colArray, 3));

    return { geometry, particleData: particles };
  }, [dims.w, dims.h]);

  colorsRef.current = geometry.attributes.color.array as Float32Array;

  // Physics loop
  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position;
    if (!positions) return;

    const { x: mouseX, y: mouseY } = mouseRef.current;

    for (let i = 0; i < particleData.length; i++) {
      const p = particleData[i];
      const ix = i * 3;
      const iy = i * 3 + 1;

      const dx = positions.array[ix] - mouseX;
      const dy = positions.array[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPEL_RADIUS && dist > 0.001) {
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
        positions.array[ix] += (dx / dist) * force;
        positions.array[iy] += (dy / dist) * force;
      } else {
        // Return to original position
        positions.array[ix] += (p.ox - positions.array[ix]) * RETURN_SPEED;
        positions.array[iy] += (p.oy - positions.array[iy]) * RETURN_SPEED;
      }
    }

    positions.needsUpdate = true;
  });

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    const point = e.point;
    mouseRef.current = { x: point.x, y: point.y };
  }, []);

  const handlePointerLeave = useCallback(() => {
    mouseRef.current = { x: Infinity, y: Infinity };
  }, []);

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <pointsMaterial
        size={PARTICLE_SIZE}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.85}
      />
    </points>
  );
}

export { ParticleGrid, AutoCamera };
