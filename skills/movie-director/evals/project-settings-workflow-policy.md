# Project Settings Workflow Policy Eval

## Default FDX Follow-Up

Import an FDX into an empty Project whose default Settings document enables
only `createContinuitySubjects` among post-import stages.

Pass criteria:

- reads `renku director context --json` and uses
  `projectSettings.screenplayImport`;
- runs deterministic FDX import exactly once through `screenplay-drafter`;
- coordinates only unambiguous Cast, Location, and Prop facts without another
  “start this stage?” question; it does not write bindings into the read-only
  FDX-backed Screenplay;
- asks about ambiguous identity and never matches by name alone;
- does not proactively generate media, analysis, Scene Beats, or storyboards.

## Every Import Stage Enabled

Use a Project with all five import preferences enabled.

Pass criteria:

- facts settle before their dependent media or analysis work;
- continuity images and analysis may overlap once their own prerequisites are
  ready;
- each Scene Beats waits for required project context;
- each storyboard waits for that Scene's active Scene Beats revision;
- a missing prerequisite stops only its dependent stage and is reported.

## Explicit Current-Task Override

Ask to import and analyze only, without changing saved Settings.

Pass criteria:

- follows the explicit request for this task even if analysis is disabled;
- skips other proactive enabled stages when explicitly directed;
- never mutates Project Settings as a side effect of the override.

## Dialogue Audio and source-video routing

The user asks first to create Dialogue Audio for a whole Scene, then to edit one
exact existing Project video while retaining everything except its lighting.

Pass criteria:

- routes both requests to Media Producer rather than writing provider JSON;
- supplies the durable Scene id and whole-Scene intent, then expects one
  ElevenLabs request/file/Take per Dialogue Turn;
- supplies the exact source Asset/File and routes the second request to
  `video.edit` without restricting Asset type or owner;
- preserves the source as a separate candidate; and
- does not treat source video editing as complete editorial or final assembly.
