import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal direction="up">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon px-4 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--neon-cyan)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal direction="up" delay={0.08}>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal direction="up" delay={0.16}>
          <p
            className={cn(
              "max-w-2xl text-balance text-muted-foreground sm:text-lg",
              align === "center" ? "mx-auto" : "",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
