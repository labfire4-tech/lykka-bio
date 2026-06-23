"use client";

import { motion } from "framer-motion";
import { BookOpen, LifeBuoy, MessageCircle } from "lucide-react";

export default function HelpPage() {
  const items = [
    { icon: BookOpen, label: "Docs", desc: "Learn the basics", color: "from-blue-500/10 to-cyan-500/10" },
    { icon: LifeBuoy, label: "Support", desc: "Get help from our team", color: "from-purple-500/10 to-pink-500/10" },
    { icon: MessageCircle, label: "Discord", desc: "Join our community", color: "from-indigo-500/10 to-purple-500/10" },
  ];

  const faqs = [
    { q: "How do I create a profile?", a: "Sign up, go to the editor, fill in your info and save." },
    { q: "Can I use my own domain?", a: "Yes, Premium and Business plans support custom domains." },
    { q: "How do I upload a background video?", a: "Go to Customize > Theme > paste a video URL or upload." },
    { q: "Is the platform free?", a: "Yes! The Free plan is 100% free forever." },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black">Help Center</h1>
          <p className="text-sm opacity-60">Need help? We've got you covered</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -4 }}
              className={"p-6 rounded-2xl bg-gradient-to-br " + item.color + " border border-white/10 hover:border-white/20 transition-all cursor-pointer"}
            >
              <item.icon size={28} className="mb-3" />
              <h3 className="font-bold mb-1">{item.label}</h3>
              <p className="text-xs opacity-60">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="font-medium text-sm mb-2">{faq.q}</h3>
              <p className="text-xs opacity-60">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}