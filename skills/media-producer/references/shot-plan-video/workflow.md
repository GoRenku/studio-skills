# Shot Plan Video Renku Workflow

For a Blender-authored plan, follow `blender-previs.md` for input roles and timing; continue this same generation/attachment workflow with the exact Previs plan.

For multi-clip work read `scene-segmentation.md`. Inspect actual delivered coverage
before preparing a dependent request. Describe incomplete or unverified outputs
as candidates, not corrected/complete scenes. Preserve existing authorization;
do not add repeated confirmation for unchanged already-authorized work.

1. Resolve the current Project and exact Shot Plan id.
2. Read one complete Core briefing with `renku generation context --purpose
   <purpose> --target shot-plan:<shot-plan-id>`, following `../workflow.md` for
   format choice and contiguous reads through EOF. Reuse that report when
   continuing into a video-specific guide; refresh for changed dependencies.
3. Inspect every relevant candidate file and deliberately select or omit it.
4. Route to the selected provider Skill and choose one exact route through
   `generation models list` or explicit user direction. Prepare from the selected
   route and available bundled/personal advice using Media Producer's optional
   guidance rules; missing catalog keys or guides do not block preparation.
5. For external generation in Codex, render the inline configuration through
   `../inline-generation-configuration.md`: inspect the selected route's system
   cache before fetching a live schema or generating template code, reuse a fresh
   template/schema, and materialize this request's values. End the turn with its Visualize
   content reference. Resume request authoring after the user accepts the
   displayed settings. Reading the skill or fetching a schema is not rendering.
6. Author one temporary review document from those settings with the exact
   provider-native request. Keep the Shot Plan id out of that envelope; it
   returns later only as weak attachment context. Configuration belongs in
   native provider fields, not Core.
7. Validate and show Preview when policy or user direction requires it. Review
   Prompt, References, and Configuration; rebuild the native request if the
   user edits the prompt.
8. Pause once for conversational confirmation when required, then follow the
   shared execution path with Validate's `requestSha256`, without redundant validation.
9. If a known provider request id survives an interruption, recover it rather
   than resubmitting. Present the returned video immediately, then inspect it
   before attachment; playback does not wait for analysis or provenance work.
10. Attach using the returned `provenancePath` directly. The accepted result is a
    Project-owned `shot_plan_video` Asset whose file Core places in the exact
    Scene/Shot Plan folder and whose `authoredFrom` context names the Shot Plan.
    For a Previs handoff, also pass `--previs-revision <registered-revision-id>`.
    Preserve that exact association for derivative inputs; do not infer latest.

Never manually copy media into the durable Shot Plan folder. Never create a
reverse video pointer or completion state on the Shot Plan.

### Typed Previs direction handoff

Read `shot-plan previs show --json` for the chosen revision before authoring its
provider-native request. Preserve explicit segments/cuts and Dialogue turns,
including a turn crossing a cut. Action and Camera cues are onset directions,
not speech. Consult the selected provider's capabilities; do not add a common
provider timeline schema. Record derivative time maps and disclose that paired
AI output is not verified to match Previs speech/action timing. Keep exact
revision attachment, Preview approval and provider provenance unchanged.
