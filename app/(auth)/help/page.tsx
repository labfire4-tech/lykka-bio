"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, LifeBuoy, MessageCircle, Search, ChevronDown } from "lucide-react";

const helpItems = [
  { icon: BookOpen, label: "Documentation", desc: "Read our comprehensive guides", color: "from-blue-500/10 to-cyan-500/10", href: "#" },
  { icon: LifeBuoy, label: "Support", desc: "Get help from our team", color: "from-purple-500/10 to-pink-500/10", href: "#" },
  { icon: MessageCircle, label: "Discord", desc: "Join our community", color: "from-indigo-500/10 to-purple-500/10", href: "#" },
];

const faqs = [
  { q: "How do I create a profile?", a: "Sign up for an account, then go to the editor to fill in your info, add links, and customize the look. Save and your page is live instantly." },
  { q: "Can I use my own domain?", a: "Yes! Pro and Business plans support custom domains. Go to Settings > Domain to connect yours." },
  { q: "How do I upload a background?", a: "Navigate to Customize > Assets and upload your image, or paste a URL. Video backgrounds are also supported on Pro." },
  { q: "Is the platform free?", a: "Yes! The Free plan is 100% free forever with up to 3 social links and basic themes." },
  { q: "How do custom cursors work?", a: "Go to Customize > Effects and choose from trail, glow, crosshair, or dot cursors. You can also upload your own cursor image on Pro." },
  { q: "Can I see who views my profile?", a: "Yes, the dashboard shows total views, clicks, and recent activity in real-time. Pro adds detailed analytics and export." },
  { q: "How do I add audio to my page?", a: "Go to Customize > Assets and upload an audio file or paste a URL. Visitors will see a play button to enable sound." },
  { q: "Can I use Font Awesome icons?", a: "Yes, Font Awesome is loaded globally. Use any fa-brands or fa-solid class in your link icon fields." },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(
    (faq) => faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-1">Help Center</h1>
          <p className="text-sm text-white/50">Need help? We've got you covered</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for help..."
            className="glass-input pl-11"
          />
        </div>

        {/* Help cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {helpItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`card-hover p-6 bg-gradient-to-br ${item.color}`}
            >
              <item.icon size={28} className="mb-3" />
              <h3 className="font-bold mb-1">{item.label}</h3>
              <p className="text-xs text-white/50">{item.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-white/40 transition-transform shrink-0 ml-2 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-white/50 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          {filteredFaqs.length === 0 && (
            <p className="text-center text-sm text-white/40 py-8">No results found for "{search}"</p>
          )}
        </div>
      </div>
    </div>
  );
}
