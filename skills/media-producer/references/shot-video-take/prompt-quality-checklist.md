# Final Video Prompt-Quality Checklist

Use this before any final `shot.video-take` preview approval, estimate, paid
run, or rerun. If any relevant answer is "no", revise the prompt first.

## Mechanical Grounding

- Did the agent re-read persisted take authoring context immediately before
  final prompt/spec work?
- Did the agent inspect provider preview or prepared inputs for actual token
  order?
- Does every `@ImageN`, `@VideoN`, and `@AudioN` in the prompt correspond to an
  actual provider input?
- Does every provider input have a narrow role in the prompt?
- Does the prompt match the active model, route, duration, and input mode?
- Does the prompt avoid adding upstream reference images that are not final
  provider inputs or that the storyboard already absorbed?

## Provider-Visible Language

- Does the prompt avoid hidden app language such as "selected", "approved",
  "current", "Studio", "card", "tab", asset ids, and filenames?
- Are app concepts translated into visible traits or provider tokens?
- Does the prompt avoid internal purpose names as creative concepts, especially
  "video prompt sheet"?

## Reference Roles

- Are supporting image/video/audio references scoped narrowly enough that they
  do not compete with the main input?
- If a storyboard is attached, is it the sequence/staging/motion control unless
  the user explicitly chose another role?
- Are location/lookbook/character references described as continuity inputs,
  not alternate first frames or alternate geographies?

## Storyboard-Reference Prompts

- Did the agent inspect the storyboard image, not only its title or thumbnail?
- Does the prompt identify the storyboard by provider token?
- Does the prompt call it a storyboard, storyboard reference, or shot plan?
- Does the prompt say the storyboard is an ordered temporal control document?
- Does the prompt describe every visible panel or beat in order when panels are
  present?
- Does each panel/beat include camera/framing, action, subject motion,
  geography, movement pace, rhythm, secondary motion, and timing/audio cues
  when present?
- Does the prompt distinguish continuous-waypoint structure from edited-shot
  structure?
- Does it forbid panel blending, composite starts, panoramas, morphing
  geography, and rendered page artifacts?
- Does it suppress arrows, labels, panel borders, text rows, captions, shot ids,
  metadata, UI, and storyboard page layout as visible footage?

## Continuity

- Does the prompt preserve hard constraints from take context, user corrections,
  dependency handoff briefs, visible storyboard content, and relevant reference
  images?
- Does it identify any visible storyboard errors that should not be reproduced?
- Does it include period/era constraints when period drift would damage the
  shot?
- Does it define spatial relationships that must not swap?
- Does it preserve line of action, screen direction, foreground/background
  relationship, prop counts, cast count, and final frame behavior when known?

## Audio

- Is exact narration or dialogue copied exactly when known?
- Is every supplied audio token named with a narrator, speaker, ambience, or
  sound-character role?
- Is narration/dialogue timing attached to concrete shots, panels, or beats
  unless using an exact-sync workflow?
- Are key sound events and ambient bed stated concretely when audio matters?
- If exact waveform, word timing, or lip sync is required, has the work been
  routed to a composition, lipsync, or talking-head workflow instead?

## Route Support

- Does the route support every field in the spec?
- If the route does not support a separate negative field, are critical
  exclusions written into the main prompt?
- If the provider rejects a field, has the prompt been reread and rechecked
  rather than mechanically deleting the field and continuing?
