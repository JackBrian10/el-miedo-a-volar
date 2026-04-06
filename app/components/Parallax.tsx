"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

// Layers ordered back to front
// blend: "multiply" knocks out white backgrounds
const layers: {
  file: string;
  speed: number;
  blend?: React.CSSProperties["mixBlendMode"];
}[] = [
  { file: "layer_02_sky.webp",        speed: 0.04 },
  { file: "layer_01_stars.webp",      speed: 0.08,  blend: "multiply" },
  { file: "layer_03_wings.webp",      speed: 0.12,  blend: "multiply" },
  { file: "layer_04_forest.webp",     speed: 0.20 },
  { file: "layer_05_ground.webp",     speed: 0.30 },
  { file: "layer_06_birds.webp",      speed: 0.38,  blend: "multiply" },
  { file: "layer_07_fireflies.webp",  speed: 0.46,  blend: "multiply" },
  { file: "layer_08_campfire.webp",   speed: 0.55,  blend: "multiply" },
  { file: "layer_09_fairy.webp",      speed: 0.65 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" as const } },
};

const ParallaxLayer = ({
  file,
  speed,
  zIndex,
  blend,
  scrollYProgress,
}: {
  file: string;
  speed: number;
  zIndex: number;
  blend?: React.CSSProperties["mixBlendMode"];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 80}%`]);

  return (
    <motion.div
      className="absolute inset-x-0 w-full pointer-events-none"
      style={{ y, zIndex, willChange: "transform", top: "-15%", height: "130%" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/parallax_layers/${file}`}
        alt=""
        className="w-full h-full object-cover"
        style={{ mixBlendMode: blend ?? "normal" }}
      />
    </motion.div>
  );
};

export const Parallax = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-[#1a1428]"
      style={{ clipPath: "inset(0)" }}
    >
      {layers.map((layer, i) => (
        <ParallaxLayer
          key={layer.file}
          file={layer.file}
          speed={layer.speed}
          zIndex={i + 1}
          blend={layer.blend}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
        style={{
          zIndex: 40,
          background: "linear-gradient(to bottom, transparent, #faf7f2)",
        }}
      />

      {/* Text — above all layers */}
      <motion.div
        className="relative flex flex-col items-center gap-6 text-center px-4"
        style={{ zIndex: 50 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-white/60 text-sm font-medium tracking-[0.25em] uppercase drop-shadow-md"
          variants={itemVariants}
        >
          Digital Art &amp; Illustration
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-7xl font-bold text-white"
          style={{
            textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 0 60px rgba(255,150,50,0.3)",
          }}
          variants={itemVariants}
        >
          Nerea Lopez
        </motion.h1>

        <motion.p
          className="text-white/50 text-lg tracking-widest drop-shadow-md"
          variants={itemVariants}
        >
          @elmiedoavolar
        </motion.p>

        <motion.a
          href="#portfolio"
          className="mt-2 px-8 py-3 border-2 border-white/70 text-white rounded-full font-semibold text-sm tracking-wide hover:bg-white hover:text-[#1a1428] transition-colors duration-200"
          style={{ textShadow: "none" }}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          View My Work
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1"
        style={{ zIndex: 50 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3L8 13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
};
