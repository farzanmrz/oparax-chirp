"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { type LandingCtaName, type LandingCtaPlacement, landingCtas } from "@/lib/landing/content";

export function LandingCta({
  cta,
  placement,
}: {
  cta: LandingCtaName;
  placement: LandingCtaPlacement;
}) {
  const { label, destination } = landingCtas[cta];
  const variant = cta === "sign_up" ? "default" : cta === "log_in" ? "ghost" : "outline";

  function captureActivation() {
    try {
      posthog.capture("landing_cta_clicked", { cta, placement, destination });
    } catch {
      // Link navigation remains available when analytics cannot capture an event.
    }
  }

  return (
    <Button
      asChild
      variant={variant}
      className={
        placement === "header"
          ? "h-11 min-w-11 px-3 desk:h-8"
          : `h-11 min-w-11 px-[18px] text-[15px] desk:h-10 ${
              placement === "hero" ? "w-full desk:w-auto" : ""
            } ${
              cta === "sign_up"
                ? "shadow-[0_0_0_1px_oklch(0.62_0.15_245/0.35),0_14px_40px_oklch(0.62_0.15_245/0.35)]"
                : ""
            }`
      }
    >
      <Link href={destination} onClick={captureActivation}>
        {label}
      </Link>
    </Button>
  );
}
