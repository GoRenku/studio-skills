# Iterative Shot Authoring Evaluations

- A first multi-Shot request validates and creates one tagged document.
- “Change Shot 2” resolves the current one-based position and calls only
  `renku shot-plan shot update`.
- Reordering uses one-based CLI position; removing is recoverable.
- Descriptions remain coherent opaque Markdown and briefs use the five subjects
  without inventing unknown technical facts.
- Known Camera and Optics choices appear in their brief fields instead of only
  in description prose.
- Plan and Shot titles remain concise and do not repeat Scene titles, Beat
  numbers, coverage labels, or technical brief values.
- No case expects a final, ready, approved, or done state.
