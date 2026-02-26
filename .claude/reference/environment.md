# Environment Variables Reference

Read this when setting up the project, configuring deployment, or troubleshooting missing credentials.

## Python Backend (root `.env`)

File: `.env` at project root. Git-ignored.

| Variable | Purpose |
| -------- | ------- |
| `X_BEARER_TOKEN` | X API v2 Bearer token for tweet search |
| `X_CONSUMER_KEY` | X API consumer key (OAuth) |
| `X_SECRET_KEY` | X API consumer secret (OAuth) |

Loaded by `python-dotenv` in scripts like `scripts/search_test.py`.

## Frontend (`frontend/.env.local`)

File: `frontend/.env.local`. Git-ignored. Auto-loaded by Next.js.

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g., `https://xxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key (format: `sb_publishable_xxx`) |

The `NEXT_PUBLIC_` prefix makes these available in browser code (safe — they're public keys, not secrets).

## Vercel Deployment

When deploying to Vercel, env vars are NOT stored in files. Set them in the Vercel dashboard:

1. Go to your project on vercel.com
2. Settings > Environment Variables
3. Add the same variables from `frontend/.env.local`
4. Vercel injects them at build time and runtime

## Important Notes

- **Never commit `.env` or `.env.local`** — both are in `.gitignore`
- **Never use `NEXT_PUBLIC_SUPABASE_ANON_KEY`** — always use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Python env vars are only needed when running Python scripts locally; the frontend doesn't use them
