# Video Prompt-Quality Checklist

Use this before any final `shot-plan.video-generation` Preview approval, estimate, paid
run, or rerun. If any relevant answer is "no", revise the prompt first.

## Mechanical Grounding

- Did the agent rerun `generation context --purpose
  shot-plan.video-generation --target project
  --authored-from-shot-plan <shot-plan-id> --json` immediately before final
  prompt/spec work?
- Does the spec target Project and preserve the exact Shot Plan association?
- Does every included reference preserve its context-returned guide placement,
  including Shot scope and subject where present?
- Does every included reference assign `providerField` to a file-backed media
  field in the selected model descriptor?
- Did validation pass, and did the agent inspect the generated
  `providerPayload` for actual field assignment and token order?
- Does every provider-specific image, video, and audio mention in the prompt
  correspond to an actual provider input and use the selected route's exact
  syntax, such as `@Image1` or `Image 1`?
- Does every provider input have a narrow role in the prompt?
- Does the prompt match the selected direct endpoint and authored values such
  as duration?
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

- Does the prompt preserve hard constraints from current context facts, user
  corrections, visible storyboard content, earlier creative briefs, and
  relevant reference images?
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
- If exact waveform, word timing, or lip sync is required, has the agent chosen
  a composition, lipsync, or talking-head workflow instead?

## Endpoint Support

- Does the selected model descriptor support every authored value and assigned
  provider field in the spec?
- If the endpoint does not support a separate negative field, are critical
  exclusions written into the main prompt?
- If the provider rejects a field, has the prompt been reread and rechecked
  rather than mechanically deleting the field and continuing?
