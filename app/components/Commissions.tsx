"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tiers = [
  {
    id: "sketch",
    icon: "✏️",
    name: "Sketch",
    price: "From $25 USD",
    features: [
      "Flat colors",
      "Simple background",
      "1 character",
      "1 revision round",
    ],
  },
  {
    id: "illustration",
    icon: "🎨",
    name: "Illustration",
    price: "From $60 USD",
    features: [
      "Full render & shading",
      "Detailed character",
      "Simple background",
      "2 revision rounds",
    ],
  },
  {
    id: "full-piece",
    icon: "✦",
    name: "Full Piece",
    price: "From $120 USD",
    features: [
      "Complex scene",
      "Detailed background",
      "Multiple characters",
      "3 revision rounds",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const Commissions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="w-full py-24 px-6 bg-background">
      <motion.div
        ref={ref}
        variants={containerVariants}
        animate={isInView ? "visible" : "hidden"}
        initial="hidden"
        className="max-w-5xl mx-auto"
      >
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-4">
          <h2 className="text-4xl font-bold text-foreground mb-3">Commissions</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-foreground/60 text-base mb-6">
            Bring your characters to life
          </p>
          {/* Status badge */}
          <span className="inline-block bg-green-900/40 text-green-400 border border-green-500/30 rounded-full px-4 py-1 text-xs font-semibold tracking-wide">
            ● Commissions: OPEN
          </span>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={itemVariants}
              whileHover={{
                y: -6,
                borderColor: "rgba(232,184,109,0.5)",
                boxShadow: "0 24px 48px rgba(232,184,109,0.12)",
              }}
              className="bg-card border border-accent/20 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="text-3xl">{tier.icon}</div>
              <div>
                <h3 className="text-accent font-bold text-lg">{tier.name}</h3>
                <p className="text-foreground font-bold text-xl mt-1">{tier.price}</p>
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="text-foreground/60 text-sm flex items-center gap-2">
                    <span className="text-accent/60">—</span> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center gap-4">
          <motion.a
            href="#contact"
            className="bg-accent text-background font-bold px-10 py-4 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors duration-200"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Request a Commission
          </motion.a>
          <p className="text-foreground/40 text-xs text-center">
            Slots are limited. DM on Instagram or use the contact form below.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
