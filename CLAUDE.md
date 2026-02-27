# CLAUDE.md

## Project Overview

Oparax is an AI-powered social media automation tool for professional news reporters. It monitors X (Twitter) for breaking stories and drafts posts in the user's voice. The primary use case is a football news reporter with 400k+ followers on X.

## Tech Stack

| Category | Package | Version | Purpose |
| -------- | ------- | ------- | ------- |
| Framework | Next.js (`next`) | 16.1.6 | React meta-framework — SSR, file-based routing, API routes |
| UI | React (`react`) | 19.2.3 | Component-based UI rendering |
| Language | TypeScript (`typescript`) | 5.9.3 | Static type-checking for JavaScript |
| Styling | Tailwind CSS (`tailwindcss`) | 4.2.0 | Utility-first CSS framework |
| Components | shadcn/ui (`shadcn`) | 3.8.5 | Pre-built, customizable UI components (copied into codebase, Nova style) |
| Icons | Hugeicons (`@hugeicons/react`) | 1.1.5 | Icon library for shadcn components |
| BaaS | Supabase (`@supabase/supabase-js`) | 2.97.0 | Supabase client — auth, database queries, storage |
| BaaS | Supabase SSR (`@supabase/ssr`) | 0.8.0 | Server-side auth helpers — cookie/session management for Next.js |
| Testing | Vitest (`vitest`) | 4.0.18 | Unit/integration test runner (Vite-native) |
| Testing | React Testing Library (`@testing-library/react`) | 16.3.2 | React component testing utilities |
| Runtime | Python | 3.11.14 | Backend scripts for X API integration |
| Deployment | Vercel | — | Frontend hosting with auto-deploy from GitHub |

## Environment

- **JS Package Manager**: `pnpm` — run `pnpm install` in `frontend/` for dependencies
- **Python Package Manager**: `uv` — run `uv sync` at root for Python dependencies
- **Deployment**: Vercel at [oparax.com](https://oparax.com) (frontend), TBD (backend)

## Project Layout

```text
oparax-chirp/
├── frontend/                      # Next.js web application
│   ├── app/                       # App Router — file-based routing
│   │   ├── layout.tsx             # Root layout (Nunito Sans font, <html>)
│   │   ├── globals.css            # Tailwind v4 theme (gray oklch palette)
│   │   ├── page.tsx               # Root "/" — redirects to /login
│   │   ├── login/                 # Login route
│   │   │   ├── page.tsx           # Login page (renders LoginForm)
│   │   │   └── actions.ts         # Login server action
│   │   ├── signup/                # Signup route
│   │   │   ├── page.tsx           # Signup page (renders SignupForm)
│   │   │   ├── actions.ts         # Signup server action
│   │   │   └── check-email/page.tsx  # Post-signup confirmation
│   │   ├── auth/confirm/route.ts  # Email verification handler
│   │   └── dashboard/page.tsx     # Protected page (redirects if not logged in)
│   ├── components/                # UI components
│   │   ├── login-form.tsx         # Login form (shadcn login-04 block)
│   │   ├── signup-form.tsx        # Signup form (shadcn signup-04 block)
│   │   └── ui/                    # shadcn base components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── field.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── separator.tsx
│   ├── lib/                       # Shared utilities
│   │   ├── supabase/client.ts     # Browser Supabase client
│   │   ├── supabase/server.ts     # Server Supabase client
│   │   ├── supabase/middleware.ts  # Session refresh (called by proxy.ts)
│   │   ├── validation.ts          # validateAuthForm(), validateSignupForm()
│   │   ├── auth-errors.ts         # mapAuthError()
│   │   └── utils.ts               # cn() helper for class merging
│   ├── __tests__/auth/            # Vitest tests (auth suite)
│   ├── proxy.ts                   # Runs on EVERY request — refreshes auth
│   ├── components.json            # shadcn/ui config (Nova style, gray, hugeicons)
│   ├── next.config.ts             # Next.js config
│   ├── vitest.config.ts           # Test runner config
│   └── package.json               # Dependencies and scripts
├── scripts/
│   └── search_test.py             # X API v2 search test
├── .claude/
│   └── reference/
│       ├── vision.md              # Product vision and roadmap
│       ├── project-info.md        # Accounts, env vars, commands, setup
│       └── userjourney.md         # Session log — what was done, what's next
├── CLAUDE.md                      # This file
├── NOTES.md                       # Brain dump — low-priority bugs & feature ideas
├── pyproject.toml                 # Python config
└── .env                           # API credentials (git-ignored)
```

## Reference Documentation

| Document | When to Read |
| -------- | ------------ |
| `.claude/reference/vision.md` | Product vision, core loop, long-term direction |
| `.claude/reference/project-info.md` | Accounts, env vars, API setup, dev commands |
| `.claude/reference/userjourney.md` | Start of session (context), end of session (update) |
| `NOTES.md` | Low-priority bugs and feature ideas noticed by the user (brain dump, not urgent) |

## Rules

### Do's
- Use `getUser()` on the server (revalidates JWT with Supabase)
- Use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` everywhere
- Use `getAll`/`setAll` batch cookie methods in Supabase SSR
- Use `@/` import alias (never relative paths)
- Use semantic color tokens (`bg-primary`, `text-muted-foreground`)
- Use `"use client"` only when interactivity is needed
- Add `cleanup()` in `afterEach` for component tests

### Don'ts

- Never commit `.env` or `.env.local`
- Never use `getSession()` on the server — doesn't revalidate JWT
- Never use `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Never import from `@supabase/auth-helpers-nextjs` (deprecated)
- Never run code between `createServerClient()` and `getUser()` in proxy
- Never use individual cookie methods (`get`, `set`, `remove`) — use batch
- Never create `tailwind.config.ts` — v4 uses CSS-first config in `globals.css`
- Never use `@tailwind` directives — use `@import "tailwindcss"`
- Never use `darkMode: 'class'` — v4 uses `prefers-color-scheme` media query
- Never use raw color values (`bg-red-500`) — use semantic tokens
- Never use opacity modifiers on foreground (`text-foreground/60`)

### Known Issues / TODOs

- **Email confirmation template**: Must point to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
- **Proxy route protection**: Currently page-level only (`dashboard/page.tsx`). Should add proxy-level redirect.
- **Social login buttons**: Apple, Google, X buttons render but are non-functional (visual only)

## Conventions

### Next.js

- App Router, file-based routing in `frontend/app/`
- `proxy.ts` = Next.js per-request hook (refreshes auth). `lib/supabase/middleware.ts` = utility it calls (not the framework feature — confusing name from Supabase docs)
- TypeScript strict mode, ESLint flat config (v9+)
- Server Components by default

### Tailwind CSS v4

- Config lives in `globals.css` via `@theme inline` (no config file)
- `@import "tailwindcss"` instead of `@tailwind` directives
- Dark mode via `prefers-color-scheme` media query
- Add shadcn components: `pnpm dlx shadcn@latest add <component>` from `frontend/`

### Testing

- Tests in `frontend/__tests__/`, named `{feature}-{type}.test.ts`
- `pnpm test` (single run) / `pnpm test:watch` from `frontend/`
- Vitest config at `frontend/vitest.config.ts`, `@` alias maps to `frontend/`
- Mock `redirect()`: `await expect(fn()).rejects.toThrow("NEXT_REDIRECT")`

## Session Workflow

- **Start of session**: Read `userjourney.md` to understand where things left off and what's remaining.
- **End of session**: Run `/wrap-up` (git commit, userjourney.md, NOTES.md, conditional CLAUDE.md/README.md). Individual: `/update-user-journey`, `/update-notes`, `/update-claude-md`.
