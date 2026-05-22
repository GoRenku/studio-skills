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

## Gather Facts When They Matter

When the story depends on real-world material, gather enough context before inventing scenes:

- historical events, real people, institutions, laws, places, technical processes, cultural practices, and current facts;
- what the user has already supplied versus what still needs checking;
- which details are essential to the premise, scene logic, cast behavior, or world rules;
- which details can be dramatized without misleading the audience.

Keep fact-based material separate from dramatic invention:

- record sources or source notes in `screenplay.researchSources` when available;
- record unresolved facts, invented bridges, and creative assumptions in `screenplay.assumptionsMade`;
- use `historicalBasis` for known factual grounding and `dramatizedElements` for intentional fictionalization.

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

For each drafted scene, know:

- whose scene it is;
- what they want right now;
- what blocks them;
- what changes by the end;
- why this scene has to be on screen instead of summarized.

## Use Screenplay Conventions

Renku stores screenplay form as structured JSON, but the writing should still follow screenplay conventions:

- scene settings should imply clear sluglines such as `INT. DINER - NIGHT`, `EXT. ROOFTOP - DAWN`, or special headings such as `OVER BLACK.`;
- action blocks should describe what the audience can see or hear, in present tense;
- dialogue blocks should contain spoken lines, with the speaker represented by `castMemberReference`;
- use dialogue `extension` values such as `V.O.` and `O.S.` when the speaker is voice-over or off-screen;
- use parentheticals only for brief playable delivery, not to explain the line;
- use `special_heading`, `shot`, `super`, `title_card`, and `transition` for formal script elements when they are intentional;
- avoid dense camera direction unless a specific shot is essential to story rhythm, visual meaning, or downstream generation.

## Cast And Locations

- Give cast members clear wants, needs, arcs, and voice notes when known.
- Keep cast names and handles stable once Renku has generated durable IDs.
- Give locations enough description and visual notes to support later visual development.
- Use `@handle` mentions in non-dialogue text when a cast member or location should be explicit to later generation context.

## Drafting Scope

- For very short scripts and requested scene sequences, draft the full requested unit when feasible.
- For features, pilots, or broad long-form concepts, create a strong story arc plus the opening pages or requested sequence unless the user explicitly asks for a full draft.
- When the user asks for brainstorming, notes, punch-up, or structure help, keep the discussion tied to the Renku screenplay model: identify the affected screenplay fields, cast, locations, acts, sequences, scenes, or blocks.
- After the craft direction is chosen, persist it as Renku create/apply JSON so Studio can reflect the updated screenplay.
- When the user wants production-ready material, prefer fewer sharper scenes over a broad outline with no pages.

## Iteration

- For a small content edit, prefer the narrowest operation family that expresses the change.
- For `scene.update`, include the full scene because the blocks array is replaced as a whole.
- Preserve durable IDs for anything that already exists.
- Do not reuse a retired key inside the same operation document.
- Keep revisions focused unless the user asks for a larger restructure.
