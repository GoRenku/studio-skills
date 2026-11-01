# Route choice

Read this guide for every image, audio and video request. It decides the
provider and model before any authoring or preparation. The order of a
generation is: target, route choice, authoring (a purpose desk when the route
has one), review, then execute, import and report.

## Casting rounds choose their own routes

`cast.casting-candidate` and `cast.character-sheet` requests never use this
guide's question or the Route Chooser. The round (the Codex casting round
panel, or the round the user confirmed in chat) already chose every provider,
model and count; map each confirmed model family to its operation route as
described below and follow [cast-casting-candidate.md](cast-casting-candidate.md)
or [cast-character-sheets.md](cast-character-sheets.md). A missing provider
key still stops preparation as `SKILL.md` describes. Every other purpose uses
this guide unchanged.

## Read the lane

From the current generation context, read `workflowPolicy.lane`, `provider`,
`model` and `chooseRouteBeforeGenerating`. The lane default is the saved
`model`, or, when it is `null`, the [Default Model List](default-models.json)
entry of that lane whose `recommendedFor` includes the provider.

The default is **missing** when either holds:

- the saved `model.key` is not in the lane's list for that provider; or
- the provider needs a key and `renku credentials status --json` does not
  report it `configured`. Codex built-in needs no key.

## Decide whether to ask

Take these in order:

1. **The user named a route in chat** (a provider, a model or both): use it and
   do not ask. Fill a missing half from the lane default when it fits,
   otherwise from the list's recommendation for the named provider.
2. **The default is missing:** ask even when `chooseRouteBeforeGenerating` is
   off, and say why in one sentence, for example "Your Image Editing default
   needs a Fal.ai key, which isn't saved."
3. **`chooseRouteBeforeGenerating` is on:** ask.
4. Otherwise use the lane default without asking.

Resolve the target first: an ambiguous `image.edit` uses the image chooser in
[image edit panels](image-edit-panels.md) before route choice.

## Ask in Codex Desktop: the Route Chooser

In trusted Codex Desktop whose `generation.review.capabilities` probe
advertises panel support, call `generation.route.choose`:

```ts
// generation.route.choose
{
  project: string;
  purpose: string;      // the Studio purpose, such as image.edit
  lane: 'image' | 'imageEdit' | 'video' | 'audio';  // workflowPolicy.lane
  defaultModelList: string; // absolute path of this Skill's references/default-models.json
  suggested?: { provider: string; model: string };  // a Default Model List key; omit to preselect the lane default
}
```

Pass `suggested` only when the user's words point at a route. Then end the
turn. The chooser posts one message:

```text
<Lane> route chosen · <model> on <provider>. Chooser <id>. Consume it with generation.route.consume once.
<Lane> route choice canceled. Chooser <id>. Consume it with generation.route.consume once.
```

Call `generation.route.consume` once with `{ choiceId }`:

- `chosen` returns `{ provider, providerLabel, model: { key, name } }` and
  `laneSettingsChanged`. Map that model family and the purpose to the exact
  operation route with the family's model guide and the provider's
  `supported-routes.json`, then continue with authoring.
- `canceled` means stop and reply briefly.
- `alreadyConsumed` authorizes nothing.

`DEFAULT_MODELS003` means `defaultModelList` does not name a readable file:
pass the absolute path of this Skill's `references/default-models.json`.

The chooser's "Save as Project default" and "Don't ask which provider and
model again" checkboxes are applied by the server only with Continue. Do not
repeat them with `renku settings generation set`; mention a saved change in one
sentence when `laneSettingsChanged` is true.

## Ask in Claude Code: the model question

Claude Code has no Renku panels. Its question box takes the Route Chooser's
place, for this generation's lane only. Read the choices first:

```bash
renku generation route options --project <name> --purpose <purpose> \
  --lane <image|image-edit|video|audio> \
  --file <this-skill-dir>/references/default-models.json --json
```

Add `--provider <id> --model <key>` only when the user's words point at a
route, as with `suggested`. The output is the Route Chooser's data: `lane`,
`laneLabel`, `providers` (each with `label`, `available` and `models` of
`{ key, name, recommended }`), `preselected` and
`chooseRouteBeforeGenerating`. `available: false` means the provider's key
is not saved; offer none of its models. Codex (built-in) runs only inside
Codex: leave its models out in Claude Code, and treat a Codex `preselected`
as a missing default ("Your Image default is Codex's built-in model, which
only runs in Codex."), recommending the first offered model instead.

Ask with one `AskUserQuestion` call holding two questions:

1. **Model** (header `Model`), for example "Which model for this image
   edit?". Up to four options, each labeled `<model name> · <provider
   label>`: first `preselected`, with "(Recommended)" after the label and a
   description saying it is the lane default (or the recommendation when the
   lane has none); then other models on available providers, each
   provider's `recommended` model first, in list order. Put the provider
   label in the label, not only the description. The built-in "Other" lets
   the user type any model: match it by name against the output, and ask
   again if no available provider offers it.
2. **Default** (header `Default`), "Keep this choice?", with three options:
   "Just this once", "Save as Project default", "Save and don't ask again".

When `preselected` is `null` or the default is missing, say why in one
sentence before asking, as above. Then:

- **Just this once:** change no settings.
- **Save as Project default:** `renku settings generation set --lane <lane>
  --provider <id> --model <key> --model-name <name>`.
- **Save and don't ask again:** the same command with `--choose-route off`.

Mention a saved change in one sentence, then map the family to the route as
above.

## Ask in other harnesses

Codex CLI and other hosts without panels or a question box ask the same
model question in plain text, built from the same `renku generation route
options` output, and wait for the answer. Offer Codex only when the current
harness exposes built-in image generation.

## Turning the question back on, or saving a default

Change lane settings only when the user directly asks, with
`renku settings generation set`. For example, "ask me which model to use again
for image edits":

```bash
renku settings generation set --lane image-edit --choose-route on
```

To save a default the user names: `--provider <id> --model <key> --model-name
<name>`, or `--clear-model` to go back to the recommendation. Changing the
provider without a model clears the model. `renku settings generation show
--lane <lane>` prints the current lane.
