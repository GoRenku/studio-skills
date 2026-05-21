# Screenplay Writing Guidelines

Use this reference for story and page craft. Keep schema decisions in `screenplay-json-contract.md`.

## Gather Enough To Start

For a new screenplay, gather or infer:

- scenario overview, more detailed than a logline;
- main cast members and relationships;
- time period;
- primary locations;
- target length;
- main conflict, stakes, and cast member wants;
- audience expectation;
- tone, genre, and hard constraints.

Ask only for missing high-impact inputs. If the user wants momentum, make clear assumptions and record them in `screenplay.assumptionsMade`.

## Shape Before Pages

Use a three-act structure by default unless the user's format calls for something else.

For very short scripts, keep the model lightweight but still identify:

- hook;
- inciting incident or first turn;
- midpoint or escalation;
- climax;
- resolution.

Length guidance:

- one screenplay page roughly equals one screen minute;
- very short: 1-3 pages;
- 5-minute short: about 5 pages;
- 10-minute short: about 10 pages;
- short film: roughly 5-30 pages;
- feature: roughly 80-120 pages.

## Write Playable Scenes

- Give each scene a pressure point: a want, obstacle, reveal, reversal, or decision.
- Keep action visual and present tense.
- Let dialogue carry behavior and conflict, not only information.
- Use narration or voice-over when it adds framing that images cannot carry alone.
- Avoid novelistic interiority unless expressed through action, dialogue, or voice-over.
- Use `shot`, `super`, `title_card`, and `transition` blocks only when they serve the script.

## Cast And Locations

- Give cast members clear wants, needs, arcs, and voice notes when known.
- Keep cast names and handles stable once Renku has generated durable IDs.
- Give locations enough description and visual notes to support later visual development.
- Use `@handle` mentions in non-dialogue text when a cast member or location should be explicit to later generation context.

## Iteration

- For a small content edit, prefer the narrowest operation family that expresses the change.
- For `scene.update`, include the full scene because the blocks array is replaced as a whole.
- Preserve durable IDs for anything that already exists.
- Do not reuse a retired key inside the same operation document.
- Keep revisions focused unless the user asks for a larger restructure.
