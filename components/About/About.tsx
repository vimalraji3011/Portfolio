import { SectionHeading } from "@/components/shared/section-heading";
import { GlassPanel } from "@/components/shared/glass-panel";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Badge } from "@/components/ui/badge";
import { aboutRoles, expertise, profile, stats } from "@/lib/data";
import { Sparkle } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-28">
      <SectionHeading
        eyebrow="About"
        title="The engineer behind the systems"
        description="Full-stack development across healthcare, booking, HR, and transport platforms — built to be fast, correct, and maintainable."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-5">
        <Reveal direction="left" className="lg:col-span-3">
          <GlassPanel strong className="h-full p-8">
            <div className="flex flex-wrap gap-2">
              {aboutRoles.map((role) => (
                <Badge
                  key={role}
                  variant="outline"
                  className="border-neon bg-primary/5 text-primary"
                >
                  <Sparkle className="mr-1 h-3 w-3" />
                  {role}
                </Badge>
              ))}
            </div>

            <p className="mt-6 text-balance leading-relaxed text-muted-foreground">
              I&apos;m {profile.name}, a {profile.role.toLowerCase()} working across .NET and
              React/Next.js to ship real operational systems — from multilingual patient diet
              ordering APIs to booking platforms, internal HR tools, and transport management. I
              care about clean API design, tenant-aware data isolation, and code that&apos;s easy
              to hand off, and I stay involved in code reviews, deployments, and mentoring
              alongside the day-to-day build.
            </p>

            <div className="mt-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-neon hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </GlassPanel>
        </Reveal>

        <RevealGroup
          className="grid grid-cols-2 gap-4 lg:col-span-2"
          stagger={0.12}
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label} direction="scale">
              <GlassPanel className="flex h-full flex-col justify-center gap-2 p-6 text-center">
                <span className="font-display text-4xl font-bold text-primary sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </span>
              </GlassPanel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
