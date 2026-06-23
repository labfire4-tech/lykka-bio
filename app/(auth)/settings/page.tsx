"use client";

import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black mb-8">Settings</h1>
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-bold text-sm mb-4">Account</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider mb-1 opacity-60">Username</label>
                <input type="text" defaultValue="gamer" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider mb-1 opacity-60">Email</label>
                <input type="email" defaultValue="gamer@example.com" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm" />
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-bold text-sm mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <div className="w-10 h-5 bg-purple-600 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-bold text-sm mb-4">Danger Zone</h3>
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}