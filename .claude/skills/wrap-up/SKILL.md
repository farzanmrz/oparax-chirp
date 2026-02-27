---
name: wrap-up
description: Comprehensive end-of-session wrap-up. Commits code, updates userjourney.md, NOTES.md, and conditionally updates CLAUDE.md/README.md. Use when the user says "let's wrap up", "end of session", or invokes /wrap-up.
argument-hint: ""
disable-model-invocation: true
user-invocable: true
allowed-tools: Read, Edit, Write, Bash, Grep, Glob, AskUserQuestion
model: claude-sonnet-4-6
---

# Wrap Up

Comprehensive end-of-session wrap-up. Performs four phases in order:

1. Git commit & push + userjourney.md update
2. NOTES.md update
3. Conditional CLAUDE.md / reference files / README.md update
4. Final summary

---

## Phase 1: Git + User Journey

### 1a. Git add, commit, push

Run `git status` to check for uncommitted changes.

If there are changes (staged, unstaged, or untracked):

Always add, commit and push:
- Run `git add -A`
- Run `git commit` with a concise message summarizing the session's work
- Run `git push` to the current branch

### 1b. Gather "What was done"

Read the conversation history to identify what was accomplished this session. Summarize each item as a bold area name followed by an em-dash and a concise description. Group related changes under one bullet.

Run `git diff --stat` and `git log --oneline -10` to cross-reference with actual file changes — do not list things that were only discussed but not implemented.

### 1c. Determine "What's remaining"

**INFER or assume what's remaining.** Always a single feature user wants to immediately target next.

Suggestions are derived based on conversation context, but always consider user might have stated "Other" priorities explicitly at the end or in the middle of conversation.

### 1d. Write the userjourney.md entry

Read `.claude/reference/userjourney.md` to get the current contents.

Use the current date/time from `date '+%Y-%m-%d %H:%M'` and the session ID `${CLAUDE_SESSION_ID}`.

**Merge rule:** If the last entry in `userjourney.md` is less than 1 hour old (compare the timestamp in its `##` heading with the current time), do NOT create a new entry. Instead, merge into the existing entry:
- Append new "What was done" bullets to the existing list
- Replace "What's remaining" with the newly confirmed items

**Otherwise:** Use `Edit` to append a new entry at the end of the file.

Do not modify or remove entries older than 1 hour — only append or merge into the most recent one.

> Note: The `### What was done` / `### What's remaining` headings repeat across entries. This is intentional and covered by `.markdownlint.json` (`"MD024": { "siblings_only": true }`).

---

## Phase 2: NOTES.md

### 2a. Read current state

Read `NOTES.md` to see what's already tracked.

### 2b. Scan for new items

Look through the conversation for bugs or feature ideas the user mentioned as **not a current priority** — things like "fix later", "not now", "brain dump", "low priority", "nice to have", or bugs noticed in passing but not addressed.

Only add items the user explicitly flagged as non-urgent. Do not add items that were actively worked on this session.

### 2c. Identify resolved items

Cross-reference existing NOTES.md items with work done this session (the "What was done" list from Phase 1). Remove items that were fixed or implemented.

### 2d. Apply changes

- **Add** new items at the end of the bullet list under `# UX`
- **Remove** resolved items
- If all items are resolved and nothing new was mentioned, leave just:

```markdown
# UX
```

- If no changes are needed, state "No NOTES.md updates needed" and move on.

---

## Phase 3: CLAUDE.md + References + README.md (conditional)

**This phase only runs if something genuinely changed.** Skip is the default.

### 3a. Assess what changed

Review the "What was done" list from Phase 1. Does any of the following apply?

**CLAUDE.md triggers:**
- Project layout changed (new files/directories added or removed)
- Known Issues / TODOs resolved or new ones discovered
- New rules or conventions established
- Tech stack changes (packages added/removed/bumped)

**Reference file triggers:**
- CLAUDE.md changes need detail that belongs in a reference file (vision.md, project-info.md)

**README.md triggers:**
- New user-visible features
- Tech stack table changes
- Deployment or domain changes
- Roadmap status changes

If none of these apply, state "No documentation updates needed" and skip to Phase 4.

### 3b. Update CLAUDE.md (if triggered)

1. Read `CLAUDE.md`
2. Edit only the affected sections
3. Count lines: `wc -l CLAUDE.md` — must stay under 150 lines
4. If over 150 lines, extract detail to `.claude/reference/` and add a reference table row

### 3c. Update reference files (if triggered)

Read the relevant reference file, then Edit only what changed.

### 3d. Update README.md (if triggered)

Read `README.md`, then Edit only the affected sections. Keep it brief and scannable.

---

## Phase 4: Final Summary

Report what was updated across all phases:

```
Session wrap-up complete:
- userjourney.md: [updated / merged into existing entry]
- NOTES.md: [added N items, removed N items / no changes]
- CLAUDE.md: [updated sections X, Y / no changes needed]
- README.md: [updated sections X, Y / no changes needed]
```
