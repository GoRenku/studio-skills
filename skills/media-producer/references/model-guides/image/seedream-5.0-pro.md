# Seedream 5.0 Pro Image Prompt Guide

Use Seedream 5.0 Pro for image creation, editing, multi-image composition, and
reference-guided work when the selected provider route exposes the required
inputs. The provider route and live schema decide which images and controls are
available; this guide owns only the model-facing prompt.

ByteDance's July 2026 Seedream 5.0 Pro overview showcases dense information
layouts, text-heavy posters, local edits, and multi-image composition. These
are maker-published examples of intended strengths, not a guarantee of factual
accuracy or successful rendering on every provider route. Do not infer that
point/lasso selection, layer separation, or other product controls are
available through a selected API route.

## Generation

- Describe the intended subject and hierarchy first. Then add the setting,
  composition, architecture or geography, light, palette, materials, and
  camera language that meaningfully affect the picture.
- For a dense graphic, specify the title, information groups, their relative
  positions, and the visual relationship between groups. Keep the number of
  requested details reviewable; an image is not a source of verified facts.
- State required readable wording exactly, with placement and hierarchy. Check
  spelling, numbers, and relationships in the rendered result.
- Keep a simple image request direct. Use brief labels only when they separate
  multiple subjects, panels, or reference roles.

Illustrative prompts, not generated or tested:

- Simple: `A weathered green rowboat tied to a stone quay in a quiet northern
  harbor, seen at eye level just after sunrise. Pale mist, wet rope, muted
  slate water, restrained documentary photography.`
- Information layout: `Create a vertical field guide card about three
  imaginary alpine flowers. Put the title “HIGH MEADOWS” at the top, then
  arrange three clearly separated flower illustrations in a single column.
  Under each flower leave one short caption line. Use cream paper, dark green
  headings, and botanical ink-and-watercolor illustrations.`

## Editing and references

- For a source-preserving edit, distinguish the image being changed from any
  supporting references. Name the exact change and the source traits that must
  survive.
- For a composite, state what each image contributes and the desired spatial
  relationship. The official showcase demonstrates requests that assign
  different images to material, color, and object roles; use exact mentions
  only when the selected provider adapter supplies them. This role assignment
  is Renku advice, not a guaranteed model convention.
- Preserve identity, geography, construction, materials, typography, or layout
  explicitly when they are continuity constraints.
- Do not imply that an image is a reference unless the provider adapter
  actually includes it in the request.

Illustrative edit prompt, not generated or tested: `In the supplied dining-room
photo, change the chair upholstery to the woven rust fabric in the supplied
swatch. Keep the chair shape, room layout, table setting, and window light.`
Use the adapter's exact reference markers if the selected route requires them.

If a dense layout is cluttered, make the hierarchy simpler and state where the
largest elements belong. If an edit changes unrelated content, restate the
source details to preserve and narrow the requested change. These are Renku
recovery recommendations drawn from ByteDance's demonstrated layout and
regional-editing workflows, not claims that Seedream always follows them.

## Codex panel

Seedream 5.0 Pro Edit is a region-free route of the Codex
[image edit panel](../../image-edit-panels.md): the user describes the change
for the whole image and may add a style reference.

```json
{
  "purpose": "image-edit",
  "routes": [
    { "provider": "fal-ai", "model": "bytedance/seedream/v5/pro/edit", "regionModes": null, "styleReference": true, "controlPointers": [] },
    { "provider": "wavespeed-ai", "model": "bytedance/seedream-v5.0-pro/edit", "regionModes": null, "styleReference": true, "controlPointers": [] },
    { "provider": "pika", "model": "bytedance/seedream-5.0-pro/image-to-image", "regionModes": null, "styleReference": true, "controlPointers": [] }
  ]
}
```

**Controls.** None. Fal.ai's only size field, `image_size`, mixes aspect
presets with automatic sizes, and its default `auto_2K` keeps the source
aspect. WaveSpeed and Pika expose an aspect ratio without an automatic option
(checked 2026-10-11), so the panel shows no setting there either.

**Mapping the consumed draft.** Write the prompt from the draft's
`wholeImageInstruction` following "Editing and references" above: name the
exact change and the source traits that must survive, and give the style
reference a style-only role by its image number. Put the edit base first, then
the style reference, then any resolved references, as `$file` markers in the
route's ordered image field: `image_urls` on Fal.ai and Pika, `images` on
WaveSpeed. Leave the size and aspect fields at their defaults (omit them where
the schema has no default) so the output keeps the source composition, and
confirm the fields in the live schema.

Reviewed 2026-09-30 against ByteDance Seed's [Seedream 5.0 Pro launch article]
and [model page]. The launch article is primary, maker-published guidance; its
capability descriptions are not independent evaluations. Current provider
fields and limits remain owned by each live route schema.

[Seedream 5.0 Pro launch article]: https://seed.bytedance.com/en/blog/beyond-generation-it-understands-design-introducing-seedream-5-0-pro
[model page]: https://seed.bytedance.com/en/seedream5_0_pro
