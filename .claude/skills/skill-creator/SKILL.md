---
name: skill-creator
description: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
argument-hint: "[skill-name]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Edit, Write, Grep, Glob, Bash, AskUserQuestion, WebSearch, TodoWrite
model: claude-opus-4-6
---

# Skill Creator

This skill provides guidance for creating effective Claude Code skills — modular, self-contained packages that extend Claude's capabilities with specialized knowledge, workflows, and tool integrations.

## Where Skills Live

All skills are created in the project's `.claude/skills/` directory:

```
<project-root>/.claude/skills/<skill-name>/SKILL.md
```

## Skill Directory Structure

```
skill-name/
├── SKILL.md           # Main instructions (required)
├── references/        # Documentation loaded into context as needed
│   └── detailed-guide.md
├── scripts/           # Executable code (Python/Bash/etc.)
│   └── helper.py
└── assets/            # Files used in output (templates, icons, fonts)
    └── template.html
```

- **SKILL.md**: Entrypoint with YAML frontmatter + markdown instructions.
- **references/**: Detailed docs Claude reads when needed (API specs, schemas, workflow guides). Keeps SKILL.md lean. Reference these from SKILL.md so Claude knows what each file contains.
- **scripts/**: Executable code for deterministic/repetitive tasks. Token-efficient, may execute without loading into context.
- **assets/**: Files used in output (templates, images, fonts). Not loaded into context.

**Hard limit: 500 lines.** If a SKILL.md would exceed 500 lines, split detailed content into `references/` files linked from SKILL.md. Below 500 lines, splitting is optional but encouraged when content benefits from separation.

## YAML Frontmatter Reference

Every SKILL.md begins with YAML frontmatter between `---` markers. **All core fields must always be included** when creating a new skill.

### Core Fields (always include)

| Field | Default | Description |
| :--- | :--- | :--- |
| `name` | directory name | Skill identifier. Lowercase letters, numbers, hyphens only (max 64 chars). Becomes the `/slash-command`. |
| `description` | first paragraph | What the skill does and when to use it. Claude uses this to decide when to apply the skill automatically. Be specific about triggers. |
| `argument-hint` | (none) | Hint shown during autocomplete for expected arguments. **Must be double-quoted** to avoid YAML parsing errors. Supports multiple arguments as space-separated hints within the quotes (e.g., single: `"[issue-number]"`, multiple: `"[component] [from-framework] [to-framework]"`). |
| `disable-model-invocation` | `false` | Set `true` to prevent Claude from auto-loading this skill. Use for manual-only workflows (`/deploy`, `/commit`). |
| `user-invocable` | `true` | Set `true` to show in the `/` menu for direct user invocation. Set `false` for background knowledge skills. |
| `allowed-tools` | `Read, Grep, Glob` | Tools Claude can use without asking permission when this skill is active. Accepts a comma-separated list (e.g., `Read, Grep, Glob, Bash`). See the [Available Tools Reference](#available-tools-reference) section for the current list. |
| `model` | `claude-sonnet-4-6` | Model to use when this skill is active. Options: `claude-haiku-4-5`, `claude-sonnet-4-6`, `claude-opus-4-6` |

### Subagent Fields (only when needed)

Include these **only** when the skill should run in an isolated subprocess. If no subagent is needed, omit entirely.

| Field | Default | Description |
| :--- | :--- | :--- |
| `context` | (none) | Set `fork` to run in an isolated subagent context. The skill content becomes the subagent's prompt. |
| `agent` | `general-purpose` | Subagent type when `context: fork` is set. Options: `Explore`, `Plan`, `general-purpose`, or custom from `.claude/agents/`. |

### Starter Template

When creating a new skill, always begin with this frontmatter:

```yaml
---
name: my-skill
description: What this skill does and when to use it
argument-hint: "[optional-args]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Grep, Glob
model: claude-sonnet-4-6
---
```

## String Substitutions

Skills support dynamic value substitution using the `$N` shorthand notation for positional arguments:

| Variable | Description |
| :--- | :--- |
| `$0`, `$1`, `$2`... | Access argument by 0-based index. `$0` = first argument, `$1` = second, etc. |
| `${CLAUDE_SESSION_ID}` | Current session ID. Useful for logging, session-specific files, or correlating output with sessions. |

**Example — component migration skill:**

```yaml
---
name: migrate-component
description: Migrate a component from one framework to another
argument-hint: "[component] [from-framework] [to-framework]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Grep, Glob
model: claude-sonnet-4-6
---

Migrate the $0 component from $1 to $2.
Preserve all existing behavior and tests.
```

Running `/migrate-component SearchBar React Vue` replaces `$0` → `SearchBar`, `$1` → `React`, `$2` → `Vue`.

**Example — session logging:**

```yaml
---
name: session-logger
description: Log activity for this session
argument-hint: "[message]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Read
model: claude-sonnet-4-6
---

Log the following to logs/${CLAUDE_SESSION_ID}.log:
$0
```

## Dynamic Content Injection

The `!`command`` syntax runs shell commands **before** the skill content is sent to Claude. The command output replaces the placeholder — Claude only sees the result, not the command.

**Example — PR summary skill:**

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
argument-hint: "[pr-number]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Bash(gh *)
model: claude-sonnet-4-6
context: fork
agent: Explore
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Task
Summarize this pull request...
```

When this skill runs:

1. Each `!`command`` executes immediately (preprocessing step)
2. The output replaces the placeholder in the skill content
3. Claude receives the fully-rendered prompt with actual data

This is useful for injecting live data from APIs, git state, file contents, or any shell command output.

## Frontmatter Examples

### Basic Skill (all core fields)

```yaml
---
name: explain-code
description: Explains code with visual diagrams and analogies. Use when explaining how code works or when the user asks "how does this work?"
argument-hint: "[file-or-topic]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Grep, Glob
model: claude-sonnet-4-6
---

When explaining code, always include:
1. An analogy comparing the code to everyday life
2. An ASCII diagram showing flow or relationships
3. A step-by-step walkthrough
4. A common gotcha or misconception
```

### Manual-Only Skill (disable-model-invocation: true)

A deploy skill that only the user can trigger — Claude will never auto-invoke it:

```yaml
---
name: deploy
description: Deploy the application to production
argument-hint: "[environment]"
disable-model-invocation: true
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash
model: claude-sonnet-4-6
---

Deploy $0 to production:
1. Run the test suite
2. Build the application
3. Push to the deployment target
4. Verify the deployment succeeded
```

### Background Knowledge Skill (user-invocable: false)

A skill that provides context Claude uses automatically — not a command users would type:

```yaml
---
name: api-conventions
description: API design patterns for this codebase. Use when writing or reviewing API endpoints.
argument-hint: ""
disable-model-invocation: false
user-invocable: false
allowed-tools: Read, Grep, Glob
model: claude-sonnet-4-6
---

When writing API endpoints:
- Use RESTful naming conventions
- Return consistent error formats: { error: { code, message, details } }
- Include request validation with Zod schemas
```

### Subagent Skill (context: fork + agent)

A research skill that runs in an isolated context:

```yaml
---
name: deep-research
description: Research a topic thoroughly across the codebase
argument-hint: "[topic]"
disable-model-invocation: false
user-invocable: true
allowed-tools: Read, Grep, Glob
model: claude-sonnet-4-6
context: fork
agent: Explore
---

Research $0 thoroughly:
1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

## Available Tools Reference

The following tools are currently available for the `allowed-tools` field. This list is generated dynamically and reflects the tools available in this environment, including any configured MCP servers:

!`claude -p "List all available tools you have access to right now, including names and brief descriptions. Format as a markdown table with Tool and Description columns." --print`

## Skill Creation Process

### Step 1: Gather Requirements

**Tools:** `AskUserQuestion`, `WebSearch`, `Glob`, `Read`, `TodoWrite`

When this skill is triggered, begin by briefly explaining what a skill is and then present the default YAML values. Use `AskUserQuestion` for structured option-based questions to gather all required information.

If the user wants to accomplish something but is unsure of the approach, use `WebSearch` to research libraries, APIs, or patterns relevant to the skill's domain. Use `Glob` and `Read` to explore existing skills in `.claude/skills/` for reference patterns.

Use `TodoWrite` to create a task list tracking the skill creation steps.

**Initial prompt to the user should include:**

1. A brief explanation: "A skill is a modular package that extends Claude's capabilities. It lives in a SKILL.md file with YAML frontmatter (configuration) and markdown instructions (what the skill does)."

2. Present the default values:
   - `name`: (derived from skill directory name)
   - `description`: (user must provide)
   - `argument-hint`: `""` (no arguments)
   - `disable-model-invocation`: `false` (Claude can auto-invoke)
   - `user-invocable`: `true` (visible in `/` menu)
   - `allowed-tools`: `Read, Grep, Glob`
   - `model`: `claude-sonnet-4-6`

3. Ask the user for each of the following:
   - **Name**: What should this skill be called? (lowercase, hyphens, becomes the `/slash-command`)
   - **Description**: What does this skill do and when should it be used?
   - **Arguments**: What arguments should be passed when invoking? (e.g., a filename, an issue number, multiple positional args)
   - **Invocation**: In plain language — should Claude be able to auto-invoke this, or should only the user trigger it manually? Should it appear in the `/` menu?
   - **Allowed tools**: What tools does this skill need? (e.g., read-only, full file access, shell commands, web access). Refer to the [Available Tools Reference](#available-tools-reference) section above for the current list.
   - **Model**: Which model should run this skill? (`claude-haiku-4-5` for fast/light, `claude-sonnet-4-6` for balanced, `claude-opus-4-6` for complex reasoning)
   - **Additional context**: Any other details about what the skill should do, how it should behave, or what domain knowledge it needs?

Avoid asking too many questions in a single message. Group related questions logically and follow up as needed.

### Step 2: Plan the Reusable Contents

**Tools:** `Grep`, `Glob`, `WebSearch`

Analyze the user's description and examples to identify reusable resources. Use `Grep` and `Glob` to find similar patterns in existing skills. Use `WebSearch` for documentation on unfamiliar libraries or APIs the skill will work with.

Determine what the skill needs beyond SKILL.md:

- **Scripts** for deterministic/repetitive code tasks
- **References** for documentation Claude should consult
- **Assets** for files used in output (templates, images)

### Step 3: Create the Skill Directory

**Tools:** `Bash`

Create the skill directory at `<project-root>/.claude/skills/<skill-name>/`:

```bash
mkdir -p .claude/skills/<skill-name>
```

Create subdirectories as needed for any references, scripts, or assets identified in Step 2.

### Step 4: Write the Skill Content

**Tools:** `Write`, `Edit`, `Read`

Use `Write` to create a new SKILL.md. Use `Edit` to modify an existing SKILL.md when updating a skill. Use `Write` for any reference files, scripts, or assets.

**Writing style:** Use imperative/infinitive form (verb-first instructions), not second person. Use objective, instructional language (e.g., "To accomplish X, do Y" rather than "You should do X").

Start with the [starter template](#starter-template) frontmatter populated with the user's answers from Step 1, then complete the markdown body by answering:

1. What is the purpose of the skill?
2. When should the skill be used?
3. How should Claude use it? Reference all bundled resources so Claude knows about them.

### Step 5: Test and Iterate

**Tools:** `Bash`, `Read`, `Edit`

After creating the skill, test it before considering it done. Use `Read` to review the created files. Use `Bash` to invoke the skill for testing. Use `Edit` to fix any issues found.

1. **Invoke the skill** with a realistic example to verify it triggers correctly (e.g., `/skill-name test-arg`)
2. **Try a second example** with different arguments or a different use case to check edge cases
3. **Verify tool access** — confirm the skill can use its allowed tools and is blocked from others as intended
4. **Check invocation behavior** — if `disable-model-invocation: false`, test that Claude picks it up automatically when relevant. If `user-invocable: true`, confirm it appears in the `/` menu.

If issues are found, update the SKILL.md (frontmatter or instructions) and test again. Common adjustments:
- Description too vague → Claude doesn't trigger it when expected
- Description too broad → Claude triggers it when not wanted
- Missing tools → skill fails mid-execution
- Wrong model → too slow or not capable enough for the task
