# Cast Character Images

Use these notes for `cast.character-sheet` and `cast.profile`.

## Character Sheets

A character sheet is a physical continuity anchor for a visible cast member,
not a broad concept-art board. The default `cast.character-sheet` output is a
lean identity turnaround with just enough information to keep the character
consistent in later shot generation.

Good prompts describe the sheet structure plainly:

- straight-on face close-up cropped above the shoulders;
- full-body front view;
- full-body back view;
- left profile;
- right profile;
- labeled height ruler with numeric tick marks when height is known;
- compact synopsis/metadata block below the face close-up;
- stable wardrobe, grooming, shoes, body proportions, silhouette, and posture;
- optional accessory cells below the synopsis block only for character-owned
  continuity items supplied by the user, Cast Design, or the cast role.

Do not add plot, location, engineering, weapon, or scene props just because they
appear elsewhere in the screenplay. For example, a cannon founder can have tools
of the trade; a ruler should not get cannon-design props unless the user or
Cast Design explicitly asks for them. If a prop belongs to a scene, Location,
shot, or another character, keep it out of the character sheet.

Do not ask for random location shots, story panels, expression ranges,
performance studies, costume catalogs, text-heavy design notes, or decorative
collage sections in the default character sheet. Broad exploration belongs in
Cast Design discussion or user/agent ideation, not in the default
`cast.character-sheet` media purpose.

Height matters. If exact height is supplied, carry it into the prompt and ask
for a labeled ruler with numeric tick marks. A decorative vertical line is not
enough. If height is missing and the user wants a final reusable continuity
sheet, ask for it before generation unless the user clearly chooses to proceed
without it.

References matter too. Before generating a `cast.character-sheet`, inspect the
generation context for `referenceOptions`:

- include existing same-character character sheets as real image references for
  continuity unless the user excludes them;
- treat ad hoc cast reference images, accessory images, portraits, and collected
  likeness references as optional references the user can include;
- if the user supplies a project file that is not already attached, import it
  first with `renku media import --purpose reference.image --target cast:<cast-member-id> --source <project-relative-path> --json`, then re-read context;
- use `renku generation preview show --spec <spec-id> --json` after persisting
  the spec so the user can inspect and adjust references in Studio;
- do not use built-in Codex image generation when those references need to be
  provided through the model;
- do not combine multiple references into one ImageMagick/contact-sheet image.
  Reference-capable models can take multiple references through Renku/Core.

Prompts must use provider-visible reference labels. A prompt may say
`Reference 1 is the previous character sheet` or `Reference 2 is the portrait
for facial likeness only` only when those images are selected in the preview.
Do not write prompts that ask the provider to know which asset Studio approved,
which prior take was selected, or what a project-internal reference name means
unless the image is attached and the prompt explains the visible traits to use.

The face close-up matters too. It should be centered, front-facing, and cropped
from the top of the head through the neck, ending above the shoulders. Do not
use an angled three-quarter portrait or a torso-heavy crop for the face panel.

The synopsis block should sit directly below the face close-up. Include only
supplied or project-grounded details such as name, height, age or age read, and
one short role/identity synopsis. Do not invent weight, gender, or biographical
facts to fill template lines.

Quality bar:

- compare against the strongest existing user-approved character sheets in the
  project before accepting a new one. This is agent/user QA language, not
  provider-facing prompt language;
- if an existing sheet should condition the new output, include it as a real
  reference image and name its visible role in the prompt;
- prefer realistic, tactile production-reference rendering over cartoon,
  game-character, comic-book, clean digital illustration, or generic concept-art
  styling unless the selected Movie Lookbook calls for that;
- translate the active Movie Lookbook into concise rendering quality,
  material, texture, palette, and light behavior in the prompt without adding
  Lookbook panels or camera studies;
- if the generated sheet visibly ignores the selected Movie Lookbook, loses the
  supplied likeness, lacks required views, omits known height, changes wardrobe
  across views, uses an angled or torso-heavy face close-up, omits the
  synopsis/metadata block, adds irrelevant props, or reads as cartoony when the
  project does not, do not import it automatically. Explain the issue, expected
  downstream impact, and whether you recommend accepting it with caveats or
  revising the prompt/spec for a user-approved iteration or paid regeneration.

Avoid vague phrases such as "cinematic character design" unless they are backed
by concrete identity, wardrobe, material, height, and rendering details from
context.

Avoid provider-facing phrases such as `approved sheet`, `selected Movie
Lookbook`, `same as before`, `Palace version`, or `production-reference caliber`
unless the prompt immediately translates them into attached reference roles or
visible traits. The provider sees image files and prompt text, not Renku review
history.

## Profile Images

A profile image is a cast-facing portrait. Prefer a selected character sheet as
source continuity when one exists.

Use text-to-image when no source sheet exists or when the user wants a looser
interpretation. Use edit models when the user wants the profile to preserve the
character sheet's face, wardrobe, palette, and period cues.

For edit specs:

- include `sourceAssetId`;
- use one selected character sheet image as the source;
- keep the prompt focused on the intended portrait, not a new full design;
- preserve recognizable identity, period, and wardrobe unless the user asks for
  a deliberate variation.
- reserve words such as `replace`, `remove`, and `edit the source image` for
  actual edit models with a real source image. For reference-conditioned new
  images, say `create a new image using Reference N for...`.

Default profile framing should usually be `1:1`.
