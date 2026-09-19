# Vimal Raji — Portfolio

A cinematic 3D portfolio built with Next.js 15, React Three Fiber, and Framer Motion.

## Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **3D:** Three.js + React Three Fiber + drei + postprocessing
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS v4
- **UI primitives:** shadcn/ui (base-ui)
- **Icons:** lucide-react

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                  routes, layout, global styles, /api/contact
components/
  Hero3D/             cinematic intro scene (camera fly-in, service nodes, hologram name)
  SkillsGalaxy/        rotating 3D skills sphere
  Timeline/            experience timeline
  ProjectCard3D/       tilt project cards + case-study modal
  ArchitectureScene/   interactive microservice graph
  Certifications/      floating certification badges
  Navbar/, Footer/     layout chrome
  Contact/             contact form + API route
  About/               bio + animated stats
  shared/              section heading, glass panel, reveal animations, background fx
  ui/                  shadcn/ui primitives
hooks/                 mouse position, media queries, scene-quality tiering
lib/                   site content (lib/data.ts) + utils
public/
  models/ textures/ icons/   static 3D/asset folders (empty — add real assets here)
```

## Content

All copy, skills, projects, experience, and certifications live in [lib/data.ts](lib/data.ts) — edit that file to update the site content.

## Before deploying

- **Resume:** add a real `public/resume.pdf` — the "Download Resume" buttons link to `/resume.pdf`, which does not exist yet.
- **Contact form:** [app/api/contact/route.ts](app/api/contact/route.ts) validates and logs submissions but does not send email yet. Wire it up to a provider (Resend, Postmark, SES, etc.) using environment variables before relying on it in production.
- **Social links:** update `profile.social.github` / `linkedin` in `lib/data.ts` (currently placeholders).

## Performance

3D scenes are code-split with `next/dynamic` (`ssr: false`) and mount lazily via an `IntersectionObserver` wrapper (`components/shared/lazy-scene.tsx`), so nothing off-screen pays the WebGL init cost. Particle counts, pixel ratio, and postprocessing scale down automatically on mobile/tablet and when `prefers-reduced-motion` is set (`hooks/use-scene-quality.ts`).

## Deployment

Ready to deploy on [Vercel](https://vercel.com/new) — no environment variables are required for the base site to build and run.
