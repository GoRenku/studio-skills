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
- selected model and route parameters;
- source images for edit routes;
- attached reference images, in provider order.

Provider-invisible Studio state includes approval state, database selection
state, department names, review history, asset ids, file names, Movie Lookbook
names, Cast Design names, Location Design names, and prior generated images
that are not attached to the request.

## Source Summary

Current Studio image purposes expose these model families:

- `fal-ai/openai/gpt-image-2`
- `fal-ai/openai/gpt-image-2/edit`
- `fal-ai/nano-banana-2`
- `fal-ai/nano-banana-2/edit`
- `fal-ai/xai/grok-imagine-image`
- `fal-ai/xai/grok-imagine-image/edit`
- `fal-ai/xai/grok-imagine-image/quality/edit`
- `fal-ai/bytedance/seedream/v5/lite/text-to-image`
- `fal-ai/bytedance/seedream/v5/lite/edit`

Provider and platform sources reviewed:

- fal describes GPT Image 2 as a quality-first image model with strong
  photorealism, text rendering, product photography, and both text-to-image and
  image-edit endpoints: https://fal.ai/gpt-image-2
- OpenAI's image guide documents image inputs, editing, reference-image
  workflows, and high-fidelity image input handling for GPT Image 2:
  https://developers.openai.com/api/docs/guides/image-generation
- fal describes Nano Banana 2 as Gemini 3.1 Flash Image, with natural-language
  control, character consistency, text rendering, and up to 14 reference images
  for editing: https://fal.ai/models/fal-ai/nano-banana-2
- Google Gemini image guidance recommends specific prompts, context and intent,
  step-by-step instructions, and conversational multi-turn editing:
  https://ai.google.dev/gemini-api/docs/image-generation
- xAI documents Grok Imagine text-to-image and image editing, including
  natural-language editing with up to 3 reference images:
  https://docs.x.ai/developers/model-capabilities/imagine
- fal lists Grok Imagine image generation and edit variants:
  https://fal.ai/explore/xai
- fal describes Seedream 5 as supporting web retrieval, controllable editing,
  reduced hallucination, and multi-step reasoning:
  https://fal.ai/seedream-5.0
- fal describes the exposed Seedream v5 Lite text-to-image endpoint as
  detailed-natural-language text-to-image with high-resolution output and
  multi-image generation:
  https://fal.ai/models/fal-ai/bytedance/seedream/v5/lite/text-to-image

Research sources reviewed:

- Oppenlaender's prompt modifier taxonomy describes prompt modifiers as
  practitioner techniques for shaping text-to-image outputs. Prompt modifiers
  help after subject, layout, references, and material cues are explicit; they
  do not substitute for actual image references:
  https://arxiv.org/abs/2204.13988
- Cazzaniga's SCHEMA paper argues for modular structured prompt components for
  Gemini image generation, supporting Renku's preference for explicit blocks
  such as purpose, references, preserve, change, and exclude:
  https://arxiv.org/abs/2602.18903
- The Seedream 4.0 paper describes the model-family direction toward unified
  text-to-image, image editing, multi-image composition, and in-context
  reasoning. It is background only; Studio's exposed route and provider
  contract still decide which inputs are visible:
  https://arxiv.org/abs/2509.20427

## Prompt Grammar By Route

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

Reference-to-image creates a new image while conditioning the model with
attached references. Do not use edit words such as "replace" unless the route
is editing a source image.

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
the spec or reference selections before running.

## Model Heuristics

Use GPT Image 2 when polished realism, material fidelity, text rendering, or a
high-fidelity edit matters more than fast iteration. Good prompts name concrete
materials, light, skin texture, cloth weight, age read, posture, lens/finish,
and exact layout.

Use Nano Banana 2 when fast natural-language iteration, character consistency,
storyboards, layout-heavy sheets, or larger reference sets matter. Prompts can
be conversational, but reference roles must still be explicit.

Use Grok Imagine when the reference count is small and the output benefits from
compact cinematic subject, setting, lighting, material, mood, and camera
language. Enforce the 3-reference limit before prompt writing.

Use Seedream v5 Lite for high-resolution Lookbook and Location composition,
domain-specific visual reasoning, architecture, geography, cultural detail,
material specificity, and text-to-image iteration. For the current text-to-image
route, do not pretend reference images are attached.

## Purpose Guidance

Cast character sheets should describe a lean identity turnaround or physical
continuity sheet. Reference-aware prompts must name previous character sheets,
portraits, wardrobe or accessory references, and Lookbook/style references by
visible role. Do not say "approved sheet" or "same as before" unless that image
is attached and named as a reference.

Cast profile edits should use the character sheet as the source image when a
source asset is selected. Preserve the source face, wardrobe, period cues,
palette, and material detail. When no source image exists, use text-to-image
language and do not imply that a prior sheet is visible.

Location environment sheets should translate Location Design into visible
architecture, geography, surfaces, materials, lighting, atmosphere, continuity
views, scale cues, period, and cultural constraints.

Location hero edits should distinguish the source Location Sheet from any style
or Lookbook references. Do not say "match the current Location Sheet" unless
that sheet is the source or an attached reference.

Lookbook images and sheets may synthesize visual language, but provider-facing
prompts should convert Lookbook concepts into palette, contrast, exposure,
texture, grain, lens/finish, set feeling, costume/material tendencies, and
composition constraints.

Scene storyboard sheets and shot input images should keep reference roles
shot-facing: character reference, location reference, Lookbook/style reference,
previous storyboard reference, first-frame source, last-frame source, or custom
shot reference.

## Bad And Better Examples

Bad:

```text
Match the approved Palace character sheet.
```

Better:

```text
Use Reference 1, the previous selected character sheet, as the identity and
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
provider route, selected/source references, model parameter shape, file ids,
MIME types, cost, provenance, and preview safety.

Studio runtime must not validate whether generated images contain the expected
face, turban, location, panels, labels, readable text, shot coverage, palette,
or other creative contents. Those checks belong to agent QA and user review.
