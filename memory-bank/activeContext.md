# Active Context

## Current Work Focus

**Phase:** X API v2 experimentation (Pipeline A, Phase 1)

**Immediate goal:** Get hands-on with the X API v2 Search Recent Posts endpoint to answer foundational questions before building any pipelines.

## Investigation Questions

From README.md, we need to answer:

1. Can we search recent posts by a topic query?
2. Can we filter results to specific X accounts?
3. What do the query operators and annotation filters look like for football news?
4. What are the actual rate limits in practice?
5. Build simple local frontend to test queries and view results

## Current State

- **Code written:** None beyond repo scaffold
- **Dependencies:** None installed (pyproject.toml is empty)
- **X API access:** Not yet configured
- **Frontend:** Not started

## Next Steps

1. Set up X API v2 access (developer account, credentials)
2. Write Python script to test Search Recent Posts endpoint
3. Experiment with query operators for football news
4. Test filtering by specific accounts
5. Document rate limit behavior
6. Build minimal frontend for query testing

## Active Decisions

- Tech stack choices are **directional, not final** — validating through implementation
- Manual-first approach: learn APIs by hand before abstracting
- No premature optimization — get something working first

## Important Patterns

- Document learnings as we go (update memory bank)
- Test with real data (football news) from the start
- Keep scope tight — only what's needed for Phase 1