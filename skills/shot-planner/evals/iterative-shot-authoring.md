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
- Known Camera and Optics choices appear in their brief fields instead of only
  in description prose.
- `focalLengthMm` remains numeric and `depthOfField` uses only `shallow` or
  `deep`; `rack-focus` remains a Motion choice.
- Plan and Shot titles remain concise and do not repeat Scene titles, Beat
  numbers, coverage labels, or technical brief values.
- No case expects a final, ready, approved, or done state.
