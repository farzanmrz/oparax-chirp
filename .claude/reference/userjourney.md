# User Journey — Session Log

## 2026-02-26 11:55 — Session `95377bae-eb0c-471a-bd46-de02153c8b58`

### What was done

- **Tech stack table** — Fixed versions (were vague like `5.x`, `4.x`, `latest`), added consistent naming (`Brand Name (npm-package)`), added Purpose column, added Vercel as deployment entry
- **vision.md** — Created with two-part structure: Part 1 (Current Scope & MVP) with core loop flowchart, news detection table (X API shelved → Grok 4.1 active), voice model, build status; Part 2 (Bigger Vision) as enterprise brand automation platform with multi-source/multi-platform diagram
- **project-info.md** — Created with all project primitives: GitHub info, Supabase setup, X.com API details, Vercel setup notes, env var tables, dev commands
- **Consolidated 6 reference files into CLAUDE.md** — Deleted `environment.md`, `frontend-nextjs.md`, `project-layout.md`, `supabase-auth.md`, `testing.md`, `vercel-deploy.md`. Moved critical rules to Do's/Don'ts, conventions inline, project layout as nested tree
- **userjourney.md** — Created this session log
- **session-log skill** — Created `.claude/skills/session-log/SKILL.md`: logs session work to `userjourney.md`, tags entries with date/time/session ID, always asks user for what's remaining (never infers), auto git add/commit/push with user confirmation
- **GitHub Issue #3 rewritten** — Replaced outdated description with phased
  plan: Phase 1 ✅ DONE (docs, shadcn init, test migration, README, skills),
  Phase 2 (Vercel + explore templates/shadcn), Phase 3 (build UI),
  Phase 4 (wire up auth + backend); long-term workflow scope preserved
- **Tech stack discussion** — Educational session: React/Next.js/Vercel
  relationship, TypeScript value, Tailwind v4 vs v3, Supabase as PostgreSQL
  wrapper, Vitest vs Vite, React Router irrelevance, shadcn CLI workflow,
  Vercel template mechanics (creates separate repo, not a branch)

### What's remaining

- **Vercel deployment** — Import `farzanmrz/oparax-chirp` (Import flow,
  not Create new), set root dir to `frontend`, add Supabase env vars,
  add Vercel URL to Supabase redirect URLs

## 2026-02-26 16:35 — Session `444581b9-b43c-4dd6-b8c6-30f72f24a1cf`

### What was done

- **Vercel deployment** — Diagnosed why Vercel showed "Other"
  (root `package.json` has no `next` dep; Next.js lives in
  `frontend/`); fixed by setting Root Directory to `frontend`;
  deployed successfully
- **oparax.com domain** — Configured live custom domain on
  Vercel; updated GoDaddy DNS (A `@` → Vercel IP, CNAME
  `www` → `cname.vercel-dns.com`); site live at oparax.com
- **DNS education** — Explained DNS, nameservers, A vs CNAME
  records, Option A vs B, 301 vs 307 redirects
- **shadcn UI rebuild** — Re-initialized shadcn with Nova
  style, gray oklch palette, Hugeicons, small radius; swapped
  font from Geist to Nunito Sans; installed `login-04` and
  `signup-04` blocks; created separate `/login` and `/signup`
  routes (replacing tab-based `(auth)/` single page); wired
  server actions with error display via searchParams; added
  confirm password validation (`validateSignupForm`); replaced
  Meta social icon with X.com/Twitter; deleted old `(auth)/`
  route group and stale root `package.json`; build passes
- **Documentation update** — Updated CLAUDE.md (project layout
  tree, tech stack, known issues, deployment status),
  project-info.md (Vercel now live), vision.md (build status),
  README.md (full rewrite with current structure and versions)
- **Bug fixes** — Fixed Supabase rate-limit error matching
  (regex instead of exact string since countdown varies);
  fixed button hover states (`[a]:hover` Nova bug — buttons
  had no hover; added `hover:bg-primary/90`, `active`,
  `cursor-pointer`); confirmed by reading Supabase auth logs
- **Landing bird image** — Moved `landing_bird.png` to
  `frontend/public/images/`; replaced placeholder.svg on
  both login and signup image panels
- **Supabase redirect URLs** — Configured `oparax.com` in
  Supabase → Authentication → URL Configuration →
  Redirect URLs; also updated Site URL
- **NOTES.md** — User created brain dump file for low-priority
  bugs and feature ideas; added reference to CLAUDE.md

### What's remaining

- **Button feedback** — Buttons still lack sufficient visual
  feedback on click/hover per user notes; revisit styling

## 2026-02-26 23:45 — Session `444581b9-b43c-4dd6-b8c6-30f72f24a1cf`

### What was done

- **Vercel build warnings** — Fixed `"Ignored build scripts"`
  warning by adding `pnpm.onlyBuiltDependencies` for esbuild
  and msw; fixed `"outputFileTracingRoot and turbopack.root"`
  conflict by removing now-unnecessary `turbopack.root` from
  `next.config.ts` (root `package-lock.json` that caused it
  is gone); both warnings resolved on Vercel
- **Button UX** — Added `active:` press states to outline,
  ghost, secondary, and destructive variants; created
  `SubmitButton` client component using `useFormStatus()` to
  show spinner and disable on submit (forms stay as server
  components); wired into login and signup forms — eliminates
  double-click errors and missing loading feedback
- **lib/ file recovery** — Core files (`lib/supabase/`,
  `lib/validation.ts`, `lib/auth-errors.ts`, `lib/utils.ts`,
  `app/auth/confirm/`) were accidentally deleted locally;
  restored with `git restore`; build confirmed passing
- **NOTES.md cleanup** — Removed resolved Frontend UI section
  (button feedback, double-click, loading state all fixed)

### What's remaining

- **Agentic workflow UI** — Build the core product feature:
  agentic workflow interface on the dashboard
