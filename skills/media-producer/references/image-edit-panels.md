# Image edit panels

Use this guide for an eligible `image.edit` request in Codex Desktop. The user
describes the change, marks rectangular regions when the route takes them, and
clicks **Generate** in a fullscreen panel. You write the model prompt, execute
it through the normal provider Skill and CLI path, import the result and report
it. The panel never executes generation. When the request matches several
images, you first ask which one with an inline chooser.

## Eligibility

Both apps need trusted Codex Desktop and a current Renku MCP connection whose
`generation.review.capabilities` probe returns the `codex-mcp-client` identity
with `panel.status: advertised`. Check this first, before asking the user
anything about the image.

- **The chooser** is for every `image.edit` request in that host, whatever the
  model. Choosing the image comes before choosing the route.
- **The panel** opens when the selected edit route appears in an
  `image-edit` block of the `## Codex panel` section of its canonical model
  guide. Select the route as the Media Producer Skill directs (its default
  edit route rule applies); do not ask the user which model to use when that
  rule decides. A route without a block keeps the conversational `image.edit`
  flow on the chosen image.

These apps are not generation reviews. Do not read or apply
`workflowPolicy.codexGenerationReview` or
`workflowPolicy.codexGenerationReviewDisplayMode`. The chooser is always
inline and the panel always fullscreen. Do not also open the combined
generation review, Visualize configuration or Studio Preview for a
panel-originated edit.

Every other host keeps the conversational `image.edit` flow with the shared
[generation review routing](generation-review-routing.md).

Never ask in chat which image to edit when several match: show the chooser.
Never ask in chat what to change before opening the panel: the user describes
the changes in the panel. Pass any change the user already stated as
`initialWholeImageInstruction`.

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
  route has a `## Codex panel` block, otherwise continue the conversational
  `image.edit` flow on that exact image.
- `canceled` means stop and reply briefly.
- `alreadyConsumed` authorizes nothing.

## 3. Open the panel and end the turn

A panel-capable model guide holds a fenced `json` block for the `image-edit`
purpose:

```json
{
  "purpose": "image-edit",
  "routes": [
    {
      "provider": "<provider id>",
      "model": "<exact route id>",
      "regionModes": [
        { "id": "<mode id>", "label": "<button label>", "instructionRequired": true, "placeholder": "<instruction hint>" }
      ],
      "styleReference": true,
      "controlPointers": ["/native/json/pointer"]
    }
  ]
}
```

`regionModes` lists the region actions the route accepts in display order, the
first being the default, or is `null` when the route takes no regions.
`styleReference` says whether the route takes a style reference image.
`controlPointers` lists the few native settings the panel shows. Build the
Route Description from the entry for the selected provider and model:

- copy `provider`, `model`, `regionModes` and `styleReference`;
- take `label` and `providerLabel` from the route's `generation models list`
  entry, the same source the combined review uses (`label` is the route index
  `name`);
- build `controls` from the live schema (`renku generation schema show
  --provider <provider> --model <model> --json`) for the listed
  `controlPointers` only, using the generation review control rules: one
  group (use the label the guide gives, such as "Output"), the schema title as
  each control's label, an `initialValue` for each, scalar kinds only and never
  nullable.

Open the panel right away; do not ask what to change first.

```ts
// image.edit.open
{
  project: string;
  sourceAssetFileId: string;
  route: {
    provider: string;
    providerLabel: string;
    model: string;
    label: string;
    regionModes: Array<{ id: string; label: string; instructionRequired: boolean; placeholder: string }> | null;
    styleReference: boolean;
    controls: { groups: Array<{ label: string; fields: NativeRequestControl[] }> };
  };
  initialWholeImageInstruction: string; // the user's requested change in their words, or ''
}
```

A `CODEX_IMAGE_EDIT_INVALID` or `CORE_IMAGE_EDIT_TARGET_INVALID` result lists
every issue; correct the input and open again. Once the panel opens, end the
turn and wait. Opening the panel authorizes no generation.

## 4. Handle each Generate message

Each Generate click posts one message:

```text
Generate image edit · <owner> · <image type> Take <N>. I approve uploading this image and any references it needs to <provider> and running one paid <route> with my saved <provider> key. Session <id>, action <id>. Consume it with image.edit.consume once.
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
3. **Write the native request** from the route-neutral draft
   `{ baseAssetFileId, wholeImageInstruction, styleReferenceAssetFileId, regions, values }`,
   following the `## Codex panel` mapping prose in the route's model guide and
   the provider's reference input adapter:
   - Order the reference images: `base` first, then `styleReference` when
     present, then each resolved reference, each as a `$file` marker with a
     meaningful `reviewLabel`, in the native field the adapter names.
   - `styleReference` is a Production or Storyboard Lookbook sheet: a board of
     palette, lighting and rendering examples, not a scene to copy. Give it a
     style-only role, such as "match the palette, lighting and rendering style
     shown in the style sheet in image 2", and never ask the model to copy its
     layout, panels or subjects.
   - **Never put project-internal words in the prompt.** Words such as
     "selected", "the pick", "Take 3", "the Props section", Studio names of
     panels, or any Renku id mean nothing to the model. Describe each
     reference by what it shows and its image number.
   - Each region has a route `mode` id, a box on the 0–1000 grid with the
     origin at top-left (`top`, `left`, `bottom`, `right`), and an
     instruction. Convert boxes to the model's native notation as its guide
     says.
   - Set each entry of `values` at its JSON Pointer in the native request.
   Keep the user's intent; you may rephrase for the model. Write the review
   document (`provider`, `model`, `mediaKind: "image"`, `prompt`, `request`)
   under `tmp/operations/media-generation/`.
4. **Validate and execute** with `renku generation validate --file <request>
   --json`, then `renku generation execute` with the returned
   `--expected-request-sha256`. The Generate message is the user's explicit
   approval for this one edit: it names the upload to the provider, the paid
   run and the saved key, and the panel shows the same terms beside Generate. Do not ask
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
