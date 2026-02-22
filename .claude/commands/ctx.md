---
description: Look up library documentation via Context7, delegated to Gemini CLI to keep Claude's context lean
argument-hint: <library-name> <question about the library>
allowed-tools: Bash(gemini:*)
---

# Context7 Documentation Lookup via Gemini CLI

Use Gemini CLI to look up documentation for library `$ARGUMENTS`. Gemini has the Context7 MCP server configured and will fetch, read, and summarize the docs so that only a concise result enters your context.

## How to execute

Run this Bash command with a **300-second timeout**:

```bash
gemini -m gemini-2.5-flash -p 'You are a documentation lookup assistant. Your ONLY job is to use the Context7 MCP tools to find and answer $ARGUMENTS

INSTRUCTIONS:
1. Call resolve-library-id to find the Context7 library ID. Use the first word(s) as the library name and the full text as the query.
2. Call query-docs with that library ID and the full query.
3. From the returned documentation, extract ONLY what is relevant.

IMPORTANT: Formulate a comprehensible response meant to educate, do not copy-paste raw documentation.' -y -o text --allowed-mcp-server-names context7
```

## After execution

- **If successful**: Present the structured output from Gemini to the user as-is. It contains the distilled documentation.
- **If the command fails, times out, or returns an error**: Report the failure to the user and offer to call Context7 MCP directly as a fallback (warn that this will use more context window space).
- **If Gemini reports "no matching library"**: Suggest alternative library name spellings the user could try.
