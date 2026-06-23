"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export function CustomCursor({
  type = "default",
  color = "#a855f7",
  trailLength = 8,
}: {
  type?: "default" | "dot" | "crosshair" | "glow" | "trail" | "none";
  color?: string;
  trailLength?: number;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; life: number }>>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [
        { x: e.clientX, y: e.clientY, life: 1 },
        ...prev.slice(0, trailLength - 1).map((t) => ({ ...t, life: t.life - 1 / trailLength })),
      ]);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mouseenter", handleEnter);
    };
  }, [trailLength]);

  if (type === "none") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ display: visible ? "block" : "none" }}>
      {type === "trail" && (
        <>
          {trail.map((t, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: t.life, scale: t.life }}
              transition={{ duration: 0.1 }}
              className="fixed w-3 h-3 rounded-full pointer-events-none"
              style={{
                left: t.x - 6,
                top: t.y - 6,
                background: color,
                boxShadow: `0 0 ${10 * t.life}px ${color}`,
                zIndex: 9999 - i,
              }}
            />
          ))}
        </>
      )}

      <motion.div
        initial={false}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          zIndex: 10000,
        }}
      >
        {type === "dot" && (
          <div className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
        )}
        {type === "crosshair" && (
          <>
            <div className="w-6 h-6 border-2 rounded-full" style={{ borderColor: color, boxShadow: `0 0 15px ${color}` }} />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12" style={{ background: color }} />
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-12" style={{ background: color }} />
            <div className="absolute left-12 top-1/2 -translate-y-1/2 w-12 h-px" style={{ background: color }} />
            <div className="absolute right-12 top-1/2 -translate-y-1/2 w-12 h-px" style={{ background: color }} />
          </>
        )}
        {type === "glow" && (
          <div className="w-8 h-8 rounded-full" style={{ background: `radial-gradient(circle, ${color}33, transparent)`, boxShadow: `0 0 30px ${color}` }} />
        )}
        {type === "default" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ filter: `drop-shadow(0 0 5px ${color})` }}>
            <path d="M5 5l14 14M5 19l14-14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </motion.div>
    </div>
  );
}