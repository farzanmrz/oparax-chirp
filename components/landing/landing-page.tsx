import { LandingClose } from "@/components/landing/landing-close";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingMonitoring } from "@/components/landing/landing-monitoring";
import { LandingRoadmap } from "@/components/landing/landing-roadmap";
import { LandingVoice } from "@/components/landing/landing-voice";

export function LandingPage() {
  return (
    <div className="ph-no-autocapture min-h-dvh bg-background text-text-title">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingMonitoring />
        <LandingVoice />
        <LandingRoadmap />
        <LandingClose />
      </main>
      <LandingFooter />
    </div>
  );
}
