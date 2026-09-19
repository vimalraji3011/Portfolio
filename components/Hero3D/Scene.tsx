"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles, Grid, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useSceneQuality } from "@/hooks/use-scene-quality";
import { CameraRig } from "./CameraRig";
import { ServiceNodes } from "./ServiceNodes";

export function HeroScene() {
  const { quality, particleCount, dpr, enablePostprocessing, reducedMotion } = useSceneQuality();

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: quality !== "low", powerPreference: "high-performance" }}
      camera={{ fov: 50, position: [0, 1.2, 9] }}
    >
      <color attach="background" args={["#050810"]} />
      <fog attach="fog" args={["#050810", 4, 16]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={0.6} color="#8ecdf8" />

      <Stars
        radius={40}
        depth={30}
        count={quality === "low" ? 800 : quality === "medium" ? 1800 : 3000}
        factor={2.2}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.4}
      />

      <Sparkles
        count={particleCount}
        scale={[12, 6, 10]}
        size={2}
        speed={reducedMotion ? 0 : 0.25}
        color="#67e8f9"
        opacity={0.6}
        position={[0, 0.5, -2]}
      />

      <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <ServiceNodes />
      </Float>

      <Grid
        position={[0, -1.6, 0]}
        args={[40, 40]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#0e3a52"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#22d3ee"
        fadeDistance={18}
        fadeStrength={1.5}
        infiniteGrid
      />

      <CameraRig reducedMotion={reducedMotion} />

      {enablePostprocessing && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
