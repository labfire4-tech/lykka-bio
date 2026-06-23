"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart3,
  Link2,
  Settings,
  LogOut,
  Crown,
  Image,
  FileText,
  HelpCircle,
  ExternalLink,
  Users,
  ChevronDown,
  Search,
  Share2,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lykka-user");
    if (saved) setUser(JSON.parse(saved));
    else window.location.href = "/login";
  }, []);

  if (!user) return null;

  const tabs = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Link2, label: "Links", href: "/links", badge: null },
    { icon: Image, label: "Image Host", href: "/image-host" },
    { icon: FileText, label: "Templates", href: "/templates" },
    { icon: Crown, label: "Premium", href: "/premium" },
    { icon: HelpCircle, label: "Help Center", href: "/help" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const stats = [
    { label: "Total Views", value: "12.4K", trend: "+12.4%", up: true },
    { label: "Profile Visits", value: "3.2K", trend: "+8.1%", up: true },
    { label: "New Subscribers", value: "247", trend: "+18", up: true },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
        <h1 className="text-lg font-black">LYKKA<span className="text-purple-500">.</span></h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={
            "fixed md:static inset-y-0 left-0 z-40 w-72 border-r border-white/10 p-5 flex flex-col transform transition-transform duration-300 " +
            (sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")
          }
        >
          <div className="space-y-7 flex-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <span className="text-lg font-black tracking-tight">LYKKA<span className="text-purple-500">.</span></span>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search features..."
                className="w-full pl-9 pr-8 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs placeholder:text-white/30 focus:outline-none"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-white/25 border border-white/10 rounded px-1.5 py-0.5">⌘K</span>
            </div>

            <nav className="space-y-0.5">
              {tabs.map((tab) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all " +
                    (tab.active ? "bg-purple-700 text-white" : "text-white/60 hover:text-white/80 hover:bg-white/[0.03]")
                  }
                >
                  <tab.icon size={16} />
                  <span className="flex-1">{tab.label}</span>
                  {tab.badge && <span className="text-[10px] bg-purple-600 px-2 py-0.5 rounded-full">NEW</span>}
                  <ChevronDown size="14" className={tab.active ? "rotate-180" : "hidden"} />
                </Link>
              ))}
            </nav>

            <div className="space-y-2 pt-2">
              <Link
                href={"/" + (user.username || "demo")}
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-purple-700/20 text-purple-400 text-sm font-medium hover:bg-purple-700/30 transition-all"
              >
                <ExternalLink size={14} />
                My Page
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("lykka-user");
                  window.location.href = "/login";
                }}
                className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-red-400 text-sm transition-colors w-full"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Main */}
        <main className="flex-1 min-h-screen p-6 md:p-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black mb-1">Dashboard</h1>
                <p className="text-sm text-white/40">Welcome back, @{user.username}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/customize" className="px-4 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">
                  Customize your page
                </Link>
                <button className="p-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="text-xs text-white/40 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-[28px] font-black leading-none mb-2">{stat.value}</div>
                  <div className="text-sm text-green-400 font-medium">{stat.trend}</div>
                </motion.div>
              ))}
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4">All Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Link2, label: "Links", desc: "Add, edit and reorder your links", href: "/links" },
                  { icon: Image, label: "Image Host", desc: "Upload and manage images", href: "/image-host" },
                  { icon: FileText, label: "Templates", desc: "Pre-built page templates", href: "/templates" },
                  { icon: Crown, label: "Premium", desc: "Unlock advanced features", href: "/premium" },
                  { icon: HelpCircle, label: "Help Center", desc: "Docs, FAQ and more", href: "/help" },
                  { icon: Settings, label: "Settings", desc: "Account and preferences", href: "/settings" },
                ].map((item, i) => (
                  <Link key={item.label} href={item.href}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      whileHover={{ y: -3 }}
                      className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all"
                    >
                      <item.icon size={18} className="mb-3 text-purple-400" />
                      <h3 className="font-bold text-sm mb-1">{item.label}</h3>
                      <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}