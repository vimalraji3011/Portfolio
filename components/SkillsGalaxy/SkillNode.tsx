"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import type { Skill } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryColor: Record<Skill["category"], string> = {
  backend: "#22d3ee",
  frontend: "#3b82f6",
  cloud: "#a78bfa",
  tools: "#67e8f9",
};

export function SkillNode({
  skill,
  position,
}: {
  skill: Skill;
  position: [number, number, number];
}) {
  const [hovered, setHovered] = useState(false);
  const color = categoryColor[skill.category];

  return (
    <Html position={position} center distanceFactor={8} zIndexRange={[10, 0]}>
      <div
        className="pointer-events-auto relative flex select-none flex-col items-center"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <motion.div
          animate={{ scale: hovered ? 1.35 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className={cn(
            "glass flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-shadow",
          )}
          style={{
            borderColor: hovered ? color : undefined,
            boxShadow: hovered ? `0 0 24px ${color}80, 0 0 4px ${color}` : "none",
            color: hovered ? color : "var(--foreground)",
          }}
        >
          {skill.name}
        </motion.div>

        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong absolute top-full mt-2 w-32 rounded-lg p-2 text-center"
          >
            <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${skill.level}%`, background: color }}
              />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              {skill.level}% proficiency
            </span>
          </motion.div>
        )}
      </div>
    </Html>
  );
}
