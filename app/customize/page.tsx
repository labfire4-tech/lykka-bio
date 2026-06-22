"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SOCIAL_PLATFORMS, ThemeConfig, THEMES } from "@/lib/config";

export default function CustomizePage() {
  const router = useRouter();
  const [username, setUsername] = useState("yourname");
  const [displayName, setDisplayName] = useState("YOUR NAME");
  const [bio, setBio] = useState("Your bio here...");
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
    const profileData = {
      username,
      displayName,
      bio,
      avatar,
      theme: selectedTheme,
      socialLinks
    };
    localStorage.setItem("lykka-profile", JSON.stringify(profileData));
    router.push(`/${username}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Customize Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Editor */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none"
                placeholder="yourname"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none"
                placeholder="YOUR NAME"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none resize-none"
                placeholder="Your bio here..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Avatar URL</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <div className="grid grid-cols-2 gap-3">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-4 rounded-lg border transition-all ${selectedTheme.id === theme.id ? 'border-white' : 'border-gray-700'}`}
                  >
                    <div
                      className="w-full h-16 rounded mb-2"
                      style={{ 
                        background: theme.backgroundType === "gradient" ? theme.backgroundColor : theme.backgroundColor 
                      }}
                    />
                    <span className="text-sm">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Social Links</label>
              {socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <select
                    value={link.name}
                    onChange={(e) => {
                      const platform = SOCIAL_PLATFORMS.find(p => p.name === e.target.value);
                      updateSocialLink(index, "name", e.target.value);
                      if (platform) updateSocialLink(index, "icon", platform.icon);
                    }}
                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg"
                  >
                    <option value="">Select Platform</option>
                    {SOCIAL_PLATFORMS.map(p => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg"
                  />
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="px-3 py-2 bg-red-900 rounded-lg hover:bg-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={addSocialLink}
                className="mt-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                + Add Social Link
              </button>
            </div>

            <button
              onClick={saveProfile}
              className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
            >
              Save Profile
            </button>
          </div>

          {/* Right: Preview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Preview</h2>
            <div className="glass-panel p-6 rounded-lg flex flex-col items-center">
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full mb-4" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-700 mb-4" />
              )}
              <h3 className="text-xl font-bold mb-2">{displayName || "YOUR NAME"}</h3>
              <p className="text-sm opacity-70 text-center mb-4">{bio || "Your bio here..."}</p>
              <div className="flex gap-3">
                {socialLinks.map((link, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <i className={`fab ${link.icon.replace("fa-", "")}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}