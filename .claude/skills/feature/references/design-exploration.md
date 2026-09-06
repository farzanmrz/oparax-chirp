# Optional design exploration in /feature

Use this only when a new design proposal is needed. Ordinary UI work can use the existing design system without a separate generation. Claude remains the owner's single contact; its partner is Sol by default or Astra when selected for this feature.

## Agree the direction

- **Explore intent:** References may express feel, polish, pacing, interaction or a way to explain a capability. They are inspirations unless the owner explicitly chose them as the design. Help the owner discover what they want before narrowing scope or choosing an implementation technique.
- **Share substantive details:** Claude uses its normal available tools to understand the references. Give the peer the original owner messages and links, detailed observations and useful artifacts already available. Separate observed facts, uncertainties and inferred intent from Claude's proposed solution. Inspiration research does not require a browser, screenshots or a visual probe.
- **Independent proposals:** Each model forms its own direction before seeing the other's proposal. Use the existing scope exchange to agree the visitor experience and visual direction; do not add a mandatory design-planning pair. The peer can research links or question assumptions. Send the owner's corrections faithfully to both.
- **Design contract:** DESIGN.md is the default. Name any proposed departure and its affected surface in the direction presented to the owner.

## Ask before the first generation

Show the joint direction briefly and ask: "Have we understood the direction correctly, and should I generate the design?"

STOP for the owner's explicit yes. A feature request, reference link, model selection or permission to continue planning is not generation approval. Honor approval already given for this same direction without asking twice. If the owner declines, continue ordinary planning. Material corrections to the direction go to the peer before generation.

## The owner drives every design iteration

1. **Generate and show:** Claude uses its available design capability with the agreed direction and original references. Preserve the artifact or project identifier and version. Immediately show the actual result to the owner, ask for approval or feedback, and STOP. Do not call the peer, debate the result, or automatically regenerate before the owner sees it. Do not invent a design command or install an integration; if generation itself is unavailable, state that limitation.
2. **Discuss the owner's feedback:** Only when the owner critiques the result or requests changes, preserve their exact feedback in the owner-input record. Start `design-feedback-<round>` with `--phase design-feedback`, the recorded `--pair-model`, agreed direction, and the actual images of the design being critiqued through `--image`. Claude seals its proposed response to the feedback before the peer starts. The peer proposes how to address that feedback independently; neither receives the other's recommendation before exchange. Claude passes images and context automatically, without making the owner shuttle files.
3. **Agree the revision:** Exchange proposals and settle how to address the owner's feedback. Focus on the requested changes and keep the remaining direction stable. Use at most two follow-ups to resolve a concrete disagreement before generation; if it needs an owner choice, ask instead of looping. This is a revision discussion driven by the owner, not a fresh unsolicited critique of the whole design.
4. **Revise and show:** Claude makes the agreed revision, immediately shows the updated design to the owner, and STOPs again. Do not send the new artifact for an automatic peer review. Return to the feedback discussion only if the owner supplies another critique. There is no fixed limit on owner-requested iterations, and no agent-only regeneration loop.
5. **Accept:** When the owner says the design is good to go, record that exact artifact/version as approved and continue the normal feature planning flow. No extra peer design review is added at acceptance. Later detailed planning and plan critique continue normally.

The owner's clear request for changes authorizes that revision; do not repeat the initial generation-permission question on every round. If their feedback leaves a genuine choice unresolved, clarify that choice. Keep a short record of the direction, initial generation permission, shown artifact versions, owner feedback and final approval so a resumed session does not repeat paid work or skip the owner stop.

Images are required when the peer discusses feedback on an existing design, not when researching inspiration websites. Descriptions, exports and links can supplement those images. If the images cannot be supplied or viewed, report that limitation rather than pretending the peer saw the design. No CLI browser probe is needed to read attached images.

After visual approval, include the chosen design and any scoped design-system departure in the plain plan. The independent detailed planners receive those approved choices while retaining freedom over implementation. Plan approval, critique, adjudication and final issue/branch approval continue as before. No design approval auto-dispatches build, QC or ship.
