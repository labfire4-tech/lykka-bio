"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Bell, Palette, Trash2, Save, Globe } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black mb-1">Settings</h1>
          <p className="text-sm text-white/50">Manage your account and preferences</p>
        </motion.div>

        <div className="space-y-6">
          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <User size={18} className="text-purple-400" />
              <h3 className="font-bold">Account</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">lykka.bio/</span>
                  <input type="text" defaultValue="gamer" className="glass-input pl-[90px]" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="email" defaultValue="gamer@example.com" className="glass-input pl-11" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Lock size={18} className="text-purple-400" />
              <h3 className="font-bold">Security</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-factor authentication</p>
                  <p className="text-xs text-white/40">Add an extra layer of security</p>
                </div>
                <Toggle checked={twoFactor} onChange={setTwoFactor} />
              </div>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Change password
              </button>
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Bell size={18} className="text-purple-400" />
              <h3 className="font-bold">Preferences</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email notifications</p>
                <p className="text-xs text-white/40">Get notified about your profile activity</p>
              </div>
              <Toggle checked={notifications} onChange={setNotifications} />
            </div>
          </motion.div>

          {/* Danger zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6 border-red-500/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <Trash2 size={18} className="text-red-400" />
              <h3 className="font-bold text-red-400">Danger Zone</h3>
            </div>
            <p className="text-xs text-white/40 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-all">
              Delete Account
            </button>
          </motion.div>

          {/* Save */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end"
          >
            <button className="btn-primary">
              <Save size={16} />
              Save Changes
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full relative transition-colors ${checked ? "bg-purple-600" : "bg-white/10"}`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${checked ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}
