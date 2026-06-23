"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, GripVertical, Trash2, Star, ExternalLink } from "lucide-react";

export default function LinksPage() {
  const [links, setLinks] = useState<{ id: string; name: string; url: string; icon: string; animation: string; featured: boolean }[]>([
    { id: "1", name: "Twitter", url: "https://twitter.com", icon: "fa-twitter", animation: "glow", featured: true },
    { id: "2", name: "Instagram", url: "https://instagram.com", icon: "fa-instagram", animation: "pulse", featured: true },
    { id: "3", name: "YouTube", url: "https://youtube.com", icon: "fa-youtube", animation: "bounce", featured: false },
    { id: "4", name: "Discord", url: "https://discord.com", icon: "fa-discord", animation: "none", featured: false },
  ]);

  const addLink = () => {
    setLinks(prev => [...prev, { id: Date.now().toString(), name: "", url: "", icon: "fa-globe", animation: "none", featured: false }]);
  };

  const removeLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, featured: !l.featured } : l));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-1">Links</h1>
            <p className="text-sm opacity-60">Drag to reorder • star to feature</p>
          </div>
          <Link href="/customize" className="px-5 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">
            Open Editor
          </Link>
        </div>

        <div className="space-y-2">
          {links.map((link, idx) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
            >
              <GripVertical size={14} className="opacity-40 cursor-grab shrink-0" />

              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white/70">
                <i className={"fab text-sm " + link.icon.replace("fa-", "")} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{link.name || "Untitled"}</div>
                <div className="text-xs opacity-50 truncate">{link.url || "No URL"}</div>
              </div>

              {link.animation !== "none" && (
                <span className="hidden md:inline px-2.5 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-wider shrink-0">
                  {link.animation}
                </span>
              )}

              <button
                onClick={() => toggleFeatured(link.id)}
                className={"p-2 rounded-lg transition-all shrink-0 " + (link.featured ? "text-yellow-400" : "text-white/30 hover:text-white/60")}
                title="Toggle featured"
              >
                <Star size={14} fill={link.featured ? "currentColor" : "none"} />
              </button>

              <button
                onClick={() => removeLink(link.id)}
                className="p-2 text-white/30 hover:text-red-400 rounded-lg transition-all shrink-0"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            onClick={addLink}
            className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-sm text-white/40 hover:text-white hover:border-white/25 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            Add Link
          </motion.button>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-bold text-sm mb-2">Featured Links</h3>
            <p className="text-xs opacity-50 leading-relaxed">Starred links appear first on your public profile with a special highlight badge.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-bold text-sm mb-2">Link Animations</h3>
            <p className="text-xs opacity-50 leading-relaxed">Choose pulse, glow, bounce, or shake per link in the editor. Premium unlocks matrix and custom.</p>
          </div>
        </div>
      </div>
    </div>
  );
}