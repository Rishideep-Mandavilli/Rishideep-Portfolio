"use client";

import { Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleGrid, AutoCamera } from "./MagneticText";
import { StaticNameplate } from "./StaticNameplate";

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <StaticNameplate /> : this.props.children;
  }
}

export default function FieldCanvas() {
  return (
    <WebGLBoundary>
      <div className="noise-surface relative h-[min(58vw,300px)] min-h-[220px] overflow-hidden border border-line bg-well md:h-[360px]">
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
        >
          <AutoCamera />
          <ParticleGrid />
        </Canvas>
      </div>
    </WebGLBoundary>
  );
}
