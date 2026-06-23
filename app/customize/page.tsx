"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SOCIAL_PLATFORMS, ThemeConfig, THEMES } from "../lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { SOCIAL_PLATFORMS, ThemeConfig, THEMES } from "../lib/config";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  animation?: "none" | "pulse" | "glow" | "bounce";
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
}

export default function CustomizePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>({
    username: "demo",
    displayName: "LYKKA",
    bio: "Create stunning link-in-bio pages",
    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    theme: THEMES[0],
    socialLinks: [
      { id: "1", name: "Twitter", url: "https://twitter.com", icon: "fa-twitter", animation: "glow", featured: true },
      { id: "2", name: "Instagram", url: "https://instagram.com", icon: "fa-instagram", animation: "pulse" },
      { id: "3", name: "YouTube", url: "https://youtube.com", icon: "fa-youtube", animation: "none" },
    ],
    showViews: true,
    customCursor: true,
    pageEffect: "snow",
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
    alert("Profile saved! View it at /" + profile.username);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Panel - Editor */}
      <div className="w-full lg:w-1/2 border-r border-white/10 overflow-y-auto">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Editor</h1>
            <p className="text-sm opacity-50">Customize your link-in-bio page</p>
          </div>

          {/* Profile Basics */}
          <Section title="Profile Basics">
            <InputGroup label="Username" value={profile.username} onChange={(v) => updateProfile({ username: v.toLowerCase().replace(/[^a-z0-9]/g, '') })} placeholder="yourname" />
            <InputGroup label="Display Name" value={profile.displayName} onChange={(v) => updateProfile({ displayName: v })} placeholder="Your Name" />
            <InputGroup label="Bio" value={profile.bio} onChange={(v) => updateProfile({ bio: v })} placeholder="Tell people about yourself..." isTextarea />
            <InputGroup label="Avatar URL" value={profile.avatar} onChange={(v) => updateProfile({ avatar: v })} placeholder="https://..." />
          </Section>

          {/* Themes */}
          <Section title="Theme & Background">
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => updateProfile({ theme })}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    profile.theme.id === theme.id 
                      ? 'border-white bg-white/10 scale-[1.02]' 
                      : 'border-white/10 hover:border-white/20 hover:scale-[1.01]'
                  }`}
                >
                  <div className="w-full h-16 rounded-lg mb-3" style={{ background: theme.backgroundColor }} />
                  <span className="text-sm font-medium">{theme.name}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* Social Links */}
          <Section title="Social Links">
            <div className="space-y-3">
              <AnimatePresence>
                {profile.socialLinks.map((link) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                  >
                    <div className="flex gap-2">
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
                      <button
                        onClick={() => removeSocialLink(link.id)}
                        className="px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 text-sm"
                      >
                        ×
                      </button>
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
                        className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                      >
                        <option value="none">No Animation</option>
                        <option value="pulse">Pulse</option>
                        <option value="glow">Glow</option>
                        <option value="bounce">Bounce</option>
                      </select>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={link.featured || false}
                          onChange={(e) => updateSocialLink(link.id, { featured: e.target.checked })}
                          className="rounded"
                        />
                        Featured
                      </label>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button
                onClick={addSocialLink}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-sm hover:bg-white/5 transition-all"
              >
                + Add Social Link
              </button>
            </div>
          </Section>

          {/* Effects */}
          <Section title="Effects & Extras">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show View Counter</span>
                <Toggle checked={profile.showViews || false} onChange={(v) => updateProfile({ showViews: v })} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Custom Cursor</span>
                <Toggle checked={profile.customCursor || false} onChange={(v) => updateProfile({ customCursor: v })} />
              </div>
              <div>
                <label className="block text-sm mb-2">Page Effect</label>
                <select
                  value={profile.pageEffect || "none"}
                  onChange={(e) => updateProfile({ pageEffect: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                >
                  <option value="none">None</option>
                  <option value="snow">Snow</option>
                  <option value="hearts">Hearts</option>
                  <option value="matrix">Matrix Rain</option>
                </select>
              </div>
            </div>
          </Section>

          <button
            onClick={saveProfile}
            className="w-full py-4 bg-white text-black font-black rounded-xl uppercase tracking-wider hover:bg-gray-200 transition-all"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-950 p-8">
        <div className="relative">
          {/* Phone Frame */}
          <div className="w-[375px] h-[812px] bg-black rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden relative">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20" />
            
            {/* Phone Screen */}
            <div className="w-full h-full overflow-y-auto" style={{ background: profile.theme.backgroundColor }}>
              {/* Profile Content */}
              <div className="pt-16 pb-8 px-6 flex flex-col items-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.displayName}
                    className={`w-24 h-24 ${profile.theme.rounded === "full" ? "rounded-full" : "rounded-xl"} border-2 object-cover`}
                    style={{ borderColor: profile.theme.accentColor }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <h1 className="text-2xl font-black" style={{ color: profile.theme.textColor }}>
                    {profile.displayName || "Your Name"}
                  </h1>
                  <p className="text-xs opacity-60 mt-2" style={{ color: profile.theme.textColor }}>
                    {profile.bio || "Your bio here..."}
                  </p>
                </motion.div>

                <div className="mt-8 w-full space-y-3">
                  {profile.socialLinks.filter(l => l.url).map((link, idx) => (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      whileHover={{ scale: link.featured ? 1.05 : 1.02 }}
                      className={`block w-full py-3 px-4 rounded-xl text-center text-sm font-medium ${
                        link.featured ? 'bg-white text-black' : 'bg-white/10'
                      }`}
                      style={{
                        color: link.featured ? '#000' : profile.theme.textColor,
                        animation: link.animation === 'pulse' ? 'pulse 2s infinite' : 
                                   link.animation === 'glow' ? 'glow 2s infinite' : 'none'
                      }}
                    >
                      <i className={`fab ${link.icon.replace('fa-', '')} mr-2`} />
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                {profile.showViews && (
                  <div className="mt-8 flex items-center gap-2 text-xs opacity-60">
                    <Eye className="w-3 h-3" />
                    <span>1.2K views</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Badge */}
          <div className="absolute -top-4 -right-4 px-3 py-1 bg-green-500 text-black text-xs font-bold rounded-full">
            LIVE PREVIEW
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xs uppercase tracking-widest opacity-60 font-bold">{title}</h2>
      {children}
    </div>
  );
}

function InputGroup({ label, value, onChange, placeholder, isTextarea }: any) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">{label}</label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-all resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-all"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-all ${
        checked ? 'bg-white' : 'bg-white/20'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-0.5'
      }`} />
    </button>
  );
}