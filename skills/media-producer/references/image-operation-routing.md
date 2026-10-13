# Image Operation Routing

Read this reference before choosing the purpose for every image request and
again whenever the user changes a request. Decide the operation from the
intended relationship to an existing image, not from words such as `edit`,
`generate`, `revise`, `fix`, or `regenerate` alone.

## Choose the operation first

An exact edit needs the source artifact and current instruction, not its old
recipe. Use `model-guides/shared/reference-inputs.md` for deliberate history
inspection, reuse, revision, or debugging when the task calls for it.

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

In trusted Codex Desktop with panel support, an `image.edit` continues in the
[image edit panels](image-edit-panels.md): the inline image chooser whenever
several images match, then [route choice](route-choice.md), then the edit panel
when the chosen route has one.

## Reclassify every turn

The previous request purpose is never sticky. Rerun this decision when the user
steers a request, responds to image review, or asks for a
change to a generated candidate.

- If the operation and exact target remain the same, revise the temporary
  review request through the normal workflow.
- If the operation changes between focused creation and `image.edit`, author a
  new request with the new purpose and target.
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
- target the exact source AssetFile;
- pass the exact source AssetFile path through the selected provider's native
  source-image field; and
- use revise-source prompt guidance.

The provider endpoint does not choose the Studio purpose. A route such as
`fal-ai/openai/gpt-image-2/edit` can provide multi-image conditioning for a new
focused generation. Conversely, Codex may use the same
`codex/chatgpt-images-2.5` family identity for both a new generation and an
actual source edit. A source image in
an Additional or continuity slot is not a substitute for `image.edit`.

## Select execution independently

After choosing focused creation or `image.edit`, select the provider and model
through [route choice](route-choice.md). The purpose decides the lane: focused
creation uses the Image Generation lane and `image.edit` the Image Editing lane
(`workflowPolicy.lane: imageEdit`). Explicit current user direction wins over
the lane default; an unset Image Editing model uses the Default Model List
recommendation for the lane provider, which is FLUX 3 for Fal.ai.

When the chosen route is Codex, an `image.edit` uses the built-in Codex image
capability with the `chatgpt-images-2.5` family identity. Pass the exact source
image as a built-in capability reference and keep the exact authored prompt in
the shared review envelope. Do not switch to another provider merely because
its route ends in `/edit`. If Codex is chosen but unavailable in the current
harness, ask which path to use; never silently fall back to paid Renku
execution.

## Resolve the exact source

An `image.edit` request requires one registered image AssetFile. All active
image AssetFiles can be edited, including Inspiration and research images.

- If the requested source is already registered, resolve and inspect that exact
  file from current context.
- If it is an unattached candidate produced in the current workflow and its
  focused destination is already known, import it there as an unselected
  candidate with its exact generation provenance, report that durable
  registration, then use the returned AssetFile as the edit source.
  Requesting an edit chooses the candidate as a source; it does not select it as
  canonical output.
- If registration would require choosing an unknown destination or another
  product decision, ask before importing. Do not avoid the question by placing
  the project file in an Additional slot and calling focused creation an edit.

## Attach the generated result

After inspection, attach the edited result with `image.edit` targeting the exact
source AssetFile. Core creates a new unselected AssetFile in the same owning
collection, preserving the original and its selection. An edited Inspiration
image appears in the same Inspiration folder; a research edit stays beside its
source. Preserve the exact generation provenance, including the original image
input. Do not overwrite the original, choose a different destination, or use a
focused creation purpose to attach the edit. Users may delete the old image
afterward if they want.
