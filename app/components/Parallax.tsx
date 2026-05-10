"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

const ScrollIndicator = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/30 flex flex-col items-center gap-1 z-50"
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3L8 13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
};

const polaroidUrls = [
  "https://kowwnptiiukgcrsghhbn.supabase.co/storage/v1/object/public/illustrations/ilustracion_sin_titulo_4_1.webp",
  "https://kowwnptiiukgcrsghhbn.supabase.co/storage/v1/object/public/illustrations/4.webp",
  "https://kowwnptiiukgcrsghhbn.supabase.co/storage/v1/object/public/illustrations/ilustracion_sin_titulo_15.webp",
];

const stackOffsets = [
  { rotate: -6, x: -20, y: 10 },
  { rotate: 3,  x:  20, y: -10 },
  { rotate: 10, x:  50, y: 20 },
];

const PolaroidStack = () => {
  const [frontIdx, setFrontIdx] = useState(2);
  const [animating, setAnimating] = useState(false);

  function getStackPos(imgIdx: number) {
    const total = polaroidUrls.length;
    return (imgIdx - frontIdx + total) % total;
  }

  function handleClick() {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setFrontIdx((prev) => (prev - 1 + polaroidUrls.length) % polaroidUrls.length);
      setAnimating(false);
    }, 420);
  }

  return (
    <div className="relative w-64 h-72 sm:w-80 sm:h-96 select-none">
      {polaroidUrls.map((url, imgIdx) => {
        const stackPos = getStackPos(imgIdx);
        const isFront = stackPos === 2;
        const { rotate, x, y } = stackOffsets[stackPos];

        return (
          <motion.div
            key={imgIdx}
            className={`absolute bg-card p-3 pb-8 shadow-xl ${isFront ? "cursor-pointer" : ""}`}
            style={{ top: 0, left: 0, width: "100%" }}
            animate={
              isFront && animating
                ? { x: 220, y: -80, rotate: 30, opacity: 0, zIndex: 10, scale: 0.9 }
                : { x, y, rotate, opacity: 1, zIndex: stackPos, scale: 1 }
            }
            transition={{ duration: isFront && animating ? 0.38 : 0.45, ease: isFront && animating ? "easeIn" : "easeOut" }}
            whileHover={isFront && !animating ? { scale: 1.04, rotate: 0, transition: { duration: 0.25 } } : {}}
            onClick={isFront ? handleClick : undefined}
          >
            <img src={url} alt="" className="w-full h-48 sm:h-60 object-cover" loading="eager" />
          </motion.div>
        );
      })}
      <motion.p
        className="absolute -bottom-8 left-0 right-0 text-center text-foreground/25 text-xs tracking-widest flex items-center justify-center gap-2"
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
        </svg>
        tap the photo to browse
      </motion.p>
    </div>
  );
};

export const Parallax = () => {
  const { t } = useLanguage();
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-background overflow-hidden px-8 sm:px-16">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-12 w-full max-w-6xl mx-auto">

        {/* Left: text */}
        <motion.div
          className="flex flex-col gap-5 flex-1"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-foreground/30 text-xs tracking-[0.4em] uppercase"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } }}
          >
            {t.hero.label}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="text-[clamp(2.8rem,8vw,7rem)] font-bold text-foreground leading-none tracking-tight"
              variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
            >
              el miedo
            </motion.h1>
          </div>
          <div className="overflow-hidden -mt-2">
            <motion.h1
              className="text-[clamp(2.8rem,8vw,7rem)] font-bold text-accent leading-none tracking-tight"
              variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 } } }}
            >
              a volar
            </motion.h1>
          </div>

          <motion.div
            className="w-10 h-px bg-foreground/20 mt-1"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.5 } } }}
            style={{ originX: 0 }}
          />

          <motion.a
            href="https://www.instagram.com/elmiedoavolar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/35 text-xs tracking-[0.3em] uppercase hover:text-foreground/60 transition-colors duration-200"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } }}
          >
            @elmiedoavolar
          </motion.a>

          <motion.a
            href="#portfolio"
            onClick={(e) => { e.preventDefault(); document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" }); }}
            className="w-fit px-8 py-3 bg-accent text-white rounded-full text-sm font-semibold tracking-wide hover:bg-accent/90 transition-colors duration-200"
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.cta}
          </motion.a>
        </motion.div>

        {/* Right: polaroid stack */}
        <div className="flex-1 flex items-center justify-center">
          <PolaroidStack />
        </div>
      </div>

      <ScrollIndicator />
    </div>
  );
};
