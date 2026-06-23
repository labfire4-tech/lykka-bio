"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  avatar: string;
  theme?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    rounded?: string;
  };
  socialLinks: Array<{ name: string; url: string; icon: string; color?: string }>;
}

const DEMO_PROFILE: Profile = {
  username: "gamer",
  displayName: "AZRAEL",
  bio: "Digital creator • Gamer • Streamer",
  avatar: "https://i.pravatar.cc/150?u=gamer",
  theme: { 
    backgroundColor: "#000000", 
    textColor: "#ffffff", 
    accentColor: "#a855f7", 
    rounded: "full" 
  },
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com", icon: "fa-twitter", color: "#1da1f2" },
    { name: "Instagram", url: "https://instagram.com", icon: "fa-instagram", color: "#e4405f" },
    { name: "YouTube", url: "https://youtube.com", icon: "fa-youtube", color: "#ff0000" },
    { name: "Discord", url: "https://discord.com", icon: "fa-discord", color: "#5865f2" },
    { name: "GitHub", url: "https://github.com", icon: "fa-github", color: "#ffffff" },
    { name: "Spotify", url: "https://spotify.com", icon: "fa-spotify", color: "#1db954" },
  ],
};

const COLORS: Record<string, string> = {
  Twitter: "#1da1f2",
  Instagram: "#e4405f",
  YouTube: "#ff0000",
  Twitch: "#6441a5",
  Discord: "#5865f2",
  GitHub: "#ffffff",
  TikTok: "#ffffff",
  LinkedIn: "#0077b5",
  Spotify: "#1db954",
  Steam: "#171a21",
};

export default function ProfileView() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (pathname === "/demo") {
      setProfile(DEMO_PROFILE);
    } else {
      const saved = localStorage.getItem("lykka-profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.username) setProfile(parsed);
        } catch {}
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!profile?.username) return;
    fetch(`https://api.counterapi.dev/v1/lykka-bio/${profile.username}/up`)
      .then(r => r.json())
      .then(d => setViews(d.count || 0))
      .catch(() => setViews(0));
  }, [profile?.username]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-sans">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-white/60 mb-6">Create your premium profile today</p>
          <a 
            href="/customize" 
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition-all duration-300"
          >
            Create One
          </a>
        </div>
      </div>
    );
  }

  const theme = profile.theme || { backgroundColor: "#000", textColor: "#fff", accentColor: "#a855f7", rounded: "full" };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: theme.backgroundColor || "#000" }}
    >
      {/* CRT Scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)"
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-sm w-full mx-auto relative z-10"
      >
        {/* Profile Card */}
        <motion.div 
          className="rounded-3xl p-8 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.6)",
            borderColor: `${theme.accentColor}20`
          }}
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
            className="relative w-32 h-32 mx-auto mb-6"
          >
            <img
              src={profile.avatar || "https://via.placeholder.com/150"}
              alt={profile.displayName}
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/30 shadow-xl"
              style={{ 
                backgroundColor: theme.accentColor || "#a855f7",
                borderColor: theme.accentColor || "#a855f7"
              }}
            />
            <div className="absolute -inset-2 rounded-full border-2 border-purple-400/30 animate-pulse" />
          </motion.div>

          {/* Name & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 
              className="text-3xl md:text-4xl font-black mb-2 tracking-tight"
              style={{ color: theme.textColor || "#fff" }}
            >
              {profile.displayName}
            </h1>
            <p 
              className="text-white/60 text-sm md:text-base leading-relaxed"
              style={{ color: `${theme.textColor}80` }}
            >
              {profile.bio || "Digital creator"}
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3"
          >
            {profile.socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.08 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 w-full px-5 py-3.5 rounded-2xl bg-white/8 hover:bg-white/12 transition-all duration-300 backdrop-blur-md border border-white/10 group"
                style={{
                  backgroundColor: `${theme.accentColor}10`,
                  borderColor: `${theme.accentColor}20`
                }}
              >
                <i 
                  className={`fab ${link.icon.replace("fa-", "")} text-xl`}
                  style={{ color: link.color || COLORS[link.name] || "#fff" }}
                />
                <span className="flex-1 text-left font-medium" style={{ color: theme.textColor || "#fff" }}>
                  {link.name}
                </span>
                <svg 
                  className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-center gap-2 mt-8 px-5 py-2.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
          >
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C7.75 5.907 16.25 5.907 21.542 12" />
            </svg>
            <span className="text-sm text-white/70">{views.toLocaleString()} views</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}