"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2, Loader2, Check } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

function getPasswordStrength(password: string): PasswordStrength {
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
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    agreeToTerms: false,
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
      setSuccess('Account created! Redirecting to login...');
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
      <div className="card p-8 md:p-10" style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5), inset 0 0 80px rgba(168,85,247,0.06)' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2"
          >
            <span className="text-gradient-purple">Create account</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-white/50"
          >
            Join the creative community
          </motion.p>
        </div>

        {/* Social login */}
        <div className="space-y-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLoading(true)}
            disabled={loading}
            className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <GoogleIcon />
            Continue with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLoading(true)}
            disabled={loading}
            className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <AppleIcon />
            Continue with Apple
          </motion.button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={16} />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, '') })}
                className="glass-input pl-11"
                placeholder="Choose a username"
                required
                minLength={3}
              />
              {formData.username.length >= 3 && (
                <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={16} />
              )}
            </div>
            {formData.username && !usernameValid && (
              <p className="text-xs text-red-400 mt-1.5">Minimum 3 characters</p>
            )}
            {formData.username && usernameValid && (
              <p className="text-xs text-white/30 mt-1.5">lykka.bio/{formData.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={16} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="glass-input pl-11"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="glass-input pl-11 pr-11"
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Password strength */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-white/10'}`}
                    />
                  ))}
                </div>
                {strength.label && (
                  <p className="text-xs text-white/40 mt-1">{strength.label}</p>
                )}
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">Confirm password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="glass-input pl-11 pr-11"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
              {formData.confirmPassword && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {passwordsMatch ? (
                    <Check className="text-green-400" size={16} />
                  ) : (
                    <AlertCircle className="text-red-400" size={16} />
                  )}
                </div>
              )}
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-xs text-red-400 mt-1.5">Passwords don't match</p>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded-lg border border-white/20 bg-white/5 peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-all flex items-center justify-center">
                {formData.agreeToTerms && <Check size={12} className="text-white" />}
              </div>
            </div>
            <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
              I agree to the{' '}
              <Link href="/" className="text-purple-400 hover:text-purple-300">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
            </span>
          </label>

          {/* Error / Success */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl text-sm border border-red-500/20"
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
                className="flex items-center gap-2 px-4 py-3 bg-green-500/10 text-green-400 rounded-xl text-sm border border-green-500/20"
              >
                <CheckCircle2 size={16} className="shrink-0" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
            type="submit"
            className="btn-primary w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-white/40">
          Already have an account?
          <Link href="/login" className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
