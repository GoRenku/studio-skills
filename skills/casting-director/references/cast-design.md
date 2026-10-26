# Cast Design

Cast Design is a Cast Member-owned department document.

Use it for:

- interpretation;
- appearance;
- performance;
- base wardrobe logic (the rules every costume follows);
- voice casting notes;
- continuity;
- generation guidance.

Commands:

```bash
renku cast design context --cast <cast-member-id> --json
renku cast design list --cast <cast-member-id> --json
renku cast design show --active --cast <cast-member-id> --json
renku cast design show --design <cast-design-id> --json
renku cast design validate --file tmp/operations/cast-design.json --json
renku cast design write --file tmp/operations/cast-design.json --json
renku cast design set-active --cast <cast-member-id> --design <cast-design-id> --json
```

Keep the document about casting. Do not store generated media paths or Scene Beats directions in Cast Design.

Costumes are not part of Cast Design. Each costume, with its Look and Scenes,
lives in the wardrobe plan (`wardrobe-plan.md`); ages and big physique changes
are Looks (`looks.md`). Cast Design keeps only `costume.baseWardrobeLogic`, the
wardrobe rules that hold across every costume.

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
  `continuity.mustRemainConsistent`, or
  `generationGuidance.characterSheetPositive`; accessories of one costume go in
  that costume's `wardrobe` in the wardrobe plan;
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
      "baseWardrobeLogic": ["Core wardrobe logic."]
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
