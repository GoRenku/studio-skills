---
name: media-producer
description: Generate, review, inspect, and attach Renku Studio image, audio, and video media through provider Skills or the harness-gated Codex image capability. Use for Project, Lookbook, Cast, Location, Prop, Scene, Shot, dialogue, and Shot Plan media work.
---

# Media Producer

Use the installed `renku` runtime as the Project metadata and attachment
boundary. If it is unavailable, stop and direct the user to
`https://gorenku.com`.

Treat prompts, provider-native requests, receipts, and media as opaque creative
artifacts. Inspect them in the agent/user loop; never invent runtime validation
for their creative contents.

## Project Workspace

Keep operation documents under `tmp/operations/media-generation/`, generated
or downloaded files under `tmp/media/`, review evidence under `tmp/qa/`, and
other temporary inputs under `tmp/scratch/`. Use unique review filenames.
Never create working files at the Project root or construct durable Asset paths;
focused Core commands own attachment.

## Read the deterministic briefing first

Before choosing a provider, authoring a prompt, or creating a review document,
read the complete current Core briefing:

```bash
renku generation context \
  --purpose <purpose> \
  --target <target> \
  --json
```

For `scene.storyboard-sheet`, pass the exact reviewed revision and repeat
`--beat` for the requested batch. Without `--beat`, Core returns the revision's
complete ordered Beat set.

Treat `targetContext`, `visualLanguage`, `outputGuidance`, `workflowPolicy`,
`suggestedReferences`, and `warnings` as evidence. Core owns the factual Project
relationships in that report; do not rediscover them by scanning filenames,
tags, prompts, or unrelated command output. Suggestions are non-binding and
non-exhaustive: **context is evidence, not permission**. The user or agent may
ignore, supplement, or replace them for a
creative or provider-specific reason. A missing suggestion is information, not
a denial of permission or a generation blocker.

Inspect the exact files you deliberately choose. Give the provider Skill only
those chosen Project-relative files; provider Skills do not query Project
domains or decide which subjects belong to the target.

## Choose the execution lane

Read the current Project Settings and the user's explicit direction. The image
lane is `codex`, `fal-ai`, or `pika`; video is `fal-ai` or `pika`; audio is `elevenlabs`.
Replicate and WaveSpeed are advanced explicit choices only. World Labs is not a
generic Media Producer lane; route Location World work to
`location-world-producer`.

- For `fal-ai`, use `fal-ai-media-provider`.
- For `pika`, use `pika-media-provider`.
- For `replicate`, use `replicate-media-provider`.
- For `wavespeed-ai`, use `wavespeed-media-provider`.
- For `elevenlabs`, use `elevenlabs-media-provider`.
- For Codex, continue only when the current harness exposes its built-in image
  generation capability. If absent, report that fact and ask whether to use
  Fal.ai or Pika. Wait for the user's choice and never silently fall back.

Read [references/workflow.md](references/workflow.md) before authoring or
executing a request. For image work, also read
[references/image-operation-routing.md](references/image-operation-routing.md)
and [references/image-output-review.md](references/image-output-review.md).
Read only the purpose craft guide relevant to the current destination.

| Purpose | Craft guide |
| --- | --- |
| `image.create`, `image.edit` | `image-operation-routing.md`, then `prompt-guides/image/shared/prompt-authoring.md` |
| `project.cover` | `project-cover.md` |
| `lookbook.image` | `lookbook-image.md` |
| `lookbook.video-sheet`, `lookbook.storyboard-sheet` | `lookbook-sheets.md` |
| `cast.character-sheet` | `cast-character-sheets.md` |
| `cast.profile` | `cast-profile.md`; also `voice-over-profile-image.md` when `isVoiceOver` |
| `cast.voice-sample` | `cast-voice-sample.md` |
| `location.sheet`, `location.hero` | `location-sheet.md` |
| `prop.sheet`, `prop.hero` | `prop-sheet.md` |
| `scene.storyboard-sheet` | `scene-storyboard-sheet.md` |
| `shot.image` | `shot-image.md` |
| all `shot-plan.video-*` purposes | `shot-plan-video/index.md`, then `shot-plan-video/workflow.md` |
| `scene.dialogue-audio` | `prompt-guides/shared/audio-and-voice.md` |

## Review document

Every request uses this irreducible temporary envelope:

```json
{
  "provider": "fal-ai",
  "model": "openai/gpt-image-2",
  "mediaKind": "image",
  "prompt": "Exact authored prompt",
  "request": {
    "prompt": "Exact provider-native prompt",
    "image_url": {
      "$file": "tmp/scratch/reference.png",
      "mimeType": "image/png",
      "reviewLabel": "Opening frame — Shot Plan 01",
      "promptMention": "@Image1"
    }
  }
}
```

The provider Skill owns the exact `model` and provider-native `request` fields.
Use `{"$file":"<project-relative-path>","mimeType":"image/png","reviewLabel":"<meaningful context label>","promptMention":"<exact model token>"}`
at the exact native media field. `reviewLabel` is required for every Renku
review marker; omit `promptMention` when the selected model uses the input
implicitly. Do not add domain roles, Asset ids, provider uploads, credentials,
absolute paths, or signed URLs to the envelope.

## Preview and confirmation

For Engines providers, validate before Preview. Preview accepts Codex documents
without Engines validation:

```bash
renku generation validate --file tmp/operations/media-generation/request.json --json
renku generation preview show --file tmp/operations/media-generation/request.json --json
```

Use repeated `--file` flags to review several independent requests in order.
Preview is conversational: the agent pauses, the user may edit only the
top-level prompt, and Update or Close does not generate media or resume an
agent. Continue only after the user confirms in the ordinary conversation.
Reread the file, rebuild the native request from its final prompt, validate it
again when Engines-owned, and replace the document atomically before execution.

`showGenerationPreviews` controls automatic Preview. An explicit user Preview
request always opens it. `askBeforeGenerating` is one conversational pause, not
an approval token; a confirmation after Preview satisfies it. Apply the
per-media concurrency setting only to independent requests.

## Execute, recover, and attach

Engines-provider requests execute through the provider Skill:

```bash
renku generation execute \
  --file tmp/operations/media-generation/request.json \
  --output tmp/media/request \
  --json
```

If a submitted job times out or becomes interrupted and a request id is known,
use `generation recover` with the unchanged review file and exact request id.
Do not resubmit blindly.

Codex requests invoke the built-in image capability directly after Preview and
confirmation. They never call Engines commands and never invent an Engines
receipt.

Inspect every output before attachment. Write the exact returned
`provenance`—or the equivalent safe Codex provenance with no invented
receipt—to a unique JSON file under `tmp/operations/media-generation/`. Attach
through the focused destination:

```bash
renku media import \
  --purpose <purpose> \
  --target <target> \
  --source <project-relative-output> \
  --provenance tmp/operations/media-generation/provenance.json \
  --json
```

Use the existing grouped Storyboard, Cast Voice, dialogue, or Location World
command when that domain owns the attachment. Pass the same exact safe
provenance through its focused document. Do not create durable request/job
state, cost approval artifacts, or lifecycle records around generation.

Ordinary external media has no generation provenance. Never fabricate
provenance merely to satisfy a generated-only purpose. Copying and selection
remain Core-owned, and `--select` is used only when selection is part of the
current user intent.

## Purpose routing

Keep the current focused purpose and target vocabulary. Resolve exact ids from
the current handoff or relevant Renku domain command; never invent them. Then
let `generation context` supply the complete related graph.

- `project.cover` and `image.create` target `project`.
- `image.edit` context targets the exact source `asset:<id>`; an accepted output
  attaches through the user's chosen focused destination.
- Lookbook media targets `lookbook:<id>`.
- Cast media targets `cast:<id>`.
- Location and Prop media target `location:<id>` and `prop:<id>`.
- Scene Storyboards target `scene:<id>`; Shot images target `shot:<id>`.
- Shot Plan video and auxiliary contexts target `shot-plan:<id>`.
- Dialogue audio uses the focused Scene dialogue target.

Shot Plan generated Assets retain only weak `authoredFrom` context. They do not
become owned by or freeze the Shot Plan.
