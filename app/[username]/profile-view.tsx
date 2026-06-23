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
  bio: "Digital creator",
  avatar: "https://i.pravatar.cc/150?u=gamer",
  theme: { backgroundColor: "#000000", textColor: "#ffffff", accentColor: "#ffffff", rounded: "full" },
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com", icon: "fa-twitter", color: "#1da1f2" },
    { name: "Instagram", url: "https://instagram.com", icon: "fa-instagram", color: "#e4405f" },
    { name: "YouTube", url: "https://youtube.com", icon: "fa-youtube", color: "#ff0000" },
    { name: "Discord", url: "https://discord.com", icon: "fa-discord", color: "#5865f2" },
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
    const target = pathname === "/demo" ? "demo" : (profile?.username || "");
    if (target) {
      fetch(`https://api.counterapi.dev/v1/lykka-bio/${target}/up`)
        .then(r => r.json())
        .then(d => setViews(d.count || 0))
        .catch(() => setViews(0));
    }
  }, [pathname, profile?.username]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="mb-4 opacity-60">Profile not found</p>
          <a href="/customize" className="underline">
            Create one
          </a>
        </div>
      </div>
    );
  }

  const theme = profile.theme || { backgroundColor: "#000000", textColor: "#ffffff", accentColor: "#ffffff", rounded: "full" };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{ background: theme.backgroundColor || "#000000" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-8 max-w-sm w-full"
      >
        <motion.img
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          whileHover={{ scale: 1.1, rotate: 3 }}
          src={profile.avatar || "https://via.placeholder.com/150"}
          alt={profile.displayName}
          className="w-28 h-28 rounded-full border-2 object-cover"
          style={{ borderColor: theme.accentColor || "#ffffff" }}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black mb-2"
            style={{ color: theme.textColor || "#ffffff" }}
          >
            {profile.displayName}
          </motion.h1>
          {profile.bio && (
            <p className="text-sm opacity-70 leading-relaxed" style={{ color: theme.textColor || "#ffffff" }}>
              {profile.bio}
            </p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full space-y-3">
          {profile.socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 w-full px-5 py-3 rounded-full text-left text-sm font-medium bg-white/10 hover:bg-white/15 transition-all backdrop-blur-md border border-white/10"
            >
              <i className={`fab ${link.icon.replace("fa-", "")} text-lg`} style={{ color: link.color || COLORS[link.name] || "#fff" }} />
              <span style={{ color: theme.textColor || "#ffffff" }}>{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full text-sm"
        >
          <i className="fas fa-eye text-xs opacity-60" />
          <span>{views.toLocaleString()} views</span>
        </motion.div>
      </motion.div>
    </div>
  );
}