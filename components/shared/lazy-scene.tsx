"use client";

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Defers mounting a heavy R3F canvas until it scrolls near the viewport, and
 * keeps it mounted afterwards (3D init cost is paid once, not on every
 * scroll in/out). Falls back to a static glow so layout never jumps.
 */
export function LazyScene({
  children,
  className,
  fallback,
  rootMargin = "200px",
}: {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  rootMargin?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {shouldRender ? (
        <Suspense fallback={fallback ?? <SceneFallback />}>{children}</Suspense>
      ) : (
        fallback ?? <SceneFallback />
      )}
    </div>
  );
}

export function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}
