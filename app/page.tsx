"use client";

import { supabase } from "@/lib/supabase";

export default function Home() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full bg-emerald-500/25 blur-3xl" />
      </div>

      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0,_transparent_60%)] opacity-60" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 px-7 py-8 shadow-2xl shadow-slate-950/80 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500/80 text-xl">
            <span>🔖</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Smart Bookmark
            </p>
            <p className="text-[11px] text-slate-500">
              Sign in to sync your links securely.
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          All your links, in one place.
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Save articles, docs, and tools you care about. Access them from
          anywhere with your Google account.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-50 shadow-md shadow-slate-900/70 transition hover:-translate-y-[1px] hover:border-slate-400 hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {/* Google logo style circle */}
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <span className="text-[13px] leading-none text-slate-900">G</span>
            </span>
            <span>Sign in with Google</span>
          </button>

          <p className="text-center text-[11px] text-slate-500">
            By continuing you agree to our{" "}
            <span className="cursor-pointer text-slate-300 underline underline-offset-2 hover:text-slate-50">
              Terms
            </span>{" "}
            and{" "}
            <span className="cursor-pointer text-slate-300 underline underline-offset-2 hover:text-slate-50">
              Privacy Policy
            </span>
            .
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Encrypted with Supabase Auth
          </span>
          <span>v0.1 • local dev</span>
        </div>
      </div>
    </main>
  );
}
