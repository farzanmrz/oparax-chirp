# Customer discovery

This directory is Oparax's customer-discovery record, reduced to what was learned. It is the canonical record, published in this repository at the owner's explicit decision; `findings.md` records observations with the exchange that shows each one, so the evidence is inspectable without the transcripts; it does not carry analysis.

## 2. Files

- **`people.tsv`:** The one ledger, one row per person contacted.
- **`reshad.md`:** Findings from Reshad Rahman, the single real user, summarized by epoch.
- **`findings.md`:** Observations from everyone else who engaged, each backed by the exchange that shows it.

## 3. Ledger schema

Columns: `cohort`, `name`, `x_handle`, `email`, `type`, `beat`, `stage`, `note`.

`stage` records the furthest thing that actually happened, never a judgment:

| Stage | Meaning |
| --- | --- |
| `contacted` | We reached out, nothing came back (note says `no contact path` where none existed) |
| `replied` | At least one reply |
| `conversed` | A real multi-message exchange |
| `demoed` | Saw a personalized demo |
| `activated` | Set up a working desk themselves |

`note` holds one short terminal fact where known (why it ended). Blank otherwise.

The funnel in `findings.md` uses 5 shorter stage names: List (every row), Text (rows we could actually message), Chat (`replied` or beyond), Demo (`demoed` or beyond), Active (`activated`). The ledger keeps `replied` and `conversed` apart because the note column reads differently for a one-line answer than for an exchange; the funnel does not need the split.

## 4. Aggregate outreach results

The funnel (listed, reachable, replied, conversed, demoed, activated, per segment and beat) sits at the top of `findings.md` and is the one place those numbers live.

## 5. Maintenance

Update `stage`/`note` when something actually happens, update the funnel in `findings.md` when the ledger changes, and add new learning to `reshad.md` or `findings.md` as an observation plus the exchange that shows it, not a full transcript.
