# Auth Reference

Read this before touching anything related to login, sessions, or Supabase auth.

## Strategy

Single auth flow: OAuth via X.com through Supabase. There is no separate login or registration. The only entry point is a "Continue with X" button on the landing page.

**Architecture constraint:** The browser calls Supabase. Supabase calls X. There is no custom backend auth code. The user never hits our server to log in.

## Current Status: BLOCKED

Auth code is fully implemented and compiles (`pnpm build` passes). The flow is blocked at runtime by a 400 error from Supabase's `/auth/v1/authorize` endpoint.

### What has been verified

- Twitter (OAuth 2.0) is enabled in the Supabase dashboard (Authentication > Providers)
- OAuth 2.0 Client ID and Client Secret from the X Developer Portal are entered in Supabase
- Callback URL in X Developer Portal is `https://pcgvpypzfwuchyfwdlwe.supabase.co/auth/v1/callback`
- App type in X Developer Portal is "Web App" with read/write permissions
- Anon key in `frontend/.env.local` is the correct `eyJ...` JWT (was previously the publishable key, which caused the issue)

### What has NOT been verified yet (try these first)

- **Retest after anon key fix:** The anon key was corrected from `sb_publishable_...` to the `eyJ...` JWT. Restart the dev server and retest. This may resolve the 400.
- **Supabase URL Configuration:** In Supabase dashboard > Authentication > URL Configuration, check that:
  - **Site URL** is set to `http://localhost:3000`
  - **Redirect URLs** includes `http://localhost:3000/**`
- **Error message details:** Capture the exact error body from the 400 response (open browser DevTools > Network tab, click the failed request, read the response body). The specific `error_code` and `msg` fields will pinpoint the issue.

## Implemented Files

All files exist and compile. No code changes are needed unless debugging reveals a code issue.

| File | Role |
| --- | --- |
| `frontend/lib/supabase/client.ts` | Browser client (`createBrowserClient` from `@supabase/ssr`) |
| `frontend/lib/supabase/server.ts` | Server client (`createServerClient` with async `cookies()`) |
| `frontend/app/page.tsx` | Landing page with `signInWithOAuth({ provider: "twitter" })` handler |
| `frontend/app/auth/callback/route.ts` | Route Handler: exchanges code for session, redirects to /dashboard |
| `frontend/app/dashboard/page.tsx` | Server component: reads session via `getUser()`, redirects to / if none |
| `frontend/app/dashboard/sign-out-button.tsx` | Client component: calls `signOut()` then navigates to / |

**Dependencies:** `@supabase/supabase-js@2.97.0`, `@supabase/ssr@0.8.0`

## Auth Flow (step by step)

1. User clicks "Continue with X" on the landing page (`page.tsx`, client component)
2. Browser client calls `supabase.auth.signInWithOAuth({ provider: "twitter", options: { redirectTo: origin + "/auth/callback" } })`
3. Supabase SDK redirects the browser to `https://pcgvpypzfwuchyfwdlwe.supabase.co/auth/v1/authorize?provider=twitter&...`
4. Supabase redirects to X's OAuth consent screen
5. User approves on X. X redirects to `https://pcgvpypzfwuchyfwdlwe.supabase.co/auth/v1/callback`
6. Supabase validates the callback and redirects to `http://localhost:3000/auth/callback?code=<one-time-code>`
7. The Route Handler at `/auth/callback` uses the server client to call `exchangeCodeForSession(code)`
8. Server client's `setAll` callback writes access/refresh tokens as HTTP cookies
9. Route Handler redirects to `/dashboard`
10. Dashboard (server component) reads the session via `getUser()` and displays "Welcome, @username"

**Currently blocked at step 3.** Supabase returns 400 instead of redirecting to X.

## Browser Client vs Server Client

| Client | Created by | Used in | Cookie access |
| --- | --- | --- | --- |
| Browser (`client.ts`) | `createBrowserClient` | Client components (`"use client"`) | Automatic via `document.cookie` |
| Server (`server.ts`) | `createServerClient` | Server components, Route Handlers | Explicit via Next.js `cookies()` API |

**Why two clients?** Cookies work differently in browsers vs servers. In the browser, `document.cookie` is available globally. On the server, there is no `document.cookie`; you must use the `cookies()` function from `next/headers` to read/write the HTTP cookie headers. The `@supabase/ssr` package abstracts this by accepting a `cookies` adapter in the server client.

**Important:** `cookies()` is async in Next.js 16. The server client factory is `async function createClient()` and must be awaited.

## Environment Variables

Two separate env files exist because Next.js only reads `.env` files from the `frontend/` directory (where `next.config.ts` lives), not from the project root.

**Root `.env`** (all credentials, used by Python scripts):

```bash
X_BEARER_TOKEN=...       # Server-only, for read-only X API calls
X_CONSUMER_KEY=...       # X OAuth 1.0a credential (not used by frontend)
X_SECRET_KEY=...         # X OAuth 1.0a credential (not used by frontend)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...   # New format, NOT the anon key
NEXT_PUBLIC_SUPABASE_ANON_KEY=...          # eyJ... JWT, this is what the code uses
```

**`frontend/.env.local`** (frontend only, gitignored by `frontend/.gitignore`):

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...   # Stored for reference, not used by code
NEXT_PUBLIC_SUPABASE_ANON_KEY=...          # eyJ... JWT, this is what the code uses
```

### Key distinction: publishable key vs anon key

Supabase is transitioning to a new key format. The **publishable key** (`sb_publishable_...`) is the new format. The **anon key** (`eyJ...` JWT) is the current format that `@supabase/ssr` expects. Our code uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Do not confuse the two.

## Security Rules

- `frontend/.env.local` is gitignored (covered by `.env*` in `frontend/.gitignore`). Never commit it.
- Root `.env` is gitignored. Never commit it.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are public by design (Supabase anon key has Row Level Security, not secret access).
- `X_BEARER_TOKEN`, `X_CONSUMER_KEY`, `X_SECRET_KEY` must NEVER be in `NEXT_PUBLIC_` variables or exposed to client components.

## X Developer Portal Settings

For reference, the X app should be configured as:

- **App type:** Web App
- **OAuth version:** OAuth 2.0
- **Callback URL:** `https://pcgvpypzfwuchyfwdlwe.supabase.co/auth/v1/callback`
- **Website URL:** `https://oparax.com` (informational only, does not affect OAuth)
- **Credentials used by Supabase:** OAuth 2.0 Client ID + Client Secret (not Consumer Key/Secret)
