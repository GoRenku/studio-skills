# Seedance Prompt-Sheet Reference Video

Use this only for final `shot.video-take` prompting when all of these are true:

- the model family is Seedance;
- the selected route is reference-to-video;
- the provider preview includes a `video-prompt-sheet` image input;
- the agent is drafting, reviewing, estimating, or running the final video prompt.

Do not load this for ordinary Seedance text-to-video, first-frame, first/last-frame, or non-Seedance routes.

## Required Inputs

Before drafting the final prompt, read the persisted take authoring context and provider preview. Use the provider preview as the source of truth for token order. Do not infer tokens from filenames, memory, card order, or visible thumbnails.

Map references by modality-local order:

- first `image_urls` entry: `@Image1`;
- second `image_urls` entry: `@Image2`;
- first `audio_urls` entry: `@Audio1`;
- first `video_urls` entry, if present: `@Video1`.

Every supplied image, video, or audio token needs a role in the final prompt. Useful roles include storyboard/prompt sheet, location continuity, visual language, cast identity, prop continuity, motion reference, narrator voice/style, ambience, or sound-character reference.

## Prompt-Sheet Operating Rule

When the prompt sheet is a provider image input, name it by token and tell Seedance how to read it:

```text
@Image1 is the storyboard / video prompt sheet. Treat it as the guide for shot order, camera path, motion arrows, visible composition, and narration placement.

CRITICAL STORYBOARD RULE:
Work through @Image1 panel by panel in order as one continuous scene. Use the panels as temporal waypoints, never as a split-screen, collage, grid, poster, panorama, or frozen composite. None of the panel borders, numbers, shot labels, arrows, captions, metadata rows, text boxes, UI, or sheet layout may appear in the final footage.
```

Adjust the token if the prompt sheet is not `@Image1`. The rule is still mandatory.

## Adaptive Prompt Sections

Do not copy every section into every prompt. Use the shortest set that preserves the controls the take actually needs.

Always consider:

- `REFERENCES`: name every supplied token and its role.
- `CRITICAL STORYBOARD RULE`: explain ordered panels, temporal waypoints, and artifact suppression.
- `STORY / PANEL SEQUENCE`: convert each panel into temporal video action.
- `CRITICAL GEOGRAPHY AND CONTINUITY`: preserve locations, line of action, foreground/background, object counts, and forbidden zones.
- `ON-SCREEN TEXT AND SHEET ARTIFACTS`: forbid prompt-sheet text and layout from appearing.
- `NEGATIVE CONSTRAINTS`: put important negatives in the main prompt when the route does not support a separate negative field.

Include only when relevant:

- `QUALITY`, when fidelity or sharpness is a real risk.
- `LOOK / VISUAL LANGUAGE`, when a lookbook or style reference exists.
- `MOTION & CAMERA`, tuned to the take type: action, dialogue, establishing, atmospheric, object, landscape, or transition.
- `ACTION PHYSICS / MOMENTUM`, for fights, chases, impacts, machinery, vehicles, battles, or stunts.
- `DIALOGUE PERFORMANCE`, for visible speakers, turn-taking, lip movement, or facial acting.
- `NARRATION / AUDIO`, for native audio, voiceover, dialogue, ambience, or sound effects.
- `CRITICAL ENDING`, when the last frame, final camera state, or final motion matters.
- `ESTABLISHING GEOGRAPHY`, when the take's job is spatial orientation.

Avoid padding the prompt with irrelevant boilerplate. Overlong prompts with unrelated sections can reduce generation quality.

## Narration And Audio

Seedance audio references are conditioning, not exact editorial tracks.

- Use `@AudioN` as narrator voice/style, speaker character, ambience, or sound-character reference.
- Put exact spoken text in the final prompt when the text is known.
- Treat native audio timing as best-effort.
- If exact waveform, word timing, or editorial sync is required, route to a composition, lipsync, or talking-head workflow instead of relying on native Seedance audio.
- For best-effort native audio, place narration or dialogue inside the panel sequence so Seedance has timing intent.

Recommended wording:

```text
Use @Audio1 as the narrator voice/style reference. The narrator says exactly:
"..."
Timing is best-effort inside this native audio generation: the line should begin during Panel 2, continue through Panel 3, and complete during Panel 4.
```

## Hard-Constraint Transfer

Before estimate or run, compare the final prompt against hard constraints from:

1. current take authoring context and selected shot data;
2. user corrections;
3. prompt-sheet generation spec or brief, if available;
4. visible prompt-sheet text and imagery;
5. selected Location Sheet, Character Sheet, and Lookbook references.

Preserve constraints such as exact prop or vehicle counts, required foreground/background geography, forbidden landmarks or zones, side of frame, line of action, exact spoken words, final frame behavior, and "no text overlay" rules.

If the final prompt contradicts a hard constraint, stop and resolve the contradiction before estimating or running.

## Prompt-Quality Checklist

A Seedance prompt-sheet final prompt is prompt-quality ready only when:

- the prompt sheet is named by its actual provider token;
- every supplied image, video, and audio token has a role;
- the prompt says to work through panels in order;
- the prompt says panels are temporal waypoints;
- the prompt forbids sheet layout, borders, labels, arrows, captions, metadata rows, and UI from appearing;
- panel-level story, motion, camera, and tempo are expressed as video direction;
- known narration or dialogue text is copied exactly;
- audio timing is described as best-effort unless an exact-sync workflow is selected;
- hard constraints from the prompt-sheet brief/spec or visible sheet are preserved;
- the prompt does not contradict the sheet, take context, or user corrections;
- unsupported fields such as `negativePrompt` are not used when the selected route rejects them, and key negative constraints are instead written into the main prompt.

If any item fails, revise the prompt before cost estimate or paid generation.

## Common Failure Fixes

Prompt sheet becomes collage, panorama, or split-screen:

- Cause: the prompt names the sheet but does not explain that panels are temporal waypoints.
- Fix: add a critical storyboard rule that works through panels in order and forbids sheet artifacts.

Prompt contradicts the sheet:

- Cause: the final prompt was drafted from memory or a summary.
- Fix: compare against the prompt-sheet brief/spec and visible sheet before estimate or run.

Video feels like nudged still pictures:

- Cause: panel content is present, but motion, camera, tempo, and environmental movement are weak.
- Fix: add concrete continuous camera motion, subject movement, parallax, atmosphere, secondary motion, and final motion state.

Narration misses timing:

- Cause: native audio was treated as exact sync.
- Fix: keep exact words in the prompt, place them in panel sequence, and call timing best-effort; use post/composition for exact sync.
