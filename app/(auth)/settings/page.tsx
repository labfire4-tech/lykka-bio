"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Bell, Trash2, Save } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black mb-1">Settings</h1>
          <p className="text-sm text-white/40">Manage your account and preferences</p>
        </motion.div>

        <div className="space-y-4">
          {/* Account */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-5">
              <User size={18} className="text-purple-400" />
              <h3 className="font-bold text-sm">Account</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 text-sm">lykka.bio/</span>
                  <input type="text" defaultValue="gamer" className="w-full pl-[90px] pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm focus:outline-none focus:border-purple-500/30 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Email</label>
                <input type="email" defaultValue="gamer@example.com" className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm focus:outline-none focus:border-purple-500/30 transition-colors" />
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-5">
              <Lock size={18} className="text-purple-400" />
              <h3 className="font-bold text-sm">Security</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-factor authentication</p>
                  <p className="text-xs text-white/30">Add an extra layer of security</p>
                </div>
                <Toggle checked={twoFactor} onChange={setTwoFactor} />
              </div>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">Change password</button>
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-5">
              <Bell size={18} className="text-purple-400" />
              <h3 className="font-bold text-sm">Preferences</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email notifications</p>
                <p className="text-xs text-white/30">Get notified about your profile activity</p>
              </div>
              <Toggle checked={notifications} onChange={setNotifications} />
            </div>
          </motion.div>

          {/* Danger */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl p-6 bg-white/[0.02] border border-red-500/15">
            <div className="flex items-center gap-2 mb-5">
              <Trash2 size={18} className="text-red-400" />
              <h3 className="font-bold text-sm text-red-400">Danger Zone</h3>
            </div>
            <p className="text-xs text-white/30 mb-4">Once you delete your account, there is no going back.</p>
            <button className="px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-all">
              Delete Account
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:brightness-110 text-white font-bold rounded-full text-sm transition-all shadow-lg shadow-purple-900/30">
              <Save size={16} /> Save Changes
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className={`w-11 h-6 rounded-full relative transition-colors ${checked ? "bg-green-600" : "bg-white/10"}`}>
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}
