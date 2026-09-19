"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-media-query";

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    function handleMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
    }

    function animate() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (el) {
        el.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[600px] w-[600px] rounded-full opacity-60 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, oklch(0.65 0.22 235 / 18%) 0%, oklch(0.65 0.22 255 / 6%) 40%, transparent 70%)",
      }}
    />
  );
}
