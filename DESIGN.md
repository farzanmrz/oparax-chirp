# Oparax Design System

`DESIGN.md` is the living contract for Oparax product UI. `app/globals.css` is its production token source; components consume those custom properties rather than re-deriving values.

## Tokens

| Role | Token | Value |
| --- | --- | --- |
| Page ground | `--page-bg` | `#0c0c0e` |
| Header ground | `--header-bg` | `#121214` |
| Card gradient | `--card-grad-top` → `--card-grad-bottom` | `oklch(0.2 0.006 260)` → `oklch(0.172 0.004 260)` |
| Card border | `--card-border` | `rgba(255,255,255,0.13)` |
| Band fill / rule | `--band-bg` / `--band-border` | `rgba(255,255,255,0.045)` / `rgba(255,255,255,0.09)` |
| Draft zone | `--draft-bg` / `--draft-border-top` | `oklch(0.24 0.015 250)` / `oklch(0.62 0.15 245 / 0.28)` |
| Action blue | `--accent` | `oklch(0.62 0.15 245)` |
| Success green | `--success` | `oklch(0.78 0.17 155)` |
| Warning amber | `--warn` | `oklch(0.8 0.14 76)` |
| Stale amber | `--warn-stale` | `oklch(0.66 0.04 76)` |
| Danger red | `--danger` | `oklch(0.66 0.2 25)` |
| Title / body / draft | `--text-title` / `--text-body` / `--text-draft` | `oklch(0.97 0.008 95)` / `oklch(0.74 0.012 90)` / `oklch(0.95 0.004 95)` |
| Content width / gutters | `--content-max` / `--gutter-mobile` / `--gutter-web` | `1356px` / `16px` / `6px` |
| Page rhythm | `--page-rhythm-mobile` / `--page-rhythm-web` | `16px` / `24px` |
| Source-strip height | `--strip-h-mobile` / `--strip-h-web` | `38px` / `32px` |
| Post height | `--post-h-mobile` / `--post-h-web` | `44px` / `30px` |
| Draft footer gap | `--draft-footer-gap-mobile` / `--draft-footer-gap-web` | `8px` / `1px` |
| Mobile char-label gap | `--char-count-gap-mobile` | `4px` |

## Radius Language

Cards use 10px (`rounded-lg`), controls and inputs use 6px (`rounded-md`), tags use 5px (`rounded-sm`), and count badges use 4px (`rounded-badge`). The only circles are avatars and status dots; controls, chips, tags, and badges are rounded rectangles.

## Card Anatomy

Every non-feed card uses the shared gradient, 1px border, 10px radius, and blue-backlit shadow. Its full-bleed header band uses 12px vertical and 24px horizontal padding, a bottom rule, 15px/500 ice-blue text, and a 22px square icon tile. Danger cards keep the same anatomy with a red border, red title, and faint red band fill. Card content uses 20px vertical and 24px horizontal padding.

## Feed Card Anatomy

The feed card is one 10px gradient card with three stacked zones: a source-tinted strip, the story body, and a blue-tinted draft zone. The source strip carries the source identity, freshness, alert slot, and menu; its leading icon is a fixed 15px slot for every source kind — the X logo, or a website favicon/globe fallback centered on a rounded 3px neutral light tile — so the strip's leading edge never shifts and dark logos stay legible. Website sources display their onboarded publication name ("Mundo Deportivo") and fall back to the www-stripped hostname; the story body carries only the title and synthesis; the draft zone carries the editable post text, count and edited state, and posting control. The draft editor height follows rendered content and reflows with width and breakpoint changes, with no clipping, overlap, reserved textarea floor, or spacer. When unfocused, the draft display styles @mentions, #hashtags, URLs, and recognized X entities in action blue; native editing preserves the raw text. Saved Guide quoted real-post examples use the same treatment; ordinary guide prose remains unaffected. Source access belongs in the menu, not inline in the body.

An undrafted card has no draft zone. Its single action is a primary Draft control at the end of the story body, 30px and right-aligned on web, and a full-width 44px card footer on mobile. While writing, it reads Drafting… at 50% opacity and a shimmer draft zone appears below; on failure, a red one-line reason appears under the control. Once drafted, it becomes the drafted card described above.

The reasoning sheet is user-facing: its title is Brain icon + Reasoning, with no eyebrow or helper copy, followed by an Info introduction and the persisted beat-match explanation. For newly generated drafts, `model_calls.usage.draftConstruction` also records a versioned editorial account of the selected post mode, the guide rules applied, and the formatting choices, each with a concise explanation; this is structured reporter-facing provenance, not hidden chain-of-thought. Historic drafts may show that construction details were not recorded, and an edited draft labels the account as belonging to the original model draft. The sheet omits duplicated title, synthesis, and draft content as well as raw provider traces, JSON, and markdown.

The desk tab and page heading use the same PenLine identity and the name Guide. Guide card headers use semantic section icons, while legacy `Hard Rules — Always` and `Hard Rules — Never` are grouped visually as a single Rules card with Do and Avoid subsections; this compatibility presentation does not change stored guide content or its drafting/audit order.

## Semantic Color Meanings

Blue means action, linking, and composing. Green means live, posted, or connected. Amber means freshness, caution or an edited-draft state, and states or actions that are uncertain, unconfirmed, or in progress. Red means deleted-source or destructive action. These meanings are stable across all states and pages.

## Type Scale

Hanken Grotesk is the UI face, Space Grotesk is reserved for draft/post text, and JetBrains Mono is reserved for counts and timestamps. Page headers are 21px/700 with -0.015em tracking; card-band headers are 15px/500; feed titles are 20px/600 with 1.3 line height and -0.017em tracking; synthesis is 14.5px with 1.6 line height; draft text is 16.5px with 1.52 line height; source-strip names are 13.5px with 13px times (14.5px and 14px below 700px); counts are 11.5px.

Page and card headers use Title Case. `PageHeading` pairs a 20px icon and its title at 8px, with 12px between the title group and heading actions. Do not use all-caps headings, eyebrow copy, or helper subtitles below redesigned headers; ordinary form labels remain explicit. Owner-decided exception: the create-agent form's field labels carry always-visible helper text below them (12px muted) in place of the removed info-icon hover tooltips, which were undiscoverable on mobile.

## Form Fields

Create-agent field labels carry always-visible helper text (the recorded exception above); placeholders are short native examples only, never instructions — the helper text carries the instruction. X-account and website fields are single-line add fields with committed source chips above them, sharing one component with Sources; they keep an inline + Add control and disable autocapitalize/autocorrect/spellcheck, with the URL keyboard on website fields. Create-form chips share one quiet surface, wrap in reading order, and keep in-layout remove controls. Agent names cap at 30 characters, enforced with a live red under-field error in the login-form style. The connected X-account row shows the green dot and @handle only. Sources website rows use two readable lines: an onboarded publication name (or the domain while onboarding has not resolved) above a muted, scheme-free, leading-`www.`-free domain/path; long paths wrap naturally. Their fixed 15px favicon/globe slot uses the same neutral light tile as the feed strip.

## Touch Targets

Under 700px, every touch control has a hit area of at least 44px in both dimensions. Icon chrome may remain 24–30px inside that hit area. Icon-only controls require an accessible label and visible focus treatment.

## Responsive Rules

The shared `desk` breakpoint is 700px. Desktop content is at most 1356px wide with 6px gutters and 24px page rhythm; mobile uses 16px gutters and 16px page rhythm. Redesigned surfaces use `desk:` responsive gates, never `md:`. Sources keep intentional 8px source-row gaps, 44px mobile and 36px desk row heights, and a 16px offset before each add-source field. Guide masonry uses the shared 16px/24px rhythm for both columns and card separation.

Below 700px, feed titles are 17.5px, synthesis is 13.5px, draft text is 15px, source strips grow from 32px to 38px, and Post becomes a full-width 44px footer with an 8px gap after the draft text. The regular Post action carries compact, quiet left-side `N chars` metadata with a balanced 4px separation and no divider rather than in a standalone row; web retains a separate count. Source names and times never truncate on mobile; source alerts become icon-only popovers. On web, the alert truncates first, then time, then source name.

The app header has three mobile stages tied to the inner application scroller: full at or above 90px from the top, fully hidden while scrolling down, and tabs-only while scrolling up mid-page. The web header remains pinned. The mobile transformation runs for 260ms; hidden uses `translateY(-101%)` and tabs-only uses `translateY(-57px)`.

## Marketing Surfaces

The public landing page and any future marketing page are built from the same materials as the product, then allowed to breathe. Owner decision 2026-09-05, from the landing redesign exploration: the product's tokens are not a ceiling on liveliness; monotony is what makes a page bland, not the palette. These rules record what worked.

- **Same materials, larger stage.** Every token above applies unchanged: page ground, header ground, card gradient, card border, band anatomy, radius language, the three faces. What changes is scale and rhythm. Marketing headlines use Hanken Grotesk at 56 to 64px (700, -0.03em tracking) for the page promise, 38 to 44px for section titles, and 17 to 19px body at 1.5 line height. Product scale (21px page headers, 15px band headers, 14.5px synthesis) is used only inside components that depict the product itself, so a mock desk on the page looks exactly like the desk.
- **Blue is light, not paint.** The action blue never fills a section. It appears as the primary call to action, as text highlights (the second line of a headline, an A or B source mark, a link), and as a restrained backlit glow: a radial wash of `--accent` at 12 to 16% opacity behind the hero or the closing call, and the existing card shadow's blue component around the primary button. Sections are told apart by alternating `--page-bg` and `--header-bg` grounds and by their headers, never by colored backgrounds.
- **Semantic colors are states inside components, never decoration.** Green marks connected, watching, live and posted. Amber marks onboarding, edited, freshness and breaking (breaking is fresh and unconfirmed, so it is amber, not red). Red stays with destructive and deleted-source states and does not appear on marketing pages. Blue marks actions and source attribution. Every colored badge is the semantic color as text on that color at 12 to 16% alpha (`badge-green`, `badge-amber`, `badge-blue`); neutral badges are white at 6% with muted text; outline badges use the input border. Relevance ("fits your focus") is neutral, because relevance is not a connection state.
- **Brand color is content.** Third-party platform logos may carry their native brand colors, only inside small neutral slots (22 to 30px tiles, 5 to 7px radius) beside a readable platform name, and only where the platform itself is the content (a roadmap card). They never tint surrounding surfaces.
- **Liveliness comes from tinting the system, and from components chosen for fit.** The product uses its semantic colors mostly as solids: a dot, a button, a line of text. A marketing page is allowed one small tweak in that same direction: the existing colors appear as translucent layers. Badges and marks are the semantic color as text on the same color at 12 to 16% alpha; the primary button carries the blue backlit glow; the hero and the closing call sit on a faint radial wash of the accent; identity tiles and avatar stacks use the same neutral light tile the feed strip already uses. Cards get a little more air than product density and one clear piece of content each. Component variety is welcome, drawn from the whole shadcn library on the same tokens, but each component is chosen because it is the natural way to show that piece of the product (a switch for a setting, a tab row for a desk, a badge for a state, a chip for a source), and the components inside one composition must belong together as they would in the real product. A composition that mixes components with no shared logic reads as confusion, however lively; a page that repeats one component at product density reads as a settings screen.
- **One example, carried through.** A single labeled sample (one person, one desk, one focus, one story) recurs in every section so the page reads as one narrative. The label "Example desk" sits inside the depicted product frame, not in a caption.
- **Text lives in one place.** Section headers carry the explanation. Inside a card, text is a band header, a label, or the card's content. There are no captions beneath cards.
