# Testing Reference

Read this before writing tests, running tests, or modifying test infrastructure.

## Test Directory Structure

Tests live inside `frontend/__tests__/`, organized by feature area.

```text
frontend/__tests__/
└── auth/                   # Auth-related tests
    ├── auth-errors.test.ts
    ├── auth-page.test.tsx
    ├── confirm-route.test.ts
    ├── login-actions.test.ts
    ├── signup-actions.test.ts
    └── validation.test.ts
```

## Running Tests

```bash
cd frontend && pnpm test       # Run all unit tests (single run)
cd frontend && pnpm test:watch # Watch mode
```

## Conventions

- **File naming**: `{feature}-{type}.test.ts` (e.g., `login-actions.test.ts`, `auth-page.test.tsx`)
- **Imports**: Always use `@/` alias (e.g., `import { login } from "@/app/(auth)/login/actions"`) — never relative paths.
- **Vitest config** lives at `frontend/vitest.config.ts`. Only alias needed: `@` maps to `frontend/`.
- **DOM cleanup**: Use explicit `afterEach(() => { cleanup(); })` in component tests — auto-cleanup doesn't work reliably with React Suspense boundaries.
- **Mock pattern for `redirect()`**: Next.js `redirect()` throws `NEXT_REDIRECT`. Tests use `await expect(fn()).rejects.toThrow("NEXT_REDIRECT")` then assert on a `mockRedirect` spy.
