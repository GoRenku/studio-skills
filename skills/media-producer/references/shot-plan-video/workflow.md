# Shot Plan Video Renku Workflow

1. Resolve the current project and exact Shot Plan id.
2. Read the plan and Core-owned generation context.
3. Inspect every relevant candidate file and deliberately select or omit it.
4. Read current active routes:

```bash
renku generation model list \
  --purpose shot-plan.video-generation \
  --json
```

5. Start from a current file under `../../samples/shot-plan-video/`. Preserve
   the exact envelope: `executionKind`, purpose, Project target,
   `authoredFrom`, `shotPlanVideoInputMode`, model, values, references, and
   title.
6. Put only provider-declared configurable values under `values`. The product
   starts resolution at `480p`; this is an editable initial choice, not a Core
   fixed setting.
7. Validate, save, and show the saved Preview. Review Prompt, References, and
   the video Config surface. Update the same mutable spec when requested.
8. Estimate the exact saved request and stop for explicit approval.
9. Run only with the returned approval token. Inspect the output before
   attachment.
10. Attach with exact managed receipt provenance or a frozen external source
    spec. The accepted result is a Project-owned `shot_plan_video` Asset whose
    file Core places in the exact Scene/Shot Plan folder derived from frozen
    provenance.

Never manually copy media into the durable Shot Plan folder. Never create a
reverse video pointer or completion state on the Shot Plan.
