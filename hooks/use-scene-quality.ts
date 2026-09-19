"use client";

import { useIsMobile, useIsTablet, usePrefersReducedMotion } from "./use-media-query";

export type SceneQuality = "high" | "medium" | "low";

/**
 * Central knob for 3D scene fidelity. Mobile/tablet and reduced-motion
 * preferences scale down particle counts, DPR, and postprocessing so the
 * "premium" look survives on low-power devices instead of just getting laggy.
 */
export function useSceneQuality(): {
  quality: SceneQuality;
  particleCount: number;
  dpr: [number, number];
  enablePostprocessing: boolean;
  reducedMotion: boolean;
} {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const reducedMotion = usePrefersReducedMotion();

  const quality: SceneQuality = isMobile ? "low" : isTablet ? "medium" : "high";

  const particleCount = quality === "high" ? 1400 : quality === "medium" ? 700 : 280;
  const dpr: [number, number] = quality === "high" ? [1, 2] : quality === "medium" ? [1, 1.5] : [1, 1];
  const enablePostprocessing = quality === "high" && !reducedMotion;

  return { quality, particleCount, dpr, enablePostprocessing, reducedMotion };
}
