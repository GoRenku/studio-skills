# Cast Character Sheet Purpose

Purpose key: `cast.character-sheet`

Target format: `cast:<cast-member-id>`

Read Renku context first. For Renku-managed generation, also read model
choices:

```bash
renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json
renku generation model list --purpose cast.character-sheet --target cast:<cast-member-id> --json
```

If the user wants Codex built-in image generation, use the context, Cast Design,
Movie Lookbook, and quality gate below to prompt `$imagegen`, save the selected
sheet inside the project, inspect it, and import it without `--receipt`.

Character sheet generation requires a selected Movie Lookbook, but the default
sheet is a lean identity turnaround, not a broad concept-art board. Use the
Lookbook only for production caliber, palette discipline, lighting softness,
texture, and realism. Do not translate the Lookbook into extra story panels,
locations, cinematic frames, or camera-language studies inside the sheet.
When writing provider-facing prompt text, translate the Lookbook into visible
traits such as palette, contrast, light quality, material realism, grain,
texture, and photographic finish. Do not ask the provider to "match the Movie
Lookbook" as if it can read Studio state.

The default sheet should contain only the reference information needed for
character continuity:

- front-facing face close-up, cropped above the shoulders;
- full-body front view;
- full-body back view;
- left profile;
- right profile;
- labeled height ruler with numeric tick marks beside the full-body views;
- compact synopsis/metadata block below the face close-up;
- optional accessory cells below the synopsis block only for character-owned
  continuity items.

Renku-managed model notes:

- `fal-ai/openai/gpt-image-2` for realistic, high-caliber, tactile
  production-reference sheets, especially when a real prior character sheet is
  attached as a visible continuity reference.
- `fal-ai/nano-banana-2` when layout control, seed support, or a more
  design-board-like sheet is more important than painterly realism. Do not use
  it by default when the user's QA target is a realistic sheet and the prompt
  does not yet contain concrete material, lighting, and reference-role
  instructions.
- `fal-ai/xai/grok-imagine-image` as a cheaper alternative when its limits are
  acceptable

## Reference-Aware Generation

Character sheet continuity should use actual image references when they exist.
The generation context may expose `referenceOptions` with two kinds of usable
references:

- `cast-character-sheet`: previous selected or take character sheets for the
  same cast member. Include these by default for continuity on subsequent
  sheets.
- `cast-reference-image`: ad hoc cast reference images collected by the user,
  such as portraits, historical likeness images, accessory references, or
  costume details. Treat these as optional unless the user explicitly asks to
  include them.

If the user supplies an arbitrary project image that is not yet listed in
`referenceOptions`, import it first as a cast reference image, then re-read the
generation context:

```bash
renku media import --purpose reference.image --target cast:<cast-member-id> --source <project-relative-path> --title "<visible title>" --summary "<why this reference matters>" --reference-name <stable-reference-name> --reference-purpose "<reference use>" --json
renku generation context --purpose cast.character-sheet --target cast:<cast-member-id> --json
```

Use the path relative to the Renku project folder, such as
`research/helmet.jpg`. Do not say arbitrary references are unsupported just
because they are not already attached to the Cast Member; attach them with
`reference.image` and then include the resulting `cast-reference-image`
dependency through the preview/spec selection flow.

If an existing character sheet for the same cast member is already present, use
Renku-managed reference-capable generation and provide that sheet as a real
reference input. Do not use built-in Codex image generation for a continuity
sheet when existing sheets or user-supplied references need to condition the
model. Do not use ImageMagick, screenshots, contact sheets, or local collage
construction to combine references into one image. GPT-Image-2, Nano Banana,
and other reference-capable image models can receive multiple image references;
let Renku/Core pass multiple `image_urls` / input files.

Keep the distinction clear:

- text-to-image: no image references are selected;
- reference-to-image: create a new image using one or more reference images;
- image edit: modify a specific source image in place or preserve it as the
  main source. Do not collapse reference-to-image into manual image editing.

The full media-producer prompting guidance lives in
`references/reference-visible-image-prompting.md`.

Provider-facing prompts must name only visible references. The preview may show
an existing Studio asset as selected or approved, but the prompt should describe
it as a provider-visible role:

```md
Provider-visible references:

- Reference 1: previous character sheet, role: identity and wardrobe continuity
  Use for: face shape, body proportions, grooming, wardrobe state, headwear
  silhouette, sheet layout, and material finish visible in the image
  Do not copy: background artifacts, filenames, asset ids, or review notes
- Reference 2: portrait, role: facial likeness only
  Use for: facial structure, age read, expression restraint, and grooming
  Do not copy: camera angle, background, modern clothing, or portrait crop

Prompt:
<provider-facing prompt text using the same Reference 1 / Reference 2 labels>
```

If the prompt mentions a reference that is not selected in the preview, stop and
fix the spec or reference selection. If the preview selects a reference and the
prompt gives it no role, stop and revise the prompt before estimating or
running. Keep this as agent workflow QA; do not invent Studio metadata or
runtime prompt validators for visual contents.

After creating or updating a Renku-managed `cast.character-sheet` spec, show
the saved spec in Studio's generation preview dialog before estimating/running:

```bash
renku generation preview show --spec <spec-id> --json
```

The dialog shows the prompt, selected references, available optional
references, settings, and model route. Let the user include or exclude optional
references there. If the user changes reference selections, re-read or re-show
the preview before estimating/running so the provider payload reflects the
chosen reference set.

Reference selections belong in the spec only as dependency inclusion choices:

```json
{
  "referenceSelections": {
    "dependencyInclusions": {
      "cast-character-sheet:cast_ada:asset_previous_sheet": "include",
      "cast-reference-image:cast_ada:asset_hair_clip": "include",
      "cast-reference-image:cast_ada:asset_unwanted_portrait": "exclude"
    }
  }
}
```

Do not put provider URLs, local file paths, base64 images, or hand-built
composite reference images in the spec. Core resolves selected project assets
into provider inputs during validation/run.

Spec shape:

```json
{
  "purpose": "cast.character-sheet",
  "target": { "kind": "castMember", "id": "cast_ada" },
  "modelChoice": "fal-ai/nano-banana-2",
  "prompt": "A clean neutral production character sheet for Ada...",
  "takeCount": 1,
  "seed": null,
  "imageFrame": "project",
  "detail": "standard",
  "outputFormat": "png",
  "title": "Ada character sheet"
}
```

Prompt for a reusable physical continuity reference, not a single glamour
portrait and not a broad design board. Good default prompts use one finished
image with five vertical sections in this order:

```text
FACE CLOSE UP | FRONT | BACK | LEFT PROFILE | RIGHT PROFILE
```

The face close-up must be straight-on, centered, and frontal, not an angled
three-quarter portrait. Crop it as a true face close-up from the top of the head
through the neck, ending above the shoulders. Do not show chest armor, torso, or
upper-body costume detail in the face close-up; that belongs in the full-body
views.

Use the same person, same wardrobe state, same grooming, and same body
proportions in every view. Keep the full-body poses neutral: standing upright,
arms relaxed, feet visible, no dramatic acting, no scene action, and no extra
characters. A neutral studio-like background and simple dividers are preferred.

Height is binding for visible on-screen cast members:

- If an exact height is available, include it in the prompt and ask for a
  labeled ruler with numeric tick marks, preferably in imperial and metric
  form.
- If height is known only as a relationship, such as "shorter than Mehmed" or
  "towering and broad", use that relationship without inventing a number.
- If height is missing and the user wants a reusable final continuity sheet,
  ask for height before generating unless the user explicitly says to proceed.
- If the user proceeds without height, avoid fake precision and request a
  neutral proportional scale instead.
- A decorative vertical line is not enough. The ruler must visibly communicate
  measurement, with tick marks and labels aligned to the standing figure. Use a
  labeled ruler in each full-body column when possible, or one clearly shared
  ruler aligned to all full-body views.

The left column should place the compact synopsis/metadata block directly below
the face close-up. Use only supplied or project-grounded text. Prefer:

- name;
- age or age read when known;
- height;
- one short role or identity synopsis when available;
- weight or gender only when explicitly supplied or important to continuity.

Do not invent weight, gender, or biographical facts to fill template lines.

Accessories are optional and scoped. Place accessory cells below the
synopsis/metadata block only when the user, Cast Design, or cast role makes the
accessory a character-owned continuity item: eyeglasses, hair clip, ring,
necklace, cane, signature bag, or a similar worn or carried identity object. Do
not invent accessories to fill the template. If no accessories were supplied,
omit the accessory section and let the left column stay quiet below the
synopsis block. Do not add scene, location, technical, weapon, or plot props
merely because they are important to the story. If the context tempts you to
include a prop that belongs to another department, omit it unless the user
explicitly asked for that variant.

Default text-to-image prompt recipe:

1. Start with the character identity and target wardrobe state.
2. State the five required sections: face close-up, front, back, left profile,
   right profile.
3. State that the face close-up must be straight-on, centered, and cropped
   above the shoulders.
4. State exact height or known height relationship.
5. Ask for a labeled height ruler with numeric tick marks aligned to the
   full-body views.
6. Ask for a compact synopsis/metadata block below the face close-up.
7. Add stable identity anchors: face, hair, build, skin details, silhouette,
   posture, wardrobe, shoes, and grooming.
8. Add optional accessory cells only when supplied by the user or Cast Design.
9. Add concise rendering quality from the active Movie Lookbook.
10. Exclude location panels, story scenes, expression ranges, random props,
   weapons, scene objects, text-heavy design notes, UI mockups, and decorative
   collage elements.

No-reference text-to-image skeleton:

```text
Create a clean neutral production character sheet for {name}. Use one finished
image with five vertical sections: FACE CLOSE UP, FRONT, BACK, LEFT PROFILE,
RIGHT PROFILE. Show the same person in the same wardrobe state in every view.
Use a neutral studio background and simple sheet dividers.

The FACE CLOSE UP must be straight-on, centered, and cropped from the top of the
head through the neck, ending above the shoulders. No angled portrait, no
three-quarter face, no torso or chest costume detail in the close-up.

Height is binding: {height}. Include a labeled height ruler with numeric tick
marks beside the full-body views and align body proportions to that height. A
plain decorative vertical line is not enough. Use neutral standing poses, arms
relaxed, feet visible, no dramatic acting.

Identity anchors: {face, hair, build, silhouette, grooming, posture}.
Wardrobe anchors: {wardrobe, shoes, materials}.
Below the face close-up, include a compact synopsis/metadata block: {name,
height, age or age read if known, one-line role or identity synopsis if known;
weight or gender only if supplied}.
Optional accessories below that block: {only explicit character-owned
accessories, or omit this section if none are supplied}.

Keep this as an identity reference for video continuity, not a concept-art
collage. No location shots, no scene panels, no expression range, no extra
characters, no invented props, no story moments, no technical diagrams, no
large paragraphs of generated text.
```

Previous-character-sheet reference skeleton:

```text
Create a new clean neutral production character sheet for {name}. Use one
finished image with five vertical sections: FACE CLOSE UP, FRONT, BACK, LEFT
PROFILE, RIGHT PROFILE.

Reference 1 is the previous character sheet. Use it as the identity, body
proportion, wardrobe state, grooming, headwear, material finish, and sheet
layout continuity source. Preserve the visible face shape, skin details, hair or
headwear silhouette, robe or garment layering, shoes, posture, and neutral
turnaround structure from Reference 1.

Change/add: {requested wardrobe state, height ruler, synopsis block, accessory
cells, or other current user request}.

Do not copy Reference 1's background artifacts, filename text, asset ids, review
notes, or any accidental image flaws. Create a new character sheet; do not alter
Reference 1 itself.
```

Previous character sheet plus portrait skeleton:

```text
Create a new clean neutral production character sheet for {name}.

Reference 1 is the previous character sheet. Use it for body proportions,
wardrobe continuity, grooming state, sheet structure, and production-reference
material finish.

Reference 2 is a portrait. Use it only for facial likeness: face shape, age
read, eyes, nose, mouth, beard or hairline, skin details, and restrained neutral
expression. Do not copy Reference 2's background, camera angle, modern clothing,
portrait crop, lighting mismatch, or pose.

Preserve: {identity anchors, wardrobe anchors, height, posture}.
Change/add: the required five-section turnaround layout, labeled height ruler,
and compact synopsis block.
Exclude: extra characters, scene locations, unrelated props, expression ranges,
and text-heavy design notes.
```

Costume, headwear, or accessory reference skeleton:

```text
Create a new clean neutral production character sheet for {name}.

Reference 1 is the previous character sheet. Use it for the same person, body
proportions, existing wardrobe state, sheet layout, and material realism.

Reference 2 is a {costume/headwear/accessory} reference. Use it only for
{specific visible trait: construction, silhouette, fabric folds, metal finish,
scale, color, wear pattern}. Do not copy Reference 2's face, background, camera
angle, body pose, unrelated garments, or scene context.

Preserve: {face, grooming, build, posture, height, continuity wardrobe traits}.
Change/add: integrate the {costume/headwear/accessory} trait into the new sheet
without changing the character's identity.
Exclude: any reference backgrounds, non-character props, extra figures, UI text,
or production annotations inside the sheet image.
```

Actual source-image edit skeleton:

```text
Edit the source image into a production-ready {profile image or revised
character sheet} for {name}.

Source image: preserve the same character identity, face, body proportions,
wardrobe state, grooming, pose discipline, lighting family, and sheet or
portrait continuity.

Reference 1 is a {costume/headwear/accessory/style} reference. Use only
{specific visible trait} from Reference 1.

Change: {specific edit request}. Replace only {trait} if the request is truly
an image edit.
Do not change: {source identity, face, body, wardrobe areas, layout, lighting}.
Exclude: Reference 1's background, face, camera angle, unrelated clothing,
logos, watermarks, and artifacts.
```

When the user supplies a portrait or says "in this likeness":

- preserve the supplied likeness as a binding constraint;
- include precise face, grooming, silhouette, and wardrobe anchors;
- use an image/edit route or imported source asset if the selected model and
  current Renku purpose support it;
- if the available `cast.character-sheet` model choices are text-to-image only,
  state that limitation before estimating or running, then make the prompt's
  likeness anchors unusually concrete.

Style and quality gate:

- before writing the spec, inspect existing user-approved character sheets for
  the project when available as agent-side QA examples. If one should condition
  the provider output, include it as an actual reference and name its visible
  role in the prompt;
- avoid cartoon, game-character, comic-book, glossy generic concept-art, or
  clean digital illustration styling unless the user-facing Lookbook direction
  explicitly asks for it;
- translate the active Movie Lookbook into concise rendering instructions:
  light quality, texture, palette, material realism, and photographic finish;
- after generation, inspect the image before import. If a take is cartoony
  against a realistic Lookbook, contains garbled dominant labels that make the
  view order or height unclear, misses the likeness, lacks front/back/profile
  coverage, uses an angled or torso-heavy face close-up, changes wardrobe
  across views, omits known height, uses only a decorative unlabeled height
  line, omits the synopsis/metadata block, or includes irrelevant props, do not
  import it automatically. Give the user a concrete QA assessment and recommend
  whether to accept it with caveats or approve a revised Codex image iteration
  or Renku-managed paid regeneration.

Generated labels are helpful but not durable metadata. Do not reject a visually
useful sheet solely because minor label text is imperfect. Reject or revise when
missing or garbled text makes the height, view order, or accessory scope unclear.

Common weak outputs and impact:

- Missing back view: downstream video may invent rear hair, clothing closures,
  capes, bags, or silhouette details.
- Missing side profiles: downstream video may drift on nose, chin, hair volume,
  posture, and body depth.
- Angled or torso-heavy face close-up: downstream video may drift on facial
  structure because the sheet never gives a clean front identity anchor.
- No labeled height ruler: multi-character shots may produce inconsistent scale.
- Missing synopsis/metadata block: agents and reviewers lose the compact
  identity reminder that should sit under the face close-up.
- Different outfit across panels: shots may mix wardrobe states.
- Random location or story panels: useful reference area is wasted and the model
  may treat scene context as character identity.
- Invented accessories: downstream shots may preserve objects the character
  should not own.
- Text-heavy collage: the image becomes less useful as a visual reference and
  text artifacts may contaminate shot prompts.

Import the selected take:

```bash
renku media import --purpose cast.character-sheet --target cast:<cast-member-id> --source generated/media/<file> --reference-name <stable-reference-name> --reference-purpose "<descriptive purpose>" --title "<visible card title>" --json
```

Reference metadata rules:

- `--reference-name` is required. Name the character plus continuity context,
  for example `mehmed-ii-palace-main`, `mehmed-ii-armored-siege`, or
  `mara-workshop-apprentice`. Do not use generated filenames, spec ids, run
  ids, or labels like `character-sheet-v2`.
- `--reference-purpose` is optional. Prefer a short production phrase such as
  `main palace character sheet`, `armored siege costume reference`, or
  `likeness and court wardrobe reference`. Do not use generic values like
  `character-sheet` unless that is truly the only known context.
- If the character may need multiple wardrobe/state variants and the requested
  context is ambiguous, clarify before import. A palace court sheet, armor
  sheet, disguise sheet, and injury-state sheet should get distinct names and
  purposes.
- Set `--title` to the visible Studio card title. Example:
  `Mehmed II Palace Main Character Sheet`.

To fix metadata on an already imported character sheet without generating or
duplicating media, update the existing asset relationship in place:

```bash
renku asset reference-update <asset-id> --target cast:<cast-member-id> --reference-name mehmed-ii-palace-main --reference-purpose "main palace character sheet" --title "Mehmed II Palace Main Character Sheet" --json
```
