// Root layout — wraps every page in the app. Loads fonts and global CSS.

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { landingContent } from "@/lib/landing/content";
import "./globals.css";

// Hanken Grotesk is the design system's UI font family (--font-sans).
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// JetBrains Mono backs --font-mono: handles, counts, timestamps, money.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Space Grotesk is reserved for draft/post text (--font-draft).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(landingContent.sharing.origin),
  title: landingContent.sharing.title,
  description: landingContent.sharing.description,
  openGraph: {
    siteName: landingContent.brand,
    type: "website",
    title: landingContent.sharing.title,
    description: landingContent.sharing.description,
  },
  twitter: {
    card: "summary_large_image",
    title: landingContent.sharing.title,
    description: landingContent.sharing.description,
    images: [
      {
        url: "/opengraph-image",
        alt: landingContent.sharing.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#121214",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
