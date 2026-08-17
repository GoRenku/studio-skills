# Scene Storyboard Sheet Purpose

Purpose: `scene.storyboard-sheet`

Target: `scene:<scene-id>`

Beat Storyboards are pre-production story-alignment artifacts. They visualize
the ordered narrative developments already authored in Scene Beats so the
director, screenwriter, and collaborators can discuss clarity, emotional
progression, pace, and timing. They do not define production coverage, lenses,
camera movement, rigs, lighting setups, or an edit plan; route that work to
Shot Planner.

## Required Workflow

If the user names a production reference such as `Scene 22` or `22A`, resolve it
before building the target:

```bash
renku screenplay scene-number resolve --number <production-number> --json
```

Use the returned durable `sceneId` in the generation target, Scene Beats revision reads,
and persisted Generation Spec. Do not add a duplicate production-number field.

1. Read generation context:

   ```bash
   renku generation context \
     --purpose scene.storyboard-sheet \
     --target scene:<scene-id> \
     --json
   ```

2. Resolve and read the exact Scene Beats revision. Do not rely on an active
   revision id from an earlier handoff without reading it back:

   ```bash
   renku screenplay beats context --scene <scene-id> --json
   renku screenplay beats show --revision <scene-beats-revision-id> --json
   renku screenplay beats storyboard status --scene <scene-id> --revision <scene-beats-revision-id> --json
   ```

3. Read the current Storyboard Lookbook document in full with
   `renku lookbook show --kind storyboard --json`.
4. Inspect and attach one exact usable Storyboard Lookbook Sheet. It is the
   only appearance authority. If the role is unauthored, hand off to Lookbook
   Designer. If the document exists but no usable Sheet exists, prepare
   `lookbook.storyboard-sheet` and obtain acceptance first. Never substitute
   the Production Lookbook, Production Lookbook prose, or a prose-only style
   guess.
5. Determine the exact requested or missing Beat ids. Scene Beat authoring may
   contain any narrative-appropriate number of Beats. Do not add, remove,
   merge, split, pad, reorder, or rewrite Beats for image-generation cost.
6. Partition only the requested saved Beats, in revision order, into
   consecutive groups of at most four. The standard batch is the next four. A
   one-to-three-Beat batch is valid for the final remainder, an exact smaller
   subset requested by the user, or a real selected-path reference-capacity
   constraint. Never invent filler Beats or silently drop a needed reference.
7. For each batch, gather the exact narrative and continuity context, inspect
   exact reference files, reason about visible action, stage each panel, and
   synthesize the provider prompt as described below.
8. Use the Project's **Use Codex for image generation** setting. It is on by
   default. An explicit user choice for this request or a path already saved on
   the Spec takes precedence. If Codex is selected, require the harness
   capability `codex.gpt-image-2`. If the setting is off, use Renku-managed GPT
   Image 2 edit.
9. Save, review, reread, and freeze one GenerationSpec per batch. For Codex,
   invoke the built-in image tool with the frozen prompt unchanged and every
   selected local reference. For managed execution, Preview, estimate, obtain
   approval, and run through the ordinary contract.
10. Analyze the returned image once with vision. For a one-Beat request,
    inspect and import the complete full-canvas image without putting it in a
    grid. For a multi-Beat composite, identify only the actual Beat panel image
    blocks, crop through the existing vision-guided workflow, and inspect every
    Beat crop. Never crop or import a layout-only placeholder cell. Import
    useful accepted Beat images, or report the problem and stop. Do not
    automatically edit the image, author a repair prompt, retry, or regenerate.
    A user-requested later attempt is a fresh reviewed request and usage/cost
    boundary.

## Prompt Inputs

Gather:

- the exact Scene and Scene Beats revision;
- selected Beat ids, titles, descriptions, narrative developments, narrative
  purposes, Cast Member ids, Location ids, Prop ids, and Screenplay Block ids;
- `facts.contextText` as opaque authored narrative context;
- the current Storyboard Lookbook document and one exact Storyboard Lookbook
  Sheet;
- exact records and visually inspected sheets for Cast Members, Locations,
  and Props used by the batch;
- useful prior accepted Beat images only when they can be attached through a
  real provider-visible reference; and
- the selected execution path's current model/tool guide, input shape,
  reference capacity, and size controls.

Filter the complete Scene-level inventories to the batch. Preserve first Beat
appearance order separately for Cast Members, Locations, and Props. Choose
exact sheets by visual suitability, never candidate list order. Deliberately
reuse accepted subject-owned references across Scenes and batches when
continuity should remain unchanged.

If a required subject has no usable continuity sheet, do not silently omit it,
infer continuity from a filename or prompt, or substitute an unrelated Project
image. Stop and ask whether to generate the missing sheet, use an explicitly
supplied external reference, revise the batch, or proceed without that anchor.

Reason about the visible event that communicates each Beat's narrative
development and the visual emphasis that serves its narrative purpose without
pasting that abstract purpose into the prompt. Deliberately choose subject
scale and placement, body pose, gaze, emotional read, action, interaction,
Location geography and landmarks, Prop state and holder, foreground and
background relationships, cross-panel continuity, provisional viewpoint, and
details to exclude.

The Scene Beats revision decides the narrative moments to illustrate. It does
not define camera Shots. Any framing or composition chosen for a panel is a
provisional agent-owned choice for that artifact, not Beat persistence or a
production coverage decision.

## Reference Roles And Appearance Authority

Every attached reference has one non-overlapping role:

- the Storyboard Lookbook Sheet controls medium, realism level, linework,
  finish, lighting treatment, grade, texture, and detail density;
- Character Sheets control canonical identity, facial and body features,
  silhouette, proportions, costume, hair, and distinguishing details;
- Location Sheets control canonical geography, landmarks, architecture, set
  dressing, and recognizable environmental features; and
- Prop Sheets control canonical construction, geometry, scale, materials,
  markings, condition, and Beat-specific state.

Tell the model to reproduce continuity subjects faithfully while re-rendering
them only in the Storyboard Lookbook's visual language. A realistic continuity
sheet never makes the Storyboard realistic unless the Storyboard Lookbook says
so. A coarse or hand-drawn Lookbook may simplify small details, but identity,
silhouette, costume, construction, geography, and other defining features must
remain unmistakable.

Name every prompt-visible reference with its exact stable `promptMention`.
Use wording equivalent to:

```text
Reference 1 — Storyboard appearance authority:
Render every panel only in this reference's visual language.

Reference 2 — Character continuity authority:
Preserve identity, facial and body features, silhouette, proportions, costume,
hair, and distinguishing details. Re-render the Character in Reference 1's
Storyboard style; do not copy Reference 2's source lighting, finish, or realism.
```

Apply equivalent exact invariant wording to Locations and Props.

## Prompt Synthesis

Treat narrative fields as reasoning evidence, not provider payloads. Do not
paste `facts.contextText`, full Beat JSON, an abstract `narrativePurpose`
paragraph, untranslated `narrativeDevelopment`, internal ids as visible
labels, or invented Shot Planner camera/coverage prose.

For a complex one-to-four-Beat request, use this stable order:

1. Artifact and goal.
2. Reference roles and the preserve-versus-restyle contract.
3. Panel 1 through Panel N visible direction.
4. Cross-panel and cross-batch continuity.
5. Appearance traits derived only from the Storyboard Lookbook.
6. The exact count-specific composite layout below and high-resolution output
   requirements.
7. Exclusions and text/label rules.

Each panel description must be concrete and action-focused. State visible
subjects, viewpoint, framing, scale, placement, gaze, action, spatial
relationships, Location geography, and Prop interaction when they matter.

## When Codex Is On Or Off

The default request is agent-external Codex:

```json
{
  "executionKind": "agent-external",
  "model": { "provider": "codex", "model": "gpt-image-2" },
  "values": { "prompt": "<exact reviewed prompt>" }
}
```

Keep `values` exactly prompt-only. Keep image references logical and omit
`providerField`. Put the Storyboard Lookbook first, give every reference a
stable `promptMention`, and pass every selected local image through the
built-in tool's reference inputs. Put the high-resolution full-composite
requirement in the exact prompt because the current built-in envelope has no
structured `image_size` or `quality` field. Inspect actual dimensions and do
not invent a pixel guarantee. Do not author a Renku estimate, approval token,
GenerationRun, provider receipt, `image_size`, `quality`, `num_images`, or
`input_fidelity` for this external request.

When the Project setting is off or the user explicitly selects Renku, use
`fal-ai/openai/gpt-image-2/edit`. Put every provider-visible reference in
`image_urls` and choose a current descriptor-supported custom `image_size`
near the route's reliable high-resolution boundary while preserving the
composite layout. Recheck current constraints rather than hardcoding one
universal size. Leave authored `quality` absent because Core fixes it to
`high`; leave `num_images` absent when the one-image default is correct; and
omit `input_fidelity` because GPT Image 2 processes references at high
fidelity automatically.

## Sheet Layout

- one high-resolution full storyboard image on an output canvas supported by
  the selected model, not a thumbnail sheet;
- one to four Beat panels; a two-Beat composite also uses two layout-only
  placeholder cells;
- every complete panel uses the Project aspect ratio returned by generation context;
- Beats arranged in Scene Beats revision order;
- a clean grid with clear gutters and panel image areas suitable for vision-guided cropping;
- no cropped, stretched, overlapping, or merged panel image regions;
- unused canvas space may remain empty instead of becoming filler imagery;
- labels only in margins, headers, or gutters, never inside the panel image content.

Put the exact batch-size layout in the reviewed provider prompt. Define the
occupied layout region independently from the model-supported output canvas so
the canvas may keep unused margins around it:

- one panel: use the complete output canvas as one Project-ratio Beat image;
  do not put it in a grid or surround it with unused placeholder cells;
- two panels: define a fixed two-by-two grid region whose outer rectangle uses
  the Project aspect ratio, place Panel 1 upper-left and Panel 2 upper-right,
  and fill the lower-left and lower-right cells with visibly bounded,
  low-detail layout placeholders. Give each placeholder a complete cell border
  and only sparse neutral construction marks, such as two faint corner-to-corner
  diagonals. Give the placeholders no people, Locations, Props, objects, text,
  labels, captions, or narrative imagery;
- three panels: use the same fixed two-by-two Project-ratio grid region, place
  Panels 1 and 2 across the upper row and Panel 3 lower-left, and leave the
  lower-right cell area as plain sheet background without a panel border,
  label, or imagery; and
- four panels: fill the fixed two-by-two Project-ratio grid region in Beat
  order.

A two-by-two grid region with the same outer aspect ratio as the Project gives
every cell that same aspect ratio. For a two-Beat remainder, use the two visible
placeholder cells to establish the lower row's geometry, explicitly prohibit
two full-width stacked strips, and tell the model not to enlarge the Beat
panels into the placeholder cells. Treat the placeholders only as disposable
layout scaffolding: they are not Beats, never receive Beat ids, and must not be
cropped, imported, or persisted. For a three-Beat remainder, explicitly tell
the model not to enlarge occupied cells into the unused lower-right space. Do
not rely on generic phrases such as `two-panel layout` or `three-panel layout`
to communicate this geometry, and do not invent filler Beats or duplicate Beat
content.

The composite canvas does not need to match the Project aspect ratio. Its size
and aspect ratio follow the selected model's supported output. Every Beat panel
has equal visual priority and enough area for a durable crop; layout-only
placeholder cells stay deliberately low-detail. Do not falsely claim that each
crop has the pixel dimensions of a separate full-canvas generation. Inspect
actual composite dimensions and every Beat crop.

Do not use fixed crop coordinates, OCR, marker detection, border detection,
grid slicing, runtime auto-splitting, or a new crop dependency.

## Import Shape

```json
{
  "sceneBeatsRevisionId": "scene_beats_revision_foundry_v1",
  "title": "Foundry storyboard package",
  "select": true,
  "beats": [
    {
      "beatId": "beat_001",
      "source": "tmp/media/foundry-storyboard-sheet-1-beat-001.png",
      "sourcePurpose": "scene.storyboard-sheet"
    },
    {
      "beatId": "beat_005",
      "source": "tmp/media/foundry-storyboard-sheet-2-beat-005.png",
      "sourcePurpose": "scene.storyboard-sheet"
    }
  ]
}
```

Import with:

```bash
renku media import \
  --purpose scene.storyboard-sheet \
  --target scene:<scene-id> \
  --revision <scene-beats-revision-id> \
  --file tmp/operations/scene-storyboard-import.json \
  --json
```

For one source file, pass exactly one `--beats <beat-id>`.

The grouped document must state one explicit `select` choice. Use `true` when
these accepted crops should become the current images for their Beats. Use
`false` when deliberately importing additional candidates without changing
existing selections. Do not import and then issue one selection command per
Beat.

Every Beat id must belong to the target Scene Beats revision. Files must be
project-relative. Each imported crop becomes an ordinary Asset owned by its
logical Scene Beat. Do not persist crop boxes, extraction confidence, grid
layout, composite sheet files, or other agent-side mechanics.

Core keeps every accepted import batch in the Scene-local numbered iteration
folder. Never move, flatten, rename, or reuse an existing iteration folder.
Reactivating an older Scene Beats revision reconnects its retained Beat ids and
images without copying files.
