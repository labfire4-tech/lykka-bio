"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-black z-[-1]" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col items-center justify-center px-6"
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-4 tracking-wider"
            style={{ letterSpacing: "0.1em" }}
          >
            LYKKA BIO
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl opacity-60 mb-16 tracking-wide max-w-2xl mx-auto"
          >
            Create your perfect link-in-bio page in seconds. Beautiful, fast, and customizable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/customize"
              className="group relative px-10 py-4 bg-white text-black font-bold rounded-full text-lg uppercase tracking-wider overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
              </span>
              <motion.div 
                className="absolute inset-0 bg-gray-200"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            
            <a
              href="https://github.com/labfire4-tech/lykka-bio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border border-white/20 rounded-full text-lg uppercase tracking-wider hover:bg-white/10 transition"
            >
              GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-20 text-xs opacity-40"
          >
            No sign up required. Just customize and share.
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}