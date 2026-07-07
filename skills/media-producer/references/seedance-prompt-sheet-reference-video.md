# Seedance Storyboard Reference Video

Use this only for final `shot.video-take` prompting when all of these are true:

- the model family is Seedance;
- the active route is reference-to-video;
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

Every supplied image, video, or audio token needs a plain provider-facing role
in the final prompt. Use terms the model can act on: storyboard, character
reference, location reference, style reference, prop reference, motion
reference, narrator voice, ambience, or sound reference. Do not call the
storyboard image a "video prompt sheet" in the provider prompt. That is a Renku
purpose name, not useful model-facing language.

## Storyboard Operating Rule

When the storyboard is a provider image input, name it by token and tell
Seedance how to read it. The prompt must describe the visible storyboard panels
directly, not only say "follow the sheet."

```text
@Image1 is the storyboard for this video. Read it as an ordered sequence of panels, not as the opening frame and not as a graphic layout to copy.

CRITICAL STORYBOARD RULE:
Turn the storyboard panels into video beats in order. Describe each visible panel in the prompt:
- Panel 1 (<position on sheet>): <what is visibly happening, framing, camera direction, subject motion, environment, and any narration/dialogue timing>.
- Panel 2 (<position on sheet>): <same>.
- Panel 3 (<position on sheet>): <same>.
- Panel 4 (<position on sheet>): <same>.

The final video must be one cinematic scene, never a split-screen, collage, grid, poster, panorama, or still image of the storyboard page. Do not render storyboard borders, arrows, labels, captions, metadata rows, UI, shot ids, or text from the storyboard as on-screen graphics.
```

Adjust the token and panel count if the storyboard is not `@Image1` or does not
have four panels. The panel-by-panel description is mandatory.

If the provider preview also includes a Location Sheet, Lookbook Sheet, or other
board-style image, keep its role narrow. Do not let it compete with the
storyboard:

```text
@Image2 is only a location continuity reference for architecture, scale, materials, and geography. Do not use @Image2 as the first frame, do not copy its board layout, and do not introduce its labels or captions.

@Image3 is only a visual style reference for palette, light, texture, and cinematic finish. Do not copy its layout or text.
```

## Adaptive Prompt Sections

Do not copy every section into every prompt. Use the shortest set that preserves the controls the take actually needs.

Always consider:

- `REFERENCES`: name every supplied token and its role.
- `CRITICAL STORYBOARD RULE`: say the storyboard is an ordered sequence of video beats, not a first frame or layout to copy.
- `STORYBOARD PANELS AS VIDEO BEATS`: describe each visible panel by position and content, then translate it into continuous action.
- `GEOGRAPHY AND CONTINUITY`: preserve only the location facts that matter for the shot; avoid academic geography language when a concrete visual instruction is enough.
- `ON-SCREEN TEXT AND STORYBOARD ARTIFACTS`: forbid storyboard text and layout from appearing.
- `NEGATIVE CONSTRAINTS`: put important negatives in the main prompt when the route does not support a separate negative field.

Include only when relevant:

- `QUALITY`, when fidelity or sharpness is a real risk.
- `LOOK / VISUAL LANGUAGE`, only when a lookbook or style reference adds a concrete style instruction not already clear from the storyboard.
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
- For best-effort native audio, place narration or dialogue inside the
  storyboard panel beats so Seedance has timing intent.

Recommended wording:

```text
Use @Audio1 as the narrator voice/style reference. The narrator says exactly:
"..."
Timing is best-effort inside this native audio generation: the line should begin during storyboard Panel 2, continue through Panel 3, and complete during Panel 4.
```

## Hard-Constraint Transfer

Before estimate or run, compare the final prompt against hard constraints from:

1. current take authoring context and shot data for this take;
2. user corrections;
3. storyboard generation spec or brief, if available;
4. visible storyboard panels, notes, and imagery;
5. Location Sheet, Character Sheet, and Lookbook reference images only when they
   are actually sent to the provider and needed for this take.

Preserve constraints such as exact prop or vehicle counts, required foreground/background geography, forbidden landmarks or zones, side of frame, line of action, exact spoken words, final frame behavior, and "no text overlay" rules.

If the final prompt contradicts a hard constraint, stop and resolve the contradiction before estimating or running.

## Prompt-Quality Checklist

A Seedance storyboard-reference final prompt is prompt-quality ready only when:

- the storyboard is named by its actual provider token;
- the provider prompt calls it a storyboard, not a "video prompt sheet";
- every supplied image, video, and audio token has a role;
- every role is scoped narrowly enough that extra board images do not compete
  with the storyboard or become accidental first frames;
- the prompt interprets the storyboard according to the agent-authored brief and visible content;
- each visible storyboard panel is described by position and translated into a video beat;
- the prompt forbids storyboard layout, borders, labels, arrows, captions, metadata rows, and UI from appearing unless the user explicitly wants graphic overlays;
- visible story, motion, camera, and tempo cues are expressed as video direction;
- known narration or dialogue text is copied exactly;
- audio timing is described as best-effort unless the work is using an exact-sync workflow;
- hard constraints from the storyboard brief or visible storyboard are preserved;
- the prompt does not contradict the storyboard, take context, or user corrections;
- unsupported fields such as `negativePrompt` are not used when the active route rejects them, and key negative constraints are instead written into the main prompt.

If any item fails, revise the prompt before cost estimate or paid generation.

## Common Failure Fixes

Storyboard becomes collage, panorama, split-screen, or visible page:

- Cause: the prompt names the storyboard but does not describe each visible panel
  and convert those panels into video beats.
- Fix: rewrite the final prompt around `STORYBOARD PANELS AS VIDEO BEATS`. Say
  what is visible in Panel 1, Panel 2, Panel 3, and Panel 4, then say how the
  camera and action move between them. Forbid visible page layout, borders,
  labels, arrows, and captions.

Prompt contradicts the storyboard:

- Cause: the final prompt was drafted from memory or a summary.
- Fix: inspect the storyboard image and compare against its brief before estimate
  or run.

Location or lookbook board takes over the video:

- Cause: the prompt gives a Location Sheet or Lookbook Sheet the same weight as
  the storyboard, or describes it as a source frame.
- Fix: describe those references narrowly. Location Sheet means place continuity
  only. Lookbook means style only. Do not call either one the first frame unless
  the active route explicitly uses a first-frame input.

Video feels like nudged still pictures:

- Cause: panel content is present, but motion, camera, tempo, and environmental movement are weak.
- Fix: add concrete continuous camera motion, subject movement, parallax, atmosphere, secondary motion, and final motion state.

Narration misses timing:

- Cause: native audio was treated as exact sync.
- Fix: keep exact words in the prompt, place them in panel sequence, and call timing best-effort; use post/composition for exact sync.
