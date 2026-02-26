// Login server action — validates form input, calls Supabase signIn, redirects to /dashboard on success.
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { validateAuthForm, isValidationError } from "@/lib/validation";
import { mapAuthError } from "@/lib/auth-errors";

export async function login(formData: FormData) {
  const validated = validateAuthForm(formData);
  if (isValidationError(validated)) {
    redirect(`/?tab=signin&error=${encodeURIComponent(validated.message)}`);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: validated.email,
    password: validated.password,
  });

  if (error) {
    redirect(`/?tab=signin&error=${encodeURIComponent(mapAuthError(error.message))}`);
  }

  redirect("/dashboard");
}
