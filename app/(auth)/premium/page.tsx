"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Zap, Building2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    period: "forever",
    features: ["3 social links", "Basic themes", "Standard analytics", "Community support", "LYKKA.bio subdomain"],
    cta: "Current Plan",
    highlighted: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: { monthly: 9, yearly: 90 },
    period: "/month",
    features: ["Unlimited links", "All themes & effects", "Advanced analytics", "Custom domain", "Remove branding", "Priority support", "Custom cursors & audio"],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Business",
    icon: Building2,
    price: { monthly: 29, yearly: 290 },
    period: "/month",
    features: ["Everything in Pro", "Team access (5 seats)", "API access", "Custom integrations", "Dedicated support", "White label"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PremiumPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Simple, <span className="text-gradient-purple">transparent</span> pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto mb-8"
          >
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </motion.p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${billing === "monthly" ? "bg-purple-600 text-white" : "text-white/50"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${billing === "yearly" ? "bg-purple-600 text-white" : "text-white/50"}`}
            >
              Yearly
              <span className="ml-1.5 text-[10px] text-green-400">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl p-8 border transition-all ${
                plan.highlighted
                  ? "bg-gradient-to-br from-purple-600/15 to-purple-900/10 border-purple-500/40 shadow-2xl shadow-purple-900/20"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${plan.highlighted ? "bg-purple-600/20" : "bg-white/5"}`}>
                <plan.icon size={22} className={plan.highlighted ? "text-purple-400" : "text-white/60"} />
              </div>

              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">
                  ${billing === "monthly" ? plan.price.monthly : Math.floor(plan.price.yearly / 12)}
                </span>
                <span className="text-white/50 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 shrink-0">
                      <Check size={10} className="text-purple-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                  plan.highlighted
                    ? "btn-primary"
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ section */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Pricing FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Can I change plans anytime?", a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately." },
              { q: "Is there a free trial?", a: "The Free plan is free forever. Pro and Business plans can be cancelled anytime." },
              { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and crypto payments." },
              { q: "Do you offer refunds?", a: "Yes, we offer a 14-day money-back guarantee on all paid plans." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-5"
              >
                <h3 className="font-medium text-sm mb-2">{faq.q}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
