---
name: update-claude-md
description: Update CLAUDE.md, reference files, and README.md when project documentation is stale. Use after significant code changes, new features, tech stack updates, or deployment changes.
argument-hint: "[what to update]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
model: claude-sonnet-4-6
---

# Update CLAUDE.md

Update project documentation. If arguments are provided, focus on: **$ARGUMENTS**

## Scope

This skill manages three documentation files:

| File | Update when... |
| ---- | -------------- |
| `CLAUDE.md` | Project layout, tech stack, rules, conventions, or known issues changed |
| `.claude/reference/*.md` | Detail that doesn't fit in CLAUDE.md's 150-line limit |
| `README.md` | New user-visible features, tech stack changes, deployment/domain changes, roadmap progress |

## Rules

1. **Read before writing** — always read the target file's current contents first
2. **Skip is the default** — only update sections that are genuinely stale or missing info. Do not make cosmetic or speculative changes.
3. **150-line hard limit** — CLAUDE.md must never exceed 150 lines (including blank lines)
4. **Extract to reference files** — if adding content would push CLAUDE.md over 150 lines, create or update a file in `.claude/reference/` and add a row to the reference table
5. **Keep CLAUDE.md scannable** — high-level project info only (overview, tech stack, layout, rules, reference table). Detailed guides belong in reference files.
6. **Update the reference table** — if a new reference file is created, add it to the "Reference Documentation" table in CLAUDE.md
7. **Check for existing references** — before creating a new file, check if the content belongs in an existing one:

```
Glob with pattern=".claude/reference/*.md"
```

## Existing Reference Files

| File | Purpose |
| ---- | ------- |
| `vision.md` | Product vision, core loop, roadmap, build status |
| `project-info.md` | Accounts, env vars, API setup, dev commands |
| `userjourney.md` | Session log — what was done, what's next |

## Process

### 1. Assess what changed

Review the conversation history and recent git activity to determine which documentation files need updates. For each file, ask: "Is any section now stale or missing info?"

### 2. Update CLAUDE.md (if needed)

Common sections that go stale:
- **Project Layout** tree — new files/directories added or removed
- **Known Issues / TODOs** — items resolved or new ones discovered
- **Tech Stack** table — packages added, removed, or version-bumped
- **Rules** (Do's / Don'ts) — new conventions established
- **Reference Documentation** table — new reference files created

### 3. Update reference files (if needed)

Only if CLAUDE.md changes reference something that needs more detail. Read the relevant file, then Edit.

### 4. Update README.md (if needed)

Common sections that go stale:
- Feature descriptions or roadmap status
- Tech stack table
- Deployment info or live URLs
- Getting started / setup instructions

### 5. After updating

1. Count lines: `wc -l CLAUDE.md`
2. If over 150 lines, extract sections to reference files
3. Verify the reference table in CLAUDE.md lists all files in `.claude/reference/`
4. Report what was changed (or confirm nothing needed updating) and the current CLAUDE.md line count
