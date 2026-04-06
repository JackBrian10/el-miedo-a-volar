"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Commissions", href: "#commissions" },
  { label: "Contact", href: "#contact" },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full flex items-center justify-between px-8 h-16"
      animate={{
        backgroundColor: scrolled
          ? "rgba(250, 247, 242, 0.92)"
          : "rgba(0, 0, 0, 0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0,0,0,0.08)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3 }}
    >
      <a href="#" className="hover:opacity-80 transition-opacity">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.webp"
          alt="el miedo a volar"
          className="h-24 w-auto"
          style={{ mixBlendMode: "multiply" }}
        />
      </a>

      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative text-sm font-medium group"
            style={{ color: scrolled ? "rgba(28,26,22,0.8)" : "rgba(255,255,255,0.8)" }}
          >
            <motion.span
              className="block"
              whileHover={{ color: scrolled ? "#C91F00" : "#ffffff", y: -1 }}
              transition={{ duration: 0.15 }}
            >
              {link.label}
            </motion.span>
            <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </a>
        ))}
      </div>
    </motion.nav>
  );
};
