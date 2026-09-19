"use client";

import { useEffect, useState } from "react";

export type NormalizedMouse = { x: number; y: number };

export function useMousePosition(): NormalizedMouse {
  const [position, setPosition] = useState<NormalizedMouse>({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setPosition({ x, y });
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return position;
}
