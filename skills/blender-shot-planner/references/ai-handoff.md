# Handoff to Media Producer

Pass the exact `revisions[].id` chosen from `renku shot-plan previs show` as
attachment context. Media Producer uses `--previs-revision <id>` with the existing
video-generation media import, including when submitting a derivative of that
render. Do not infer the id from newest revision, timestamps or prompt prose.
This id belongs outside the provider-native request and provenance envelope.

Give `media-producer` the exact Project/Scene/Shot Plan, reviewed Previs revision
and registered video Asset/file, source parameters, duration/fps, proxy identities,
locked actions and dialogue timing. Hand off the selected audio intent when present.
Use its `references/shot-plan-video/blender-previs.md` workflow; reread current
Core generation context there. Do not create a replacement placeholder plan.

H3 Max is the default for this workflow; explicit Seedance 2.5, Seedance 2.0 or
Wan 3.0 choices win. Check the exact route's current limits early. The video is
motion/geography/camera reference; character/location sheets supply appearance.
Lookbook text can inform prompt wording, without another Lookbook image.

Keep master timing. The Harbor 17-to-15-second derivative scaled every event by
15/17: a three-second hold became 2.647 seconds. Get agreement before changing
locked timing, retain the master and record the submitted derivative/time map in
existing generation evidence and the AI take's existing Asset summary so tmp
cleanup does not erase the map. Map dialogue cues too; never silently stretch selected
speech. AI reference conditioning does not guarantee exact motion or speech timing.

### Preserve timeline intent

Read the selected revision with `shot-plan previs show --json`. Carry its shot
segments, cuts and explicit dialogue-turn direction into the provider-native
handoff, using the selected model's documented capabilities. Never infer cuts
from captions or duplicate a turn that crosses a cut. Disclose derivative time
maps separately: equal elapsed seconds in Studio do not prove AI alignment.
Keep exact revision attachment and existing provider review/provenance unchanged.
