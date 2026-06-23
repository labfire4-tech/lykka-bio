"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Network check
      await fetch("/api/auth");
      localStorage.setItem("lykka-user", JSON.stringify({ username: formData.username, loggedIn: true }));
      window.location.href = "/dashboard";
    } catch {
      setError("Connection failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[440px] space-y-8"
      >
        <div className="flex justify-center">
          <h1 className="text-4xl font-black tracking-tight">LYKKA<span className="text-purple-500">.</span>BIO</h1>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-[22px] font-black">Connectez-vous</h2>
          <p className="text-sm text-white/50">Partage tes meilleurs liens au même endroit.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-white/60">Nom d'utilisateur</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>
              </span>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="guns.lol/nom d'utilisateur"
                className="w-full pl-11 pr-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/40 transition-all placeholder:text-white/25"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-white/60">Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/40 transition-all placeholder:text-white/25"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-purple-700 hover:bg-purple-600 disabled:bg-purple-900/50 text-white font-bold rounded-2xl transition-all"
          >
            {isLoading ? "Connexion..." : "Continuer"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-white/40">
          Tu as déjà un compte ?{" "}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Créer un compte
          </Link>
        </p>
      </motion.div>
    </div>
  );
}