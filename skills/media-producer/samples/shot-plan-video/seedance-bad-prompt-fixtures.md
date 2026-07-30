# Seedance Bad Prompt Fixtures

Use these as negative examples when checking the skill. Do not use them for
generation.

## Panel Blending Risk

Bad:

```text
Use this storyboard as inspiration and create a dramatic panorama containing
all the important elements from every panel.
```

Why it fails: tells Seedance to combine panels as ingredients instead of
turning them into time.

Better direction: describe each panel/beat in order and state whether they are
continuous waypoints or edited shots.

## Rendered Arrows/Text Risk

Bad:

```text
Follow the arrows and labels in the storyboard exactly.
```

Why it fails: does not say arrows/labels are instructions only, so they may
appear as on-screen graphics.

Better direction: "Arrows and labels describe motion only; do not render them
in the footage."

## Studio Context Leakage

Bad:

```text
Use the selected video prompt sheet and approved Lookbook card from Studio.
```

Why it fails: provider cannot see selected app state, and "video prompt sheet"
is internal storage vocabulary.

Better direction: name the provider token and visible role, such as
`@Image1 is the storyboard`.

## Geography Contradiction

Bad:

```text
Start outside the city wall, then show the cannon inside the city firing toward
the field, then end outside again.
```

Why it fails: reverses geography and invites morphing or impossible spatial
continuity.

Better direction: define what stays field-side, wall-side, city-side, frame
left/right, and foreground/background.

## Period Drift

Bad:

```text
Make the city skyline more iconic and cinematic with domes, minarets, street
lamps, and dramatic modern smoke.
```

Why it fails: invents period details that may contradict the take context.

Better direction: state concrete era constraints from project context and name
forbidden visible anachronisms.
