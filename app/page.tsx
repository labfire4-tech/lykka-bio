"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 30 };
  const outlineX = useSpring(cursorX, springConfig);
  const outlineY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setShowCursor(!isMobile);
  }, []);

  useEffect(() => {
    if (!showCursor) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showCursor]);

  const handleEnter = () => {
    setEntered(true);
  };

  if (!entered) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 cursor-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute w-8 h-8 bg-white rounded-full pointer-events-none mix-blend-difference"
          style={{ 
            x: cursorX, 
            y: cursorY, 
            translateX: "-50%", 
            translateY: "-50%" 
          }}
        />
        
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          className="text-white/80 text-lg font-light tracking-[0.3em] uppercase cursor-none"
          onClick={handleEnter}
          style={{ cursor: "none" }}
        >
          Click to Enter
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      {showCursor && (
        <>
          <motion.div
            className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{ 
              x: cursorX, 
              y: cursorY, 
              translateX: "-50%", 
              translateY: "-50%" 
            }}
          />
          <motion.div
            className="fixed w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998]"
            style={{ 
              x: outlineX, 
              y: outlineY,
              translateX: "-50%", 
              translateY: "-50%" 
            }}
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-4xl text-center"
      >
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-6">
          <span className="block">LYKKA</span>
          <span className="block text-white/70 text-7xl md:text-8xl">BIO</span>
        </h1>

        <p className="max-w-md mx-auto text-lg opacity-60 mb-12">
          Create your perfect link-in-bio page
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/customize"
            className="group relative px-10 py-3.5 bg-white text-black font-black rounded-full text-sm uppercase tracking-widest overflow-hidden"
          >
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              Get Started
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
          </Link>

          <Link
            href="/demo"
            className="px-10 py-3.5 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Demo
          </Link>
        </div>
      </motion.div>
    </div>
  );
}