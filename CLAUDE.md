# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oparax is an AI-powered social media automation tool for professional news reporters. It monitors X (Twitter) for breaking stories and drafts posts in the user's voice. The primary use case is a football news reporter with 400k+ followers on X.

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
pnpm test         # Run Vitest tests (single run)
pnpm test:watch   # Run Vitest in watch mode
```

### Python (run from root)

```bash
uv run python scripts/search_test.py   # Test X API v2 search endpoint
```

## Environment Variables

Required in `.env` at project root (for Python scripts):

- `X_BEARER_TOKEN`, `X_CONSUMER_KEY`, `X_SECRET_KEY` — X API v2 credentials

Required in `frontend/.env.local` (for Next.js — auto-loaded, git-ignored):

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — Supabase publishable key (`sb_publishable_xxx` format)

## Frontend Conventions

- **App Router**: Pages live in `frontend/app/`. File `app/foo/page.tsx` maps to route `/foo`.
- **Import alias**: `@/*` maps to `frontend/*` (e.g., `import { X } from '@/components/X'`).
- **Tailwind v4**: Theme configuration is CSS-first in `app/globals.css` via `@theme inline`, not a `tailwind.config.ts` file.
- **Server Components by default**: Only add `"use client"` when interactivity is needed (state, effects, event handlers).
- **TypeScript strict mode** is enabled. Path resolution uses `"moduleResolution": "bundler"`.
- **ESLint**: Flat config format (v9+) in `eslint.config.mjs`.
- **Turbopack root**: `next.config.ts` sets `turbopack.root` to `process.cwd()` because the monorepo root has a stale `package-lock.json` that confuses Turbopack's workspace detection.
- **Proxy (formerly Middleware)**: `frontend/proxy.ts` runs on every request to refresh Supabase auth tokens. Next.js 16 renamed `middleware.ts` → `proxy.ts` (function export: `proxy()` not `middleware()`).

## Supabase Auth

- **Client utilities** in `frontend/lib/supabase/`:
  - `client.ts` — browser client (`createBrowserClient`) for `"use client"` components
  - `server.ts` — server client (`createServerClient`) for Server Actions and Route Handlers
  - `middleware.ts` — session refresh logic used by `proxy.ts`
- **Auth pattern**: Server Actions for form submissions (not client-side fetch). Auth forms use route group `(auth)` for shared layout.
- **Security rule**: Always use `getUser()` on the server, never `getSession()` — the latter doesn't revalidate the JWT with Supabase.
- **Email confirmation**: Enabled. After signup, user must click email link → hits `/auth/confirm` route handler → redirects to `/dashboard`.
- **Env var**: Use only `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — no ANON_KEY fallback.

### Supabase SSR Code Rules (CRITICAL)

These rules prevent breaking auth. Violating them causes silent session failures in production.

- **NEVER** use individual cookie methods (`get`, `set`, `remove`) — always use `getAll`/`setAll` batch methods.
- **NEVER** import from `@supabase/auth-helpers-nextjs` — it is deprecated. Use `@supabase/ssr`.
- **NEVER** use `getSession()` on the server — always use `getUser()` to revalidate the JWT.
- **NEVER** run code between `createServerClient(...)` and `supabase.auth.getUser()` in the proxy — can cause random logouts.
- **NEVER** use `NEXT_PUBLIC_SUPABASE_ANON_KEY` — use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` only.

### Known Issues / TODOs

- Duplicate email signup: Supabase silently succeeds (anti-enumeration) — shows "check email" page but no email is sent. Need to add client-side check or post-signup validation to redirect to `/login` if email already exists.
- Email confirmation template: Must be configured in Supabase Dashboard to point to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`.
- Proxy route protection: Official docs recommend redirecting unauthenticated users to `/login` in the proxy. Currently we do page-level protection. Should add proxy-level redirect when `/login` page is built.

## External Services

- **X API v2** — Tweet search, user data (`/tweets/search/recent`)
- **Supabase** — Auth (email/password, X OAuth planned) and database
- **Claude API** — Content generation (planned)
- **Grok API** — Intelligence/analysis (planned)

## Documentation Lookups

When you need library/framework documentation, API references, or up-to-date usage examples:
- Delegate to the `ctx-researcher` subagent via the Task tool
- For multiple libraries, spawn multiple ctx-researcher instances in parallel
- Users can also manually invoke `/ctx <library> <question>`

## Python Backend

- Python 3.11+ with `uv` package manager
- Dependencies: `python-dotenv`, `requests`
- `scripts/` contains utility/test scripts for API exploration
