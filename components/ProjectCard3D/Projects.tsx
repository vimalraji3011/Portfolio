"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { projects, type Project } from "@/lib/data";
import { ProjectCard3D } from "./ProjectCard3D";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-4 py-28">
      <SectionHeading
        eyebrow="Projects"
        title="Featured builds from the field"
        description="Enterprise systems shipped end-to-end — architecture, delivery, and production ownership."
      />

      <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
        {projects.map((project) => (
          <RevealItem key={project.slug} direction="up">
            <ProjectCard3D
              project={project}
              onOpen={() => {
                setActive(project);
                setOpen(true);
              }}
            />
          </RevealItem>
        ))}
      </RevealGroup>

      <ProjectModal project={active} open={open} onOpenChange={setOpen} />
    </section>
  );
}
