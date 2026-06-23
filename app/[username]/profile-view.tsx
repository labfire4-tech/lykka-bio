"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, Copy, Check, ExternalLink, Sparkles, Music } from "lucide-react";

interface SocialLink { name: string; url: string; icon: string; color?: string; }
interface Profile {
  username: string; displayName: string; bio?: string; avatar: string;
  theme?: { backgroundColor?: string; textColor?: string; accentColor?: string; rounded?: string; };
  socialLinks: SocialLink[];
}

const DEMO_PROFILE: Profile = {
  username: "gamer", displayName: "AZRAEL", bio: "Digital creator • Gamer • Streamer",
  avatar: "https://i.pravatar.cc/150?u=gamer",
  theme: { backgroundColor: "#000000", textColor: "#ffffff", accentColor: "#a855f7", rounded: "full" },
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com", icon: "twitter", color: "#1da1f2" },
    { name: "Instagram", url: "https://instagram.com", icon: "instagram", color: "#e4405f" },
    { name: "YouTube", url: "https://youtube.com", icon: "youtube", color: "#ff0000" },
    { name: "Discord", url: "https://discord.com", icon: "discord", color: "#5865f2" },
    { name: "GitHub", url: "https://github.com", icon: "github", color: "#ffffff" },
    { name: "Spotify", url: "https://spotify.com", icon: "spotify", color: "#1db954" },
  ],
};

const COLORS: Record<string, string> = {
  Twitter: "#1da1f2", Instagram: "#e4405f", YouTube: "#ff0000", Twitch: "#6441a5",
  Discord: "#5865f2", GitHub: "#ffffff", TikTok: "#ffffff", LinkedIn: "#0077b5",
  Spotify: "#1db954", Steam: "#66c0f4",
};

function SocialIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    twitter: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
    instagram: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
    youtube: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
    discord: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>,
    github: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>,
    spotify: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>,
    twitch: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" /></svg>,
    tiktok: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" /></svg>,
    linkedin: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    steam: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.526-4.524 4.526h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.523 3.398-3.398 3.398-1.639 0-3.012-1.165-3.331-2.717L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.331.005-1.963s-.753-1.121-1.382-1.383c-.625-.26-1.314-.255-1.913-.009l1.523.63c.956.398 1.409 1.492 1.011 2.448-.397.956-1.491 1.409-2.447 1.012zm13.616-9.299c0-1.661-1.35-3.013-3.012-3.013-1.661 0-3.012 1.352-3.012 3.013 0 1.661 1.351 3.012 3.012 3.012 1.662 0 3.012-1.351 3.012-3.012zm-5.276-.005c0-1.252 1.013-2.266 2.265-2.266 1.253 0 2.266 1.014 2.266 2.266 0 1.251-1.013 2.266-2.266 2.266-1.252 0-2.265-1.015-2.265-2.266z" /></svg>,
    default: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  };
  return <span style={{ color }}>{icons[name] || icons.default}</span>;
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current || target === 0) return;
    startedRef.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

function useTypewriter(text: string, speed = 40, delay = 600) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!text) return;
    setDisplayed("");
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);
  return displayed;
}

export default function ProfileView() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [views, setViews] = useState(0);
  const [copied, setCopied] = useState(false);
  const animatedViews = useCountUp(views);

  useEffect(() => {
    if (pathname === "/demo") { setProfile(DEMO_PROFILE); return; }
    const saved = localStorage.getItem("lykka-profile");
    if (saved) { try { const p = JSON.parse(saved); if (p.username) setProfile(p); } catch {} }
  }, [pathname]);

  useEffect(() => {
    if (!profile?.username) return;
    fetch(`https://api.counterapi.dev/v1/lykka-bio/${profile.username}/up`).then(r => r.json()).then(d => setViews(d.count || 0)).catch(() => setViews(0));
  }, [profile?.username]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const typedBio = useTypewriter(profile?.bio || "Digital creator", 35, 800);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center">
            <Sparkles size={32} className="text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Profile Not Found</h1>
          <p className="text-white/50 mb-8">This profile doesn't exist yet. Create your own premium bio page in seconds.</p>
          <a href="/customize" className="btn-primary inline-flex">Create Your Profile</a>
        </motion.div>
      </div>
    );
  }

  const theme = profile.theme || { backgroundColor: "#050505", textColor: "#fff", accentColor: "#a855f7", rounded: "full" };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: theme.backgroundColor || "#050505" }}>
      {/* Animated ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px]"
          style={{ backgroundColor: `${theme.accentColor}15` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-[100px]"
          style={{ backgroundColor: `${theme.accentColor}10` }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* CRT scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.06]">
        <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)" }} />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-sm w-full mx-auto relative z-10"
      >
        {/* Profile card */}
        <div className="rounded-3xl p-8 backdrop-blur-2xl border" style={{ backgroundColor: "rgba(0,0,0,0.7)", borderColor: `${theme.accentColor}25`, boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 60px ${theme.accentColor}08` }}>

          {/* Avatar with multi-layer pulsing glow rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 200, delay: 0.2 }}
            className="relative w-32 h-32 mx-auto mb-6"
          >
            {/* Outer pulsing ring */}
            <motion.div
              className="absolute -inset-3 rounded-full"
              style={{ background: `conic-gradient(from 0deg, ${theme.accentColor}, transparent 60%, ${theme.accentColor})` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner glow */}
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{ background: theme.accentColor, opacity: 0.2, filter: "blur(8px)" }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Black ring separator */}
            <div className="absolute -inset-0.5 rounded-full bg-black/60" />
            <img src={profile.avatar || "https://i.pravatar.cc/150"} alt={profile.displayName} className="relative w-32 h-32 rounded-full object-cover border-2" style={{ borderColor: `${theme.accentColor}60` }} />
          </motion.div>

          {/* Name */}
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-3xl font-bold tracking-tight text-center mb-2" style={{ color: theme.textColor || "#fff" }}>
            {profile.displayName}
          </motion.h1>

          {/* Bio with typewriter effect */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-center mb-6">
            <p className="text-sm leading-relaxed min-h-[20px]" style={{ color: `${theme.textColor}80` }}>
              {typedBio}
              <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle animate-pulse" style={{ backgroundColor: theme.accentColor }} />
            </p>
          </motion.div>

          {/* Copy link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex justify-center mb-6">
            <button onClick={handleCopyLink} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105" style={{ backgroundColor: `${theme.accentColor}15`, color: theme.textColor || "#fff", border: `1px solid ${theme.accentColor}30` }}>
              {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy link</>}
            </button>
          </motion.div>

          {/* Social links with staggered bounce + shine + glow */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="space-y-3">
            {profile.socialLinks.map((link, idx) => {
              const linkColor = link.color || COLORS[link.name] || "#a855f7";
              return (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + idx * 0.08, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-4 w-full px-5 py-3.5 rounded-2xl backdrop-blur-md transition-all duration-300 shine relative overflow-hidden"
                  style={{ backgroundColor: `${linkColor}12`, border: `1px solid ${linkColor}25` }}
                >
                  <SocialIcon name={link.icon} color={linkColor} />
                  <span className="flex-1 text-left text-sm font-medium" style={{ color: theme.textColor || "#fff" }}>{link.name}</span>
                  <ExternalLink size={14} className="opacity-30 group-hover:opacity-70 transition-opacity" style={{ color: theme.textColor || "#fff" }} />
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: `inset 0 0 20px ${linkColor}15` }} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* View counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + profile.socialLinks.length * 0.08 }}
            className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-white/5"
          >
            <Eye size={14} className="text-white/40" />
            <span className="text-sm text-white/50">
              <span className="font-semibold text-white/70">{animatedViews.toLocaleString()}</span> views
            </span>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-center mt-6">
          <a href="/" className="text-xs text-white/30 hover:text-white/50 transition-colors">
            Powered by <span className="font-bold">LYKKA</span><span style={{ color: theme.accentColor }}>.</span>bio
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
