"use client";

import { useState } from "react";
import { supabaseAuth as supabase } from "../../lib/supabase-auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.webp"
          alt="el miedo a volar"
          className="h-48 w-auto mx-auto mb-8"
          style={{ mixBlendMode: "multiply" }}
        />

        <h1 className="text-2xl font-bold text-foreground text-center mb-8">Admin</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-foreground/60 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-card border border-accent/20 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-foreground/60 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-card border border-accent/20 rounded-xl px-4 py-3 text-foreground text-sm outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-accent text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-accent text-white font-bold py-3 rounded-full text-sm tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
