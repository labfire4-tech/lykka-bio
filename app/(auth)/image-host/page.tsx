"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, Trash2, ExternalLink, Copy, Check, Film } from "lucide-react";

const initialImages = [
  { id: 1, name: "banner.png", size: "2.4 MB", type: "image", date: "2 days ago", url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200" },
  { id: 2, name: "avatar.jpg", size: "856 KB", type: "image", date: "1 week ago", url: "https://i.pravatar.cc/200" },
  { id: 3, name: "background.gif", size: "5.1 MB", type: "image", date: "2 weeks ago", url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200" },
  { id: 4, name: "intro.mp4", size: "12.3 MB", type: "video", date: "3 weeks ago", url: "" },
];

export default function ImageHostPage() {
  const [images, setImages] = useState(initialImages);
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleCopy = (id: number, url: string) => {
    navigator.clipboard?.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-1">Image Host</h1>
            <p className="text-sm text-white/40">Upload and manage your images</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:brightness-110 text-white font-bold rounded-full text-sm transition-all shadow-lg shadow-purple-900/30">
            <Upload size={16} /> Upload
          </button>
        </div>

        <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); }} className={`border-2 border-dashed rounded-2xl p-12 text-center mb-6 transition-all ${dragOver ? "border-purple-500/50 bg-purple-500/5" : "border-white/[0.08] hover:border-purple-500/30"}`}>
          <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center mx-auto mb-4">
            <Upload size={26} className="text-purple-400" />
          </div>
          <p className="text-sm font-medium text-white/60">Drag & drop files here</p>
          <p className="text-xs text-white/30 mt-1">or click to browse — PNG, JPG, GIF, MP4 up to 25MB</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-white/30">{images.length} files</p>
          <div className="flex gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <button onClick={() => setView("grid")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${view === "grid" ? "bg-purple-600 text-white" : "text-white/40"}`}>Grid</button>
            <button onClick={() => setView("list")} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${view === "list" ? "bg-purple-600 text-white" : "text-white/40"}`}>List</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="group rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:border-white/15 transition-all">
                  <div className="aspect-square bg-white/[0.02] relative overflow-hidden">
                    {img.url ? <img src={img.url} alt={img.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">{img.type === "video" ? <Film size={28} className="text-white/20" /> : <ImageIcon size={28} className="text-white/20" />}</div>}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => handleCopy(img.id, img.url)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">{copied === img.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}</button>
                      <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"><ExternalLink size={14} /></button>
                      <button onClick={() => setImages(images.filter((x) => x.id !== img.id))} className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition-all"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <div className="p-3"><p className="text-xs font-medium truncate">{img.name}</p><p className="text-[10px] text-white/30">{img.size}</p></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {images.map((img, i) => (
                <motion.div key={img.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-white/[0.03] overflow-hidden shrink-0">{img.url ? <img src={img.url} alt={img.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">{img.type === "video" ? <Film size={18} className="text-white/20" /> : <ImageIcon size={18} className="text-white/20" />}</div>}</div>
                  <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{img.name}</div><div className="text-xs text-white/30">{img.size} • {img.date}</div></div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleCopy(img.id, img.url)} className="p-2 hover:bg-white/[0.05] rounded-lg transition-all">{copied === img.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-white/40" />}</button>
                    <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-all"><ExternalLink size={14} className="text-white/40" /></button>
                    <button onClick={() => setImages(images.filter((x) => x.id !== img.id))} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-all"><Trash2 size={14} /></button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
