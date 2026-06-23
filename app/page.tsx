"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Music, Link2, Zap, Mouse, ArrowRight, Star, Users, Eye, TrendingUp } from "lucide-react";

const featurePills = [
  { icon: Music, label: "Custom Music" },
  { icon: Sparkles, label: "Particle Effects" },
  { icon: Link2, label: "Unlimited Links" },
];

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Active users" },
  { icon: Eye, value: 12000000, suffix: "+", label: "Profile views" },
  { icon: Star, value: 4.9, suffix: "/5", label: "User rating", isFloat: true },
  { icon: TrendingUp, value: 250, suffix: "%", label: "Growth this year" },
];

const features = [
  { icon: Sparkles, title: "Premium Effects", desc: "CRT overlays, particle systems, glitch text, and animated gradients." },
  { icon: Mouse, title: "Custom Cursors", desc: "Trail, glow, crosshair, or dot cursors. Upload your own on Pro." },
  { icon: Music, title: "Audio Support", desc: "Add background music or sound effects to your bio page." },
  { icon: Zap, title: "Lightning Fast", desc: "Built on edge infrastructure. Your page loads in milliseconds." },
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
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[100px]" />
      </div>

      {/* ===== Floating pill navbar ===== */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-2xl bg-black/50 border border-white/10 shadow-2xl">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 px-3 py-1.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm font-black tracking-tight hidden sm:block">
              LYKKA<span className="text-purple-500">.bio</span>
            </span>
          </a>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-1 px-2">
            {["Features", "Pricing", "Templates", "Discord"].map((item) => (
              <a
                key={item}
                href={item === "Discord" ? "#" : `/${item.toLowerCase()}`}
                className="px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white rounded-full hover:bg-white/5 transition-all"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 pl-1">
            <a
              href="/login"
              className="hidden sm:block px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-xs font-bold rounded-full transition-all shadow-lg shadow-purple-900/40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Sign in with Discord
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ===== Hero ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-xs text-white/60">Express yourself with LYKKA.bio</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-center leading-[1.05] mb-6"
        >
          <span className="block">Your world.</span>
          <span className="block text-gradient-purple">One link.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base md:text-lg text-white/40 max-w-xl text-center leading-relaxed mb-10"
        >
          The ultimate bio link platform built for creators, gamers, and communities. Customize everything, stand out everywhere.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          <a href="/signup" className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-full text-sm transition-all shadow-xl shadow-purple-900/40">
            Get Started
            <ArrowRight size={16} />
          </a>
          <a href="#" className="flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-medium rounded-full text-sm transition-all backdrop-blur-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Join Discord
          </a>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {featurePills.map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/50"
            >
              <pill.icon size={14} className="text-purple-400" />
              {pill.label}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== Stats ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <stat.icon size={20} className="mx-auto mb-3 text-purple-400/60" />
              <div className="text-3xl font-black mb-1">
                <AnimatedCounter value={stat.value} isFloat={stat.isFloat} />
                {stat.suffix}
              </div>
              <div className="text-xs text-white/30">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Built for <span className="text-gradient-purple">creators</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm">
              Every tool you need to build a bio page that stands out from the crowd.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={20} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/12 via-purple-900/8 to-pink-600/12" />
            <div className="absolute inset-0 border border-white/10 rounded-[2rem]" />
            <div className="relative p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to stand out?</h2>
              <p className="text-white/40 mb-8 max-w-md mx-auto text-sm">
                Join thousands of creators using LYKKA to showcase their links with style.
              </p>
              <a href="/signup" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-full transition-all shadow-xl shadow-purple-900/40">
                Create Your Profile
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-base font-black">LYKKA<span className="text-purple-500">.bio</span></span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed">The premium link-in-bio platform for creators.</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-3 text-white/70">Product</h4>
              <div className="space-y-2">
                {["Features", "Pricing", "Templates", "Premium"].map((item) => (
                  <a key={item} href={`/${item.toLowerCase()}`} className="block text-xs text-white/30 hover:text-white/60 transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-3 text-white/70">Company</h4>
              <div className="space-y-2">
                {["About", "Blog", "Discord", "Contact"].map((item) => (
                  <a key={item} href="#" className="block text-xs text-white/30 hover:text-white/60 transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-3 text-white/70">Legal</h4>
              <div className="space-y-2">
                {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
                  <a key={item} href="#" className="block text-xs text-white/30 hover:text-white/60 transition-colors">{item}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">© 2025 LYKKA.bio — All rights reserved</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors"><i className="fa-brands fa-discord" /></a>
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors"><i className="fa-brands fa-twitter" /></a>
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors"><i className="fa-brands fa-github" /></a>
              <a href="#" className="text-white/25 hover:text-white/50 transition-colors"><i className="fa-brands fa-instagram" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
