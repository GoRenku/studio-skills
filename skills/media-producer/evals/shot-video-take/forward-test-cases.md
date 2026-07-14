# Media Producer Forward-Test Cases

Use these cases after substantial Media Producer changes. Give each raw task to
a fresh agent with the skill path and a separate disposable project copy. Do
not give the agent the pass criteria. Inspect its command trace, authored JSON,
preview, and attachment commands—not only its prose answer.

Never allow a forward test to make a paid provider call or mutate the user's
real project.

## Context-Driven Location Sheet

Raw task:

> Create a Location Sheet for the Sea Walls, show me the provider preview, and
> stop before paid generation. The board should be a wide production reference
> for siege planning.

Pass criteria:

- starts with `generation context --purpose location.sheet --target
  location:<id> --json`;
- chooses a current endpoint and authored setting values from the returned
  context/model descriptors rather than a skill-owned provider map;
- authors a `GenerationSpec` whose prompt and chosen aspect ratio agree;
- runs `generation validate --file ... --json` and `generation preview show
  --file ... --json`;
- does not estimate recursively, fabricate references, persist media, or run
  paid generation.

## Storyboard Lookbook Sheet, Scene Sheet, Split, And Import

Raw task:

> Create the missing Storyboard Lookbook Sheet for the selected Lookbook. Then
> use it to create storyboard images for these four saved Shots in the current
> Scene Shot List. Review and split the generated sheet, import the four crops,
> and do not run anything without my generation approval.

Pass criteria:

- uses `lookbook.storyboard-sheet`, never `lookbook.video-sheet`, for the
  storyboard visual-language asset;
- attaches the approved Lookbook output with focused `media import --purpose
  lookbook.storyboard-sheet`;
- reads `scene.storyboard-sheet` context and preserves the returned
  `visual-language` / `storyboard-lookbook-sheet` placement;
- assigns the exact Storyboard Lookbook Sheet to an actual image media field
  such as `image_urls` for the selected edit endpoint;
- treats the Scene Storyboard sheet as a fixed 4:3, high-quality composite and
  uses agent vision to review the whole sheet and each crop;
- keeps the grouped attachment document kind exactly
  `sceneStoryboardImagesImport` and calls `media import --purpose
  scene.storyboard-sheet --target scene:<id> --shot-list <id> --file <json>
  --json`;
- never invents panel schemas, asset ids, receipts, or a generic import path.

## Seven-Shot Storyboard Continuity And Combined Preview

Raw task:

> Prepare storyboard sheets for all seven saved Shots in this Scene. Keep the
> Cast and Harbor Quarter visually continuous, show both requests together,
> and stop before any paid generation.

Pass criteria:

- reads the exact Scene Shot List context and saved Shot List before batching;
- reads `scene.storyboard-sheet` generation context and uses
  `facts.contextText` as opaque authored narrative rather than inventing a
  parallel historical or Storyboard facts contract;
- creates two ordinary specs in Shot List order, covering Shots 1-4 and 5-7;
- identifies the Cast Members and Locations relevant to each subset from the
  Shot List, inspects every chosen visual reference, and includes only the
  relevant exact Storyboard Lookbook, Cast, and Location files;
- assigns every included Renku reference to an actual returned provider media
  field, or passes every accepted Codex ImageGen reference through
  `referenced_image_paths`;
- stops for explicit user direction if a needed continuity selection is empty
  or unsuitable instead of substituting the first candidate;
- validates both specs before calling `generation preview show` once with two
  repeated `--file` values in order;
- treats the two specs as independent estimates, approvals, runs, outputs, and
  attachments and makes no paid call.

## Direct Shot Video Take Request

Raw task:

> Use the saved motion storyboard and dialogue audio for this Take. Build the
> exact Seedance request, show its provider preview and cost, and stop for my
> approval.

Pass criteria:

- starts with `generation context --purpose shot.video-take --target
  take:<id> --json` and selects a direct current endpoint from returned model
  descriptors;
- preserves exact context-returned slot placement, including scope and subject
  ids when present;
- assigns the storyboard to `image_urls` and dialogue audio to `audio_urls`
  for `bytedance/seedance-2.0/reference-to-video`, or uses the actual returned
  media fields if a different endpoint is chosen;
- keeps media out of `values` and includes `providerField` on every included
  reference;
- validates, previews the saved or draft spec, persists the exact request,
  estimates that spec, and stops before `generation run`;
- uses provider-preview token order as the only basis for `@ImageN` and
  `@AudioN` names without reconstructing a second request-planning contract.

## Reuse An Image Create Output As A Project File

Raw task:

> An earlier `image.create` run produced
> `generated/images/motion-reference.png`. Reuse that exact generated project
> file as the storyboard reference for this Take. Estimate the final video and
> stop for approval. Do not attach the intermediate image as a durable asset.

Pass criteria:

- verifies the reported path/run and recognizes the intermediate request as
  purpose `image.create`;
- represents the unattached output as `{ "kind": "project-file",
  "projectRelativePath": "..." }` in the final spec;
- does not invent an `assetId`, `assetFileId`, attachment command, or receipt
  for the intermediate file;
- assigns the project file to the selected endpoint's actual provider media
  field and previews the resulting payload;
- estimates only the exact final spec and stops before its paid run.

## External File Without Synthetic Provenance

Raw task:

> Use `tmp/media/external-elise-reference.png` as an additional appearance
> reference in this generation request. It came from outside Renku. Show the
> preview and do not pretend it was generated or imported by Renku.

Pass criteria:

- first verifies the normalized project-relative file is available and safe;
- uses an exact `project-file` reference with `placement.kind` set to
  `additional`;
- selects a reference-capable endpoint and assigns the file to its returned
  provider media field;
- does not fabricate a generation receipt, provenance record, asset id, asset
  file id, or unsupported generic attachment;
- validates and previews the request without a paid call.

## Lookbook Image Import Then Placement

Raw task:

> Import `tmp/media/external-hallway.png` into this Lookbook under Thesis and
> beside the specified Texture point. It is an external image, not a Renku
> generation output.

Pass criteria:

- imports with `renku media import --purpose lookbook.image --target
  lookbook:<id> --source tmp/media/external-hallway.png --title ... --json`
  and omits `--receipt`;
- does not pass ignored `--sections` or `--anchor` flags to `media import`;
- reads the successful import response's `ownerRecord.id`;
- places that exact returned id with `renku lookbook image set-placement
  --image <ownerRecord.id> --sections thesis,texture --anchor <point-id>
  --json`;
- does not guess the Lookbook Image id or mutate project files directly.
