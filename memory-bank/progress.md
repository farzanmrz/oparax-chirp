# Progress

## What Works

- **Repository:** Git repo with remote, `.gitignore`, LICENSE, `CLAUDE.md`
- **Frontend:** Next.js 16 app in `frontend/` with App Router, TypeScript, Tailwind CSS v4, ESLint. Auth landing page with "Continue with X" button (placeholder).
- **X API test:** `scripts/search_test.py` successfully calls X API v2 Search Recent Posts endpoint (football news query with author expansion).
- **Python deps:** `python-dotenv`, `requests` installed via uv.
- **X API access:** Bearer Token configured in `.env`.
- **Documentation:** README, CLAUDE.md, and memory-bank files maintained.
- **Customer research:** Validated user Reshad interviewed before any code written.

## What's Left to Build

### Pipeline A: News Intelligence

**Phase 1 (In Progress):**
- [x] Set up X API v2 credentials
- [x] Write Python script to test Search Recent Posts endpoint
- [x] Answer: Can we search by topic query? (Yes)
- [ ] Answer: Can we filter to specific accounts?
- [ ] Answer: What query operators work for football news?
- [ ] Answer: What are actual rate limits?
- [ ] Build query testing UI in the frontend

**Phase 2 (Future):**
- [ ] Pull user's followed accounts
- [ ] Cluster accounts by purpose using LLM
- [ ] Monitor for new tweets
- [ ] Assess newsworthiness

**Phase 3 (Future):**
- [ ] Add website monitoring
- [ ] Research agents for context

### Pipeline B: Content Generation (Future)

- [ ] Extract user's past posts
- [ ] Build style learning system
- [ ] Draft generation with Claude
- [ ] Feedback loop implementation
- [ ] Auto-posting ("yolo mode")

### Infrastructure

- [x] Frontend scaffold (Next.js)
- [ ] Auth (OAuth via X.com)
- [ ] Database (Supabase)
- [ ] Alert channels (WhatsApp, Discord, Telegram, email)
- [ ] Deployment (Google Cloud)

## Current Status

**Phase:** X API v2 experimentation (Pipeline A, Phase 1)

**Active work:** Experimenting with X API query operators and building query UI

**Blockers:** None

## Known Unknowns

1. **X API rate limits** — need to test in practice
2. **Query operators for football news** — need more experimentation
3. **Access level requirements** — free tier may not be sufficient
4. **Style learning accuracy** — can we match user's voice exactly?
5. **Newsworthiness scoring** — what signals matter for football news?
