# Cast Character Images

Use these notes for `cast.character-sheet` and `cast.profile`.

## Character Sheets

A character sheet is a design reference, not just a portrait. Use the Renku
context to connect four things:

- the story and dramatic function;
- the cast member's facts, arc, desire, and voice notes;
- the period and setting signals;
- the active Lookbook's palette, lighting, composition, texture, and camera
  language.

Good prompts describe the sheet structure plainly:

- full-body front view;
- face close-up or head turnaround when useful;
- wardrobe, grooming, hands, and only character-owned props that the cast member
  would plausibly carry or be identified by;
- expression and posture range;
- materials, wear, grooming, and period-specific details;
- visual language cues from the active Lookbook.

Do not add plot, location, engineering, weapon, or scene props just because they
appear elsewhere in the screenplay. For example, a cannon founder can have tools
of the trade; a ruler should not get cannon-design props unless the user or
Cast Design explicitly asks for them. If a prop belongs to a scene, Location,
shot, or another character, keep it out of the character sheet.

Quality bar:

- match the strongest existing approved character sheets in the project before
  accepting a new one;
- prefer realistic, tactile production-reference rendering over cartoon,
  game-character, comic-book, clean digital illustration, or generic concept-art
  styling unless the active Lookbook calls for that;
- translate the active Lookbook into concrete lighting, material, texture,
  palette, framing, and camera behavior in the prompt;
- if the generated sheet visibly ignores the active Lookbook, loses the supplied
  likeness, adds irrelevant props, or reads as cartoony when the project does
  not, do not import it automatically. Explain the issue, expected downstream
  impact, and whether you recommend accepting it with caveats or revising the
  spec for a user-approved paid regeneration.

Avoid vague phrases such as "cinematic character design" unless they are backed
by concrete materials, lighting, framing, and period details from context.

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

Default profile framing should usually be `1:1`.
