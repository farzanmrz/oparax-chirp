# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oparax is an AI-powered social media automation tool for professional news reporters who earn revenue from posting breaking stories on X (Twitter). It monitors news sources, surfaces what matters, and drafts posts in the user's voice. The technical package/repo name is `oparax-chirp`; the product name is just **Oparax**.

**Current stage:** Early development — experimenting with the X API v2 Search Recent Posts endpoint. No pipelines built yet; answering foundational API questions first.

## Architecture

Two independent pipelines planned:

- **Pipeline A (News Intelligence):** Monitor X accounts → cluster by topic → assess newsworthiness → alert user. Phase 1 (current) is X API experimentation. Future phases add website monitoring and research agents.
- **Pipeline B (Content Generation):** Learn user writing style from past posts → draft in their voice → feedback loop → auto-post. Not started yet.

All tech stack choices (Next.js, Supabase, Grok API, Claude API, Google Cloud) are **directional and being validated**, not final.

## Development Setup

- **Python:** 3.11+ with [uv](https://docs.astral.sh/uv/) as package manager
- **Node.js:** 20+ with [pnpm](https://pnpm.io/) (frontend)
- **Env vars:** `.env` at project root (X API credentials: `X_BEARER_TOKEN`, `X_CONSUMER_KEY`, `X_SECRET_KEY`)

### Commands

```bash
# Install Python dependencies
uv sync

# Add a Python dependency
uv add <package>

# Run a script
uv run python scripts/<script>.py

# Example: run the X API search test
uv run python scripts/search_test.py

# Frontend (run from frontend/ directory)
pnpm install      # Install frontend dependencies (first time)
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build
pnpm lint         # Run ESLint
```

No tests or formatting tools are configured yet. ESLint is set up in the frontend.

## Project Structure

```
oparax-chirp/
├── frontend/       # Next.js app (pnpm) — UI, dashboard, post review
├── backend/        # Python API server (uv) — pipelines, AI logic, scheduling
├── scripts/        # Standalone experiments (X API tests, one-off scripts)
├── memory-bank/    # Context files for Cline (VS Code agent); treat as docs
├── pyproject.toml  # Python project config (root-level, used by scripts/)
└── .env            # API credentials (gitignored)
```

- **`frontend/`** — Next.js 16, App Router, TypeScript, Tailwind CSS v4, ESLint. Has its own `package.json` and `pnpm-lock.yaml`.
- **`backend/`** — Python API server (planned). Empty for now.
- **`scripts/`** — Throwaway Python scripts for API experimentation. Not part of the backend.
- **`memory-bank/`** — Context files for Cline (VS Code agent). Treat as documentation, not code. Keep in sync when project context changes.
- **`pyproject.toml`** — Root-level Python config (uv). Currently serves `scripts/`; will likely move into `backend/` later.
- **`.env`** — API credentials (gitignored). Shared across scripts and backend.

## Key Context

- **Auth approach:** OAuth via X.com. Single "Continue with X" button (no separate login/register). Not wired up yet.
- **Tailwind CSS v4:** Configured via CSS (`@import "tailwindcss"` in `frontend/app/globals.css`), not a `tailwind.config.ts` file.
- **Manual-first philosophy:** Learn APIs by hand before abstracting. Don't skip teaching moments or assume prior knowledge of APIs/auth flows.
- **Validated user:** Reshad, football news reporter with 400k+ X followers. All experimentation targets football news use cases.
- **X API v2 endpoint under test:** `POST/GET https://api.x.com/2/tweets/search/recent` — returns posts from last 7 days. Auth via Bearer Token.
- The `.env` file is gitignored. Never commit credentials.
