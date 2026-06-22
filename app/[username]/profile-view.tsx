"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  avatar: string;
  theme?: any;
  socialLinks: Array<{name: string, url: string, icon: string, color?: string}>;
  music?: { url: string; title?: string; artist?: string };
}

const DEMO_PROFILE: Profile = {
  username: "demo",
  displayName: "LYKKA DEMO",
  bio: "Premium link-in-bio platform with unlimited customization",
  avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
  theme: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    accentColor: "#ffffff",
    rounded: "full",
    animation: "fade"
  },
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com", icon: "fa-twitter", color: "#1da1f2" },
    { name: "Instagram", url: "https://instagram.com", icon: "fa-instagram", color: "#e4405f" },
    { name: "YouTube", url: "https://youtube.com", icon: "fa-youtube", color: "#ff0000" },
    { name: "Discord", url: "https://discord.com", icon: "fa-discord", color: "#5865f2" },
  ]
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
        setProfile(JSON.parse(saved));
      }
    }

    const targetUsername = pathname === "/demo" ? "demo" : JSON.parse(localStorage.getItem("lykka-profile") || "{}")?.username;
    if (targetUsername) {
      fetch(`https://api.counterapi.dev/v1/lykka-bio/${targetUsername}/up`)
        .then(res => res.json())
        .then(data => setViews(data.count || 0))
        .catch(() => setViews(0));
    }
  }, [pathname]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="mb-4 opacity-60">Profile not found</p>
          <a href="/customize" className="text-white underline">Create one</a>
        </div>
      </div>
    );
  }

  const theme = profile.theme || {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    accentColor: "#ffffff",
    rounded: "full"
  };

  const SOCIAL_COLORS: Record<string, string> = {
    "Twitter": "#1da1f2", "Instagram": "#e4405f", "YouTube": "#ff0000",
    "Twitch": "#6441a5", "Discord": "#5865f2", "GitHub": "#ffffff",
    "TikTok": "#ffffff", "LinkedIn": "#0077b5", "Spotify": "#1db954", "Steam": "#171a21",
  };

  const getRoundedClass = () => {
    switch(theme.rounded) {
      case "full": return "rounded-full";
      case "lg": return "rounded-xl";
      case "md": return "rounded-lg";
      case "sm": return "rounded";
      default: return "";
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative"
      style={{ background: theme.backgroundColor }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-8 max-w-sm w-full"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={profile.avatar || "https://via.placeholder.com/150"}
          alt={profile.displayName}
          className={`w-24 h-24 ${getRoundedClass()} border-2 object-cover`}
          style={{ borderColor: theme.accentColor }}
        />

        <div className="text-center">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: theme.textColor }}
          >
            {profile.displayName}
          </h1>
          {profile.bio && (
            <p className="text-sm opacity-70 leading-relaxed" style={{ color: theme.textColor }}>
              {profile.bio}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {profile.socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 transition-all"
              style={{ color: link.color || SOCIAL_COLORS[link.name] || theme.textColor }}
            >
              <i className={`fab ${link.icon.replace("fa-", "")} text-lg`} />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-sm">
          <i className="fas fa-eye text-xs opacity-60" />
          <span>{views.toLocaleString()} views</span>
        </div>
      </motion.div>
    </div>
  );
}