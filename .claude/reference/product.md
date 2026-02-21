# Product Reference

Read this before planning new features or making product scope decisions.

## Validated User

**Reshad** — football news reporter, 400k+ followers on X.

**Current workflow (manual):**
- Flips between X, news sites, email alerts, and apps on phone and laptop simultaneously
- Posts on X with high frequency, direct news style, no commentary bias
- Posts on Instagram every ~45 minutes with more detail, stats, and images
- Earns ~$400/month from X monetization, ~$1,000/month from Instagram

**Core pain point:** He physically cannot monitor everything at once and has missed breaking stories as a result. Missing a story is a direct revenue hit.

**Requirements:**
- AI drafts must match his writing style exactly — non-negotiable
- Needs to see it work on a free tier before paying
- Willing to pay $50/month for X automation if it demonstrably works

## The Two Pipelines

### Pipeline A: News Intelligence

Goal: Never let Reshad miss a breaking story.

```
Phase 1 (current): X API experimentation
  ↓ answer foundational API questions
Phase 2: Followed account monitoring
  ↓ pull who Reshad follows on X → cluster by purpose using LLM
  ↓ monitor for new tweets → assess newsworthiness → alert Reshad
Phase 3: Expanded monitoring
  ↓ add website monitoring alongside X accounts
  ↓ research agents for context on breaking stories
```

**Phase 1 status:**
- [x] Confirmed: can search recent posts by topic query
- [ ] Pending: filter to specific accounts with `from:` operator
- [ ] Pending: query operators for football news
- [ ] Pending: actual rate limits on Basic tier
- [ ] Pending: query testing UI in the frontend

### Pipeline B: Content Generation

Goal: Draft posts in Reshad's voice the moment news breaks.

```
User's past posts → Style learning → Draft generation → Feedback loop → Publish
                                            ↓
              Manual edits / AI chat corrections / Accumulated context
```

**Style learning:** Platform-specific (X vs Instagram) and subject-specific (transfer windows vs match results).

**Feedback modes:**
1. Manual edits to drafts (learn from changes Reshad makes)
2. AI chat corrections (Reshad describes what's wrong)
3. Accumulated context from past drafts (patterns over time)

**Publishing modes:**
- Approval-required (default — Reshad reviews before anything goes live)
- "Yolo mode" — auto-post once Reshad trusts the system

**Status:** Not started. Blocked on Pipeline A being validated first.

## Monetization

| Tier | Price | What's included |
| --- | --- | --- |
| Free | $0 | Limited monitoring, draft generation, manual approval only |
| Paid (X) | $50/month | Full monitoring, unlimited drafts, auto-posting, priority alerts |
| Paid (Instagram add-on) | TBD | Same pipeline for Instagram, additional to X tier |

**Conversion trigger:** Reshad sees the system catch a story he would have missed, and the draft is close enough to publish with minimal editing. That moment of proof drives the upgrade.

## Alert Channels (Future)

Reshad receives alerts and approves/edits drafts through his preferred channel:
- WhatsApp
- Discord
- Telegram
- Email

Same channel used for breaking news alerts, draft review, and quick edits before posting.

## Platforms

| Platform | Status |
| --- | --- |
| Web interface | In progress (frontend scaffolded) |
| X | Primary target |
| Instagram | Future (after X pipeline is validated) |
| Mac app | Future (native experience for monitoring) |
| Mobile (iOS/Android) | Future (on-the-go approvals) |

## What Success Looks Like

1. Reshad never misses a breaking story
2. Drafts sound exactly like he wrote them
3. Time savings are obvious — monitoring and drafting go from hours to minutes
4. He trusts the system enough to enable auto-posting
