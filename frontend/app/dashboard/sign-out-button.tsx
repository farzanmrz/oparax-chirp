"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-lg border border-foreground/10 px-4 py-2 text-sm text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground"
    >
      Sign out
    </button>
  );
}
