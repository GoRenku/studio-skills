# Iterative Shot Authoring Evaluations

- A first multi-Shot request validates and creates one tagged document.
- “Change Shot 2” resolves the exact stable number from the current report and calls only
  `renku shot-plan shot update`.
- Reordering uses one-based CLI position without changing the Shot number;
  removing is recoverable and never releases that number.
- Insertion sends `start`, `end`, `before`, or `after` placement intent and an
  anchor id when needed; it never allocates the suffix itself.
- Descriptions remain coherent opaque Markdown and briefs use the five subjects
  without inventing unknown technical facts.
- A complex Shot uses only relevant `##` sections, exact context-provided
  handles, and deliberate strong Markdown for material cinematography terms.
- A simple later revision omits irrelevant sections instead of filling all six.
- After repeated feedback, the affected description states the complete current
  Shot, preserving retained direction and integrating the latest change. A reader
  without the chat or prior revisions can understand the action; edit history and
  unresolved phrases such as “same as before” do not substitute for direction.
- Known Camera and Optics choices appear in their brief fields instead of only
  in description prose.
- `focalLengthMm` remains numeric and `depthOfField` uses only `shallow` or
  `deep`; `rack-focus` remains a Motion choice.
- Plan and Shot titles remain concise and do not repeat Scene titles, Beat
  numbers, coverage labels, or technical brief values.
- No case expects a final, ready, approved, or done state.

## Context-free iteration with off-screen dialogue

After several revision comments, ask for the final description for a model that
has never seen the conversation. Check that the text states the current place,
characters, action, camera and complete requested dialogue without change-log
language. For an off-screen question, identify the audible speaker and visible
listener separately. A later decision to show the speaker must be reflected as the
current coverage, not explained as a correction to an earlier reaction shot.

## Command efficiency scenarios

These are manual agent evaluations; document validators do not execute them.

- Given current Project/Plan/Shot context and “change only Shot 2's lens,” use
  the exact returned Shot id and one focused update document. Do not repeat
  project open, list, validate, update, show when the update returns sufficient
  identity/result. Read only missing detail.
- Given an intervening edit or user review, refresh the relevant Plan/Shot
  before preparing the next update. Never reuse stale revision context merely
  to hit a call-count target.
- Given “validate this document only,” run validate and no mutation.
- Given “change the selected shot” without a resolved Studio selection, read
  Studio current; do not guess from authoring selection or the last Shot id.
- Given a current-authoring-only Cast/Location handoff, establish the requested
  authoring project once. Do not assume --project retargets Cast facts.
- Given uncertain syntax, consult the reference/help once; no project list or
  speculative mutation attempts.
