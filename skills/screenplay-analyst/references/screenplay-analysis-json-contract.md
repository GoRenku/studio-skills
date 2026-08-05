# Screenplay Analysis JSON Contract

The document is a closed hierarchy-independent JSON object:

```json
{
  "structureModel": "threeAct",
  "title": "Three-act screenplay analysis",
  "summary": "A concise critique summary.",
  "criteria": [],
  "actSegments": [],
  "keyBeats": [],
  "sceneGroups": [],
  "sceneAnalyses": [],
  "suggestedScenes": []
}
```

## Required Criteria

Always include these criteria:

- `dramaticEnergy`: how strongly the moment pulls the audience forward.
- `stakes`: how clearly the audience understands what can be lost or gained.
- `characterAgency`: how clearly a character's choice drives the story.

Additional criteria are allowed when useful, but every score key must be declared in `criteria`.

Scores are integers from `0` to `100`.

## Analytical Act Segments

Each act entry has:

```json
{
  "role": "actOne",
  "title": "The Offer",
  "synopsis": "What the act currently does.",
  "sceneIds": ["scene_..."],
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

For `threeAct`, include exactly three segments in screenplay order with roles
`actOne`, `actTwo`, and `actThree`. Their `sceneIds` must partition all current
Scenes exactly once and preserve canonical order. They do not reference
screenplay Section ids.

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

A key beat requires `key`, `label`, `synopsis`, `scoreByCriterion`, and
`critique`. Include exactly one entry for every v1 key. `sceneId` is optional;
omit it when the beat is absent or not embodied clearly enough to place.

## Scene Groups And Scene Analysis

`sceneGroups` are optional analysis-owned groupings. Each group requires
`title`, `synopsis`, `sceneIds`, `scoreByCriterion`, and `critique`, with an
optional `beatRole`. When present, groups partition every current Scene exactly
once in canonical order.

`sceneAnalyses` require `sceneId`, `synopsis`, `scoreByCriterion`, and
`critique`, with an optional `beatRole`. Include exactly one entry per current
Scene in canonical order.

Scene references must match the current canonical ordered Scene list from
`renku screenplay analyze context --json`.

## Suggested Scene Additions

Suggestions are not mutations:

```json
{
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

Use either `beforeSceneId` or `afterSceneId`, not both. The anchor must be a
current Scene id.

## Rejections

Validation rejects unknown fields, duplicate criteria, undeclared score keys,
invalid scores, missing default criteria, unknown Scene references, incomplete
or out-of-order partitions, duplicate/missing key-beat roles, and suggestions
without exactly one valid Scene anchor.
