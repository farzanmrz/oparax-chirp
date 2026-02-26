---
name: supabase-doc
description: Query Supabase documentation via the Supabase MCP server
argument-hint: <topic or question about Supabase>
allowed-tools: mcp__supabase__search_docs, Read, Bash
---

# Supabase Documentation Lookup

Search the Supabase documentation for: **$ARGUMENTS**

## CRITICAL: Two-Phase Query Strategy

Supabase doc pages are huge (50-100k+ chars each). Requesting `content` for multiple results WILL overflow the context. You MUST follow this two-phase approach.

### Phase 1 — Lightweight Index (always do this first)

Query with `limit: 5` but request ONLY `title` and `href`. Never request `content` in this phase.

```graphql
{
  searchDocs(query: "<user query>", limit: 5) {
    nodes {
      title
      href
    }
  }
}
```

Present results as a numbered list so the user can see what's available.

### Phase 2 — Targeted Content Fetch (single result only)

Pick the MOST relevant result from Phase 1. Query again with `limit: 1` using the **exact title** from Phase 1 as the query string (this dramatically improves search relevance vs. paraphrasing). Request `content` and subsection structure:

```graphql
{
  searchDocs(query: "<exact title from Phase 1>", limit: 1) {
    nodes {
      title
      href
      content
      ... on Guide {
        subsections {
          nodes {
            title
            href
          }
        }
      }
    }
  }
}
```

### Overflow Handling

If Phase 2 still overflows (result saved to a file instead of returning inline):

1. Use the `Read` tool on the saved file path with `limit: 150` to read the first portion.
2. Use `Grep` or `Read` with `offset` to find the specific section relevant to the user's query.
3. Summarize what you extracted — do NOT attempt to read the entire file.

## After execution

- Present a concise, distilled summary — NOT raw documentation walls
- Include the **doc title**, **key takeaways**, and **href link** to the full page
- If the query spans multiple Supabase features, run Phase 1 for each feature separately
- If no results match, suggest alternative search terms
