"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Zap, Building2 } from "lucide-react";

const plans = [
  { name: "Free", icon: Zap, price: { monthly: 0, yearly: 0 }, features: ["3 social links", "Basic themes", "Standard analytics", "Community support"], cta: "Current Plan", highlighted: false },
  { name: "Pro", icon: Crown, price: { monthly: 9, yearly: 90 }, features: ["Unlimited links", "All themes & effects", "Advanced analytics", "Custom domain", "Remove branding", "Priority support", "Custom cursors & audio"], cta: "Upgrade to Pro", highlighted: true },
  { name: "Business", icon: Building2, price: { monthly: 29, yearly: 290 }, features: ["Everything in Pro", "Team access (5 seats)", "API access", "Custom integrations", "Dedicated support", "White label"], cta: "Contact Sales", highlighted: false },
];

export default function PremiumPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-black mb-3">
            Simple, <span className="text-gradient-purple">transparent</span> pricing
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/40 max-w-md mx-auto mb-6 text-sm">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </motion.p>
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <button onClick={() => setBilling("monthly")} className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${billing === "monthly" ? "bg-gradient-to-r from-purple-700 to-purple-600 text-white" : "text-white/40"}`}>Monthly</button>
            <button onClick={() => setBilling("yearly")} className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${billing === "yearly" ? "bg-gradient-to-r from-purple-700 to-purple-600 text-white" : "text-white/40"}`}>Yearly <span className="text-green-400">-17%</span></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * i }} whileHover={{ y: -6 }} className={`relative rounded-2xl p-8 border transition-all ${plan.highlighted ? "bg-gradient-to-br from-purple-600/10 to-purple-900/5 border-purple-500/30 shadow-2xl shadow-purple-900/15" : "bg-white/[0.02] border-white/[0.06] hover:border-white/15"}`}>
              {plan.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full">MOST POPULAR</div>}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${plan.highlighted ? "bg-purple-600/20" : "bg-white/[0.04]"}`}>
                <plan.icon size={20} className={plan.highlighted ? "text-purple-400" : "text-white/50"} />
              </div>
              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <div className="mb-6"><span className="text-4xl font-black">${billing === "monthly" ? plan.price.monthly : Math.floor(plan.price.yearly / 12)}</span><span className="text-white/40 text-sm">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                    <div className="w-4 h-4 rounded-full bg-purple-500/15 flex items-center justify-center mt-0.5 shrink-0"><Check size={10} className="text-purple-400" /></div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3.5 rounded-full font-bold text-sm transition-all ${plan.highlighted ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:brightness-110 text-white shadow-lg shadow-purple-900/30" : "bg-white/[0.05] text-white hover:bg-white/[0.08] border border-white/[0.08]"}`}>{plan.cta}</button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-6">Pricing FAQ</h2>
          <div className="space-y-3">
            {[
              { q: "Can I change plans anytime?", a: "Yes! You can upgrade or downgrade at any time." },
              { q: "Is there a free trial?", a: "The Free plan is free forever. Paid plans can be cancelled anytime." },
              { q: "What payment methods do you accept?", a: "All major credit cards, PayPal, and crypto." },
              { q: "Do you offer refunds?", a: "Yes, a 14-day money-back guarantee on all paid plans." },
            ].map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
                <h3 className="font-medium text-sm mb-2">{faq.q}</h3>
                <p className="text-xs text-white/40">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
