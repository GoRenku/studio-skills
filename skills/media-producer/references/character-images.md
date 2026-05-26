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
- wardrobe and props;
- expression and posture range;
- materials, wear, grooming, and period-specific details;
- visual language cues from the active Lookbook.

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
