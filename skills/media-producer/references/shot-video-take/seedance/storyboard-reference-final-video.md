# Seedance Storyboard Reference Final Video

Use this only for final `shot.video-take` prompting when all are true:

- model family is Seedance;
- selected direct endpoint is reference-to-video and its descriptor exposes
  `image_urls`;
- an exact storyboard/reference image keeps its context-returned
  `take-media` / `video-prompt` placement and is assigned
  `providerField: "image_urls"`;
- the agent is drafting, reviewing, estimating, or running the final video
  prompt.

Do not load this for ordinary text-to-video, first-frame, first/last-frame, or
non-Seedance endpoints.

For full prompt shapes, read
`../../../samples/shot-video-take/seedance-golden-prompts.md` when drafting or
reviewing a storyboard-reference final prompt for any of these cases:

- realistic continuous waypoint storyboard with narration/audio;
- hand-drawn or abstract action storyboard with supporting appearance
  references;
- dialogue storyboard with speaker audio references.

## Required Inputs

Before drafting the final prompt:

1. Run `generation context --purpose shot.video-take --target take:<take-id>
   --json` and read current facts, guide placements, and model descriptors.
2. Validate the exact spec, run `generation preview show`, and use its
   `providerPayload` as the field-assignment and token-order source of truth.
3. Inspect the actual storyboard/reference image, not only its title or
   thumbnail.
4. Read the earlier creative storyboard brief or generation spec if available.

Do not infer tokens from filenames, memory, card order, visible thumbnails, or
old run payloads.

Map references by the generated provider payload. For Seedance
reference-to-video, use modality-local array order:

- first `image_urls` entry: `@Image1`;
- second `image_urls` entry: `@Image2`;
- first `audio_urls` entry: `@Audio1`;
- first `video_urls` entry: `@Video1`.

Every supplied image, video, or audio token needs a plain provider-facing role.
Use terms the model can act on: storyboard, character reference, location
reference, style reference, prop reference, motion reference, narrator voice,
ambience, or sound reference.

Do not call the storyboard image a "video prompt sheet" in the provider prompt.
That is a Renku purpose name, not useful model-facing language.

Do not include an image token in the provider prompt just because that image was
used upstream to generate the storyboard. A realistic or final-style storyboard
often already contains the location, look, composition, and character continuity
from those upstream references. In that case, the final prompt should usually
name only the storyboard image plus any supplied audio/video references. Add
`@Image2`, `@Image3`, or later image tokens only when the final provider payload
actually includes them and they supply a necessary role that the storyboard does
not already carry.

If the provider payload unexpectedly contains redundant upstream
location/look/character images for a realistic storyboard, stop before prompt
approval and revise the final input selection or spec. Do not try to rescue
redundant image inputs by describing them as extra references.

## Pre-Draft Storyboard Audit

Before writing the final prompt, audit the visible storyboard:

- count panels or beats and read them in intended order;
- classify the structure:
  - continuous-take waypoints;
  - edited multi-shot sequence;
  - hand-drawn / pencil / previs;
  - realistic / final-style panels;
  - motion-annotated with arrows or timing rows;
  - text-heavy shot plan or script-board;
- note visible camera scale, angle, screen direction, foreground/background,
  action, geography, and audio/timing cue per panel;
- write a motion plan for every panel: camera movement, subject/action
  movement, environmental movement, speed, rhythm, and the transition into the
  next panel;
- list artifacts that must not render;
- list hard constraints and contradictions with project context;
- decide whether visible panel errors should be copied or corrected.

If the storyboard is not actually panelled, treat it as a shot plan, motion map,
or geography diagram and describe the visible regions or cues in order.

## Storyboard Operating Rule

When the storyboard is a provider image input, name it by token and tell
Seedance how to read it. The prompt must describe the visible storyboard
directly, not only say "follow the sheet."

Core wording:

```text
@Image1 is the storyboard blueprint for this video. Read it as ordered video
beats, not as the first frame and not as a page layout to copy. Each panel
controls camera angle, shot scale, framing, staging, screen direction, camera
movement, subject movement, pace, rhythm, and audio timing. Turn the panels into
footage in order.
```

Adjust token and panel count to match the generated provider payload and visible
image.

## Continuous-Take Storyboards

For continuous-take storyboards, use panels as physical waypoints in one
uninterrupted camera path:

```text
Use the panels as physical waypoints in one uninterrupted camera path. Do not
blend panels into one composite image, do not morph geography between panels,
and do not show the storyboard page. The camera must travel through a coherent
3D space from Panel 1 to Panel 2 to Panel 3 to Panel 4.
```

In each waypoint, state:

- where the camera is;
- what the camera is moving toward;
- what remains behind, ahead, left, and right when relevant;
- what the subject/action is doing;
- how fast the camera and subject move;
- how the rhythm changes or holds;
- what secondary motion carries the beat, such as smoke, cloth, dust, crowd
  drift, breath, water, light, or debris;
- how narration/dialogue/sound maps to the beat, if known.

Do not use edited-shot labels in a way that implies cuts unless the take is
actually edited. If labels help, call them `Waypoint 1`, `Waypoint 2`, etc.

Panel content summaries are not enough. A prompt that says only what appears in
each panel, without camera motion, subject motion, pace, rhythm, and sound, is
not ready for preview approval.

## Edited Multi-Shot Storyboards

For edited multi-shot storyboards, use explicit shot labels:

```text
Shot 1 / Panel 1: ...
Shot 2 / Panel 2: ...
Shot 3 / Panel 3: ...
```

Do not use "no cuts" for edited sequences. Tell Seedance whether cuts are
allowed or expected. Preserve the panel order and do not merge panels into a
single panorama.

## Hand-Drawn Versus Realistic Storyboards

Hand-drawn, pencil, clay, mannequin, animatic, or previs storyboard:

- use for staging, camera, shot scale, screen direction, action, timing, and
  rhythm;
- do not render sketch lines, blank mannequins, clay material, borders, arrows,
  labels, or page layout;
- use Production Lookbook, Character Sheets, Location Sheets, or written prompt for
  final appearance only when those references are actually attached or visible
  to the provider.

Realistic or final-style storyboard:

- use for staging, camera, shot scale, screen direction, action, timing, and
  rhythm;
- it may also carry final look, location, lighting, and composition if it is
  period-correct and visually aligned;
- still forbid page layout, borders, arrows, labels, captions, metadata rows,
  and UI;
- if the realistic storyboard contains known errors, explicitly say which errors
  not to reproduce.

## Reference Precedence

When multiple references are attached, keep roles narrow:

```text
@Image1 is the storyboard. It controls sequence, staging, camera, movement, and
timing.
@Image2 is only [location / character / look / prop] continuity. Do not use it
as an alternate storyboard, first frame, page layout, or different geography.
@Audio1 is the [narrator voice / ambience / sound-character] reference. Use it
for voice or sound character while following the beat timing written below.
```

The storyboard must not compete with location or lookbook boards. Supporting
references should be narrow and concrete.

For a realistic/final-style storyboard, do not add upstream location/look
references unless the generated provider payload truly includes them and the
storyboard is missing information they must supply. For a hand-drawn, clay, or
abstract storyboard, supporting character/location/look references are often
necessary because the storyboard controls motion and staging only.

## Required Prompt Content

Use the shortest set of sections that preserves the controls the take needs.
The information below must be present even if headings are renamed or omitted:

- `REFERENCES`: name every supplied token and its role.
- `CRITICAL STORYBOARD RULE`: say the storyboard is ordered temporal control,
  not a first frame or layout to copy.
- `STORYBOARD PANELS AS VIDEO BEATS`: describe each visible panel/beat by
  position and content, then translate it into video direction.
- `MOTION AND CAMERA`: specify camera path, framing, subject motion, parallax,
  movement pace, transitions between beats, secondary motion, and rhythm.
- `GEOGRAPHY / PERIOD CONTINUITY`: preserve spatial relationships and period
  constraints.
- `NARRATION AND AUDIO`: include every supplied audio token, exact words, voice
  role, sound bed, and beat-level timing target when known.
- `LOOK AND RENDER TRANSLATION`: explain final visual style when storyboard is
  hand-drawn or abstract.
- `ON-SCREEN TEXT AND STORYBOARD ARTIFACTS`: forbid page artifacts.
- `NEGATIVE CONSTRAINTS`: put critical exclusions in the main prompt because
  current Seedance 2.0 reference-to-video descriptors do not expose a separate
  negative-prompt field.

Avoid padding with irrelevant boilerplate. Overlong prompts with unrelated
sections can reduce generation quality.

## Artifact Suppression

The final video must be one cinematic video, never a split-screen, collage,
grid, poster, panorama, or still image of the storyboard page.

Do not render:

- storyboard borders;
- arrows;
- labels;
- captions;
- metadata rows;
- UI;
- shot ids;
- text boxes;
- panel grid;
- notation marks;
- page layout.

Arrows and labels describe motion only; they must not appear as visible marks in
the footage.

## Geography And Period Continuity

For each panel/beat, state where the camera is, where it goes, and what must not
swap sides.

Include period/era constraints when period drift would damage the shot. If the
storyboard contains useful geometry but visible historical or visual errors,
state which facts to use and which errors not to reproduce.

For the Bombardment failure mode, a prompt-quality pass should preserve
project/user-supplied constraints such as:

- use Byzantine Constantinople as a pre-Ottoman Christian imperial city, when
  that is the project context;
- do not add Ottoman mosque silhouettes, minarets, or later Ottoman skyline
  features unless the screenplay calls for them;
- treat Hagia Sophia as a Byzantine church form when visible for this period;
- keep cannon, siege field, wall, and city spatial relationships coherent.

Do not hard-code those specifics into other projects. Convert the current
project's own context into visible constraints.

## Narration And Audio

Seedance audio references are conditioning references, not exact editorial
tracks. Assign an exact audio file to `audio_urls`, and do not omit its
`@AudioN` token when the generated provider payload includes it and narration,
dialogue, voice character, ambience, or sound matters.

- Use `@AudioN` as narrator voice/style, speaker character, ambience, or
  sound-character reference.
- Put exact spoken text in the final prompt when the text is known.
- Place narration or dialogue inside storyboard panel beats so Seedance has
  timing intent.
- Do not write vague provider-facing audio caveats. Give concrete timing
  targets instead.

Recommended wording:

```text
Use @Audio1 as the narrator voice/style reference. The narrator says exactly:
"..."

Audio timing target: begin the line during storyboard Panel 2, carry it through
Panel 3, and complete it during Panel 4.
```

If exact waveform, word timing, or editorial sync is required, use a
composition, lipsync, or talking-head workflow.

## Hard-Constraint Transfer

Before estimate or run, compare the final prompt against hard constraints from:

1. current generation context facts and Shot data;
2. user corrections;
3. storyboard generation spec or brief, if available;
4. visible storyboard panels, notes, and imagery;
5. Location Sheet, Character Sheet, Lookbook, video, and audio references only
   when actually sent to the provider and needed for this take.

Preserve exact prop or vehicle counts, required foreground/background geography,
forbidden landmarks or zones, side of frame, line of action, exact spoken words,
final frame behavior, and no-text-overlay rules.

If the final prompt contradicts a hard constraint, stop and resolve the
contradiction before estimating or running.

## Prompt-Quality Gate

A Seedance storyboard-reference final prompt is ready only when:

- the storyboard is named by its actual provider token;
- the provider prompt calls it a storyboard, not a "video prompt sheet";
- every supplied image, video, and audio token has a role;
- every role is scoped narrowly enough that extra board images do not compete
  with the storyboard or become accidental first frames;
- the prompt interprets the storyboard according to the agent-authored brief and
  visible content;
- each visible storyboard panel/beat is described by position and translated
  into video direction;
- the prompt distinguishes continuous-waypoint structure from edited-shot
  structure;
- the prompt forbids storyboard layout, borders, labels, arrows, captions,
  metadata rows, UI, shot ids, and page layout from appearing unless the user
  explicitly wants graphic overlays;
- visible story, motion, camera, geography, and tempo cues are expressed as
  video direction;
- known narration or dialogue text is copied exactly;
- audio timing is tied to storyboard beats unless using an exact-sync workflow;
- hard constraints from the storyboard brief or visible storyboard are
  preserved;
- the prompt does not contradict storyboard, current context facts, or user
  corrections;
- fields absent from the selected endpoint descriptor are not authored, and key
  negative constraints are written into the main prompt.

## Common Failure Fixes

Storyboard becomes collage, panorama, split-screen, or visible page:

- Cause: prompt names the storyboard but does not describe each visible panel
  and convert panels into video beats.
- Fix: rewrite around ordered panels/beats, camera/action movement between them,
  and explicit page-artifact suppression.

Prompt contradicts the storyboard:

- Cause: final prompt was drafted from memory or summary.
- Fix: inspect storyboard image and compare against handoff brief before
  estimate or run.

Location or lookbook board takes over the video:

- Cause: prompt gives a Location Sheet or Lookbook Sheet the same weight as the
  storyboard, or describes it as a source frame.
- Fix: scope those references narrowly. Location Sheet means place continuity
  only. Lookbook means style only. Do not call either a first frame unless the
  selected endpoint explicitly receives it through a first-frame media field.

Video feels like nudged still pictures:

- Cause: panel content is present, but motion, camera, tempo, and environmental
  movement are weak.
- Fix: add concrete camera motion, subject movement, parallax, atmosphere,
  secondary motion, and final motion state.

Narration misses timing:

- Cause: native audio was treated as exact sync.
- Fix: keep exact words, place them inside the panel or waypoint sequence, and
  use post/composition for exact sync.

Audio reference is ignored or an arbitrary voice appears:

- Cause: the prompt includes narration/dialogue but does not name the supplied
  `@AudioN` token and its voice or sound role.
- Fix: add the audio token to the `REFERENCES` and `NARRATION AND AUDIO`
  sections, copy exact spoken words, and attach the line timing to the relevant
  storyboard beats.
