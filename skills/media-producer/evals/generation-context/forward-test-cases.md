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
a small tool-output limit (1 KiB, including the smaller Lookbook fixture) and provide normal local capture
and paged-read tools; do not silently clip the stored command output.

> Prepare this target's generation from its complete current creative context.
> Preserve the authored multilingual wording and inspect relevant alternatives.
> Report the exact references you would use and stop before generation.

### briefing-explicit-json

Fixture: `character`.

> Return this character's generation briefing as JSON for my downstream tool.
> Do not prepare or execute a generation.

### briefing-aggregate-output-budget

Fixture: `character`. Supply several realistically long purpose/workflow guides.
Set individual command limits above the briefing size but the enclosing tool's
aggregate limit below the combined briefing and guides. Provide file capture
and bounded reads. Keep the stored report complete, including its Media section.

> Generate a new character-sheet request using this existing design and the
> Production Lookbook. Height is 160 cm. Stop before execution.

Score whether the agent separates large reads, captures its first context call,
reads the complete capture and avoids fetching Cast Design or Settings again.
Do not tell it the expected format or capture strategy in the task prompt.

### briefing-captured-output-recovery

Fixture: `character`. Start from a successful saved text briefing whose displayed
tail was clipped by the enclosing tool. Give the agent the successful command
result, truncation notice and exact capture path, without the rubric.

> Continue preparing the character sheet from the briefing you just fetched.
> Stop before execution.

The agent must recover the missing section from that file. A second Core read,
text piped into `jq`, or a JSON read merely to find the Media inventory fails
roundtrip/format scoring. If the original command did not save its output, a
recovery fetch is justified: score that separately from avoidable rereads.

### briefing-current-layout-with-existing-design

Fixture: `character`, with evaluator-supplied authored design guidance asking
for expression strips and material swatches, and a fixed inspected reference
showing that older layout. Preserve every identity/wardrobe fact in both formats.

> Prepare a standard Production character sheet using the current character-sheet
> skill layout. Height is 160 cm. Use the existing image for identity and costume.
> Stop before execution.

Score preservation of identity and costume alongside the current universal
layout. Extra historical study blocks must not leak into the request. This is
agent reasoning over opaque creative content, not a runtime pruning rule.

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

### Shared regression suite across all generation purposes

Apply this suite to every purpose/case in `../purpose-coverage.json`, not only
the character examples above. Use the existing case's target, reference roles,
provider and authorization constraints. The checked-in eleven report states
provide representative contract shapes, not populated fixtures for all 22
purposes; use owning-layer fixtures or isolated Projects for the other cases.
Record an unavailable fixture as not run, never as a pass.

For each purpose, run a direct-reading variant and a variant requesting a
structured reference mapping. Repeat with a small aggregate tool budget and
with a saved report whose displayed page is clipped. In both formats require
complete creative-context consumption before request authoring. For direct
reading, the task is: "Prepare this generation using the complete current
briefing and my stated direction; show the request, but do not execute."
For structured reading, additionally request code that builds the exact native
reference mapping from Asset/File identities. Do not reveal the scoring rubric.

| Purpose family | Facts that must survive full reads and mapping |
| --- | --- |
| Project cover; generic image creation | Project direction, exact target, current policy, available alternatives |
| Cast sheets and profiles, including voice-over profiles | Current design, symbolic versus physical identity, appearance and continuity roles |
| Cast voice samples; Shot Plan dialogue | Current voice direction, opaque identities, exact dialogue, speaker/sample mapping and Turn ranges |
| Location and Prop sheets/heroes | Full design, spatial/construction facts, reference roles, dependent-sheet refresh |
| Lookbook images and both sheet purposes | Exact role/definition, annotations, current media and appearance intent |
| Scene storyboards; Shot images | Exact revision/Beat or Shot scope, complete creative context and reference identities |
| Every Shot Plan video purpose | Selected versus alternate Takes, overlapping ranges, first/last frames and exact Previs revision when applicable |
| Image and video edits | Exact source AssetFile, current edit instruction, source continuity without automatically retrieving the old recipe |

Place a consequential evaluator-authored fact in an existing creative field in
the middle and near the end of each report, then render both presentations from
the same report. Use facts appropriate to the purpose (for example an explicit
costume change, a room entrance, a line of dialogue or a source-preservation
instruction), not runtime schema additions. Check the request reflects those
facts. Merely obtaining all bytes is necessary but not sufficient.

Record the ranges actually displayed, excluding clipped portions. Use
`read-coverage.mjs`'s `unreadBriefingRanges(totalLines, displayedRanges)` to
identify gaps; search results count only for the exact lines they display.
The evaluator is not an agent workflow tool and adds no CLI/runtime state.
Its tests include the observed Loukas ranges and both formats of every report
fixture. Score a single successful capture with skipped ranges as a completeness
failure even when the context-call count is optimal.

Across these variants also check:

- Media-only requests do not run department authoring preflights. Target/role/
  revision resolution remains valid when identities are unknown.
- Policy already returned is reused; no routine Settings read. Provider
  credentials, schemas, required confirmation and Preview remain intact.
- A final Preview edit reaches execution without retyping the prompt or losing
  native settings/reference order. Intercept execution in preparation trials;
  compare the proposed native call to the final saved envelope, or verify the
  Engines command points to that final file. Do not spend on these trials.
- Imports are confirmed from their focused results; no automatic new briefing
  or director read. A new dependent purpose or changed Project state legitimately
  requires fresh context.
- Record tool time, model-response intervals and generation time separately.
  A slow final model response is not a CLI-retrieval regression.

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

The authorized live character-sheet run is recorded in
`runs/2026-09-29-mara.md`. It is an operator-led end-to-end regression, separate
from these preparation-only controlled trials and their repeated-run protocol.
