# Image Prompt Routing Forward Tests

Run these cases in a disposable project and stop before paid generation.

## Route coverage

Ask for each current image purpose using every exact route returned by
`generation model list`. The agent must load the matching registry guide and
the purpose guide, or fail before authoring when the route has no guide.

## Concise generation

> Create a simple Lookbook image of an empty rain-soaked arcade at blue hour.

The prompt stays concise and uses generation guidance.

## Reference-conditioned generation

> Create a Cast profile using the selected Character Sheet and Lookbook image.

The exact selected references receive stable `promptMention` values, and the
prompt names their distinct roles without inferring roles from input order.

## Revise source

> Edit the current image so only the brass door becomes oxidized green.

The request keeps `image.edit`, identifies the locked source by its exact
mention, states the focused change, and preserves the rest of the image.

## Regenerate an edit

> Regenerate this earlier edit with a different supported model family.

The new request remains `image.edit`; Regenerate does not convert it to a
general creation prompt.

## Codex external

> Use Codex built-in image generation for this approved Location Sheet.

The agent uses the GPT Image 2 guide, preserves the external execution
envelope, sends the frozen prompt unchanged, and does not author managed
provider settings.

## Missing guide

Temporarily add an exposed image route to the disposable CLI fixture without a
registry entry. Validation and authoring must fail before a prompt is written.
