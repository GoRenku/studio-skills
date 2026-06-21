# Lookbook Sheet Purpose

Purpose key: `lookbook.sheet`

Target format: `lookbook:<lookbook-id>`

## Required Workflow

1. Read context with `renku generation context --purpose lookbook.sheet --target lookbook:<lookbook-id> --json`.
2. List model choices with `renku generation model list --purpose lookbook.sheet --target lookbook:<lookbook-id> --json` unless the user already chose one.
3. Create one persisted spec and estimate cost before any paid run.
4. Run only after user approval for both cost and sending project-derived prompt/context to the external provider. Request sandbox/network permission before the first real run, because Renku will contact the approved provider.
5. Inspect the returned sheet before import. Import only when it works as a compact model-facing guide for the target Lookbook type.

## Prompt Inputs

Use the returned context, including the Lookbook type.

For Movie Lookbooks, use:

- project title and aspect ratio;
- Lookbook thesis and principles;
- palette colors, names, and meanings;
- tone and mood tags;
- composition, lighting, texture, and camera sections;
- existing Lookbook images as evidence of the language, not as a collage requirement;
- source inspiration folder names when they help explain the visual lineage.

For Storyboard Lookbooks, use:

- style brief and principles;
- line and finish rules;
- value and accent rules;
- panel and notation rules;
- continuity and clarity rules;
- guardrails;
- existing Storyboard Lookbook images as evidence of the drawing system.

## Sheet Intent

A Movie Lookbook sheet is an informative one-image style guide for downstream image and video generators. It should answer: "What should this movie look like, and what rules should generated shots obey?"

A Storyboard Lookbook sheet is the canonical reference dependency for `scene.storyboard-sheet`. It should answer: "How should storyboard panels be drawn, labeled, valued, and kept readable?"

It is not:

- a contact sheet of existing Lookbook images;
- a generic mood board;
- a pitch poster;
- a wall of paragraphs;
- a storyboard for one scene.

## Recommended Layout

Use one finished image, normally the project aspect ratio.

For a Movie Lookbook sheet, prompt for:

- a clear title/header with the Lookbook name and one short thesis phrase;
- a palette strip with 5 to 8 swatches using the Lookbook hex colors and short color names;
- three to five cinematic example panels that demonstrate the rules;
- a lighting row or mini-matrix for key lighting states;
- a texture/material strip showing concrete surfaces and props;
- a composition/camera grammar row with small diagrams or frame examples;
- short screenplay-style captions, one sentence or less, focused on visible behavior.

For a Storyboard Lookbook sheet, prompt for:

- a clear title/header with the Storyboard Lookbook name and one short style phrase;
- a line/finish strip with close details of strokes, construction marks, and paper/ink behavior;
- a value/accent strip with the intended gray range and accent behavior;
- three to five storyboard panel examples that show staging clarity, silhouette, and shot readability;
- a panel/notation row with safe caption, arrow, margin, and camera-note examples;
- a guardrail strip that names what the style avoids without overwhelming the image.

Keep text minimal and concrete. Strong captions name what changes on screen:

- "Power is frontal and symmetrical."
- "Labor breaks the frame with ropes, smoke, and bodies."
- "Cold daylight drains Byzantine rooms."
- "Furnace glow turns craft into judgment."
- "Bronze, soot, parchment, wet rope, cracked stone."
- "Camera arrows stay in the margin."
- "Silhouette first, facial detail second."

Avoid vague labels like "dark mood", "cinematic", "epic", "beautiful", or "expressive".

## Quality Bar

Import only when:

- the sheet clearly belongs to the target Lookbook type;
- captions are short and mostly legible;
- visual panels demonstrate distinct rules instead of repeating one attractive scene;
- the sheet is useful as a reference input for downstream generation;
- no labels, decorative text, or fake UI elements overwhelm the image;
- historical settings avoid obvious anachronisms from the project period when relevant.

For Storyboard Lookbook sheets, also require that line/finish, value/accent, panel/notation, continuity/clarity, and guardrail guidance are visible enough to steer scene storyboard generation.

Do not import automatically when:

- the sheet is only a collage of Lookbook images;
- core rule information is missing;
- most text is unreadable or hallucinated;
- the sheet invents a different visual language;
- a Storyboard Lookbook sheet looks like a final cinematic still or marketing poster.

If the take is close but weak, explain the weaknesses and the prompt changes
that would improve it, then ask whether the user wants to accept it with caveats
or approve another paid generation. Do not regenerate automatically. Do not crop
or slice Lookbook sheets.

## Import

Use source-only import:

```bash
renku media import --purpose lookbook.sheet --target lookbook:<lookbook-id> --source generated/media/<file> --json
```

Do not pass `--sections`; section tags belong only to `lookbook.image`.
