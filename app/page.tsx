"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Music, Link2, Zap, Mouse, ArrowRight, Star, Users, Eye, TrendingUp, Wand2, BarChart3 } from "lucide-react";

const featurePills = [
  { icon: Music, label: "Custom Music" },
  { icon: Sparkles, label: "Particle Effects" },
  { icon: Link2, label: "Unlimited Links" },
  { icon: Mouse, label: "Custom Cursors" },
];

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Active users" },
  { icon: Eye, value: 12000000, suffix: "+", label: "Profile views" },
  { icon: Star, value: 4.9, suffix: "/5", label: "User rating", isFloat: true },
  { icon: TrendingUp, value: 250, suffix: "%", label: "Growth" },
];

const features = [
  { icon: Sparkles, title: "Premium Effects", desc: "CRT overlays, particle systems, glitch text, and animated gradients." },
  { icon: Mouse, title: "Custom Cursors", desc: "Trail, glow, crosshair, or dot cursors. Upload your own on Pro." },
  { icon: Music, title: "Audio Support", desc: "Add background music or sound effects to your bio page." },
  { icon: Zap, title: "Lightning Fast", desc: "Built on edge infrastructure. Your page loads in milliseconds." },
  { icon: Wand2, title: "Fully Customizable", desc: "Choose from stunning themes, effects, and layouts. Make it truly yours." },
  { icon: BarChart3, title: "Advanced Analytics", desc: "Track views, clicks, and engagement in real-time with charts." },
];

const trustedBy = ["AZRAEL", "nyx", "vortex", "pixel", "neon", "ghost", "flame", "echo", "storm", "raven"];

function AnimatedCounter({ value, isFloat = false }: { value: number; isFloat?: boolean }) {
  const [display, setDisplay] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, value, isFloat]);

  if (isFloat) return <>{display.toFixed(1)}</>;
  if (value >= 1000000) return <>{(display / 1000000).toFixed(0)}M</>;
  if (value >= 1000) return <>{(display / 1000).toFixed(0)}K</>;
  return <>{display.toLocaleString()}</>;
}

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.2, y: y * 0.2 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Hero phone 3D tilt
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const tiltSpring = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setSpotlight({ x, y });

      // Phone tilt
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      setTilt({ rx: -cy * 12, ry: cx * 12 });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 origin-left z-[100]"
      />

      {/* Spotlight cursor follow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(168,85,247,0.06), transparent 70%)`,
        }}
      />

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[140px] animate-pulse-soft" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/4 rounded-full blur-[100px]" />
      </div>

      {/* ===== Floating pill navbar ===== */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full backdrop-blur-2xl bg-black/50 border border-white/10 shadow-2xl">
          <a href="/" className="flex items-center gap-2 px-3 py-1.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm font-black tracking-tight hidden sm:block">CURZED</span>
          </a>

          <div className="hidden md:flex items-center gap-1 px-2">
            {["Features", "Pricing", "Templates", "Discord"].map((item) => (
              <a key={item} href={item === "Discord" ? "#" : `/${item.toLowerCase()}`} className="px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white rounded-full hover:bg-white/5 transition-all">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-1 pl-1">
            <a href="/login" className="hidden sm:block px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors">Sign In</a>
            <MagneticButton href="/signup" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-xs font-bold rounded-full transition-all shadow-lg shadow-purple-900/40">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Get Started
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* ===== Hero ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-xs text-white/60">Express yourself with LYKKA.bio</span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-center leading-[1.05] mb-6">
          {["Your", "world."].map((word, i) => (
            <motion.span key={word} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="inline-block mr-3">
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.64, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-gradient-purple"
          >
            One link.
          </motion.span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-base md:text-lg text-white/40 max-w-xl text-center leading-relaxed mb-10"
        >
          The ultimate bio link platform built for creators, gamers, and communities. Customize everything, stand out everywhere.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          <MagneticButton href="/signup" className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-full text-sm transition-all shadow-xl shadow-purple-900/40 shine">
            Get Started
            <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton href="#" className="flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-medium rounded-full text-sm transition-all backdrop-blur-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Join Discord
          </MagneticButton>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {featurePills.map((pill, i) => (
            <motion.div
              key={pill.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.08, type: "spring" }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white/70 hover:border-purple-500/30 transition-all"
            >
              <pill.icon size={14} className="text-purple-400" />
              {pill.label}
            </motion.div>
          ))}
        </motion.div>

        {/* 3D phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 60, damping: 15 }}
          className="mt-16 perspective-1000"
        >
          <motion.div
            style={{ rotateX: tiltSpring }}
            className="preserve-3d"
          >
            <PhoneMockup tilt={tilt} />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Trusted by marquee ===== */}
      <section className="py-8 border-y border-white/5 overflow-hidden">
        <div className="text-center text-xs text-white/20 mb-4 uppercase tracking-wider">Trusted by creators worldwide</div>
        <div className="marquee">
          {[...trustedBy, ...trustedBy].map((name, i) => (
            <span key={i} className="text-lg font-black text-white/10 hover:text-white/30 transition-colors whitespace-nowrap">
              @{name}
            </span>
          ))}
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-3">
              Built for <span className="text-gradient-purple">creators</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm">Every tool you need to build a bio page that stands out.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-300 shine"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <feature.icon size={22} className="text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-sm mb-2">{feature.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden gradient-border"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/12 via-purple-900/8 to-pink-600/12 liquid-bg" />
            <div className="relative p-12 md:p-16 text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-black mb-4"
              >
                Ready to stand out?
              </motion.h2>
              <p className="text-white/40 mb-8 max-w-md mx-auto text-sm">Join thousands of creators using LYKKA to showcase their links with style.</p>
              <MagneticButton href="/signup" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-full transition-all shadow-xl shadow-purple-900/40 shine">
                Create Your Profile
                <ArrowRight size={18} />
              </MagneticButton>
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
                <span className="text-base font-black">CURZED</span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed">The premium link-in-bio platform for creators.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Templates", "Premium"] },
              { title: "Company", links: ["About", "Blog", "Discord", "Contact"] },
              { title: "Legal", links: ["Terms", "Privacy", "Cookies", "Licenses"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold mb-3 text-white/70">{col.title}</h4>
                <div className="space-y-2">
                  {col.links.map((item) => (
                    <a key={item} href="#" className="block text-xs text-white/30 hover:text-white/60 transition-colors">{item}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">© 2025 CURZED — All rights reserved</p>
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

function StatCard({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -4, scale: 1.05 }}
      className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/20 transition-all"
    >
      <stat.icon size={20} className="mx-auto mb-3 text-purple-400/60" />
      <div className="text-3xl font-black mb-1">
        {inView && <AnimatedCounter value={stat.value} isFloat={stat.isFloat} />}
        {stat.suffix}
      </div>
      <div className="text-xs text-white/30">{stat.label}</div>
    </motion.div>
  );
}

function PhoneMockup({ tilt }: { tilt: { rx: number; ry: number } }) {
  return (
    <div
      className="w-[280px] h-[540px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative preserve-3d"
      style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`, transition: "transform 0.1s ease-out" }}
    >
      <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-gradient-to-br from-purple-950 to-black p-6 pt-14 relative">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />

        {/* Profile preview */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-0.5 relative"
          >
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl">👤</div>
            <div className="absolute -inset-1 rounded-full border border-purple-400/30 animate-pulse-soft" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <div className="text-lg font-bold">AZRAEL</div>
            <div className="text-xs text-white/50">Digital creator</div>
          </motion.div>

          {["My Portfolio", "My Discord", "My Store", "My GitHub"].map((link, i) => (
            <motion.div
              key={link}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 text-xs font-medium border border-white/10 hover:bg-white/15 hover:border-purple-500/30 transition-all"
            >
              {link}
            </motion.div>
          ))}

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/30">
            <Eye size={10} /> 15,847 views
          </div>
        </div>
      </div>
    </div>
  );
}
