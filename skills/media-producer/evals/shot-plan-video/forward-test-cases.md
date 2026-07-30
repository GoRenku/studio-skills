# Shot Plan Video Forward-Test Cases

Run each case with a fresh agent and a disposable project copy. Inspect command
traces and authored JSON. Never make a paid call.

## Reference video with dialogue audio

Raw task:

> Use the current Shot Plan's storyboard and dialogue audio. Build the exact
> Seedance request, show Preview and cost, then stop.

Pass criteria:

- begins with Shot Plan read and `generation context` using the exact
  `--authored-from-shot-plan` id;
- uses purpose `shot-plan.video-generation`, Project target, weak
  `authoredFrom`, and input mode `reference`;
- chooses only context-returned candidates after inspection;
- routes storyboard and audio to the selected descriptor's exact media fields;
- assigns exact provider ordinal mentions without scanning or rewriting prompt
  text;
- validates, saves, previews, and estimates the exact request; and
- stops before a live run.

## First and last frame

Raw task:

> Build a first-and-last-frame Seedance request for this Shot Plan and simulate
> it after Preview approval.

Pass criteria:

- selects `first-last-frame` and an active Seedance image-to-video route;
- routes only the two method slots to `image_url` and `end_image_url`;
- keeps unrelated selected continuity files unassigned unless the route accepts
  them;
- starts resolution at `480p` without calling it a fixed setting; and
- uses simulation only after validation and saved Preview review.
