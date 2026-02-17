# chirp-ai

AI-powered social media automation for news reporters.

## About

Tool for professional social media reporters who earn revenue from 
posting and need to catch breaking stories fast. Monitors their news 
sources on X, surfaces what matters, and eventually drafts posts in 
their voice.

First user: Reshad, football news reporter (400k+ X followers, 
~$1,400/month from social media). Validated before any code was written.

## Current Focus

Getting hands-on with the X API v2 Search Recent Posts endpoint:
- Can we search recent posts by a topic query?
- Can we filter results to specific X accounts?
- What do the query operators and annotation filters look like 
  for football news?
- What are the actual rate limits in practice?
- Simple local frontend to test queries and view results

This is experimentation, not product yet. Learning how the API 
works, what data comes back, and what's possible.

## Future Direction

Two pipelines are planned but not yet being built:

**News Intelligence:** Pull who the user follows on X, understand 
why (cluster by topic), monitor those accounts for breaking news, 
assess newsworthiness. Later: add website monitoring and research 
agents (Grok search, Perplexity, Gemini grounding, Exa, etc.).

**Content Generation:** Learn the user's writing style from their 
past tweets, draft posts in their voice when news breaks, improve 
through feedback on drafts, eventually auto-post once trusted.

## Tech Stack

Nothing is locked in. Current leanings being explored:
- Next.js for frontend + API routes
- Supabase for auth and database
- X API v2 for search, monitoring, posting
- Grok API for X-native intelligence tasks
- Claude API for writing and style analysis
- Google Cloud for deployment

All of this gets validated through building, not decided upfront.

## Development

- Building from scratch on a new laptop after 8 months away 
  from coding
- Manual-first approach: learn fundamentals, then automate
- Cline (VS Code) as primary coding assistant
- Claude Code as secondary
- agents.md as shared context across all coding tools
- Reusable workflows and skills built organically from real 
  friction during development