"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";

export default function HomePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = ({ currentTarget, clientX, clientY }: any) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };
    
    const hero = document.getElementById("hero");
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      if (hero) hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div id="hero" className="relative min-h-screen flex items-center justify-center">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 40%)`
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-7xl md:text-9xl font-black tracking-tighter mb-6"
              style={{ letterSpacing: "-0.05em" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            >
              <span className="block">LYKKA</span>
              <span className="block text-white/70">BIO</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl opacity-60 mb-12 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Create your perfect link-in-bio page in seconds. Beautiful, fast, and customizable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            >
              <Link
                href="/customize"
                className="group relative px-12 py-4 bg-white text-black font-black rounded-full text-sm uppercase tracking-widest overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 transition-transform group-hover:gap-4">
                  Get Started
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-200"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </Link>

              <Link
                href="/demo"
                className="px-12 py-4 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                View Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs opacity-40 uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-10 bg-white/30"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}