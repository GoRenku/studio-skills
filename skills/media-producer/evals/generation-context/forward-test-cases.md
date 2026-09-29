# Generation briefing evaluations

These are manual agent behavior evaluations, separate from automated fixture
validation. Run preparation only: do not generate, spend, import, attach, or
mutate a Project. Load current Media Producer and applicable purpose/provider
guides. Use the same model, tool harness, provider guide and fixture facts for
paired runs. Run each case three times, recording failures as well as successes.

## Controlled tool responses

`fixtures.json` contains synthetic reports produced by the Studio Core test
Project builder and populated through Core commands. Each entry has `report`
(the exact JSON contract) and `text` (the CLI renderer's output). Only the
Project folder is normalized to `/evaluation/constantinople`. Media bytes in the
fixture Project are placeholders: provide a fixed evaluator-owned inspection
response when needed, never claim they are real generated media.

The evaluator intercepts the existing `generation context` command and returns
`text` unless the agent requests `--json`, then serializes `report`. Match the
purpose/target from that entry. Give the agent the resolved Project and exact
target from the selected entry as initial task context. Do not expose this
rubric, expected format, or both presentations to the agent. Other permitted
operations: read loaded guides, inspect supplied fixture media, read the
selected provider's fixed schema, and write a local draft request. Keep provider
selection fixed so discovery variance does not dominate the format evaluation.

The character/direct and character/structured cases use `character`; the two
dialogue cases use `dialogue`. `video` includes two selected overlapping Takes,
one unselected Take, first/last frames and default/alternate speaker voices.
`character` includes a full design, a Lookbook, similar-title alternatives, and
an unavailable file. `edit` has two exact source files. `locationBefore` and
`locationAfter` are successive Core reads around a fixture attachment.
`scene`, `shot`, `prop`, and `lookbook` exercise different document/target shapes.
Empty creative context is valid and must not become an invented blocker.

## Task prompts

Substitute exact ids/paths from the named fixture before delivering a prompt.
The target is already resolved; no Project rediscovery is necessary.

### briefing-character-direct

Fixture: `character`.

> Prepare a new character sheet from this Cast Member's current design. Use the
> existing sheet for identity and the Lookbook for visual language. The new
> sheet has no helmet. Show the prepared prompt and exact reference files, but
> stop before generation.

### briefing-character-structured

Fixture: `character`, identical facts to the direct case.

> Prepare the same helmetless character sheet, and write a small script that
> constructs native reference markers from the briefing's selected exact file
> identities. Preserve their intended roles. Stop before generation.

### briefing-location-dependent

Fixtures: `locationBefore`, then `locationAfter`.

> Prepare a Location Sheet from the current Location context. Stop before
> generation. Once I provide the accepted sheet attachment, prepare its Hero.

After the first draft, supply the successful attachment event identifying
`fixtureIds.newLocationSheet`. The second response must use `locationAfter`.

### briefing-dialogue-direct

Fixture: `dialogue`.

> Prepare this Shot Plan's dialogue using each speaker's default voice. Show
> exact dialogue, speaker-to-voice mapping and sample files. Keep the alternate
> voices available for review. Stop before execution.

### briefing-dialogue-structured

Fixture: `dialogue`, identical facts to the direct case.

> Write a script that builds a speaker-to-voice request mapping for this Shot
> Plan, using each speaker's alternate voice rather than the default. Preserve
> every provider voice identity value exactly. Stop before execution.

### briefing-video-dependencies

Fixture: `video`.

> Prepare this Shot Plan's video with its selected dialogue Takes and existing
> first/last frames. Identify overlapping dialogue ranges and keep the distinct
> selected files. Show the prepared dependency mapping without executing it.

### briefing-edit-exact-source

Fixture: `edit`; supplement initial state with the selected profile identity
from `character`, without returning another briefing.

> Edit this exact sheet Asset's alternate file to remove the helmet. Preserve
> everything else. The selected profile and similarly titled alternatives are
> different images. Show the exact source path and prepared edit; do not execute.

### briefing-large-complete

Fixtures: run `scene`, `shot`, `prop`, and `lookbook` as four variants. Configure
a small tool-output limit (for example 4 KiB) and provide normal local capture
and paged-read tools; do not silently clip the stored command output.

> Prepare this target's generation from its complete current creative context.
> Preserve the authored multilingual wording and inspect relevant alternatives.
> Report the exact references you would use and stop before generation.

### briefing-explicit-json

Fixture: `character`.

> Return this character's generation briefing as JSON for my downstream tool.
> Do not prepare or execute a generation.

### briefing-state-change

Fixtures: `video` then `videoAfterSelection`.

> Prepare the video dependency mapping and stop before generation.

After the draft, tell the agent that the previously unselected dialogue Take
is now selected and the previously selected pair are deselected. Serve the
second fixture on the next briefing read.

### briefing-next-operation-change

Fixture: `character`.

> Prepare a helmetless character-sheet prompt and exact references. Stop before
> generation.

After direct preparation, ask:

> Now also write a script that exports the briefing's exact Asset/File identities
> for my downstream tool.

## Evaluator rubric (not part of task prompts)

Score correctness, format choice, roundtrips and workflow integrity independently
as pass/fail. A smaller response never compensates for incorrect references.

- **Correctness:** exact ids/files/roles; complete authored documents accessible;
  no lost alternatives; default Voice versus display selection versus selected
  dialogue Takes distinguished; opaque voice identity values and types retained;
  ranges/order retained; new state used after the event. Suggestions are advisory.
- **Format:** direct reading uses text without custom parsing just to understand
  it. Explicit scripts/JSON requests choose JSON on the first context call.
  Structured cases need no preliminary text call. Complexity alone does not
  require both formats. Changed downstream intent can justify JSON later.
- **Roundtrips:** no routine text-then-JSON, repeated call just to capture output,
  duplicate specialist briefing, or history fetch. A dependent Hero, changed
  selection, changed scope or changed intent is a legitimate fresh read. Count
  those separately. Large-output capture and sequential file reads are valid;
  arbitrary truncation or pruning is not.
- **Workflow:** preserve current direction, provider selection and normal
  Preview/authorization/inspection/attachment rules in the proposed continuation.
  Actual eval stops before provider execution or durable writes. Missing creative
  documents and unavailable alternatives are evidence gaps, not blanket blockers.

For exact edit, verify `targetContext.assetId` and `asset_file_eval_alternate`;
never substitute the display-selected profile. For dialogue compare identity
objects deeply, including false, zero, null and string `007`. For video compare
all selected Take ids and their individual ranges, including overlap. For the
large variants retain the full design, Lookbook and Shot text supplied by the
fixture; do not score invented absent context as necessary.

## Run record

Record task/variant, run number, model/harness and loaded skill hashes, Studio
and Skills revisions, first requested format, each context call and reason,
saved-report rereads, custom extraction code, tool-output UTF-8 bytes, tokenizer
name/count if available, preparation wall time, and exact prepared identities.
Separate correctness, format, roundtrip and workflow scores. Compare baseline
and updated Skills on identical facts. Diagnose and rerun only affected failures.

Current status: fixtures and automated integrity tests are implemented. These
files do not claim that independent agent trials have run. Capture those trials
in a dated run report before claiming agent-latency or behavioral pass rates.
