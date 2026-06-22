"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useAnimate } from "framer-motion";

export default function HomePage() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [".hero-title", { opacity: 1, y: 0, filter: "blur(0px)" }, { duration: 1.2, ease: "easeOut" }],
      [".hero-subtitle", { opacity: 1, y: 0 }, { duration: 0.8, delay: 0.4 }],
      [".hero-buttons", { opacity: 1, y: 0 }, { duration: 0.8, delay: 0.6 }],
    ]);
  }, [animate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-hidden">
      <motion.div
        ref={scope}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl text-center relative"
      >
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </motion.div>

        <div className="space-y-8">
          <h1 className="hero-title text-8xl md:text-9xl font-black tracking-tighter opacity-0 translate-y-10 blur-md">
            <span className="block">LYKKA</span>
            <span className="block text-white/70 text-7xl md:text-8xl">BIO</span>
          </h1>

          <p className="hero-subtitle max-w-md mx-auto text-lg opacity-0 translate-y-5">
            Create your perfect link-in-bio page in seconds
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center opacity-0 translate-y-5">
            <Link
              href="/customize"
              className="group relative px-10 py-3.5 bg-white text-black font-black rounded-full text-sm uppercase tracking-widest overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 transition-transform group-hover:gap-3">
                Get Started
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100"
                initial={{ x: "100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </Link>

            <Link
              href="/demo"
              className="px-10 py-3.5 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Demo
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}