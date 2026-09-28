# Image Output Review

This file owns generated-image review control flow. Focused purpose guides own
their observable quality criteria. Findings are advisory: they never become a
Studio attachment gate. Attach generated results automatically and report
imperfections so the user can decide whether to keep, delete, or revise them.

## Inspect and attach mode

Automatic attachment after inspection is the default for every image purpose
and provider, including source-preserving edits.

1. Author, save, review, and execute one exact request.
2. Inspect the result once against the focused purpose checklist.
3. Attach the result through its focused destination with safe provenance,
   without asking for acceptance or attachment confirmation.
4. Show the image and report attachment, concrete concerns, and any recommended
   next action. Continue remaining generation already requested by the user.

Do not automatically generate an unrequested corrective image. A failed creative criterion does
not block attachment. Honor an explicit request to review before attachment or
leave results unattached. Missing or unusable files still require resolution.

Before acting on any follow-up, rerun `image-operation-routing.md`. Another
interpretation or materially recomposed result keeps the focused creation
purpose. Choosing this exact result as the canvas and preserving it except for
named changes switches to `image.edit`. Do not treat `regenerate` as a sticky
purpose or treat every correction as another focused generation.

## Strict iterative mode

Use strict iterative mode only after the user explicitly asks for automatic
iteration or absolute correctness and acknowledges that each attempt is a new
generation/usage action. The choice is task-scoped conversation state; never
persist it in Project Settings, an Asset, provenance, or a QA record.

Before the first attempt, state the applicable observable criteria. After each
attempt:

1. inspect against them and record concrete visual failure evidence;
2. change a justified prompt, reference, layout instruction, or model input;
3. rerun image operation routing, then author and review a new temporary request
   with the resulting purpose and target;
4. apply the lane-specific Preview, generation authorization, concurrency, and
   provenance rules; and
5. continue until the result passes, the user interrupts or accepts it, or a
   real blocker or approval boundary is reached.

A visual-quality failure never authorizes a blind identical retry. Retrying an
unchanged submitted request is only the existing recovery path and must
not be described as a creative correction. Strict iteration adds no queue,
scheduler, hidden attempt counter, spend ceiling, or approval bypass.

The user may stop and accept the current image at any time after reading the
feedback. Under this explicit strict-iteration instruction, attach automatically
when it passes or the user accepts the current imperfect result; do not add a
separate attachment confirmation.
