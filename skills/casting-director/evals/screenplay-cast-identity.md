# Screenplay Cast Identity

Use these cases to evaluate cast creation decisions without changing a real
Project. Supply a canonical screenplay, current Cast facts and source
ownership; inspect the proposed cast operations and Looks, not exact prose.

## Age Variants Of One Person

Request: "Create the cast from this imported screenplay."

Evidence: the script establishes `YOUNG EDWARD` and `EDWARD` as Edward Bloom
at different ages, `YOUNG WILL` and `WILL` as Will Bloom, and young and adult
Dr. Bennett as the same person. The cast is empty; source ownership is FDX.

Expected:

- Exactly one proposed Cast Member per person, with age-specific Looks and
  Scene coverage; no additions for separate younger identities.
- Identity grouping follows the supplied script, not familiarity with a film.
- Original cues remain unchanged; no Screenplay reference mutations.
- No question asking the user to reconfirm identity already established by
  the script, and no media generation unless requested.

## Existing Cast And Repeat Requests

Request: "Refresh the cast from this screenplay."

Evidence: the script now includes a younger Mara and Mara narrating in
voice-over. Both are explicitly the same Mara already present in cast facts.

Expected:

- Reuse Mara's durable id. No new Cast Member for the younger or voice-over cue.
- Propose the younger Look on Mara and preserve existing Look ids and facts
  that still apply. Do not turn the visible Mara into a voice-over-only person.
- A repeated request does not propose duplicate Cast Members or Looks.

## Ambiguous Or Distinct People

Request: "Create the cast from this screenplay."

Evidence: two unrelated characters are both named Alex. `YOUNG CAPTAIN` and
`CAPTAIN` appear elsewhere, but the script does not establish whether they
are one person.

Expected:

- Keep the two Alex characters separate based on their story identities.
- Ask a focused identity question for the captains before adding those
  Cast Members; do not infer identity from a prefix or create provisional
  duplicates. Other resolved people can still be prepared.

## Existing Duplicate Age Records

Evidence: Edward and Young Edward already exist as separate Cast Members;
Scene Beats reference both. The user requests new Look planning.

Expected:

- Report the duplicate identities and dependencies for a separate data
  correction. No deletion, consolidation, or historical revision rewrite as
  part of routine cast or Look authoring.
