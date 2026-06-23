"use client";

import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [transition] = useTransition({
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validation
      if (!formData.username || formData.username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }
      
      if (!formData.password || formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Account created! Redirecting to login...');
      
      setTimeout(() => {
        setLoading(false);
        // In real app: router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[64px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-[64px]" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="relative w-full max-w-md"
      >
        {/* Glass container */}
        <div 
          className="rounded-3xl p-8 backdrop-blur-2xl border border-white/10"
          style={{
            background: 'rgba(255, 255, 255, 0.025)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 80px rgba(168, 85, 247, 0.1)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
            >
              Create Account
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60"
            >
              Join the creative community
            </motion.p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/60">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-white/30 focus:outline-none focus:border-purple-500/40 focus:bg-white/10 transition-all duration-300"
                  placeholder="Choose a username"
                  required
                  minLength="3"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4m0 4h.01" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/60">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-white/30 focus:outline-none focus:border-purple-500/40 focus:bg-white/10 transition-all duration-300"
                  placeholder="you@example.com"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M2 26h20" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/60">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-white/30 focus:outline-none focus:border-purple-500/40 focus:bg-white/10 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                  minLength="6"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4m0 4h.01" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/60">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-white/30 focus:outline-none focus:border-purple-500/40 focus:bg-white/10 transition-all duration-300"
                  placeholder="Confirm your password"
                  required
                  minLength="6"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4m0 4h.01" />
                  </svg>
                </div>
              </div>
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl text-sm font-medium border border-red-500/30"
              >
                {error}
              </motion.div>
            )}
            
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-4 py-3 bg-green-500/20 text-green-400 rounded-xl text-sm font-medium border border-green-500/30"
              >
                {success}
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className={`w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl shadow-purple-900/50 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </motion.button>
          </form>
          
          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-white/10" />
            <span className="px-4 text-sm text-white/40">OR</span>
            <div className="flex-1 border-t border-white/10" />
          </div>
          
          {/* Social login */}
          <div className="space-y-3">
            <button
              onClick={() => {
                // Handle Google sign up
                setSuccess('Google sign-up successful! Redirecting...');
                setTimeout(() => {
                  setLoading(false);
                  // In real app: router.push('/dashboard');
                }, 1500);
              }}
              disabled={loading}
              className={`w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                <span className="ml-2">Continue with Google</span>
              </div>
            </button>
            
            <button
              onClick={() => {
                // Handle Apple sign up
                setSuccess('Apple sign-up successful! Redirecting...');
                setTimeout(() => {
                  setLoading(false);
                  // In real app: router.push('/dashboard');
                }, 1500);
              }}
              disabled={loading}
              className={`w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                <span className="ml-2">Continue with Apple</span>
              </div>
            </button>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/40">
              Already have an account?
              <Link
                href="/login"
                className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}