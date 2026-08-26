# Image Routing Forward Test Cases

- A new composition with reference images remains focused creation; references
  are native provider inputs, not proof of `image.edit`.
- “Change only the coat color and preserve everything else” uses `image.edit`
  against the exact source.
- Choosing Codex requires the active built-in capability; absence produces a
  question, never silent Fal.ai fallback.
- Choosing Fal.ai routes to the indexed create or `/edit` operation and leaves
  unsupported native fields absent.
- Every accepted result is inspected before focused attachment and retains the
  exact safe request provenance.

## image-create-shot-plan — Generic reference creation

`image.create` targets an exact `shotPlan:<id>`, uses the complete Shot Plan
context, and imports an accepted image beside that Plan as a generic Reference
Image. It does not invent a more specific purpose or attach Project-wide.

## image-edit-source-preserving — Source-preserving edit

Edit a Location Sheet by changing only one door material. Target its exact
Asset, include its current Asset File marker with a meaningful `reviewLabel`,
and author the model-native `promptMention` only when the provider guide calls
for one. Import the result through `image.edit`; verify it appears beside the
same Location Sheet while the source and current selection remain unchanged.

## image-create-versus-edit — Create-versus-edit routing

Recompose a Shot from a new angle, then remove one cable from that exact
candidate. The first operation remains `shot.image`; the second is
`image.edit`. Reference presence and a provider `/edit` route never choose the
Studio purpose.

## image-provider-edit-route — Provider edit route is not purpose

A four-Beat Storyboard may use a provider edit endpoint while remaining
`scene.storyboard-sheet`. Conversely, a focused Codex source edit remains
`image.edit` even though the model name has no `/edit` suffix.

## image-multi-turn-storyboard-correction — Correction is not sticky

First materially recompose a Beat Storyboard with `scene.storyboard-sheet`.
Then close only two wall breaches on that exact candidate with `image.edit`.
Register an unattached source as an unselected candidate before editing when
needed; never put it into an Additional slot and never replace the source.
