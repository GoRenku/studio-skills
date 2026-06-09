# Lookbook Sheet Purpose

Purpose key: `lookbook.sheet`

Target format: `lookbook:<lookbook-id>`

## Required Workflow

1. Read context with `renku generation context --purpose lookbook.sheet --target lookbook:<lookbook-id> --json`.
2. List model choices with `renku generation model list --purpose lookbook.sheet --target lookbook:<lookbook-id> --json` unless the user already chose one.
3. Create one persisted spec and estimate cost before any paid run.
4. Run only after user approval for both cost and sending project-derived prompt/context to the external provider. Request sandbox/network permission before the first real run, because Renku will contact the approved provider.
5. Inspect the returned sheet before import. Import only when it works as a compact model-facing visual language guide.

## Prompt Inputs

Use the returned context:

- project title and aspect ratio;
- Lookbook thesis and principles;
- palette colors, names, and meanings;
- tone and mood tags;
- composition, lighting, texture, and camera sections;
- existing Lookbook images as evidence of the language, not as a collage requirement;
- source inspiration folder names when they help explain the visual lineage.

## Sheet Intent

A Lookbook sheet is an informative one-image style guide for downstream image
and video generators. It should answer: "What should this movie look like, and
what rules should generated shots obey?"

It is not:

- a contact sheet of existing Lookbook images;
- a generic mood board;
- a pitch poster;
- a wall of paragraphs;
- a storyboard for one scene.

## Recommended Layout

Use one finished image, normally the project aspect ratio.

For a 16:9 project, prompt for:

- a clear title/header with the Lookbook name and one short thesis phrase;
- a palette strip with 5 to 8 swatches using the Lookbook hex colors and short color names;
- three to five cinematic example panels that demonstrate the rules;
- a lighting row or mini-matrix for key lighting states;
- a texture/material strip showing concrete surfaces and props;
- a composition/camera grammar row with small diagrams or frame examples;
- short screenplay-style captions, one sentence or less, focused on visible behavior.

Keep text minimal and concrete. Strong captions name what changes on screen:

- "Power is frontal and symmetrical."
- "Labor breaks the frame with ropes, smoke, and bodies."
- "Cold daylight drains Byzantine rooms."
- "Furnace glow turns craft into judgment."
- "Bronze, soot, parchment, wet rope, cracked stone."

Avoid vague labels like "dark mood", "cinematic", "epic", or "beautiful".

## Prompt Structure

Start with the production function:

```text
Create one polished 16:9 Lookbook sheet as a single finished image for a film/video generator reference. This must be an informative visual language guide, not a collage of existing images.
```

Then include:

- title and thesis line;
- exact palette swatches;
- compact layout requirements;
- visual panels and what each panel demonstrates;
- material strip;
- camera/composition grammar;
- legibility constraints;
- historical/anachronism guardrails when relevant.

Example layout instruction:

```text
Use a clean editorial production-board layout. Top header: Lookbook name and a short thesis line. Left column: palette strip with named swatches. Center: four cinematic example panels. Right column: short rule cards for composition, lighting, texture, and camera. Bottom strip: tactile materials and motifs. Keep text large, sparse, and readable; use no more than one short line per rule.
```

## Quality Bar

Import only when:

- the palette is visibly present and reasonably close to the Lookbook colors;
- the sheet includes palette, lighting, composition, texture/material, and camera guidance;
- captions are short and mostly legible;
- visual panels demonstrate distinct rules instead of repeating one attractive scene;
- the sheet is useful as a reference input for shot/video generation;
- no labels, decorative text, or fake UI elements overwhelm the image;
- historical settings avoid obvious anachronisms from the project period.

Do not import automatically when:

- the sheet is only a collage of Lookbook images;
- palette/rule information is missing;
- most text is unreadable or hallucinated;
- the sheet invents a different visual language;
- it looks like a marketing poster instead of a production reference.

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
