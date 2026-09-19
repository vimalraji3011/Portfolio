"use client";

import { useEffect, useRef } from "react";
import { useSceneQuality } from "@/hooks/use-scene-quality";

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  twinklePhase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  life: number;
  maxLife: number;
};

/**
 * Cheap, always-on canvas2D background: drifting stars + occasional shooting
 * stars + a faint neon grid floor. Kept off the WebGL/Three.js path so it can
 * run behind every section without competing with the heavier R3F canvases.
 */
export function BackgroundFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { particleCount, reducedMotion } = useSceneQuality();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const starCount = Math.min(particleCount, 500);
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.05 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    const shootingStars: ShootingStar[] = [];

    function spawnShootingStar() {
      if (reducedMotion) return;
      shootingStars.push({
        x: Math.random() * width * 0.6 + width * 0.2,
        y: Math.random() * height * 0.3,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 8 + 10,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        life: 0,
        maxLife: 40 + Math.random() * 20,
      });
    }

    const shootingTimer = window.setInterval(spawnShootingStar, 4200);
    let raf = 0;
    let time = 0;

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const star of stars) {
        time += 0.001;
        star.y += star.speed;
        if (star.y > height) star.y = 0;
        const twinkle = 0.55 + Math.sin(time * 60 + star.twinklePhase) * 0.45;
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(180, 220, 255, ${Math.max(0.15, twinkle)})`;
        ctx!.fill();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life += 1;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        const alpha = 1 - s.life / s.maxLife;
        if (alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;
        const gradient = ctx!.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(140, 220, 255, ${alpha})`);
        gradient.addColorStop(1, "rgba(140, 220, 255, 0)");
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
      }

      if (!reducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    draw();
    if (reducedMotion) {
      window.clearInterval(shootingTimer);
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.clearInterval(shootingTimer);
      cancelAnimationFrame(raf);
    };
  }, [particleCount, reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-grid">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  );
}
