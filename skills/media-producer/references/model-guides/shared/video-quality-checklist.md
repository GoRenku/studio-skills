# Video Prompt-Quality Checklist

Use this before the final Preview confirmation, paid execution, recovery, or
deliberate regeneration for `shot-plan.video-generation`. If any relevant
answer is "no", revise the request first.

## Mechanical Grounding

- Did the agent reread the exact Shot Plan and current domain context immediately
  before final request work?
- Will attachment target Project and preserve the exact weak Shot Plan
  `authoredFrom` association?
- Is every selected reference deliberately placed at the exact native media
  field documented by the provider Skill?
- Did `renku generation validate` pass, and did the agent inspect the reviewed
  provider-native request for actual field assignment and token order?
- Does every provider-specific image, video, and audio mention in the prompt
  correspond to an actual provider input and use the selected route's exact
  syntax, such as `<IMAGE_1>` or `Image 1`?
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

- Are wording, voice identity, visible/off-screen speaker and mouth synchronization
  reviewed independently, rather than inferred from a matching transcript?
- For multiple clips, does `../../shot-plan-video/scene-segmentation.md` account
  for actual delivered material and all remaining words/actions before continuation?
- Is raw footage preserved without automatic trims, audio replacement or stretching?
- Are unlocked Previs timing differences distinguished from incomplete speech or
  broken mouth/audio synchronization?

- Is exact narration or dialogue copied exactly when known?
- Is every supplied audio token named with a narrator, speaker, ambience, or
  sound-character role?
- Is narration/dialogue timing attached to concrete shots, panels, or beats
  unless using an exact-sync workflow?
- Are key sound events and ambient bed stated concretely when audio matters?
- If exact waveform, word timing, or lip sync is required, has the agent chosen
  a composition, lipsync, or talking-head workflow instead?

## Endpoint Support

- Does the selected provider Skill guide and live validation support every
  authored value and native provider field in the request?
- If the endpoint does not support a separate negative field, are critical
  exclusions written into the main prompt?
- If the provider rejects a field, has the prompt been reread and rechecked
  rather than mechanically deleting the field and continuing?
