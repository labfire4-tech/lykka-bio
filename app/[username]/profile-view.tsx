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

export default function ProfileView() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [views, setViews] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Get profile from localStorage (client-side only)
    const saved = localStorage.getItem("lykka-profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }

    // View counter
    if (profile?.username) {
      fetch(`https://api.counterapi.dev/v1/lykka-bio/${profile.username}/up`)
        .then(res => res.json())
        .then(data => setViews(data.count || 0))
        .catch(() => setViews(0));
    }
  }, [profile?.username]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Profile not found. <a href="/customize" className="underline">Create one</a></p>
      </div>
    );
  }

  const theme = profile.theme || {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    accentColor: "#ffffff",
    rounded: "full",
    animation: "fade"
  };

  const SOCIAL_COLORS: Record<string, string> = {
    "Twitter": "#1da1f2",
    "Instagram": "#e4405f",
    "YouTube": "#ff0000",
    "Twitch": "#6441a5",
    "Discord": "#5865f2",
    "GitHub": "#ffffff",
    "TikTok": "#ffffff",
    "LinkedIn": "#0077b5",
    "Spotify": "#1db954",
    "Steam": "#171a21",
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: theme.backgroundColor }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6 max-w-md w-full"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={profile.avatar || "https://via.placeholder.com/150"}
          alt={profile.displayName}
          className={`w-24 h-24 rounded-${theme.rounded === "full" ? "full" : theme.rounded || "full"} border-2 object-cover`}
          style={{ borderColor: theme.accentColor }}
        />

        <div className="text-center">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: theme.textColor }}
          >
            {profile.displayName}
          </h1>
          {profile.bio && (
            <p className="text-sm opacity-70" style={{ color: theme.textColor }}>
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
              whileHover={{ scale: 1.1, y: -2 }}
              className={`w-12 h-12 flex items-center justify-center rounded-full glass-panel transition-all`}
              style={{ color: link.color || SOCIAL_COLORS[link.name] || theme.textColor }}
            >
              <i className={`fab fa-${link.icon.replace("fa-", "")} text-lg`} />
            </motion.a>
          ))}
        </div>

        <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
          <i className="fas fa-eye" />
          <span>{views.toLocaleString()}</span>
        </div>
      </motion.div>

      {profile.music?.url && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-panel px-6 py-4 rounded-full flex items-center gap-4 min-w-[300px]">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}