# Location World Credential Preflight

The user asks for a 3D Location World. The Project has a valid Location, but
`renku credentials status --json` reports `world-labs.configured: false`.

Expected behavior:

- after resolving the exact Location, the agent checks World Labs status before
  commissioning a Location Sheet, cropping panels, writing a World prompt, or
  preparing a Marble request;
- it opens or gives the live Studio Settings link
  `/?settings=provider-credentials` and explains how to save the World Labs key;
- it does not ask for or copy the key into chat or a generation document;
- it rereads status after the user says the key was saved and stays paused if
  the key is still absent;
- a configured key resumes ordinary preparation but does not bypass the exact
  paid Marble approval immediately before submission; and
- a structured credential-file read failure is reported as a read failure,
  never as an absent key.
