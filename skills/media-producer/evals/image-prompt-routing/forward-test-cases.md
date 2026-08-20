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

Run this focused group for both a Renku-managed route and Codex external
generation:

- Resolve the exact source Asset and AssetFile, target the Asset with
  `image.edit`, and lock that exact file in `source/source-image`.
- Save the request and show Preview. The prompt identifies the locked source by
  its exact mention, states the focused change, and preserves the rest.
- Apply the Project Preview and confirmation settings.
  The managed branch always retains its exact estimate-token gate.
- For the managed branch, execute after estimate approval, display the output,
  ask separately whether to attach it, and import an accepted output through
  the source owner's real focused purpose/target with the exact receipt.
- For the Codex branch, use `agent-external` with the actual
  `codex/gpt-image-2` identity, read and freeze the reviewed spec, display the
  output, ask separately whether to attach it, and import an accepted output
  through the real focused purpose/target with `--source-spec`.
- Reject one output and verify it remains unattached.
- In both accepted branches, verify the new output is a separate unselected
  Asset and the original Asset, AssetFile, ownership, and selection/display
  state remain unchanged.

If the external provider/model or a non-prompt value changes, update the saved
spec through the CLI and show Preview again before execution. Never use the
read-only Studio Generation Request inspector as an editing surface.

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
