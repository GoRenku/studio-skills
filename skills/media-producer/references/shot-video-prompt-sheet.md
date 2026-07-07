# Shot Video Storyboard Reference

Use this when creating `shot.video-prompt-sheet` for an existing Shot Video
Take. The internal Renku purpose key is still `shot.video-prompt-sheet`, but the
creative artifact should be treated as a storyboard reference image. Studio
stores the generated image as opaque media: it stores the purpose, take target,
model, logical references, prompt, and metadata, but it does not validate the
image's internal layout. The agent may choose panels, motion maps, diagrams,
captions, timing marks, or a full-canvas reference strategy when that best serves
the take.

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

Default model is GPT-Image-2:

```json
"modelChoice": "fal-ai/openai/gpt-image-2"
```

Choose one visual style id for `promptSheetVisualStyleId`:

- `cinematic-realistic` for realistic storyboard panels that should be usable
  later as real visual look references. As an agent default, do not ask for or
  emphasize extra Lookbook, Location Sheet, or Character Sheet boards when the
  generation path lets you choose references. The prompt text and the realistic
  storyboard panels should carry the look, location, lighting, composition, and
  continuity.
- `handdrawn-storyboard` for explicit sketch, pencil, storyboard, animatic, or
  previs requests. As an agent default, include available Lookbook, Location
  Sheet, and Character Sheet references when the generation path supports
  image references. The prompt must say these boards are references only, not
  source frames, first frames, page layouts, collages, or content to copy
  directly.

Choose one notation mode for `promptSheetNotationModeId`:

- `none` for plain storyboard reference images without explicit motion notation metadata.
- `motion-annotation` for choreography, stunts, chases, battle, dance, live
  singing plus movement, complex camera moves, or any storyboard reference image
  that should include arrows, timing marks, path lines, body-motion marks, or
  camera-motion notation.

Motion annotation is orthogonal to visual style. A cinematic-realistic sheet
can use motion notation, and a hand-drawn storyboard sheet can use motion
notation.

Reference defaults are prompt-strategy defaults, not app validation:

- Realistic storyboard references should later be treated as the real visual
  look references for consistency. The panels themselves should depict the
  place, lighting, wardrobe, cast look, palette, and camera language.
- Hand-drawn storyboard references usually benefit from supporting visual
  reference boards because the panels intentionally abstract the look. Use
  Lookbook references only for drawing/style language, Location Sheets only for
  geography/material continuity, and Character Sheets only for identity,
  wardrobe, and prop continuity. Name those roles plainly in the prompt.
- If the user wants a different reference mix, follow the user. These are
  authoring defaults, not restrictions.

## Authoring Flow

1. Read take authoring context.
2. Choose `promptSheetVisualStyleId`, `promptSheetNotationModeId`, and
   any optional supporting references the chosen generation route allows.
3. Draft an agent-owned storyboard brief. Use panels, beats, arrows, maps,
   captions, or any other structure only as prompt-writing guidance.
4. Ask only for missing required continuity that cannot be derived from context.
5. Create the draft Media Generation Spec JSON and run:

```bash
renku generation preview show --file <media-generation-spec-json> --json
```

   The media-generation spec is the CLI request contract for `--file`; do not
   hand-author preview-envelope JSON. Core validates the draft spec,
   resolves logical project references, builds the preview envelope, and sends
   it to the running Studio server. Keep the draft spec free of local paths,
   provider upload URLs, and resolved provider payload fields.

6. Wait for user feedback in the agent harness.
7. Revise the same draft spec when feedback changes the prompt, metadata,
   references, or provider configuration, then rerun the preview command.
8. Generate only after the user says the preview is ready.
9. Inspect the output against the agent-owned brief and user feedback.
10. Import only after inspection.

For Codex built-in image generation, stage the generated output under project
`generated/media/`, inspect it, and import it with `renku media import` without
`--receipt`. If the active Codex image tool cannot accept actual reference
images, tell the user the Movie Lookbook, Location Sheet, and Character
Sheet files cannot be applied as image conditioning through that path. Prefer a
Renku-managed reference-capable route when the user wants project reference files
applied directly. Do not create a local composite, recolor, filter, traced
layout, or post-processed derivative as a substitute for model-native reference
conditioning. For Renku-managed generation, create and estimate a persisted spec
before any paid run, inspect the generated image, and import with the receipt
after agent review and user approval.

Renku-managed specs do not store provider `image_urls` or raw asset file paths.
They store the take target, supported reference settings for the route,
`promptSheetVisualStyleId`, `promptSheetNotationModeId`, and the authored
prompt. Do not add `image_urls`, asset ids, project file paths, panel plans,
annotation keys, or sheet-layout JSON to the spec manually. Before asking the
user to approve a paid run, validate the spec and inspect the prepared provider
payload so you know which reference images will actually be sent. Cost estimate
is pricing-only and does not prove provider reference readiness.

Use that provider preview to keep the prompt honest:

- For realistic storyboards, make the panel images carry the look and location.
  If extra board references are present because the route supplies them, either
  omit them from the prompt when they add nothing concrete, or give them a very
  narrow secondary role such as style, geography, or wardrobe continuity only.
- For hand-drawn storyboards, use supporting boards more actively, but describe
  them as references only. They are not source frames, start images, layouts,
  collages, or content to copy.
- Do not ask the app to enforce these creative choices. Treat them as prompt
  decisions made from the current provider preview and the user's direction.

Reference check:

```bash
renku generation spec validate --file <spec-json> --json
```

In the JSON output, confirm:

- the spec uses a supported reference path for the active route;
- `spec.promptSheetVisualStyleId` is `cinematic-realistic` or `handdrawn-storyboard`;
- `spec.promptSheetNotationModeId` is `none` or `motion-annotation`;
- `providerPayload.image_urls`, when present, contains only the logical
  `renku-input://...` entries expected for the route;
- any appended reference-conditioning instructions match the actual images that
  will be sent to the provider;
- the authored prompt scopes those images according to the storyboard style and
  user intent.

If the raw spec looks "unreferenced" but validation shows the correct
`providerPayload.image_urls`, the spec is correct. Explain that references are
resolved by Core at preparation time.

For a real Renku-managed run, confirm Codex has outbound provider network
permission before invoking `renku generation run`. A configured permission
profile must be active for the session. If the run reports only `fetch failed`,
diagnose network/profile/host reachability first; for this purpose the failure
may occur while uploading the Movie Lookbook, Location Sheet, or
Character Sheet references before GPT-Image-2 is invoked. Do not remove
`referenceMode`, add provider `image_urls` manually, or substitute local
compositing/post-processing for model-native reference conditioning.

## Storyboard Brief

Draft this as internal working notes before prompting any image model. It is
not a persisted Renku document.

```text
Take scope
- takeId
- take mode
- ordered shot ids
- active input mode and model if already chosen

Storyboard strategy
- chosen visual style metadata
- chosen notation mode metadata
- whether the prompt asks for panels, a full-canvas motion map, a diagram,
  sequential beats, captions, timing marks, or another layout
- source shot ids or take beats the prompt should emphasize
- story role
- visual frame
- action
- camera type, rig, lens, focal length, and movement when known
- beat timing and beat purpose
- annotation intent for body, camera, framing, light/impact, timing/pause
- model-facing note

Spatial continuity
- location anchor
- start spatial state
- end spatial state
- screen direction or travel direction when known
- required landmarks or zones from location context
- forbidden geography that would contradict context

Motion continuity
- camera movement
- subject movement
- speed or energy when known
- direction that must not be reversed
- transition or continuity link between panels when known

Visual continuity
- storyboard style: cinematic-realistic or handdrawn-storyboard
- realistic storyboard panel images must carry the final look, location,
  lighting, composition, and continuity
- for realistic storyboards, keep any extra Lookbook, Location Sheet, or
  Character Sheet references secondary when they are present
- for hand-drawn storyboards, include available Lookbook, Location Sheet, and
  Character Sheet references when useful, and call them references only
- storyboard images or prepared inputs that Core context provides as shot intent, not default style
- costume, prop, palette, lighting, or texture constraints when present

Audio and spoken timing
- exact narration, dialogue, or voiceover text only when known
- beat, sheet region, or visible cue where each spoken phrase belongs when the
  prompt uses that structure
- timing cue such as starts before panel, during panel, after panel, or
  bridges a visible beat
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

The brief is also the downstream handoff for final `shot.video-take` prompting.
Preserve hard constraints in a form the final video prompt can reuse: exact prop
or vehicle counts, required foreground/background geography, forbidden zones or
landmarks, line of action, known spoken words, visible timing cues, final frame
behavior, and "no text overlay" requirements. If the generated storyboard
spec or agent-authored brief is available later, read it before drafting the
final video prompt instead of relying on memory or thumbnails alone.

## Geography Guidance

Treat geography as a continuity system. For every storyboard reference, identify:

- where the take begins;
- where it ends;
- what must stay on the same side of frame or line of action;
- what physical zones or landmarks are allowed by the location context;
- which location details are mandatory because the user named them or because
  they appear in location context;
- which details are forbidden because they would change the meaning of the
  take.

Ask a targeted question when geography is required but missing:

```text
Which side of the room should the camera travel toward by the final panel?
Should the subject move deeper into the location, toward the camera, or across frame?
Which Location Sheet reference should anchor the storyboard geography?
Is there any geography the storyboard must avoid showing?
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
  timing: before-cue | during-cue | after-cue | bridges-next-cue
  source: user-direction | screenplay-dialogue | take-direction | production-notes
  instruction: <short model-facing instruction>
```

Never invent exact spoken words. If exact text is unknown, tell the image model
to leave spoken text blank or show only an empty audio cue row, depending on the
requested layout.

## Reusable Prompt Template

Use this provider-neutral template, filled from the brief:

```text
Create one readable storyboard reference image for this existing Shot Video Take.

If this is a realistic storyboard reference, render the panels as realistic cinematic images and do not rely on attached Lookbook or Location Sheet boards by default. The panel images themselves should establish the real look, location, lighting, composition, and continuity for later video generation.

If this is a hand-drawn storyboard reference, use any provided Storyboard Lookbook image only as a drawing/style reference. Use any provided Movie Lookbook, Location Sheet, or Character Sheet images only as references for look, place, wardrobe, and continuity. Do not use any provided board as a source frame, start image, page layout, collage, or content to copy directly.

Purpose:
- make one storyboard/reference image that helps downstream AI video prompting;
- preserve shot order, spatial continuity, motion continuity, and known spoken
  timing;
- support downstream AI video prompting.

Layout:
- <chosen layout: panels, motion map, sequential beats, diagram, or another explicit strategy>;
- include camera arrows, timing marks, labels, or motion notation only when they help the chosen strategy;
- if text appears, make it large enough to read;
- do not make a generic moodboard, poster, or unrelated concept collage.

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

Storyboard details:
<one block per panel, beat, region, or motion cue when the chosen strategy needs it>

Negative constraints:
<negative-constraints-brief>
```

Optional panel, beat, or region blocks should be compact and explicit:

```text
<Panel, beat, region, or cue> <label> / <shot-id when relevant>
- story role:
- visual frame:
- action:
- camera or motion:
- spatial continuity:
- visual continuity:
- spoken timing:
- model-facing note:
```

## Agent Review Before Import

Inspect the generated image and compare it against the brief before importing.

Treat the storyboard reference as weak and tell the user when:

- the storyboard contradicts the take order or take mode;
- motion direction is reversed or missing;
- spatial geography contradicts the take context;
- required location, cast, or lookbook references are absent or contradicted;
- exact spoken text appears in the wrong panel;
- invented narration, dialogue, subtitles, music, or sound effects appear;
- ungrounded landmarks, props, water, weather, signage, vehicles, or characters
  appear;
- labels are too small to read when the prompt asked for readable labels;
- the output is a generic moodboard, poster, or concept collage instead of the
  requested storyboard strategy.

When a storyboard reference is weak, report:

- what failed;
- why that failure matters for downstream video generation;
- whether the likely fix is prompt revision, more user direction, or accepting
  the reference with caveats.

If the user explicitly wants to keep or import a non-standard storyboard anyway,
respect that direction after naming the caveat. This review is agent guidance,
not app validation.

Before using an imported storyboard reference in a final video prompt, compare
the final video prompt against this same brief and the visible storyboard. A
corrected storyboard can only help if its hard constraints survive into the
final provider prompt.

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

Use `--replace-selected` only when the user is correcting a prior storyboard
reference and wants the old imported image discarded in the same slot.
