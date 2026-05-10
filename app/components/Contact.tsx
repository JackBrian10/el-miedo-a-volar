"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";

type Status = "idle" | "sending" | "success" | "error";

export const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const timer = setTimeout(() => setStatus("idle"), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  function removeFile() {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Send failed");
      setStatus("success");
      form.reset();
      setPreview(null);
    } catch {
      setStatus("error");
    }
  }

  const disabled = status === "sending";

  return (
    <>
      <div className="w-full py-24 px-6 bg-[#f5efe6]">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-foreground mb-3">{t.contact.heading}</h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
            <p className="text-foreground/50 text-sm">{t.contact.subheading}</p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-accent/10">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="text-foreground/70 text-sm font-medium" htmlFor="name">
                  {t.contact.name}
                </label>
                <input
                  className="bg-background border border-foreground/10 rounded-lg p-3 text-foreground placeholder:text-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors duration-200"
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t.contact.namePlaceholder}
                  required
                  disabled={disabled}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-foreground/70 text-sm font-medium" htmlFor="email">
                  {t.contact.email}
                </label>
                <input
                  className="bg-background border border-foreground/10 rounded-lg p-3 text-foreground placeholder:text-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors duration-200"
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t.contact.emailPlaceholder}
                  required
                  disabled={disabled}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-foreground/70 text-sm font-medium" htmlFor="message">
                  {t.contact.message}
                </label>
                <textarea
                  className="bg-background border border-foreground/10 rounded-lg p-3 text-foreground placeholder:text-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-colors duration-200 resize-none"
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  required
                  disabled={disabled}
                />
              </div>

              {/* Image upload */}
              <div className="flex flex-col gap-2">
                <label className="text-foreground/70 text-sm font-medium">
                  {t.contact.imageSample}
                </label>

                <input
                  ref={fileRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={disabled}
                />

                {!preview ? (
                  <label
                    className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-foreground/15 rounded-xl p-6 cursor-pointer hover:border-accent/50 transition-colors duration-200 ${disabled ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={() => fileRef.current?.click()}
                  >
                    <svg className="w-8 h-8 text-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m-4 4h8M4 16l4-4-4-4M20 16l-4-4 4-4" />
                      <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth={1.5} />
                    </svg>
                    <span className="text-foreground/40 text-sm">{t.contact.imageUploadHint}</span>
                  </label>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-foreground/10">
                    <img src={preview} alt="Sample" className="w-full max-h-64 object-cover" />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-black/80 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <motion.button
                className="bg-accent text-background font-bold py-3 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                whileHover={{ scale: disabled ? 1 : 1.02 }}
                whileTap={{ scale: disabled ? 1 : 0.97 }}
                disabled={disabled}
              >
                {disabled ? t.contact.sending : t.contact.send}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-lg text-sm font-medium ${
              status === "success"
                ? "bg-foreground text-background"
                : "bg-accent text-white"
            }`}>
              {status === "success" ? (
                <svg className="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {status === "success" ? t.contact.successMessage : t.contact.errorMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
