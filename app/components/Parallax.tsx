"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const layers: { file: string; speed: number; blend?: string; opacity?: number }[] = [
  { file: "image00001.png", speed: 0.06 },
  { file: "image00002.png", speed: 0.10 },
  { file: "image00003.png", speed: 0.16 },
  { file: "image00004.png", speed: 0.20 },
  { file: "image00005.png", speed: 0.26 },
  { file: "image00006.png", speed: 0.28 },
  { file: "image00007.png", speed: 0.33 },
  { file: "image00008.png", speed: 0.36 },
  { file: "image00009.png", speed: 0.40 },
  { file: "image00010.png", speed: 0.40 },
  { file: "image00011.png", speed: 0.43 },
  { file: "image00012.png", speed: 0.43 },
  { file: "image00013.png", speed: 0.46 },
  { file: "image00015.png", speed: 0.53, blend: "multiply" },
  { file: "image00016.png", speed: 0.60, blend: "multiply" },
  { file: "image00018.png", speed: 0.68 },
  { file: "image00019.png", speed: 0.73 },
  { file: "image00020.png", speed: 0.80 },
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
  opacity,
  scrollYProgress,
}: {
  file: string;
  speed: number;
  zIndex: number;
  blend?: string;
  opacity?: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 80}%`]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        y,
        zIndex,
        opacity: opacity ?? 1,
        backgroundImage: `url('/parallax_layers/${file}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        willChange: "transform",
        mixBlendMode: (blend ?? "normal") as React.CSSProperties["mixBlendMode"],
      }}
    />
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1428]"
    >
      {layers.map((layer, i) => (
        <ParallaxLayer
          key={layer.file}
          file={layer.file}
          speed={layer.speed}
          zIndex={i + 1}
          blend={layer.blend}
          opacity={layer.opacity}
          scrollYProgress={scrollYProgress}
        />
      ))}

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
