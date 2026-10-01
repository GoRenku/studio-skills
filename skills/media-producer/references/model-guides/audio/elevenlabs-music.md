# Eleven Music v1 Prompt Guide

This guide covers the bundled `music_v1` route's prompt-based workflow. Write a
compact musical brief that makes the intended sound easy to distinguish:
purpose or scene, dominant style, mood, lead instruments, vocal presence, and
the broad change in energy from opening to ending. Prefer a few compatible
choices over a list of unrelated genre labels.

## Documented request shape

ElevenLabs documents `prompt` as a simple text request. The API keeps
`music_length_ms` and `force_instrumental` as separate request fields; use those
when the selected route exposes them instead of relying on prose to guarantee
duration or instrumental output. The API also distinguishes a prompt from a
`composition_plan`; they cannot be supplied together. A request written as
prose should not be described as a beat-accurate arrangement plan.

## Agent recommendations

Choose concrete musical details that serve the cue. For example:

```text
An instrumental suspense cue for a quiet night crossing. Begin with a low,
steady pulse and sparse muted strings; gradually add a soft metallic rhythm as
the danger becomes clear. Keep the texture restrained and end on an unresolved
chord.
```

This is an original starting point, not a tested `music_v1` recipe. If a result
misses the target, revise one dimension at a time: replace a vague mood with a
more specific one, name the lead sound, simplify competing styles, or make the
energy change clearer. Do not keep adding adjectives when the real conflict is
between instructions such as “minimal” and “wall of sound.”

Use qualitative sequence words such as “begin,” “gradually add,” and “end” to
describe musical development, but treat them as creative direction. Do not
promise exact bar placement, a precise transition time, or frame synchronization
from those words. Put duration and instrumental controls in their native fields
when available; use composition for exact editorial timing.

## Sources and evidence limits

The [ElevenLabs Compose API](https://elevenlabs.io/docs/api-reference/music/compose)
(accessed 2026-09-30) documents the `music_v1` prompt path and its separate
duration, instrumental, and composition-plan inputs. The detailed
[ElevenLabs music best-practices guide](https://elevenlabs.io/docs/overview/capabilities/music/best-practices)
(accessed 2026-09-30) is written for the newer ElevenCreative workflow, and
the [Music v2 changelog](https://elevenlabs.io/docs/changelog/2026/6/15)
(2026-06-15) distinguishes its composition-plan workflow from the prompt-based
v1 flow. This refresh found no provider-published, v1-specific prompting cookbook. The
musical wording advice and example above are therefore agent recommendations,
not documented guarantees for `music_v1`; do not transfer v2/v2.5 controls or
claims to this route.
