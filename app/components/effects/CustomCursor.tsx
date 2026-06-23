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
  trailCount = 8, 
  size = 32 
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isVisible, setIsVisible] = useState(true);
  const trailRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      setTrail((prev) => {
        const newTrail = [{ x: e.clientX, y: e.clientY, id: trailRef.current++ }, ...prev];
        return newTrail.slice(0, trailCount + 1);
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [trailCount]);

  if (variant === "none") return null;

  const trailElements = trail.map((point, index) => {
    const opacity = Math.max(0, 1 - (index / trailCount));
    const scale = 1 - (index / trailCount) * 0.8;
    
    return (
      <motion.div
        key={point.id}
        initial={{ opacity: 0.8, scale: 1 }}
        animate={{ opacity: 0, scale: scale, x: point.x - size/2, y: point.y - size/2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: size * scale,
          height: size * scale,
          backgroundColor: color,
          boxShadow: `0 0 ${12 * opacity}px ${color}`,          transform: `translate3d(${point.x - size/2}px, ${point.y - size/2}px, 0)`,
        }}
      />
    );
  });

  const renderCursorDot = () => (
    <div 
      className="fixed pointer-events-none z-[10000]"
      style={{ 
        left: position.x - size/2, 
        top: position.y - size/2, 
        width: `${size}px`, 
        height: `${size}px`,
        transform: `translate3d(0, 0, 0)`
      }}
    >
      <div 
        className="w-full h-full rounded-full" 
        style={{ 
          backgroundColor: color,
          boxShadow: `0 0 ${size/2}px ${color}, inset 0 0 ${size/4}px rgba(255,255,255,0.5)`
        }}
      />
      <div 
        className="absolute inset-0 rounded-full animate-pulse" 
        style={{ 
          backgroundColor: color, 
          opacity: 0.5,
          filter: `blur(${size/4}px)`
        }}
      />
    </div>
  );

  const renderCrosshair = () => (
    <div 
      className="fixed pointer-events-none z-[10000]"
      style={{ 
        left: position.x - size/2, 
        top: position.y - size/2, 
        width: `${size}px`, 
        height: `${size}px`,
        transform: `translate3d(0, 0, 0)`
      }}
    >
      <div 
        className="absolute inset-0 border-2 rounded-full" 
        style={{ 
          borderColor: color,
          boxShadow: `0 0 ${size * 2}px ${color}`
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-white/80 transform -translate-x-1/2 -translate-y-1/2" 
        style={{ boxShadow: `0 0 ${size}px ${color}` }}
      />
      <div 
        className="absolute top-1/2 left-1/2 h-0.5 w-8 bg-white/80 transform -translate-x-1/2 -translate-y-1/2" 
        style={{ boxShadow: `0 0 ${size}px ${color}` }}
      />
    </div>
  );

  const renderGlowCursor = () => (
    <div 
      className="fixed pointer-events-none z-[10000]"
      style={{ 
        left: position.x - size/2, 
        top: position.y - size/2, 
        width: `${size * 2}px`, 
        height: `${size * 2}px`,
        transform: `translate3d(0, 0, 0)`
      }}
    >
      <div 
        className="absolute inset-0 rounded-full" 
        style={{ 
          backgroundColor: color,
          opacity: 0.2,
          filter: `blur(${size}px)`,
          animation: "pulse 2s ease-in-out infinite"
        }}
      />
    </div>
  );

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ display: isVisible ? "block" : "none" }}
    >
      {variant === "dot" && renderCursorDot()}
      {variant === "crosshair" && renderCrosshair()}
      {variant === "glow" && renderGlowCursor()}
      {variant === "trail" && trailElements}
      {variant === "default" && renderCursorDot()}
    </div>
  );
}