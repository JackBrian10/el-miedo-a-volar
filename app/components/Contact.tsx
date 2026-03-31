"use client";

import { motion } from "framer-motion";

export const Contact = () => {
  return (
    <div className="w-full py-24 px-6 bg-[#f5efe6]">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground mb-3">Contact Me</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-foreground/50 text-sm">
            Have a project in mind? Let&apos;s create something magical together.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-accent/10">
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submitted — backend coming soon");
            }}
          >
            <div className="flex flex-col gap-1">
              <label className="text-foreground/70 text-sm font-medium" htmlFor="name">
                Name
              </label>
              <input
                className="bg-background border border-foreground/10 rounded-lg p-3 text-foreground placeholder:text-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors duration-200"
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-foreground/70 text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                className="bg-background border border-foreground/10 rounded-lg p-3 text-foreground placeholder:text-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors duration-200"
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-foreground/70 text-sm font-medium" htmlFor="message">
                Message
              </label>
              <textarea
                className="bg-background border border-foreground/10 rounded-lg p-3 text-foreground placeholder:text-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors duration-200 resize-none"
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <motion.button
              className="bg-accent text-background font-bold py-3 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors duration-200 mt-2"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
