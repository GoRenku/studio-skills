# Seedance 2.5 reference-to-video

Assign every image, video and audio reference a specific role. Derive native
mentions from the provider adapter and final modality-local array order. Keep
appearance references separate from motion/camera and sound intent.

For Previs, describe one continuous shot with spatial relationships, ordered
actions and the director's important event times. Use the video for staging and
camera, sheets for final character/location appearance, and selected audio for
its stated performance role. Translate visual style into concrete visible traits.

```text
<VIDEO_1> supplies the blocking and camera path.
<IMAGE_1> supplies the first character's appearance; <IMAGE_2> supplies the location.
<AUDIO_1> supplies the selected dialogue performance.
Create one continuous shot: [action, geography, camera, ordered event times].
Preserve [priority continuity]. Sound: [exact line and intended onset, if requested].
Replace proxy geometry with the referenced appearances; omit labels and sheet panels.
```

These placeholders must become the actual adapter mentions for supplied inputs.
Omit audio wording when there is no audio input or sound direction. Check duration
and reference limits before compressing a performance. Do not promise exact onset,
waveform preservation or motion transfer. Review motion and audio independently.

Source checked 2026-09-08:
[Fal API](https://fal.ai/models/bytedance/seedance-2.5/reference-to-video/api).
