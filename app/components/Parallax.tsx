"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

// ─── Shared text content ────────────────────────────────────────────────────

const HeroText = ({ dark = true }: { dark?: boolean }) => {
  const { t } = useLanguage();
  const text = dark ? "text-white" : "text-foreground";
  const sub = dark ? "text-white/50" : "text-foreground/50";
  const border = dark ? "border-white/70 text-white hover:bg-white hover:text-[#1a1428]" : "border-foreground/40 text-foreground hover:bg-foreground hover:text-background";

  return (
    <motion.div
      className="relative flex flex-col items-center gap-6 text-center px-4"
      style={{ zIndex: 50 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } } }}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className={`${sub} text-sm font-medium tracking-[0.25em] uppercase drop-shadow-md`}
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } } }}
      >
        {t.hero.label}
      </motion.p>
      <motion.h1
        className={`text-5xl sm:text-7xl font-bold ${text}`}
        style={{ textShadow: dark ? "0 2px 20px rgba(0,0,0,0.8), 0 0 60px rgba(255,150,50,0.3)" : "none" }}
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } } }}
      >
        El miedo a volar
      </motion.h1>
      <motion.a
        href="https://www.instagram.com/elmiedoavolar"
        target="_blank"
        rel="noopener noreferrer"
        className={`${sub} text-lg tracking-widest drop-shadow-md hover:opacity-100 transition-opacity duration-200`}
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } } }}
      >
        @elmiedoavolar
      </motion.a>
      <motion.a
        href="#portfolio"
        onClick={(e) => { e.preventDefault(); document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" }); }}
        className={`mt-2 px-8 py-3 border-2 ${border} rounded-full font-semibold text-sm tracking-wide transition-colors duration-200`}
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } } }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        {t.hero.cta}
      </motion.a>
    </motion.div>
  );
};

const ScrollIndicator = ({ dark = true }: { dark?: boolean }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${dark ? "text-white/40" : "text-foreground/40"} flex flex-col items-center gap-1`}
      style={{ zIndex: 50 }}
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

// ─── Variant A: Lightweight parallax (2 layers) ─────────────────────────────

const VariantA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fairyY = useTransform(scrollYProgress, [0, 1], ["0%", "-48%"]);

  return (
    <div ref={sectionRef} className="relative w-full h-screen flex items-center justify-center bg-[#1a1428]" style={{ clipPath: "inset(0)" }}>
      <motion.div className="absolute inset-x-0 pointer-events-none" style={{ y: skyY, top: "-15%", height: "130%", zIndex: 1 }}>
        <img src="/parallax_layers/layer_02_sky.webp" alt="" className="w-full h-full object-cover" loading="eager" />
      </motion.div>
      <motion.div className="absolute inset-x-0 pointer-events-none" style={{ y: fairyY, top: "-15%", height: "130%", zIndex: 2 }}>
        <img src="/parallax_layers/layer_09_fairy.webp" alt="" className="w-full h-full object-cover" loading="eager" />
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none" style={{ zIndex: 40, background: "linear-gradient(to bottom, transparent, #faf7f2)" }} />
      <HeroText />
      <ScrollIndicator />
    </div>
  );
};

// ─── Variant B: Single image background, no JS parallax ─────────────────────

const VariantB = () => (
  <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#1a1428]">
    <img
      src="https://kowwnptiiukgcrsghhbn.supabase.co/storage/v1/object/public/illustrations/ilustracion_sin_titulo_4_1.webp"
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-60"
      loading="eager"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1428] via-[#1a1428]/30 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none" style={{ zIndex: 40, background: "linear-gradient(to bottom, transparent, #faf7f2)" }} />
    <div className="relative z-10">
      <HeroText />
    </div>
    <ScrollIndicator />
  </div>
);

// ─── Variant C: Split layout ─────────────────────────────────────────────────

const VariantC = () => {
  const { t } = useLanguage();
  return (
    <div className="relative w-full h-screen flex items-center bg-[#faf7f2] overflow-hidden">
      {/* Left: text */}
      <motion.div
        className="relative z-10 flex flex-col gap-6 px-10 sm:px-20 max-w-xl"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-foreground/40 text-sm font-medium tracking-[0.25em] uppercase"
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
        >
          {t.hero.label}
        </motion.p>
        <motion.h1
          className="text-5xl sm:text-6xl font-bold text-foreground leading-tight"
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
        >
          El miedo<br />a volar
        </motion.h1>
        <motion.div
          className="w-12 h-0.5 bg-accent"
          variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } } }}
          style={{ originX: 0 }}
        />
        <motion.a
          href="https://www.instagram.com/elmiedoavolar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/40 text-base tracking-widest hover:text-foreground/70 transition-colors duration-200"
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
        >
          @elmiedoavolar
        </motion.a>
        <motion.a
          href="#portfolio"
          onClick={(e) => { e.preventDefault(); document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" }); }}
          className="w-fit mt-2 px-8 py-3 bg-accent text-white rounded-full font-semibold text-sm tracking-wide hover:bg-accent/90 transition-colors duration-200"
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {t.hero.cta}
        </motion.a>
      </motion.div>

      {/* Right: illustration */}
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 sm:w-[55%]"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <img
          src="/parallax_layers/layer_09_fairy.webp"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf7f2] via-[#faf7f2]/20 to-transparent" />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none" style={{ zIndex: 40, background: "linear-gradient(to bottom, transparent, #faf7f2)" }} />
      <ScrollIndicator dark={false} />
    </div>
  );
};

// ─── Switcher ────────────────────────────────────────────────────────────────

const variants = [
  { key: "A", label: "A — Lightweight parallax" },
  { key: "B", label: "B — Single image" },
  { key: "C", label: "C — Split layout" },
] as const;

type VariantKey = "A" | "B" | "C";

export const Parallax = () => {
  const [active, setActive] = useState<VariantKey>("A");

  return (
    <div className="relative">
      {/* Variant picker */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] flex gap-2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2">
        {variants.map((v) => (
          <button
            key={v.key}
            onClick={() => setActive(v.key)}
            className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors duration-150 ${active === v.key ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {active === "A" && <VariantA />}
      {active === "B" && <VariantB />}
      {active === "C" && <VariantC />}
    </div>
  );
};
