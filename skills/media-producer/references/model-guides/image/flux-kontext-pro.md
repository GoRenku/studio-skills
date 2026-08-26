# FLUX Kontext Pro Image Prompt Guide

Use FLUX Kontext Pro for source-guided image creation and editing. Begin with
the intended change, then identify the visible facts that must remain stable.

## Prompt Guidance

- Name the subject or region to change and describe the requested result in
  concrete visual language.
- Preserve identity, composition, typography, geometry, materials, lighting,
  and background elements explicitly when they must not drift.
- Give every additional reference a narrow role; do not ask several images to
  redefine the same subject or location.
- For compositing, describe scale, placement, occlusion, and interaction.
- Keep configuration such as aspect ratio, output format, safety, and seed in
  provider-native fields exposed by the live schema rather than prompt prose.

## Provenance

Recovered from the FLUX Kontext Pro route guidance introduced with the provider
architecture. Vendor-specific prompt research should extend this guide without
moving provider request fields into it.
