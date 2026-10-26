# Cast Casting Candidate

Use `cast.casting-candidate` for one audition image of one Look of a Cast
Member, generated inside a casting round. `casting-director` agrees the Look,
confirms the round with the director and creates it
(`renku cast casting round create`); this guide generates and imports the
round's candidates. Target `casting-round:<round-id>`.

## Briefing

```bash
renku generation context --purpose cast.casting-candidate --target casting-round:<round-id>
```

The report carries the round (routes, counts, `maxConcurrentGenerations`,
references), the Look and the Cast Member's other Looks, the Look's Scenes,
the Cast facts and active design, and the Production Lookbook. The
`casting-identity` suggestion lists the round's references
(workflow-selected) and the other Looks' cast candidates. Use the round's
references as the identity authority; keep "same person" wording in the
prompt when a reference comes from an earlier Look.

## Layout

The candidate image has a fixed, Studio-owned shape, like the storyboard
sheet:

1. ONE image, aspect ratio 4:3;
2. a face close-up and a full-length figure side by side, the same person in
   both;
3. the full figure from head to feet, uncropped, standing neutrally;
4. a plain neutral backdrop and even light, so the face and build read;
5. plain, close-fitting clothes so the build reads;
6. the standing height visible when it is known, as a simple height scale
   beside the full figure.

No name, captions, extra views, props or scenery. Which clothes, colours,
hair styling and every other creative choice come from the brief, which the
agent and user own. The Production Lookbook may set the medium and finish
(for example an animated film), never the layout or backdrop.

## Prompts And Routes

- The confirmed round fixes each route's provider, model and count. Map each
  model family to the exact operation route with its model guide and the
  provider's `supported-routes.json`: a reference-capable route when the round
  has references, otherwise text-to-image. Do not open the Route Chooser.
- Set the native output count to one; a provider's default may generate a
  batch.
- Write one prompt per route from the brief, following that model's guide,
  and reuse it for that route's count. The models already give variety; vary
  details only when the director asked for range.
- Set the 4:3 aspect ratio in the native field when the route has one.
- Size every candidate at the round's `detail` level (`lowest`, `mid` or
  `highest`), as `casting.round.consume` returned it or the chat round
  confirmed it. Take that provider route's `detail[<level>]` fields from the
  Default Model List entry (`default-models.json`: the `image` lane for a
  text-to-image route, `imageEdit` for a reference-capable one) and set them
  in the native request; they override the model guide's default size. An
  empty object leaves the route's size at its default. The level never
  changes the 4:3 aspect ratio or the single output.
- Check the provider key for every route's provider before writing requests,
  as `SKILL.md` describes.

## Confirmation And Review

The round confirmation (the Codex casting round panel, or the user's reply to
the round set up in chat) is the review for every candidate of the round. Do
not open `generation.review`, Studio Preview or a per-request text review,
even when Ask Before Generating is on.

- Validate each Engines request with
  `renku generation validate --file <request> --json` and keep its
  `requestSha256` for Execute. Do not call `generation prepare` or
  `generation preview show`.
- Anything the round did not show is not confirmed: another model, more
  candidates, other references or a costlier native setting. Return to
  `casting-director` for a new round instead.
- Host command approval works as `SKILL.md` describes.

## Parallel Batches

- Run up to `maxConcurrentGenerations` candidates at once. Start the next one
  as soon as one finishes, until every route's count is done.
- Each Execute is one candidate. Track each command session as
  `workflow.md` describes; never retry a successful paid execution, and never
  resubmit a failed or interrupted one automatically.
- Codex built-in routes follow the Codex section of `workflow.md` and run on
  the ChatGPT plan.

## Import Each Candidate At Once

Import every candidate as soon as its Execute finishes, so the casting board
and Studio's Casting tab fill in live:

```bash
renku media import \
  --purpose cast.casting-candidate \
  --target casting-round:<round-id> \
  --casting-model <route-model-key> \
  --source <project-relative-output> \
  --provenance <returned-provenancePath>
```

`--casting-model` is required: pass the `model.key` of the round route that
generated this candidate, so the board can show each candidate's model. Core
refuses a key that is not one of the round's routes
(`CASTING_CANDIDATE_MODEL_INVALID`).

Never pass `--select`: casting a Look is the director's pick. Do not add a
title or summary that only repeats the model name; the board shows it.

## QA

Follow `image-output-review.md`. Check that both panels are present side by
side, the face is readable, the full figure is uncropped head to feet, the
backdrop is plain, the clothes let the build read, the Look's age and build
read, the height scale agrees with the known height, and a later Look still
reads as the same person as its reference. Import the candidate anyway and
report concerns; the director hides weak candidates. Report candidates that
failed to generate, so the board's pending count makes sense.

## Casting Strength Table

The round panel shows one strength line per model, passed by
`casting-director` in `casting.round.open`'s `notes` keyed by model key.
These lines are Renku casting advice from the model guides, not maker claims.
Use them in the chat round in Claude Code too.

| Model key | Name | Strength line |
|---|---|---|
| `chatgpt-images-2.5` | GPT Image 2.5 (Codex) | Holds a reference face well; runs on your ChatGPT plan. |
| `gpt-image-2` | GPT Image 2 | Follows a detailed brief closely; clean, dependable layout. |
| `nano-banana` | Nano Banana | Keeps one face across references; strong for later Looks. |
| `flux-3-image` | FLUX 3 | Precise placement; describe what to show, no negatives. |
| `seedream-5.0-pro` | Seedream 5.0 Pro | Dense layouts; keeps the two-panel split clean. |
| `grok-imagine-image` | Grok Imagine Image | Quick variety from a short brief. |
| `flux-kontext-pro` | FLUX Kontext Pro | Carries a reference face into a new Look. |
| `z-image-turbo` | Z-Image Turbo | Fast; suits a wide first round with a long, detailed brief. |

Keep this table in step with the image lane of `default-models.json`.
