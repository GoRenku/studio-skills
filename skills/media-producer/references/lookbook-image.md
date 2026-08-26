# Lookbook Image

Use `lookbook.image` with target `lookbook:<lookbook-id>`. Begin with the typed
generation context. It returns the exact Lookbook definition, inspirations,
current images/sheets, Project-ratio and quality guidance, workflow policy, and
same-Lookbook reference suggestions. It does not choose a model or reference.

Read the target Lookbook and its existing images before deciding to generate.
If an accepted image already demonstrates the requested section property, reuse
it with `renku lookbook image set-placement` instead of creating a filler image,
but do not make multi-section placement the default. For Storyboard Lookbooks,
keep the canonical overall-style image in `styleBrief` only unless the user asks
to repeat it. Prefer one clearest section per example; if a dedicated example
already covers a section, remove any broader image placement there. Leaving a
section without an image is better than repeating a generic image as filler.

For the first example, generate from the user's direction and visible source
references. For every later example that the user expects to match the accepted
set:

1. Inspect the relevant candidates in `suggestedReferences` plus any other
   user-supplied or creatively useful source.
2. Choose an accepted image from that target Lookbook as the visual style
   anchor; never choose by list order.
3. Route that exact file to a real provider image field and allocate its
   provider-documented token. For Codex ImageGen, pass the same accepted file through
   `referenced_image_paths`.
4. State what remains locked and what may change. For example: `Use @Reference1
   as the locked visual style anchor. Preserve its medium, contour treatment,
   finish, facial simplification, background treatment, and tonal restraint.
   Change only the subject and the requested section property.`
5. Inspect the result beside the anchor before import. Reject a technically
   relevant image when its medium or rendering style drifts.

Do not claim that a request will match an approved image unless that image is
visible to the provider. Descriptive modifiers are not a substitute for the
reference. Treat Storyboard Lookbook sections as properties of one drawing
system: a `valueAndAccent` request may alter value allocation, but must not add
wash, hatching, roughness, modeled lighting, or a new finish unless those
properties already belong to the accepted style.

Select Codex or Fal.ai through explicit current user direction, then the
Project's Image provider setting. For Fal.ai, author one provider-native review
document through its Skill, validate it, show Preview when required, reread and
rebuild after prompt edits, then execute after conversational confirmation. For
Codex, use the same temporary Preview envelope and invoke the built-in capability
directly. Import either accepted output with exact safe generation provenance.
Manual or other external images omit generation provenance.

After visual review, import the image first:

```bash
renku media import --purpose lookbook.image --target lookbook:<lookbook-id> --source <project-relative-path> --title <title> --provenance <provenance-json> --select --json
```

Use the returned `ownerRecord.id` with
`renku lookbook image set-placement --image <lookbook-image-id> --sections ...`
when section or point placement is intended. Import and placement are separate
commands. Section placement is agent/user judgment; do not infer it during
runtime generation validation. Use the same `--provenance` contract for
Codex-generated files. Omit it for external files with no generation provenance.

Keep `--select` when the image should become the Lookbook's canonical card
image. Omit it for an unselected example. To choose an existing Lookbook Image,
use `renku asset select --project <project> --target lookbook:<lookbook-id>
--asset <asset-id> --json`; use the separate `ownerRecord.id` only for
placement.
