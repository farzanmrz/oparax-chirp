# Active Context

## Current Work Focus

**Phase:** X API v2 experimentation (Pipeline A, Phase 1) + frontend scaffolding

## What's Been Done

- **Frontend:** Next.js 16 project set up in `frontend/` with App Router, TypeScript, Tailwind CSS v4, ESLint. Auth landing page with "Continue with X" button (placeholder, not wired up).
- **X API test:** `scripts/search_test.py` makes a working call to X API v2 Search Recent Posts (searches "fc barcelona news", returns 10 results with author info).
- **Python deps:** `python-dotenv` and `requests` installed via uv.
- **X API access:** `.env` configured with `X_BEARER_TOKEN`.
- **Auth flow:** Supabase + X OAuth 2.0 coded and compiles; blocked on a Supabase 400 error at runtime.
- **Project context:** `CLAUDE.md` created and maintained for Claude Code.

## Investigation Questions (Phase 1)

1. ~~Can we search recent posts by a topic query?~~ Yes, confirmed with `search_test.py`
2. Can we filter results to specific X accounts?
3. What do the query operators and annotation filters look like for football news?
4. What are the actual rate limits in practice?
5. ~~Build simple local frontend to test queries and view results~~ Frontend scaffolded, needs query UI

## Next Steps

1. Experiment with X API query operators (account filtering with `from:`, boolean operators)
2. Test rate limits by making repeated calls
3. Build a query testing UI in the frontend
4. Debug Supabase 400 error blocking the X OAuth auth flow

## Active Decisions

- Tech stack choices are **directional, not final**
- Manual-first approach: learn APIs by hand before abstracting
- Auth will be OAuth via X.com (single flow, no separate login/register)
- Tailwind CSS v4 configured via CSS, not a config file
