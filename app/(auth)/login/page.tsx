"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem('curzed-user');
    if (u) router.push('/customize');
  }, [router]);
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password, action: 'login' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials');

      localStorage.setItem('curzed-user', JSON.stringify(data.user));
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => router.push('/customize'), 1000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      <div className="rounded-3xl p-8 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06]" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}>
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-xs text-white/25 uppercase tracking-wider">Sign in</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-white/50 mb-2">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-white/60 transition-colors" size={16} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-white/50">Password</label>
              <Link href="/" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-white/60 transition-colors" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-11 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm placeholder:text-white/25 focus:outline-none focus:border-white/20 transition-colors"
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded-lg border border-white/15 bg-white/[0.03] peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center">
                {formData.rememberMe && <CheckCircle2 size={12} className="text-black" />}
              </div>
            </div>
            <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">Remember me</span>
          </label>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl text-sm border border-red-500/15"
              >
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 px-4 py-3 bg-white/5 text-white/80 rounded-xl text-sm border border-white/10"
              >
                <CheckCircle2 size={16} className="shrink-0" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-3.5 bg-white text-black font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={16} /></>}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-white/30">
          Don't have an account?
          <Link href="/signup" className="ml-2 text-white/60 hover:text-white font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
