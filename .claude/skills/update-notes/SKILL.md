---
name: update-notes
description: Update NOTES.md with new low-priority bugs/features or remove resolved items. Use when wrapping up a session or when the user mentions a brain-dump item.
argument-hint: ""
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Edit, Grep
model: claude-sonnet-4-6
---

# Update Notes

Maintain `NOTES.md` — the brain dump file for low-priority bugs and feature ideas.

## Rules

- **NOTES.md is never deleted.** It can be completely empty (just a heading), but the file always exists.
- Items are a flat bullet list under the `# UX` heading.
- Each item is a single dash-prefixed line describing the bug or feature idea.
- Keep items concise — one or two sentences max.

## Process

### 1. Read current state

Read `NOTES.md` to see what's already tracked.

### 2. Scan conversation for new items

Look through the conversation history for bugs or feature ideas the user mentioned as **not a current priority** — things like:
- "we should fix this later"
- "not now but eventually"
- "brain dump"
- "low priority"
- "nice to have"
- Bugs noticed in passing but not addressed this session

Only add items the user explicitly flagged as non-urgent. Do not add items that were actively worked on this session.

### 3. Identify resolved items

Cross-reference existing NOTES.md items with work done this session. If an item was fixed or implemented, remove it.

### 4. Apply changes

- **Add** new items at the end of the bullet list
- **Remove** resolved items
- If all items are resolved and nothing new was mentioned, leave just the heading:

```markdown
# UX
```

- If no changes are needed (nothing new, nothing resolved), state "No NOTES.md updates needed" and skip editing.

### 5. Report

State what was added and/or removed, or confirm no changes were needed.
