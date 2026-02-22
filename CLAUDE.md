# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oparax Chirp is an AI-powered social media automation tool for professional news reporters. It monitors X (Twitter) for breaking stories and drafts posts in the user's voice. The primary use case is a football news reporter with 400k+ followers on X.

## Architecture

Monorepo with two separate concerns:

- **Root (`/`)** — Python backend for X API integration and content generation
- **`frontend/`** — Next.js 16 application (App Router, TypeScript, Tailwind CSS 4)

Package managers: `uv` for Python, `pnpm` for Node.js.

## Development Commands

### Frontend (run from `frontend/`)

```bash
pnpm dev          # Dev server at http://localhost:3000 (Turbopack)
pnpm build        # Production build
pnpm start        # Serve production build
pnpm lint         # ESLint with Next.js core-web-vitals + TypeScript rules
```

### Python (run from root)

```bash
uv run python scripts/search_test.py   # Test X API v2 search endpoint
```

## Environment Variables

Required in `.env` at project root:

- `X_BEARER_TOKEN`, `X_CONSUMER_KEY`, `X_SECRET_KEY` — X API v2 credentials
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase auth & database

## Frontend Conventions

- **App Router**: Pages live in `frontend/app/`. File `app/foo/page.tsx` maps to route `/foo`.
- **Import alias**: `@/*` maps to `frontend/*` (e.g., `import { X } from '@/components/X'`).
- **Tailwind v4**: Theme configuration is CSS-first in `app/globals.css` via `@theme inline`, not a `tailwind.config.ts` file.
- **Server Components by default**: Only add `"use client"` when interactivity is needed (state, effects, event handlers).
- **TypeScript strict mode** is enabled. Path resolution uses `"moduleResolution": "bundler"`.
- **ESLint**: Flat config format (v9+) in `eslint.config.mjs`.

## External Services

- **X API v2** — Tweet search, user data (`/tweets/search/recent`)
- **Supabase** — Auth (X OAuth) and database
- **Claude API** — Content generation (planned)
- **Grok API** — Intelligence/analysis (planned)
- **Deployment target** — Google Cloud

## Documentation Lookups

When you need library/framework documentation, API references, or up-to-date usage examples:
- Delegate to the `ctx-researcher` subagent via the Task tool
- For multiple libraries, spawn multiple ctx-researcher instances in parallel
- Users can also manually invoke `/ctx <library> <question>`

## Python Backend

- Python 3.11+ with `uv` package manager
- Dependencies: `python-dotenv`, `requests`
- `scripts/` contains utility/test scripts for API exploration
