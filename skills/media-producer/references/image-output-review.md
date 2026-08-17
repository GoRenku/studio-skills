# Image Output Review

This file owns generated-image review control flow. Focused purpose guides own
their observable quality criteria. Findings are advisory: they never become a
Studio attachment gate, and the user may explicitly accept and attach an
imperfect result after seeing it and the feedback.

## Review-first mode

Review-first is the default.

1. Author, save, review, and execute one exact request.
2. Inspect the result once against the focused purpose checklist.
3. Show the image to the user.
4. Report concise passes, concrete concerns, and a recommended next action.
5. Wait for accept and attach, regenerate with a revised request, or
   discard/leave unattached direction.

Do not automatically generate a second image. A failed creative criterion does
not prohibit explicit user acceptance.

## Strict iterative mode

Use strict iterative mode only after the user explicitly asks for automatic
iteration or absolute correctness and acknowledges that each attempt is a new
generation/usage action. The choice is task-scoped conversation state; never
persist it in Project Settings, a GenerationSpec, an Asset, or a QA record.

Before the first attempt, state the applicable observable criteria. After each
attempt:

1. inspect against them and record concrete visual failure evidence;
2. change a justified prompt, reference, layout instruction, or model input;
3. author and review a new GenerationSpec for the changed creative request;
4. apply the normal Preview setting, confirmation setting, estimate/token or
   external freeze, concurrency, and provenance rules; and
5. continue until the result passes, the user interrupts or accepts it, or a
   real blocker or approval boundary is reached.

A visual-quality failure never authorizes a blind identical retry. Retrying an
unchanged frozen request is only the existing operational retry path and must
not be described as a creative correction. Strict iteration adds no queue,
scheduler, hidden attempt counter, spend ceiling, or approval bypass.

The user may stop and accept the current image at any time after reading the
feedback. Attach only when it passes under the user's original strict
authorization or the user explicitly accepts the current imperfect result.
