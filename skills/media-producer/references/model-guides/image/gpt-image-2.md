# GPT Image 2 Prompt Guide

Use this guide for GPT Image 2 on a supported external provider. The provider
route owns request fields and reference syntax. Use image-edit prompting only
when image operation routing selected one exact source as the canvas for a
source-preserving modification; a reference-capable provider route can also
create a new image.

OpenAI's GPT Image Generation Models Prompting Guide includes examples drawn
from production use cases for GPT Image 2. That cookbook is archived and may
contain outdated model or API details, so use it here for prompt craft and
check request controls against the current model page and selected provider
route. OpenAI's current shared image-prompting guide illustrates some practices
with GPT Image 2.5 Flare and Sunburst; treat those as adjacent-model evidence,
not a guarantee of identical GPT Image 2 behavior.

## Generation

- Structure a dense brief in this order: scene or background, primary subject,
  key visual details, then constraints. Naming the intended artifact helps set
  what the image needs to communicate; for example, a lobby directory needs
  legible hierarchy, while a story illustration needs a clear action.
- Add viewpoint, environment, lighting, materials, and palette when they shape
  acceptance. State spatial relationships directly; a broad style phrase does
  not specify a layout.
- For important visible copy, quote the exact wording and describe its
  hierarchy, placement, size, color, and type character. If an uncommon name
  keeps drifting, spell it character by character and reduce competing small
  details before making another attempt.
- Use short labeled sections when a dense multi-reference or multi-panel brief
  needs clearer separation. Keep a simple single-image request as direct prose.
- For people, give scale, placement, pose, gaze, expression, and interaction
  when they determine success. For Props, state holder, placement, state,
  scale, and interaction. For Locations, name stable geography and landmarks.

Illustrative prompts, not generated or tested:

- Simple: `A rain-darkened tram stop at blue hour, a lone commuter holding a
  yellow umbrella, seen from across the street. Reflections from one warm
  shopfront lead toward the figure; natural documentary photography.`
- Controlled layout: `Create a landscape travel card. Put a small hand-drawn
  map on the left and a full-height photograph of a foggy pine ridge on the
  right. The only headline is “NORTH PASS”, centered near the top in white
  sans-serif lettering.`
- Text hierarchy: `Design a square bakery window card. Set “OPEN AT SIX” as the
  largest line across the upper third in dark green serif lettering; place
  “bread • coffee • pastries” below it in smaller warm-gray type. Leave clear
  space around both lines and keep the pastry photograph in the lower half.`

## Renku storyboard composite requirements

The following constraints belong to the accepted Renku storyboard workflow;
they are not claims about a special GPT Image 2 capability. Apply them when
that Studio purpose requests one storyboard composite:

- Describe each storyboard panel as one concrete, action-focused visible Beat.
  Four panels are regions inside one generated composite, not four output
  variants.
- For a two- or three-Beat storyboard composite, describe the complete 2×2
  grid explicitly and include each omitted Beat position as a bounded,
  low-detail placeholder cell. The placeholder stabilizes the cell geometry;
  it is not a Beat, must not contain narrative imagery, and must never be
  cropped or imported.
- When the Project ratio is known but the selected image lane has no
  structured output-size control, state that the outer 2×2 grid rectangle
  itself must use the Project ratio and that any extra canvas is only margin
  or letterbox. Do not let a model-default canvas ratio determine the Beat
  cell proportions.

## Reference roles and edits

- Name each selected image with the exact mention supplied by the provider
  adapter, when the model-facing prompt needs to distinguish it, and give it one
  clear, non-overlapping role. Never invent numbered image tokens.
- Say which property to carry from each reference, such as a person's face,
  garment color, or the layout of a package, and which properties may change.
  The GPT Image 2 cookbook uses indexed references in its own examples, but
  this guide does not prescribe those tokens: use only the selected adapter's
  exact reference syntax.
- For compositing, describe scale, placement, overlap, and interaction between
  the selected subjects so the intended spatial relationship is explicit.
- State what must remain unchanged and what must change. For Scene Storyboards,
  the Storyboard Lookbook reference alone controls target appearance;
  Character, Location, and Prop references preserve canonical subject/design
  facts while their source rendering style changes to the Storyboard Lookbook
  style.
- Put the Storyboard Lookbook first, then exact batch-relevant Character,
  Location, and Prop references in deliberate stable order.
- When the Studio purpose is `image.edit`, constrain the change instead of
  redescribing the whole image. Name the source image and the requested edit;
  describe identity, layout, material, lighting, or typography continuity that
  must survive.
- In a multi-turn edit, restate the invariants that matter in each request and
  change one thing at a time. If a change misses, inspect whether the target,
  requested state, or preservation rule was ambiguous; tighten that part
  instead of appending several unrelated instructions.

If text, identity, geometry, or a local edit misses the brief, inspect the
output and correct the specific mismatch in a follow-up. OpenAI recommends
focused edit instructions and one-change-at-a-time iteration in its shared
prompt guide; test that advice on the selected GPT Image 2 provider route.

Reviewed 2026-09-30 against OpenAI's [GPT Image 2 model page], [image
prompting guide], and [GPT Image prompting cookbook]. The cookbook discusses
GPT Image 2 prompt craft but carries an archive notice, so request fields and
model availability require current verification. The shared prompt guide's
worked outputs include GPT Image 2.5 examples, not a guarantee of identical GPT
Image 2 behavior. Storyboard constraints above are Renku workflow requirements;
the original examples are illustrative and untested.

[GPT Image 2 model page]: https://developers.openai.com/api/docs/models/gpt-image-2
[image prompting guide]: https://developers.openai.com/api/docs/guides/image-prompting
[GPT Image prompting cookbook]: https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide
