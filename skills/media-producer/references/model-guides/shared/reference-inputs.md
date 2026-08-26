# Reference-Visible Image Prompting

Status: active skill guidance
Date: 2026-07-06

This guide defines how Renku Studio media-producer agents should describe
references for image generation. It is guidance for prompt authoring and agent
QA. It is not a Studio runtime schema for creative image contents.

The central rule is simple: provider-facing prompts may refer only to what the
provider can see in that request.

Provider-visible inputs are:

- prompt text;
- selected provider endpoint and native request fields;
- exact source or reference images placed in provider media fields;
- the native request array order shown by Preview.

Provider-invisible Studio state includes approval state, database selection
state, department names, review history, asset ids, file names, Production Lookbook
names, Cast Design names, Location Design names, and prior generated images
that are not attached to the request.

## Required Reads

Read the canonical model guide from `model-catalog.json` and the selected
provider route's adapter before writing a reference-aware prompt. The model
guide decides how the model uses visual evidence. The adapter decides which
inputs are visible and how the prompt may mention them.

## Prompt Grammar By Endpoint Shape

Write the saved prompt as readable natural-language paragraphs or simple
Markdown headings and bullets. Do not prefix the user-visible prompt with
internal bookkeeping labels such as `Use case`, `Asset type`, or `Primary
request`.

Text-to-image has no image inputs. Use only textual project facts and concrete
visual direction.

```text
Create a [output type] for [subject].

Purpose: [why this image exists in Renku].
Subject and setting: [visible identity, wardrobe, architecture, geography,
materials, time period].
Composition: [layout, framing, scale, foreground/background].
Style and light: [palette, contrast, texture, lens/finish, atmosphere].
Do not include: [internal labels, UI text, unrelated props, extra characters].
```

Reference-to-image creates a new image while conditioning the model with exact
references. Do not use edit words such as "replace" unless the selected
endpoint edits a source image.

```text
Create a new [output type] for [subject].

References:
- Reference 1 is [asset title or role]. Use it for [visible traits to preserve].
  Do not copy [traits to ignore].
- Reference 2 is [asset title or role]. Use it only for [specific visible role].
  Do not copy [traits to ignore].

Preserve: [identity, wardrobe, layout, palette, lighting, material detail].
Change/add: [requested new traits or output structure].
Exclude: [backgrounds, props, labels, extra people, source artifacts].
```

Image edit modifies a source image. Name the source separately from references.

```text
Edit the source image into [target output type].

Source image: preserve [identity, layout, lighting, wardrobe, location, or
material details].
Reference 1: use only for [trait to transfer].

Change: [specific edit].
Do not change: [source traits that must remain stable].
Exclude: [unwanted copied reference traits or generated artifacts].
```

For generic source-image corrections, use the Studio `image.edit` purpose and
target the registered source Asset. Resolve the exact source file first. Put it
in the source field defined by the provider adapter and live schema; do not
copy a field name from a different provider.

Do not resend Production Lookbook, Location Sheet, or Character Sheet references for
a localized edit unless the user asks for a new reference-conditioned image.
The source image is the visible continuity anchor. Inspect the result before
import, separately ask the user to accept the output, and attach it only through
the chosen focused destination with the exact safe provenance.

## Provider-Visible Reference Roles

Every attached reference should have a provider-facing role before prompt
writing:

- `Reference 1: previous character sheet, identity and wardrobe continuity`
- `Reference 2: portrait, facial likeness and grooming only`
- `Reference 3: headwear reference, turban construction and fabric only`
- `Reference 4: Lookbook sheet, palette and light quality only`
- `Source image: Location Sheet to edit into a hero image`

The prompt must then use the same labels. If the preview shows a selected
reference that has no role in the prompt, revise the prompt before running. If
the prompt mentions a reference that is absent from the preview, stop and fix
the native request before execution.

## Model Guidance

Use the selected canonical model guide for model-specific heuristics. Respect
the provider adapter and live schema's media cardinality. If they expose no
media field, do not pretend references are visible. Return to route selection
rather than inventing a field or silently dropping a reference.

## Purpose Guidance

Cast character sheets should describe a lean identity turnaround or physical
continuity sheet. Reference-aware prompts must name previous character sheets,
portraits, wardrobe or accessory references, and Lookbook/style references by
visible role. Never use a Lookbook's internal project title in provider-facing
text. Say “the provided style reference” and describe the visible palette,
light, texture, composition, or material traits it supplies. Do not say
"approved sheet" or "same as before" unless that image is attached and named as
a reference.

Cast profile edits should use the character sheet as the source image when a
source asset is selected. Preserve the source face, wardrobe, period cues,
palette, and material detail. When no source image exists, use text-to-image
language and do not imply that a prior sheet is visible.

Location Sheets should translate Location Design into visible
architecture, geography, surfaces, materials, lighting, atmosphere, continuity
views, scale cues, period, and cultural constraints.

Location hero edits should distinguish the source Location Sheet from any style
or Lookbook references. Do not say "match the current Location Sheet" unless
that sheet is the source or an attached reference.

Lookbook images and sheets may synthesize visual language, but provider-facing
prompts should convert Lookbook concepts into palette, contrast, exposure,
texture, grain, lens/finish, set feeling, costume/material tendencies, and
composition constraints.

Scene Storyboard Sheets use exact, non-overlapping reference roles:

- Storyboard Lookbook Sheet: the sole authority for medium, realism, linework,
  finish, lighting treatment, grade, texture, and detail density;
- Character Sheet: canonical identity, facial/body features, silhouette,
  proportions, costume, hair, and distinguishing details;
- Location Sheet: canonical geography, landmarks, architecture, set dressing,
  and recognizable environmental features; and
- Prop Sheet: canonical construction, geometry, scale, materials, markings,
  condition, and Beat-specific state.

Name every attached reference with its exact provider-documented token. Tell the model to
preserve each continuity subject's canonical facts while re-rendering it only
in the Storyboard Lookbook's visual language. A realistic continuity sheet must
not leak photographic lighting, finish, or realism into a stylized Storyboard.
Conversely, a realistic Storyboard Lookbook may request realism because that
exact Lookbook establishes it. State Prop holder, placement, state, scale, and
interaction in the relevant panel direction.

When preparing a Storyboard-native Character, Location, or Prop Sheet, use two
non-overlapping provider-visible roles: the exact accepted Production subject
sheet is canonical content authority, while the current Storyboard Lookbook
Sheet is sole appearance authority. Preserve identity, wardrobe, geography,
construction, scale, markings, condition, and relevant state from the content
reference. Transfer only medium, linework, value treatment, finish, lighting
behavior, texture, and detail density from the appearance reference. Explicitly
exclude Production photographic lighting, finish, and realism leakage.

Ad hoc Shot reference images keep production-facing roles such as character
reference, location reference, Lookbook/style reference, previous storyboard
reference, first-frame source, last-frame source, or custom Shot reference.

For a localized correction to a registered Take `video-prompt` image, use
`image.edit` against the exact source asset. Reuse the accepted output as a
`project-file` reference, or attach it through a current focused destination
when one exists. Do not invent a generic Shot-input attachment path.

## Bad And Better Examples

Bad:

```text
Match the approved Palace character sheet.
```

Better:

```text
Use Reference 1, the exact prior character sheet chosen in this request, as the identity and
wardrobe continuity source. Preserve the face shape, beard line, headwear
silhouette, robe layering, fabric weight, and neutral turnaround layout visible
in that reference. Create a new clean character sheet; do not alter the
reference image itself.
```

Bad for reference-to-image:

```text
Replace the turban with the costume reference.
```

Better for reference-to-image:

```text
Create a new character sheet. Use Reference 2 for the headwear design:
preserve the wrapped turban silhouette, fabric folds, height, and ivory tone.
Do not copy Reference 2's background, camera angle, or facial identity.
```

Better for an actual edit route:

```text
Edit the source image. Replace only the turban with the turban visible in
Reference 2. Preserve the source character's face, body, robe, pose, lighting,
and sheet layout.
```

## Runtime Boundary

Studio runtime may validate the envelope it owns: purpose, target, model,
provider fields, selected/source references, model parameter shape, file ids,
MIME types, cost, provenance, and preview safety.

Studio runtime must not validate whether generated images contain the expected
face, turban, location, panels, labels, readable text, shot coverage, palette,
or other creative contents. Those checks belong to agent QA and user review.
