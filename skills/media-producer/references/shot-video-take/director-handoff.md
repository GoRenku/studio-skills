# Retained Director Handoff

> **Status: retained design reference.** Do not route to this workflow while
> Shot Video authoring is unavailable. Revalidate the Studio selection shape,
> Take model, purpose keys, CLI commands, and readiness contract before reuse.

## Studio Selection

For a request about “this Take,” the last supported workflow first read:

```bash
renku studio current --json
```

It continued only when Studio current identified an existing Take id. A Scene,
Beat or Shot authoring surface, new-Take form, unrelated tab, or missing Take id
was not enough. The agent did not infer a Take from nearby project data.

## Storyboard Reference To Final Video

The retained orchestration was:

1. Confirm current screenplay coverage and storyboard readiness through
   `renku director context --json`.
2. Create or choose the exact Take and resolve `take:<take-id>` from durable
   state.
3. Route a multi-shot storyboard, dense motion-control image, choreography
   sheet, or storyboard reference image through `shot.video-prompt`, not Scene
   Storyboard generation. Panels, motion maps, captions, timing marks, and
   diagrams remained agent-authored creative strategies rather than Studio
   schema.
4. Read `renku generation context --purpose shot.video-take --target
   take:<take-id> --json`, choose one direct current provider/model endpoint,
   and author one exact `GenerationSpec` from user intent and selected
   references.
5. For a final request with a storyboard reference, review prompt-quality
   readiness separately from mechanical context readiness.
6. Preview the exact draft or saved request. After any request change, validate
   and show the complete Preview again before estimating.
7. Keep provider execution behind estimate review and explicit live-run
   approval.

## Storyboard Reference Handoff

For a realistic storyboard, the image normally carried look, location,
lighting, composition, and continuity itself. Avoided sending redundant
Lookbook, Location Sheet, or Character Sheet images unless the final provider
request needed a narrow missing role.

For a hand-drawn, sketch, clay, or abstract storyboard, supporting Production
Lookbook, Location Sheet, and Character Sheet references were often needed for
final appearance. Each reference remained narrowly scoped and had to be an
actual provider input.

An accepted Codex-generated storyboard reference was normalized under project
`tmp/media/` and used as an exact `project-file` reference. The workflow did not
invent an asset id, receipt, or attachment simply to use that file as provider
guidance.

Before estimate or run, prompt-quality review checked provider-token roles,
the storyboard operating rule, artifact suppression, hard-constraint transfer,
native-audio limits, and final-video QA risks.
