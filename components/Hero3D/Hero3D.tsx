"use client";

import dynamic from "next/dynamic";
import { SceneFallback } from "@/components/shared/lazy-scene";
import { HeroContent } from "./HeroContent";

const HeroScene = dynamic(() => import("./Scene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <SceneFallback />,
});

export function Hero3D() {
  return (
    <section
      id="home"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <HeroContent />
    </section>
  );
}
