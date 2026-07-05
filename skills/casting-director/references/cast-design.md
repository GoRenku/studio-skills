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

For character-sheet readiness, use the current Cast Design fields to capture
height and accessory continuity when the user supplies them. Do not invent new
JSON fields for this skill guidance:

- put exact or intended height in `appearance.build`, `appearance.silhouette`,
  `continuity.mustRemainConsistent`, or
  `generationGuidance.characterSheetPositive`;
- put the one-line role or identity synopsis for the left-column synopsis block
  in `interpretation.audienceRead`, `interpretation.roleUnderstanding`, or
  `generationGuidance.characterSheetPositive`;
- put character-owned accessory continuity in `costume.baseWardrobeLogic`,
  `costume.variants[].wardrobe`, `continuity.mustRemainConsistent`, or
  `generationGuidance.characterSheetPositive`;
- use `generationGuidance.characterSheetNegative` to exclude invented
  accessories, scene props, location props, weapons, expression sheets, and
  story panels when needed;
- do not invent height, weight, gender, synopsis facts, accessories, or visible
  metadata just because the lean sheet template can display those fields.

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
