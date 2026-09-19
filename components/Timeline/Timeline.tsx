"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlassPanel } from "@/components/shared/glass-panel";
import { Reveal } from "@/components/shared/reveal";
import { experience } from "@/lib/data";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-4 py-28">
      <SectionHeading
        eyebrow="Experience"
        title="From foundational builds to owned platforms"
        description="A timeline of ownership across healthcare, booking, HR, and transport systems."
      />

      <div ref={containerRef} className="relative mt-16 pl-8 sm:pl-12">
        <div className="absolute left-0 top-0 h-full w-px bg-white/10 sm:left-1" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-primary via-accent to-transparent shadow-[0_0_12px_var(--neon-cyan)] sm:left-1"
        />

        <div className="flex flex-col gap-16">
          {experience.map((exp, i) => (
            <Reveal key={exp.role + i} direction="up" amount={0.15}>
              <div className="relative">
                <span className="absolute -left-8 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:-left-11">
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-primary/40" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_10px_var(--neon-cyan)]" />
                </span>

                <GlassPanel strong className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">
                      {exp.role}
                    </h3>
                    <span className="rounded-full border border-neon px-3 py-1 font-mono text-xs text-primary">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">{exp.org}</p>
                  <p className="mt-3 text-muted-foreground">{exp.summary}</p>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-2 text-sm text-foreground/85">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
