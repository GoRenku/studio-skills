# Context-First Generation Workflow

Use this sequence for every Renku-managed generation purpose:

```bash
renku generation context --purpose <purpose> --target <target> --json
renku generation model list --purpose <purpose> --json
renku generation validate --file <spec.json> --json
renku generation preview show --file <spec.json> --json
renku generation spec create --file <spec.json> --json
renku generation preview show --spec <spec-id> --json
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
renku generation run show --run <run-id> --json
```

Use `generation spec update --spec <spec-id> --file <spec.json>` for revisions and `generation run --spec <spec-id> --approval-token <approval-token> --simulate --json` for a non-paid execution check.

Context is the source of truth for fixed and recommended product settings, selectable models, stable guide placements, exact candidates, initialized selections, and non-blocking notices. Do not duplicate those rules in the skill.

- Fixed settings are Core-owned. Do not turn them into agent choices.
- Recommendations are editable guidance. Author them only when explicitly chosen.
- Provider defaults stay absent unless the user or agent deliberately authors them.
- One spec, estimate, and run cover one current provider request only.
- `facts.contextText`, when present, is opaque authored source context. Read it; do not parse it into a parallel domain model or treat it as a runtime validation contract.

## Exact references

Copy exact selections from context rather than rebuilding placement ids. Preserve section, slot, optional Shot scope, and subject ids. Additional references use `{ "kind": "additional" }`.

Every included reference must also name an actual media `providerField` from the selected model descriptor. Placement expresses the reference's product role; `providerField` expresses where that exact file enters the provider request. These are separate decisions.

Inspect every selected reference before generation. A candidate is not a selected relationship, and filesystem presence is not selection. If a continuity-critical exact selection is missing, stop and ask for explicit user direction rather than substituting the first candidate.

Use:

- `{ "kind": "asset-file", "assetId": "...", "assetFileId": "..." }` for an exact registered asset file;
- `{ "kind": "project-file", "projectRelativePath": "tmp/media/reference.png" }` for a normalized safe project file that is not registered as an asset.

Use `renku generation reference list --media-kind <image|audio|video> --json` to search registered reusable files. It does not invent registrations for project files.

Do not infer creative dependencies, manufacture missing media, walk provenance, or estimate future work.

## Preview and price approval

Use `preview show --file` for an unsaved draft and `preview show --spec` for the saved request. Showing Preview does not execute generation.

Use repeated flags to review several complete, independent requests together while preserving order:

```bash
renku generation preview show --file tmp/request-1.json --file tmp/request-2.json --json
renku generation preview show --spec media_generation_spec_1 --spec media_generation_spec_2 --json
```

Do not mix input kinds. The combined display does not combine estimates, approvals, runs, outputs, or attachments.

If prompt, endpoint, authored values, reference order, inclusion, provider-field assignment, or referenced file contents change:

1. update and validate the spec;
2. show Preview again;
3. estimate again;
4. obtain a fresh explicit live-run confirmation.

The returned token approves provider/model pricing facts, not the creative payload. A pricing-input change can produce a different token; a prompt or reference change can leave the token unchanged. Always pass the token returned by the latest estimate review, and never treat token equality as proof that execution inputs are unchanged or ready.

## Outputs and focused attachment

A successful run creates output files and provenance. It does not automatically attach them to the target domain relationship.

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
shot.video-take
```

Scene Storyboard images use the dedicated grouped or single-shot import form. Cast Voice samples use the Cast Voice attachment workflow.

Pass `--receipt` only for an exact output from a matching Renku purpose and target. Omit it for Codex-generated, uploaded, manually produced, or other external media. Never fabricate provenance.

When the requested durable destination has no current focused command, report the gap. Do not invent a generic attachment command, use ignored flags, write the database directly, or manually copy files into canonical media folders.
