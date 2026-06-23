"use client";

import { useEffect, useRef } from "react";

export function CRTOverlay({ intensity = 0.15, scanlineIntensity = 0.08 }: { intensity?: number; scanlineIntensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      time += 0.016;
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scanlines
      ctx.globalAlpha = scanlineIntensity;
      ctx.fillStyle = "#000";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }

      // Vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.4)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle noise
      ctx.globalAlpha = intensity * 0.3;
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const w = Math.random() * 2;
        const h = Math.random() * 2;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
        ctx.fillRect(x, y, w, h);
      }

      // Horizontal line jitter (CRT effect)
      ctx.globalAlpha = 0.02;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = (time * 100 + i * 200) % canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y + Math.sin(time * 10 + i) * 2);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [intensity, scanlineIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998] opacity-50"
      style={{ mixBlendMode: "overlay" }}
    />
  );
}

export function ScanlinesOnly({ opacity = 0.1 }: { opacity?: number }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9997]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        opacity,
        mixBlendMode: "multiply",
      }}
    />
  );
}