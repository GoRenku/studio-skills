# Route choice

Read this guide for every image, audio and video request. It decides the
provider and model before any authoring or preparation. The order of a
generation is: target, route choice, authoring (a purpose desk when the route
has one), review, then execute, import and report.

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

`CODEX_ROUTE_CHOICE_NOT_SYNCED` means the Default Model List was not synced in
this task: run `renku generation default-models sync` as the Media Producer
Skill describes, then open the chooser again.

The chooser's "Save as Project default" and "Don't ask which provider and
model again" checkboxes are applied by the server only with Continue. Do not
repeat them with `renku settings generation set`; mention a saved change in one
sentence when `laneSettingsChanged` is true.

## Ask in other harnesses: one short question

In Codex CLI, Claude and other hosts, ask one short question naming the lane
default (or the recommendation) and two or three alternatives from the lane's
list for keyed providers; offer Codex only when the current harness exposes
built-in image generation. Use the harness's structured question tool when it
has one; otherwise ask in plain text. Wait for the answer, then map the family
to the route as above.

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
