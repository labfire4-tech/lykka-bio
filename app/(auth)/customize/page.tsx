"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User, Palette, Link2, Crown, Image as ImageIcon, Settings as SettingsIcon,
  ChevronDown, Upload, X, ExternalLink, Share2, Search, HelpCircle,
  Sparkles, Star, MapPin, Music, Type,
} from "lucide-react";

type Tab = "general" | "profile" | "links" | "premium";

interface ProfileState {
  description: string; discordPresence: boolean; profileOpacity: number; profileBlur: number;
  backgroundEffect: string; usernameEffect: string; location: string; bgImage: string;
  customCursor: string; profileImage: string; glowUsername: boolean; glowSocials: boolean; audio: string;
}

const initialState: ProfileState = {
  description: "Digital creator • Gamer • Streamer", discordPresence: true,
  profileOpacity: 50, profileBlur: 20, backgroundEffect: "None", usernameEffect: "off",
  location: "None", bgImage: "", customCursor: "", profileImage: "",
  glowUsername: false, glowSocials: false, audio: "",
};

export default function CustomizePage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [showPreview, setShowPreview] = useState(true);
  const [p, setP] = useState<ProfileState>(initialState);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);

  const update = (patch: Partial<ProfileState>) => setP(prev => ({ ...prev, ...patch }));
  const saveProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    localStorage.setItem("lykka-profile", JSON.stringify(p));
    setSaving(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem("lykka-profile");
    if (saved) { try { setP({ ...initialState, ...JSON.parse(saved) }); } catch {} }
    const u = localStorage.getItem("lykka-user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const navItems = [
    { id: "general" as Tab, icon: User, label: "General" },
    { id: "profile" as Tab, icon: Palette, label: "Profile" },
    { id: "links" as Tab, icon: Link2, label: "Links" },
    { id: "premium" as Tab, icon: Crown, label: "Premium" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      {/* Sidebar */}
      <aside className="w-[260px] border-r border-white/[0.06] p-4 hidden md:flex flex-col shrink-0 bg-[#0c0c12]">
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <h2 className="text-base font-black">LYKKA<span className="text-purple-500">.</span></h2>
          </div>
        </div>

        <div className="relative mb-5">
          <Search size="14" className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" placeholder="Search features..." className="w-full pl-9 pr-12 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs placeholder:text-white/25 focus:outline-none focus:border-purple-500/30 transition-colors" />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-white/25 border border-white/10 rounded px-1.5 py-0.5">Ctrl K</span>
        </div>

        <nav className="space-y-1 relative">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={"relative w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-all " + (activeTab === item.id ? "text-white" : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]")}>
              {activeTab === item.id && (
                <motion.div layoutId="nav-active" className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-700 to-purple-600 shadow-lg shadow-purple-900/30" transition={{ type: "spring", stiffness: 300, damping: 25 }} />
              )}
              <item.icon size="16" className="relative z-10" />
              <span className="relative z-10 flex-1 text-left">{item.label}</span>
              {item.id === "general" && <ChevronDown size="14" className={"relative z-10 transition-transform " + (activeTab === item.id ? "rotate-180" : "")} />}
            </button>
          ))}
          <Link href="/image-host" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.03] transition-all">
            <ImageIcon size="16" /><span className="flex-1 text-left">Image Host</span>
          </Link>
          <Link href="/templates" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.03] transition-all">
            <Sparkles size="16" /><span className="flex-1 text-left">Templates</span><span className="text-[9px] bg-purple-600 px-1.5 py-0.5 rounded-full font-bold">NEW</span>
          </Link>
        </nav>

        <div className="mt-auto space-y-2 pt-4">
          <Link href="/help" className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-indigo-900/40 border border-indigo-500/20 text-indigo-300 text-sm font-medium hover:bg-indigo-900/60 transition-all">
            <HelpCircle size="16" /> Help Center
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-700 to-purple-600 text-white text-sm font-medium hover:brightness-110 transition-all">
            <ExternalLink size="16" /> My Page
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-700 to-purple-600 text-white text-sm font-medium hover:brightness-110 transition-all">
            <Share2 size="16" /> Share Profile
          </button>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-[#0c0c12]/95 backdrop-blur border-b border-white/[0.06]">
        <div className="p-3"><h2 className="text-base font-black">LYKKA<span className="text-purple-500">.</span></h2></div>
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={"px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all " + (activeTab === item.id ? "bg-gradient-to-r from-purple-700 to-purple-600 text-white" : "bg-white/5 text-white/50")}>{item.label}</button>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 overflow-y-auto pt-20 md:pt-0">
        <div className="p-4 md:p-8 max-w-3xl space-y-10 pb-32">
          {/* Assets */}
          <section>
            <h3 className="text-lg font-bold mb-4">Assets Uploader</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Background", active: !!p.bgImage, img: p.bgImage, set: (v: string) => update({ bgImage: v }) },
                { name: "Audio", active: !!p.audio, img: p.audio, set: (v: string) => update({ audio: v }) },
                { name: "Profile Avatar", active: !!p.profileImage, img: p.profileImage, set: (v: string) => update({ profileImage: v }) },
                { name: "Custom Cursor", active: !!p.customCursor, img: p.customCursor, set: (v: string) => update({ customCursor: v }) },
              ].map((asset) => (
                <motion.div key={asset.name} whileHover={{ y: -4 }} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden group hover:border-purple-500/30 transition-all">
                  <div onClick={() => {
                    if (asset.name === "Background" && !asset.active) update({ bgImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800" });
                    else if (asset.name === "Profile Avatar" && !asset.active) update({ profileImage: "https://i.pravatar.cc/200" });
                    else if (asset.name === "Custom Cursor" && !asset.active) update({ customCursor: "https://www.cursor.cc/cursor/139_1.png" });
                    else if (asset.name === "Audio" && !asset.active) update({ audio: "track.mp3" });
                    else asset.set("");
                  }} className="aspect-video bg-white/[0.02] flex items-center justify-center cursor-pointer relative overflow-hidden">
                    {asset.active && asset.img ? <img src={asset.img} alt={asset.name} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center gap-1.5">{asset.name === "Audio" ? <Music size="18" className="text-white/20" /> : <Upload size="18" className="text-white/20" />}</div>}
                    {asset.active && (<>
                      <span className="absolute top-2 left-2 text-[9px] font-bold bg-black/60 backdrop-blur text-white/70 px-1.5 py-0.5 rounded">{asset.name === "Audio" ? ".MP3" : asset.name === "Custom Cursor" ? ".PNG" : ".JPG"}</span>
                      <button onClick={(e) => { e.stopPropagation(); asset.set(""); }} className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size="10" /></button>
                    </>)}
                    {!asset.active && <span className="absolute bottom-2 right-2 text-white/15 group-hover:text-white/30 transition-colors"><Upload size="12" /></span>}
                  </div>
                  <div className="px-3 py-2.5 text-xs text-white/50 border-t border-white/[0.04]">{asset.name}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Premium banner with shimmer */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700/60 via-purple-800/50 to-purple-700/60" />
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", transform: "translateX(-100%)", animation: "shimmerSweep 3s ease-in-out infinite" }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-end opacity-10 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 24 24" className="w-32 h-32 fill-white -mr-4"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <div className="relative p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">💎</div>
                <div><h3 className="font-bold text-sm">Want exclusive features?</h3><p className="text-xs text-white/60 mt-0.5">Unlock more with <span className="text-white font-bold">Premium</span></p></div>
              </div>
              <div className="flex gap-2">
                <Link href="/premium" className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-full transition-colors backdrop-blur">Upgrade Now</Link>
                <Link href="/premium" className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-full transition-colors backdrop-blur">Learn More</Link>
              </div>
            </div>
          </motion.div>

          {/* General customization with animated tab content */}
          <AnimatePresence mode="wait">
            <motion.section
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold">General Customization</h3>

              {/* Description */}
              <div>
                <label className="text-xs text-white/50 mb-2 block">Description</label>
                <div className="relative">
                  <Type size="14" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="text" value={p.description} onChange={(e) => update({ description: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm focus:outline-none focus:border-purple-500/30 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Discord presence */}
                <div>
                  <label className="text-xs text-white/50 mb-2 block">Discord Presence</label>
                  <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-xl p-1.5">
                    <div className="flex items-center gap-2.5 px-3 py-2 flex-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/60"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                      <span className="text-xs text-white/70 font-medium">Discord</span>
                    </div>
                    <span className="px-3 py-2 text-xs text-white/40">{p.discordPresence ? "Enabled" : "Disabled"}</span>
                    <div className="flex items-center gap-1 pr-2">
                      <button onClick={() => update({ discordPresence: !p.discordPresence })} className={"w-9 h-5 rounded-full relative transition-colors " + (p.discordPresence ? "bg-green-600" : "bg-white/15")}>
                        <motion.div className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow" animate={{ left: p.discordPresence ? "22px" : "2px" }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                      </button>
                      <button className="p-1 text-white/30 hover:text-white/60 transition-colors"><SettingsIcon size="14" /></button>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-xs text-white/50 mb-2 block">Location</label>
                  <div className="relative">
                    <MapPin size="14" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <select value={p.location} onChange={(e) => update({ location: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/70 focus:outline-none focus:border-purple-500/30 appearance-none transition-colors">
                      <option value="None">None</option><option value="Paris, FR">Paris, FR</option><option value="London, UK">London, UK</option><option value="New York, US">New York, US</option><option value="Tokyo, JP">Tokyo, JP</option>
                    </select>
                    <ChevronDown size="14" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Sliders with glow */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Profile Opacity", value: p.profileOpacity, key: "profileOpacity" as const, marks: ["20%", "50%", "80%"] },
                  { label: "Profile Blur", value: p.profileBlur, key: "profileBlur" as const, marks: ["20px", "50px", "80px"] },
                ].map((slider) => (
                  <div key={slider.label}>
                    <label className="text-xs text-white/50 mb-3 flex items-center gap-2">
                      {slider.label}
                      <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center"><span className="text-[9px] text-white/40">?</span></span>
                    </label>
                    <div className="relative h-8 flex items-center group">
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" style={{ width: `${slider.value}%`, boxShadow: "0 0 10px rgba(168,85,247,0.5)" }} />
                      </div>
                      <input type="range" min={0} max={100} value={slider.value} onChange={(e) => update({ [slider.key]: Number(e.target.value) })} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
                      <motion.div className="absolute w-4 h-4 bg-white rounded-full shadow pointer-events-none" animate={{ left: `calc(${slider.value}% - 8px)` }} transition={{ type: "spring", stiffness: 500, damping: 30 }} style={{ boxShadow: "0 0 8px rgba(168,85,247,0.4)" }} />
                    </div>
                    <div className="flex justify-between mt-1.5 text-[10px] text-white/25">{slider.marks.map(m => <span key={m}>{m}</span>)}</div>
                  </div>
                ))}
              </div>

              {/* Background effects */}
              <div>
                <label className="text-xs text-white/50 mb-2 block">Background Effects</label>
                <div className="relative">
                  <select value={p.backgroundEffect} onChange={(e) => update({ backgroundEffect: e.target.value })} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white/70 focus:outline-none focus:border-purple-500/30 appearance-none transition-colors">
                    <option value="None">None</option><option value="Blurred Background">Blurred Background</option><option value="rain">Rain</option><option value="snow">Snow</option><option value="hearts">Hearts</option><option value="matrix">Matrix</option><option value="stars">Stars</option>
                  </select>
                  <ChevronDown size="14" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>

              {/* Glow settings with spring bounce */}
              <div>
                <label className="text-xs text-white/50 mb-2 block">Glow Settings</label>
                <div className="flex gap-3">
                  {([
                    { label: "Username", key: "glowUsername" as const, active: p.glowUsername },
                    { label: "Socials", key: "glowSocials" as const, active: p.glowSocials },
                  ]).map((toggle) => (
                    <motion.button
                      key={toggle.label}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => update({ [toggle.key]: !toggle.active })}
                      className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all " + (toggle.active ? "bg-green-600 text-white" : "bg-white/[0.03] text-white/40 hover:bg-white/[0.06] border border-white/[0.06]")}
                    >
                      <Sparkles size={12} />{toggle.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>

        {/* Mobile save */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0f]/90 backdrop-blur border-t border-white/[0.06] z-20">
          <button onClick={saveProfile} disabled={saving} className="w-full py-3.5 bg-gradient-to-r from-purple-700 to-purple-600 hover:brightness-110 disabled:opacity-50 text-white font-bold rounded-full transition-all">{saving ? "Saving..." : "Save Changes"}</button>
        </div>

        {/* Live phone preview */}
        <AnimatePresence>
          {showPreview && (
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <button onClick={() => setShowPreview(false)} className="absolute -top-3 -right-3 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/60 transition-all z-10"><X size="12" /></button>
                <div className="w-[260px] bg-[#0a0a0a] rounded-[2.5rem] border-4 border-[#1a1a1a] shadow-2xl overflow-hidden">
                  <div className="flex justify-center pt-3 pb-1"><div className="w-20 h-5 bg-black rounded-full" /></div>
                  <div className="px-5 pt-4 pb-6 text-center relative">
                    {p.bgImage && <div className="absolute inset-0 opacity-30"><img src={p.bgImage} alt="" className="w-full h-full object-cover" /></div>}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-purple-500/30 overflow-hidden bg-purple-700 flex items-center justify-center text-3xl" style={{ filter: `blur(${p.profileBlur / 10}px)`, opacity: p.profileOpacity / 100, backgroundImage: p.profileImage ? `url(${p.profileImage})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }}>{!p.profileImage && "🔥"}</div>
                      <h3 className={"font-black text-sm " + (p.glowUsername ? "text-purple-400" : "text-white")} style={p.glowUsername ? { textShadow: "0 0 10px rgba(168,85,247,0.6)" } : {}}>@{user?.username || "gamer"}</h3>
                      <p className="text-[11px] text-white/50 mt-1 px-4">{p.description}</p>
                      {p.location !== "None" && <div className="flex items-center justify-center gap-1 mt-1.5 text-[10px] text-white/40"><MapPin size="10" />{p.location}</div>}
                    </div>
                  </div>
                  <div className="px-4 space-y-2 pb-6">
                    {[{ name: "Twitter / X", color: "#1da1f2" }, { name: "Instagram", color: "#e4405f" }, { name: "YouTube", color: "#ff0000" }].map((link) => (
                      <div key={link.name} className={"py-3 rounded-xl text-center text-xs font-bold transition-all " + (p.glowSocials ? "" : "bg-white/90 text-black")} style={p.glowSocials ? { backgroundColor: `${link.color}15`, color: link.color, border: `1px solid ${link.color}30`, boxShadow: `0 0 12px ${link.color}30` } : {}}>{link.name}</div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showPreview && <button onClick={() => setShowPreview(true)} className="hidden lg:flex fixed right-6 bottom-6 z-20 px-4 py-2.5 bg-gradient-to-r from-purple-700 to-purple-600 hover:brightness-110 text-white text-xs font-bold rounded-full shadow-lg transition-all">Show Preview</button>}
      </main>
    </div>
  );
}
