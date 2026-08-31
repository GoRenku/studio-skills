# Scene Dialogue Audio

Use the existing `scene.dialogue-audio` purpose with ElevenLabs. One provider
request and one accepted Take always belong to one exact screenplay Dialogue
Turn. Never concatenate a Scene into one audio file.

## Read and prepare the workspace

Resolve the durable Scene id, then show its current workspace:

```bash
renku dialogue-audio show --scene <scene-id> --json
```

For each requested turn, require exact Cast membership and one current
ElevenLabs Cast Voice registration. If the Cast Voice is missing or ambiguous,
stop that turn and tell the user what to register or choose. Never substitute a
different Cast Member or provider voice.

When setup is missing or the user asks to change it, author one complete
current `SceneDialogueAudioSetup` JSON document and write it through Core:

```bash
renku dialogue-audio setup \
  --scene <scene-id> \
  --dialogue <turn-id> \
  --file tmp/operations/media-generation/dialogue-setup.json \
  --json
```

Do not invent CLI defaults or a partial setup patch. Re-read the workspace
after setup.

## One Dialogue Turn

1. Read the exact generation context:

   ```bash
   renku generation context \
     --purpose scene.dialogue-audio \
     --target scene:<scene-id>:dialogue:<turn-id> \
     --json
   ```

2. Read the current ElevenLabs route schema and canonical audio guide.
3. Author one unique review document containing the exact spoken text, current
   Cast Voice id, saved voice settings, model, output format, language choice,
   and text treatment required by that route.
4. Validate, Preview when required, and obtain conversational confirmation.
5. Execute one ElevenLabs request, inspect the one output file, and attach one
   Take with the exact provenance through `scene.dialogue-audio`.
6. Re-read the workspace. A new Take remains unselected until the user picks it
   in Scene Narrative.

## Whole Scene

Show the Scene workspace before preparing requests. Process Dialogue Turns in
screenplay order. If some turns already have Takes and the user's request does
not say whether to replace or fill gaps, ask whether to generate only missing
turns or a new Take for every turn.

Prepare one independent setup/context/review/request/output/provenance/Take per
turn. Independent requests may use the Project's audio concurrency policy, but
each retains its own terminal result. A failed turn stays failed; do not report
one combined Scene success and do not attach another turn's output in its place.

ElevenLabs is the only current provider for this workflow. Do not route Scene
Dialogue Audio through a video model's native speech generation.
