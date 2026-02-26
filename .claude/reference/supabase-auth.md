# Supabase Auth Reference

Read this before working on authentication, Supabase client code, proxy/middleware, or session handling.

## Client Utilities

Located in `frontend/lib/supabase/`:

- `client.ts` — browser client (`createBrowserClient`) for `"use client"` components
- `server.ts` — server client (`createServerClient`) for Server Actions and Route Handlers
- `middleware.ts` — session refresh logic used by `proxy.ts`

## Auth Pattern

- **Server Actions** for form submissions (not client-side fetch). Auth forms use route group `(auth)` for shared layout.
- **Input validation**: `frontend/lib/validation.ts` — shared `validateAuthForm()` used by both login and signup actions. Validates type (string, not null/File), email format (@), password length (>=6).
- **Error mapping**: `frontend/lib/auth-errors.ts` — `mapAuthError()` maps raw Supabase error messages to user-safe generic messages. Prevents email enumeration.

## Auth Page Flow

Single tabbed page at `/` with Sign Up and Sign In tabs. Tab state uses `?tab=signup` / `?tab=signin` URL search params. Server actions redirect mapped errors back with `?tab=...&error=...` to preserve the active tab.

- Sign Up → `(auth)/signup/actions.ts` → `/signup/check-email` → email link → `/auth/confirm` → `/dashboard`
- Sign In → `(auth)/login/actions.ts` → `/dashboard`
- Old `/signup` URL redirects to `/?tab=signup` for backward compat.

**Email confirmation**: Enabled. After signup, user must click email link → hits `/auth/confirm` route handler → redirects to `/dashboard`.

## Security Rules

- Always use `getUser()` on the server, never `getSession()` — the latter doesn't revalidate the JWT with Supabase.
- Use only `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — no ANON_KEY fallback.

## Supabase SSR Code Rules (CRITICAL)

These rules prevent breaking auth. Violating them causes silent session failures in production.

- **NEVER** use individual cookie methods (`get`, `set`, `remove`) — always use `getAll`/`setAll` batch methods.
- **NEVER** import from `@supabase/auth-helpers-nextjs` — it is deprecated. Use `@supabase/ssr`.
- **NEVER** use `getSession()` on the server — always use `getUser()` to revalidate the JWT.
- **NEVER** run code between `createServerClient(...)` and `supabase.auth.getUser()` in the proxy — can cause random logouts.
- **NEVER** use `NEXT_PUBLIC_SUPABASE_ANON_KEY` — use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` only.

## Known Issues / TODOs

- **Duplicate email signup**: Supabase silently succeeds (anti-enumeration) — shows "check email" page but no email is sent. Need to add client-side check or post-signup validation to redirect to `/` if email already exists.
- **Email confirmation template**: Must be configured in Supabase Dashboard to point to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`.
- **Proxy route protection**: Official docs recommend redirecting unauthenticated users in the proxy. Currently we do page-level protection in `dashboard/page.tsx`. Should add proxy-level redirect for protected routes.
