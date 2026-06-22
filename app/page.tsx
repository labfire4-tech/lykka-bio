"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Share2, BarChart3, Zap, Play } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-0" />
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6 text-center text-glow"
        >
          LYKKA BIO
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl opacity-70 mb-12 text-center max-w-2xl"
        >
          Create stunning, customizable link-in-bio pages with unlimited options and premium features
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/customize"
            className="group px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-200 transition"
          >
            Get Started
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/demo"
            className="px-8 py-4 glass-panel rounded-full font-bold hover:border-white transition"
          >
            View Demo
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Premium Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Palette />}
              title="Advanced Themes"
              description="Multiple beautiful themes with real-time preview"
            />
            <FeatureCard
              icon={<Share2 />}
              title="Social Links"
              description="Connect all your social platforms in one place"
            />
            <FeatureCard
              icon={<BarChart3 />}
              title="Analytics"
              description="Track profile views and engagement metrics"
            />
            <FeatureCard
              icon={<Zap />}
              title="Lightning Fast"
              description="Blazing fast loading times on global CDN"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-panel p-6 rounded-xl flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 mb-4 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-70">{description}</p>
    </motion.div>
  );
}