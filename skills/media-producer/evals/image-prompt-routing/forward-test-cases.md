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

## Project cover

> Create a 16:9 Project cover that matches the established Production Lookbook
> and features the named Cast Member at the named Location.

The agent uses `project.cover` with target `project`, reads only the missing
Project Info plus the exact Production Lookbook, Cast, and Location context
needed for this request, and authors only deliberately chosen media references.
It does not load the Storyboard Lookbook or unrelated Project media. After user
acceptance, it imports through `media import --purpose project.cover --target
project`; it adds `--select` only for an explicitly chosen active cover.

## Shot image candidate

> Create a selected image candidate for this authored Shot.

The agent targets the exact Shot with `shot.image`, preserves the authored
title, description, brief, Scene context, and storyboard reference as opaque
context, and selects the path from explicit direction, saved spec, then the
Project's **Use Codex for image generation** setting. It does not apply a
Shot-specific setting.
After the user accepts the output, the
agent attaches and selects it atomically with `renku media import --purpose
shot.image --target shot:<id> --select`. It does not add a second selection
call.

## Agent-owned image-edit workflow

> Edit the current image so only the brass door becomes oxidized green.

Run this focused group first with **Use Codex for image generation** on and no
explicit override, then with an explicit Renku override:

- Resolve the exact source Asset and AssetFile, target the Asset with
  `image.edit`, and lock that exact file in `source/source-image`.
- Save the request and show Preview. The prompt identifies the locked source by
  its exact mention, states the focused change, and preserves the rest.
- Apply the Project Preview and confirmation settings.
  The managed branch always retains its exact estimate-token gate.
- With the setting on, default to `agent-external` with the actual
  `codex/gpt-image-2` identity. Do not select the managed `/edit` route merely
  because the purpose is `image.edit`.
- For the explicit managed branch, execute after estimate approval, display
  the output, ask separately whether to attach it, and import an accepted
  output through the chosen focused image purpose/target with the exact
  receipt.
- For the default Codex branch, read and freeze the reviewed spec, display the
  output, ask separately whether to attach it, and import an accepted output
  through the real focused purpose/target with `--source-spec`.
- Reject one output and verify it remains unattached.
- In both accepted branches, verify the new output is a separate unselected
  Asset and the original Asset, AssetFile, ownership, and selection/display
  state remain unchanged. Verify that the selected destination may have a
  different owner from the edit source.

If the external provider/model or a non-prompt value changes, update the saved
spec through the CLI and show Preview again before execution. Never use the
read-only Studio Generation Request inspector as an editing surface.

## Create-versus-edit routing across image purposes

Run each pair below without paid generation:

1. `Create another Cast Profile with a new full-body pose in the foundry.`
   Then: `Keep this exact result, but remove only the hammer from her hand.`
2. `Create a new Location Hero from inside the gate looking toward the city.`
   Then: `Change only the gate doors from oak to oxidized bronze and leave the
   rest of this image the same.`
3. `Create a new Project Cover with an entirely different centered
   composition.` Then: `Use this exact cover and make only the title lettering
   white.`
4. `Recompose this Shot Image from a low rear angle with the actors in a new
   depth order.` Then: `On that exact image, remove only the modern cable in the
   corner.`

For every pair:

- the first request uses the focused creation purpose and target;
- the second request is reclassified independently as `image.edit`, targets the
  exact registered result Asset, and locks its exact AssetFile in
  `source/source-image`;
- the prior focused purpose is not retained for the edit request;
- the accepted edit may return through the intended focused image destination,
  whose owner need not match the source owner; and
- no prompt wording, image-reference presence, or provider route name is used
  as a substitute for the purpose decision.

## Multi-turn Storyboard correction is not sticky

First request:

> Beat 8 needs a new composition. The cannon must face the walls, troops must
> attend it without blocking the firing line, Mehmed II on horseback must stand
> behind it, and Urban must stand separately behind it. Analyze the existing
> image and generate a proper replacement.

Pass criteria:

- recognizes that the requested camera, firing axis, depth order, staging, and
  subject arrangement require a materially recomposed candidate;
- uses `scene.storyboard-sheet`, with the existing image only as a deliberately
  chosen reference if useful; and
- does not select `image.edit` merely because the user called the task an edit.

Follow-up on the generated candidate:

> Edit this image so the two breaches in the walls are closed. The cannon has
> not fired yet. Leave everything else the same.

Pass criteria:

- reruns operation routing instead of inheriting `scene.storyboard-sheet`;
- registers the unattached candidate as an unselected Storyboard candidate
  with its exact provenance when necessary to obtain an Asset and AssetFile;
- authors a new `image.edit` request targeting that exact Asset and locks only
  its exact AssetFile as `source/source-image`;
- does not place the candidate in an Additional slot inside another
  `scene.storyboard-sheet` request; and
- imports an accepted edited output through the exact Beat Storyboard
  destination without changing the source candidate.

## Provider edit route does not choose the purpose

> Create a new four-Beat Scene Storyboard using the managed GPT Image 2 route
> and the required Storyboard, Cast, Location, and Prop references.

The request remains `purpose: scene.storyboard-sheet` even though the selected
provider endpoint is `fal-ai/openai/gpt-image-2/edit`. Conversely, a localized
Codex source edit uses `purpose: image.edit` even though its model identity is
`codex/gpt-image-2` without an `/edit` suffix.

## Unattached source requires explicit source resolution

> Keep the exact image you just generated, change only the walls, and leave it
> unselected until I approve the edit.

When the candidate has a known focused destination but is not yet registered,
the agent imports it there as an unselected candidate with exact provenance,
reports that durable registration, and uses the returned AssetFile as the
locked edit source. It does not select the candidate and does not disguise a
project-file reference as an edit. If no destination is known, it asks for that
product decision before registration.

## Codex external

> Use Codex built-in image generation for this approved Location Sheet.

The agent uses the GPT Image 2 guide, preserves the external execution
envelope, sends the frozen prompt unchanged, and does not author managed
provider settings. It invokes Codex without Renku estimate approval and asks an
additional conversational confirmation only when the Project's Codex
confirmation setting is on.

## Missing guide

Temporarily add an exposed image route to the disposable CLI fixture without a
registry entry. Validation and authoring must fail before a prompt is written.
