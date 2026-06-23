"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, LifeBuoy, MessageCircle, Search, ChevronDown } from "lucide-react";

const helpItems = [
  { icon: BookOpen, label: "Documentation", desc: "Read our comprehensive guides", href: "#" },
  { icon: LifeBuoy, label: "Support", desc: "Get help from our team", href: "#" },
  { icon: MessageCircle, label: "Discord", desc: "Join our community", href: "#" },
];

const faqs = [
  { q: "How do I create a profile?", a: "Sign up, go to the editor, fill in your info and save." },
  { q: "Can I use my own domain?", a: "Yes, Pro and Business plans support custom domains." },
  { q: "How do I upload a background?", a: "Go to Customize > Assets and upload your image or paste a URL." },
  { q: "Is the platform free?", a: "Yes! The Free plan is 100% free forever." },
  { q: "How do custom cursors work?", a: "Go to Customize > Effects and choose from trail, glow, crosshair, or dot." },
  { q: "Can I see who views my profile?", a: "Yes, the dashboard shows total views, clicks, and recent activity in real-time." },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-1">Help Center</h1>
          <p className="text-sm text-white/40">Need help? We've got you covered</p>
        </div>

        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for help..." className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm placeholder:text-white/25 focus:outline-none focus:border-purple-500/30 transition-colors" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {helpItems.map((item, i) => (
            <motion.a key={item.label} href={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all cursor-pointer">
              <item.icon size={24} className="mb-3 text-purple-400" />
              <h3 className="font-bold text-sm mb-1">{item.label}</h3>
              <p className="text-xs text-white/30">{item.desc}</p>
            </motion.a>
          ))}
        </div>

        <h2 className="text-lg font-bold mb-4">FAQ</h2>
        <div className="space-y-2">
          {filtered.map((faq, i) => (
            <div key={i} className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-medium text-sm">{faq.q}</span>
                <ChevronDown size={16} className={`text-white/30 transition-transform shrink-0 ml-2 ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm text-white/40 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-sm text-white/30 py-8">No results for "{search}"</p>}
      </div>
    </div>
  );
}
