# Previs video chooser

Use this guide before AI video work from a Previs Shot Plan, to settle which
previs video to use. A staged revision holds its cut and, when the director
asked a camera to film more, one coverage video for each such camera run. A
Blender revision, or a staged one without extra coverage, holds only its cut.
Find the exact video first; then [route choice](route-choice.md) settles the
provider and model and [blender-previs.md](shot-plan-video/blender-previs.md)
continues with the inputs.

## Names

Every video has one plain name that Studio, the chooser, `renku studio
current` and you all use:

- the edit: `Revision 2 · Edit`;
- a coverage video: `Revision 2 · Loukas close 24.0–30.0 s`.

Build names from `renku shot-plan previs show --project <name> --shot-plan <id>
--json`. Each revision has `number`, `render` (the edit),
`coverageVideos: [{ id, cameraKey, cameraLabel, startFrame, endFrame, video }]`
and `playback.frameRate`. A coverage video's name is the camera label, then
`startFrame` and `endFrame` (exclusive) converted to seconds with
`numerator`/`denominator` and one decimal: frames 576–720 at 24 fps are
24.0–30.0 s. Talk to the user in names, not ids.

## 1. Find the video

Take these three ways in order:

1. **The user is watching it.** "This one", "the video I'm watching" or "use
   what's on the Previs tab" means the Studio selection. Read
   `renku studio current --json`: `context.previsVideo` is
   `{ shotPlanId, revisionId, revisionNumber, coverageVideoId, name }`, where
   `coverageVideoId: null` is the edit (text mode prints
   `Previs video: <name>`). Use it when its `shotPlanId` is this plan.
   Without a `previsVideo`, Studio is not showing a previs video: ask.
2. **The user names it in chat**, such as "the edit of revision 2" or "the
   Loukas close coverage". Find it in `previs show`. Exactly one match: use it.
   No match, or several (the same camera in two revisions, "the edit" with
   several revisions): ask.
3. **It is unclear: ask**, with the chooser (step 2) in Codex Desktop with
   panel support, otherwise in chat (step 3).

When the plan has only one video across all its revisions, name it back and
use it; there is nothing to ask. Otherwise never guess the newest revision or video, and never take a
video from an Asset title or file name.

## Eligibility

The chooser needs trusted Codex Desktop and a current Renku MCP connection
whose `generation.review.capabilities` probe returns the `codex-mcp-client`
identity with `panel.status: advertised`: the same check as the
[image edit panels](image-edit-panels.md). The chooser is always inline;
`workflowPolicy.codexGenerationReviewDisplayMode` does not apply. Every other
host, including Codex Desktop without panel support, asks in chat.

Never ask in chat which video when the chooser is eligible: show the chooser.

## 2. Ask with the chooser (Codex Desktop)

Call `previs.video.choose`:

```ts
// previs.video.choose
{
  project: string;
  shotPlanId: string;
  previsRevisionId?: string; // that revision's videos; omit for every revision's videos, newest first
}
```

Pass `previsRevisionId` when the user named or is watching a revision. The
chooser needs 2 to 24 videos. `CODEX_PREVIS_VIDEO_INVALID` means fewer than 2
(name the only video instead) or more than 24 across revisions (ask in chat
which revision, then open the chooser for it). Report any other
`CODEX_PREVIS_VIDEO_*` error and stop; do not fall back to a guess.

End the turn and wait. The chooser posts one message:

```text
Previs video chosen · <name>. Chooser <id>. Consume it with previs.video.consume once.
Previs video choice canceled. Chooser <id>. Consume it with previs.video.consume once.
```

Call `previs.video.consume` once with `{ chooserId }`:

- `chosen` returns `{ chooserId, project, shotPlanId, previsRevisionId,
  coverageVideoId, name }`; `coverageVideoId: null` is the edit. Continue with
  step 4.
- `canceled` means stop and reply briefly.
- `alreadyConsumed` authorizes nothing.

## 3. Ask in chat (every other host)

Claude Code, Claude Desktop and claude.ai chat, Codex CLI and unidentified
hosts ask one choice question listing the candidate videos by name. Use the
host's options question tool when it has one (AskUserQuestion in Claude Code).
Otherwise, or when the videos do not fit its option limit, write a short
numbered list, end the turn and wait for the answer:

```text
Which previs video should I use?
1. Revision 2 · Edit
2. Revision 2 · Loukas close 24.0–30.0 s
3. Show me in Studio first
```

For "Show me in Studio first", open each candidate in Studio, one at a time,
so the user can watch before answering:

```bash
renku project select <project> --selection '{"type":"scene","id":"<scene-id>","sceneTab":"shotPlans","shotPlanId":"<plan-id>","shotPlanTab":"previs","previsRevisionId":"<revision-id>","previsCoverageVideoId":"<coverage-video-id>"}'
```

Take the Scene id from the generation context and omit
`previsCoverageVideoId` for the edit. The chips on the revision's row also
switch between its videos. Then ask again without that option. "This one"
after watching means the Studio selection (the first way in step 1).

## 4. Say the name back

Before anything is paid for, say the chosen video's name back in chat, for
example "Using Revision 2 · Loukas close 24.0–30.0 s." In the generation
review, the previs reference's `reviewLabel` is that name (an excerpt adds its
scene times), in the Codex review panel and in Studio Preview with its one
chat confirmation (see
[generation review routing](generation-review-routing.md)). Keep the exact
revision id, and the coverage video id when there is one, for reference
import, clip creation and attachment in
[blender-previs.md](shot-plan-video/blender-previs.md).
