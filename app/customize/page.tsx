"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SOCIAL_PLATFORMS, ThemeConfig, THEMES } from "../lib/config";

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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Create Your Profile</h1>
        <p className="text-center opacity-60 mb-10">Fill in your details below</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white focus:outline-none transition"
              placeholder="yourname"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white focus:outline-none transition"
              placeholder="Your Display Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white focus:outline-none resize-none transition"
              placeholder="Tell people about yourself..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Avatar URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white focus:outline-none transition"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 opacity-80">Theme</label>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-4 rounded-xl border transition-all ${
                    selectedTheme.id === theme.id ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div
                    className="w-full h-16 rounded-lg mb-2"
                    style={{ 
                      background: theme.backgroundType === "gradient" 
                        ? theme.backgroundColor 
                        : theme.backgroundColor 
                    }}
                  />
                  <span className="text-sm block">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 opacity-80">Social Links</label>
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    value={link.name}
                    onChange={(e) => {
                      const platform = SOCIAL_PLATFORMS.find(p => p.name === e.target.value);
                      updateSocialLink(index, "name", e.target.value);
                      if (platform) updateSocialLink(index, "icon", platform.icon);
                    }}
                    className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-white transition"
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
                    placeholder="https://..."
                    className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-white transition"
                  />
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="px-4 py-2.5 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={addSocialLink}
                className="w-full py-2.5 border border-white/20 rounded-lg hover:bg-white/5 transition"
              >
                + Add Social Link
              </button>
            </div>
          </div>

          <button
            onClick={saveProfile}
            disabled={!username}
            className="w-full py-3.5 bg-white text-black font-bold rounded-lg text-lg uppercase tracking-wider hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
}