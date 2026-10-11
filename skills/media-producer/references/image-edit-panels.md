# Image edit panels

Use this guide for an eligible `image.edit` request in Codex Desktop. The user
marks rectangular regions on the image, gives each an instruction, and clicks
**Generate** in a fullscreen panel. You write the model prompt, execute it
through the normal provider Skill and CLI path, import the result and report
it. The panel never executes generation. When the request matches several
images, you first ask which one with an inline chooser.

## Eligibility

Both apps need trusted Codex Desktop and a current Renku MCP connection whose
`generation.review.capabilities` probe returns the `codex-mcp-client` identity
with `panel.status: advertised`. Check this first, before asking the user
anything about the image.

- **The chooser** is for every `image.edit` request in that host, whatever the
  model. Choosing the image comes before choosing the route.
- **The panel** opens when the edit route is FLUX 3 Image Edit on Fal.ai,
  `blackforestlabs/flux-3/edit-image`. That is the default edit route whenever
  `renku credentials status --json` shows `fal-ai` configured and the user has
  not named another model or provider, whatever the saved Image provider is. Do
  not ask the user which model to use in that case. A user who names another
  model or provider, or a Project without a saved Fal.ai key, keeps the
  conversational `image.edit` flow on the chosen image.

These apps are not generation reviews. Do not read or apply
`workflowPolicy.codexGenerationReview` or
`workflowPolicy.codexGenerationReviewDisplayMode`. The chooser is always
inline and the panel always fullscreen. Do not also open the combined
generation review, Visualize configuration or Studio Preview for a
panel-originated edit.

Every other host keeps the conversational `image.edit` flow with the shared
[generation review routing](generation-review-routing.md).

Never ask in chat which image to edit when several match: show the chooser.
Never ask in chat what to change before opening the panel: the user marks and
describes the changes in the panel. Pass any change the user already stated as
`wholeImageInstruction`.

## 1. Find the image to edit

Resolve the images the user's words could mean from the Renku domain commands
and generation context: for example, "Constantine's profile" means the Cast
Member's profile images, and "Giovanni's image" means every image of that Cast
Member, including character sheets. Use only active image Asset Files and their
exact ids.

- **One match:** go to step 3.
- **Several matches:** ask with the chooser (step 2), even when one of them is
  the current selection; suggest that one.
- **No match:** say what you looked for and ask the user which image they mean.

## 2. Ask which image with the chooser

Call `image.edit.target.choose` with 2 to 24 candidates, in the order to show
them, and your best guess:

```ts
// image.edit.target.choose
{
  project: string;
  assetFileIds: string[];          // 2..24 active image Asset Files
  suggestedAssetFileId: string;    // one of assetFileIds, usually the current selection
}
```

End the turn and wait. The chooser posts one message:

```text
Edit image chosen · <owner> · <image type> · Take <N>. Chooser <id>. Consume it with image.edit.target.consume once.
Image choice canceled. Chooser <id>. Consume it with image.edit.target.consume once.
```

Call `image.edit.target.consume` once with `{ chooserId }`:

- `chosen` returns the exact `assetFileId`; continue with step 3 when the
  route is FLUX 3 Image Edit, otherwise continue the conversational
  `image.edit` flow on that exact image.
- `canceled` means stop and reply briefly.
- `alreadyConsumed` authorizes nothing.

## 3. Open the panel and end the turn

With the FLUX 3 Image Edit route, open the panel right away; do not ask what
to change first.

```ts
// image.edit.flux-3.open
{
  project: string;
  sourceAssetFileId: string;
  route: { provider: 'fal-ai'; model: 'blackforestlabs/flux-3/edit-image' };
  wholeImageInstruction: string;   // the user's requested change in their words, or ''
  resolution: '1k' | '2k' | '4k';  // usually '2k'
}
```

A `CODEX_IMAGE_EDIT_INVALID` or `CORE_IMAGE_EDIT_TARGET_INVALID` result lists
every issue; correct the input and open again. Once the panel opens, end the
turn and wait. Opening the panel authorizes no generation.

## 4. Handle each Generate message

Each Generate click posts one message:

```text
Generate image edit · <owner> · <image type> Take <N>. I approve uploading this image and any references it needs to Fal.ai and running one paid FLUX 3 Image Edit at <resolution> with my saved Fal.ai key. Session <id>, action <id>. Consume it with image.edit.consume once.
```

For each one, in this order:

1. **Consume.** Call `image.edit.consume` once with `{ sessionId, actionId }`.
   `alreadyConsumed` authorizes nothing: do not generate or report again.
   If consume returns an error because the base image or style sheet is no
   longer available, the action has already been marked failed. Do not execute
   or report it. Explain the error briefly and wait for another Generate after
   the user chooses an available image or reference.
   Otherwise use only the consumed `project`, `provider`, `model`, `base`,
   `styleReference` and `draft`. `base` is the exact image to edit; it may be
   a newer version or a sibling selected in Studio after the panel opened.
2. **Resolve references from the user's words.** Read the draft's
   `wholeImageInstruction` and every region `instruction`. For each project
   item they name (a Prop, Cast Member, Location or Lookbook image), find the
   exact active Asset File with the domain commands and generation context.
   Ask in chat instead of guessing when a name is ambiguous, and report the
   action failed if you cannot resolve it.
3. **Write the FLUX 3 request** following
   [the FLUX 3 Image guide](model-guides/image/flux-3-image.md) and the Fal.ai
   [reference input adapter](../../fal-ai-media-provider/references/adapters/reference-inputs.md):
   - `image_urls` in this order: `base` as image 1, then `styleReference` when
     present, then each resolved reference, each as a `$file` marker with a
     meaningful `reviewLabel`.
   - `styleReference` is a Production or Storyboard Lookbook sheet: a board of
     palette, lighting and rendering examples, not a scene to copy. Give it a
     style-only role, such as "match the palette, lighting and rendering style
     shown in the style sheet in image 2", and never ask the model to copy its
     layout, panels or subjects.
   - **Never put project-internal words in the prompt.** Words such as
     "selected", "the pick", "Take 3", "the Props section", Studio names of
     panels, or any Renku id mean nothing to the model. Describe each
     reference by what it shows and its image number.
   - Write the instruction with one inline tag per region, `<region_N>` for
     region `N`, then the whole-image change, the style reference's role ("in
     the style of image 2, keeping the composition of image 1") and a sentence
     naming what must stay unchanged. Keep the user's intent; you may rephrase
     for the model.
   - Append one space and the JSON array of box rows. Region boxes are already
     on the 0–1000 grid; write them as `[top, left, bottom, right]`:
     - **Edit:** `{"id": "region_N", "from": null, "src_bbox": null, "tgt_bbox": [top, left, bottom, right], "desc": "<how the area should look after the edit>"}`.
     - **Remove:** `{"id": "region_N", "from": "ref_image_0", "src_bbox": [top, left, bottom, right], "tgt_bbox": null, "desc": "<what is being removed>"}`; say what fills the space in the instruction, using the region's instruction when given.
     - Add a keep row (`from: "ref_image_0"`, same `src_bbox` and `tgt_bbox`)
       for a nearby element that must not move, such as a face beside an
       edited hat.
   - Set `aspect_ratio: "auto"`, `resolution` from the draft,
     `output_format: "png"`, and leave `enable_prompt_expansion` off.
   Write the review document (`provider`, `model`, `mediaKind: "image"`,
   `prompt`, `request`) under `tmp/operations/media-generation/`.
4. **Validate and execute** with `renku generation validate --file <request>
   --json`, then `renku generation execute` with the returned
   `--expected-request-sha256`. The Generate message is the user's explicit
   approval for this one edit: it names the upload to Fal.ai, the paid run and
   the saved key, and the panel shows the same terms beside Generate. Do not ask
   for confirmation in chat, open a review or Studio Preview, or retry a
   successful paid execution. When the host requires approval to run the
   command (network access or an approval review), request it once with a
   justification that quotes that approval sentence and names the exact action
   id. If the host still refuses, report the action as failed with the host's
   reason instead of asking again in chat.
5. **Import** the output against the exact base:

   ```bash
   renku media import \
     --purpose image.edit \
     --target assetFile:<base.assetFileId> \
     --source <project-relative-output> \
     --provenance <returned-provenancePath>
   ```

   The result is stored beside the base. It becomes the selected image when
   its type has a selection (profiles, heroes, covers, Lookbook images, Shot
   and storyboard images); sheets and Shot Plan images are only added.
6. **Report** with `image.edit.report`:
   `{ sessionId, actionId, outcome: { status: 'attached', assetFileId } }` using
   `assetFile.id` from the import report, or `{ status: 'failed', message }`
   with a short user-readable reason when resolving, authoring, validation,
   execution or import fails. Report every consumed action exactly once; the
   panel keeps Generate disabled until you do.

Then reply briefly in the conversation and end the turn. The user compares
versions in the panel and changes the selection or deletes images in Studio;
do not repeat those actions in chat.
