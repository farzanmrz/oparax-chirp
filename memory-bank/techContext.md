# Tech Context

## Technologies Used

**All choices are directional and being validated. Nothing is locked in.**

### Current Stack (Being Evaluated)

| Component | Technology | Purpose | Status |
|-----------|------------|---------|--------|
| Frontend | Next.js | Web interface for query testing, monitoring, drafts | Considering |
| Auth / DB | Supabase | User auth, data storage, real-time subscriptions | Considering |
| Social API | X API v2 | Search posts, monitor accounts, post content | Experimenting |
| Intelligence | Grok API | Newsworthiness assessment, account clustering | Considering |
| Writing | Claude API | Style learning, draft generation | Considering |
| Deployment | Google Cloud | Hosting, scaling, infrastructure | Considering |

### Alert Channels (Future)

- WhatsApp
- Discord
- Telegram
- Email

## Development Setup

### Package Managers

- **Python:** [uv](https://docs.astral.sh/uv/) — fast Python package manager
- **Node.js:** [pnpm](https://pnpm.io/) — efficient Node package manager

### Runtime Requirements

- Python 3.11+
- Node.js 20+

### Version Control

- Git with SSH keys for GitHub
- `gh` CLI authenticated
- Remote: `git@github.com:farzanmrz/oparax-chirp.git`

### Coding Agents

- **Primary:** Cline (VS Code extension)
- **Secondary:** Claude Code (uses `CLAUDE.md`)
- **Shared context:** `AGENTS.md` for cross-tool context

### Global Workflows

- Project init workflow at `~/Documents/Cline/Workflows/init-project.md`

## Technical Constraints

### X API v2

- Search Recent Posts endpoint: posts from last 7 days
- Rate limits: TBD (part of experimentation)
- Authentication: OAuth 2.0 (to be implemented)
- Access level: Basic (free) vs Pro vs Enterprise (to be determined)

### Rate Limits (Unknown)

Part of Phase 1 experimentation is discovering actual rate limits in practice.

### Data Storage

- User's past posts for style learning
- Followed accounts and clusters
- Draft history and feedback
- Newsworthiness scoring models

## Dependencies

**Current (pyproject.toml):**
```toml
[project]
name = "oparax-chirp"
version = "0.1.0"
description = "AI-powered social media automation for news reporters"
requires-python = ">=3.11"
dependencies = []
```

**No dependencies installed yet.** Will add as needed during experimentation.

## Tool Usage Patterns

### Python Development

1. Use `uv` for all Python package management
2. Create virtual environment with `uv venv`
3. Add dependencies with `uv add <package>`
4. Run scripts with `uv run python <script>`

### Node.js Development

1. Use `pnpm` for all Node package management
2. Initialize with `pnpm init`
3. Add dependencies with `pnpm add <package>`
4. Run scripts with `pnpm <script>`

### Git Workflow

1. Feature branches from main
2. Descriptive commit messages
3. PRs for review (even solo — good practice)

## Environment Variables

Will need (not yet created):

```
# X API
X_API_KEY=
X_API_SECRET=
X_ACCESS_TOKEN=
X_ACCESS_TOKEN_SECRET=
X_BEARER_TOKEN=

# Supabase (future)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Claude API (future)
ANTHROPIC_API_KEY=

# Grok API (future)
GROK_API_KEY=
```

## Project Structure (Current)

```
oparax-chirp/
├── .gitignore
├── .python-version
├── LICENSE
├── pyproject.toml
├── README.md
└── memory-bank/
    ├── projectbrief.md
    ├── productContext.md
    ├── activeContext.md
    ├── systemPatterns.md
    ├── techContext.md
    └── progress.md
```

Will evolve as development progresses.