# Practical Blender authoring

Choose the geometry and procedural craft that depict this location well. The
Harbor exploration's Workbench object colors, studio lighting, shadows, cavity,
outlines, Standard view transform and 16-sample AA at 960×540/24fps are a successful
example, not a mandatory style. Preserve an accepted plan's look during revisions.

Simple Previs is intentional: use it for placement, geography, camera and motion.
Do not add photorealistic modeling, textures or detailed prop artwork merely to
prevent proxy appearance transferring into AI footage. Finished character, room
and featured-prop appearance belongs to independent references in the AI handoff.

## Fast iteration

- Keep this plan's main Python implementation and useful parameters easy to find.
  Seed any procedural randomness so a timing edit does not unintentionally
  redesign the location. Group meaningful controls near the top or in `scene.json`; helper functions or
  adapted code are fine. Avoid scattering director timings through geometry code.
- Make build, frame rendering and encoding individually invocable. Document exact
  commands in a short plan-local README. Build-only must be able to continue later;
  encoding an existing frame sequence should not require rebuilding Blender.
- Preflight the actual Blender binary, finishing interpreter/modules, FFmpeg and
  FFprobe before a full run. Render and encode a small test using those executables.
  Use `--python-exit-code 1` so Python failures are visible. Diagnose Blender startup
  or Metal/sandbox failure separately from a script exception.
- Save the built `.blend`; allow rendering an explicit frame/range. An unchanged
  interrupted run can render missing frames and finish. Check input identity before
  reusing frames. Encode to a temporary output and protect completed outputs at
  each writer, including direct build/finish invocation.
- Optimize narrowly: a camera or light change can invalidate every frame; a local
  timing change can affect later motion. Reuse known-unaffected intervals only
  after checking their boundary frames. No general dependency engine is needed.

## Motion and parameter pitfalls

Use finite useful values for coordinates, duration, lens and fades before invoking
Blender. Report missing actor/camera targets clearly. This is local script usability,
not Studio runtime validation of the creative document.

Explain world, route and actor coordinate spaces. Look-ahead on a +X route must
follow +X rather than an old hard-coded world-Y offset. A follow group or shoulder
target should identify the intended subjects, not silently mean every lead.

When editing action cues, preserve stable identity and ordering; replacing a cue
should not append it after a higher-priority overlapping cue. Choose IDs without
collisions. Make overlapping facing, talk and turn behavior intentional, including
what holds or returns after the action ends. Check angular interpolation across
±180° in playback; continuous angles or quaternions can avoid an unintended spin.

Inspect sparse-event boundaries and the last frame. A contact sheet is useful for
framing, but does not prove smooth turns or readable timing. Small gestures and
leans may be clear only at the right instant. Keep motion checks in the plan's
own code when useful rather than enforcing a universal motion representation.

Use the images to verify water/ground visibility, body clearance, shoulder framing,
facing and head/torso overlap. Numeric distances cannot establish these qualities.
Profile before deeper optimization: Harbor motion evaluation was about 0.028–0.038
seconds, with session render/finish observations around 19.5/15.5 seconds; these
are local evidence, not a latency promise. Keep sparse cues, long labels and final
frame handling in playback metadata; the MP4 encoder should not lay out a review UI.

### Cuts and frame evidence

Author camera switching or shot assembly in this plan's own implementation.
Retain the switching source with the render. Store each incoming camera start
as a segment boundary, starting the initial segment at frame zero. Inspect
cut-1/cut/cut+1 and confirm the incoming view at the cut. In-shot camera changes
are Camera cues, not cuts. Continuous takes use one segment. Keep Dialogue turns
intact across cuts; inspect their explicit start/end frames and distinguish
planned timing from audible speech. Validate motion onsets visually; a blending
control's held end is not an action duration. No universal Blender engine is needed.
