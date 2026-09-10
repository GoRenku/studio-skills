# Director iteration evals

Director monitor contract case: register two isolated revisions with different
Description prose and cue timings, including a colored object, a subjectless
point and an overlapping interval. Add one exact existing voice AssetFile with
an offset. Verify each historical revision retains its own text/timing, all cues
remain visible, voice audition uses that file, and missing audio only affects the
cue's audio. Hand off the chosen revision id explicitly. No paid generation is
needed for this contract check.

Use isolated plan copies and actual Scene references. Never mutate the accepted
movie or buy an AI take for these checks. Record commands, outputs, elapsed work
and what was actually inspected. A documented scenario is not a passing result.

## Exploration evidence and regression scenarios

Source: [Create harbor walk previs](codex://threads/01a07aed-c926-7b43-ad17-d655af06a54b).
The original plan is `shot_plan_zx39wxev`, Urban Basilica Harbor Argument.

| Lesson and evidence | Guidance to incorporate | Verification |
| --- | --- | --- |
| **Context identity.** An initial read returned Sintel despite the Urban Basilica flag; current source forwards the flag, so the installed-runtime cause remains unresolved. | `directing-workflow.md`: verify returned Project/Scene identity before interpreting an empty result as missing content. Diagnose a mismatch rather than inventing replacement content. | Present a mismatched context response; the agent identifies it and obtains the intended context before authoring. |
| **Direction needs distinct timing events.** v002 used 6–8 seconds for approach, then turned during 8–8.85; it did not include a separate conversation hold. v003 added a hold at 8–11 and turn at 11–13, with Urban stopping at 8.8. | `directing-workflow.md`: distinguish departure, arrival, hold and turn when interpreting direction. Expose useful positions, camera and timing controls; new behavior may require code changes. | Ask for a three-second conversation, later stop and slow turn. Verify the settled hold lasts three seconds independently of approach/turn, and ask about material ambiguity. |
| **Delivery limits changed the performance.** v003 became 17 seconds. The approved 15-second derivative reduced the three-second hold to 2.647 seconds. | `ai-handoff.md` and the Media Producer previs guide: check the selected route early, retain the master and record derivative time mapping. Resolve changes to locked timing with the director. | Prepare the 17-to-15 handoff and show the altered hold and mapped event times; preserve master and selected audio. |
| **Configuration history was not source history.** Adding `talk` changed scripts while prior revisions mostly retained JSON, motion and `.blend` files. Motion replay matches, but exact historical Python cannot be reconstructed from that alone. | `plan-files-and-generations.md`: retain exact source/config with each rendered revision and identify the resulting generations. | Revise code as well as parameters, then reproduce the earlier retained revision using its source snapshot. Mark recovered historical source honestly. |
| **Writer protection and continuation disagreed.** `run.py` rejected populated output folders, but direct build calls could overwrite source/Blender files and `finish.py` used overwrite encoding. Build-only output could not continue through the runner. | `blender-authoring.md`: protect completed outputs at the writers; make build, render and finish separately usable. Resume frames only against unchanged inputs. | In an isolated plan, build then render then encode; retry finishing without Blender; resume an interrupted render; check that changed inputs and direct invocations cannot overwrite or mix a completed revision. |
| **Dependency failure came after expensive work.** v002 rendered before finishing failed for missing Pillow in the selected interpreter. Blender also crashed during Metal startup. | `blender-authoring.md`: preflight the actual Blender/finishing executables, required modules/fonts and FFmpeg/FFprobe with a small run. Distinguish startup failure from script failure; record working tool versions. | A missing finishing dependency fails before full rendering. A Blender script exception produces a failing command, using `--python-exit-code` or equivalent supported handling. |
| **Camera assumptions limited adaptation.** `aim[1] += look_ahead` stayed world-Y on a tested +X path. Follow grouping meant all leads; shoulder targets were limited to leads. | `blender-authoring.md`: explain world/route/actor spaces and actor/group targets. When adapting the motion, use the intended route direction and subjects for follow/look-ahead/shoulder framing. | Adapt the path to +X and inspect forward aim; request a specific follow group or shoulder subject and verify the resulting composition. |
| **Rotation continuity was an unproven risk.** Actor Euler baking lacked the camera's continuity handling near ±180°. No visible Harbor spin was established. | `blender-authoring.md`: flag angle wrapping when adapting turns; inspect continuous playback and use continuous rotation interpolation if needed. | Exercise a turn across the angular boundary in the isolated motion example; verify no unintended full spin. This does not require every scene to implement curved walking. |
| **Cue editing could change performance unintentionally.** Editing removed/appended a cue, changing array priority; default IDs could replace another cue. Facing overlapped talk and turn. | `blender-authoring.md`: keep cue identity/order stable on edit and make overlap and return/hold behavior understandable. | Edit one overlapping cue; confirm another cue is neither replaced nor reprioritized and the requested gaze/turn survives. |
| **Edited numeric inputs passed invalid states.** NaN position, zero lens and negative fade passed checks. `pair` as an action target and a missing camera target later raised `KeyError`. | `blender-authoring.md`: check finite values, meaningful ranges, references and intervals before rendering; report the offending input instead of a late lookup failure. | Exercise these invalid edits against the relevant generated/adapted implementation; failures are actionable and occur before output writes. |
| **Review tooling became stale or failed on content.** Sampling ended at 14 seconds for a 17-second take; uncovered Beat time could raise `StopIteration`; long dialogue overflowed the burned-in review frame. | `blender-authoring.md`: sample the current take through its final frame, allow unlabeled intervals and keep playback cues separate from encoding. Caption presentation is deferred to the Studio player. | Render an extended take with an unlabeled interval and long cue text; encoding succeeds without burning overlays into the video. Inspect the final action and retained cue text. |
| **Numeric checks did not prove visual quality.** Distances alone did not establish clearance or shoulder framing. The original visual loop corrected a water-obscuring camera, supporting-actor facing and head/torso overlap. | `blender-authoring.md`: use images/playback to inspect occlusion, clearance, facing and camera orientation/lens changes alongside numeric checks. Preserve the simple geometry and legibility that worked. | Inspect contact/event frames and continuous changed intervals; demonstrate the requested framing and gesture rather than accepting only numeric pass results. |
| **Iteration already had a cheap motion stage.** Full motion evaluation took about 0.028–0.038 seconds; session render/finish observations were about 19.5/15.5 seconds. | `blender-authoring.md`: prioritize short previews, saved builds and independent encoding. Deeper optimization follows profiling while retaining final quality. | Record the commands and elapsed work for a focused revision; show that an encoding correction does not rerender the scene. Treat measurements as local evidence, not a latency promise. |
| **AI conditioning was useful but not exact transfer.** H3 Max arrival was around 8–9 seconds rather than the mapped 7.06, shortening the exchange. Native speech was not verified. The director accepted the result. | Media Producer previs guide: assign motion versus appearance reference roles, compare event timing, listen before claiming speech fidelity and preserve accepted output. | Review the existing accepted take against its mapped timeline, state timing/audio limits and verify attachment to the same plan without initiating another paid take. |


## Forward exercises

1. In a Harbor copy, move Mara to the other side, center the camera, add a timed
   shoulder and lean, then stage a three-second settled conversation, later Urban
   stop and slow turn. Inspect continuous changed intervals and event/final frames.
2. Resolve a Scene dialogue turn, place its onset at 8 seconds and verify parameters,
   gesture/reaction, derived playback cue and AI handoff all refer to the same line
   and time. Present a conflicting selected speaker/audio; expect clarification.
3. Build, render a partial range, resume unchanged frames and encode. Retry encoding
   without Blender. Change an input and confirm stale frames are not reused.
4. Register exact source/render, retry it, then revise code and register again.
   Earlier source bytes and render must remain available after explicit tmp cleanup.
5. Author another Scene from its own sheet visuals. Existing code may be adapted;
   assess scene-specific geography, readable blocking and useful directing controls.

Detailed run results belong in `implementation-results.md`, with visual/audio
limitations explicit. Rotation wrap remains an unproven Harbor risk until a
specific crossing is exercised; do not present it as an observed Harbor defect.

## Typed timeline acceptance

Use `samples/playback-continuous.json` and `samples/playback-cuts.json` as authored
envelope examples, not proof of rendered performance. Render an isolated two-view
sequence with a cut inside one dialogue turn. Inspect cut-1/cut/cut+1 and onset/end
frames. Verify only Dialogue gets Play, only the selected audition highlights,
Action/Camera/cut seek cancels it, and unknown ends disable only audition. Include
simultaneous direction points, overlapping dialogue, pause/resume/replay and an
early-ending exact recording. A gestured conversation must remain an Action;
caption headings belong in Description. For historical recovery record original
seconds, chosen frames and unverified speech timing; never label it measured.
