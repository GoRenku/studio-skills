# Context-First Generation Workflow

Use this sequence for every Renku-managed generation purpose:

```bash
renku generation context --purpose <purpose> --target <target> --json
renku generation model list --purpose <purpose> --json
renku generation validate --file <spec.json> --json
renku generation spec create --file <spec.json> --json
renku generation preview show --spec <spec-id> --json
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
renku generation run show --run <run-id> --json
```

Use `generation spec update --spec <spec-id> --file <spec.json>` for revisions and `generation run --spec <spec-id> --approval-token <approval-token> --simulate --json` for a non-paid execution check.

## Current GenerationSpec envelope

Start from the relevant checked-in sample and keep this exact top-level shape:

```json
{
  "executionKind": "renku-managed",
  "purpose": "cast.character-sheet",
  "target": { "kind": "castMember", "id": "cast_..." },
  "model": { "provider": "fal-ai", "model": "openai/gpt-image-2" },
  "values": {
    "prompt": "Provider-facing prompt text.",
    "image_size": "landscape_16_9",
    "quality": "high"
  },
  "references": [],
  "title": "Character sheet"
}
```

Read the selected model descriptor before naming fields under `values`. Validate
the first draft immediately. Never infer a different spec envelope from old
project files, prior task memory, UI labels, or model marketing names.

Context is the source of truth for fixed product settings, selectable models, stable guide placements, exact current selections, and eligible UI candidates. Candidates are never initialized selections, and Core emits no creative readiness notices. Do not duplicate provider readiness rules in the skill.

- Fixed settings are Core-owned. Do not turn them into agent choices.
- Recommendations are editable guidance. Author them only when explicitly chosen.
- Provider defaults stay absent unless the user or agent deliberately authors them.
- One spec, estimate, and run cover one current provider request only.
- `facts.contextText`, when present, is opaque authored source context. Read it; do not parse it into a parallel domain model or treat it as a runtime validation contract.

## Exact references

Copy exact selections from context rather than rebuilding placement ids. Preserve section, slot, and subject ids. Additional references use `{ "kind": "additional" }`.

Presence means inclusion; omit an unselected reference instead of persisting an `included` flag. `providerField` is optional authored intent. When present, it must name an actual media field from the selected model descriptor. Placement expresses product role while `providerField` expresses provider routing; neither implies the other.

Inspect every selected reference before generation. A candidate is not a selected relationship, and filesystem presence is not selection. If a continuity-critical exact selection is missing, stop and ask for explicit user direction rather than substituting the first candidate.

Use:

- `{ "kind": "asset-file", "assetId": "...", "assetFileId": "..." }` for an exact registered asset file;
- `{ "kind": "project-file", "projectRelativePath": "tmp/media/reference.png" }` for a normalized safe project file that is not registered as an asset.

Use `renku generation reference list --media-kind <image|audio|video> --json` to search registered reusable files. It does not invent registrations for project files.

Do not infer creative dependencies, manufacture missing media, walk provenance, or estimate future work.

## Explicit Codex image generation

Use this path only when the user explicitly asks for Codex built-in image
generation. Do not select it merely because the requested output is an image.
Before invoking Codex image generation, save the exact request as a normal
GenerationSpec. Use `"executionKind": "agent-external"`, record the provider and
model actually used by the current Codex image tool, and put the exact prompt and
every concrete chosen or executed property under `values`. For image generation,
that includes aspect ratio, resolution or size, quality, output format, and image
count when those values are known. Keep them as separate values even when the
Codex tool also receives the same direction in prompt prose. Do not invent an
unknown value or hardcode a model name in the workflow.

If the user switches an already-saved request from Renku execution to Codex,
start from that saved request. Preserve `values.prompt` exactly, preserve the
title and selected references, and carry every model-independent chosen value.
Change only `executionKind`, the actual provider/model, and provider-only routing
fields. Never synthesize a replacement prompt or add request-description labels
such as `Use case`, `Asset type`, `Input image`, or `Primary request`.

```json
{
  "executionKind": "agent-external",
  "purpose": "cast.profile",
  "target": { "kind": "castMember", "id": "cast_..." },
  "model": { "provider": "codex", "model": "<actual-model>" },
  "values": {
    "prompt": "Exact prompt sent to Codex.",
    "aspect_ratio": "<actual-value>",
    "resolution": { "width": 1536, "height": 864 },
    "quality": "<actual-value>",
    "output_format": "png",
    "image_count": 1
  },
  "references": [],
  "title": "Profile image"
}
```

Save first, then generate:

```bash
renku generation spec create --file <external-spec.json> --json
renku generation preview show --spec <returned-spec-id> --json
```

Stop after Preview and wait for explicit user approval. The Preview opening is
not approval. After approval, read the saved spec again so any prompt or
reference changes made with the Update button are used by Codex:

```bash
renku generation spec show --spec <returned-spec-id> --json
```

After inspecting and accepting the generated file, attach it through the normal
focused import and link the saved request:

```bash
renku media import --purpose <purpose> --target <target> --source <project-relative-path> --title <title> --source-spec <returned-spec-id> --json
```

Do not create a GenerationRun or receipt for Codex execution. Do not call Renku
estimate or run for an `agent-external` spec.

## Preview and price approval

Open Studio Preview only for the saved request with `preview show --spec`. This
keeps the prompt, reference cards, model settings, and Update action connected
to the same saved request. Showing Preview does not execute generation and does
not authorize it.

Use repeated flags to review several complete, independent requests together while preserving order:

```bash
renku generation preview show --spec media_generation_spec_1 --spec media_generation_spec_2 --json
```

Do not mix input kinds. The combined display does not combine estimates, approvals, runs, outputs, or attachments.

If prompt, endpoint, authored values, reference order or presence, provider-field assignment, or referenced file contents change:

1. update and validate the spec;
2. show Preview again;
3. estimate again;
4. obtain a fresh explicit live-run confirmation.

The returned token approves provider/model pricing facts, not the creative payload. A pricing-input change can produce a different token; a prompt or reference change can leave the token unchanged. Always pass the token returned by the latest estimate review, and never treat token equality as proof that execution inputs are unchanged or ready.

## Outputs and focused attachment

A successful run creates output files and provenance. Generation does not automatically attach outputs to a target relationship.

Use the exact output path directly as a `project-file` reference when it only needs to guide a later request. Import it only when a current focused destination exists.

Supported single-file focused imports are:

```text
lookbook.image
lookbook.video-sheet
lookbook.storyboard-sheet
cast.character-sheet
cast.profile
location.sheet
location.hero
```

Scene Storyboard images use the dedicated grouped or single-Beat import form. Cast Voice samples use the Cast Voice attachment workflow.

Pass `--receipt` only for an exact output from a matching Renku purpose and target. For a Codex-generated image, pass the saved request with `--source-spec`. Omit both flags for uploaded, manually produced, or other external media with no saved generation request. Never fabricate provenance.

When the requested durable destination has no current focused command, report the gap. Do not invent a generic attachment command, use ignored flags, write the database directly, or manually copy files into canonical media folders.
