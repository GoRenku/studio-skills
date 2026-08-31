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

## Resolve one Take per relevant Dialogue Turn

Use the `dialogue-audio` candidates in Generation Context. Keep all active
candidates visible and apply this order independently to each turn:

1. If exactly one candidate has `isWorkflowSelected: true`, use it.
2. If none is workflow-selected and exactly one active candidate exists, use
   that sole Take.
3. If none is selected and several active candidates exist, stop and ask the
   user to open that Scene's **Narrative** tab, open the Dialogue block's
   **Takes** tab, and pick the Take to use. Never choose first, latest, or a
   display-selected Asset.
4. If no active candidate exists, stop and ask the user to create Dialogue
   Audio for that Dialogue in the Scene **Narrative** workflow.

An explicit user request to omit Dialogue Audio wins over these defaults.

## Reference roles

Give each accepted audio reference one narrow provider-visible role: exact
voice/performance continuity, score, ambience, rhythm, or sound texture. Use
only mention syntax derived by the selected provider adapter from final native
request order. Never copy Asset ids, domain roles, or a guessed token into the
provider request.
