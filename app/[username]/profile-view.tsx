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
}

const DEMO_PROFILE: Profile = {
  username: "demo",
  displayName: "LYKKA DEMO",
  bio: "Premium link-in-bio platform with unlimited customization",
  avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
  theme: { backgroundColor: "#000000", textColor: "#ffffff", accentColor: "#ffffff", rounded: "full" },
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
      if (saved) setProfile(JSON.parse(saved));
    }

    const target = pathname === "/demo" ? "demo" : JSON.parse(localStorage.getItem("lykka-profile") || "{}")?.username;
    if (target) {
      fetch(`https://api.counterapi.dev/v1/lykka-bio/${target}/up`)
        .then(r => r.json())
        .then(d => setViews(d.count || 0))
        .catch(() => setViews(0));
    }
  }, [pathname]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="mb-4 opacity-60">Profile not found</p>
          <a href="/customize" className="underline">Create one</a>
        </div>
      </div>
    );
  }

  const theme = profile.theme || { backgroundColor: "#000000", textColor: "#ffffff", accentColor: "#ffffff", rounded: "full" };
  const COLORS: Record<string, string> = {
    "Twitter": "#1da1f2", "Instagram": "#e4405f", "YouTube": "#ff0000",
    "Twitch": "#6441a5", "Discord": "#5865f2", "GitHub": "#ffffff",
    "TikTok": "#ffffff", "LinkedIn": "#0077b5", "Spotify": "#1db954", "Steam": "#171a21",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative" style={{ background: theme.backgroundColor }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-10 max-w-sm w-full"
      >
        <motion.img
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          whileHover={{ scale: 1.1, rotate: 3 }}
          src={profile.avatar || "https://via.placeholder.com/150"}
          alt={profile.displayName}
          className={`w-28 h-28 ${theme.rounded === "full" ? "rounded-full" : theme.rounded === "lg" ? "rounded-xl" : "rounded-lg"} border-2 object-cover`}
          style={{ borderColor: theme.accentColor, boxShadow: `0 0 40px ${theme.accentColor}30` }}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-2">{profile.displayName}</h1>
          {profile.bio && <p className="text-sm opacity-70 leading-relaxed">{profile.bio}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4 justify-center">
          {profile.socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.1, type: "spring" }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -8, boxShadow: `0 15px 35px ${link.color || COLORS[link.name] || "#fff"}50` }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10"
              style={{ color: link.color || COLORS[link.name] || theme.textColor }}
            >
              <i className={`fab ${link.icon.replace("fa-", "")} text-xl`} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full text-sm">
          <i className="fas fa-eye text-xs opacity-60" />
          <span>{views.toLocaleString()} views</span>
        </motion.div>
      </motion.div>
    </div>
  );
}