"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useIsMobile } from "@/hooks/use-media-query";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function HeroContent() {
  const mouse = useMousePosition();
  const isMobile = useIsMobile();
  const parallax = isMobile ? { x: 0, y: 0 } : { x: mouse.x * 10, y: mouse.y * 6 };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ x: parallax.x, y: -parallax.y }}
        className="flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-neon px-4 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-primary glass"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          System online
        </motion.span>

        <motion.h1
          variants={item}
          data-text={profile.name}
          className="hologram-text font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="font-display text-lg font-medium text-primary sm:text-2xl"
        >
          {profile.role}
        </motion.p>

        <motion.p variants={item} className="max-w-xl text-balance text-muted-foreground sm:text-lg">
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_oklch(0.65_0.22_255/45%)] transition-transform hover:scale-105"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="glass inline-flex items-center gap-2 rounded-full border-neon px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-5 rounded-full border border-white/20 p-1"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
}
