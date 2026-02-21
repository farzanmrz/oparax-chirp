# Auth Reference

Read this before touching anything related to login, sessions, or Supabase auth.

## Strategy

Single auth flow: OAuth via X.com. There is no separate login or registration. The only entry point is a "Continue with X" button that initiates the OAuth flow.

**Current state:** The button exists as a placeholder in `frontend/app/page.tsx`. OAuth is not wired up yet.

## Why OAuth via X Only

- Reshad (the validated user) is a professional X user — he already has an account and trusts X's login
- A separate email/password system adds friction and a second identity to manage
- X OAuth gives us the user's X identity automatically, which is needed for the X API user-context calls (posting, reading timelines) later

## Environment Variables

```bash
# X OAuth credentials (from X Developer Portal)
X_CONSUMER_KEY=
X_SECRET_KEY=

# Future — Supabase (once auth is wired up)
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

`X_BEARER_TOKEN` is separate — it is for server-side read-only API calls (searching tweets), not for user OAuth flows.

## Planned Auth Architecture (not built yet)

When implementation begins, the expected pattern is:

1. User clicks "Continue with X" in the browser
2. App redirects to X OAuth authorization URL
3. X redirects back to the app's callback route with a code
4. Callback route exchanges the code for an access token
5. Supabase stores the session and user record

### Supabase Client Split (important — do not mix these up)

| Client | Used in | Access to |
| --- | --- | --- |
| Browser client (`createBrowserClient`) | Client components (`"use client"`) | Session from cookies in browser |
| Server client (`createServerClient`) | Server components, Route Handlers, Middleware | Session from cookies on server |

The server client must be used for anything that needs to be secure (reading user data, making authenticated API calls). The browser client is for UI state only.

This distinction does not matter yet since auth is not built. Add implementation details here when the OAuth flow is wired up.

## What to Build (when ready)

- `frontend/app/auth/callback/route.ts` — Route Handler that receives the OAuth callback from X, exchanges the code, and stores the session via Supabase
- Middleware to protect dashboard routes (redirect to home if no session)
- Supabase user record linked to X user ID and access token (needed for user-context X API calls later)
