import { CheckIcon, GlobeIcon, PenLineIcon, UserRoundIcon, XIcon } from "lucide-react";
import { BandCard } from "@/components/band-card";
import { OparaxMark } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { landingContent } from "@/lib/landing/content";
import { x } from "@/lib/landing/platform-marks";

const cardClassName =
  "min-w-0 overflow-hidden rounded-lg border border-[var(--card-border)] bg-[linear-gradient(180deg,var(--card-grad-top),var(--card-grad-bottom))] shadow-[var(--card-shadow)]";

const disabledInputGroupClassName =
  "rounded-md bg-[var(--input-bg)] has-disabled:bg-[var(--input-bg)] has-disabled:opacity-100 dark:bg-[var(--input-bg)] dark:has-disabled:bg-[var(--input-bg)]";

const disabledInputClassName =
  "font-mono text-text-title disabled:bg-transparent disabled:opacity-100 dark:disabled:bg-transparent";

function SourceIdentity({ kind, muted = false }: { kind: "x" | "web"; muted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-[15px] shrink-0 items-center justify-center rounded-[3px] bg-[oklch(0.93_0.004_95)] text-[#111] ${muted ? "opacity-60" : ""}`}
    >
      {kind === "x" ? (
        <svg aria-hidden="true" className="size-2.5" fill="currentColor" viewBox={x.viewBox}>
          <path d={x.path} />
        </svg>
      ) : (
        <GlobeIcon className="size-2.5" strokeWidth={2.4} />
      )}
    </span>
  );
}

function CheckTile({ negative = false }: { negative?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-[18px] shrink-0 items-center justify-center rounded-badge ${
        negative ? "bg-white/7 text-text-muted" : "bg-success/16 text-success"
      }`}
    >
      {negative ? (
        <XIcon className="size-[11px]" strokeWidth={3} />
      ) : (
        <CheckIcon className="size-[11px]" strokeWidth={3} />
      )}
    </span>
  );
}

function FactMark({ children }: { children: string }) {
  return (
    <span className="mr-2 inline-flex size-[18px] shrink-0 items-center justify-center rounded-badge bg-primary/22 font-mono text-[11px] text-[oklch(0.86_0.1_245)] [vertical-align:1px]">
      {children}
    </span>
  );
}

export function LandingSetupExample() {
  const setup = landingContent.setup;

  return (
    <figure aria-label={setup.accessibleName} className="min-w-0">
      <BandCard
        className="min-w-0"
        headerAside={
          <Badge
            className="border-transparent bg-white/6 text-[11.5px] text-text-muted"
            variant="outline"
          >
            {setup.badge}
          </Badge>
        }
        icon={<UserRoundIcon />}
        title={setup.title}
      >
        <div className="flex min-w-0 flex-col gap-[18px]">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="text-[13.5px] font-medium text-text-label">{setup.handleLabel}</span>
            <InputGroup className={`h-10 ${disabledInputGroupClassName}`}>
              <InputGroupAddon className="border-r border-input bg-white/3 px-3 font-mono text-text-muted">
                {setup.handlePrefix}
              </InputGroupAddon>
              <InputGroupInput
                aria-label={setup.handleLabel}
                className={`min-w-0 px-3 text-[14.5px] ${disabledInputClassName}`}
                disabled
                value={setup.handle}
              />
              <Button
                className="h-full shrink-0 rounded-l-none px-3 text-[13.5px] disabled:opacity-100"
                disabled
                type="button"
              >
                {setup.buildButton}
              </Button>
            </InputGroup>
            <span className="mt-0.5 text-[13px] leading-[1.45] text-text-label">
              {setup.helper}
            </span>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="flex flex-wrap items-center gap-2 text-[13.5px] font-medium text-text-label">
              {setup.focusLabel}
              <Badge
                className="h-5 border-transparent bg-primary/18 text-[11.5px] text-[oklch(0.84_0.11_245)]"
                variant="outline"
              >
                {setup.learnedBadge}
              </Badge>
            </span>
            <div className="rounded-md border border-input bg-[var(--input-bg)] px-3 py-2.5 text-[14.5px] leading-[1.5] text-text-title">
              {setup.focus}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="flex flex-wrap items-center gap-2 text-[13.5px] font-medium text-text-label">
              {setup.accountsLabel}
              <Badge
                className="h-5 border-transparent bg-primary/18 text-[11.5px] text-[oklch(0.84_0.11_245)]"
                variant="outline"
              >
                {setup.suggestedBadge}
              </Badge>
            </span>
            <div className="flex min-w-0 flex-wrap gap-2">
              {setup.watchedHandles.map((handle) => (
                <span
                  className="inline-flex h-[30px] max-w-full min-w-0 items-center gap-[7px] rounded-sm border border-[var(--band-border)] bg-[var(--chip-x-bg)] py-0 pr-2.5 pl-[7px] font-mono text-[13px] text-text-title"
                  key={handle}
                >
                  <SourceIdentity kind="x" />
                  <span className="min-w-0 overflow-hidden text-ellipsis">{handle}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="flex flex-wrap items-center gap-2 text-[13.5px] font-medium text-text-label">
              {setup.websitesLabel}
              <Badge
                className="h-5 border-transparent bg-primary/18 text-[11.5px] text-[oklch(0.84_0.11_245)]"
                variant="outline"
              >
                {setup.suggestedBadge}
              </Badge>
            </span>
            <div className="flex min-w-0 flex-wrap gap-2">
              <span className="inline-flex h-[30px] max-w-full min-w-0 items-center gap-[7px] rounded-sm border border-[var(--band-border)] bg-[var(--chip-web-bg)] py-0 pr-2.5 pl-[7px] font-mono text-[13px] text-text-handle-news">
                <SourceIdentity kind="web" />
                <span className="min-w-0 overflow-hidden text-ellipsis">{setup.website}</span>
              </span>
            </div>
            <InputGroup className={`mt-1 h-9 ${disabledInputGroupClassName}`}>
              <InputGroupAddon className="border-r border-input bg-white/3 px-3 font-mono text-text-muted">
                {setup.websitePrefix}
              </InputGroupAddon>
              <InputGroupInput
                aria-label={setup.websitesLabel}
                className={`min-w-0 px-3 text-[13.5px] placeholder:text-text-muted ${disabledInputClassName}`}
                disabled
                placeholder={setup.websitePlaceholder}
              />
              <Button
                className="h-full shrink-0 rounded-l-none px-3 text-[13.5px] text-primary disabled:opacity-100"
                disabled
                type="button"
                variant="ghost"
              >
                {setup.addButton}
              </Button>
            </InputGroup>
            <span className="mt-0.5 text-[13px] leading-[1.45] text-text-label">
              {setup.websiteHelper}
            </span>
          </div>

          <div className="mt-1 flex flex-col gap-2 rounded-md border border-primary/25 bg-primary/8 px-3.5 py-3">
            {setup.learned.map((item) => (
              <div
                className="flex items-start gap-2 text-[13.5px] leading-[1.45] text-text-body"
                key={item.emphasis}
              >
                <CheckTile />
                <span>
                  <strong className="font-semibold text-text-title">{item.emphasis}</strong>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </BandCard>
    </figure>
  );
}

export function LandingFeedExample() {
  const feed = landingContent.feed;

  return (
    <figure aria-label={feed.accessibleName} className={cardClassName}>
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 border-b border-border bg-[var(--header-bg)] px-3 py-2 desk:h-[52px] desk:flex-nowrap desk:px-4 desk:py-0">
        <span className="flex shrink-0 items-center gap-2 text-[13.5px] font-semibold text-text-title">
          <span aria-hidden="true" className="size-2 rounded-full bg-success" />
          {feed.deskName}
        </span>
        <div className="order-last flex h-9 w-full min-w-0 overflow-x-auto [scrollbar-width:none] desk:order-none desk:ml-1.5 desk:h-[52px] desk:w-auto desk:flex-1 [&::-webkit-scrollbar]:hidden">
          {feed.tabs.map((tab) => (
            <span
              aria-current={tab.active ? "page" : undefined}
              className={`flex h-full shrink-0 items-center gap-1.5 border-b-2 px-[7px] text-[12.5px] ${
                tab.active ? "border-primary text-text-title" : "border-transparent text-text-muted"
              }`}
              key={tab.label}
            >
              {tab.label}
              {tab.count === null ? null : (
                <span
                  className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-badge px-[5px] font-mono text-[11px] ${
                    tab.active ? "bg-primary text-primary-foreground" : "bg-muted text-text-muted"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          ))}
        </div>
        <Badge
          className="ml-auto border-transparent bg-white/6 text-[11.5px] text-text-muted"
          variant="outline"
        >
          {feed.badge}
        </Badge>
      </div>

      <div className="flex min-w-0 flex-col gap-3 bg-[var(--page-bg)] p-3 desk:p-[18px]">
        <article className={`${cardClassName} shadow-none!`}>
          <div className="flex min-h-8 min-w-0 flex-wrap items-center gap-2 border-b border-[var(--band-border)] bg-[image:var(--strip-x-grad)] px-3 py-1 text-[12.5px] text-text-label desk:px-4">
            <span aria-hidden="true" className="flex shrink-0">
              <span className="relative z-10 flex size-5 items-center justify-center rounded-full border-2 border-[var(--card-grad-bottom)] bg-[oklch(0.93_0.004_95)] text-[#111]">
                <svg
                  aria-hidden="true"
                  className="size-2.5"
                  fill="currentColor"
                  viewBox={x.viewBox}
                >
                  <path d={x.path} />
                </svg>
              </span>
              <span className="-ml-[7px] flex size-5 items-center justify-center rounded-full border-2 border-[var(--card-grad-bottom)] bg-[oklch(0.86_0.08_85)] text-[#111]">
                <GlobeIcon className="size-2.5" strokeWidth={2.4} />
              </span>
            </span>
            <span className="min-w-0">{feed.combined}</span>
            <Badge
              className="h-[18px] border-transparent bg-warning/14 px-2 text-[10.5px] text-warning"
              variant="outline"
            >
              <span aria-hidden="true" className="size-[5px] rounded-full bg-warning" />
              {feed.breaking}
            </Badge>
            <span className="ml-auto shrink-0 font-mono text-xs text-warning">{feed.time}</span>
          </div>

          <div className="min-w-0 px-[14px] py-[18px] desk:px-6 desk:pb-5">
            <h3 className="text-pretty text-[17.5px] leading-[1.3] font-semibold tracking-[-0.017em] text-text-title desk:text-xl">
              {feed.storyTitle}
            </h3>
            <ul className="mt-2.5 space-y-1 text-[13.5px] leading-[1.6] text-text-body desk:text-[14.5px]">
              {feed.facts.map((fact) => (
                <li className="flex items-start" key={fact.mark}>
                  <FactMark>{fact.mark}</FactMark>
                  <span className="min-w-0">{fact.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3.5 flex min-w-0 flex-wrap items-center justify-between gap-2 border-t border-[var(--band-border)] pt-3">
              <div className="flex min-w-0 flex-wrap gap-2">
                {feed.facts.map((fact) => (
                  <Badge
                    className="max-w-full border-transparent bg-primary/18 text-[oklch(0.84_0.11_245)]"
                    key={fact.mark}
                    variant="outline"
                  >
                    <span className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-badge bg-primary/22 font-mono text-[10px]">
                      {fact.mark}
                    </span>
                    <span className="min-w-0 overflow-hidden text-ellipsis">{fact.source}</span>
                  </Badge>
                ))}
                <Badge variant="outline">{feed.relevance}</Badge>
              </div>
              <Button
                className="h-[30px] shrink-0 px-3 text-[13px] disabled:opacity-100"
                disabled
                type="button"
              >
                {feed.draftButton}
              </Button>
            </div>
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-2.5 border-t border-[var(--band-border)] px-3.5 py-2.5 text-[13.5px] text-text-muted">
            <SourceIdentity kind="web" muted />
            <span className="min-w-[12rem] flex-1">{feed.skippedStory}</span>
            <Badge
              className="max-w-full border-transparent bg-white/6 text-text-muted"
              variant="outline"
            >
              {feed.skippedReason}
            </Badge>
          </div>
        </article>

        <div className="flex items-center gap-2.5 px-1 py-1 font-mono text-xs tracking-[0.06em] text-text-label uppercase">
          <span className="shrink-0">{feed.divider}</span>
          <span aria-hidden="true" className="h-px min-w-0 flex-1 bg-[var(--band-border)]" />
        </div>

        <div className="flex min-w-0 items-start gap-3 px-1 pb-1.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--band-border)] bg-secondary text-text-title">
            <OparaxMark className="size-5" />
          </span>
          <div className="min-w-0 flex-1 rounded-[14px_14px_14px_4px] border border-[var(--card-border)] bg-[var(--card-grad-top)] px-3.5 py-3">
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-[12.5px] text-text-muted">
              <strong className="font-semibold text-text-title">{feed.message.name}</strong>
              <span>{feed.message.handle}</span>
              <span className="ml-auto font-mono">{feed.message.time}</span>
            </div>
            <p className="mt-1.5 text-[15px] leading-[1.5] text-text-title">{feed.message.text}</p>
            <span className="mt-1.5 block text-sm text-primary">{feed.message.link}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

export function LandingGuideExample() {
  const guide = landingContent.guide;

  return (
    <figure aria-label={guide.accessibleName} className="min-w-0">
      <BandCard
        className="min-w-0"
        headerAside={<span className="font-mono text-xs text-text-count">{guide.aside}</span>}
        icon={<PenLineIcon />}
        title={guide.title}
      >
        <div className="flex flex-col gap-2.5">
          {guide.posts.map((post) => (
            <div
              className="rounded-md border border-[var(--band-border)] bg-white/3 px-3 py-2.5 font-draft text-sm leading-[1.5] text-text-body"
              key={post}
            >
              <span className="mb-1 block font-mono text-[11.5px] text-text-count">
                {guide.postHeader}
              </span>
              {post}
            </div>
          ))}

          <div className="mt-2 text-xs font-semibold tracking-[0.06em] text-text-muted uppercase">
            {guide.doLabel}
          </div>
          {guide.doRules.map((rule) => (
            <div className="flex items-center gap-2.5 py-1 text-[14.5px] text-text-body" key={rule}>
              <CheckTile />
              {rule}
            </div>
          ))}

          <div className="mt-1 text-xs font-semibold tracking-[0.06em] text-text-muted uppercase">
            {guide.avoidLabel}
          </div>
          {guide.avoidRules.map((rule) => (
            <div className="flex items-center gap-2.5 py-1 text-[14.5px] text-text-body" key={rule}>
              <CheckTile negative />
              {rule}
            </div>
          ))}
        </div>
      </BandCard>
    </figure>
  );
}

export function LandingDraftExample() {
  const draft = landingContent.draft;

  return (
    <figure aria-label={draft.accessibleName} className={cardClassName}>
      <div className="flex min-h-8 min-w-0 flex-wrap items-center gap-2 border-b border-[var(--band-border)] bg-[image:var(--strip-x-grad)] px-3.5 py-1 text-[12.5px] text-text-label desk:px-4">
        <span aria-hidden="true" className="size-2 rounded-full bg-success" />
        <span className="min-w-0">{draft.deskName}</span>
        <span className="ml-auto flex shrink-0 items-center gap-2">
          <Switch
            aria-label={draft.switchLabel}
            checked
            className="data-disabled:cursor-default data-disabled:opacity-100 [&[data-state=checked]]:bg-primary [&_[data-slot=switch-thumb]]:bg-background! [&_[data-slot=switch-thumb][data-state=checked]]:translate-x-[calc(100%-2px)]"
            disabled
          />
          {draft.switchLabel}
        </span>
      </div>

      <div className="px-[14px] pt-4 pb-3.5 desk:px-6">
        <h3 className="text-pretty text-[17.5px] leading-[1.3] font-semibold tracking-[-0.017em] text-text-title desk:text-xl">
          {draft.storyTitle}
        </h3>
      </div>

      <div className="border-t border-[var(--draft-border-top)] bg-draft-bg px-[14px] py-4 desk:px-6">
        <p className="font-draft text-[15px] leading-[1.52] text-text-draft desk:text-[16.5px]">
          {draft.body}
          <span className="text-primary">{draft.mention}</span>
        </p>
        <div className="mt-3 flex min-w-0 flex-col gap-3 desk:flex-row desk:items-center desk:justify-between">
          <span className="font-mono text-[11.5px] text-text-count">{draft.footer}</span>
          <span className="flex flex-wrap items-center gap-2 desk:justify-end">
            <Button
              className="h-[30px] px-3 text-[13px] disabled:opacity-100"
              disabled
              type="button"
              variant="outline"
            >
              {draft.editButton}
            </Button>
            <Button
              className="h-[30px] px-3 text-[13px] disabled:opacity-100"
              disabled
              type="button"
            >
              {draft.postButton}
            </Button>
          </span>
        </div>
      </div>

      <div className="px-[14px] py-3.5 text-[13.5px] text-text-label desk:px-6">{draft.note}</div>
    </figure>
  );
}
