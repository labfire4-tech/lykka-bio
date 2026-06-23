"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, GripVertical, Trash2, Star, ChevronDown } from "lucide-react";

interface LinkItem { id: string; name: string; url: string; icon: string; animation: string; featured: boolean; }

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([
    { id: "1", name: "Twitter", url: "https://twitter.com", icon: "twitter", animation: "glow", featured: true },
    { id: "2", name: "Instagram", url: "https://instagram.com", icon: "instagram", animation: "pulse", featured: true },
    { id: "3", name: "YouTube", url: "https://youtube.com", icon: "youtube", animation: "bounce", featured: false },
    { id: "4", name: "Discord", url: "https://discord.com", icon: "discord", animation: "none", featured: false },
  ]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const addLink = () => setLinks((p) => [...p, { id: Date.now().toString(), name: "", url: "", icon: "globe", animation: "none", featured: false }]);
  const removeLink = (id: string) => setLinks((p) => p.filter((l) => l.id !== id));
  const toggleFeatured = (id: string) => setLinks((p) => p.map((l) => (l.id === id ? { ...l, featured: !l.featured } : l)));
  const updateLink = (id: string, key: keyof LinkItem, value: string) => setLinks((p) => p.map((l) => (l.id === id ? { ...l, [key]: value } : l)));

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-1">Links</h1>
            <p className="text-sm text-white/40">Drag to reorder • star to feature</p>
          </div>
          <Link href="/customize" className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white font-bold rounded-full text-sm transition-all">
            Open Editor
          </Link>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {links.map((link, idx) => (
              <motion.div key={link.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: idx * 0.05 }} className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:border-white/15 transition-all">
                <div className="flex items-center gap-3 p-4">
                  <GripVertical size={16} className="opacity-25 cursor-grab shrink-0" />
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center shrink-0 text-white/50 text-xs font-bold">{link.name ? link.name[0].toUpperCase() : "?"}</div>
                  <button onClick={() => setExpanded(expanded === link.id ? null : link.id)} className="flex-1 min-w-0 text-left">
                    <div className="font-medium text-sm truncate">{link.name || "Untitled link"}</div>
                    <div className="text-xs text-white/30 truncate">{link.url || "No URL set"}</div>
                  </button>
                  {link.animation !== "none" && <span className="hidden md:inline px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full text-[10px] uppercase tracking-wide">{link.animation}</span>}
                  <button onClick={() => toggleFeatured(link.id)} className={`p-2 rounded-lg transition-all shrink-0 ${link.featured ? "text-yellow-400" : "text-white/20 hover:text-white/50"}`}>
                    <Star size={15} fill={link.featured ? "currentColor" : "none"} />
                  </button>
                  <button onClick={() => removeLink(link.id)} className="p-2 text-white/20 hover:text-red-400 rounded-lg transition-all shrink-0"><Trash2 size={15} /></button>
                  <button onClick={() => setExpanded(expanded === link.id ? null : link.id)} className="p-1 text-white/20 shrink-0"><ChevronDown size={16} className={`transition-transform ${expanded === link.id ? "rotate-180" : ""}`} /></button>
                </div>
                <AnimatePresence>
                  {expanded === link.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/[0.04]">
                      <div className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" value={link.name} onChange={(e) => updateLink(link.id, "name", e.target.value)} className="px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm focus:outline-none focus:border-purple-500/30 transition-colors" placeholder="Link name" />
                          <input type="url" value={link.url} onChange={(e) => updateLink(link.id, "url", e.target.value)} className="px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm focus:outline-none focus:border-purple-500/30 transition-colors" placeholder="https://..." />
                        </div>
                        <select value={link.animation} onChange={(e) => updateLink(link.id, "animation", e.target.value)} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm focus:outline-none focus:border-purple-500/30 appearance-none transition-colors">
                          <option value="none">None</option><option value="glow">Glow</option><option value="pulse">Pulse</option><option value="bounce">Bounce</option><option value="shake">Shake</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.button whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }} onClick={addLink} className="w-full py-4 border-2 border-dashed border-white/[0.08] rounded-2xl text-sm text-white/30 hover:text-white/60 hover:border-purple-500/30 transition-all flex items-center justify-center gap-2">
            <Plus size={16} /> Add Link
          </motion.button>
        </div>
      </div>
    </div>
  );
}
