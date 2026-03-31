"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const illustrations = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  label: `Illustration ${i + 1}`,
}));

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
          {illustrations.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{
                y: -4,
                boxShadow: "0 20px 40px rgba(232,184,109,0.15)",
              }}
              className="bg-card border border-accent/20 rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Placeholder image area */}
              <div className="aspect-[3/4] bg-gradient-to-br from-card to-[#e8dfd4] flex items-center justify-center">
                <span className="text-4xl text-accent/30 select-none">✦</span>
              </div>
              <div className="p-3">
                <p className="text-foreground/60 text-xs">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div variants={headingVariants} className="mt-12 flex justify-center">
          <motion.button
            className="border border-accent/50 text-accent px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-accent/10 transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Load More
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
