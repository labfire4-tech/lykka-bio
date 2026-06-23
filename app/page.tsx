"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Zap, Palette, BarChart3, Sparkles, Mouse, Music, ArrowRight, Star, Users, Eye, TrendingUp } from "lucide-react";

const features = [
  { icon: Palette, title: "Fully customizable", desc: "Choose from stunning themes, effects, and layouts. Make it truly yours." },
  { icon: Zap, title: "Lightning fast", desc: "Built on edge infrastructure. Your page loads in milliseconds, worldwide." },
  { icon: BarChart3, title: "Advanced analytics", desc: "Track views, clicks, and engagement in real-time with beautiful charts." },
  { icon: Mouse, title: "Custom cursors", desc: "Stand out with unique cursor trails, glow effects, and animations." },
  { icon: Music, title: "Audio support", desc: "Add background music or sound effects to your bio page." },
  { icon: Sparkles, title: "Premium effects", desc: "CRT overlays, particle systems, glitch text, and more visual flair." },
];

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Active users" },
  { icon: Eye, value: 12000000, suffix: "+", label: "Profile views" },
  { icon: Star, value: 4.9, suffix: "/5", label: "User rating", isFloat: true },
  { icon: TrendingUp, value: 250, suffix: "%", label: "Growth this year" },
];

function AnimatedCounter({ value, isFloat = false }: { value: number; isFloat?: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(isFloat ? Math.round(eased * value * 10) / 10 : Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, isFloat]);

  if (isFloat) return <>{display.toFixed(1)}</>;
  if (value >= 1000000) return <>{(display / 1000000).toFixed(0)}M</>;
  if (value >= 1000) return <>{(display / 1000).toFixed(0)}K</>;
  return <>{display.toLocaleString()}</>;
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const rotateX = useTransform(springY, [0, 1000], [8, -8]);
  const rotateY = useTransform(springX, [0, 1000], [-8, 8]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted, mouseX, mouseY]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[50%] w-[300px] h-[300px] bg-pink-900/8 rounded-full blur-[100px]" />
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none mask-fade-b" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-black/60 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.a href="/" whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/50">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight">
              LYKKA<span className="text-purple-500">.bio</span>
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Templates", "Help"].map((item, i) => (
              <motion.a
                key={item}
                href={`/${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2">
              Sign In
            </a>
            <a href="/signup" className="btn-primary text-sm">
              Start Free
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
          >
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs text-white/60">Now with CRT effects & particle systems</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
          >
            <span className="block">Everything you want,</span>
            <span className="block text-gradient-aurora">right here.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Create stunning, animated link-in-bio pages with premium effects, custom cursors, and real-time analytics.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="/signup" className="btn-primary text-base px-10 py-4">
              Start Free
              <ArrowRight size={18} />
            </a>
            <a href="/premium" className="btn-outline text-base px-10 py-4">
              See Pricing
            </a>
          </motion.div>
        </div>

        {/* Phone mockups */}
        <div className="relative h-[550px] w-full max-w-5xl mx-auto mt-16">
          {/* Center phone */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ rotateX, rotateY }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[540px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-20 perspective-1000 preserve-3d"
          >
            <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-gradient-to-br from-purple-950 to-black p-6 pt-14 relative">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl">👤</div>
                </div>
                <div>
                  <div className="text-lg font-bold">AZRAEL</div>
                  <div className="text-xs text-white/50">Digital creator</div>
                </div>
                {["My Portfolio", "My Discord", "My Store", "My GitHub"].map((link, i) => (
                  <motion.div
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 text-xs font-medium border border-white/10"
                  >
                    {link}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Left phone */}
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 0.7, x: -60 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.3 }}
            className="absolute left-[8%] top-[15%] w-[220px] h-[440px] bg-gray-900 rounded-[2.5rem] border-4 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 hidden md:block"
          >
            <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-950 to-black p-5 pt-12">
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
              </div>
              <div className="mt-6 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-9 bg-white/10 rounded-lg" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right phone */}
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 0.7, x: 60 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.4 }}
            className="absolute right-[8%] top-[20%] w-[220px] h-[440px] bg-gray-900 rounded-[2.5rem] border-4 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 hidden md:block"
          >
            <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-pink-950 to-black p-5 pt-12">
              <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-purple-600 flex items-center justify-center text-xl">💬</div>
                <div className="text-sm font-bold mt-2">hris</div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-white/10" />
                    <div className="h-2 bg-white/10 rounded flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-hover p-6 text-center"
            >
              <stat.icon size={24} className="mx-auto mb-3 text-purple-400" />
              <div className="text-3xl font-black mb-1">
                <AnimatedCounter value={stat.value} isFloat={stat.isFloat} />
                {stat.suffix}
              </div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Built for <span className="text-gradient-purple">creators</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Every tool you need to build a bio page that stands out from the crowd.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="card-hover p-8 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={22} className="text-purple-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-purple-900/10 to-pink-600/15" />
            <div className="absolute inset-0 border border-white/10 rounded-[2rem]" />
            <div className="relative p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to stand out?</h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto text-sm md:text-base">
                Join thousands of creators using LYKKA to showcase their links with style. Free to start, powerful enough to scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/signup" className="btn-primary px-10 py-4">
                  Create Your Profile
                  <ArrowRight size={18} />
                </a>
                <a href="/templates" className="btn-outline px-10 py-4">
                  View Templates
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-lg font-black">LYKKA<span className="text-purple-500">.bio</span></span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">The premium link-in-bio platform for creators.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <div className="space-y-2">
                {["Features", "Pricing", "Templates", "Premium"].map((item) => (
                  <a key={item} href={`/${item.toLowerCase()}`} className="block text-xs text-white/40 hover:text-white/70 transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Company</h4>
              <div className="space-y-2">
                {["About", "Blog", "Discord", "Contact"].map((item) => (
                  <a key={item} href="#" className="block text-xs text-white/40 hover:text-white/70 transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Legal</h4>
              <div className="space-y-2">
                {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
                  <a key={item} href="#" className="block text-xs text-white/40 hover:text-white/70 transition-colors">{item}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2025 LYKKA.bio — All rights reserved</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors"><i className="fa-brands fa-discord" /></a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors"><i className="fa-brands fa-twitter" /></a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors"><i className="fa-brands fa-github" /></a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors"><i className="fa-brands fa-instagram" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
