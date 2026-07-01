# Shot First And Last Frames

Use this when creating `shot.first-frame` or `shot.last-frame` dependencies. These are expensive, binding video inputs. They are not exploratory images.

## Required Context

Read `renku take authoring context --take <take-id> --json` before drafting.
Use `document.structure.sharedDirection` for continuous takes and
`document.structure.directionsByShotId[shotId]` for multi-cut takes as binding
creative context for selected Composition and Motion values. Use take-owned
Cast, Location, Lookbook, and custom reference choices as continuity context.
Use `referenceMode: "movie-lookbook"` by default so Core applies the selected
Movie Lookbook sheet as the primary style reference and selected Location
Sheets and Character Sheets as continuity inputs. Use `referenceMode: "storyboard-lookbook"` only when the user explicitly wants the first/last
frame itself, and likely the resulting video, to have storyboard or hand-drawn
aesthetics.

If a required character sheet, location sheet, lookbook sheet, custom reference image, first frame, or last frame is missing, let preflight report the missing dependency. Do not create loosely described first/last frames to paper over missing references.

If the user wants Codex built-in image generation, use this same authored
context to prompt `$imagegen`, save the selected still inside the project,
inspect it, and import it without `--receipt`. If the current image tool cannot
accept actual image references, disclose that the selected Movie Lookbook,
Location Sheet, and Character Sheet files cannot be applied as image
conditioning through that path; prefer Renku-managed reference-capable
generation when those references must be applied directly. Do not imitate those
references through local compositing, recoloring, filters, or other
post-processing.

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
Author the first frame for Shot 3. Composition: medium close-up, low angle, hand-held micro push-in implied. Subject: Elise holds the torn petition at chest height, face half-lit by the market doorway. Action state: she has just decided to speak but has not moved yet. Lens/focus: short telephoto, shallow focus on her eyes and paper edge. Continuity: match the approved Elise character sheet, Greenway Market produce aisle location view, and active lookbook palette. No extra characters beyond the selected crowd silhouettes.
```

## Import

```bash
renku media import --purpose shot.first-frame --target scene:<scene-id> --take <take-id> --source generated/media/<first-frame>.png --selection select --receipt <run-json> --json
```

Omit `--receipt` when the still came from Codex built-in image generation or
another non-Renku source.

Use `shot.last-frame` for the closing image.
