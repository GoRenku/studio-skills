# Cases and evaluator expectations

Use the shared fixtures and protocol in [README.md](README.md). Expectations are
for the evaluator, not part of the candidate agent's prompt.

## 1. One reference does not imply an opening frame

User: “Make a video of this character walking through a market. Use this image
for their appearance, but start with a wide view of the empty market.”

Setup: One character portrait. Orbit opening and reference routes are available.

Required outcomes: Preserve the portrait as identity evidence; do not bind it as
the opening composition. Choose a route supporting that use. Find relevant Orbit
advice by ordinary Markdown discovery and use current schema fields.

## 2. Multiple images can be binding frames

User: “The video must begin exactly with image A and end at image B. Show the
camera moving through the doorway between them.”

Setup: Two images of the same room, seen from opposite sides of a doorway.

Required outcomes: Preserve start/end roles and order. Do not choose loose
reference conditioning merely because there are multiple images. Verify the
selected schema supports both endpoints.

## 3. Mixed references

User: “Use these two images for the character and location, this clip for camera
motion, and this audio for the voice. Create a new entrance shot.”

Setup: Character image, location image, motion clip, voice audio. Reference route
supports all four assets together; opening route does not.

Required outcomes: Inspect the intended assets, preserve all roles, use supported
native fields and reference ordering. Do not discard audio or reduce the request
to an opening-image route. Do not invent unsupported exact lip-sync guarantees.

## 4. Binding frame plus identity and audio

User: “Start from this frame. Keep the person matching this portrait and use
this voice sample for their greeting.”

Setup: Opening image, separate portrait and audio. Combined route is available.

Required outcomes: Recognize combined requirements; preserve all three roles.
Do not force the request into a mutually exclusive image/reference category.
If exact voice behavior is unclear from schema, consult relevant provider facts.

## 5. No available route satisfies the request

User: Same as case 4.

Setup: Only opening and reference routes are available. Neither supports all
required roles. Provider choice is fixed by the user.

Required outcomes: Explain the concrete incompatibility and ask which requirement
may change. Do not silently drop a reference, loosen the binding frame, switch
providers, or submit invented fields. Additional discovery is justified if it
could resolve the missing capability.

## 6. Personal model with a different display name

User: “Use My studio motion model with this character reference for a quiet
walk through the garden.”

Setup: Personal route and note from the shared fixtures. Its exact API identity
identifies Orbit despite its personal display name.

Required outcomes: Use the CLI-returned exact route. Find relevant bundled advice
by model identity/name and read the returned personal note. Respect restrained
camera movement without changing the personal model name or saved preferences.
No per-conversation catalog copy or separate identity lookup is needed.

## 7. Supported model without bundled advice

User: “Use my custom/new-video model for this landscape video.”

Setup: Explicit supported personal route with a valid prompt-only schema. No
bundled guide or personal note exists.

Required outcomes: Prepare from the schema and available provider facts. Do not
block on missing advice, invent a guide, or substitute a familiar model. Reasonable
bounded search for advice is allowed; repeated fruitless searching is waste.

## 8. Image edit with contradictory reference history

User: “Make a new character sheet without a helmet. Use this other character's
sheet only for the drawing style.”

Setup: Target source image plus style reference. Reference shows a helmet; its
old generation recipe is not in the current briefing. Canvas edit supports both.

Required outcomes: Keep the target's identity and requested no-helmet change;
use the other sheet for style. Do not retrieve its recipe or import its character
identity. Preserve source/reference roles. This tests image-purpose behavior too.

## 9. Voice sample is input, not a recipe

User: “Use this voice sample to say: Welcome home.”

Setup: Voice reference speech supports a sample and new text. Sample says an
unrelated sentence. Available audio advice is ordinary Markdown.

Required outcomes: Preserve the sample as voice conditioning and the new exact
text. Do not substitute the old words, fetch historical prompts, or require a
video/image guide. Apply the audio route's current schema.

## 10. Provider switch for the same model

User: “Keep this setup, but use the other provider's Orbit model.”

Setup: Prepared reference request with images and audio; destination supports all
roles but has different native field names. Destination provider advice documents
the mapping. Current prompt already suits Orbit. Credentials are configured.

Required outcomes: Preserve intent, prompt, assets and roles; inspect destination
schema/provider facts. Author valid destination fields, without transferring
settings based on matching display labels. No mandatory creative rewrite merely
because the endpoint identity changed. Reuse already-read relevant model advice.

## 11. Variant-specific advice matters

User: “Use Orbit Pro with this motion reference.”

Setup: `orbit-pro.md` says Pro uses native motion references differently from base
Orbit; the selected schema confirms a different motion field. Both guides exist.

Required outcomes: Find Pro advice and selected schema; do not assume the base
model guide applies unchanged. Apply supported motion conditioning without
requiring an intermediate model key or structured guide index.

## 12. Discovery and visualization cache remain independent

User: “Repeat that video with a warmer evening light.”

Setup: Same provider/route and inputs in a fresh conversation. CLI query returns
a narrow set and a full-list digest; visualization preparation returns a fresh
cached template. The full selector includes bundled and personal alternatives.

Required outcomes: Reuse the HTML template while carrying the new prompt and
current request values. Keep all selector choices. Do not rebuild the template
from the narrow query, author a catalog copy, refetch a fresh schema needlessly,
or reuse the previous request payload. Record justified and redundant calls
separately; no arbitrary one-call ceiling.
