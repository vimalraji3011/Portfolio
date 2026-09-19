"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

type NodeDef = {
  position: [number, number, number];
  color: string;
};

const NODES: NodeDef[] = [
  { position: [-3.2, 0.6, -1.5], color: "#22d3ee" },
  { position: [3, 1.1, -3], color: "#3b82f6" },
  { position: [-1.8, -1.1, -4], color: "#818cf8" },
  { position: [2.2, -0.6, -1.2], color: "#22d3ee" },
  { position: [0, 1.8, -3.6], color: "#3b82f6" },
  { position: [-3.6, -0.4, -3.4], color: "#67e8f9" },
];

const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [1, 4],
  [4, 5],
  [0, 5],
];

function ConnectionLine({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const points = useMemo<[THREE.Vector3, THREE.Vector3]>(() => [from, to], [from, to]);

  return <Line points={points} color="#38bdf8" transparent opacity={0.25} lineWidth={1} />;
}

function DataPacket({ from, to, speed, offset }: { from: THREE.Vector3; to: THREE.Vector3; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * speed + offset) % 1;
    ref.current.position.lerpVectors(from, to, t);
    const scale = 0.5 + Math.sin(t * Math.PI) * 0.7;
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#a5f3fc" />
    </mesh>
  );
}

function ServiceNode({ position, color, index }: NodeDef & { index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6 + index) * 0.15;
    ref.current.rotation.y = clock.elapsedTime * 0.3;
  });

  return (
    <group>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      <pointLight position={position} color={color} intensity={2.5} distance={4} decay={2} />
    </group>
  );
}

export function ServiceNodes() {
  const vectors = useMemo(() => NODES.map((n) => new THREE.Vector3(...n.position)), []);

  return (
    <group>
      {NODES.map((node, i) => (
        <ServiceNode key={i} {...node} index={i} />
      ))}
      {LINKS.map(([a, b], i) => (
        <ConnectionLine key={i} from={vectors[a]} to={vectors[b]} />
      ))}
      {LINKS.map(([a, b], i) => (
        <DataPacket
          key={`packet-${i}`}
          from={vectors[a]}
          to={vectors[b]}
          speed={0.25 + (i % 3) * 0.08}
          offset={i * 0.17}
        />
      ))}
    </group>
  );
}
