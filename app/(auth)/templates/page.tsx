"use client";

import { motion } from "framer-motion";
import { Eye, Star } from "lucide-react";

const templates = [
  { id: 1, name: "Minimal Dark", category: "Minimal", gradient: "from-gray-800 to-black", premium: false, uses: "12.4k" },
  { id: 2, name: "Neon Purple", category: "Neon", gradient: "from-purple-900 to-pink-900", premium: false, uses: "8.7k" },
  { id: 3, name: "Glass Morphism", category: "Glass", gradient: "from-blue-900/50 to-purple-900/50", premium: true, uses: "5.2k" },
  { id: 4, name: "Aesthetic", category: "Aesthetic", gradient: "from-black to-gray-900", premium: false, uses: "9.1k" },
  { id: 5, name: "Cyberpunk", category: "Gaming", gradient: "from-cyan-900 to-blue-900", premium: true, uses: "6.8k" },
  { id: 6, name: "Retrowave", category: "Retro", gradient: "from-pink-900 to-purple-900", premium: true, uses: "4.3k" },
  { id: 7, name: "Ocean", category: "Nature", gradient: "from-teal-900 to-cyan-900", premium: false, uses: "3.1k" },
  { id: 8, name: "Sunset", category: "Warm", gradient: "from-orange-900 to-red-900", premium: true, uses: "2.8k" },
  { id: 9, name: "Forest", category: "Nature", gradient: "from-green-900 to-emerald-900", premium: false, uses: "1.9k" },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-1">Templates</h1>
          <p className="text-sm text-white/50">Start with a pre-made design and customize it</p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["All", "Minimal", "Neon", "Glass", "Gaming", "Retro", "Nature"].map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${i === 0 ? "bg-purple-600 text-white" : "bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className={`relative aspect-[9/16] rounded-2xl bg-gradient-to-br ${template.gradient} border border-white/10 overflow-hidden mb-3 group-hover:border-purple-500/50 transition-all`}>
                {/* Preview content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 mb-3 border border-white/10" />
                  <div className="w-24 h-2 bg-white/10 rounded mb-1.5" />
                  <div className="w-16 h-1.5 bg-white/5 rounded mb-4" />
                  <div className="w-full space-y-1.5">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 bg-white/10 rounded-lg" />
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-5 py-2 bg-white text-black font-bold rounded-full text-xs">Use Template</span>
                </div>

                {/* Premium badge */}
                {template.premium && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-purple-600/80 backdrop-blur text-white text-[10px] font-bold rounded-full">
                    PRO
                  </div>
                )}

                {/* Uses count */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-white/40">
                  <Eye size={10} />
                  {template.uses}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">{template.name}</h3>
                  <p className="text-xs text-white/40">{template.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
