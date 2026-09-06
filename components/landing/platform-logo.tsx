import { type PlatformKey, platformMarks } from "@/lib/landing/platform-marks";

const tileClasses = {
  youtube: "bg-[#FF0000]",
  reddit: "bg-[#FF4500]",
  bluesky: "bg-[#1185FE]",
  threads: "border border-white/18 bg-black",
  instagram:
    "bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285AEB_100%)]",
  tiktok: "border border-white/18 bg-black",
  linkedin: "bg-[#0A66C2]",
  facebook: "bg-[#1877F2]",
} as const satisfies Record<PlatformKey, string>;

export function PlatformLogo({ platform }: { platform: PlatformKey }) {
  const mark = platformMarks[platform];

  return (
    <span className="flex min-w-0 items-center gap-2 text-[13px] text-text-body">
      <span
        className={`inline-flex size-[22px] shrink-0 items-center justify-center rounded-sm ${tileClasses[platform]}`}
      >
        <svg aria-hidden="true" viewBox={mark.viewBox} className="size-[13px] fill-white">
          <path d={mark.path} />
        </svg>
      </span>
      <span>{mark.name}</span>
    </span>
  );
}
