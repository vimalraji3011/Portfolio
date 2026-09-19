"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-28">
      <SectionHeading
        eyebrow="Leadership Experience"
        title="Beyond the code"
        description="Leading delivery, owning deployments, and mentoring engineers along the way."
      />

      <RevealGroup
        className="mt-16 flex flex-wrap items-center justify-center gap-5"
        stagger={0.1}
      >
        {certifications.map((cert, i) => (
          <RevealItem key={cert.name} direction="scale">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              whileHover={{ scale: 1.08 }}
              className="group glass flex w-56 flex-col items-center gap-3 rounded-2xl p-6 text-center transition-shadow hover:border-neon hover:shadow-[0_0_30px_oklch(0.65_0.22_255/30%)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-primary/10 text-primary transition-colors group-hover:border-neon">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <p className="font-medium text-foreground">{cert.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
              </div>
            </motion.div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
