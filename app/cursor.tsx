"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 200, damping: 25 };
  const outlineX = useSpring(mouseX, springConfig);
  const outlineY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${targetX}px`;
        cursorDotRef.current.style.top = `${targetY}px`;
      }
      
      mouseX.set(targetX);
      mouseY.set(targetY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)", display: "none" }}
      />
      <motion.div
        ref={cursorOutlineRef}
        className="fixed w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998]"
        style={{ 
          x: outlineX, 
          y: outlineY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: typeof window !== "undefined" && window.innerWidth > 768 ? 1 : 0
        }}
      />
    </>
  );
}