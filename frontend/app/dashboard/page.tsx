import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const username =
    user.user_metadata?.user_name ??
    user.user_metadata?.preferred_username ??
    "there";

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Oparax
          </span>
          <SignOutButton />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome, @{username}
        </h1>
        <p className="mt-2 text-foreground/60">
          Your dashboard will live here.
        </p>
      </main>
    </div>
  );
}
