"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["3 Social Links", "1 Theme", "Basic Analytics", "Community Support"],
    cta: "Current Plan",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    features: ["Unlimited Links", "All Themes", "Advanced Analytics", "Custom Domain", "Remove Branding", "Priority Support"],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    features: ["Everything in Pro", "Team Access", "API Access", "Custom Integrations", "Dedicated Support", "White Label"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Simple, transparent pricing</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              whileHover={{ y: -8, scale: plan.highlighted ? 1 : 1.02 }}
              className={
                "relative rounded-2xl p-6 border transition-all " +
                (plan.highlighted
                  ? "bg-gradient-to-br from-purple-600/20 to-purple-900/20 border-purple-500/50 shadow-2xl shadow-purple-900/30"
                  : "bg-white/5 border-white/10 hover:border-white/20")
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-white/60 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={
                  "w-full py-3 rounded-xl font-bold text-sm transition-all " +
                  (plan.highlighted ? "bg-purple-600 text-white hover:bg-purple-500" : "bg-white/10 text-white hover:bg-white/20")
                }
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}