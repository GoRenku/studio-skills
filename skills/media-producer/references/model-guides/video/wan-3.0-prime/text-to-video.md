# Wan 3.0 Prime Text-To-Video

Read `index.md` first. Use this only when no exact media input should control
the result.

## Prompt Contract

- For a short single action, use a compact brief with subject, movement,
  setting, camera, light, and sound.
- For a longer or multi-beat result, use labeled sections or time ranges and
  align every beat to the selected duration.
- State one camera setup per beat and the transition between beats.
- Give sound a physical cause and specify dialogue, ambience, effects, music,
  or held silence when known.
- Put non-negotiable identity, geography, period, and visible exclusions in
  explicit language that will survive prompt expansion.

## Compact Template

```text
[Subject] [performs one physical action] in [specific setting and time], seen
through [camera scale, lens feel, and one movement]. [Directed light, material,
and secondary environment motion]. Sound: [ambience and physical effects],
[music or no music]. Keep [critical continuity] stable. Do not include:
[critical visible exclusions].
```

## Timecoded Template

```text
STYLE AND SETTING
[Concrete visual finish, subjects, location, light, and continuity anchors].

TIMELINE
0-[N]s: [camera setup, action, and physical sound event].
[N]-[N]s: [next setup or continuous move, action, and sound progression].
[N]-[end]s: [final action and held ending composition].

SOUND
[Ambience, effects, exact quoted dialogue and delivery when known, music or silence].

Do not include: [critical visible exclusions].
```

## Paraphrased Examples

Compact exploration:

```text
A lone cyclist leans through one rain-slick corner at blue hour, tracked from
curb height on a long lens. Wet tire hiss, chain chatter, no music. Keep the
red frame and yellow jacket unchanged; no traffic or text.
```

Labeled block brief:

```text
STYLE: restrained large-format drama, cold dawn outside and warm work lights.
CHARACTERS: the same mechanic in a dark coverall throughout.
ACTION: she opens the hangar, crosses to the aircraft, and rests one hand on
the wing without a cut.
CAMERA: one slow shoulder-height track ending in a medium profile.
SOUND: door rollers, shoes on concrete, distant wind, held silence otherwise.
EXCLUDE: logos, extra people, wardrobe changes.
```

Timecoded beat sheet:

```text
[0-4s] Locked wide: the courier enters the empty platform from frame left.
[4-8s] One continuous dolly follows as he places the sealed case on the bench.
[8-12s] The camera settles; he steps away and the train light crosses his face.
Sound: footsteps, case latch, approaching rail hum, no dialogue or music.
Keep his face, gray coat, case geometry, screen direction, and platform layout
unchanged. No cuts, duplicates, captions, or logos.
```

After generation, compare actual-prompt evidence with the authored identity,
single-camera path, three time ranges, sound events, and exclusions. Record
loss or reinterpretation as review evidence; never replace the authored prompt.

## Checks

- Does action density fit the selected duration?
- Is each beat grounded in one camera setup?
- Are concrete light, motion, and sound details doing the work instead of vague
  style adjectives?
- Are there no reference mentions without actual reference inputs?
- When actual-prompt evidence exists, did every non-negotiable constraint
  survive provider expansion?
