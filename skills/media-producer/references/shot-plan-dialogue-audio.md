# Shot Plan Dialogue Audio

Use `shot-plan.dialogue-audio` for one independent Dialogue Audio Take attached
to one exact Shot Plan. A Take represents either one canonical screenplay Turn
or one consecutive inclusive range. Do not group, combine, or associate Takes
after attachment.

## Read the numbered Turn context

Resolve the exact Shot Plan, then read its current generation context:

```bash
renku generation context \
  --purpose shot-plan.dialogue-audio \
  --target shot-plan:<shot-plan-id> \
  --json
```

Use the canonical Turn numbers returned by Core for this request. The numbers
are simple current screenplay references. Do not create stable Turn ids,
staleness validation, repair behavior, or relational links when the screenplay
later changes.

Accept one Turn number (`3`) or one consecutive range (`2-4`). If the user asks
for disjoint Turns, stop and ask them to split the request into separate Takes.
Seed Audio and ElevenLabs may both generate a one-Turn Take. Multi-Turn
generation uses Seed Audio.

## Purpose-specific configuration

Use the shared
[inline generation configuration](inline-generation-configuration.md) from the
main Media Producer flow. Start with the Project Settings Audio provider and
the default Cast Voice sample for each current speaker. Let the user choose
another compatible Cast Voice as a configuration control; the choice applies
only to this generation.

For ElevenLabs, expose current supported voice settings such as speed,
stability, similarity, style, speaker boost, language override, and output
format when the live schema exposes them. For Seed Audio, expose provider,
model, selected reference sample per speaker, output format, sample rate, speed,
volume, pitch, and multilingual when present in the live schema.

## Author one exact Take

Read the selected provider route, canonical model guide, and live schema. Keep
the spoken screenplay text exact. Use performance annotations and provider
controls only to express delivery; do not rewrite the dialogue.

For ElevenLabs, the selected Cast Voice must contain a usable opaque identity
owned by the provider Skill. Never infer or invent a voice id from Cast notes.

For Seed Audio:

- select one Cast Voice sample per distinct speaker and place the local markers
  in `audio_urls` order;
- mention those references as `@Audio1`, `@Audio2`, and `@Audio3` in the same
  order;
- preserve screenplay order and make each speaker assignment explicit;
- stop and ask the user to narrow or split the request when it contains more
  than three distinct speakers;
- stop and ask the user to narrow or split the request when the authored prompt
  would exceed 2,048 characters or the result is likely to exceed two minutes;
  and
- never omit a speaker reference or replace continuity with a text-invented
  voice to get under a model limit.

## Execute and attach

Validate, Preview when required, obtain conversational confirmation, execute
one provider request, and inspect its single output. Preserve the exact safe
provenance, then attach the accepted file:

```bash
renku media import \
  --purpose shot-plan.dialogue-audio \
  --target shot-plan:<shot-plan-id> \
  --turns <N-or-N-M> \
  --source <project-relative-output> \
  --provenance tmp/operations/media-generation/<unique-provenance>.json \
  --json
```

The new Take is an independent Media Card. Its stored facts are only the Shot
Plan, inclusive Turn range, exact file, selection state, and generation
provenance. It is not automatically combined with any other Take.

Selection is multi-select and user-owned. Re-read Generation Context after
attachment when the next video request depends on audio references. Selected
single-Turn and multi-Turn Takes remain exact, separate reference URLs; never
concatenate them or infer a preferred combination.
