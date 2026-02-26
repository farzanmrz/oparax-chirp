---
name: session-log
description: Log what was done in this Claude Code session and what's remaining next. Use this when the user says things like "let's wrap up", "end of session", "log this session", "update the journey", or explicitly invokes /session-log.
argument-hint: ""
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Edit, Bash, Grep, Glob, AskUserQuestion
model: claude-sonnet-4-6
---

# Session Log

Append a new dated entry to `.claude/reference/userjourney.md` documenting what was accomplished in this session and what the user wants to do next.

## Entry Format

Each entry follows this exact structure:

```markdown
## YYYY-MM-DD HH:MM — Session `<session-id>`

### What was done

- **Area/Feature** — Concise description of what changed
- **Another area** — Another change

### What's remaining

- **Next thing** — What the user said they want to do next
```

## Process

### 1. Git add, commit, push

Run `git status` to check for uncommitted changes.

If there are changes (staged, unstaged, or untracked):

1. Ask the user: "Should I commit and push your changes?" with options "Yes (Recommended)" and "No, skip".
2. If yes:
   - Run `git add -A`
   - Run `git commit` with a concise message summarizing the session's work
   - Run `git push` to the current branch
3. If no, skip and proceed to Step 2.

### 2. Gather "What was done"

Read the conversation history to identify what was accomplished this session. Summarize each item as a bold area name followed by an em-dash and a concise description. Group related changes under one bullet.

Run `git diff --stat` and `git log --oneline -10` to cross-reference with actual file changes — do not list things that were only discussed but not implemented.

### 3. Ask for "What's remaining"

**NEVER infer or assume what's remaining.** Always ask the user directly:

Use `AskUserQuestion` with the question: "What's the immediate next thing you want to focus on in the next session?"

Suggestions may be offered as options based on conversation context, but always include an "Other" option (automatically provided). Only record what the user explicitly confirms.

### 4. Write the entry

Read `.claude/reference/userjourney.md` to get the current contents.

Use the current date/time from `date '+%Y-%m-%d %H:%M'` and the session ID `${CLAUDE_SESSION_ID}`.

**Merge rule:** If the last entry in `userjourney.md` is less than 1 hour old (compare the timestamp in its `##` heading with the current time), do NOT create a new entry. Instead, merge into the existing entry:
- Append new "What was done" bullets to the existing list
- Replace "What's remaining" with the newly confirmed items

**Otherwise:** Use `Edit` to append a new entry at the end of the file.

Do not modify or remove entries older than 1 hour — only append or merge into the most recent one.

> Note: The `### What was done` / `### What's remaining` headings repeat across entries. This is intentional and covered by `.markdownlint.json` (`"MD024": { "siblings_only": true }`).
