# Project Info

## Accounts & Repository

- **GitHub**: `farzanmrz/oparax-chirp`
- **GitHub email**: `farzanmrz@gmail.com`
- **Contributors**: Farzan Mirza (sole contributor)

## Supabase

- Credentials stored in root `.env` and `frontend/.env.local`
- See `.env.local` for project URL and publishable key

## X.com API

- **Endpoint**: `https://api.x.com/2/tweets/search/recent`
- **Credentials** in root `.env`: `X_BEARER_TOKEN`, `X_CONSUMER_KEY`, `X_SECRET_KEY`
- **Test script**: `scripts/search_test.py`

## Vercel

- **Live** at [oparax.com](https://oparax.com)
- Root directory set to `frontend`
- Auto-deploys from `main` branch on GitHub push
- Env vars (`NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) configured
  in Vercel dashboard
- Custom domain: `oparax.com` (GoDaddy DNS —
  A record → Vercel IP, CNAME www → cname.vercel-dns.com)

## Environment Variables

### Root `.env` (Python / X API)

| Variable | Purpose |
| -------- | ------- |
| `X_BEARER_TOKEN` | X API v2 Bearer token |
| `X_CONSUMER_KEY` | X API consumer key |
| `X_SECRET_KEY` | X API consumer secret |

### `frontend/.env.local` (Next.js / Supabase)

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |

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
