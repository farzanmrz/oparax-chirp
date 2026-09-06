# Approved build handoff

Use only after the owner approves the final feature plan or the presented QC fixes. Planning/design approval at an earlier checkpoint is not this approval. The host launches Codex CLI in the same local checkout, then stops working. Manual `$build <N>` remains available if the owner prefers it.

- **Model:** Default to `sol`, high effort. An explicit request for this build or fix run selects `astra` or `terra` instead, case-insensitively. This selection is separate from `/feature Astra`, the planning partner, and any earlier build model. Do not ask a separate model question after approval: state the default and alternatives at the final approval checkpoint, then honor the owner's reply. If the owner says to wait or launch manually, do not dispatch.
- **Branch and inputs:** The feature start script already checks out `ft/<N>` or `bf/<N>`. Finish issue creation and plan-file renaming first. For QC, write the approved pending fix list first. Verify the branch, and if necessary switch to that existing branch without discarding or stashing work. Never create a branch from the build launcher. The launcher refuses a wrong branch, missing plan, uncommitted files, or another detached build in the same checkout. Do not absorb unrelated edits just to clear that check.
- **Scope:** Launch the literal `$build <N>` with the selected model and high effort, allowing useful subagents. Let the build skill choose BUILD, AMEND or FIX. Do not paste the planning discussion into the build prompt or preselect its mode. Normal Codex configuration and authentication apply; `--approve-for-me` uses automatic approval review with the workspace sandbox, not a permission bypass. Report any rejected operation or unavailable credential as a blocker, not success.

Run in a foreground Bash call:

```bash
python3 .claude/scripts/build-launch.py start <N> --source feature --model sol
```

Use `--source qc` after approval of QC fixes. Substitute `astra` or `terra` only when requested. The output includes the exact job directory, branch, model, status and, once available, Codex session ID. `RUNNING` confirms the process launched, not that the build succeeded. Never issue a second start while that build is running.

Register one completion watcher using the returned absolute job path:

```bash
python3 .claude/scripts/build-launch.py watch <absolute-job-directory>
```

Run the watcher through the host's `Monitor` tool with `persistent: true` when available, or through Bash with `run_in_background: true`. Do not wait in foreground, repeatedly call status, or keep a model thinking about progress. This watcher is a lightweight process and emits only the terminal status and saved result. It does not perform the build. If neither background mechanism is available, the detached build still runs and its result remains on disk; disclose that the completion notification is unavailable.

After registering the watcher, close with the issue, branch and selected model, say the build was launched, and STOP. Keep the shared checkout on that branch until the build finishes. Do not start QC, ship, a second build, or make further repo changes while it runs.

On the completion notification, briefly relay the actual saved result and the next command named by the build skill, then stop again. `FINISHED` means Codex returned a completed response, which may report an incomplete build or blocker; read the result rather than interpreting it as a pass. Never apply extra fixes or auto-dispatch QC from this callback. The result persists at `<job>/result.md`; diagnostics and the exact CLI session ID remain alongside it. Closing the Claude session can lose its watcher, but does not kill the detached build. On a later explicit status request, read `status <job>` or the saved result without relaunching.
