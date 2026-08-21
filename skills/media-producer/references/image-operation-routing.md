# Image Operation Routing

Read this reference before choosing the purpose for every image request and
again whenever the user changes a request. Decide the operation from the
intended relationship to an existing image, not from words such as `edit`,
`generate`, `revise`, `fix`, or `regenerate` alone.

## Choose the operation first

Use the relevant focused creation purpose when the user wants a new image
candidate or a materially recomposed depiction. This includes a new camera or
viewpoint, framing, composition, layout, scene staging, depth order, subject
arrangement, pose, action, or independent interpretation. Existing images may
still be continuity, appearance, composition, or inspiration references; their
presence does not make the request an edit.

Use `image.edit` when one exact existing image is the canvas and the user wants
that image changed while its unaffected content remains continuous. Strong
signals include `change only`, `leave everything else the same`, `keep the
composition`, `remove`, `replace`, `repair`, or a request to alter a localized
region, material, color, lighting treatment, text region, or object state. A
change may cover much of the canvas and still be an edit when the user's
primary requirement is continuity with that exact source.

When both kinds of change appear, choose the operation that matches the user's
preservation requirement. If fulfilling the requested change necessarily
rebuilds the viewpoint, composition, or subject arrangement that the user also
asks to preserve, explain the conflict and ask which outcome matters. Do not
silently weaken either instruction.

## Reclassify every turn

The previous GenerationSpec purpose is never sticky. Rerun this decision when
the user steers a mutable request, responds to image review, or asks for a
change to a generated candidate.

- If the operation and exact target remain the same, revise the mutable saved
  request through the normal workflow.
- If the operation changes between focused creation and `image.edit`, author a
  new GenerationSpec with the new purpose and target. Never rewrite a saved
  request into a different purpose.
- `regenerate` means another focused creation only when the user wants a new
  interpretation. If the user chooses the current result as the exact canvas
  and asks to preserve it except for named changes, route the next request to
  `image.edit`.

Example:

- Re-stage a cannon, troops, mounted commander, operator, firing axis, and
  foreground-to-background order -> create a new `scene.storyboard-sheet`
  candidate.
- On that result, close two breaches in a wall and leave everything else the
  same -> create a new `image.edit` request against that exact result.

## Purpose and model route are independent

For focused creation, use the domain purpose and target that own the requested
new candidate, such as `project.cover`, `cast.profile`, `location.hero`,
`prop.sheet`, `scene.storyboard-sheet`, or `shot.image`. Use `image.create` only
for a generic Project image with no more specific current purpose.

For a source-preserving edit:

- use `purpose: image.edit`;
- target the exact source Asset;
- put the exact source AssetFile in the locked `source/source-image` slot; and
- use revise-source prompt guidance.

The provider endpoint does not choose the Studio purpose. A route such as
`fal-ai/openai/gpt-image-2/edit` can provide multi-image conditioning for a new
focused generation. Conversely, Codex may use the same `codex/gpt-image-2`
identity for both a new generation and an actual source edit. A source image in
an Additional or continuity slot is not a substitute for `image.edit`.

## Select execution independently

After choosing focused creation or `image.edit`, select the execution path
through the same precedence for every image purpose: explicit current user
direction, then an already-authored saved-spec path, then the Project's **Use
Codex for image generation** setting.

When that setting selects Codex and no higher-precedence choice overrides it,
an `image.edit` defaults to an `agent-external` request using
`codex/gpt-image-2`. Keep the exact source AssetFile in the locked
`source/source-image` placement as a logical reference, omit `providerField`,
and use exactly `values: { prompt }`. Do not switch to a Renku-managed edit
merely because its provider route ends in `/edit`.

Use a Renku-managed edit route only when explicit current direction, the saved
spec, or the Project setting selects Renku. If Codex is selected but unavailable
in the current harness, ask which path to use; never silently fall back to paid
Renku execution.

## Resolve the exact source

An `image.edit` request requires a registered source Asset and AssetFile.

- If the requested source is already registered, resolve and inspect that exact
  file from current context.
- If it is an unattached candidate produced in the current workflow and its
  focused destination is already known, import it there as an unselected
  candidate with its exact receipt or frozen source spec, report that durable
  registration, then use the returned Asset and AssetFile as the edit source.
  Requesting an edit chooses the candidate as a source; it does not select it as
  canonical output.
- If registration would require choosing an unknown destination or another
  product decision, ask before importing. Do not avoid the question by placing
  the project file in an Additional slot and calling focused creation an edit.

## Attach the accepted result

After separate output acceptance, import the edited result through the focused
image destination chosen for that result. The destination purpose and owner are
independent from the edit source. Preserve the exact managed receipt or frozen
external source spec, and apply that destination's ordinary selection rules.
