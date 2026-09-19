"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/shared/section-heading";
import { LazyScene } from "@/components/shared/lazy-scene";
import { MousePointerClick } from "lucide-react";

const ArchitectureCanvas = dynamic(
  () => import("./Scene").then((m) => m.ArchitectureCanvas),
  { ssr: false },
);

export function ArchitectureScene() {
  return (
    <section id="architecture" className="relative mx-auto max-w-6xl px-4 py-28">
      <SectionHeading
        eyebrow="Architecture"
        title="How the microservices talk to each other"
        description="A live look at the service graph behind the healthcare platform — data packets flow between services in real time."
      />

      <LazyScene className="mx-auto mt-12 h-[520px] w-full max-w-4xl sm:h-[600px]">
        <ArchitectureCanvas />
      </LazyScene>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <MousePointerClick className="h-3.5 w-3.5" />
        Drag to rotate the graph
      </div>
    </section>
  );
}
