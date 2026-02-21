"use client";

import { createClient } from "@/lib/supabase/client";

export default function Home() {
  async function handleSignIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm px-6">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-foreground">
          Oparax
        </h1>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8">
          <p className="mb-6 text-center text-sm text-foreground/60">
            Sign in to get started
          </p>

          <button
            type="button"
            onClick={handleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5 fill-current"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Continue with X
          </button>
        </div>
      </div>
    </div>
  );
}
