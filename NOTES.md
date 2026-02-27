# NOTES — Low-Priority Bugs & Feature Ideas

## Dashboard

- **Workflow detail page (404)** — Clicking a workflow card on the dashboard goes to `/dashboard/workflows/[id]` which returns 404. Needs a detail/expand page showing workflow config, run history, and draft review. (Issue #11)
- **Workflow list as table** — Dashboard currently shows workflows as stacked cards. Should be a proper table with columns (name, status, frequency, handles, last run) for better scanability at scale.
