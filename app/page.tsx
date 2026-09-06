import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landing/landing-page";
import { landingContent } from "@/lib/landing/content";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: landingContent.sharing.title,
  description: landingContent.sharing.description,
  openGraph: {
    title: landingContent.sharing.title,
    description: landingContent.sharing.description,
    siteName: landingContent.brand,
    type: "website",
    url: "/",
  },
};

export default async function RootPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/agents");

  return <LandingPage />;
}
