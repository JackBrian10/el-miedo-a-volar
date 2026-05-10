"use client";

import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { useTheme } from "../lib/ThemeContext";
import type { Locale } from "../lib/translations";

const locales: Locale[] = ["en", "es", "ca"];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.commissions, href: "#commissions" },
    { label: t.nav.contact, href: "#contact" },
  ];

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
          backgroundColor: menuOpen ? "var(--background)" : "rgba(0,0,0,0)",
          backdropFilter: menuOpen ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <a href="#" className="font-bold text-lg tracking-tight bg-gradient-to-r from-accent via-secondary to-foreground bg-clip-text text-transparent">
          elmiedoavolar
        </a>

        {/* Desktop links + language switcher */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium group"
            >
              <motion.span
                className="block"
                animate={{ color: "var(--foreground)" }}
                whileHover={{ color: "#C91F00", y: -1 }}
                transition={{ duration: 0.15 }}
              >
                {link.label}
              </motion.span>
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-foreground/50 hover:text-accent transition-colors duration-150"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>

          {/* Language switcher */}
          <div className="flex items-center gap-1">
            {locales.map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                <button
                  onClick={() => setLocale(l)}
                  className={`text-xs font-semibold tracking-wide uppercase transition-all duration-150 ${
                    locale === l
                      ? "text-accent"
                      : "text-foreground/40 hover:text-accent"
                  }`}
                >
                  {l}
                </button>
                {i < locales.length - 1 && (
                  <span className="text-xs text-foreground/20">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Hamburger button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-0.5 rounded-full"
            style={{ backgroundColor: "var(--foreground)" }}
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block w-6 h-0.5 rounded-full"
            style={{ backgroundColor: "var(--foreground)" }}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-0.5 rounded-full"
            style={{ backgroundColor: "var(--foreground)" }}
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-16 left-0 w-full z-40 sm:hidden bg-background backdrop-blur-md px-6 py-6 flex flex-col gap-5 border-b border-accent/10"
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

            {/* Mobile theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-foreground/60 text-sm hover:text-accent transition-colors duration-150"
            >
              {theme === "light" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>

            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 pt-2 border-t border-accent/10">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`text-sm font-semibold uppercase tracking-wide px-2 py-1 rounded transition-colors duration-150 ${
                    locale === l
                      ? "text-accent bg-accent/10"
                      : "text-foreground/40 hover:text-accent"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
