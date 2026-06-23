"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SOCIAL_PLATFORMS, ThemeConfig, THEMES } from "../lib/config";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomizePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(THEMES[0]);
  const [socialLinks, setSocialLinks] = useState<Array<{name: string, url: string, icon: string}>>([]);

  const addSocialLink = () => setSocialLinks([...socialLinks, { name: "", url: "", icon: "fa-globe" }]);
  const updateSocialLink = (index: number, field: string, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };
  const removeSocialLink = (index: number) => setSocialLinks(socialLinks.filter((_, i) => i !== index));
  
  const saveProfile = () => {
    if (!username) return;
    localStorage.setItem("lykka-profile", JSON.stringify({ username, displayName: displayName || username, bio, avatar, theme: selectedTheme, socialLinks }));
    router.push(`/${username}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/3 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl space-y-8 relative z-10"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black mb-2">Create Profile</h1>
          <p className="text-sm opacity-50">Customize your link-in-bio</p>
        </div>

        <div className="grid gap-5">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Username</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
              placeholder="yourname"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Display Name</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Bio</label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people about yourself..."
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-60">Avatar URL</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-3 opacity-60">Themes</label>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme, i) => (
                <motion.button
                  key={theme.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedTheme.id === theme.id ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="w-full h-14 rounded-lg mb-2" style={{ background: theme.backgroundColor }} />
                  <span className="text-sm font-medium">{theme.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-3 opacity-60">Social Links</label>
            <div className="space-y-3">
              <AnimatePresence>
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex gap-2"
                  >
                    <select
                      value={link.name}
                      onChange={(e) => {
                        const p = SOCIAL_PLATFORMS.find(p => p.name === e.target.value);
                        updateSocialLink(index, "name", e.target.value);
                        if (p) updateSocialLink(index, "icon", p.icon);
                      }}
                      className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none"
                    >
                      <option value="">Select</option>
                      {SOCIAL_PLATFORMS.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                      placeholder="https://"
                      className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeSocialLink(index)}
                      className="px-4 py-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                    >
                      ×
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addSocialLink}
                className="w-full py-2.5 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-all"
              >
                + Add Link
              </motion.button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveProfile}
            disabled={!username}
            className="w-full py-4 bg-white text-black font-black rounded-xl text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Profile
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}