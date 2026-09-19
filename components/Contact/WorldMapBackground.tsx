"use client";

const DOTS = Array.from({ length: 90 }, (_, i) => {
  const seed = i * 137.5;
  const x = ((seed * 1.618) % 100).toFixed(2);
  const y = ((seed * 0.618) % 100).toFixed(2);
  return { x: Number(x), y: Number(y), id: i };
});

const ARCS = [
  { d: "M40,60 Q200,-20 360,50", delay: 0 },
  { d: "M60,120 Q220,40 420,110", delay: 1.2 },
  { d: "M20,90 Q180,160 380,90", delay: 2.4 },
];

export function WorldMapBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-70">
      <svg viewBox="0 0 440 180" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {DOTS.map((dot) => (
          <circle
            key={dot.id}
            cx={(dot.x / 100) * 440}
            cy={(dot.y / 100) * 180}
            r={0.9}
            fill="var(--neon-cyan)"
            opacity={0.25}
          />
        ))}

        {ARCS.map((arc, i) => (
          <path
            key={i}
            d={arc.d}
            fill="none"
            stroke="url(#arc-gradient)"
            strokeWidth={1}
            strokeDasharray="6 10"
            className="animate-[dash_6s_linear_infinite]"
            style={{ animationDelay: `${arc.delay}s` }}
          />
        ))}

        <defs>
          <linearGradient id="arc-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity={0} />
            <stop offset="50%" stopColor="var(--neon-cyan)" stopOpacity={0.9} />
            <stop offset="100%" stopColor="var(--neon-blue)" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -160; }
        }
      `}</style>
    </div>
  );
}
