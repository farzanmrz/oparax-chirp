// Fixed, illustrative copy shared by the landing page and link previews.
const brand = "Oparax";
const handle = "dana_onmove";
const watchedHandles = ["RivermontTransit", "CityHallRvm"] as const;
const website = "rivermontledger.com";
const postCount = "1,240";
const sourceCount = watchedHandles.length + 1;
const deskName = "Dana's transit desk";
const guideLabel = "Guide";
const storyTitle = "Overnight bus service expands to six routes from October 1";
const headline = ["Follow the news.", "Make it your own."] as const;
const description =
  "For reporters, creators, and anyone who follows the news and publishes: Oparax watches your sources, keeps what fits your focus, and drafts posts in your voice. You decide what goes out.";
const draftBody =
  "Six overnight routes from October 1. Fares stay flat, 40 new drivers coming on. Night-shift riders: which route did you need most? ";
const draftMention = `@${watchedHandles[0]}`;
const draftText = `${draftBody}${draftMention}`;

export const platformNames = {
  youtube: "YouTube",
  reddit: "Reddit",
  bluesky: "Bluesky",
  threads: "Threads",
  instagram: "Instagram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  x: "X",
} as const;

export const landingCtas = {
  sign_up: { label: "Sign up", destination: "/signup" },
  log_in: { label: "Log in", destination: "/login" },
  see_how_it_works: { label: "See how it works", destination: "#how-it-works" },
} as const;
export type LandingCtaName = keyof typeof landingCtas;
export type LandingCtaPlacement = "header" | "hero" | "closing";

export const landingContent = {
  brand,
  hero: { eyebrow: "AI news desk", headline, description },
  monitoring: {
    heading: "It watches the news for you.",
    description:
      "Start with your X handle. Oparax learns your focus and suggests accounts and news sites to watch. Adjust them anytime, and your feed keeps to what belongs.",
  },
  setup: {
    accessibleName: "Dana's example desk: setup",
    title: "Your desk",
    badge: "Example desk",
    handleLabel: "Start with your X handle",
    handlePrefix: "@",
    handle,
    buildButton: "Build my desk",
    helper:
      "One step. Oparax reads your posts, works out your focus, and suggests sources. Adjust anything below.",
    focusLabel: "Your focus",
    learnedBadge: "learned",
    suggestedBadge: "suggested",
    focus:
      "Public transport changes that affect everyday travel in Rivermont. Skip sport, markets and events.",
    accountsLabel: "X accounts to watch",
    watchedHandles,
    websitesLabel: "News websites to watch",
    website,
    websitePrefix: "https://",
    websitePlaceholder: "Paste a website",
    addButton: "+ Add",
    websiteHelper: "Oparax finds the coverage that matches your focus.",
    learned: [
      { emphasis: "Focus and voice", text: ` learned from ${postCount} of your posts` },
      {
        emphasis: `${sourceCount} sources`,
        text: " watched around the clock, filtered to your focus",
      },
    ],
  },
  feed: {
    accessibleName: "Dana's example desk: feed and breaking-news message",
    deskName,
    tabs: [
      { label: "Feed", count: 1, active: true },
      { label: "Skipped", count: 1, active: false },
      { label: guideLabel, count: null, active: false },
      { label: "Sources", count: null, active: false },
    ],
    badge: "Your feed",
    combined: "Combined from 2 sources",
    breaking: "Breaking",
    time: "4 min ago",
    storyTitle,
    facts: [
      {
        mark: "A",
        text: "Six routes, every 30 minutes, midnight to 5am, from October 1.",
        source: `@${watchedHandles[0]}`,
      },
      {
        mark: "B",
        text: "Fares unchanged. 40 new drivers hired for the night network.",
        source: "Rivermont Ledger",
      },
    ],
    relevance: "Fits your focus",
    draftButton: "Draft",
    skippedStory: "Farmers market moves to Sundays through November.",
    skippedReason: "Skipped · not your focus",
    divider: "Breaking news in your X DMs",
    message: {
      name: brand,
      handle: "@oparax",
      time: "now",
      text: "Overnight bus service expands to six routes from October 1. Fares unchanged, 40 new drivers hired.",
      link: "Open in Oparax",
    },
  },
  voice: {
    heading: "It writes like you.",
    description:
      "Your voice is measured from your real posts, never hand-written rules. Switch auto-drafting on and every story arrives with a draft waiting. Review it, change a word, or post it as is.",
  },
  guide: {
    accessibleName: "Dana's example desk: voice guide",
    title: guideLabel,
    aside: `from ${postCount} posts`,
    postHeader: `@${handle} · your post`,
    posts: [
      "Six routes. Every 30 minutes. That's the whole announcement, and it's a good one.",
      "Fares stay flat. Drivers get hired. Riders get home. Which stop still needs a bench?",
    ],
    doLabel: "Do",
    doRules: ["Lead with the number", "End by asking riders a question"],
    avoidLabel: "Avoid",
    avoidRules: ["Hashtags and exclamation marks"],
  },
  draft: {
    accessibleName: "Dana's example desk: drafted story",
    deskName,
    switchLabel: "Auto-drafting on",
    storyTitle,
    body: draftBody,
    mention: draftMention,
    text: draftText,
    characterCount: draftText.length,
    footer: `${draftText.length} chars · drafted in your voice`,
    editButton: "Edit",
    postButton: "Post to X",
    note: "Review, edit, then post. You decide what goes out.",
  },
  roadmap: {
    heading: "Roadmap.",
    description:
      "Today Oparax watches news websites and X accounts and publishes to X. This is where it is going. Longer-term vision, not available today, no dates.",
    cards: [
      {
        title: "Watch more platforms",
        description: "Follow your beat where it actually moves, alongside X and the web.",
        platforms: ["youtube", "reddit", "bluesky", "threads", "instagram", "tiktok"],
      },
      {
        title: "Publish to more places",
        description: "One story, written for each audience you publish to, alongside X.",
        platforms: ["linkedin", "threads", "bluesky", "reddit", "facebook", "instagram"],
      },
      {
        title: "Express your perspective",
        description:
          "Posts that reflect your views, your values, and what matters to you, with the facts intact.",
        platforms: [],
      },
      {
        title: "Publish autonomously",
        description: "Let Oparax publish for you, when you choose and by the rules you set.",
        platforms: [],
      },
    ],
  },
  close: {
    heading: "Build your news desk.",
    description:
      "Connect your X account, add the sites and accounts you follow, and watch the first story land.",
  },
  footer: "For people who follow the news and publish.",
  sharing: {
    title: `${brand} | ${headline.join(" ")}`,
    description,
    alt: `${brand}. ${headline.join(" ")}`,
    domain: "oparax.ai",
    origin: "https://oparax.ai",
  },
} as const;
