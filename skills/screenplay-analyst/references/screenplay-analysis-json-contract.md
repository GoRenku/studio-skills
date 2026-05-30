# Screenplay Analysis JSON Contract

The document is a tagged JSON object:

```json
{
  "kind": "screenplayAnalysis",
  "structureModel": "threeAct",
  "title": "Three-act screenplay analysis",
  "summary": "A concise critique summary.",
  "criteria": [],
  "acts": [],
  "keyBeats": [],
  "sequences": [],
  "scenes": [],
  "suggestedSceneAdditions": []
}
```

## Required Criteria

Always include these criteria:

- `dramaticEnergy`: how strongly the moment pulls the audience forward.
- `stakes`: how clearly the audience understands what can be lost or gained.
- `characterAgency`: how clearly a character's choice drives the story.

Additional criteria are allowed when useful, but every score key must be declared in `criteria`.

Scores are integers from `0` to `100`.

## Act Analysis

Each act entry has:

```json
{
  "actId": "act_...",
  "actRole": "actOne",
  "title": "The Offer",
  "synopsis": "What the act currently does.",
  "scoreByCriterion": {
    "dramaticEnergy": 54,
    "stakes": 60,
    "characterAgency": 48
  },
  "critique": {
    "summary": "Specific critique.",
    "strengths": ["Concrete strength."],
    "concerns": ["Concrete concern."],
    "evidence": [{ "sceneId": "scene_...", "text": "Evidence." }],
    "suggestions": ["Actionable suggestion."]
  }
}
```

For `threeAct`, include exactly three act analyses in screenplay order with roles `actOne`, `actTwo`, and `actThree`.

## Key Beats

Use the v1 beat keys when they apply:

- `hook`
- `incitingIncident`
- `firstPlotPoint`
- `firstPinchPoint`
- `midpoint`
- `secondPinchPoint`
- `secondPlotPoint`
- `climax`
- `resolution`

A key beat may reference an act, sequence, and scene.

## Sequence And Scene Analysis

Sequence entries require `sequenceId`, `actId`, `title`, `synopsis`, `scoreByCriterion`, and `critique`.

Scene entries require `sceneId`, `sequenceId`, `actId`, `title`, `synopsis`, `scoreByCriterion`, and `critique`.

References must match the current screenplay graph from `renku screenplay analyze context --json`.

## Suggested Scene Additions

Suggestions are not mutations:

```json
{
  "targetActId": "act_...",
  "targetSequenceId": "sequence_...",
  "placement": { "afterSceneId": "scene_..." },
  "title": "The Maker Calculates",
  "purpose": "Give Urban an active choice.",
  "synopsis": "What the suggested scene would do.",
  "rationale": "Why it improves the arc.",
  "expectedCriterionChanges": [
    {
      "criterionKey": "characterAgency",
      "direction": "increase",
      "reason": "The audience sees the choice."
    }
  ]
}
```

Use either `beforeSceneId` or `afterSceneId`, not both. Placement scene ids must belong to the target sequence.

## Rejections

Validation rejects unknown fields, duplicate criteria, undeclared score keys, invalid scores, missing default criteria, unknown references, and act/sequence/scene mismatches.
