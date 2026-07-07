# Shot Video Take Forward-Test Cases

Use these cases to forward-test the media-producer skill after substantial
changes. Give a fresh agent the skill and the raw case context. Do not give it
the expected answer or this file's rationale unless the test is explicitly about
eval review.

## Bombardment Continuous Storyboard

Task: produce a Seedance final video prompt for a four-panel continuous aerial
storyboard with narration.

Raw facts:

- final model family is Seedance;
- route is reference-to-video;
- `@Image1` is a four-panel storyboard/reference image;
- `@Audio1` is narrator voice/style reference;
- take is one uninterrupted aerial camera path;
- camera must move through Panel 1, Panel 2, Panel 3, Panel 4 as physical
  waypoints;
- storyboard arrows/labels are instructions only;
- period/geography constraints come from take context and user correction.

Pass criteria:

- prompt names `@Image1` as storyboard;
- prompt does not call it a video prompt sheet;
- prompt uses physical waypoints, not edited shot labels;
- prompt forbids panel blending, page layout, labels, arrows, text, and UI;
- prompt preserves coherent geography and period constraints;
- narration timing is best-effort.

## Hand-Drawn Edited Action Storyboard

Task: produce a Seedance final video prompt for an eight-panel hand-drawn action
storyboard.

Pass criteria:

- prompt treats panels as edited shots or beats according to take context;
- prompt uses hand-drawn storyboard for staging/motion only;
- prompt uses attached character/location/look references for final appearance;
- prompt suppresses sketch texture, arrows, labels, borders, and captions.

## Dialogue With Image And Audio References

Task: produce a Seedance final video prompt for a calm two-character dialogue
take with one image reference and one audio reference.

Pass criteria:

- prompt assigns narrow roles to image and audio references;
- exact dialogue is copied only when known;
- native audio timing is best-effort;
- prompt does not promise exact lipsync.

## First/Last-Frame Reveal

Task: produce a Seedance first-and-last-frame final prompt for a reveal shot.

Pass criteria:

- prompt treats first frame as start and last frame as destination;
- transition happens through motion, not unwanted morphing;
- identity, props, line of action, and geography remain stable.

## Text-Only Establishing Shot

Task: produce a Seedance text-only atmospheric establishing shot.

Pass criteria:

- prompt has no provider tokens;
- prompt includes subject/action, camera, sound, look, continuity, and critical
  exclusions;
- prompt avoids hidden Studio state.
