// Email confirmation handler — users hit this URL when they click the link in their signup email.
import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const redirectTo = request.nextUrl.clone();
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.verifyOtp({ type, token_hash });

      if (!error) {
        redirectTo.pathname = "/dashboard";
        return NextResponse.redirect(redirectTo);
      }
    } catch {
      // Network error or unexpected failure — fall through to error redirect
    }
  }

  redirectTo.pathname = "/";
  redirectTo.searchParams.set("tab", "signup");
  redirectTo.searchParams.set(
    "error",
    "Email confirmation failed. Please try signing up again."
  );
  return NextResponse.redirect(redirectTo);
}
