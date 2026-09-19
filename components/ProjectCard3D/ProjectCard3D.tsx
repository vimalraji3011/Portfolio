"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  cyan: "#22d3ee",
  blue: "#3b82f6",
  violet: "#a78bfa",
  amber: "#f59e0b",
};

export function ProjectCard3D({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const color = colorMap[project.color] ?? "#22d3ee";

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function resetTilt() {
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileTap={{ scale: 0.98 }}
      className="glass-strong group relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 text-left transition-shadow"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: color }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-semibold sm:text-2xl">{project.name}</h3>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all",
            isHovered && "border-transparent",
          )}
          style={isHovered ? { background: color, boxShadow: `0 0 20px ${color}` } : undefined}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <p className="relative mt-3 text-sm text-muted-foreground">{project.tagline}</p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-foreground/80"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex flex-wrap gap-1.5">
        {project.features.slice(0, 3).map((f) => (
          <span key={f} className="text-xs text-primary/80">
            #{f.replace(/\s+/g, "")}
          </span>
        ))}
      </div>

      <span className="relative mt-auto pt-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
        View case study
      </span>
    </motion.button>
  );
}
