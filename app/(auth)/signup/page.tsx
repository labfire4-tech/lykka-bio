"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      await fetch("/api/auth");
      localStorage.setItem("lykka-user", JSON.stringify({ username: formData.username, loggedIn: true }));
      window.location.href = "/dashboard";
    } catch {
      setError("Connexion failed. Try again.");
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
          <h2 className="text-[22px] font-black">Créer ton compte</h2>
          <p className="text-sm text-white/50">Crée ton profil, partage tes liens et personnalise tout au même endroit.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-white/60">Nom d'utilisateur</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => updateField("username", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              placeholder="guns.lol/nom d'utilisateur"
              className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/40 transition-all placeholder:text-white/25"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-white/60">Mot de passe</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/40 transition-all placeholder:text-white/25"
              required
              minLength={6}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-white/60">Confirmer le mot de passe</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/40 transition-all placeholder:text-white/25"
              required
              minLength={6}
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
            {isLoading ? "Création..." : "Continuer"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-white/40">
          Tu as déjà un compte ?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Se connecter
          </Link>
        </p>
      </motion.div>
    </div>
  );
}