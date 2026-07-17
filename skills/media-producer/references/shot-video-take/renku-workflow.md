# Retained Renku Workflow

> **Status: retained design reference.** Do not execute this workflow while
> Shot Video authoring is unavailable. Revalidate every command and contract
> against the current Core and CLI before reactivation.

## Last Supported CLI Sequence

The Shot Video workflow used the same context-first request sequence as other
Renku-managed generation:

```bash
renku generation context --purpose shot.video-take --target take:<take-id> --json
renku generation model list --purpose shot.video-take --json
renku generation validate --file <spec.json> --json
renku generation preview show --file <spec.json> --json
renku generation spec create --file <spec.json> --json
renku generation preview show --spec <spec-id> --json
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
renku generation run show --run <run-id> --json
```

Use `generation spec update --spec <spec-id> --file <spec.json>` for revisions.
Use `generation run --spec <spec-id> --approval-token <approval-token>
--simulate --json` for a non-paid execution check.

Read current context and model descriptors before authoring. Preserve exact
reference placements from context, assign media only to fields exposed by the
selected endpoint, validate the spec, and inspect the generated provider
payload before relying on provider tokens or field order.

If the prompt, endpoint, authored values, reference order or presence,
provider-field assignment, or referenced file contents change, validate and
show Preview again, estimate again, and obtain fresh live-run confirmation.

## Supporting Images And Project Files

The retained workflow created Take-owned First Frame, Last Frame, and Video
Prompt images through their focused purposes. A genuinely ad hoc image used
`image.create` and could be reused by exact project-relative path without
inventing an asset id, receipt, or provenance record.

Use a generated or external project file as a `project-file` reference only
after verifying and normalizing its project-relative path. Import a supporting
image only through its focused purpose when the current workflow exposes that
destination.

## Final Output And Take Freezing

A successful run created output files and provenance but did not attach them
automatically. The final focused `shot.video-take` attachment atomically
materialized the Take and froze its authoring state. Failed attempts left the
Draft editable. The next revision used **New Take**, copying reusable
selections and Take-owned supporting images without copying the final video,
runs, receipts, provider payloads, or provenance.

Pass `--receipt` only for the exact output of a matching Renku purpose and
target. Omit it for external, uploaded, Codex-generated, or manually produced
media. Never copy files manually into a canonical Take folder or write durable
Take relationships outside Core-owned commands.
