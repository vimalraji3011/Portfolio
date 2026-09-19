"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/use-mouse-position";

const START = new THREE.Vector3(0, 1.2, 9);
const END = new THREE.Vector3(0, 0.4, 5.2);

export function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const mouse = useMousePosition();
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    const flyProgress = reducedMotion ? 1 : Math.min(elapsed.current / 3.2, 1);
    const eased = 1 - Math.pow(1 - flyProgress, 3);

    const base = new THREE.Vector3().lerpVectors(START, END, eased);

    const parallaxStrength = 0.5;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      base.x + mouse.x * parallaxStrength,
      4,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      base.y + mouse.y * (parallaxStrength * 0.6),
      4,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(camera.position.z, base.z, 4, delta);

    camera.lookAt(0, 0.1, -2);
  });

  return null;
}
