# Cast Authoring
## Efficient Command Use

Cast facts and Cast Design commands require the current authoring project; their --project flag does not retarget these operations. Establish that selection once when needed. Cast Voice commands support explicit --project. Use one castOperations document for related edits and retain a meaningful dry run when reviewing changes. Apply and design write validate before persistence; a separate validate is for validation-only intent or a review pause. Use returned changes and identities for confirmation, reading again only for missing detail. Keep the immediate pre-enrichment source/fact reads and post-enrichment verification.

Consult the relevant CLI reference/help once if syntax is unknown, then reuse verified syntax for this task. Do not discover syntax by attempting mutations. Do not invent `project list`. If a known permission denial blocks cache/output/config or local-network access, explain the requirement and use the authorized host permission flow; do not repeat the denied attempt, read secrets, disable cache persistence, or change permissions. `CLI026` means the mutation succeeded: report the notification warning without replaying the mutation.


Use `renku cast` for Cast Member facts.

```bash
renku cast list --json
renku cast show <cast-member-id> --json
renku cast context --cast <cast-member-id> --json
# Optional validation-only or review step:
renku cast validate --file tmp/operations/cast-operations.json --json
renku cast apply --file tmp/operations/cast-operations.json --dry-run --json
renku cast apply --file tmp/operations/cast-operations.json --json
```

Operation document:

```json
{
  "kind": "castOperations",
  "operations": [
    {
      "operation": "castMember.add",
      "castMember": {
        "key": "ada",
        "handle": "ada",
        "name": "Ada",
        "role": "Protagonist; night operator who keeps the old grid running",
        "age": 34,
        "want": "To keep the grid alive through the winter.",
        "need": "To admit she cannot hold the system together alone.",
        "arc": "A self-reliant operator learns to ask for help before the system breaks her.",
        "voiceNotes": "Low and clipped; dry humor under pressure.",
        "description": {
          "overview": "The last night operator of a failing municipal grid.",
          "appearance": "Wiry, tired eyes, practical work clothes. Exact height and hair colour are unspecified.",
          "behavior": "Methodical and private. She trusts machines more than colleagues.\n\nShe softens only around the new apprentice.",
          "wardrobe": "Grey work jacket in every scene; a burn on the left sleeve appears after the fire in Scene 12.",
          "performance": "Contained frustration that cracks once, at the blackout.",
          "sourceNotes": "Scenes 1–20. Appearance and wardrobe come from the screenplay; want, need and arc are interpretation."
        }
      }
    }
  ]
}
```

Cast Member fields:

| Field | What to write |
|---|---|
| `role` | One plain line: story role plus a short identity (not a pill-sized tag) |
| `age` | Integer, only when the screenplay states it |
| `want` | The outer goal, one or two sentences |
| `need` | The inner change the story asks of them, one or two sentences |
| `arc` | How they change from start to end, in three to five sentences |
| `voiceNotes` | How they sound and speak |
| `description` | The sectioned object below |

`description` sections (all optional; include at least one, or omit `description`):

| Key | Studio heading | What belongs here |
|---|---|---|
| `overview` | (none; shown first) | Who they are, in one or two short paragraphs |
| `appearance` | Identity and appearance | Age, build, face and what the screenplay says they look like; what is unspecified |
| `behavior` | Behavior and relationships | How they act, and who they are close to or opposed to |
| `wardrobe` | Clothing and physical continuity | What they wear and how it changes; injuries, ageing, props they carry |
| `performance` | Performance and story continuity | Emotional range and key moments that must carry through scenes |
| `sourceNotes` | Source (footnote) | Which Scenes the facts come from, and which statements are interpretation |

Section text is plain prose. Separate paragraphs with a blank line. Never put
headings, capital-letter section titles or Markdown inside section text:
Studio shows its own headings. Unknown keys fail with `PROJECT_DATA214`.

Rules:

- New Cast Members use `key`, not `id`.
- Existing Cast Members use durable `id`.
- `castMember.update` replaces the whole record: include every field you want to keep, including the full `description` object.
- Handles are lower-case, stable, and unique across Cast Members and Locations.
- Delete operations fail when the Cast Member is still referenced by screenplay scenes.
- Screenplay scenes reference Cast Members by durable id; do not create Cast Members through screenplay JSON.
