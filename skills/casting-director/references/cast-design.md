# Cast Design

Cast Design is a Cast Member-owned department document.

Use it for:

- interpretation;
- appearance;
- performance;
- costume and scoped costume variants;
- voice casting notes;
- continuity;
- generation guidance.

Commands:

```bash
renku cast design context --cast <cast-member-id> --json
renku cast design list --cast <cast-member-id> --json
renku cast design show --active --cast <cast-member-id> --json
renku cast design show --design <cast-design-id> --json
renku cast design validate --file <cast-design-json> --json
renku cast design write --file <cast-design-json> --json
renku cast design set-active --cast <cast-member-id> --design <cast-design-id> --json
```

Keep the document about casting. Do not store generated media paths or shot-list directions in Cast Design.

Costume variants can be scoped to the whole project, one sequence, or one scene. They are authored design guidance, not standalone media targets yet.

## JSON Contract

Do not guess the Cast Design shape. Validate against this structure before
writing:

```json
{
  "kind": "castDesign",
  "castMemberId": "cast_...",
  "title": "Optional design title",
  "design": {
    "interpretation": {
      "roleUnderstanding": "How this character functions in the film.",
      "audienceRead": ["What the audience should read immediately."],
      "contradictions": ["Useful inner or visual contradictions."]
    },
    "appearance": {
      "ageRead": "Optional.",
      "build": "Optional.",
      "face": "Optional.",
      "posture": "Optional.",
      "movement": "Optional.",
      "grooming": "Optional.",
      "silhouette": "Optional."
    },
    "performance": {
      "behavioralPressure": ["What pressure shapes behavior."],
      "stillness": ["How stillness behaves."],
      "gesture": ["Specific gesture language."],
      "statusShifts": ["How status changes in scenes."],
      "sceneEnergy": ["Energy words useful to performers and generators."]
    },
    "costume": {
      "baseWardrobeLogic": ["Core wardrobe logic."],
      "variants": [
        {
          "label": "variant-name",
          "scope": { "kind": "project" },
          "wardrobe": ["Visible wardrobe items."],
          "continuityNotes": ["What must remain stable."]
        }
      ]
    },
    "voiceCasting": {
      "voiceIdentity": "Optional voice direction.",
      "accent": "Optional.",
      "tempo": "Optional.",
      "texture": "Optional.",
      "emotionalRange": ["Optional."],
      "localeNotes": ["Optional."]
    },
    "continuity": {
      "mustRemainConsistent": ["Identity anchors."],
      "canChange": ["Allowed variation."]
    },
    "generationGuidance": {
      "characterSheetPositive": ["Positive character-sheet requirements."],
      "characterSheetNegative": ["Things to exclude."],
      "profilePositive": ["Positive profile requirements."],
      "profileNegative": ["Things to exclude."],
      "futureCostumeMediaNotes": ["Optional."],
      "futureVoiceMediaNotes": ["Optional."]
    }
  },
  "openQuestions": []
}
```

For scoped costume variants, use exactly one scope shape:

- `{ "kind": "project" }`
- `{ "kind": "sequence", "sequenceId": "sequence_..." }`
- `{ "kind": "scene", "sceneId": "scene_..." }`
