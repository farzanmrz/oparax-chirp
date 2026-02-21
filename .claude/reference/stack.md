# Stack Reference

Read this before starting a new feature or making a tech decision.

## Status of All Tech Choices

All choices are directional and being validated through implementation. Nothing is locked in — if a better option emerges during experimentation, it should be reconsidered.

| Layer | Technology | Status |
| --- | --- | --- |
| Frontend | Next.js 16 (App Router, TypeScript, Tailwind CSS v4) | Set up |
| Auth | OAuth via X.com (single "Continue with X" flow) | Planned |
| Database | Supabase | Considering |
| Social API | X API v2 | Experimenting |
| Intelligence | Grok API | Considering |
| Writing/drafting | Claude API | Considering |
| Deployment | Google Cloud | Considering |
| Alert channels | WhatsApp, Discord, Telegram, Email | Future |

## Frontend

- **Framework:** Next.js 16 with App Router (file-based routing under `frontend/app/`)
- **Language:** TypeScript throughout
- **Styles:** Tailwind CSS v4 — configured via `@import "tailwindcss"` in `globals.css`, not a config file
- **Runtime:** Node.js 20+
- **Package manager:** pnpm (run all commands from `frontend/`)

Key frontend dependencies (from `frontend/package.json`):

```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "tailwindcss": "^4",
  "typescript": "^5",
  "eslint": "^9"
}
```

## Python / Scripts

- **Package manager:** uv
- **Runtime:** Python 3.11+
- **Config:** `pyproject.toml` at repo root (currently serves `scripts/`; will likely move into `backend/` later)

Current Python dependencies (from `pyproject.toml`):

```toml
dependencies = [
    "python-dotenv>=1.2.1",
    "requests>=2.32.5",
]
```

## Environment Variables

`.env` at project root (gitignored). Never commit this file.

```bash
# X API (required for scripts/)
X_BEARER_TOKEN=
X_CONSUMER_KEY=
X_SECRET_KEY=

# Future — Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Future — AI APIs
ANTHROPIC_API_KEY=
GROK_API_KEY=
```

## Supabase (Considering)

Chosen for: built-in auth (OAuth providers), Postgres, real-time subscriptions, and a free tier suitable for early experimentation. The main alternative would be PlanetScale + Auth.js, but Supabase reduces the number of services to integrate early on.

Not yet implemented. If it is adopted, read `.claude/reference/auth.md` for client architecture.

## Grok API (Considering)

Candidate for news intelligence tasks (clustering, newsworthiness scoring) because it has native X/Twitter data training. Claude API is the candidate for drafting posts in the user's voice. These may be used together: Grok for understanding news context, Claude for writing.

## Google Cloud (Considering)

Deployment target because of familiarity. No infrastructure has been provisioned yet. Keep decisions reversible until pipeline architecture is clearer.

## Version Control

- Git with SSH for GitHub
- Remote: `git@github.com:farzanmrz/oparax-chirp.git`
- `gh` CLI authenticated
