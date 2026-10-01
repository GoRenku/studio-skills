# Nano Banana Image Prompt Guide

Applies to Nano Banana 2 and Nano Banana Pro generation and editing through a
supported provider route. Google's current API guide identifies Nano Banana 2
as its general-purpose workhorse with multi-reference consistency and reliable
text rendering; it positions Nano Banana Pro for the most complex visual work
and precision creative control. Those are Google's selection descriptions, not
a guarantee for every third-party route. The provider route and live schema
still determine which inputs are available.

## Generation and revision

- For a useful first draft, state the subject and action, then its setting,
  framing, and visual style. Add lighting or surface detail only where it
  changes the intended read. Google's general Nano Banana prompt guide says
  specific detail gives more control, but recommends building that detail by
  iteration rather than loading every request into the first prompt.
- For a designed image, specify the information order as well as its look: the
  headline, supporting text, visual groups, and where each belongs. Put exact
  copy in quotes and describe the type treatment. When wording must appear in
  another language, supply the exact wording and the relevant regional cues
  instead of asking the model to translate it from a vague description.
- Keep a simple request direct. Use short labeled sections only when a complex
  board or several distinct requirements benefit from separation.
- For an edit, name what changes and what should remain. Google documents
  conversational image editing and multi-turn iteration; a focused follow-up
  can make a missed detail easier to diagnose than a prompt that changes many
  things at once.
- For reference-led continuity, Google's general guide recommends clear
  reference images and distinct names for recurring characters or objects.
  Give each selected image one role, such as subject identity, style, or
  composition, and keep a character's chosen name consistent across prompts.
  Use exact reference mentions only when the selected provider adapter
  supplies them. The role and naming convention is Renku advice; Google does
  not define Studio's provider markers.

Illustrative prompts, not generated or tested:

- Simple: `A small ceramic bluebird on a windowsill after rain, soft overcast
  light, close three-quarter view, pale green garden out of focus behind it.`
- Text and layout: `Design a square seed packet. Center a watercolor drawing
  of three red poppies. Put “FIELD POPPY” across the top and “ANNUAL FLOWER”
  along the bottom in small dark-green serif lettering; leave a clear margin
  around both lines.`
- Controlled revision: `Keep the seed packet's layout and lettering. Change
  the poppy illustration to one open flower and two buds, viewed from slightly
  above. Use the same watercolor texture and keep both quoted lines readable.`
- Follow-up edit: `Change only the packet background from cream to pale sage.
  Keep both lines of text, their placement, the poppy drawing, and the border.`

If exact text or spacing is wrong, inspect the result and restate the specific
copy and placement that missed. Google publishes examples for text placement
and multi-turn edits, but the visible output still needs review; the examples
here are Renku guidance, not measured reliability claims.

Reviewed 2026-09-30 against Google's [Nano Banana image-generation guide] and
[general Nano Banana prompt guide]. The latter is first-party craft guidance
for Nano Banana imagery, not a separate API specification for Nano Banana 2 or
Pro; variant distinctions above come from Google's image-generation guide.
Examples here are original Renku recommendations. Neither source establishes
that every third-party route exposes the same model variant or behavior.

[Nano Banana image-generation guide]: https://ai.google.dev/gemini-api/docs/image-generation
[general Nano Banana prompt guide]: https://deepmind.google/models/gemini-image/prompt-guide/
