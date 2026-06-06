---
name: media-producer
description: Generate purpose-specific media for Renku Studio projects by reading Renku generation context, creating persisted generation specs, honoring user-selected controls exactly, estimating cost, running through Studio engines, and importing finished files separately.
---

# Media Producer

Use this skill when the user wants to create media for a Renku Studio purpose, such as a Lookbook demonstration image, Lookbook sheet (`lookbook.sheet`), cast character sheet, cast profile image, location environment sheet, scene storyboard sheet, shot first frame (`shot.first-frame`), shot last frame (`shot.last-frame`), ad hoc shot reference image (`shot.reference-image`), shot multi-shot storyboard sheet (`shot.multi-shot-storyboard-sheet`), final shot video take (`shot.video-take`), future scene mood frame, or future narration audio.

This is not a generic image prompt skill. Renku is the context engine: first ask Renku what the media is for, then create or update a persisted spec that captures the user's binding choices.

## Start Here

1. Resolve the current Renku project, target purpose, and target id.
2. Read purpose context:

```bash
renku generation context --purpose <purpose-key> --target <target> --json
```

3. Inspect purpose-specific model choices if the user has not already chosen one:

```bash
renku generation model list --purpose <purpose-key> --target <target> --json
```

4. Create a Media Generation Spec JSON with the user's binding choices.
5. Persist the spec:

```bash
renku generation spec create --file <spec-json> --json
```

6. Estimate cost and get the approval token:

```bash
renku generation estimate --spec <spec-id> --json
```

7. Run generation only after the user has approved the model, cost, and any project-derived prompt/context transfer to the external provider. Because provider-backed generation needs network access, request sandbox/network permission before the first real `renku generation run` attempt instead of waiting for a network failure. Use `--simulate` when validating shape without paid provider calls.

```bash
renku generation run --spec <spec-id> --approval-token <approval-token> --json
```

8. Inspect generated images before import. For Lookbook images, decide which Lookbook sections the image actually demonstrates. For Lookbook sheets, verify that the sheet is informative, legible, and summarizes the visual language rather than merely collaging existing Lookbook images. For cast images, choose the strongest take for the cast asset role. For location environment sheets, inspect the composite, use vision to identify the four scenic view blocks, crop only those four blocks, and inspect the four slices before import. For scene storyboard sheets, inspect each composite, use vision to identify the actual storyboard panel image blocks, crop only those selected shot panels, and inspect every slice before import.
9. Import the finished file for the purpose:

```bash
renku media import --purpose <purpose-key> --target <target> --source <project-relative-path> --sections <agent-reviewed-sections> --json
```

Use `--sections` only for `lookbook.image`. Lookbook sheet, cast image, and shot input imports do not use section tags.

## Shot Video Take Purposes

For shot video take work, use the detailed operational reference:

- `references/shot-video-take.md`

Load the more specific shot references when needed:

- Multi-shot storyboard sheets: `references/shot-multi-shot-storyboard-sheet.md`
- First/last frame dependencies: `references/shot-first-last-frame.md`
- Ad hoc reference images: `references/shot-reference-images.md`

Supported purpose keys:

- `shot.first-frame`
- `shot.last-frame`
- `shot.reference-image`
- `shot.multi-shot-storyboard-sheet`
- `shot.video-take`

Use these concrete purposes directly. Do not use or invent a generic shot video input purpose. Always honor user-selected shot ids, input mode, model choice, and parameters exactly.

## Target Resolution

Use the current open authoring project. Do not add `--project` to normal
generation, screenplay lookup, or import commands.

Confirm the current project when needed:

```bash
renku project current --json
```

When the user says "selected location" or "selected cast member", read Studio
focus:

```bash
renku studio current --json
```

- If `context.kind` is `location`, use `context.id` as
  `location:<location-id>`.
- If `context.kind` is `castMember`, use `context.id` as
  `cast:<cast-member-id>`.
- If `context.kind` is `scene`, use `context.id` as `scene:<scene-id>`.
- If `context.kind` is `locations`, use `context.locations` as the location
  list to resolve from.
- If `context.kind` is `cast`, use `context.cast` as the cast list to resolve
  from.

When the user names a location, get the current project's full location list:

```bash
renku screenplay location list --json
```

Match against each Location's `id`, `handle`, and `name`. The match does not
need to be exact; compare normalized words and obvious partial matches from the
full list. If there is one clear match, use `location:<id>`. If there are
multiple plausible matches, ask the user to choose. If there is no match, say
the Location must be added to the screenplay before generating location media.

When the user names a cast member, use the same pattern:

```bash
renku screenplay cast list --json
```

Match against each Cast member's `id`, `handle`, and `name`. If there is one
clear match, use `cast:<id>`. If there are multiple plausible matches, ask the
user to choose. If there is no match, say the Cast member must be added to the
screenplay before generating cast media.

When the user names a scene, use the screenplay hierarchy to resolve the scene
id. Storyboard sheet generation requires a Scene Shot List. If the user says
"the storyboard for this scene", use the active shot list for that scene. If a
specific `shotListId` is already known, honor it exactly. If no active shot list
exists, hand back to shot-list design first.

## Binding Rules

- The persisted spec is binding.
- Do not change user-selected model, take count, seed, frame, detail, output format, shot ids, input mode, route settings, or reference choices unless the user explicitly asks.
- Do not synthesize fallback prompts for paid generation. If the context, dependency draft, final prompt draft, title, source file, or selected input is missing, stop and report the missing authored requirement.
- Do not run paid generation until the user has approved the exact spec, estimate, and provider context transfer.
- Import is a separate explicit step after inspecting the generated media.
