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
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-black mb-2 text-center tracking-tight"
        >
          Create Your Profile
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center opacity-50 mb-12 text-sm"
        >
          Fill in your details below
        </motion.p>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label className="block text-xs font-medium mb-2 opacity-70 uppercase tracking-wider">Username</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all"
              placeholder="yourname"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="block text-xs font-medium mb-2 opacity-70 uppercase tracking-wider">Display Name</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all"
              placeholder="Your Display Name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-xs font-medium mb-2 opacity-70 uppercase tracking-wider">Bio</label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all resize-none"
              placeholder="Tell people about yourself..."
              rows={3}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-xs font-medium mb-2 opacity-70 uppercase tracking-wider">Avatar URL</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all"
              placeholder="https://..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block text-xs font-medium mb-3 opacity-70 uppercase tracking-wider">Theme</label>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme, i) => (
                <motion.button
                  key={theme.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedTheme.id === theme.id 
                      ? 'border-white bg-white/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className="w-full h-14 rounded-lg mb-2"
                    style={{ background: theme.backgroundColor }}
                  />
                  <span className="text-sm font-medium">{theme.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
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
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(239,68,68,0.3)" }}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={saveProfile}
              disabled={!username}
              className="w-full py-4 bg-white text-black font-black rounded-xl text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Profile
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}