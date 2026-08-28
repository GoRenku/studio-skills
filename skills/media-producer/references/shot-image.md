# Shot Image

Use `shot.image` only for one candidate image owned by the exact Shot. Begin
with `renku generation context --purpose shot.image --target shot:<shot-id>
--json`. It supplies the exact Shot/Plan/covered Beats/Scene, related Cast,
Locations and Props with designs/assets, Production Lookbook, selected sibling
Shot images, Beat Storyboards, policy, and advisory Project-ratio guidance.
Consider those suggestions without treating them as required or exhaustive.

Use the Production Lookbook Sheet as the default appearance authority whenever
it is available. Treat exact Cast, Location, and Prop references as separate
identity, geography, and construction authorities; do not let them override the
Lookbook's palette, lighting, texture, composition, or finish. Choose a route
that can carry the deliberately selected references. If the selected model
cannot carry the Lookbook Sheet, stop and ask before a text-only downgrade or
model change. The user may explicitly request a deliberate visual departure.

Choose the path through explicit current user direction, then the Project's
Image provider setting. Do not add a Shot Image-specific setting. If Codex is
selected but the harness lacks `codex.gpt-image-2`, ask rather than falling back
to a paid provider.

Use the standard temporary review-document workflow. Display Preview when its
Project setting is on or the user explicitly asks. Honor the Image confirmation
setting with one ordinary conversational pause.
After execution, inspect the exact output and wait for output acceptance. Then
import:

```bash
renku media import \
  --purpose shot.image \
  --target shot:<shot-id> \
  --source <project-relative-output> \
  --provenance <provenance-json> \
  --select \
  --json
```

Use the same provenance contract for every generated output. Keep
`--select` when the accepted output should become the Shot's current image.
Omit it only when the user wants another unselected candidate. To choose a
previously imported candidate, use `renku asset select --project <project>
--target shot:<shot-id> --asset <asset-id> --json`.
