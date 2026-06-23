"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="w-full max-w-2xl text-center relative z-10 space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-7xl md:text-8xl font-black tracking-tight mb-4">
            <span className="block">LYKKA</span>
            <span className="block text-white/60 text-6xl md:text-7xl font-medium">BIO</span>
          </h1>
          <p className="text-base opacity-50 max-w-md mx-auto leading-relaxed">
            Create beautiful link-in-bio pages that stand out
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <Link
            href="/customize"
            className="group relative px-12 py-4 bg-white text-black font-black rounded-full text-sm uppercase tracking-widest overflow-hidden transition-all"
          >
            <span className="relative z-10 flex items-center gap-2 transition-transform group-hover:translate-x-1">
              Create Profile →
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>

          <Link
            href="/demo"
            className="px-12 py-4 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            See Demo
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}