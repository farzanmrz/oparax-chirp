# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

**Oparax** — AI-powered social media automation for professional news reporters. Monitors news sources, surfaces what matters, and drafts posts in the user's voice. Repo name: `oparax-chirp`.

**Current stage:** Pipeline A, Phase 1 — experimenting with X API v2 to answer foundational questions before building pipelines. Frontend scaffolded. Backend empty.

## Repo Layout

```text
oparax-chirp/
├── frontend/       # Next.js 16 app (pnpm) — UI, dashboard, post review
├── backend/        # Python API server (planned, empty)
├── scripts/        # Standalone experiments — not part of the backend
├── memory-bank/    # Context docs for Cline (VS Code agent) — treat as documentation
├── .claude/
│   └── reference/  # Task-specific reference docs — load when relevant
├── pyproject.toml  # Root-level Python config (uv); serves scripts/ for now
└── .env            # API credentials (gitignored — never commit)
```

## Package Managers

- **Python:** uv only. `uv sync`, `uv add <pkg>`, `uv run python scripts/<file>.py`
- **Node:** pnpm only. Run from `frontend/`. `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`

## Security Rules (no exceptions)

- `.env` is gitignored. Never commit credentials.
- `X_BEARER_TOKEN` is server-only. Never put it in a `NEXT_PUBLIC_` variable or pass it to a client component.

## Always-On Context

- **Tailwind CSS v4** is configured via `@import "tailwindcss"` in `frontend/app/globals.css`. There is no `tailwind.config.ts`. Do not create one.
- **Manual-first philosophy:** Learn APIs and flows by hand before abstracting. Don't skip teaching moments.
- **No tests or formatting tools are configured yet.** ESLint is set up in the frontend only.

## Reference Documents

Read these before starting work in the relevant area. Do not load them if they are not relevant to the current task.

| Document | Read when... |
| --- | --- |
| `.claude/reference/stack.md` | Starting a new feature or making a tech decision |
| `.claude/reference/auth.md` | Touching anything related to login, sessions, or Supabase auth |
| `.claude/reference/x-api.md` | Touching the search API route or any X API calls |
| `.claude/reference/product.md` | Planning new features or making product scope decisions |
