"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/?tab=signup&error=${encodeURIComponent(error.message)}`);
  }

  // Email confirmation is enabled — session won't exist yet.
  // User must click the confirmation link in their email.
  redirect("/signup/check-email");
}
