<!-- Modular reference approach: keep CLAUDE.md under 150 lines. Details live in .claude/reference/ -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Permanent Rule

CLAUDE.md must never exceed 150 lines. If any future change would push it over, immediately extract sections to `.claude/reference/` and update the reference table.

## Project Overview

Oparax is an AI-powered social media automation tool for professional news reporters. It monitors X (Twitter) for breaking stories and drafts posts in the user's voice. The primary use case is a football news reporter with 400k+ followers on X.

## Tech Stack

| Category | Tool | Version |
| -------- | ---- | ------- |
| Framework | Next.js | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui | latest |
| Auth/DB | Supabase (supabase-js) | 2.97.0 |
| SSR Auth | @supabase/ssr | 0.8.0 |
| Testing | Vitest | 4.0.18 |
| Testing | React Testing Library | 16.3.2 |
| Python | Python | 3.11+ |

## Architecture

Monorepo with two separate concerns:

- **Root (`/`)** — Python backend for X API integration and content generation
- **`frontend/`** — Next.js 16 application (App Router, TypeScript, Tailwind CSS 4)

## Environment

- **JS Package Manager**: `pnpm` — run `pnpm install` in `frontend/` for dependencies
- **Python Package Manager**: `uv` — run `uv sync` at root for Python dependencies
- **Deployment**: Vercel (frontend), TBD (backend)

## Development Commands

### Frontend (run from `frontend/`)

```bash
pnpm dev          # Dev server at http://localhost:3000 (Turbopack)
pnpm build        # Production build
pnpm start        # Serve production build
pnpm lint         # ESLint with Next.js core-web-vitals + TypeScript rules
pnpm test         # Run Vitest tests (single run)
pnpm test:watch   # Run Vitest in watch mode
```

### Python (run from root)

```bash
uv run python scripts/search_test.py   # Test X API v2 search endpoint
```

## External Services

- **X API v2** — Tweet search, user data (`/tweets/search/recent`)
- **Supabase** — Auth (email/password, X OAuth planned) and database
- **Claude API** — Content generation (planned)
- **Grok API** — Intelligence/analysis (planned)

## Python Backend

- Python 3.11+ with `uv` package manager
- Dependencies: `python-dotenv`, `requests`
- `scripts/` contains utility/test scripts for API exploration

## Reference Documentation

Read these documents when working on specific areas:

| Document | When to Read |
| -------- | ------------ |
| `.claude/reference/project-layout.md` | Understanding file structure, what files do, how they connect |
| `.claude/reference/frontend-nextjs.md` | Working on frontend pages, components, styling, Tailwind, or Next.js configuration |
| `.claude/reference/supabase-auth.md` | Working on authentication, Supabase client code, proxy/middleware, or session handling |
| `.claude/reference/testing.md` | Writing tests, running tests, or modifying test infrastructure |
| `.claude/reference/environment.md` | Setting up env vars, deployment config, or troubleshooting credentials |
| `.claude/reference/vercel-deploy.md` | Deploying to Vercel or configuring deployment settings |
