# Oparax

AI-powered social media automation for professional news reporters. Monitors news sources on X, surfaces breaking stories, and drafts posts in the user's voice.

**Status:** Early development. Frontend scaffolded, X API v2 experimentation in progress.

## Motivation

Built around a validated use case: a football news reporter with 400k+ followers on X (~$1,400/month from social media) manually monitors dozens of accounts and news sources to catch breaking stories before competitors. Customer research was conducted before any code was written.

## Roadmap

Two independent pipelines planned:

- **Pipeline A (News Intelligence):** Monitor X accounts, cluster by topic, assess newsworthiness, alert user. Currently in Phase 1: X API experimentation.
- **Pipeline B (Content Generation):** Learn user writing style from past posts, draft in their voice, feedback loop, auto-post. Not started yet.

## Project Structure

```
oparax-chirp/
├── frontend/       # Next.js 16 app (pnpm), App Router, TypeScript, Tailwind CSS v4
├── backend/        # Python API server (planned, empty)
├── scripts/        # Standalone Python experiments (X API tests)
├── memory-bank/    # Context files for Cline (VS Code agent)
├── CLAUDE.md       # Context for Claude Code
├── pyproject.toml  # Root Python config (uv)
└── .env            # API credentials (gitignored)
```

## Tech Stack

All choices are directional and being validated. Nothing is locked in.

| Layer | Technology | Status |
|-------|------------|--------|
| Frontend | Next.js 16 (App Router, TypeScript, Tailwind v4) | Set up |
| Auth | OAuth via X.com | Planned |
| Database | Supabase | Considering |
| Social API | X API v2 | Experimenting |
| Intelligence | Grok API | Considering |
| Writing | Claude API | Considering |
| Deployment | Google Cloud | Considering |

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 20+
- [uv](https://docs.astral.sh/uv/) (Python package manager)
- [pnpm](https://pnpm.io/) (Node package manager)

### Setup

```bash
# Clone and install Python dependencies
uv sync

# Install frontend dependencies
cd frontend && pnpm install

# Start the frontend dev server
pnpm dev
```

Create a `.env` file at the project root with your X API credentials:

```
X_BEARER_TOKEN=your_token_here
```

### Run the X API test script

```bash
uv run python scripts/search_test.py
```

## Coding Agents

- **Cline (VS Code):** Uses [`memory-bank/`](memory-bank) for context, [`.clineignore`](.clineignore) for exclusions
- **Claude Code:** Uses [`CLAUDE.md`](CLAUDE.md) for project context

## License

[GNU Affero General Public License v3.0](LICENSE)
