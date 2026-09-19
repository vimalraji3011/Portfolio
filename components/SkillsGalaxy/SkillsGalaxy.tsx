"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/shared/section-heading";
import { LazyScene } from "@/components/shared/lazy-scene";

const SkillsGalaxyScene = dynamic(
  () => import("./Scene").then((m) => m.SkillsGalaxyScene),
  { ssr: false },
);

const legend: { label: string; color: string }[] = [
  { label: "Backend", color: "#22d3ee" },
  { label: "Frontend", color: "#3b82f6" },
  { label: "Cloud & DevOps", color: "#a78bfa" },
  { label: "Tools", color: "#67e8f9" },
];

export function SkillsGalaxy() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-4 py-28">
      <SectionHeading
        eyebrow="Skills Galaxy"
        title="A universe of tools I orbit daily"
        description="Hover any node to see proficiency. Drag to explore the galaxy from a different angle."
      />

      <LazyScene className="mx-auto mt-12 h-[520px] w-full max-w-4xl sm:h-[600px]">
        <SkillsGalaxyScene />
      </LazyScene>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {legend.map((entry) => (
          <div key={entry.label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: entry.color, boxShadow: `0 0 8px ${entry.color}` }}
            />
            {entry.label}
          </div>
        ))}
      </div>
    </section>
  );
}
