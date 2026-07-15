# Shot Video Take

Use `shot.video-take` with target `take:<take-id>`.

```bash
renku generation context --purpose shot.video-take --target take:<take-id> --json
```

Read `facts` for the Take's exact Shot membership, structure, Cast Members,
Locations, and Scene Dialogue. Use the returned reference guide as guidance for
selecting exact files. Its stable placements are:

| Section id | Slot id | Required placement details |
| --- | --- | --- |
| `take-media` | `first-frame` | exact Take-owned image |
| `take-media` | `last-frame` | exact Take-owned image |
| `take-media` | `video-prompt` | exact Take-owned image |
| `visual-language` | `production-lookbook-sheet` | Production Lookbook sheet |
| `cast` | `character-sheet` | preserve Cast Member subject |
| `location` | `location-sheet` | preserve Location subject |
| `dialogue` | `dialogue-audio` | preserve Scene Dialogue subject |

Additional References use `{ "kind": "additional" }`. Never reconstruct section, slot, scope, or subject
ids from labels.

Guide placement and provider assignment are separate. For every included exact
file, copy its placement from context and set `providerField` to a real
file-backed media field from the selected model descriptor. For example, a
Video Prompt media keeps the `take-media` / `video-prompt` placement while
using `"providerField": "image_urls"` for a selected Seedance reference-to-video
endpoint. The selected endpoint, not the guide slot, determines whether the
field is valid or required.

Select one direct provider/model endpoint from the current descriptors, author
only its explicit non-media values, validate the exact spec, and inspect the
generated provider payload with `generation preview show`. Then follow
`../workflow.md`.

For a new Video Prompt image, use a separate `shot.video-prompt` spec for the
same Take. For a genuinely ad hoc extra reference, use `image.create` and later
reuse its exact output as a `project-file` reference. Normalize an external/Codex file into the project and
use its exact `project-file` path without inventing an asset id, generation
spec, or receipt.

Read `prompt-quality-checklist.md` for agent-owned creative review. Read a
provider reference only after choosing that provider; provider guidance may
shape prompts but must not redefine Core reference slots or validation.
