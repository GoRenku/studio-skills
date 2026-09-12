# Scene segmentation preparation review

Date: 2026-09-11. Scope: manual preparation/review exercises for Studio plan 0203.
These exercises use invented transcripts, declared timing evidence and dated
capability fixtures. No video model was run and no audiovisual quality is claimed.
The checks below evaluate the resulting decisions against the new guidance.

| Case | Supplied evidence and resulting preparation |
| --- | --- |
| S1 | A 23s scene has natural boundaries at 6, 11, 17, 23s. Fixture A permits integer output durations 1–12s and 12s references: request [0,11), [11,23). Fixture B permits 1–8s and 8s references: request [0,6), [6,11), [11,17), [17,23). Both cover 23s exactly without changing pace. A separate 5s reference ceiling makes those reference requests invalid; choose a supported strategy before submission, not silently truncate. |
| S2 | Expected “Open the gate. Bring the horses.”; supplied output transcript ends cleanly after “gate.” Next prompt begins “Bring the horses.” The proposed manifest calls for the retained first file's actual final frame plus matching audio/Previs suffix excerpts. No frame/excerpt is claimed to exist in this paper exercise. |
| S3 | One speaker's sentence spans a camera cut at 4s and a natural clause boundary at 6s. The delivery split at 6s does not add another camera cut. The second request identifies the ongoing speaker, framing and remaining clause; both pieces together contain the sentence once. |
| S4 | Supplied prefix has 8s content plus 3s unwanted silence, and 10s speech remains under a hard 15s scene limit. Even an explicitly approved paired trim leaves 18s. Report infeasibility; do not hide 3s by stretching, deletion or continuation alone. |
| S5 | Expected “Wait. Wait. Open the gate. Bring the horses.” Intentional repeated “Wait” stays. If “Open the gate” is missing internally, appending it after “horses” is rejected. A cut-off “hor—” is not a completed word; inspect and choose regeneration or an approved paired edit before deriving the boundary. |
| S6 | A selected 9s take is explicitly trimmed to 7s. Update actual ending, retained interval and remaining coverage from that file. Replacement audio with different timing is not a sync repair; request an appropriate supported sync operation and reopen checks. |
| S7 | Supplied scenario describes proxy room geometry and correct blocking. Preparation keeps the simple Blender source, assigns it placement/motion/camera authority only, and requests independent finished appearance inputs. No realistic modeling work is added to Previs. |
| S8 | A dial insert has no appearance reference, and a supplied reviewer observation reports a mannequin after a later cut. Prepare a dial reference and revise the failed appearance transfer before choosing that take as a continuation source. The written observation is evidence supplied to the exercise, not independently inspected footage. |
| S9 | A transcript matches but no audio audition is available. Mark words as supported by the supplied transcript, voice contrast and mouth synchronization as unverified. Prepare an ensemble comparison; ASR does not establish the voices are distinct. |
| S10 | Mara speaks “Who opened it?” off screen while Ivo listens in close-up. Prompt names Mara as audible, Ivo as visible with a closed, non-speaking mouth, and his listening reaction. No automatic cut to Mara. |
| S11 | Repeated feedback is consolidated into the standalone prompt below. It includes current direction and actual-input requirements, with no accepted/earlier/replaced-take references. |
| S12 | A required ending frame or auditory inspection is missing. The handoff lists it as missing, does not invent provider fields or claim continuity, and proposes a supported alternative. A cost increase requires the existing approval owner; selection is not spending authorization. |

S11 standalone preparation: “Interior gatehouse at dawn. Mara stands beside a
wooden table; Ivo sits opposite her. Cool daylight enters from the left. In a
symmetrical wide shot, Mara unfolds a map and says, ‘Open the gate.’ Cut to Ivo's
close-up as he listens silently. Mara, off screen, says, ‘Bring the horses.’ Ivo
nods and rises. Use the supplied finished-look reference for faces, clothing and
surfaces, the map reference for its appearance, and the simple Previs only for
positions, movement and camera. Preserve the two lines in order.” The manifest
must actually include those inputs before this becomes a submitted request.

Additional variations exercised on paper:

- A 6s action-only approach under an 8s ceiling remains one request; splitting
  offers no benefit. A 17s action chain with natural boundaries at 5/11/17s under
  an 8s ceiling becomes three requests, each with explicit start/end action state.
- Two separately selected recordings remain separate source files. If the route
  accepts only one audio reference, a multi-source request is not ready; use a
  compatible boundary/route or seek a new user decision, not concatenation.
- A native continuation route and a reference-only route receive different
  expectations: the latter can be conditioned on an ending frame but does not
  promise an extension. Actual field names require the current route schema.
- After resuming an edited take, derive its boundary from retained media and
  durable provenance/summary. Missing temporary notes are not permission to
  guess the completed dialogue or reuse an old endpoint.

Outcome: these preparation decisions preserve scope, order and ownership. Actual
word delivery, voice contrast, mouth synchronization, later-frame appearance and
join quality remain untested until a separately authorized media run is inspected.

## Prepared reference registration regression

Given a selected Clip 1.3 and exact Previs revision, prepare an image of its final
frame, a matching Previs video excerpt and an audio delivery excerpt in tmp/media.
Expected: inspect each chosen file, import all three with `shot-plan reference
import`, preserve exact Plan/revision and source intervals in summaries, then use
returned AssetFile paths in the native request. All inputs resolve in Preview
before confirmation. No invented generation receipt and no take selection change.
On resumption reuse the imported Assets; already registered Cast and Location
sheets stay at their current paths. If one intended reference is unavailable,
resolve it before confirmation instead of dropping it or presenting a blank card.
