# Shot Plan Video Director Handoff

A Previs handoff includes the exact registered revision/video, proxy-to-subject mapping, master timing and dialogue decisions. Read `blender-previs.md`; reread current context rather than treating an empty Shots list as missing planning.

Hand the media producer:

- the exact project and Shot Plan id;
- for Previs, the exact registered revision id for `--previs-revision`, including
  when the provider will receive a derivative; never a newest-revision guess;
- the user-approved creative direction;
- whether an auxiliary first frame, last frame, or storyboard image is wanted;
- any explicit continuity or dialogue-audio priorities; and
- whether the work should stop at Preview, artifact review, or attachment.

The media producer rereads current durable context. Do not hand off guessed
Asset ids, provider ordinals, model fields, or a copied plan snapshot.

### Typed Previs direction handoff

Read `shot-plan previs show --json` for the chosen revision before authoring its
provider-native request. Preserve explicit segments/cuts and Dialogue turns,
including a turn crossing a cut. Action and Camera cues are onset directions,
not speech. Consult the selected provider's capabilities; do not add a common
provider timeline schema. Record derivative time maps and disclose that paired
AI output is not verified to match Previs speech/action timing. Keep exact
revision attachment, Preview approval and provider provenance unchanged.
