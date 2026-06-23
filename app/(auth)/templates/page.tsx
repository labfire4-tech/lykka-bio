"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TemplatesPage() {
  const templates = [
    { id: 1, name: "Minimal Dark", category: "Minimal", gradient: "from-gray-800 to-black" },
    { id: 2, name: "Neon Purple", category: "Neon", gradient: "from-purple-900 to-pink-900" },
    { id: 3, name: "Glass Morphism", category: "Glass", gradient: "from-blue-900/50 to-purple-900/50" },
    { id: 4, name: "Aesthetic", category: "Aesthetic", gradient: "from-black to-gray-900" },
    { id: 5, name: "Cyberpunk", category: "Gaming", gradient: "from-cyan-900 to-blue-900" },
    { id: 6, name: "Retrowave", category: "Retro", gradient: "from-pink-900 to-purple-900" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black">Templates</h1>
          <p className="text-sm opacity-60">Start with a pre-made design and customize it</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className={"relative aspect-[9/16] rounded-2xl bg-gradient-to-br " + template.gradient + " border border-white/10 overflow-hidden mb-4 group-hover:border-purple-500/50 transition-all"}>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 mb-4" />
                  <div className="w-32 h-3 bg-white/10 rounded mb-2" />
                  <div className="w-24 h-2 bg-white/5 rounded mb-6" />
                  <div className="w-40 space-y-2">
                    <div className="h-8 bg-white/10 rounded-lg" />
                    <div className="h-8 bg-white/10 rounded-lg" />
                    <div className="h-8 bg-white/10 rounded-lg" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm">Use Template</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm">{template.name}</h3>
                <p className="text-xs opacity-50">{template.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}