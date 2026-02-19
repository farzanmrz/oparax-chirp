# Product Context

## Why This Exists

### Validated Customer Research

Before any code was written, the validated user Reshad (football news reporter, 400k+ X followers) was interviewed. Key findings:

**Current workflow:**
- Entire news monitoring is manual: flips between X, news sites, email alerts, apps on phone and laptop
- Posts on X with high frequency, direct news style, no bias
- Posts on Instagram with more detail, stats, images, every ~45 minutes
- Earns ~$400/month from X, ~$1,000/month from Instagram

**Pain points:**
- Has missed breaking stories because he physically cannot monitor everything at once
- Cannot scale without sacrificing quality or missing opportunities

**Requirements:**
- AI drafting must match his writing style exactly
- Needs to see it perform first on free tier before paying
- Willing to consider $50/month for X automation if it works

**Future interest:**
- Instagram automation if X pipeline succeeds

## The Two-Pipeline Vision

### Pipeline A: News Intelligence

**Phase 1 (current):** Experiment with X API search and filtering
- Can we search recent posts by topic query?
- Can we filter results to specific X accounts?
- What do query operators and annotation filters look like for football news?
- What are actual rate limits in practice?
- Build simple local frontend to test queries and view results

**Phase 2:** Replicate user's manual monitoring
- Pull who the user follows on X
- Cluster accounts by purpose using LLM (e.g., official club accounts, reliable journalists, aggregators)
- Monitor for new tweets from these accounts
- Assess newsworthiness based on user's posting history and preferences

**Phase 3:** Expand monitoring
- Add website monitoring alongside X accounts
- Research agents for deeper context on breaking stories

### Pipeline B: Content Generation

**Style learning:**
- Analyze user's past posts on a given platform
- Learn writing patterns (tone, structure, length, vocabulary, emoji usage)
- Style learning is both platform-specific (X vs Instagram) and subject-specific (transfer windows vs match results)

**Drafting:**
- Generate posts matching user's voice when news breaks
- Present drafts through alert channels (WhatsApp, Discord, Telegram, email)
- Allow editing through those same channels before publishing

**Improvement loop (3 feedback modes):**
1. Manual edits to drafts (learn from changes user makes)
2. AI chat-based corrections (user describes what's wrong)
3. Accumulated context from past drafts (patterns over time)

**Auto-posting:**
- "Yolo mode" enables auto-posting once user trusts the system
- Approval-required mode as default until trust is built

## User Experience Goals

1. **Catch everything:** Never miss a breaking story again
2. **Save time:** Reduce manual monitoring and drafting from hours to minutes
3. **Maintain quality:** Posts must sound exactly like the user wrote them
4. **Build trust gradually:** Free tier → manual approval → auto-posting
5. **Multi-platform eventually:** Start with X, prove it works, then Instagram

## Monetization Strategy

**Free tier:**
- Limited monitoring (subset of followed accounts)
- Draft generation with manual approval
- Prove the system works

**Paid tier ($50/month for X):**
- Full monitoring (all followed accounts + websites)
- Unlimited draft generation
- Auto-posting (yolo mode)
- Priority alerts
- Eventually: multi-platform (Instagram adds to price)

**Conversion trigger:**
- User sees system catch stories they would have missed
- Drafts match their voice well enough to publish with minimal editing
- Time savings become obvious

## Future Platforms

- **Now:** Web interface (starting point for experimentation)
- **Later:** Mac app (native experience for monitoring/drafting)
- **Later:** Mobile (iOS/Android for on-the-go approvals and alerts)

## Alert Channels

Users receive notifications through their preferred channel(s):
- WhatsApp
- Discord
- Telegram
- Email

Same channels used for:
- Breaking news alerts
- Draft approvals
- Quick edits before posting