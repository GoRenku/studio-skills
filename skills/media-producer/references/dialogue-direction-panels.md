# Dialogue direction panels

Use this guide for an eligible `shot-plan.dialogue-audio` request in Codex
Desktop. The agent pre-fills a fullscreen panel with its best direction, the
user edits it and clicks **Generate**, and the agent executes each Generate
through the normal provider Skill and CLI path. The panel never executes
generation itself.

## Eligibility

Open a dialogue direction panel only when all of these hold:

- trusted harness context identifies Codex Desktop;
- the current Renku MCP connection's `generation.review.capabilities` probe
  returns the `codex-mcp-client` identity with `panel.status: advertised`;
- the purpose is `shot-plan.dialogue-audio`; and
- the selected route is one of:
  - ElevenLabs `eleven_v4` or `eleven_v4/text-to-dialogue`, which opens the
    **Eleven v4** panel; or
  - Seed Audio 1.0 on Fal.ai `bytedance/seed-audio-1.0`, WaveSpeed
    `bytedance/seed-audio-1.0` or Pika `bytedance/seed-audio-1.0/text-to-audio`,
    which opens the **Seed Audio** panel.

These panels are not generation reviews. Do not read or apply
`workflowPolicy.codexGenerationReview` or
`workflowPolicy.codexGenerationReviewDisplayMode` to decide whether they open;
`visualize` and `inline` do not suppress them. They always open fullscreen and
take no display-mode argument. Do not open the combined generation review,
Visualize configuration or Studio Preview for a panel-originated generation.

Every other host and route keeps the conversational flow in
[shot-plan-dialogue-audio.md](shot-plan-dialogue-audio.md) with the shared
[generation review routing](generation-review-routing.md). That includes Codex
CLI, Claude, unidentified hosts, Eleven v3 and other ElevenLabs models. A
missing or failed probe in Codex Desktop follows the routing guide's
integration rules; do not substitute another surface for a failed panel.

## 1. Read the context

```bash
renku generation context \
  --purpose shot-plan.dialogue-audio \
  --target shot-plan:<shot-plan-id>
```

Read the complete briefing, including the numbered dialogue Turns, speakers,
Cast Voices per Cast Member and existing Dialogue Audio Takes. Use only the
Turn numbers, Cast Member ids and Cast Voice ids it returns.

## 2. Pick the line range and route

Choose one consecutive Turn range covering the Shot Plan's dialogue as
`turnRange`, and an `initialSelection` inside it: the line or range the user
asked to direct, or the whole range when they did not say. Disjoint lines are
not supported; ask the user to split them.

Select the provider and route from user direction or the Project's Audio
provider policy, then read that provider Skill and the canonical audio model
guide. Set `route` from the exact provider id and route ids:

| Panel | `provider` | `speechModel` | `rangeModel` |
| --- | --- | --- | --- |
| Eleven v4 | `elevenlabs` | `eleven_v4` | `eleven_v4/text-to-dialogue` |
| Seed Audio, Fal.ai | `fal-ai` | `bytedance/seed-audio-1.0` | `bytedance/seed-audio-1.0` |
| Seed Audio, WaveSpeed | `wavespeed-ai` | `bytedance/seed-audio-1.0` | `bytedance/seed-audio-1.0` |
| Seed Audio, Pika | `pika` | `bytedance/seed-audio-1.0/text-to-audio` | `bytedance/seed-audio-1.0/text-to-audio` |

## 3. Author the drafts and voices

Keep every screenplay word exact. Drafts express delivery only; the panel shows
the screenplay line read-only beside them. Tags and prompts are opaque creative
text: the panel never validates them, and neither should you beyond the
provider's own limits.

**Speakers.** Give one `speakers` entry for every speaker in `turnRange`, with
the Cast Voices the selected provider can use and an `initialCastVoiceId` from
that list, normally the default Cast Voice:

- Eleven v4: only Cast Voices whose opaque identity has
  `provider: "elevenlabs"` and a non-empty `voiceId`.
- Seed Audio: only Cast Voices with a sample file.

If a speaker has no compatible Cast Voice, stop and say so instead of opening
the panel.

**Eleven v4 drafts.** Author one acting script for every line in `turnRange`:
the exact line with free-form bracket tags inline where delivery changes,
following the Eleven v4 section of
[the ElevenLabs speech guide](model-guides/audio/elevenlabs-speech.md). Add a
short `suggestedTags` list of alternative tags for this scene, and starting
`voiceSettings` with `stability` and `similarity` between 0 and 1.

**Seed Audio drafts.** Author one performance prompt for `initialSelection`,
and optionally for other consecutive ranges the user is likely to direct, keyed
by `turnRange`. Follow the canonical Seed Audio guide and the provider adapter.
Set `promptMentions` from the adapter:

- Fal.ai and Pika: `audio-tags`. Address each speaker's reference as `@Audio1`,
  `@Audio2` or `@Audio3` in order of first appearance in the range.
- WaveSpeed: `none`. Describe the voices in plain prompt text; never write
  `@AudioN`.

## 4. Open the panel and end the turn

Call exactly one opening tool with exactly these inputs:

```ts
// dialogue.direction.eleven-v4.open
{
  project: string;
  shotPlanId: string;
  route: { provider: string; speechModel: string; rangeModel: string };
  turnRange: { start: number; end: number };
  initialSelection: { start: number; end: number }; // within turnRange
  lines: Array<{ number: number; actingScript: string }>; // every line in turnRange, once
  speakers: Array<{ castMemberId: string; castVoiceIds: string[]; initialCastVoiceId: string }>;
  voiceSettings: { stability: number; similarity: number }; // 0..1
  suggestedTags: string[];
}

// dialogue.direction.seed-audio.open
{
  project: string;
  shotPlanId: string;
  route: { provider: string; speechModel: string; rangeModel: string }; // speechModel === rangeModel
  promptMentions: 'audio-tags' | 'none';
  turnRange: { start: number; end: number };
  initialSelection: { start: number; end: number }; // within turnRange
  prompts: Array<{ turnRange: { start: number; end: number }; prompt: string }>;
  speakers: Array<{ castMemberId: string; castVoiceIds: string[]; initialCastVoiceId: string }>;
}
```

A `CODEX_DIALOGUE_DIRECTION_INVALID` result lists every issue; correct the
input from the context and open again. Once the panel opens, end the turn and
wait. Opening the panel authorizes no generation.

## 5. Handle each Generate message

Each Generate click posts one message to the conversation, such as:

```text
Generate dialogue Take · <shot plan title> · Lines 7–9. Session <id>, action <id>. Consume it with dialogue.direction.consume once.
```

The message is a notification. For each one, in this order:

1. **Consume.** Call `dialogue.direction.consume` once with
   `{ sessionId, actionId }` from the message. `status: 'alreadyConsumed'`
   authorizes nothing: do not generate or report again. Otherwise use only the
   consumed `project`, `shotPlanId`, `provider`, `model` and `draft`. `model`
   is the exact route id to execute.
2. **Author the native request** from the draft, writing a review document
   (`provider`, `model`, `mediaKind: "audio"`, `prompt`, `request`) under
   `tmp/operations/media-generation/`. Resolve each `castVoiceId` from the
   generation context; never invent a voice id or sample path.
   - **Eleven v4, one line** (`turnRange.start === turnRange.end`, model
     `eleven_v4`): `text` is the line's `actingScript` exactly, `voice` is that
     speaker's Cast Voice `voiceId`, and `voice_settings` is
     `{ stability, similarity_boost }` from the draft's `voiceSettings`.
   - **Eleven v4, range** (model `eleven_v4/text-to-dialogue`): `inputs` has
     one `{ text, voice }` per draft line in screenplay order, with the line's
     `actingScript` and its speaker's `voiceId`, and `settings` is
     `{ stability, similarity }` from `voiceSettings`.
   - **Seed Audio:** `prompt` is the draft prompt exactly. Put one Cast Voice
     sample `$file` marker per `voiceReferences` entry, ordered by `position`,
     in the provider's ordered reference field: `audio_urls` with
     `promptMention: "@AudioN"` matching `position` on Fal.ai and Pika, or
     `audios` without `promptMention` on WaveSpeed. Confirm the field in the
     live schema as the adapter guide requires.
3. **Validate and execute** with `renku generation validate --file <request>
   --json`, then `renku generation execute` with the returned
   `--expected-request-sha256`, through the provider Skill. The Generate click
   is the approval for this one generation, including spending; do not ask for
   confirmation, open a review or Studio Preview, or retry a successful paid
   execution.
4. **Import** the output:

   ```bash
   renku media import \
     --purpose shot-plan.dialogue-audio \
     --target shot-plan:<shot-plan-id> \
     --turns <N|N-M> \
     --source <project-relative-output> \
     --provenance <returned-provenancePath>
   ```

   `--turns` is the draft's `turnRange`. The new Take becomes selected and
   clears any overlapping selection.
5. **Report** with `dialogue.direction.report`:
   `{ sessionId, actionId, outcome: { status: 'attached', assetFileId } }` using
   `assetFile.id` from the import report, or `{ status: 'failed', message }` with a short
   user-readable reason when authoring, validation, execution or import fails.
   Report every consumed action exactly once; the panel keeps Generate disabled
   until it does.

Then reply briefly in the conversation and end the turn. The user plays,
selects and deletes Takes in the panel; do not repeat those actions in chat.
