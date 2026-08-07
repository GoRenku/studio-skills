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

For a project video authored from a Shot Plan, start from
`samples/shot-plan-video/first-last-frame-video-spec.json` or the other
current Shot Plan video sample for the chosen method. Keep the target as
Project and carry the required exact `authoredFrom` value only as
information-only origin context.
Never resolve it into a Shot Plan snapshot, Asset owner, execution requirement,
or attachment destination.

Read the selected model descriptor before naming fields under `values`. Validate
the first draft immediately. Never infer a different spec envelope from old
project files, prior task memory, UI labels, or model marketing names.

Context is the source of truth for fixed product settings, selectable models, stable guide placements, exact current selections, and eligible UI candidates. Candidates are never initialized selections, and Core emits no creative readiness notices. Do not duplicate provider readiness rules in the skill.

- Fixed settings are Core-owned. Do not turn them into agent choices.
- Recommendations are editable guidance. Author them only when explicitly chosen.
- Provider defaults stay absent unless the user or agent deliberately authors them.
- One spec, estimate, and run cover one current provider request only.
- `facts.contextText`, when present, is opaque authored source context. Read it; do not parse it into a parallel domain model or treat it as a runtime validation contract.
- For Shot Plan video authoring, carry the exact weak `authoredFrom` id and an
  explicit input mode. The Shot Plan does not own request or completion state.
  Retry a supplied frozen Spec unchanged; create a new mutable Spec before
  changing the request.
- Read `workflowPolicy` for path preference, automatic Preview, per-lane
  conversational confirmation, and effective concurrency. Explicit current
  user direction wins, followed by an already-authored saved-spec path, then
  Project policy. If no usable path remains, ask.

## Exact references

Copy exact selections from context rather than rebuilding placement ids. Preserve section, slot, and subject ids. Additional references use `{ "kind": "additional" }`.

Presence means inclusion; omit an unselected reference instead of persisting an `included` flag. `providerField` is optional authored intent. When present, it must name an actual media field from the selected model descriptor. Placement expresses product role while `providerField` expresses provider routing; neither implies the other.

For selected references used by the prompt, author the exact provider-visible
`promptMention`, such as `@Reference1`, `@Image1`, `@Video1`, or `@Audio1`.
Never scan prompt text to recover allocation state. A prompt mention is
independent from `providerField`. Replacing the exact
reference in the same placement preserves the mention. Clearing it does not
rewrite the prompt.

Inspect every selected reference before generation. A candidate is not a selected relationship, and filesystem presence is not selection. If a continuity-critical exact selection is missing, stop and ask for explicit user direction rather than substituting the first candidate.

Use:

- `{ "kind": "asset-file", "assetId": "...", "assetFileId": "..." }` for an exact registered asset file;
- `{ "kind": "project-file", "projectRelativePath": "tmp/media/reference.png" }` for a normalized safe project file that is not registered as an asset.

Use `renku generation reference list --media-kind <image|audio|video> --json` to search registered reusable files. It does not invent registrations for project files.

Do not infer creative dependencies, manufacture missing media, walk provenance, or estimate future work.

## Codex image generation path

Use this path when explicit current user direction, the saved spec, or
Generation Context `workflowPolicy.preferredExecutionPath` selects Codex. The
policy applies only when `codexBuiltIn.applicable` is true and the current
harness exposes `codex.gpt-image-2`. If the capability is absent, ask for a
path; never silently switch to a paid Renku route.
Before invoking Codex image generation, save the exact request as a normal
GenerationSpec. Use `"executionKind": "agent-external"`, record the provider and
model actually used by the current Codex image tool, and use exactly
`values: { "prompt": "..." }`. The prompt is the complete, exact instruction
sent to Codex. Preserve every reviewed requirement there, including `16:9`,
composition, visual quality, format direction, and creative constraints. Store
selected image inputs only as logical `references`.

If the user switches an already-saved request from Renku execution to Codex,
start from that saved request. Preserve `values.prompt` exactly, preserve the
title and selected references, and remove provider-specific structured values
so the current Codex request has exactly `values: { prompt }`. Change only
`executionKind` and the actual provider/model. Never synthesize a replacement
prompt or add request-description labels such as `Use case`, `Asset type`,
`Input image`, or `Primary request`.

```json
{
  "executionKind": "agent-external",
  "purpose": "cast.profile",
  "target": { "kind": "castMember", "id": "cast_..." },
  "model": { "provider": "codex", "model": "<actual-model>" },
  "values": {
    "prompt": "Create one polished 16:9 profile image with the reviewed composition, visual quality, format direction, and creative constraints."
  },
  "references": [],
  "title": "Profile image"
}
```

Save first, then generate:

```bash
renku generation spec create --file <external-spec.json> --json
renku generation preview show --spec <returned-spec-id> --json # when policy enables it or the user requests it
```

Do not treat Preview as a Codex generation-approval gate. Pause before the tool
only when `workflowPolicy.codexBuiltIn.requirePerRunConfirmation` is true.
After the Preview decision is satisfied, read the saved spec again so any
already-applied prompt or reference changes are included, then freeze that
exact saved revision immediately before invoking Codex:

```bash
renku generation spec show --spec <returned-spec-id> --json
renku generation spec freeze --spec <returned-spec-id> --json
```

Pass the frozen record's `spec.values.prompt` to Codex unchanged and pass each
accepted logical image reference through the image-generation tool's reference
input. A failed Codex call does not unfreeze the request; retry that exact frozen
request or author and review a new spec for any change.

After inspecting and accepting the generated file, attach it through the normal
focused import and link the saved request:

```bash
renku media import --purpose <purpose> --target <target> --source <project-relative-path> --title <title> --source-spec <returned-spec-id> [--select] --json
```

Do not create a GenerationRun or receipt for Codex execution. Do not call Renku
estimate or run for an `agent-external` spec.

Pass `--select` only when the accepted output is a canonical Cast Profile,
Location Hero, Lookbook Image, Shot Image, or Scene Beat Storyboard Image and
selection is part of the current user intent. Import and selection then remain
one atomic mutation. Character Sheets, Location Sheets, Lookbook Sheets, and
Dialogue Audio Takes are request-scoped references and never use this flag.

## Preview and managed price approval

Open Studio Preview automatically only when `workflowPolicy.displayPreview` is
true, and always when the user explicitly requests it. Open only the saved
request with `preview show --spec`. This keeps the prompt, reference cards,
model settings, and Update action connected to the same saved request. Showing
Preview does not execute generation. Renku-managed execution always requires
the exact current estimate token. Conversational confirmation is separate and
follows `workflowPolicy.renkuManaged.requirePerRunConfirmation`. Codex follows
its own lane value.

Use repeated flags to review several complete, independent requests together while preserving order:

```bash
renku generation preview show --spec media_generation_spec_1 --spec media_generation_spec_2 --json
```

Do not mix input kinds. The combined display does not combine estimates, approvals, runs, outputs, or attachments.
Treat a failed combined Preview command as a failed review handoff. Report the
failure and stop; do not send separate Preview commands for individual files or
specs, because each later notification replaces the current dialog session.
Do not estimate or request managed-provider approval until the combined Preview
has succeeded. Codex external entries never receive a Renku estimate, approval
token, or GenerationRun.

For a Renku-managed request, if prompt, endpoint, authored values, reference
order or presence, provider-field assignment, or referenced file contents
change:

1. update and validate the spec;
2. show Preview again;
3. estimate again;
4. honor the Renku lane's current conversational confirmation value.

The returned token approves provider/model pricing facts, not the creative payload. A pricing-input change can produce a different token; a prompt or reference change can leave the token unchanged. Always pass the token returned by the latest estimate review, even when conversational confirmation is off, and never treat token equality as proof that execution inputs are unchanged or ready.

For batches, cap independent overlapping work at the lane's effective
`concurrencyLimit`. Preserve one spec, Preview decision, estimate/token or
external freeze, execution, inspection, and attachment per request. A batch is
not a durable queue and dependent requests remain sequential.

## Agent-owned image editing

Studio's Generation Request inspector is read-only. To edit an existing image,
the agent owns this complete workflow:

1. Resolve the exact source Asset and AssetFile from current project context.
2. Author a new `image.edit` GenerationSpec targeting that source Asset. Put
   the exact source AssetFile in the locked `source/source-image` slot, write
   the user's edit prompt, and add only deliberately selected references.
3. Select the path through user direction, saved spec, then `workflowPolicy`.
   Use the external `codex/gpt-image-2` identity only when that precedence
   selects an applicable, available Codex path.
4. Save the draft and apply the Preview policy for that saved spec. Managed requests keep
   their normal Preview editing behavior. For `agent-external`, Preview may
   update only prompt and reference slots. Change its provider, model, or any
   non-prompt saved value with `renku generation spec update --spec <id>
   --file <spec.json>`, then open Preview again.
5. For Renku-managed execution, obtain the exact current estimate token and
   honor the Renku lane confirmation value. For Codex external execution, honor
   the Codex lane confirmation value, read the saved revision, freeze it, and
   invoke the built-in image tool. Any changed request requires a new reviewed
   spec; never mutate a frozen request.
6. Execute the request through Renku or Codex as selected.
7. Display the generated image in Codex and separately ask whether the user
   accepts this output for attachment.
8. Only after output acceptance, call `renku media import` with the real
   destination purpose and target. Pass the matching managed `--receipt` or the
   frozen external `--source-spec`.
9. Report the newly attached generated Asset. The source Asset, source
   AssetFile, owner membership, and selection remain unchanged unless the
   accepted destination import explicitly used `--select`.

Closing Preview or the Generation Request inspector does not approve a
Renku-managed run or accept generated output. Codex external execution does not
use Preview as an approval gate. Rejected output remains unattached.

## Outputs and focused attachment

A successful run creates output files and provenance. Generation does not
automatically attach outputs to an Asset owner.

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

Scene Storyboard images use the dedicated grouped or single-Beat import form.
Cast Voice samples use the Cast Voice attachment workflow.

For canonical imports, `--select` combines accepted attachment and selection.
Use `renku asset select` only for an existing candidate. Never add global
selection to Character Sheets, Location Sheets, Lookbook Sheets, or Dialogue
Audio Takes; author those exact files only in a consuming GenerationSpec.

Pass `--receipt` only for an exact output from a matching Renku purpose and target. For an accepted `image.edit`, import through the source owner's real focused destination rather than through a generic edit destination; Core verifies that the request's locked source AssetFile belongs to that exact Cast Member, Location, or Lookbook. For a Codex-generated image, pass the frozen saved request with `--source-spec`. Attachment rejects a mutable source request. Omit both flags for uploaded, manually produced, or other external media with no saved generation request. Never fabricate provenance.

When the requested durable destination has no current focused command, report the gap. Do not invent a generic attachment command, use ignored flags, write the database directly, or manually copy files into canonical media folders.
