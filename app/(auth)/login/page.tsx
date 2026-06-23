"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Eye } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock auth - just go to customize in client-side app
    window.location.href = "/customize";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black">Welcome back</h2>
        <p className="text-sm opacity-60">Sign in to manage your bio</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-white text-black font-black rounded-xl uppercase tracking-wider disabled:opacity-50 transition-all"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </motion.button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-4 opacity-60">or continue with</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:border-white/20 transition-all"
      >
        <Github size={20} />
        <span className="text-sm font-medium">GitHub</span>
      </motion.button>

      <p className="text-center text-sm opacity-60">
        Don't have an account?{" "}
        <Link href="/signup" className="text-white hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
