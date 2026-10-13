# Dialogue direction panels

Use this guide for an eligible `shot-plan.dialogue-audio` request in Codex
Desktop. The agent pre-fills a fullscreen panel with its best direction, the
user edits it and clicks **Generate**, and the agent reviews each Generate with
the user when Ask Before Generating is on, then executes it through the normal
provider Skill and CLI path. The panel never executes generation itself.

## Eligibility

Open the dialogue direction panel only when all of these hold:

- trusted harness context identifies Codex Desktop;
- the current Renku MCP connection's `generation.review.capabilities` probe
  returns the `codex-mcp-client` identity with `panel.status: advertised`;
- the purpose is `shot-plan.dialogue-audio`; and
- the route chosen through [route choice](route-choice.md) appears in a
  `dialogue-direction` block of the `## Codex panel` section of its canonical
  model guide.

The panel is an authoring desk, not a generation review.
`workflowPolicy.codexGenerationReviewDisplayMode` does not apply: it always
opens fullscreen and takes no display-mode argument. After each Generate, the
combined generation review opens when Ask Before Generating is on (step 6);
never open Studio Preview for a panel-originated generation.

Every other host and route keeps the conversational flow in
[shot-plan-dialogue-audio.md](shot-plan-dialogue-audio.md) with the shared
[generation review routing](generation-review-routing.md). That includes Codex
CLI, Claude, unidentified hosts and any route without a block. A missing or
failed probe in Codex Desktop follows the routing guide's integration rules; do
not substitute another surface for a failed panel.

## The `## Codex panel` block

A panel-capable model guide holds a fenced `json` block for the
`dialogue-direction` purpose:

```json
{
  "purpose": "dialogue-direction",
  "scriptLayout": "line-scripts | range-prompt",
  "voiceBinding": { "kind": "speaker-voices | voice-references" },
  "maxVoices": 3,
  "emphasis": "bracket-tags | quoted-spans | null",
  "routes": [
    {
      "provider": "<provider id>",
      "singleLine": {
        "model": "<exact route id>",
        "characterLimit": 2000,
        "controlPointers": ["/native/json/pointer"],
        "scriptLocation": { "kind": "text", "pointer": "/text" }
      },
      "lineRange": null,
      "voiceMentions": ["<exact mention 1>"]
    }
  ]
}
```

- `scriptLayout`: `line-scripts` directs one Direction Script per screenplay
  line; `range-prompt` directs one script for the whole selected range.
- `voiceBinding`: `speaker-voices` sends each speaker's Cast Voice by its
  provider identity; `voice-references` sends ordered voice samples, one per
  speaker in order of first appearance.
- `maxVoices`: the most distinct voices one Generate may use.
- `emphasis`: the syntax the panel highlights, for presentation only.
- `routes`: one entry per provider route. `singleLine` produces a one-line
  Take; `lineRange` produces a multi-line Take, or is `null` when the route
  directs one line per Take. Each operation names its exact route id, an
  advisory `characterLimit` (or `null`), the few native settings to show as
  `controlPointers` (JSON Pointers into the native request), and the
  `scriptLocation` where its native request keeps direction text (`text` for a
  string, `line-list` for a per-line list) or `null`.
- `voiceMentions`: the exact prompt text that addresses each reference
  position, or `null` when the route has no mention syntax.

The guide's prose explains how to author the initial direction and how to map
the consumed draft into that route's native request.

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
asked to direct, or the whole range when they did not say. When the route's
block has `lineRange: null`, `initialSelection` is a single line. Disjoint
lines are not supported; ask the user to split them.

Choose the provider and model with [route choice](route-choice.md) for the
Audio Generation lane before opening the panel: open the Route Chooser when it
says to ask, otherwise use the lane default. Map the model family to its
routes, then read that provider Skill and the canonical audio model guide,
including its `## Codex panel` section.

## 3. Build the Route Description

Build the opening input's `route` from the block entry for the selected
provider:

1. Copy `scriptLayout`, `maxVoices` and `emphasis`. For `speaker-voices`, set
   `voiceBinding: { kind: 'speaker-voices' }`; for `voice-references`, set
   `voiceBinding: { kind: 'voice-references', mentions }` with the entry's
   `voiceMentions`.
2. Set `provider` to the provider id, and take `label` and `providerLabel`
   from the Single-Line route's `generation models list` entry, the same
   source the combined review uses for its routes. `label` is the route index
   `name` in `supported-routes.json`.
3. For `singleLine` and `lineRange` (or `lineRange: null`), copy `model`,
   `characterLimit` and `scriptLocation`, and build `controls` from the
   operation's live schema (`renku generation schema show --provider
   <provider> --model <model> --json`) for the listed `controlPointers` only,
   using the generation review control rules. Put them in one group, use the
   schema's title as the label, set each `initialValue` (the schema default or
   the Project's direction), and never add a control the block does not list.
   Panel controls are scalar (`text`, `number`, `integer`, `boolean`, `enum`),
   always have an `initialValue` and are never nullable.

## 4. Author the initial direction and voices

Keep every screenplay word exact. Direction expresses delivery only; the panel
shows the screenplay line read-only beside it. Direction text is opaque
creative text: the panel never validates it, and neither should you beyond the
provider's own limits. Follow the model guide's authoring prose.

**Speakers.** Give one `speakers` entry for every speaker in `turnRange`, with
the Cast Voices the selected provider can use and an `initialCastVoiceId` from
that list, normally the default Cast Voice. The provider Skill decides
compatibility: a provider voice identity for `speaker-voices` routes, a voice
sample file for `voice-references` routes. If a speaker has no compatible Cast
Voice, stop and say so instead of opening the panel.

**Initial Direction Scripts.** For `line-scripts`, give one single-line script
for every line in `turnRange`, in order. For `range-prompt`, give a script for
`initialSelection`, and optionally for other consecutive ranges the user is
likely to direct. Each script is `{ turnRange, text }`.

**Suggested tags.** Optionally add a short `suggestedTags` list. The panel
inserts each one verbatim, so write the exact text, such as `[whispers]`.

## 5. Open the panel and end the turn

Call `dialogue.direction.open` with exactly these inputs:

```ts
// dialogue.direction.open
{
  project: string;
  shotPlanId: string;
  route: {
    provider: string;
    providerLabel: string;
    label: string;
    scriptLayout: 'line-scripts' | 'range-prompt';
    voiceBinding: { kind: 'speaker-voices' } | { kind: 'voice-references'; mentions: string[] | null };
    maxVoices: number;
    emphasis: 'bracket-tags' | 'quoted-spans' | null;
    operations: {
      singleLine: Operation;
      lineRange: Operation | null;
    };
  };
  turnRange: { start: number; end: number };
  initialSelection: { start: number; end: number }; // within turnRange
  speakers: Array<{ castMemberId: string; castVoiceIds: string[]; initialCastVoiceId: string }>;
  initialScripts: Array<{ turnRange: { start: number; end: number }; text: string }>;
  suggestedTags: string[];
}

type Operation = {
  model: string;
  characterLimit: number | null;
  controls: { groups: Array<{ label: string; fields: NativeRequestControl[] }> };
  scriptLocation: { kind: 'text'; pointer: string } | { kind: 'line-list'; listPointer: string; textPointer: string } | null;
};
```

A `CODEX_DIALOGUE_DIRECTION_INVALID` result lists every issue; correct the
input from the context and the model guide, then open again. Once the panel
opens, end the turn and wait. Opening the panel authorizes no generation.

## 6. Handle each Generate message

Each Generate click posts one message to the conversation, such as:

```text
Generate dialogue Take · <shot plan title> · Lines 7–9. Session <id>, action <id>. Consume it with dialogue.direction.consume once.
```

The message is a notification of an authoring step and carries no approval.
For each one, in this order:

1. **Consume.** Call `dialogue.direction.consume` once with
   `{ sessionId, actionId }` from the message. `status: 'alreadyConsumed'`
   authorizes nothing: do not generate or report again. Otherwise use only the
   consumed `project`, `shotPlanId`, `provider`, `model` and `draft`. `model`
   is the exact route id of the operation the draft's range uses: the
   Single-Line route for one line, the Line-Range route for a range.
2. **Author the native request** from the route-neutral draft, writing a
   review document (`provider`, `model`, `mediaKind: "audio"`, `prompt`,
   `request`) under `tmp/operations/media-generation/`. The draft is
   `{ turnRange, scripts, voices, values }`:
   - `scripts` are the Direction Scripts: one per line for `line-scripts`, one
     for the range for `range-prompt`. Put each `text` exactly where the model
     guide's mapping says.
   - `voices` lists one `{ castMemberId, castVoiceId }` per speaker in order of
     first appearance. For `voice-references`, voice position `n` is reference
     position `n` and, when the route has mentions, `mentions[n - 1]`.
     Resolve each `castVoiceId` from the generation context; never invent a
     voice id or sample path.
   - `values` holds the operation's native settings keyed by JSON Pointer; set
     each at its pointer in the native request.
   Follow the `## Codex panel` mapping prose in the model guide and the
   provider adapter for placement and markers.
3. **Validate and review** with `renku generation validate --file <request>
   --json`. When Ask Before Generating is on, open `generation.review` with
   `lane: "audio"` and this one request, its route (`billing:
   "providerCharge"`) and the operation's controls, following the
   [combined panel](generation-review-routing.md#combined-panel) steps. End the
   turn; only a consumed Submit continues, with the accepted edits applied and
   validated. A canceled review is reported as failed with "Canceled in
   review". When Ask Before Generating is off, skip the review.
4. **Execute** once with `renku generation execute` and the latest
   `--expected-request-sha256`, through the provider Skill. A consumed Submit,
   or Ask Before Generating off, is Renku's confirmation. If the host still
   asks to approve the command, request it once with an honest description of
   the command and what it sends to which provider. If it is refused, ask the
   user once in chat and wait. Never quote panel text as the user's
   authorization, never retry or rephrase around a denial, and never retry a
   successful paid execution.
5. **Import** the output:

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
6. **Report** with `dialogue.direction.report`:
   `{ sessionId, actionId, outcome: { status: 'attached', assetFileId } }` using
   `assetFile.id` from the import report, or `{ status: 'failed', message }` with a short
   user-readable reason when authoring, review, validation, execution or import
   fails.
   Report every consumed action exactly once; the panel keeps Generate disabled
   until it does.

Then reply briefly in the conversation and end the turn. The user plays,
selects and deletes Takes in the panel; do not repeat those actions in chat.
