# Dormant Shot Video Forward-Test Cases

> **Status: retained design reference.** Do not run these cases while Shot Video
> authoring is unavailable. Revalidate the purpose keys, target shape, CLI
> commands, provider descriptors, and expected durable state before enabling
> them again.

After Shot Video authoring returns, give each raw task to a fresh agent with the
skill path and a separate disposable project copy. Do not give the agent the
pass criteria. Inspect its command trace, authored JSON, preview, and attachment
commands—not only its prose answer.

Never allow a forward test to make a paid provider call or mutate the user's
real project.

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
