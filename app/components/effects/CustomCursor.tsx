"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface CustomCursorProps {
  variant?: "default" | "dot" | "crosshair" | "glow" | "trail" | "none";
  color?: string;
  trailCount?: number;
  size?: number;
}

export function CustomCursor({
  variant = "default",
  color = "#a855f7",
  trailCount = 6,
  size = 20
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trailRef = useRef(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || prefersReduced) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      if (variant === "trail") {
        setTrail((prev) => {
          const newTrail = [{ x: e.clientX, y: e.clientY, id: trailRef.current++ }, ...prev];
          return newTrail.slice(0, trailCount + 1);
        });
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, textarea, select, [role='button'], label");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [trailCount, variant]);

  if (variant === "none") return null;

  const trailElements = trail.map((point, index) => {
    const opacity = Math.max(0, 0.5 - index / trailCount);
    const scale = 1 - (index / trailCount) * 0.8;

    return (
      <motion.div
        key={point.id}
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: 0, scale }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: size * scale * 0.5,
          height: size * scale * 0.5,
          backgroundColor: color,
          boxShadow: `0 0 ${8 * opacity}px ${color}`,
          transform: `translate3d(${point.x - size * scale * 0.25}px, ${point.y - size * scale * 0.25}px, 0)`,
        }}
      />
    );
  });

  const renderDot = () => (
    <div
      className="fixed pointer-events-none z-[10000] transition-transform duration-150"
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate3d(0, 0, 0) scale(${isHovering ? 1.5 : 1})`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="w-full h-full rounded-full border-2 transition-colors duration-200"
        style={{
          borderColor: color,
          boxShadow: `0 0 ${isHovering ? 15 : 8}px ${color}80`,
          backgroundColor: isHovering ? `${color}30` : "transparent",
        }}
      />
    </div>
  );

  const renderCrosshair = () => (
    <div
      className="fixed pointer-events-none z-[10000]"
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate3d(0, 0, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="absolute inset-0 border-2 rounded-full" style={{ borderColor: color, boxShadow: `0 0 ${size * 2}px ${color}` }} />
      <div className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-white/80 -translate-x-1/2 -translate-y-1/2" style={{ boxShadow: `0 0 ${size}px ${color}` }} />
      <div className="absolute top-1/2 left-1/2 h-0.5 w-6 bg-white/80 -translate-x-1/2 -translate-y-1/2" style={{ boxShadow: `0 0 ${size}px ${color}` }} />
    </div>
  );

  const renderGlow = () => (
    <div
      className="fixed pointer-events-none z-[10000]"
      style={{
        left: position.x - size,
        top: position.y - size,
        width: `${size * 2}px`,
        height: `${size * 2}px`,
        transform: `translate3d(0, 0, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: color,
          opacity: 0.15,
          filter: `blur(${size}px)`,
        }}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]" style={{ display: isVisible ? "block" : "none" }}>
      {variant === "dot" && renderDot()}
      {variant === "crosshair" && renderCrosshair()}
      {variant === "glow" && renderGlow()}
      {variant === "trail" && trailElements}
      {variant === "default" && renderDot()}
    </div>
  );
}
