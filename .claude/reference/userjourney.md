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

- **Vercel deployment** — Diagnosed why Vercel showed "Other" (root `package.json` has no `next` dep; Next.js lives in `frontend/`); fixed by setting Root Directory to `frontend`; deployed successfully
- **oparax.com domain** — Configured live custom domain on Vercel; explained DNS concepts (A record, CNAME, nameservers, Option A vs B); updated GoDaddy DNS (A `@` → `216.198.79.1`, CNAME `www` → `cname.vercel-dns.com`); site now live at oparax.com
- **DNS education** — Explained what DNS is, what nameservers are, why two records are needed, 301 vs 307 redirects, and why Option A (individual records) is preferred over handing DNS to Vercel
- **shadcn UI plan approved** — Chose theme: Nova style, Gray base, Hugeicons icons, Nunito Sans font, small radius; chose `login-04` and `signup-04` blocks; planned auth route restructure (separate `/login` and `/signup` pages replacing tab-based single page); plan saved and approved

### What's remaining

- **shadcn UI rebuild** — Execute approved plan: run `shadcn init` with new theme, add `login-04` / `signup-04` blocks, restructure auth routes, wire server actions, swap font/icons, clean up old files
