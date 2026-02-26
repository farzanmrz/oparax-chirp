---
name: update-claude-md
description: Update CLAUDE.md and reference files while enforcing the 150-line limit
argument-hint: <what to add or update in project documentation>
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Update CLAUDE.md

Update the project documentation with: **$ARGUMENTS**

## Rules

1. **Read CLAUDE.md first** — always start by reading the current contents
2. **150-line hard limit** — CLAUDE.md must never exceed 150 lines (including blank lines and comments)
3. **Extract to reference files** — if adding content would push CLAUDE.md over 150 lines, create or update a file in `.claude/reference/` instead and add a row to the reference table in CLAUDE.md
4. **Keep CLAUDE.md scannable** — it should contain only high-level project info (overview, tech stack, commands, architecture, reference table). Detailed rules, patterns, and guides belong in reference files
5. **Update the reference table** — if you create a new reference file, add it to the "Reference Documentation" table in CLAUDE.md with a clear "When to Read" description
6. **Check for existing references** — before creating a new reference file, check if the content belongs in an existing one:

```
Glob with pattern=".claude/reference/*.md"
```

## Existing Reference Files

| File | Purpose |
| ---- | ------- |
| `project-layout.md` | File structure and what each file does |
| `frontend-nextjs.md` | Frontend pages, components, styling, Tailwind, Next.js config |
| `supabase-auth.md` | Authentication, Supabase clients, proxy/middleware, sessions |
| `testing.md` | Test conventions, running tests, test infrastructure |
| `environment.md` | Environment variables, deployment config, credentials |
| `vercel-deploy.md` | Vercel deployment setup and configuration |

## After Updating

1. Count lines in CLAUDE.md: `wc -l CLAUDE.md`
2. If over 150 lines, extract sections to reference files
3. Verify the reference table lists all files in `.claude/reference/`
4. Report what was changed and the current line count
