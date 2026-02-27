"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { validateSignupForm, isValidationError } from "@/lib/validation";
import { mapAuthError } from "@/lib/auth-errors";

export async function signup(formData: FormData) {
  const validated = validateSignupForm(formData);
  if (isValidationError(validated)) {
    redirect(`/signup?error=${encodeURIComponent(validated.message)}`);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: validated.email,
    password: validated.password,
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(mapAuthError(error.message))}`);
  }

  redirect("/signup/check-email");
}
