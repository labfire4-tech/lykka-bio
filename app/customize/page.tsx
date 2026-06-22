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

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { name: "", url: "", icon: "fa-globe" }]);
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const saveProfile = () => {
    if (!username) return;
    const profileData = {
      username,
      displayName: displayName || username,
      bio,
      avatar,
      theme: selectedTheme,
      socialLinks
    };
    localStorage.setItem("lykka-profile", JSON.stringify(profileData));
    router.push(`/${username}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-black mb-2">Create Your Profile</h1>
          <p className="text-sm opacity-50">Fill in your details below</p>
        </div>

        <div className="grid gap-6">
          <div>
            <label className="block text-xs font-medium mb-2 opacity-70 uppercase tracking-wider">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all"
              placeholder="yourname"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 opacity-70 uppercase tracking-wider">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all"
              placeholder="Your Display Name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 opacity-70 uppercase tracking-wider">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all resize-none"
              placeholder="Tell people about yourself..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-2 opacity-70 uppercase tracking-wider">Avatar URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-3 opacity-70 uppercase tracking-wider">Theme</label>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme, i) => (
                <motion.button
                  key={theme.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedTheme.id === theme.id 
                      ? 'border-white bg-white/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="w-full h-14 rounded-lg mb-2" style={{ background: theme.backgroundColor }} />
                  <span className="text-sm font-medium">{theme.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-3 opacity-70 uppercase tracking-wider">Social Links</label>
            <div className="space-y-3">
              <AnimatePresence>
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-2"
                  >
                    <select
                      value={link.name}
                      onChange={(e) => {
                        const platform = SOCIAL_PLATFORMS.find(p => p.name === e.target.value);
                        updateSocialLink(index, "name", e.target.value);
                        if (platform) updateSocialLink(index, "icon", platform.icon);
                      }}
                      className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none transition-all"
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
                      className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none transition-all"
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
                + Add Social Link
              </motion.button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveProfile}
            disabled={!username}
            className="w-full py-4 bg-white text-black font-black rounded-xl text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Profile
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}