# X API Reference

Read this before touching the search API route or any X API calls.

## Current Auth: Bearer Token

All current scripts use App-Only auth via Bearer Token. This is read-only and does not require a user to be logged in.

```bash
# Header for all requests
Authorization: Bearer $X_BEARER_TOKEN
```

`X_BEARER_TOKEN` must stay server-side only. Never put it in a `NEXT_PUBLIC_` env var or pass it to a client component.

## Future Auth: OAuth 2.0 User Context

Required for any action that needs to act as a user: posting tweets, reading a user's home timeline, accessing their followed accounts. This is not implemented yet. When it is, the user's OAuth access token (stored in Supabase) is used instead of the Bearer Token.

## Search Recent Posts Endpoint

**Confirmed working** as of Phase 1 experimentation.

```
GET https://api.x.com/2/tweets/search/recent
```

Returns tweets from the **last 7 days** only. This is a hard constraint of the endpoint — historical search requires Academic Research access (not available on Basic tier).

### Key Query Parameters

| Parameter | Purpose | Example |
| --- | --- | --- |
| `query` | Search string with operators | `"fc barcelona news"` |
| `max_results` | Results per page (10–100) | `10` |
| `expansions` | Additional objects to include | `author_id` |
| `user.fields` | Fields on expanded user objects | `username,name` |
| `tweet.fields` | Extra fields on tweet objects | `created_at,author_id` |

### Query Operators (to be explored)

- `from:username` — tweets from a specific account
- `to:username` — replies to a specific account
- `has:links` — tweets containing URLs
- `lang:en` — filter by language
- Boolean: `AND` (default when terms are adjacent), `OR`, `-` (NOT)
- Exact phrase: `"breaking news"`

### Working Example

`scripts/search_test.py` — searches `"fc barcelona news"` with author expansion. Confirmed returns 10 results with author username and name.

Run it: `uv run python scripts/search_test.py`

## Outstanding Questions (Phase 1)

These are the open investigation items. Update this doc as answers are confirmed.

- [ ] Does `from:` operator work as expected for filtering to specific accounts?
- [ ] What boolean/annotation operators work best for football news filtering?
- [ ] What are the actual rate limits in practice on Basic tier?
- [ ] Is Basic (free) tier sufficient, or do we need Pro?

## Access Levels

| Tier | Monthly cost | Rate limit (estimated) | Notes |
| --- | --- | --- | --- |
| Basic (free) | $0 | Low | Sufficient for experimentation |
| Pro | $100 | Higher | Needed if rate limits block experimentation |
| Enterprise | Custom | Highest | Out of scope |

Current tier: Basic. Do not upgrade without testing rate limits first.

## Env Vars for X API

```bash
X_BEARER_TOKEN=     # App-only auth — server-side read calls
X_CONSUMER_KEY=     # OAuth app credentials
X_SECRET_KEY=       # OAuth app credentials
```
