"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

const tierIcons = ["🎨", "🖌️"];

// TODO: replace with real sample image URLs
const tierSamples = [
  "/parallax_layers/layer_09_fairy.webp",
  "/parallax_layers/layer_09_fairy.webp",
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
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
          <h2 className="text-4xl font-bold text-foreground mb-3">{t.commissions.heading}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-foreground/60 text-base mb-6">
            {t.commissions.subheading}
          </p>
          {/* Status badge */}
          <span className="inline-block bg-green-500/10 text-green-500 border border-green-500/30 rounded-full px-4 py-1 text-xs font-semibold tracking-wide">
            {t.commissions.badge}
          </span>
        </motion.div>

        {/* Tier cards */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12 max-w-3xl mx-auto w-full">
          {t.commissions.tiers.map((tier: { name: string; price: string; note: string | null; features: string[] }, i: number) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(201,31,0,0.08)" }}
              className="bg-card border border-accent/20 rounded-2xl p-6 flex flex-col gap-4 flex-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl">
                {tierIcons[i]}
              </div>

              {/* Name + price */}
              <div>
                <span className="inline-block text-accent font-bold text-xs uppercase tracking-widest mb-2">
                  {tier.name}
                </span>
                <div className="inline-block ml-2 bg-foreground text-background text-sm font-bold px-3 py-0.5 rounded-md">
                  {tier.price}
                </div>
                {tier.note && <p className="text-foreground/40 text-xs mt-1">— {tier.note}</p>}
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2 mt-1 flex-1">
                {tier.features.map((f: string) => (
                  <li key={f} className="text-foreground/60 text-sm flex items-start gap-2">
                    <span className="text-accent/50 mt-0.5">–</span> {f}
                  </li>
                ))}
              </ul>

              {/* View sample button */}
              <button
                onClick={() => setLightboxIndex(i)}
                className="mt-2 text-xs font-semibold text-accent/70 hover:text-accent tracking-wide transition-colors duration-150 text-left"
              >
                {t.commissions.viewSample}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p variants={itemVariants} className="text-foreground/40 text-xs italic text-center mt-6">
          {t.commissions.note}
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
            {t.commissions.cta}
          </motion.a>
          <p className="text-foreground/40 text-xs text-center">
            {t.commissions.slots}
          </p>
        </motion.div>
      </motion.div>

      {/* Sample lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 max-w-lg w-full"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tierSamples[lightboxIndex]}
                alt={t.commissions.tiers[lightboxIndex]?.name}
                className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl object-contain mx-auto"
              />
              <motion.p
                className="mt-4 text-center text-white/70 text-xs tracking-widest uppercase"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t.commissions.tiers[lightboxIndex]?.name}
              </motion.p>
            </motion.div>

            <button
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
