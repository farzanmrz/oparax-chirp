# System Patterns

## Architecture Overview

Oparax Chirp is built around two core pipelines that work independently but complement each other.

### Pipeline A: News Intelligence

```
X Accounts → Cluster by Purpose → Monitor for New Tweets → Assess Newsworthiness → Alert User
     ↓
Websites (Phase 3) → Research Agents → Context Enrichment
```

**Phase 1 (current):** X API v2 Search Recent Posts experimentation
**Phase 2:** Pull followed accounts → LLM clustering → Monitor → Assess
**Phase 3:** Add website monitoring and research agents

### Pipeline B: Content Generation

```
User's Past Posts → Style Learning → Draft Generation → Feedback Loop → Publish
                                              ↓
                        Manual Edits / AI Chat / Accumulated Context
```

**Style learning:** Platform-specific (X vs Instagram) + Subject-specific (transfers vs match results)

**Feedback modes:**
1. Manual edits to drafts
2. AI chat-based corrections
3. Accumulated context from past drafts

**Publishing modes:**
- Approval-required (default)
- "Yolo mode" (auto-post when trusted)

## Key Technical Decisions

**All decisions are directional and being validated through implementation. Nothing is locked in.**

| Layer | Direction | Status |
|-------|-----------|--------|
| Frontend | Next.js | Considering |
| Auth / DB | Supabase | Considering |
| Social API | X API v2 | Experimenting |
| Intelligence | Grok API | Considering |
| Writing | Claude API | Considering |
| Deployment | Google Cloud | Considering |

## Design Patterns

### Manual-First Development

Learn how things work by doing them by hand, then automate once understood.

- Don't skip teaching moments
- Don't assume prior knowledge of APIs, auth flows, or deployment
- Build understanding before abstraction
- Document learnings in memory bank

### User-Centered Validation

- Customer research before code (Reshad interview)
- Free tier to prove value before asking for payment
- Style matching must be exact — user's voice is non-negotiable
- Trust builds gradually: manual approval → auto-posting

### Iterative Scope

- Start with X only, prove it works
- Then Instagram
- Platform-specific style learning
- Subject-specific style learning

## Component Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                      Web Interface                           │
│            (query testing → monitoring → drafts)             │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   Pipeline A  │    │   Pipeline B  │    │   Alert       │
│   News Intel  │    │   Content Gen │    │   Channels    │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   X API v2    │    │   Claude API  │    │   WhatsApp    │
│   (Grok API)  │    │   (Style DB)  │    │   Discord     │
│   Websites    │    │               │    │   Telegram    │
└───────────────┘    └───────────────┘    │   Email       │
                                          └───────────────┘
```

## Critical Implementation Paths

1. **X API authentication** — OAuth 2.0, token management, rate limits
2. **Query building** — Operators, filters, annotations for football news
3. **Style extraction** — Analyzing past posts, identifying patterns
4. **Draft generation** — Claude prompts that capture voice
5. **Feedback integration** — Learning from edits and corrections
6. **Alert delivery** — Multi-channel notification system

## Data Flow

**News Intelligence:**
```
X API → Raw Tweets → Filter/Score → Newsworthy? → Alert → Draft Trigger
```

**Content Generation:**
```
News Event → Style Lookup → Claude Prompt → Draft → User Review → Publish
                                    ↑
                              Feedback Loop