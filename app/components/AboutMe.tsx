"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../lib/LanguageContext";

export const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <div className="w-full py-24 px-6 bg-card" ref={ref}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-3">{t.about.heading}</h2>
          <div className="w-16 h-0.5 bg-accent mb-6" />

          <p className="text-foreground/70 text-base leading-relaxed mb-8">
            {t.about.body}
          </p>

          {/* Skill badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {t.about.skills.map((skill: string) => (
              <span
                key={skill}
                className="bg-accent/10 text-accent border border-accent/30 rounded-full px-3 py-1 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Instagram link */}
          <motion.a
            href="https://www.instagram.com/elmiedoavolar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/50 text-sm tracking-wide hover:text-accent transition-colors duration-200"
            whileHover={{ color: "#d4621a" }}
          >
            {t.about.instagram}
          </motion.a>
        </motion.div>

        {/* Right: photo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hidden md:flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about.jpg"
            alt="Brian Arias Romero"
            className="rounded-2xl object-cover w-full max-w-sm shadow-lg border border-accent/10"
          />
        </motion.div>
      </div>
    </div>
  );
};
