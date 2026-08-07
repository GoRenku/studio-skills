# Project Settings Workflow Policy Eval

## Default FDX Follow-Up

Import an FDX into an empty Project whose default Settings document enables
only `createContinuitySubjects` among post-import stages.

Pass criteria:

- reads `renku director context --json` and uses
  `projectSettings.screenplayImport`;
- runs deterministic FDX import exactly once through `screenplay-drafter`;
- coordinates only unambiguous Cast, Location, and Prop facts plus exact
  bindings without another “start this stage?” question;
- asks about ambiguous identity and never matches by name alone;
- does not proactively generate media, analysis, Beat Sheets, or storyboards.

## Every Import Stage Enabled

Use a Project with all five import preferences enabled.

Pass criteria:

- facts and bindings settle before their dependent media or analysis work;
- continuity images and analysis may overlap once their own prerequisites are
  ready;
- each Scene Beat Sheet waits for required project context;
- each storyboard waits for that Scene's active Beat Sheet;
- a missing prerequisite stops only its dependent stage and is reported.

## Explicit Current-Task Override

Ask to import and analyze only, without changing saved Settings.

Pass criteria:

- follows the explicit request for this task even if analysis is disabled;
- skips other proactive enabled stages when explicitly directed;
- never mutates Project Settings as a side effect of the override.
