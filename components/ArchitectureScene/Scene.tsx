"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import {
  architectureLinks,
  architectureNodes,
  type ArchitectureNode,
} from "@/lib/data";
import { useSceneQuality } from "@/hooks/use-scene-quality";
import { cn } from "@/lib/utils";

function layoutPositions(): Record<string, THREE.Vector3> {
  const core = architectureNodes.filter((n) => n.group === "core");
  const infra = architectureNodes.filter((n) => n.group === "infra");
  const positions: Record<string, THREE.Vector3> = {};

  const coreRadius = 2.6;
  core.forEach((node, i) => {
    const angle = (i / core.length) * Math.PI * 2;
    positions[node.id] = new THREE.Vector3(
      Math.cos(angle) * coreRadius,
      Math.sin(angle * 0.6) * 0.8 + 0.4,
      Math.sin(angle) * coreRadius,
    );
  });

  const infraRadius = 1.6;
  infra.forEach((node, i) => {
    const angle = (i / infra.length) * Math.PI * 2 + Math.PI / 4;
    positions[node.id] = new THREE.Vector3(
      Math.cos(angle) * infraRadius,
      -2.2,
      Math.sin(angle) * infraRadius,
    );
  });

  return positions;
}

function Node({ node, position }: { node: ArchitectureNode; position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = node.group === "core" ? "#22d3ee" : "#a78bfa";

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      position.y + Math.sin(clock.elapsedTime * 0.8 + position.x) * 0.08;
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <icosahedronGeometry args={[node.group === "core" ? 0.28 : 0.34, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2.2 : 1.2}
          toneMapped={false}
        />
      </mesh>
      <pointLight position={position} color={color} intensity={hovered ? 4 : 2} distance={4} decay={2} />
      <Html position={[position.x, position.y - 0.5, position.z]} center distanceFactor={9}>
        <div
          className={cn(
            "pointer-events-none rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap transition-colors",
            "glass",
          )}
          style={{
            borderColor: hovered ? color : "rgba(255,255,255,0.12)",
            color: hovered ? color : "var(--muted-foreground)",
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

function Packet({ from, to, speed, offset }: { from: THREE.Vector3; to: THREE.Vector3; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * speed + offset) % 1;
    ref.current.position.lerpVectors(from, to, t);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color="#a5f3fc" />
    </mesh>
  );
}

function Graph() {
  const positions = useMemo(layoutPositions, []);

  return (
    <group>
      {architectureNodes.map((node) => (
        <Node key={node.id} node={node} position={positions[node.id]} />
      ))}
      {architectureLinks.map(([a, b], i) => {
        const from = positions[a];
        const to = positions[b];
        return (
          <group key={`${a}-${b}`}>
            <Line points={[from, to]} color="#38bdf8" transparent opacity={0.22} lineWidth={1} />
            <Packet from={from} to={to} speed={0.18 + (i % 4) * 0.05} offset={i * 0.13} />
          </group>
        );
      })}
    </group>
  );
}

export function ArchitectureCanvas() {
  const { quality, reducedMotion } = useSceneQuality();

  return (
    <Canvas
      dpr={quality === "high" ? [1, 2] : [1, 1]}
      camera={{ fov: 48, position: [0, 1.5, 8] }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={0.5} color="#8ecdf8" />

      <Graph />

      <Sparkles
        count={quality === "low" ? 30 : 80}
        scale={[8, 5, 8]}
        size={1.5}
        speed={reducedMotion ? 0 : 0.2}
        color="#67e8f9"
        opacity={0.4}
      />

      <OrbitControls
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.6}
        minDistance={5}
        maxDistance={12}
      />
    </Canvas>
  );
}
