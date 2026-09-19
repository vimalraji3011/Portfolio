"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/data";
import { Layers, Lightbulb, Target, Rocket } from "lucide-react";

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-h-[85vh] overflow-y-auto border-neon sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{project.name}</DialogTitle>
          <DialogDescription>{project.tagline}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline" className="border-neon text-primary">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-2 grid gap-6">
          <ModalSection icon={Layers} title="Overview" body={project.overview} />
          <ModalSection icon={Target} title="Architecture" body={project.architecture} />
          <ModalSection icon={Lightbulb} title="Challenges" body={project.challenges} />
          <ModalSection icon={Rocket} title="Results" body={project.results} />

          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Key Features
            </p>
            <div className="flex flex-wrap gap-2">
              {project.features.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-foreground/85"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ModalSection({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-primary">
        <Icon className="h-4 w-4" />
        <p className="font-mono text-xs uppercase tracking-[0.25em]">{title}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
