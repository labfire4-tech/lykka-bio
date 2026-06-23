"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, Users, Link2, Settings, LogOut, Crown } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lykka-user");
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      window.location.href = "/login";
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/30 animate-pulse">Loading...</div>
      </div>
    );
  }

  const stats = [
    { label: "Total Views", value: "12.4K", icon: BarChart3, trend: "+12%" },
    { label: "Profile Visits", value: "3.2K", icon: Users, trend: "+8%" },
    { label: "Link Clicks", value: "891", icon: Link2, trend: "+24%" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 hidden md:block">
        <div className="space-y-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-black hover:text-purple-400 transition-colors">
              LYKKA<span className="text-purple-500">.</span>BIO
            </h1>
          </Link>

          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: "Dashboard", href: "/dashboard", active: true },
              { icon: Link2, label: "Links", href: "/customize", active: false },
              { icon: Crown, label: "Premium", href: "/premium", active: false },
              { icon: Settings, label: "Settings", href: "/settings", active: false },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={() => {
              localStorage.removeItem("lykka-user");
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-red-400"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black mb-2">Dashboard</h1>
              <p className="text-sm opacity-60">Welcome back, {user.username || "User"}</p>
            </div>
            <Link
              href={`/${user.username || "demo"}`}
              target="_blank"
              className="px-6 py-2.5 bg-white text-black font-bold rounded-lg text-sm hover:bg-gray-200 transition-all"
            >
              View Profile
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon size={20} className="text-white/60" />
                  <span className="text-xs text-green-400 font-medium">{stat.trend}</span>
                </div>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-xs opacity-60 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/customize"
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 hover:border-purple-500/30 transition-all group"
            >
              <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
                Customize Profile
              </h3>
              <p className="text-sm opacity-60">Edit your bio, links, and theme</p>
            </Link>

            <Link
              href="/premium"
              className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-white/10 hover:border-yellow-500/30 transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <Crown size={18} className="text-yellow-500" />
                <h3 className="text-lg font-bold group-hover:text-yellow-400 transition-colors">
                  Go Premium
                </h3>
              </div>
              <p className="text-sm opacity-60">Unlock advanced features and analytics</p>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
