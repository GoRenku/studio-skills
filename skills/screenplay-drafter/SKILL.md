---
name: screenplay-drafter
description: Create and iterate structured YAML screenplay drafts in formal screenplay format. Use when a user wants help developing a script, screenplay, short film, feature, pilot, scene sequence, story arc, cast, locations, dialogue, narration, scene headings, action lines, or a screenplay YAML package that can later be rendered into a traditional screenplay document.
---

# Screenplay Drafter

Use this skill to help a user move from story idea to a structured screenplay YAML draft, then iterate that draft without losing its document structure.

In commands below, `<skill>` is the absolute path to this skill folder.

## Workflow

1. Identify whether this is a new screenplay or an iteration.

   - For a new screenplay, collect the minimum story brief needed to create momentum.
   - For an iteration, preserve the existing YAML structure and stable IDs unless the user explicitly asks for a larger restructure.

2. For a new screenplay, gather or infer these inputs:

   - Scenario overview, more detailed than a logline.
   - Main cast members and known relationships.
   - Time period.
   - Primary locations.
   - Target length, such as 5-minute short, short film, feature, standard feature, pilot, or custom page/minute target.
   - Main conflict, stakes, and cast member wants.
   - Audience expectation, such as young kids, family, teens, mature adults, or festival drama.
   - Tone, genre, and hard constraints if provided.

   Ask only for missing high-impact inputs. If the user wants momentum or asks you to proceed, make clear assumptions and record them in `revision_state.assumptions_made`.

3. Shape the story before writing pages.

   Use a three-act structure by default unless the user's format calls for something else. For very short scripts, keep the act model lightweight but still identify the hook, inciting incident, midpoint or turn, climax, and resolution.

   Length guidance:

   - One screenplay page roughly equals one screen minute.
   - Very short: 1-3 pages.
   - 5-minute short: about 5 pages.
   - 10-minute short: about 10 pages.
   - Short film: roughly 5-30 pages.
   - Feature: roughly 80-120 pages.

4. Produce YAML, not prose-only output.

   Use the schema in `references/screenplay-yaml-schema.md`. The YAML must include:

   - `screenplay/screenplay.yaml`: `schema_version`, `cast_ref`, `locations_ref`, `act_refs`, `project`, and `revision_state`.
   - `cast/<cast-id>/description.md`: front-matter Markdown for each cast member, using a durable kebab-case folder id.
   - `locations/<location-id>/description.md`: front-matter Markdown for each location, using a durable kebab-case folder id.
   - One act YAML file per act under `screenplay/acts/`: act metadata, sequences, scenes, scene headings, and renderer-friendly screenplay blocks.

5. Write the opening pages.

   The first anti-writer's-block draft should include a developed arc plus at least the hook and first few pages of screenplay blocks. Do not attempt a full feature-length draft unless the user explicitly asks.

6. Use formal screenplay conventions inside the YAML.

   - Scene headings use standard sluglines such as `INT. DINER - NIGHT` or special headings such as `OVER BLACK.`
   - Action lines are visual, present tense, and production-readable.
   - Dialogue blocks include `cast_id`, readable character cue, optional extension such as `V.O.` or `O.S.`, optional parenthetical, and dialogue lines.
   - Scene heading `location_id` values point to location folder IDs, and dialogue `cast_id` values point to cast folder IDs.
   - Montage markers, shots, and transitions use explicit block types.

7. Iterate carefully.

   Preserve stable IDs for existing material:

   - If rewriting a block, keep its `block-###` ID.
   - If moving a scene, keep its `scene-###` ID and place it under the correct act and sequence.
   - If adding material, use the next available ID number for that entity type.
   - If removing material, do not reuse retired IDs in the same draft.
   - Preserve existing cast and location kebab-case IDs once they have been established; they are used as folder names and durable references.
   - Update `revision_state` with major assumptions, open questions, and next useful revision options.

## Schema Reference

Read `references/screenplay-yaml-schema.md` before generating or revising YAML screenplay content. It defines the expected document shape, block types, renderer contract, and example output.

## Quality Bar

- Prioritize momentum without flattening the user's voice.
- Make the story playable: clear wants, obstacles, stakes, and scene turns.
- Keep audience expectations visible in content choices.
- Avoid novelistic interiority unless it is expressed through action, dialogue, or voiceover.
- Do not claim industry-standard formatting in the final document unless the YAML follows the renderer contract.
