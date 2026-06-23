"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, MousePointerClick, TrendingUp, Users, Pencil, ExternalLink, Activity } from "lucide-react";

export default function DashboardPage() {
  const [userStats, setUserStats] = useState({
    totalViews: 15847,
    profileClicks: 8932,
    recentGrowth: 23.5,
    followers: 1240,
  });

  const [livePreview, setLivePreview] = useState(false);

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
    { action: "Profile viewed", user: "alex_gamer", time: "2m ago", type: "view" },
    { action: "New follower", user: "sarah_stream", time: "15m ago", type: "follow" },
    { action: "Social link clicked", user: "mike_games", time: "1h ago", type: "click" },
    { action: "Profile updated", user: "you", time: "2h ago", type: "update" },
    { action: "New message", user: "emma_stream", time: "5h ago", type: "message" },
    { action: "Content shared", user: "tech_guru", time: "6h ago", type: "share" },
  ];

  const activityColors: Record<string, string> = {
    view: "text-blue-400 bg-blue-500/10",
    follow: "text-green-400 bg-green-500/10",
    click: "text-purple-400 bg-purple-500/10",
    update: "text-orange-400 bg-orange-500/10",
    message: "text-pink-400 bg-pink-500/10",
    share: "text-yellow-400 bg-yellow-500/10",
  };

  const activityIcons: Record<string, string> = {
    view: "👁",
    follow: "👥",
    click: "🔗",
    update: "✏️",
    message: "💬",
    share: "📤",
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto p-6 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-1">Dashboard</h1>
            <p className="text-sm text-white/50">Welcome back, AZRAEL</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setLivePreview(!livePreview)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
            >
              <Eye size={16} />
              {livePreview ? "Hide" : "Preview"}
            </button>
            <Link href="/customize" className="btn-primary text-sm">
              <Pencil size={14} />
              Edit Profile
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-hover p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
                <span className="text-xs font-medium text-green-400 flex items-center gap-0.5">
                  <TrendingUp size={12} />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-xs text-white/50 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Analytics Overview</h2>
                <p className="text-xs text-white/40">Last 30 days</p>
              </div>
              <div className="flex gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-white/50">Views</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                  <span className="text-white/50">Clicks</span>
                </div>
              </div>
            </div>

            {/* Bar chart */}
            <div className="h-56 flex items-end justify-between gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => {
                const height1 = 25 + Math.sin(i * 0.8) * 20 + Math.random() * 30;
                const height2 = 15 + Math.cos(i * 0.6) * 15 + Math.random() * 20;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end gap-0.5 h-44">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height1}%` }}
                        transition={{ delay: i * 0.05, duration: 0.6 }}
                        className="flex-1 bg-gradient-to-t from-purple-600/40 to-purple-400/60 rounded-t"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height2}%` }}
                        transition={{ delay: i * 0.05 + 0.1, duration: 0.6 }}
                        className="flex-1 bg-gradient-to-t from-pink-600/40 to-pink-400/60 rounded-t"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-white/30">
              {["W1", "W2", "W3", "W4"].map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </motion.div>

          {/* Activity feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity size={16} className="text-purple-400" />
              <h2 className="text-lg font-bold">Recent Activity</h2>
            </div>
            <div className="space-y-1">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm ${activityColors[activity.type]}`}
                  >
                    {activityIcons[activity.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{activity.action}</p>
                    <p className="text-[10px] text-white/40">@{activity.user}</p>
                  </div>
                  <span className="text-[10px] text-white/30 whitespace-nowrap">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Customize", href: "/customize", icon: Pencil },
            { label: "Links", href: "/links", icon: ExternalLink },
            { label: "Templates", href: "/templates", icon: Activity },
            { label: "Premium", href: "/premium", icon: TrendingUp },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              <Link href={item.href} className="card-hover p-5 flex items-center gap-3 group">
                <item.icon size={18} className="text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
