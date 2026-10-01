# Seed Audio 1.0

Seed Audio can create speech alongside sound effects and ambience as one audio
scene. Keep the prompt focused on the requested deliverable: for clean dialogue,
make the recording space quiet; for a designed scene, describe only the
environmental sounds and cues that matter. Provider adapters own native fields,
file markers, and reference ordering.

## Documented capabilities and route limits

ByteDance describes prompting for the speaker, emotion, delivery, dialogue,
environment, sound cues, and how a scene unfolds. Its July 2026 product page
reports prompt-level dialogue timing with 100 ms precision and up to two minutes
of audio per pass. Treat that timing as line-entry direction, not a guarantee of
word-level alignment or lip sync.

For Fal, the current route schema accepts up to three reference clips, each at
most 30 seconds, and maps their order to `@Audio1`, `@Audio2`, and `@Audio3`.
Follow the selected provider adapter for its actual fields and marker syntax;
these Fal limits and tokens are not universal to every Seed Audio route.

## Writing dialogue and sound scenes

As an agent recommendation, write a short audio script rather than a loose list
of traits. Give each speaker a stable identity or reference, a distinct delivery
that suits the line, and exact dialogue. Add a small number of useful sound cues
with clear placement. Keep sound design subordinate when speech must remain
clear.

Original, untested Fal-style example; use the selected adapter's marker form:

```text
Quiet room tone throughout. Mara, voiced by @Audio1, speaks evenly: "The east
door is open." A short pause. She lowers her voice: "We should leave now."
Keep the words clear; no music or other voices.
```

Do not assign one sample to contradictory identities or bury speech under
unrelated sound cues. If a result confuses speakers, simplify the scene, give
each reference a single consistent role, and make turn order explicit. If a
clean dialogue request acquires ambience or music, say that the background is
silent or nearly silent and remove unnecessary environmental cues. These are
revision strategies, not guaranteed model behavior.

## Cast Voice sample recommendation

For the separate Cast Voice sample workflow, the current Media Producer guide
targets about 30 seconds and 70–85 words of actual speech. That is a practical
sample-length recommendation also described in Fal's June 2026 workflow
article, not a Seed Audio model limit. Count only spoken words, keep one speaker
and a consistent delivery, and add meaningful in-character speech rather than
stretching a short line with silence. The user's voice direction still controls
the sample's character and performance.

## Request limits and evidence

ByteDance's [Seed Audio announcement](https://seed.bytedance.com/en/blog/from-speech-to-audio-creation-introducing-the-seed-audio-1-0-audio-creation-model)
(2026-07-20) describes full-scene generation, dialogue timing, a two-minute
single-pass maximum, and support for 20+ languages. It supersedes the language
statement in Fal's earlier June article. Specify the requested language when
useful, but use the selected route's current documentation for actual support.

Fal's [route schema](https://fal.ai/models/bytedance/seed-audio-1.0/api) was
checked 2026-09-30 for reference count, duration, and token order. Fal's
[workflow article](https://fal.ai/learn/tools/how-to-use-seed-audio) (2026-06-26)
also reports a 2,048-character prompt limit, but the current schema page does
not expose that limit. Confirm the selected route's live constraints before
shortening authored dialogue. Do not treat promotional examples or the Fal
wrapper's limits as guarantees for another provider.
