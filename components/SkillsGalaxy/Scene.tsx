"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { Group } from "three";
import { skills } from "@/lib/data";
import { useSceneQuality } from "@/hooks/use-scene-quality";
import { SkillNode } from "./SkillNode";

function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

function GalaxyCore() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.05, 4]} />
        <MeshDistortMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.6}
          distort={0.35}
          speed={1.5}
          roughness={0.2}
          metalness={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

export function SkillsGalaxyScene() {
  const { quality, reducedMotion } = useSceneQuality();
  const radius = 3.2;
  const positions = useMemo(() => fibonacciSphere(skills.length, radius), []);

  return (
    <Canvas
      dpr={quality === "high" ? [1, 2] : [1, 1]}
      camera={{ fov: 45, position: [0, 0, 8] }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#67e8f9" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#3b82f6" />

      <GalaxyCore />

      <Sparkles
        count={quality === "low" ? 40 : 100}
        scale={[7, 7, 7]}
        size={1.5}
        speed={reducedMotion ? 0 : 0.2}
        color="#38bdf8"
        opacity={0.5}
      />

      <group>
        {skills.map((skill, i) => (
          <SkillNode key={skill.name} skill={skill} position={positions[i]} />
        ))}
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.8}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
      />
    </Canvas>
  );
}
