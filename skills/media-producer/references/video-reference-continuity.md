# Video Reference Continuity

Read this for every video-generation or video-edit workflow after selecting the
exact provider route and inspecting its live schema. This policy is based on
capability, never on a model-family name.

## Determine whether exact Dialogue Audio can be supplied

Inspect the live schema for uploaded audio reference media and its current
count/duration limits. Do not treat native audio generation, a prompt sound
field, or an output-audio switch as reference-audio support.

- When the route accepts uploaded audio references, resolve relevant Dialogue
  Takes and include them by default unless the user explicitly asks to omit
  them.
- When it does not, do not invent a field or mention. Explain that exact
  Dialogue Audio continuity cannot be supplied, suggest a capable route when
  one is available within the user's provider choice, and ask whether to switch
  or continue without the references.
- When the resolved files exceed a live route limit, never truncate them.
  Ask the user to narrow Dialogue scope or choose another capable route.
- A Scene with no Dialogue Turns has no Dialogue Audio prerequisite.

Audio references condition generation. Do not promise that they replace the
final mix unless the selected provider explicitly documents that behavior.

## Resolve selected Shot Plan Takes

Use the `dialogueAudio` candidates in the exact Shot Plan Generation Context.
Include every active candidate with `isSelected: true` and no unselected
candidate. Each selected Take remains one exact reference URL whether it covers
one Turn or a consecutive Turn range. Do not concatenate, group, rank, fill
gaps, choose the latest, or infer a preferred combination.

If no Take is selected and the video needs exact Dialogue Audio, ask the user
to open the Shot Plan **Audio** tab and select the intended Media Cards. If
selected Takes exceed the chosen provider route's live reference limit, ask the
user to narrow the selection or choose another capable route. Never truncate
the selected set.

An explicit user request to omit Dialogue Audio wins over these defaults.

## Reference roles

Give each accepted audio reference one narrow provider-visible role: exact
voice/performance continuity, score, ambience, rhythm, or sound texture. Use
only mention syntax derived by the selected provider adapter from final native
request order. Never copy Asset ids, domain roles, or a guessed token into the
provider request.
