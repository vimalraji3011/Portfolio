"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlassPanel } from "@/components/shared/glass-panel";
import { Reveal } from "@/components/shared/reveal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";
import { WorldMapBackground } from "./WorldMapBackground";

type Status = "idle" | "loading" | "success" | "error";

const socialLinks = [
  { label: "GitHub", href: profile.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.social.linkedin, icon: LinkedinIcon },
  { label: "Email", href: profile.social.email, icon: Mail },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-4 py-28">
      <SectionHeading
        eyebrow="Contact"
        title="Open a channel"
        description="Have a project, an integration, or a role in mind? Let's talk."
      />

      <Reveal direction="up" className="mt-16">
        <GlassPanel strong className="relative overflow-hidden p-6 sm:p-10">
          <WorldMapBackground />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Transmission Terminal
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="border-white/10 bg-white/[0.03] focus-visible:border-neon"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="border-white/10 bg-white/[0.03] focus-visible:border-neon"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="border-white/10 bg-white/[0.03] focus-visible:border-neon"
                />
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_oklch(0.65_0.22_255/40%)] hover:scale-[1.02] transition-transform"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-primary"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Message transmitted. I&apos;ll respond soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-destructive"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errorMessage}
                </motion.p>
              )}
            </form>

            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Direct Channels
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={label === "Email" ? undefined : "_blank"}
                      rel="noreferrer"
                      className="glass group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:border-neon"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-foreground/85 group-hover:text-foreground">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  Status
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-foreground/85">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]" />
                  Available for new opportunities
                </p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
