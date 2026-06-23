"use client";

import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, Trash2, ExternalLink } from "lucide-react";

export default function ImageHostPage() {
  const images = [
    { id: 1, name: "banner.png", size: "2.4 MB", date: "2 days ago" },
    { id: 2, name: "avatar.jpg", size: "856 KB", date: "1 week ago" },
    { id: 3, name: "background.gif", size: "5.1 MB", date: "2 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Image Host</h1>
            <p className="text-sm opacity-60">Upload and manage your images</p>
          </div>
          <button className="px-6 py-2.5 bg-purple-600 text-white font-bold rounded-xl text-sm hover:bg-purple-500 flex items-center gap-2">
            <Upload size={16} />
            Upload Image
          </button>
        </div>

        <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center mb-8 hover:border-purple-500/30 transition-all">
          <Upload size={32} className="mx-auto mb-3 text-white/30" />
          <p className="text-sm text-white/60">Drag & drop files here, or click to browse</p>
          <p className="text-xs text-white/40 mt-1">PNG, JPG, GIF up to 10MB</p>
        </div>

        <div className="space-y-3">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:border-purple-500/30 transition-all"
            >
              <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center">
                <ImageIcon size={24} className="opacity-40" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{img.name}</div>
                <div className="text-xs opacity-50">{img.size} - {img.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <ExternalLink size={14} className="opacity-60" />
                </button>
                <button className="p-2 hover:bg-red-500/20 rounded-lg transition-all text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}