"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
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
        <h2 className="text-3xl font-black">Create Account</h2>
        <p className="text-sm opacity-60">Start building your brand</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => updateField("username", e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
            placeholder="yourname"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
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
          {isLoading ? "Creating..." : "Create Account"}
        </motion.button>
      </form>

      <p className="text-center text-sm opacity-60">
        Already have an account?{" "}
        <a href="/login" className="text-white hover:underline font-medium">
          Sign in
        </a>
      </p>
    </motion.div>
  );
}