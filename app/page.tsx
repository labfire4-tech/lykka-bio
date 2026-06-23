"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Palette, Globe, Crown } from "lucide-react";

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  if (!mounted) return null;

  const features = [
    { icon: Sparkles, title: "Premium Themes", desc: "50+ stunning themes" },
    { icon: Zap, title: "Lightning Fast", desc: "Built on edge network" },
    { icon: Palette, title: "Full Customization", desc: "Every detail adjustable" },
    { icon: Globe, title: "Custom Domains", desc: "Use your own domain" },
    { icon: Crown, title: "Premium Features", desc: "Advanced analytics & more" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background orbs */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,85,247,0.08), transparent 40%)`,
        }}
      />

      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="fixed top-[40%] right-[20%] w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform">
                L
              </div>
              <span className="font-black text-xl tracking-tight">
                LYKKA<span className="text-purple-500">.</span>BIO
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-xs font-medium text-white/80">The most advanced link-in-bio platform</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-[0.9]"
            >
              <span className="block">Your Links,</span>
              <span className="block text-gradient-purple">Supercharged</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Create stunning link-in-bio pages with advanced themes, animations, 
              analytics, and effects that make your profile unforgettable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/signup"
                className="group relative px-8 py-4 bg-white text-black font-black rounded-full text-sm uppercase tracking-wider overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Creating Free
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </Link>

              <Link
                href="/demo"
                className="px-8 py-4 glass rounded-full text-sm uppercase tracking-wider hover:border-white/30 transition-all"
              >
                View Demo Profile
              </Link>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-20"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  className="glass-strong p-4 rounded-2xl text-center hover:border-white/20 transition-all group"
                >
                  <feature.icon size={20} className="mx-auto mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold mb-1">{feature.title}</div>
                  <div className="text-[10px] opacity-50">{feature.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong p-12 rounded-3xl text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  Ready to stand out?
                </h2>
                <p className="text-white/60 mb-8 max-w-lg mx-auto">
                  Join thousands of creators using LYKKA BIO to showcase their links 
                  with style. Free to start, powerful enough to scale.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-black rounded-full text-sm uppercase tracking-wider hover:scale-105 transition-all"
                >
                  Create Your Profile
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
