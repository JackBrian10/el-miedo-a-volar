"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tiers = [
  {
    id: "full-illustration",
    name: "Full Illustration",
    price: "125€",
    note: "Negotiable bundle option",
    features: [
      "Full color",
      "Full background",
      "1 character (+10€/ extra character)",
      "Timing: 30 days (depending on complexity)",
      "Revisions: 2 (1 on sketch, 1 in color)",
    ],
  },
  {
    id: "spot-illustration",
    name: "Spot Illustration",
    price: "70€",
    note: null,
    features: [
      "Full color",
      "No background",
      "Character/items (+10€/ extra character)",
      "Timing: 30 days (depending on complexity)",
      "Revisions: 2 (1 on sketch, 1 in color)",
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
          <span className="inline-block bg-accent/10 text-accent border border-accent/30 rounded-full px-4 py-1 text-xs font-semibold tracking-wide">
            ● Commissions Open
          </span>
        </motion.div>

        {/* Tier cards */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12 max-w-3xl mx-auto w-full">
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(201,31,0,0.08)" }}
              className="bg-card border border-accent/20 rounded-2xl p-6 flex flex-col gap-3 flex-1"
            >
              <div>
                <h3 className="text-accent font-bold text-lg uppercase tracking-wide">{tier.name} — {tier.price}</h3>
                {tier.note && <p className="text-foreground/40 text-xs mt-0.5">— {tier.note}</p>}
              </div>
              <p className="text-foreground/60 text-sm font-medium">Includes:</p>
              <ul className="flex flex-col gap-1.5">
                {tier.features.map((f) => (
                  <li key={f} className="text-foreground/60 text-sm flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">–</span> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p variants={itemVariants} className="text-foreground/40 text-xs italic text-center mt-6">
          50% upfront payment via PayPal after sketch approval
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center gap-4">
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-accent text-white font-bold px-10 py-4 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors duration-200"
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
