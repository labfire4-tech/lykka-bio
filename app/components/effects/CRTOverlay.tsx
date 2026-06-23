"use client";

import { useEffect, useRef } from "react";

export function CRTOverlay({
  intensity = 0.05,
  scanlineOpacity = 0.03
}: {
  intensity?: number;
  scanlineOpacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Scanlines
      ctx.globalAlpha = scanlineOpacity;
      ctx.fillStyle = "#000";
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 2);
      }

      // Very subtle noise
      ctx.globalAlpha = intensity * 0.2;
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
        ctx.fillRect(x, y, 1, 1);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [intensity, scanlineOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998] opacity-40"
      style={{ mixBlendMode: "overlay" }}
    />
  );
}

export function ScanlinesOnly({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9997]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        opacity,
        mixBlendMode: "multiply",
      }}
    />
  );
}
