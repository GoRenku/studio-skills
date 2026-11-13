# MiniMax H3 Image Prompt Guide

Use `minimax-h3-image` for the standard model and
`minimax-h3-image-highspeed` for Fal.ai's Highspeed variant. Both are choices
in the Default Model List's image and imageEdit generation types, including casting.
The standard model is available on Fal.ai and WaveSpeed. Highspeed is verified
on Fal.ai. Select the confirmed provider and variant explicitly.

## Prompt craft

MiniMax's Design guide demonstrates detailed visual briefs, spatial relations,
multi-reference composition and matching character views. Fal.ai's Highspeed
portrait example describes anatomy, tactile skin and clothing, framing and
motivated light together. Write a coherent description of the intended image,
then state the relationships and details that matter to the brief.
For environments, specify foreground/background placement and light direction.
For props, describe material, wear, proportions and the requested view.
For text in images, keep literal copy short and specify its placement. These
practices follow the [MiniMax Design guide] and [Fal portrait example].

Fal's text-to-image routes expose `enable_prompt_expansion`, enabled by
default. The live schema says expansion rewrites the prompt into a detailed
description and disabling it uses the authored prompt verbatim. Agent
recommendation for tightly specified casting layouts is to write the complete
brief. Keep expansion at its schema default unless the director explicitly
chooses verbatim prompting, in which case disable it. Editing has
no corresponding switch in the inspected Fal schemas. Check generated results
against the brief even when expansion is enabled. The provider's expanded
prompt remains opaque runtime content.

## Casting and continuity

Follow [casting candidate guidance](../../cast-casting-candidate.md) for the
fixed 4:3 face-and-full-figure layout, neutral backdrop and plain clothes.
For a realistic project, describe age, facial structure, skin texture, hair,
build and stance concretely. Agent recommendation is to ask for natural skin
variation and unretouched photographic detail while retaining the workflow's
even lighting. Let the Project Lookbook determine the medium.

When the round has identity references, use the edit route. Name the identity
authority and the role of every additional reference, then state the changes
and preserved features separately. The approved candidate supplies identity
for later Looks and character sheets. For character sheets, read
[the sheet guide](../../cast-character-sheets.md) and preserve its layout and
costume requirements.

Original, untested casting brief, with fictional facts for illustration only

> One 4:3 photographic casting image of a fictional woman aged 48, with a
> broad jaw, deep-set brown eyes, short wavy dark hair streaked with gray,
> sun-weathered skin and a sturdy build. The same person appears in a face
> close-up on the left and standing full-length, head to feet, on the right.
> Relaxed neutral stance, plain fitted gray shirt and dark trousers, seamless
> mid-gray backdrop, even shadowless light, natural pores and fine facial
> lines, unretouched photographic detail. No props, scenery or captions.

Append the workflow's height scale when height is known. Use actual Cast and
Look facts in a real request.

Original, untested continuity edit

> Image 1 supplies the person's identity. Image 2 supplies only the coat's
> cut, fabric and color. Dress the person from Image 1 in that coat. Preserve
> facial proportions, hairline, age, build, pose, camera position and background
> from Image 1. Render the coat as worn wool with natural folds.

Agent recommendations for revision are to return to the approved identity
reference if likeness drifts, narrow an edit if unrelated details change,
and simplify competing material or beauty directions if skin becomes waxy.
These are review strategies, not measured H3 Image failure claims.

## Routes, references and sizing

- Fal standard uses `minimax/h3-image/text-to-image` or
  `minimax/h3-image/edit`. Highspeed uses
  `minimax/h3-image/highspeed/text-to-image` or
  `minimax/h3-image/highspeed/edit`.
- WaveSpeed standard uses `minimax/h3-image/text-to-image` or
  `minimax/h3-image/edit`.
- Fal edit places local-file markers in `image_urls`, cited as `Image 1`,
  `Image 2` in final array order. WaveSpeed edit places them in `images`,
  cited as `image 1`, `image 2`. Put the edit base first and assign later
  references narrow identity, costume, material or style roles. Both inspected
  schemas permit up to 16 images. Recheck the selected live schema.
- Fal uses `image_size` with explicit width and height. The Default Model
  List supplies 1024×768, 2048×1536 and 4096×3072 for casting detail levels.
  For other purposes, choose dimensions at the requested aspect ratio.
  Fal edit `auto` follows the first image's aspect within a 2048×2048 area,
  so use explicit dimensions when a confirmed detail level requires them.
- WaveSpeed uses `resolution` tiers `1k`, `2k`, `4k` independently of
  `aspect_ratio`. Set `aspect_ratio: "4:3"` for candidates and the purpose's
  required ratio for other work. Omit aspect_ratio for an edit whose base
  framing should determine the output shape.
- Set Fal `num_images: 1` for each casting candidate. The WaveSpeed schemas
  inspected expose no image-count field. Native validation remains authoritative.

## Codex panel

These edit routes fit the region-free [image edit panel](../../image-edit-panels.md).

```json
{
  "purpose": "image-edit",
  "routes": [
    { "provider": "fal-ai", "model": "minimax/h3-image/edit", "regionModes": null, "styleReference": true, "controlPointers": [] },
    { "provider": "fal-ai", "model": "minimax/h3-image/highspeed/edit", "regionModes": null, "styleReference": true, "controlPointers": [] },
    { "provider": "wavespeed-ai", "model": "minimax/h3-image/edit", "regionModes": null, "styleReference": true, "controlPointers": ["/resolution"] }
  ]
}
```

Map `wholeImageInstruction` to `prompt` and place the base first in the native
image array, followed by any style reference with an explicit style-only role.
Fal's composite image_size has no scalar panel control. WaveSpeed's resolution
is the native iteration control. Use Fal `image_size: "auto"` or omit
WaveSpeed aspect_ratio for base-led edits unless the user requests reframing.
Follow the provider reference adapters for local-file markers.

## Sources and verification

Researched 2026-11-10. Prompting sources are the [MiniMax Design guide],
[Fal portrait example] and [Fal edit example]. Examples above are authored
agent recommendations and have not been generated.

All six selected route schemas were inspected through `renku generation schema
show`. Route references are [Fal standard generation], [Fal standard edit],
[Fal Highspeed generation], [Fal Highspeed edit], [WaveSpeed generation]
and [WaveSpeed edit]. Pika's public catalog contained no H3 Image entry,
and targeted Replicate searches found no verified H3 Image route. WaveSpeed's
older H3 video-family still-image derivatives and Pruna variants are distinct
choices and are outside this addition.

[MiniMax Design guide]: https://design.minimax.io/tools/h3-image
[Fal portrait example]: https://fal.ai/models/minimax/h3-image/highspeed/text-to-image
[Fal edit example]: https://fal.ai/models/minimax/h3-image/edit
[Fal standard generation]: https://fal.ai/models/minimax/h3-image/text-to-image/api
[Fal standard edit]: https://fal.ai/models/minimax/h3-image/edit/api
[Fal Highspeed generation]: https://fal.ai/models/minimax/h3-image/highspeed/text-to-image/api
[Fal Highspeed edit]: https://fal.ai/models/minimax/h3-image/highspeed/edit/api
[WaveSpeed generation]: https://wavespeed.ai/models/minimax/h3-image/text-to-image
[WaveSpeed edit]: https://wavespeed.ai/models/minimax/h3-image/edit
