# Project Brief: Oparax

## What Is This?

Oparax is a social media automation tool for professional news reporters who earn revenue from posting breaking stories on platforms like X (Twitter) and Instagram. It monitors news sources, surfaces what matters, and drafts posts in the user's voice.

## Who Is This For?

**Primary validated user:** Reshad, a football news reporter with 400k+ followers on X earning ~$400/month from X and ~$1,000/month from Instagram.

**Core pain point:** His entire news monitoring workflow is manual — flipping between X, news sites, email alerts, and apps. He physically cannot monitor everything at once and has missed breaking stories as a result.

## Core Requirements

1. **Monitor news sources** — Replicate the user's manual monitoring by tracking who they follow on X, later expanding to websites
2. **Surface breaking news** — Assess newsworthiness and alert the user through preferred channels (WhatsApp, Discord, Telegram, email)
3. **Draft posts in user's voice** — Learn writing style from past posts, generate drafts that match exactly
4. **Enable feedback loop** — Improve through manual edits, AI chat corrections, and accumulated learning
5. **Support auto-posting** — "Yolo mode" for trusted automation, approval mode for review-before-publish

## Scope

**In scope:**
- News Intelligence Pipeline (monitor X accounts → cluster by topic → assess newsworthiness → expand to websites)
- Content Generation Pipeline (learn style → draft posts → improve through feedback → auto-post when trusted)
- Platform support: X first, Instagram later
- Multi-channel alerts and post editing through those channels
- Web interface (starting point), later Mac app and mobile

**Out of scope (for now):**
- Platforms beyond X and Instagram
- Video content generation
- Analytics beyond what's needed for newsworthiness assessment

## What Success Looks Like

1. **Technical validation:** X API search and filtering works for football news monitoring
2. **Product validation:** Reshad trusts the free tier enough to pay $50/month for X automation
3. **Scale validation:** System handles his posting frequency (X: high frequency direct news, Instagram: every ~45 min with detail/stats/images)
4. **Revenue validation:** Converts from free tier to paid, later adds Instagram pipeline

## Philosophy

**Manual-first approach:** Learn how things work by doing them by hand, then automate once understood. Don't skip teaching moments or assume prior knowledge of APIs, auth flows, or deployment.

**Built for a solo founder** rebuilding coding confidence after 8 months away from development.

## Current Stage

Early development. Experimenting with X API v2 Search Recent Posts endpoint to answer foundational questions before building pipelines.