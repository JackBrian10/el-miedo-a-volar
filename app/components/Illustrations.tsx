"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

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

export const Illustrations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);

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
          <h2 className="text-4xl font-bold text-foreground mb-3">
            Portfolio
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {illustrations.length === 0 ? (
            // Placeholder cards while empty
            Array.from({ length: 8 }).map((_, i) => (
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
            illustrations.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  boxShadow: "0 20px 40px rgba(232,184,109,0.15)",
                }}
                className="bg-card border border-accent/20 rounded-xl overflow-hidden cursor-pointer"
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
                <div className="p-3">
                  <p className="text-foreground/60 text-xs">{item.title}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
