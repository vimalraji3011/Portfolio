import { Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 px-4 pb-8 pt-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="glass flex items-center gap-4 rounded-full px-6 py-3">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={profile.social.email}
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Built with Next.js, Three.js, React Three Fiber, and Framer Motion.
        </p>

        <p className="text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
