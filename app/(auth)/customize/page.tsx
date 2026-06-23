"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  Palette,
  Link2,
  Crown,
  Image,
  Settings2,
  Volume2,
  MousePointer2,
  Star,
  MapPin,
  Zap,
  ChevronDown,
  Upload,
  X,
  ExternalLink,
  Share2,
  Search,
} from "lucide-react";

type Tab = "general" | "profile" | "links" | "premium";

interface ProfileState {
  description: string;
  discordPresence: boolean;
  profileOpacity: number;
  profileBlur: number;
  backgroundEffect: string;
  usernameEffect: string;
  location: string;
  bgImage: string;
  customCursor: string;
  profileImage: string;
  glowUsername: boolean;
  glowSocials: boolean;
}

const initialState: ProfileState = {
  description: "I love my gf sm",
  discordPresence: true,
  profileOpacity: 50,
  profileBlur: 20,
  backgroundEffect: "None",
  usernameEffect: "off",
  location: "None",
  bgImage: "",
  customCursor: "",
  profileImage: "",
  glowUsername: false,
  glowSocials: false,
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
    if (saved) {
      try { setP({ ...initialState, ...JSON.parse(saved) }); } catch {}
    }
    const u = localStorage.getItem("lykka-user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const tabs = [
    { id: "general" as Tab, icon: User, label: "General" },
    { id: "profile" as Tab, icon: Palette, label: "Profile" },
    { id: "links" as Tab, icon: Link2, label: "Links" },
    { id: "premium" as Tab, icon: Crown, label: "Premium" },
  ];

  const SliderTrack = ({ value, max = 100 }: { value: number; max?: number }) => (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/10 p-5 hidden md:flex flex-col shrink-0">
        <div className="mb-8">
          <h2 className="text-lg font-black">LYKKA<span className="text-purple-500">.</span></h2>
        </div>

        <div className="relative mb-4">
          <Search size="14" className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search features..."
            className="w-full pl-9 pr-7 py-2 bg-white/5 border border-white/10 rounded-xl text-xs placeholder:text-white/30 focus:outline-none"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-white/25 border border-white/10 rounded px-1 py-0.5">⌘K</span>
        </div>

        <nav className="space-y-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all " +
                (activeTab === tab.id ? "bg-purple-700 text-white" : "text-white/55 hover:text-white/85 hover:bg-white/[0.03]")
              }
            >
              <tab.icon size="16" />
              <span className="flex-1">{tab.label}</span>
              {tab.id === "general" && (
                <ChevronDown
                  size="14"
                  className={
                    activeTab === tab.id
                      ? "rotate-180 text-white/60"
                      : "text-white/30"
                  }
                />
              )}
            </button>
          ))}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/55 hover:text-white/85 hover:bg-white/[0.03] transition-all mt-2">
            <Image size="16" />
            Templates
            <span className="ml-auto text-[10px] bg-purple-700 px-1.5 py-0.5 rounded-full">NEW</span>
          </button>
        </nav>

        <div className="mt-auto space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-purple-700/20 text-purple-400 text-sm font-medium hover:bg-purple-700/30 transition-all"
          >
            <ExternalLink size="14" />
            My Page
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-purple-900 text-white text-sm font-bold hover:brightness-110 transition-all">
            <Share2Icon />
            Share Your Profile
          </button>
        </div>
      </aside>

      {/* Mobile tabs */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-black/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between p-3">
          <h2 className="text-base font-black">LYKKA<span className="text-purple-500">.</span></h2>
        </div>
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all " +
                (activeTab === tab.id ? "bg-purple-700 text-white" : "bg-white/5 text-white/60")
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main editor */}
      <main className="flex-1 overflow-y-auto pt-20 md:pt-0">
        <div className="p-4 md:p-8 max-w-3xl space-y-10 pb-32">
          {/* Assets Uploader */}
          <section>
            <h3 className="text-lg font-bold mb-4">Assets Uploader</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Background", active: !!p.bgImage, img: p.bgImage, set: (v: string) => update({ bgImage: v }) },
                { name: "Audio", active: false, set: () => {} },
                { name: "Profile Avatar", active: !!p.profileImage, img: p.profileImage, set: (v: string) => update({ profileImage: v }) },
                { name: "Custom Cursor", active: !!p.customCursor, img: p.customCursor, set: (v: string) => update({ customCursor: v }) },
              ].map((asset) => (
                <div key={asset.name} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden group hover:border-white/20 transition-all">
                  <div
                    onClick={() => {
                      if (asset.name === "Background" && !asset.active) update({ bgImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800" });
                      else if (asset.name === "Profile Avatar" && !asset.active) update({ profileImage: "https://i.pravatar.cc/200" });
                      else if (asset.name === "Custom Cursor" && !asset.active) update({ customCursor: "https://www.cursor.cc/cursor/139_1.png" });
                      else asset.set("");
                    }}
                    className="aspect-video bg-white/[0.03] flex items-center justify-center cursor-pointer relative overflow-hidden"
                  >
                    {asset.active && asset.img ? (
                      <img src={asset.img} alt={asset.name} className="w-full h-full object-cover" />
                    ) : (
                      <Upload size="18" className="text-white/25" />
                    )}
                    {asset.active && (
                      <button
                        onClick={(e) => { e.stopPropagation(); asset.set(""); }}
                        className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size="10" />
                      </button>
                    )}
                  </div>
                  <div className="px-3 py-2.5 text-xs text-white/60 border-t border-white/5">{asset.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Premium banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-gradient-to-r from-purple-900/50 via-purple-800/40 to-purple-900/50 border border-purple-500/30 p-5 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">🔫</div>
              <div>
                <h3 className="font-bold text-sm">Want exclusive features?</h3>
                <p className="text-xs text-white/50 mt-0.5">Unlock more with <span className="text-purple-400 font-bold">Premium</span></p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-5 py-2.5 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-xl transition-colors">
                Upgrade Now
              </button>
              <button className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* General Customization */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold">General Customization</h3>

            {/* Description */}
            <div>
              <label className="text-xs text-white/60 mb-2 block">Description</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm font-serif">A</span>
                <input
                  type="text"
                  value={p.description}
                  onChange={(e) => update({ description: e.target.value })}
                  className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/40 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Discord */}
              <div>
                <label className="text-xs text-white/60 mb-2 block">Discord Presence</label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5">
                  <div className="flex items-center gap-2.5 px-3 py-2 flex-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/70"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                    <span className="text-xs text-white/80 font-medium">Discord</span>
                  </div>
                  <span className="px-3 py-2 text-xs text-white/50">{p.discordPresence ? "Enabled" : "Disabled"}</span>
                  <div className="flex items-center gap-1 pr-2">
                    <button
                      onClick={() => update({ discordPresence: !p.discordPresence })}
                      className={"w-9 h-5 rounded-full relative transition-colors " + (p.discordPresence ? "bg-purple-600" : "bg-white/15")}
                    >
                      <div
                        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all"
                        style={p.discordPresence ? { right: "2px" } : { left: "2px" }}
                      />
                    </button>
                    <button className="p-1 text-white/40 hover:text-white/70 transition-colors">
                      <Settings2 size="14" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-xs text-white/60 mb-2 block">Location</label>
                <div className="relative">
                  <select
                    value={p.location}
                    onChange={(e) => update({ location: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white/80 focus:outline-none focus:border-purple-500/40 appearance-none transition-all"
                  >
                    <option value="None">None</option>
                    <option value="Paris, FR">Paris, FR</option>
                    <option value="London, UK">London, UK</option>
                    <option value="New York, US">New York, US</option>
                  </select>
                  <ChevronDown size="14" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Opacity & Blur */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-white/60 mb-3 flex items-center gap-2">
                  Profile Opacity
                  <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/50">?</span>
                </label>
                <SliderTrack value={p.profileOpacity} />
                <div className="flex justify-between mt-2 text-[11px] text-white/35">
                  <span>20%</span><span>50%</span><span>80%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={p.profileOpacity}
                  onChange={(e) => update({ profileOpacity: Number(e.target.value) })}
                  className="w-full mt-2 opacity-0 absolute"
                />
                <div
                  className="h-1.5 bg-purple-500 rounded-full mt-[-14px] cursor-pointer"
                  style={{ width: `${p.profileOpacity}%`, pointerEvents: "auto" }}
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                    if (!rect) return;
                    const handleMove = (ev: MouseEvent) => {
                      const x = Math.max(0, Math.min(ev.clientX - rect.left, rect.width));
                      update({ profileOpacity: Math.round((x / rect.width) * 100) });
                    };
                    const handleUp = () => {
                      document.removeEventListener("mousemove", handleMove);
                      document.removeEventListener("mouseup", handleUp);
                    };
                    document.addEventListener("mousemove", handleMove);
                    document.addEventListener("mouseup", handleUp);
                  }}
                />
              </div>

              <div>
                <label className="text-xs text-white/60 mb-3 flex items-center gap-2">
                  Profile Blur
                  <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/50">?</span>
                </label>
                <SliderTrack value={p.profileBlur} />
                <div className="flex justify-between mt-2 text-[11px] text-white/35">
                  <span>20px</span><span>50px</span><span>80px</span>
                </div>
              </div>
            </div>

            {/* Background Effects */}
            <div>
              <label className="text-xs text-white/60 mb-2 block">Background Effects</label>
              <div className="relative">
                <select
                  value={p.backgroundEffect}
                  onChange={(e) => update({ backgroundEffect: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white/80 focus:outline-none focus:border-purple-500/40 appearance-none transition-all"
                >
                  <option value="None">None</option>
                  <option value="rain">Rain</option>
                  <option value="snow">Snow</option>
                  <option value="hearts">Hearts</option>
                  <option value="matrix">Matrix</option>
                </select>
                <ChevronDown size="14" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              </div>
            </div>

            {/* Username Effects */}
            <div>
              <label className="text-xs text-white/60 mb-2 block">Username Effects</label>
              <button className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white/80 hover:border-white/20 transition-all w-full">
                <Star size="14" className="text-purple-400" />
                Username Effects
                <ChevronDown size="14" className="ml-auto text-white/30" />
              </button>
            </div>

            {/* Glow Settings */}
            <div>
              <label className="text-xs text-white/60 mb-2 block">Glow Settings</label>
              <div className="flex gap-3">
                {(["username", "socials"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => update({ [key === "username" ? "glowUsername" : "glowSocials"]: !p[key === "username" ? "glowUsername" : "glowSocials"] })}
                    className={
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all " +
                      (key === "username" && p.glowUsername || key === "socials" && p.glowSocials
                        ? "bg-purple-700 text-white"
                        : "bg-white/6 text-white/50 hover:bg-white/10")
                    }
                    style={key === "username" && p.glowUsername || key === "socials" && p.glowSocials ? {} : { backgroundColor: "rgba(255,255,255,0.06)" }}
                  >
                    <Star size="12" />
                    {key === "username" ? "Username" : "Socials"}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Save button (mobile) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur border-t border-white/10 z-20">
          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full py-4 bg-purple-700 hover:bg-purple-600 disabled:bg-purple-900/50 text-white font-bold rounded-2xl transition-all"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Live phone preview */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-20"
            >
              <div className="relative">
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute -top-3 -right-3 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/60 transition-all z-10"
                >
                  <X size="12" />
                </button>

                <div className="w-[260px] bg-[#0a0a0a] rounded-[2.5rem] border-4 border-[#1a1a1a] shadow-2xl overflow-hidden">
                  <div className="flex justify-center pt-3 pb-1">
                    <div className="w-20 h-5 bg-black rounded-full" />
                  </div>

                  <div className="px-5 pt-4 pb-6 text-center relative">
                    {p.bgImage && (
                      <div className="absolute inset-0 opacity-30">
                        <img src={p.bgImage} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="relative">
                      <div
                        className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-purple-500 overflow-hidden bg-purple-700 flex items-center justify-center text-3xl"
                        style={{
                          filter: `blur(${p.profileBlur / 10}px)`,
                          opacity: p.profileOpacity / 100,
                          backgroundImage: p.profileImage ? `url(${p.profileImage})` : undefined,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {!p.profileImage && "🔥"}
                      </div>
                      <h3 className="font-black text-sm text-purple-400">@{user?.username || "gamer"}</h3>
                      <p className="text-[11px] text-white/50 mt-1 px-4">{p.description}</p>
                      {p.location !== "None" && (
                        <div className="flex items-center justify-center gap-1 mt-1.5 text-[10px] text-white/40">
                          <MapPin size="10" />
                          {p.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-4 space-y-2 pb-6">
                    {[
                      { name: "Twitter / X", bg: "bg-white/90", text: "text-black" },
                      { name: "Instagram", bg: "bg-white/90", text: "text-black" },
                      { name: "YouTube", bg: "bg-white/90", text: "text-black" },
                    ].map((link) => (
                      <div
                        key={link.name}
                        className={"py-3 rounded-xl text-center text-xs font-bold " + link.bg + " " + link.text}
                      >
                        {link.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showPreview && (
          <button
            onClick={() => setShowPreview(true)}
            className="hidden lg:flex fixed right-6 bottom-6 z-20 px-4 py-2.5 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all items-center gap-2"
          >
            <SlidersHorizontalIcon />
            Show Preview
          </button>
        )}
      </main>
    </div>
  );
}

function ExternalLinkIcon(props: any) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function Share2Icon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function SlidersHorizontalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}
