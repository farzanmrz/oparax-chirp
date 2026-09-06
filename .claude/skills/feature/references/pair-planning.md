# Fable and Astra planning protocol

Read this once when /feature starts. This protocol applies to /feature only.
/amend and /qc keep their current behavior until the owner changes them.

## Roles and independence

- **One conversation:** The host talks to the owner, loads skill bundles, writes files, and launches the peer. In Claude Code the host is Fable and the peer is Astra. In Codex the host must be Astra and the peer is Fable. Never call another model Fable or Astra. If the required model is unavailable, report that failure rather than silently substituting it.
- **Independent first:** Before starting a pair, the host writes its own complete answer to a private draft. The peer gets only the shared brief. Neither reads the other's answer until `exchange` succeeds. Do not open raw output, answers, other sessions or private drafts to get around this boundary. This is a cooperative workflow boundary, not an operating-system security boundary.
- **Shared facts:** Both get the same owner request, approved decisions, supplied design, relevant source references, applicable skill guidance and task. Preserve relevant owner wording verbatim. Label assistant proposals as proposals. Do not put the host's preferred solution, private draft, or private critique into an independent brief. An approved user experience is a shared requirement, not contamination.
- **Fresh phases, continuing exchanges:** Scope, plain-plan checking, detailed planning and adjudication start fresh peer sessions with separate run directories. Exchanges inside a phase resume that phase's exact session ID. Earlier discussion deliberately informs approved requirements, but never copy another phase's private drafts or debate into a new independent brief. The host retains its conversation; independence means authoring before seeing the peer's answer, not pretending it forgot the owner discussion.
- **Equal authority:** The host is the scribe, not the deciding vote. Both can challenge omissions and technical choices. Agree on evidence and recorded owner decisions. Never claim agreement from silence, a timeout, or an ambiguous reply. A real product tradeoff goes to the owner; unresolved technical claims stay explicitly unresolved until supported, not disguised as approved build steps.

## Shared inputs

Keep a per-feature directory `.feature/pair-<unique-id>/`, never reuse an old feature's directory. Create a brief and host draft for each phase outside that phase's run directory. The runner snapshots and hashes both before launching. Include these parts in each brief:

- **Owner words:** The relevant original request and later corrections.
- **Approved decisions:** Only choices the owner actually made, including scope and design source.
- **Open questions:** Unresolved choices, with no favored answer smuggled in.
- **Shared references:** Exact relevant source paths, the same detailed-plan format where applicable, and applicable skill rules with their source paths. Copy supplied artifacts or name them explicitly. Do not send secrets or environment files.
- **Assignment:** What this phase must produce, its scope, and the same constraints used by the host.

Load bundles once in the host as step 3 prescribes. Pass the rules that actually constrain the feature to the peer with source attribution, including Claude-only guidance if applicable. The peer can consult available equivalent skills or the named source documents. Skill availability differences must not silently give the planners different requirements.

## Commands and state

Use the same helper in either application. For a Claude Code host:

```bash
python3 .claude/scripts/feature-pair.py start .feature/pair-<id>/scope-01 --repo "$PWD" --brief .feature/pair-<id>/scope-brief.md --host-draft .feature/pair-<id>/scope-fable.md --host fable
```

For an Astra host, use `--host astra`; the peer is pinned to `claude-fable-5`. Astra is pinned to `gpt-6-astra`, high effort. Fable also runs at high effort. No fallback models. The default hard deadline is 900 seconds per call. The first call returns immediately, after starting a detached worker. `STARTING` confirms the worker was dispatched, not that the model has answered.

```bash
python3 .claude/scripts/feature-pair.py wait .feature/pair-<id>/scope-01 --seconds 30
python3 .claude/scripts/feature-pair.py status .feature/pair-<id>/scope-01
```

- **STARTING or RUNNING:** Continue independent work or another bounded wait. Give concise progress updates while waiting. Do not end the feature turn merely because a model is working.
- **READY:** A successful CLI exit, completed answer, valid JSON payload and session ID have been verified. Now open the exchange.
- **FAILED, TIMED_OUT or CANCELLED:** Do not proceed as though both participated. Report the concrete state. Fix a mechanical launch problem and retry once in a new directory with the same sealed inputs. Never overwrite the failed attempt or wait forever. If that retry fails, stop with the blocker and retain the work for recovery.
- **ERROR:** The requested operation was refused, for example because a run already exists, inputs changed, or a reply was sent before the exchange opened. Correct the operation; this is not a model verdict.

```bash
python3 .claude/scripts/feature-pair.py exchange .feature/pair-<id>/scope-01
```

This prints both saved answers and records that the exchange is open. It is refused until the peer answer is complete. Do not read `.feature/pair-<id>/.../raw-*.json`; the runner alone extracts answers. Failure diagnostics may read the named stderr/worker log, not partial model prose as a substitute answer.

Write the host's response to the peer's objections and its objections to the peer's answer into a message file, then:

```bash
python3 .claude/scripts/feature-pair.py reply .feature/pair-<id>/scope-01 --message .feature/pair-<id>/scope-response.md
python3 .claude/scripts/feature-pair.py wait .feature/pair-<id>/scope-01 --seconds 30
python3 .claude/scripts/feature-pair.py exchange .feature/pair-<id>/scope-01
```

The first reply automatically includes the sealed host draft, so the peer now sees both. Subsequent replies use the same explicit session ID. No `--last`, `--continue`, automatic fresh-session fallback or guessed IDs. While a reply runs, the run cannot accept another reply. Inputs and completed answers are immutable; corrections go into a new message. Recovery after host compaction starts with `status` on the recorded run, never a duplicate `start`.

## Exchange and convergence

Use one cross-review round, then one verification of the proposed combined result. A third follow-up is available only to settle a specific remaining objection; the helper refuses further turns.

1. **Cross-review:** The host reads the peer's independent draft, writes its objections, and asks the peer to review the host's sealed draft and respond. Preserve both originals. Do not maintain two revised plans.
2. **Combined proposal:** After the peer replies, the host writes one candidate result and a short decision record: each material disagreement, the chosen resolution, its evidence/reason, and any unresolved owner choice. Send the exact candidate text and decision record to the peer. Ask it to confirm the resolution is faithfully represented or identify a specific remaining objection. The host must also check it; writing it is not approval.
3. **Close:** A candidate both explicitly support becomes the result of this phase. If an objection remains, use the final follow-up to resolve it and check the corrected candidate. If it remains unresolved, tell the owner the practical consequence and recommended next decision; do not force consensus. Never present unapproved behavior as locked. Trivial wording changes do not need another exchange.

For initial scope discussion, the candidate can be a few questions and options rather than a full plan. For the plain-plan check it is the five-section owner plan. For detail it is the exact four-part detailed plan and decision record. For adjudication it is the dispositions and proposed edits, not another fresh implementation plan.

## Placement in /feature

- **Step 1, scope:** Before presenting the first suggested approach, save the owner's request, write the host's own brief assessment (missing questions, useful options, proposed slice), and run `scope-01`. Exchange only after the two assessments exist. Then discuss with the owner in the existing short product-language format. Do not ask the owner twice or relay an entire model debate. A factual clarification can be asked before the pair if needed to understand the request at all. A materially changed request gets a new scope round; ordinary answers do not trigger a call after every sentence.
- **Steps 2 and 3, plain plan:** Draft the five-section plan and load the selected bundles. Before step 4 approval, start `plain-01` with the shared requirements and skill constraints, not the host's draft. The peer independently proposes the owner plan. Exchange, produce one combined plain plan, and then ask the owner to approve that exact document. This catches differences in product thinking while changes are still cheap.
- **Step 5, detail:** After owner approval, start `detail-01` with the approved plain plan and the required technical format in the brief. The host seals its own complete detailed plan first. The peer independently produces its complete plan. Exchange and verify one combined plan before writing `.feature/plan-draft.md`. The old two drafts remain as working evidence only; build consumes the combined file. Changes to approved user behavior need an owner decision before being treated as requirements.
- **Step 6, adjudication:** Leave all six critique lanes intact and fresh, including Astra's separate critique lane. As findings arrive, the host can prepare its own dispositions privately. After all lanes are terminal, seal those dispositions and start `adjudication-01` with the same complete findings corpus, plan and owner decisions. The peer independently accepts or drops each finding, with reasons, without seeing the host's dispositions. Exchange and verify the joint dispositions plus intended edits before changing either plan. Retain the existing evidence standard and conditional fresh outside-eye review for newly composed mechanisms. That outside-eye check must run after the pair has settled its proposed edits, before applying them.

Step 7 remains the owner's final approval checkpoint. Steps 8 and 9 still create the real issue and branch only on approval and name the next build command. The pair never dispatches build, QC, amend or ship. The `.feature/` working records remain local and are cleaned with the existing feature working files at finalize.
