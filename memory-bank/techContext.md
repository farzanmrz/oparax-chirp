# Tech Context

## Stack

All choices are directional and being validated. Nothing is locked in.

| Component | Technology | Status |
|-----------|------------|--------|
| Frontend | Next.js 16 (App Router, TypeScript, Tailwind CSS v4) | Set up |
| Auth | OAuth via X.com (single "Continue with X" flow) | Planned |
| Database | Supabase | Considering |
| Social API | X API v2 | Experimenting |
| Intelligence | Grok API | Considering |
| Writing | Claude API | Considering |
| Deployment | Google Cloud | Considering |

### Alert Channels (Future)

- WhatsApp, Discord, Telegram, Email

## Development Setup

### Package Managers

- **Python:** [uv](https://docs.astral.sh/uv/)
- **Node.js:** [pnpm](https://pnpm.io/)

### Runtime Requirements

- Python 3.11+
- Node.js 20+

### Version Control

- Git with SSH keys for GitHub
- `gh` CLI authenticated
- Remote: `git@github.com:farzanmrz/oparax-chirp.git`

### Coding Agents

- **Cline:** VS Code extension, uses `memory-bank/` for context
- **Claude Code:** Uses `CLAUDE.md` for project context

## Technical Constraints

### X API v2

- Search Recent Posts endpoint: posts from last 7 days
- Rate limits: TBD (part of experimentation)
- Authentication: Bearer Token (currently), OAuth 2.0 (future for user actions)
- Access level: Basic (free) vs Pro vs Enterprise (to be determined)

### Data Storage (Future)

- User's past posts for style learning
- Followed accounts and clusters
- Draft history and feedback

## Dependencies

### Python (pyproject.toml)

```toml
dependencies = [
    "python-dotenv>=1.2.1",
    "requests>=2.32.5",
]
```

### Frontend (frontend/package.json)

- `next` 16.1.6, `react` 19.2.3, `react-dom` 19.2.3
- Dev: `tailwindcss` v4, `typescript` v5, `eslint` v9, `@tailwindcss/postcss`

## Environment Variables

`.env` at project root (gitignored):

```
# X API (required for scripts/)
X_BEARER_TOKEN=

# Future
SUPABASE_URL=
SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
GROK_API_KEY=
```

## Project Structure

```
oparax-chirp/
├── frontend/           # Next.js 16 app (pnpm)
│   ├── app/            # App Router pages and layouts
│   │   ├── layout.tsx  # Root layout (HTML shell, fonts, metadata)
│   │   ├── page.tsx    # Home page (auth landing)
│   │   └── globals.css # Tailwind v4 config + global styles
│   ├── public/         # Static assets
│   └── package.json    # Frontend dependencies
├── backend/            # Python API server (planned, empty)
├── scripts/            # Standalone experiments
│   └── search_test.py  # X API v2 Search Recent Posts test
├── memory-bank/        # Context files for Cline
├── CLAUDE.md           # Context for Claude Code
├── pyproject.toml      # Root Python config (uv)
└── .env                # API credentials (gitignored)
```
