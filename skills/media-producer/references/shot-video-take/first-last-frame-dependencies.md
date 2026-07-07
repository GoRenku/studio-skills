# Shot First And Last Frame Dependencies

Use this when creating `shot.first-frame` or `shot.last-frame` dependencies for
a Shot Video Take. These are expensive, binding video inputs. They are not
exploratory images.

## Required Context

Read before drafting:

```bash
renku take authoring context --take <take-id> --json
```

Use `document.structure.sharedDirection` for continuous takes and
`document.structure.directionsByShotId[shotId]` for multi-cut takes as binding
creative context. Use take-owned Cast, Location, Lookbook, and custom reference
choices as continuity context.

Use `referenceMode: "movie-lookbook"` by default so Core applies the selected
Movie Lookbook sheet as the primary style reference and selected Location
Sheets and Character Sheets as continuity inputs.

Use `referenceMode: "storyboard-lookbook"` only when the user explicitly wants
the first/last frame itself, and likely the resulting video, to have storyboard
or hand-drawn aesthetics.

If a required character sheet, location sheet, lookbook sheet, custom reference
image, first frame, or last frame is missing, let preflight report the missing
dependency. Do not create loosely described first/last frames to paper over
missing references.

## Codex Built-In Image Generation

If the user wants Codex built-in image generation, use the same authored context
to prompt `$imagegen`, save the selected still inside the project, inspect it,
and import it without `--receipt`.

If the current image tool cannot accept actual image references, disclose that
the selected Movie Lookbook, Location Sheet, and Character Sheet files cannot be
applied as image conditioning through that path. Prefer Renku-managed
reference-capable generation when those references must be applied directly.
Do not imitate references through local compositing, recoloring, filters, or
other post-processing.

## First Frame Prompt Must Specify

- exact opening composition;
- subject and action state at frame 0;
- camera height, angle, and framing;
- movement implication, if the video model should begin moving;
- lens, millimeters, focus, and depth cues when known;
- cast, wardrobe, prop, location, and lookbook continuity;
- what the video model should begin from.

## Last Frame Prompt Must Specify

- exact ending composition;
- subject and action state at the final frame;
- camera result and movement endpoint;
- continuity from the first frame;
- what visible change must be achieved by the end of the take.

## Do Not Use

Bad prompts:

```text
Create the first frame for Shot 3.
Create the last frame for Shot 3.
```

These are not authored specs and should not be estimated or run.

## Acceptable Shape

```text
Author the first frame for Shot 3. Composition: medium close-up, low angle,
hand-held micro push-in implied. Subject: Elise holds the torn petition at
chest height, face half-lit by the market doorway. Action state: she has just
decided to speak but has not moved yet. Lens/focus: short telephoto, shallow
focus on her eyes and paper edge. References: use Reference 1, the Elise
character sheet, for facial identity, wardrobe, grooming, and body continuity;
use Reference 2, the Greenway Market location sheet, for produce-aisle
geography, material texture, and doorway light direction; use Reference 3, the
Lookbook sheet, for palette, contrast, and grain only. Do not copy reference
background artifacts, labels, or unrelated props. No extra characters beyond
the crowd silhouettes explicitly requested for this shot.
```

## Handoff

After generation/import, preserve a handoff note for final video prompting:

- first frame start state and required stability;
- last frame destination state, if present;
- camera movement implied between endpoints;
- cast, location, prop, wardrobe, period, and geography constraints;
- visible errors or caveats to correct in the final video prompt.

## Import

```bash
renku media import \
  --purpose shot.first-frame \
  --target take:<take-id> \
  --source generated/media/<first-frame>.png \
  --selection select \
  --receipt <run-json> \
  --json
```

Omit `--receipt` when the still came from Codex built-in image generation or
another non-Renku source.

Use `shot.last-frame` for the closing image.
