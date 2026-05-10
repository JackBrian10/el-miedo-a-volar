"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { useLanguage } from "../lib/LanguageContext";

interface Illustration {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  display_order: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const INITIAL_COUNT = 4;
const BATCH_SIZE = 4;

export const Illustrations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Illustration | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    supabase
      .from("illustrations")
      .select("id, title, description, image_url, display_order")
      .eq("is_published", true)
      .order("display_order")
      .then(({ data }) => {
        if (data) setIllustrations(data);
      });
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="w-full py-24 px-6 bg-background">
      <motion.div
        ref={ref}
        variants={containerVariants}
        animate={isInView ? "visible" : "hidden"}
        initial="hidden"
        className="max-w-6xl mx-auto"
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-3">{t.portfolio.heading}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {illustrations.length === 0 ? (
            Array.from({ length: INITIAL_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="bg-card border border-accent/20 rounded-xl overflow-hidden"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-card to-[#e8dfd4] flex items-center justify-center">
                  <span className="text-4xl text-accent/30 select-none">✦</span>
                </div>
              </motion.div>
            ))
          ) : (
            illustrations.slice(0, visibleCount).map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(201,31,0,0.10)" }}
                className="bg-card border border-accent/20 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelected(item)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="px-3 py-2 flex items-center gap-2">
                  <span className="block w-3 h-px bg-accent/40 flex-shrink-0" />
                  <p className="text-foreground/50 text-xs tracking-widest uppercase truncate">{item.title}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Show More / Show Less */}
        {illustrations.length > INITIAL_COUNT && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {visibleCount < illustrations.length ? (
              <motion.button
                onClick={() => setVisibleCount((c) => Math.min(c + BATCH_SIZE, illustrations.length))}
                className="px-8 py-3 border-2 border-accent/40 text-foreground/70 rounded-full text-sm font-semibold tracking-wide hover:border-accent hover:text-accent transition-colors duration-200"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.portfolio.showMore}
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setVisibleCount(INITIAL_COUNT)}
                className="px-8 py-3 border-2 border-accent/20 text-foreground/40 rounded-full text-sm font-semibold tracking-wide hover:border-accent/40 hover:text-foreground/70 transition-colors duration-200"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.portfolio.showLess}
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            {/* Blurred backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Image */}
            <motion.div
              className="relative z-10 max-w-2xl w-full"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.image_url}
                alt={selected.title}
                className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl object-contain mx-auto"
              />
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-3">
                  <span className="block w-8 h-px bg-accent/60" />
                  <p className="text-white/90 text-sm font-medium tracking-[0.2em] uppercase">
                    {selected.title}
                  </p>
                  <span className="block w-8 h-px bg-accent/60" />
                </div>
              </motion.div>
            </motion.div>

            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg transition-colors"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
