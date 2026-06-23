"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SOCIAL_PLATFORMS, ThemeConfig, THEMES } from "../lib/config";
import { Eye, Plus, Trash2, GripVertical, Star, MousePointer2, Snowflake, Heart, Terminal } from "lucide-react";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  animation?: "none" | "pulse" | "glow" | "bounce" | "shake";
  featured?: boolean;
}

interface ProfileData {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  theme: ThemeConfig;
  socialLinks: SocialLink[];
  showViews?: boolean;
  customCursor?: boolean;
  pageEffect?: "none" | "snow" | "hearts" | "matrix";
  customCursorStyle?: string;
}

export default function CustomizePage() {
  const [profile, setProfile] = useState<ProfileData>({
    username: "demo",
    displayName: "LYKKA",
    bio: "✨ Premium link-in-bio platform with unlimited customization and insane animations.",
    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    theme: THEMES[0],
    socialLinks: [
      { id: "1", name: "Twitter", url: "https://twitter.com", icon: "fa-twitter", animation: "glow", featured: true },
      { id: "2", name: "Instagram", url: "https://instagram.com", icon: "fa-instagram", animation: "pulse", featured: true },
      { id: "3", name: "YouTube", url: "https://youtube.com", icon: "fa-youtube", animation: "bounce" },
      { id: "4", name: "Discord", url: "https://discord.com", icon: "fa-discord", animation: "none" },
      { id: "5", name: "GitHub", url: "https://github.com", icon: "fa-github", animation: "glow" },
    ],
    showViews: true,
    customCursor: true,
    pageEffect: "snow",
    customCursorStyle: "circle",
  });

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      name: "",
      url: "",
      icon: "fa-globe",
      animation: "none",
      featured: false,
    };
    updateProfile({ socialLinks: [...profile.socialLinks, newLink] });
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    updateProfile({
      socialLinks: profile.socialLinks.map(link => 
        link.id === id ? { ...link, ...updates } : link
      )
    });
  };

  const removeSocialLink = (id: string) => {
    updateProfile({
      socialLinks: profile.socialLinks.filter(link => link.id !== id)
    });
  };

  const saveProfile = () => {
    localStorage.setItem("lykka-profile", JSON.stringify(profile));
    alert("Profile saved!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Panel - Editor */}
      <div className="w-full lg:w-1/2 border-r border-white/10 overflow-y-auto h-screen">
        <div className="p-8 space-y-8 max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight">Editor</h1>
              <p className="text-sm text-white/50">Craft your perfect profile</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveProfile}
              className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition-all"
            >
              Save Profile
            </motion.button>
          </div>

          {/* Profile Basics */}
          <Section title="Profile Basics">
            <div className="grid gap-4">
              <InputField label="Username" value={profile.username} onChange={(v) => updateProfile({ username: v.toLowerCase().replace(/[^a-z0-9]/g, '') })} placeholder="yourname" />
              <InputField label="Display Name" value={profile.displayName} onChange={(v) => updateProfile({ displayName: v })} placeholder="Your Name" />
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  rows={3}
                  placeholder="Tell people about yourself..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                />
              </div>
              <InputField label="Avatar URL" value={profile.avatar} onChange={(v) => updateProfile({ avatar: v })} placeholder="https://..." />
            </div>
          </Section>

          {/* Theme Selection */}
          <Section title="Theme & Background">
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateProfile({ theme })}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    profile.theme.id === theme.id
                      ? "border-purple-500 bg-purple-500/10 scale-[1.02]"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="w-full h-20 rounded-lg mb-3 relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: theme.backgroundColor }} />
                    {theme.backgroundType === "gradient" && (
                      <div className="absolute inset-0 opacity-50" style={{ background: theme.backgroundColor }} />
                    )}
                  </div>
                  <span className="text-sm font-bold">{theme.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Custom Color Picker */}
            <div className="mt-4">
              <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Custom Background</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={profile.theme.backgroundColor || "#000000"}
                  onChange={(e) => updateProfile({
                    theme: { ...profile.theme, backgroundColor: e.target.value }
                  })}
                  className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10"
                />
                <input
                  type="text"
                  value={profile.theme.backgroundColor || "#000000"}
                  onChange={(e) => updateProfile({
                    theme: { ...profile.theme, backgroundColor: e.target.value }
                  })}
                  placeholder="#000000"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none"
                />
              </div>
            </div>
          </Section>

          {/* Social Links Manager */}
          <Section title="Social Links">
            <div className="space-y-3">
              <AnimatePresence>
                {profile.socialLinks.map((link, idx) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical size={14} className="opacity-30 cursor-grab" />
                      <select
                        value={link.name}
                        onChange={(e) => {
                          const platform = SOCIAL_PLATFORMS.find(p => p.name === e.target.value);
                          updateSocialLink(link.id, { name: e.target.value, icon: platform?.icon || "fa-globe" });
                        }}
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                      >
                        <option value="">Select Platform</option>
                        {SOCIAL_PLATFORMS.map(p => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeSocialLink(link.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>

                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateSocialLink(link.id, { url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                    />

                    <div className="flex gap-2">
                      <select
                        value={link.animation || "none"}
                        onChange={(e) => updateSocialLink(link.id, { animation: e.target.value as any })}
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none"
                      >
                        <option value="none">No Animation</option>
                        <option value="pulse">Pulse</option>
                        <option value="glow">Glow</option>
                        <option value="bounce">Bounce</option>
                        <option value="shake">Shake</option>
                      </select>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateSocialLink(link.id, { featured: !link.featured })}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                          link.featured
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-white/5 text-white/60 border border-white/10"
                        }`}
                      >
                        <Star size={12} className={link.featured ? "fill-current" : ""} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={addSocialLink}
                className="w-full py-3 border-2 border-dashed border-white/15 rounded-xl text-sm text-white/50 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Social Link
              </motion.button>
            </div>
          </Section>

          {/* Effects & Extras */}
          <Section title="Effects & Extras">
            <div className="space-y-4">
              {/* Page Effect */}
              <div>
                <label className="block text-xs uppercase tracking-widest mb-3 opacity-60">Page Effect</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "none", icon: null, label: "None" },
                    { id: "snow", icon: Snowflake, label: "Snow" },
                    { id: "hearts", icon: Heart, label: "Hearts" },
                    { id: "matrix", icon: Terminal, label: "Matrix" },
                  ].map((effect) => (
                    <motion.button
                      key={effect.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateProfile({ pageEffect: effect.id as any })}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        profile.pageEffect === effect.id
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {effect.icon && <effect.icon size={18} className="mx-auto mb-1" />}
                      <div className="text-[10px] font-medium">{effect.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom Cursor */}
              <div>
                <label className="block text-xs uppercase tracking-widest mb-3 opacity-60">Custom Cursor</label>
                <div className="grid grid-cols-3 gap-2">
                  {["circle", "dot", "none"].map((style) => (
                    <motion.button
                      key={style}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateProfile({ customCursorStyle: style })}
                      className={`p-3 rounded-xl border text-center capitalize transition-all ${
                        profile.customCursorStyle === style
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <MousePointer2 size={18} className="mx-auto mb-1" />
                      <div className="text-[10px] font-medium">{style}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <ToggleRow label="Show View Counter" checked={profile.showViews || false} onChange={(v) => updateProfile({ showViews: v })} />
                <ToggleRow label="Custom Cursor" checked={profile.customCursor || false} onChange={(v) => updateProfile({ customCursor: v })} />
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Right Panel - Live Phone Preview */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-950/50 p-8 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent" />
        </div>
        
        <div className="relative">
          {/* Live Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-5 -right-5 px-4 py-1.5 bg-green-500 text-black text-xs font-black rounded-full flex items-center gap-1.5 shadow-lg"
          >
            <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
            LIVE PREVIEW
          </motion.div>

          {/* Phone Frame */}
          <div className="w-[380px] h-[780px] bg-gray-900 rounded-[3rem] border-[6px] border-gray-800 shadow-2xl relative overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-800 rounded-b-2xl z-20" />

            {/* Screen */}
            <div className="w-full h-full overflow-hidden relative" style={{ background: profile.theme.backgroundColor }}>
              {/* Page Effects */}
              {profile.pageEffect === "snow" && <SnowEffect />}
              {profile.pageEffect === "hearts" && <HeartsEffect />}
              {profile.pageEffect === "matrix" && <MatrixEffect />}

              {/* Profile Content */}
              <div className="h-full flex flex-col items-center pt-14 pb-8 px-6 overflow-y-auto">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className={`w-24 h-24 ${profile.theme.rounded === "full" ? "rounded-full" : "rounded-2xl"} border-2 overflow-hidden animate-glow`}
                    style={{ borderColor: profile.theme.accentColor }}>
                    <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  {profile.customCursor && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <MousePointer2 size={12} className="text-white" />
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <h1 className="text-2xl font-black" style={{ color: profile.theme.textColor }}>
                    {profile.displayName || "Your Name"}
                  </h1>
                  <p className="text-xs opacity-60 mt-2 leading-relaxed" style={{ color: profile.theme.textColor }}>
                    {profile.bio || "Your bio here..."}
                  </p>
                </motion.div>

                <div className="mt-8 w-full space-y-3">
                  <AnimatePresence>
                    {profile.socialLinks.filter(l => l.url).map((link, idx) => (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: link.featured ? 1.05 : 1.02, x: 4 }}
                        className={`block w-full py-3.5 px-4 rounded-2xl text-center text-sm font-bold transition-all relative overflow-hidden ${
                          link.featured
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                            : "bg-white/10 backdrop-blur-md border border-white/10"
                        }`}
                        style={{
                          color: link.featured ? '#fff' : profile.theme.textColor,
                          animation: link.animation === 'pulse' ? 'pulse 2s infinite' :
                                    link.animation === 'glow' ? 'pulse-glow 2s infinite' :
                                    link.animation === 'bounce' ? 'bounce 1s infinite' :
                                    link.animation === 'shake' ? 'shake 0.5s infinite' : 'none',
                        }}
                      >
                        {link.featured && (
                          <Star size={10} className="absolute top-2 right-2 fill-current" />
                        )}
                        <i className={`fab ${link.icon.replace('fa-', '')} mr-2`} />
                        {link.name}
                      </motion.a>
                    ))}
                  </AnimatePresence>
                </div>

                {profile.showViews && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 flex items-center gap-2 text-xs opacity-60"
                  >
                    <Eye size={12} />
                    <span>1.2K views</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{title}</h2>
      {children}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, isTextarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; isTextarea?: boolean }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">{label}</label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all ${
          checked ? "bg-purple-500" : "bg-white/10"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg transition-transform ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function SnowEffect() {
  const flakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-60"
          style={{
            left: `${flake.left}%`,
            width: flake.size,
            height: flake.size,
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function HeartsEffect() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-500/60"
          style={{ left: `${heart.left}%` }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, Math.random() * 60 - 30],
            scale: [0, 1, 0.5],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

function MatrixEffect() {
  const chars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
    chars: Array.from({ length: 10 }, () => String.fromCharCode(0x30A0 + Math.random() * 96)),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden font-mono text-[10px]">
      {chars.map((col) => (
        <motion.div
          key={col.id}
          className="absolute text-green-500/40"
          style={{ left: `${col.left}%` }}
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: col.duration,
            delay: col.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {col.chars.map((char, i) => (
            <div key={i} style={{ opacity: 1 - i * 0.1 }}>{char}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
