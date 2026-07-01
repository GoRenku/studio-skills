# Shot Video Prompt Sheet

Use this when creating `shot.video-prompt-sheet` for an existing Shot Video
Take. The output is one readable AI-video planning sheet with one panel per
ordered take shot. It preserves shot order, spatial continuity, motion
continuity, visual continuity, and known spoken timing for downstream
`shot.video-take` prompting.

It is not a Scene Shot List, not a `scene.storyboard-sheet`, not a moodboard,
and not a generic concept collage.

## Current-Take Gate

If the user says "this", "current", "selected", "open", "the take I am working
on", or otherwise refers to what is on screen, first read:

```bash
renku studio current --json
```

Continue only when Studio current identifies an existing Shot Video Take id. If
it shows only a scene, shot list, new-take form, unrelated tab, or no take id,
stop and ask the user to open the take or provide the take id. Do not infer the
take from nearby project data, newest takes, filenames, or prior conversation.

Preferred response:

```text
You asked me to work on the current Shot Video Take, but Studio current does
not identify an open take. I can see <actual surface/object>, so I cannot tell
which take you mean. Please open the take in Studio or give me the take id.
```

## Required Context

Read:

```bash
renku take authoring context --take <take-id> --json
```

Use `document.shotIds` and `context.shots` exactly in order. Do not add,
remove, reorder, or merge shots.

When needed for purpose-specific model or policy context, read:

```bash
renku generation context --purpose shot.video-prompt-sheet --target take:<take-id> --json
renku generation model list --purpose shot.video-prompt-sheet --target take:<take-id> --json
```

The take authoring context is the source of truth for take id, scene id, source
shot list id, structure mode, ordered selected shot ids, continuous shared
direction, multi-cut per-shot direction, selected cast, selected locations,
selected lookbook references, prepared inputs, production plan, preflight,
`shotVideoInputReferences`, and readiness. Do not reconstruct those facts from
filenames, screen copy, old plan files, or sample-project memory.

Default shot input style is the selected Movie Lookbook, not the selected
Storyboard Lookbook. Use `referenceMode: "movie-lookbook"` unless the user
explicitly asks for storyboard, hand-drawn, sketch, animatic, or Storyboard
Lookbook aesthetics for this prompt sheet. A panelled layout does not imply
storyboard drawing style. Use selected Location Sheets and Character Sheets as
continuity inputs when Core reports them for the take.

## Authoring Flow

1. Read take authoring context.
2. Build the internal prompt-sheet brief below.
3. Ask only for missing required continuity that cannot be derived from context.
4. Prompt the chosen image model with the reusable template.
5. Inspect the output against the brief.
6. Import only after inspection.

For Codex built-in image generation, stage the selected output under project
`generated/media/`, inspect it, and import it with `renku media import` without
`--receipt`. If the active Codex image tool cannot accept actual reference
images, tell the user the selected Movie Lookbook, Location Sheet, and Character
Sheet files cannot be applied as image conditioning through that path. Prefer a
Renku-managed reference-capable route when the user wants selected references
applied directly. Do not create a local composite, recolor, filter, traced
layout, or post-processed derivative as a substitute for model-native reference
conditioning. For Renku-managed generation, create and estimate a persisted spec
before any paid run, inspect the generated image, and import with the receipt
only after the sheet passes the quality gate.

Renku-managed specs do not store provider `image_urls` or raw asset file paths.
They store `referenceMode`, the take target, and the authored prompt. Core
resolves the selected Movie Lookbook sheet, Location Sheets, and Character
Sheets into provider inputs during validation, estimate, and run. Do not add
`image_urls`, asset ids, or project file paths to the spec manually. Before
asking the user to approve a paid run, validate or estimate the spec and verify
that the prepared provider payload includes the expected reference images.

Reference check:

```bash
renku generation spec validate --file <spec-json> --json
```

In the JSON output, confirm:

- `spec.referenceMode` is `movie-lookbook` unless storyboard style was explicitly requested;
- `providerPayload.image_urls` contains the expected logical `renku-input://...`
  entries;
- the appended "Reference-conditioning instructions" name the selected Movie
  Lookbook sheet and selected continuity references.

If the raw spec looks "unreferenced" but validation shows the correct
`providerPayload.image_urls`, the spec is correct. Explain that references are
resolved by Core at preparation time.

For a real Renku-managed run, confirm Codex has outbound provider network
permission before invoking `renku generation run`. A configured permission
profile must be active for the session. If the run reports only `fetch failed`,
diagnose network/profile/host reachability first; for this purpose the failure
may occur while uploading the selected Movie Lookbook, Location Sheet, or
Character Sheet references before GPT-Image-2 is invoked. Do not remove
`referenceMode`, add provider `image_urls` manually, or substitute local
compositing/post-processing for model-native reference conditioning.

## Prompt-Sheet Brief

Draft this as internal working notes before prompting any image model. It is
not a persisted Renku document.

```text
Take scope
- takeId
- take mode
- ordered shot ids
- selected input mode and model if already chosen

Panel plan
- one panel per ordered shot id
- panel number
- shot id
- story role
- visual frame
- action
- model-facing note

Spatial continuity
- location anchor
- start spatial state
- end spatial state
- screen direction or travel direction when known
- required landmarks or zones from selected location context
- forbidden geography that would contradict context

Motion continuity
- camera movement
- subject movement
- speed or energy when known
- direction that must not be reversed
- transition or continuity link between panels when known

Visual continuity
- referenceMode, normally movie-lookbook
- selected Movie Lookbook sheet as the primary style reference
- selected Location Sheets and Character Sheets as continuity references
- Storyboard Lookbook sheet only when referenceMode is explicitly storyboard-lookbook
- storyboard images or prepared inputs that Core context provides as shot intent, not default style
- costume, prop, palette, lighting, or texture constraints when present

Audio and spoken timing
- exact narration, dialogue, or voiceover text only when known
- panel number where each spoken phrase belongs
- timing cue such as starts before panel, during panel, after panel, or
  bridges panels
- explicit unknowns that should not be invented

Negative constraints
- no extra shots
- no extra characters
- no ungrounded landmarks, vehicles, props, water, weather, signage, or era
  details
- no invented dialogue, narration, subtitles, music, or sound effects
- no provider labels unless the target model prompt contract requires them
```

Omit brief sections when no reliable context exists, except for negative
constraints. Always include negative constraints because they prevent common
image-generation drift.

## Geography Guidance

Treat geography as a continuity system. For every prompt sheet, identify:

- where the take begins;
- where it ends;
- what must stay on the same side of frame or line of action;
- what physical zones or landmarks are allowed by the selected location;
- which location details are mandatory because the user named them or because
  they appear in selected location context;
- which details are forbidden because they would change the meaning of the
  take.

Ask a targeted question when geography is required but missing:

```text
Which side of the room should the camera travel toward by the final panel?
Should the subject move deeper into the location, toward the camera, or across frame?
Which selected Location Sheet should anchor the prompt sheet?
Is there any geography the sheet must avoid showing?
```

Do not add project-specific landmarks, water, roads, props, historical
locations, or environmental features unless they come from the take context or
the user supplies them.

## Audio And Spoken Timing

Use a prompt section named "Audio and spoken timing." It may include narration,
dialogue, voiceover, on-screen text, sound, or music only when the context or
user supplies those facts.

Recommended internal shape:

```text
Audio and spoken timing
- panel: <number>
  shotId: <shot-id>
  kind: narration | dialogue | voiceover | on-screen-text | sound | music
  exactText: <known text, omitted if unknown>
  timing: before-panel | during-panel | after-panel | bridges-next-panel
  source: user-direction | screenplay-dialogue | take-direction | production-notes
  instruction: <short model-facing instruction>
```

Never invent exact spoken words. If exact text is unknown, tell the image model
to leave spoken text blank or show only an empty audio cue row, depending on the
requested layout.

## Reusable Prompt Template

Use this provider-neutral template, filled from the brief:

```text
Create one readable video prompt sheet for this existing Shot Video Take. Use the selected Movie Lookbook sheet as the primary style reference and the selected Location Sheets and Character Sheets as continuity references. Do not render this as a Storyboard Lookbook drawing unless the user explicitly requested storyboard style for this prompt sheet.

Purpose:
- make one planning panel per selected shot;
- preserve shot order, spatial continuity, motion continuity, and known spoken
  timing;
- support downstream AI video prompting.

Layout:
- <N> panels in exact order: <shot ids>;
- each panel has one image frame and compact metadata;
- labels must be large enough to read;
- include camera arrows or motion marks only where movement is specified;
- do not make a moodboard or collage.

Take scope:
<take-scope-brief>

Spatial continuity:
<spatial-continuity-brief>

Motion continuity:
<motion-continuity-brief>

Visual continuity:
<visual-continuity-brief>

Audio and spoken timing:
<audio-and-spoken-timing-brief>

Panel details:
<one block per panel>

Negative constraints:
<negative-constraints-brief>
```

Panel blocks should be compact and explicit:

```text
Panel <number> / <shot-id>
- story role:
- visual frame:
- action:
- camera or motion:
- spatial continuity:
- visual continuity:
- spoken timing:
- model-facing note:
```

## Pre-Import Quality Gate

Inspect the generated image and compare it against the brief before importing.

Reject the sheet when:

- the panel count differs from the ordered shot count;
- panel order differs from the take;
- the take mode is misrepresented;
- motion direction is reversed or missing;
- spatial geography contradicts the take context;
- required location, cast, or lookbook references are absent or contradicted;
- exact spoken text appears in the wrong panel;
- invented narration, dialogue, subtitles, music, or sound effects appear;
- ungrounded landmarks, props, water, weather, signage, vehicles, or characters
  appear;
- labels are too small to read;
- the output is a moodboard, poster, or concept collage instead of a prompt
  sheet.

When a sheet fails, do not import it automatically. Report:

- what failed;
- why that failure matters for downstream video generation;
- whether the likely fix is prompt revision, more user direction, or accepting
  the sheet with caveats.

## Import

Import only after inspection:

```bash
renku media import \
  --purpose shot.video-prompt-sheet \
  --target take:<take-id> \
  --source generated/media/<sheet>.png \
  --selection select \
  --json
```

Add `--receipt <run-json>` only when the sheet came from a Renku-managed
generation run. Omit `--receipt` when the sheet came from Codex built-in image
generation, a manual upload, or another non-Renku source.

Use `--replace-selected` only when the user is correcting a prior selected
video prompt sheet and wants the old selected sheet discarded in the same slot.
