"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const rotateX = useTransform(springY, [0, typeof window !== "undefined" ? window.innerWidth : 1000], [10, -10]);
  const rotateY = useTransform(springX, [0, typeof window !== "undefined" ? window.innerWidth : 1000], [-10, 10]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[50%] w-[300px] h-[300px] bg-purple-800/10 rounded-full blur-[100px]" />
      </div>

      {/* Floating decorative icons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-600/10 pointer-events-none"
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
          style={{
            top: `${15 + i * 15}%`,
            left: `${5 + i * 18}%`,
            fontSize: `${24 + i * 8}px`,
          }}
        >
          ◆
        </motion.div>
      ))}

      {/* Sticky Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-black/70 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight">
              LYKKA<span className="text-purple-500">.bio</span>
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {["Help", "Discord", "Leaderboard", "Pricing"].map((item, i) => (
              <motion.a
                key={item}
                href={`/${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Sign In
            </motion.a>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-full hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/50"
            >
              Start Free
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1]">
              <span className="block">Everything you want,</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
                right here.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              guns.bio is your go-to for modern, feature-rich link-in-bio pages, with
              fast and secure file hosting.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
          >
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-purple-600 text-white font-bold rounded-full text-base hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/50"
            >
              Start Free
            </motion.a>
            <motion.a
              href="/pricing"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full text-base hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
            >
              See Pricing
            </motion.a>
          </motion.div>

          {/* Phone Mockups */}
          <div className="relative h-[600px] w-full max-w-5xl mx-auto">
            {/* Main centered phone */}
            <motion.div
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[580px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-20"
              style={{ rotateX, rotateY }}
            >
              <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-gradient-to-br from-purple-900 to-black p-6 pt-14">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl">
                      👤
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-black">AZRAEL</div>
                    <div className="text-xs text-white/50">Digital creator</div>
                  </div>
                  <div className="space-y-2">
                    {["My Portfolio", "My Discord", "My Store", "My GitHub"].map((link, i) => (
                      <motion.div
                        key={link}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="w-full py-2.5 px-4 rounded-xl bg-white/10 text-xs font-medium backdrop-blur-md border border-white/10"
                      >
                        {link}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Left floating phone */}
            <motion.div
              initial={{ opacity: 0, x: -200, rotateZ: -15 }}
              animate={{ opacity: 1, x: -80, rotateZ: -12 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotateZ: -10 }}
              className="absolute left-[5%] top-[20%] w-[260px] h-[500px] bg-gray-900 rounded-[2.5rem] border-4 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10"
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-900 to-black p-5 pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                  <div>
                    <div className="text-sm font-bold">hris</div>
                    <div className="text-[10px] text-white/50">@hris</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/10 rounded w-3/4" />
                  <div className="h-2 bg-white/10 rounded w-1/2" />
                  <div className="h-2 bg-white/10 rounded w-2/3" />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="h-10 bg-white/10 rounded-lg" />
                  <div className="h-10 bg-white/10 rounded-lg" />
                  <div className="h-10 bg-white/10 rounded-lg" />
                </div>
              </div>
            </motion.div>

            {/* Right floating phone */}
            <motion.div
              initial={{ opacity: 0, x: 200, rotateZ: 15 }}
              animate={{ opacity: 1, x: 80, rotateZ: 12 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotateZ: 8 }}
              className="absolute right-[5%] top-[25%] w-[260px] h-[500px] bg-gray-900 rounded-[2.5rem] border-4 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10"
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-pink-900 to-black p-5 pt-12">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-purple-600 flex items-center justify-center text-xl">
                    💬
                  </div>
                  <div className="text-sm font-bold mt-2">hris</div>
                </div>
                <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-white/10" />
                      <div className="h-2 bg-white/10 rounded flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Background floating elements */}
            <motion.div
              animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-[10%] left-[30%] text-4xl text-purple-500/30 pointer-events-none"
            >
              ⚡
            </motion.div>
            <motion.div
              animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-[20%] right-[25%] text-3xl text-purple-500/30 pointer-events-none"
            >
              ✦
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/20 backdrop-blur-xl" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="relative p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Ready to stand out?
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto text-sm md:text-base">
                Join thousands of creators using LYKKA to showcase their links 
                with style. Free to start, powerful enough to scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-all"
                >
                  Create Your Profile
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                >
                  View Demo
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-lg font-black">LYKKA<span className="text-purple-500">.bio</span></span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-sm text-white/30">
            © 2025 LYKKA.bio — All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}