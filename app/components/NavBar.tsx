"use client";

import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Commissions", href: "#commissions" },
  { label: "Contact", href: "#contact" },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <motion.nav
        className="absolute top-0 z-50 w-full flex items-center justify-between px-4 sm:px-8 h-18"
        animate={{
          backgroundColor: menuOpen ? "rgba(250, 247, 242, 0.97)" : "rgba(0,0,0,0)",
          backdropFilter: menuOpen ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <a href="#" className="hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt="el miedo a volar"
            className="h-14 w-auto"
            style={{ mixBlendMode: scrolled ? "normal" : "multiply" }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium group"
            >
              <motion.span
                className="block"
                animate={{ color: scrolled ? "rgba(28,26,22,0.8)" : "rgba(255,255,255,0.9)" }}
                whileHover={{ color: "#C91F00", y: -1 }}
                transition={{ duration: 0.15 }}
              >
                {link.label}
              </motion.span>
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </a>
          ))}
        </div>

        {/* Hamburger button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-0.5 rounded-full"
            style={{ backgroundColor: scrolled || menuOpen ? "#1c1a16" : "white" }}
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-6 h-0.5 rounded-full"
            style={{ backgroundColor: scrolled || menuOpen ? "#1c1a16" : "white" }}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-0.5 rounded-full"
            style={{ backgroundColor: scrolled || menuOpen ? "#1c1a16" : "white" }}
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-16 left-0 w-full z-40 sm:hidden bg-background/97 backdrop-blur-md px-6 py-6 flex flex-col gap-5 border-b border-accent/10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/80 text-lg font-medium hover:text-accent transition-colors duration-150"
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
