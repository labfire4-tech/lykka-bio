"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2, Loader2, Check } from 'lucide-react';

function DiscordIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = [
    { label: '', color: '' },
    { label: 'Weak', color: 'bg-red-500' },
    { label: 'Fair', color: 'bg-orange-500' },
    { label: 'Good', color: 'bg-yellow-500' },
    { label: 'Strong', color: 'bg-green-500' },
    { label: 'Excellent', color: 'bg-emerald-400' },
  ];
  return { score, ...levels[score] };
}

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '', password: '', username: '', confirmPassword: '', agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const strength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.confirmPassword === '' || formData.password === formData.confirmPassword;
  const usernameValid = formData.username.length === 0 || formData.username.length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (!formData.username || formData.username.length < 3) throw new Error('Username must be at least 3 characters');
      if (!formData.password || formData.password.length < 6) throw new Error('Password must be at least 6 characters');
      if (formData.password !== formData.confirmPassword) throw new Error('Passwords do not match');
      if (!formData.agreeToTerms) throw new Error('Please agree to the Terms of Service');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess('Account created! Redirecting...');
      setTimeout(() => setLoading(false), 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full"
    >
      <div className="rounded-3xl p-8 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06]" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}>
        {/* Discord sign up — primary */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setLoading(true)}
          disabled={loading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-purple-900/30 mb-4"
        >
          <DiscordIcon size={18} />
          Continue with Discord
        </motion.button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-xs text-white/25 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs text-white/50 mb-2">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-purple-400 transition-colors" size={16} />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, '') })}
                className="w-full pl-11 pr-11 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm placeholder:text-white/25 focus:outline-none focus:border-purple-500/30 transition-colors"
                placeholder="Choose a username"
                required
                minLength={3}
              />
              {formData.username.length >= 3 && <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={16} />}
            </div>
            {formData.username && usernameValid && (
              <p className="text-xs text-white/25 mt-1.5">lykka.bio/{formData.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-white/50 mb-2">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-purple-400 transition-colors" size={16} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm placeholder:text-white/25 focus:outline-none focus:border-purple-500/30 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-white/50 mb-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-purple-400 transition-colors" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-11 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm placeholder:text-white/25 focus:outline-none focus:border-purple-500/30 transition-colors"
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-white/10'}`} />
                  ))}
                </div>
                {strength.label && <p className="text-xs text-white/30 mt-1">{strength.label}</p>}
              </div>
            )}
          </div>

          {/* Confirm */}
          <div>
            <label className="block text-xs text-white/50 mb-2">Confirm password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-purple-400 transition-colors" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-11 pr-11 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm placeholder:text-white/25 focus:outline-none focus:border-purple-500/30 transition-colors"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
              {formData.confirmPassword && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {passwordsMatch ? <Check className="text-green-400" size={16} /> : <AlertCircle className="text-red-400" size={16} />}
                </div>
              )}
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer group">
            <div className="relative mt-0.5">
              <input type="checkbox" checked={formData.agreeToTerms} onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })} className="sr-only peer" />
              <div className="w-5 h-5 rounded-lg border border-white/15 bg-white/[0.03] peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-all flex items-center justify-center">
                {formData.agreeToTerms && <Check size={12} className="text-white" />}
              </div>
            </div>
            <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
              I agree to the <Link href="/" className="text-purple-400 hover:text-purple-300">Terms</Link> and <Link href="/" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
            </span>
          </label>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl text-sm border border-red-500/15">
                <AlertCircle size={16} className="shrink-0" />{error}
              </motion.div>
            )}
            {success && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 px-4 py-3 bg-green-500/10 text-green-400 rounded-xl text-sm border border-green-500/15">
                <CheckCircle2 size={16} className="shrink-0" />{success}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-3.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Create Account <ArrowRight size={16} /></>}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-white/30">
          Already have an account?
          <Link href="/login" className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
}
