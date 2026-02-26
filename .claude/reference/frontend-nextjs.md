# Frontend & Next.js Reference

Read this before working on frontend pages, components, styling, Tailwind, or Next.js configuration.

## Conventions

- **App Router**: Pages live in `frontend/app/`. File `app/foo/page.tsx` maps to route `/foo`.
- **Import alias**: `@/*` maps to `frontend/*` (e.g., `import { X } from '@/components/X'`).
- **Server Components by default**: Only add `"use client"` when interactivity is needed (state, effects, event handlers).
- **TypeScript strict mode** is enabled. Path resolution uses `"moduleResolution": "bundler"`.
- **ESLint**: Flat config format (v9+) in `eslint.config.mjs`.
- **Turbopack root**: `next.config.ts` sets `turbopack.root` to `process.cwd()` because the monorepo root has a stale `package-lock.json` that confuses Turbopack's workspace detection.
- **Proxy (formerly Middleware)**: `frontend/proxy.ts` runs on every request to refresh Supabase auth tokens. Next.js 16 renamed `middleware.ts` to `proxy.ts` (function export: `proxy()` not `middleware()`).

## Tailwind CSS v4

This project uses **Tailwind v4**, which is significantly different from v3.

### v4 vs v3 differences

| v3 (old) | v4 (this project) |
| -------- | ------------------ |
| `@tailwind base; @tailwind components;` | `@import "tailwindcss";` |
| `tailwind.config.ts` for theme | `@theme inline` in CSS for theme |
| Plugin-based PostCSS | `@tailwindcss/postcss` single plugin |
| Class-based dark mode | `prefers-color-scheme` media query |

### Common pitfalls

- **Don't create `tailwind.config.ts`** — v4 uses CSS-first config in `globals.css`. AI tools and online tutorials often generate v3 config which won't work.
- **Don't use `@tailwind` directives** — use `@import "tailwindcss"` instead.
- **Don't use `darkMode: 'class'`** — v4 uses `@media (prefers-color-scheme: dark)` by default.
- **Opacity modifiers on custom colors**: `text-foreground/60` doesn't work on CSS variable colors. Use `text-muted-foreground` semantic token instead.

### shadcn/ui Integration

shadcn/ui is installed and configured. It uses the existing CSS variables from `globals.css`. When adding new shadcn components, run `pnpm dlx shadcn@latest add <component>` from `frontend/`.

## Color System

Semantic color palette defined via CSS custom properties in `frontend/app/globals.css`, registered in `@theme inline` for Tailwind v4. Both light and dark mode supported via `prefers-color-scheme`.

### Available Tailwind Color Classes

- `bg-background`, `text-foreground` — page surface
- `bg-card`, `text-card-foreground` — elevated cards
- `bg-primary`, `text-primary-foreground`, `hover:bg-primary-hover` — brand buttons/links
- `bg-accent`, `text-accent-foreground` — secondary highlights
- `bg-muted`, `text-muted-foreground` — subdued text/surfaces
- `border-border`, `border-input` — borders
- `ring-ring` — focus rings
- `bg-destructive-bg`, `text-destructive` — error states
- `bg-success-bg`, `text-success` — success states

### Color Rules

- Do NOT use raw color values (e.g., `bg-red-500`). Use semantic tokens.
- Do NOT use opacity modifiers on `foreground` (e.g., `text-foreground/60`). Use `text-muted-foreground` instead.
