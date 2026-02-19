# 🐦 Oparax Chirp - Social Media Automater

## Overview

**Oparax Chirp** is a tool for professional social media reporters who earn
revenue from posting and need to catch breaking stories fast. It
monitors their news sources on X, surfaces what matters, and
eventually drafts posts in their voice.

**Status:** Early development. Currently experimenting with X API v2
Search Recent Posts endpoint.

## Motivation

Built around a validated use case of a football news reporter
with 400k+ followers on X (~$1,400/month from social media), manually
monitors dozens of accounts and news sources to catch breaking stories
before competitors. Customer research was conducted before any code
was written.

## Roadmap

The overall vision is:

- **News Intelligence Pipeline:** Monitor followed X accounts,
  cluster by topic, assess newsworthiness, add website monitoring
  and research agents
- **Content Generation Pipeline:** Learn user writing style from
  past tweets, draft posts in their voice, improve through feedback,
  eventually enable auto-posting

### Now

Getting hands-on with the X API v2 [Search Recent Posts](https://docs.x.com/x-api/posts/search-recent-posts) endpoint.

We have to investigate the following questions:

- Can we search recent posts by a topic query?
- Can we filter results to specific X accounts?
- What do the query operators and annotation filters look like
  for football news?
- What are the actual rate limits in practice?
- Simple local frontend to test queries and view results

## Tech Stack

Nothing is locked in. Current directions being validated therefore for each layer in bold below the option is "being considered" not final

- **Frontend:** Next.js
- **Auth / DB:** Supabase
- **Social API:** X API v2
- **Intelligence:** Grok API
- **Writing:** Claude API
- **Deployment:** Google Cloud

## Environment

- [uv](https://docs.astral.sh/uv/) (Python package manager)
- [pnpm](https://pnpm.io/) (Node package manager)
- Python 3.11+
- Node.js 20+

## Coding Agents

### Cline (VS Code) - Primary

- [`memory-bank/`](memory-bank): Stores 6 files needed for Cline's memory
- [`.clineignore`](.clineignore): Files to never take into context

### Claude Code - Planned Later

- `CLAUDE.md`: When initializing later

### Others - Planned Later

- `AGENTS.md` for shared context across tools

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE)
