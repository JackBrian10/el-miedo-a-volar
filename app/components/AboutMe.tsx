"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  "Character Design",
  "Digital Illustration",
  "Painterly Style",
  "OC Art",
];

export const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="w-full py-24 px-6 bg-[#f5efe6]" ref={ref}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-3">About Me</h2>
          <div className="w-16 h-0.5 bg-accent mb-6" />

          <p className="text-foreground/70 text-base leading-relaxed mb-8">
            I&apos;ve always had fear of flying, irrational fear. That fear has
            been with me all the time even though I fly due to my love for
            traveling. I carried the same fear when I thought of sharing my
            ideas to the world. Fear should not have the power to stop us from
            doing what we love, one step at a time.
          </p>

          {/* Skill badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {skills.map((skill) => (
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
            ↗ @elmiedoavolar on Instagram
          </motion.a>
        </motion.div>

        {/* Right: decorative panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hidden md:flex items-center justify-center bg-card border border-accent/20 rounded-2xl h-72"
        >
          <span className="text-[8rem] text-accent/20 select-none leading-none">
            ✦
          </span>
        </motion.div>
      </div>
    </div>
  );
};
