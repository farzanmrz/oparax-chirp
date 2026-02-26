# Oparax

AI-powered social media automation for professional news reporters. Monitors news sources on X, surfaces breaking stories, and drafts posts in the user's voice.

**Status:** Early development. Frontend auth flow complete, X API v2 experimentation in progress.

## Motivation

Built around a validated use case: a football news reporter with 400k+ followers on X (~$1,400/month from social media) manually monitors dozens of accounts and news sources to catch breaking stories before competitors. Customer research was conducted before any code was written.

## Roadmap

Two independent pipelines planned:

- **Pipeline A (News Intelligence):** Monitor X accounts, cluster by topic, assess newsworthiness, alert user. Currently in Phase 1: X API experimentation.
- **Pipeline B (Content Generation):** Learn user writing style from past posts, draft in their voice, feedback loop, auto-post. Not started yet.

## Tech Stack

| Category | Tool | Version |
| -------- | ---- | ------- |
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui | latest |
| Auth & Database | Supabase | 2.97.0 |
| Testing | Vitest + React Testing Library | 4.0.18 |
| Social API | X API v2 | - |
| Intelligence | Grok API | planned |
| Content Generation | Claude API | planned |
| Deployment | Vercel (frontend) | - |
| Python | Python + uv | 3.11+ |

## Project Structure

```
oparax-chirp/
├── frontend/              # Next.js 16 app (TypeScript, Tailwind v4, shadcn/ui)
│   ├── app/               # Pages and routes (App Router)
│   ├── lib/               # Shared utilities (Supabase clients, validation)
│   ├── __tests__/         # Vitest unit tests
│   └── components/        # UI components (shadcn/ui)
├── backend/               # Python API server (planned)
├── scripts/               # Python experiments (X API tests)
├── .claude/               # Claude Code config and reference docs
├── CLAUDE.md              # Claude Code project instructions
├── pyproject.toml         # Python dependencies (uv)
└── .env                   # API credentials (git-ignored)
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 20+
- [uv](https://docs.astral.sh/uv/) — Python package manager
- [pnpm](https://pnpm.io/) — Node.js package manager

### Setup

```bash
# Clone the repo
git clone https://github.com/farzanmrz/oparax-chirp.git
cd oparax-chirp

# Install Python dependencies
uv sync

# Install frontend dependencies and start dev server
cd frontend
pnpm install
pnpm dev
```

The frontend dev server runs at `http://localhost:3000`.

### Environment Variables

Create `.env` at the project root:

```
X_BEARER_TOKEN=your_x_api_token
X_CONSUMER_KEY=your_consumer_key
X_SECRET_KEY=your_secret_key
```

Create `frontend/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### Running Tests

```bash
cd frontend
pnpm test         # Single run
pnpm test:watch   # Watch mode
```

### Running the X API Test Script

```bash
uv run python scripts/search_test.py
```

## Coding Agents

- **Claude Code:** Uses [`CLAUDE.md`](CLAUDE.md) for project context, with detailed reference docs in `.claude/reference/`

## License

[GNU Affero General Public License v3.0](LICENSE)
