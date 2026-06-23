"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, MousePointerClick, TrendingUp, Users, Pencil, Activity, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const [userStats, setUserStats] = useState({
    totalViews: 15847,
    profileClicks: 8932,
    recentGrowth: 23.5,
    followers: 1240,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setUserStats((prev) => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 10),
        profileClicks: prev.profileClicks + Math.floor(Math.random() * 5),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { title: "Total Views", value: userStats.totalViews.toLocaleString(), change: "+12.3%", icon: Eye, color: "#a855f7" },
    { title: "Profile Clicks", value: userStats.profileClicks.toLocaleString(), change: "+8.2%", icon: MousePointerClick, color: "#3b82f6" },
    { title: "Growth Rate", value: `${userStats.recentGrowth}%`, change: "+2.1%", icon: TrendingUp, color: "#10b981" },
    { title: "Followers", value: userStats.followers.toLocaleString(), change: "+5", icon: Users, color: "#ec4899" },
  ];

  const activities = [
    { action: "Profile viewed", user: "alex_gamer", time: "2m ago", icon: "👁" },
    { action: "New follower", user: "sarah_stream", time: "15m ago", icon: "👥" },
    { action: "Link clicked", user: "mike_games", time: "1h ago", icon: "🔗" },
    { action: "Profile updated", user: "you", time: "2h ago", icon: "✏️" },
    { action: "New message", user: "emma_stream", time: "5h ago", icon: "💬" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto p-6 md:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black mb-1">Dashboard</h1>
            <p className="text-sm text-white/40">Welcome back, AZRAEL</p>
          </div>
          <Link href="/customize" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:brightness-110 text-white font-bold rounded-full text-sm transition-all shadow-lg shadow-purple-900/30">
            <Pencil size={14} />
            Edit Profile
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon size={16} style={{ color: stat.color }} />
                </div>
                <span className="text-[10px] font-medium text-green-400">{stat.change}</span>
              </div>
              <h3 className="text-[10px] text-white/40 mb-0.5">{stat.title}</h3>
              <p className="text-xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-bold">Analytics Overview</h2>
                <p className="text-[10px] text-white/30">Last 30 days</p>
              </div>
              <div className="flex gap-3 text-[10px]">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500" /><span className="text-white/40">Views</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-pink-500" /><span className="text-white/40">Clicks</span></div>
              </div>
            </div>
            <div className="h-40 flex items-end justify-between gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => {
                const h1 = 25 + Math.sin(i * 0.8) * 20 + Math.random() * 30;
                const h2 = 15 + Math.cos(i * 0.6) * 15 + Math.random() * 20;
                return (
                  <div key={i} className="flex-1 flex items-end gap-0.5 h-36">
                    <motion.div initial={{ height: 0 }} animate={{ height: `${h1}%` }} transition={{ delay: i * 0.05, duration: 0.5 }} className="flex-1 bg-gradient-to-t from-purple-600/40 to-purple-400/60 rounded-t" />
                    <motion.div initial={{ height: 0 }} animate={{ height: `${h2}%` }} transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }} className="flex-1 bg-gradient-to-t from-pink-600/40 to-pink-400/60 rounded-t" />
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Activity */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-5">
              <Activity size={16} className="text-purple-400" />
              <h2 className="text-sm font-bold">Recent Activity</h2>
            </div>
            <div className="space-y-1">
              {activities.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.03] flex items-center justify-center text-xs">{a.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{a.action}</p>
                    <p className="text-[10px] text-white/30">@{a.user}</p>
                  </div>
                  <span className="text-[10px] text-white/25">{a.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { label: "Customize", href: "/customize" },
            { label: "Links", href: "/links" },
            { label: "Templates", href: "/templates" },
            { label: "Premium", href: "/premium" },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }}>
              <Link href={item.href} className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all">
                <span className="text-sm font-medium">{item.label}</span>
                <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
