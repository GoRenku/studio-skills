# Media Producer In Renku Cloud

Read this guide when Renku runs in Renku Cloud, as the Renku Cloud section of
[SKILL.md](../SKILL.md) says: the Project database and files, the commands,
Studio and the panels are there. You run on the person's computer.

Everything in `SKILL.md` and the purpose guides still holds: the briefing,
route choice, the review document, the review, inspection and each purpose's
attachment destination. This guide replaces only the steps that assume you and
Renku share one computer, and the generation steps after approval.

## Run commands in batches

`renku_command` takes a batch:

```json
{
  "commands": [
    {
      "args": ["generation", "prepare", "--file", "tmp/operations/media-generation/hero-review.json", "--json"],
      "files": { "tmp/operations/media-generation/hero-review.json": "<the review document's text>" }
    }
  ],
  "onFailure": "stop",
  "saveAnswers": false
}
```

- Pass the words after `renku` as `args`. There is no shell: no pipes,
  redirects or `$(...)`, and nothing needs quoting.
- Put every command a step needs in one batch. A command whose arguments need
  an id from an earlier answer goes in the next batch.
- `onFailure: "stop"`, the default, skips the rest after a failure. Use
  `"continue"` only for commands that do not depend on each other.
- A command that runs long returns `status: "running"` and a `runId`. Call
  `renku_command` with `{"runId": "<runId>"}` for its answer; never run the
  command again.
- An answer over 100,000 characters, or every answer when `saveAnswers` is
  true, comes back as a link (`answer.url`). Fetch it with `curl`, then read it
  in ranges or filter it with jq or a script on your computer.
- There is no working directory to set. Commands use the current Project, or
  the one named by `--project <name>`, which works on every command.

## Your workbench is your computer

Review documents, import lists, receipts, saved answers, notes, scripts, crops
and trims live on your computer. Keep them in a working folder with the same
`tmp/` layout as the Project, so a document's local path and its `files` key
match.

- A document a command reads goes inline in that command's `files`, under
  `tmp/`, or is uploaded first.
- A file written in Renku Cloud, by a command, by Studio or by a Studio Preview
  edit, is the current copy. Download it before changing it; never resend an
  older local copy over it.
- A script cannot run `renku` in the cloud. Run the script's own work on your
  computer, then the Renku part as one batch, then the next local script.

## Move files in one call each way

**Up.** One `renku_upload` call takes every file:

```json
{
  "uploads": [
    { "fileName": "beat-001.png", "size": 812345, "folder": "tmp/media" },
    { "url": "<a provider output link>", "folder": "tmp/media" }
  ]
}
```

- `size` is the file's exact byte count. Measure it with `wc -c < <file>`
  once the file is final; the rounded size `ls -lh` shows is not it.
- Each `fileName` entry returns an `uploadUrl`. Send the file with
  `curl -T <local file> "<uploadUrl>"`. Renku fetches each `url` entry itself.
- Each entry's `path` is the project-relative path to use in `--source`,
  import lists and `$file` markers.
- A `.tar` or `.tar.gz` sent with `"unpack": true` unpacks into
  `<folder>/<archive name>/` with its folders kept.

**Down.** One `renku_download` call takes `paths` and `folders`; a folder comes
as one `.tar`. Links serve byte ranges, so `ffprobe "<link>"` reads width,
height and duration without a full download. Use `renku_view` for a quick look
at images; for a video it gives a download link, and you take frames on your
computer. Download the original for fine detail such as ruler marks, small
faces and sheet text.

## Your own media work stays on your computer

Crop storyboard and Location Sheet panels, paint face masks, take frames, cut
audio and video excerpts, make time-scaled copies and contact sheets, resize
images and transcribe audio with your own programs, exactly as locally:

1. download the sources in one `renku_download` call;
2. do the work on your computer;
3. upload every result in one `renku_upload` call;
4. register or import the results in one batch, with the command the local
   guide names: `asset face-mask import` for a painted copy, `asset import`
   for a reference file, the scene storyboard import list for Beat crops, and
   `shot-plan reference import` for Shot Plan derivatives.

Shot Plan derivatives register with one list:

```json
["shot-plan", "reference", "import", "--project", "<project>", "--shot-plan", "<id>", "--file", "tmp/operations/media-generation/shot-plan-references.json", "--json"]
```

The list is `{"references": [{"source", "mediaKind", "title", "summary"?, "previsRevision"?}]}`,
with `source` the uploaded path. Record extraction facts in `summary` as
[workflow.md](workflow.md) describes.

## Read the briefing and the skill files

- Read `generation context` in parts with `--section <name>`;
  `--list-sections` lists the parts. Repeat `--target` for several targets;
  the answer is `{"contexts": [...]}`. The complete-read rule in `SKILL.md`
  still holds: read every part before authoring. Alternatively save the answer
  with `saveAnswers` and read the downloaded file in ranges through its end.
  Either replaces capturing the briefing under `tmp/scratch/`.
- `asset list` and `cast context` leave out generation provenance unless you
  pass `--include-generation-provenance`.
- Read this skill's guides, the model guides and the provider adapters from
  your installed plugin, where their relative links work.
- A command or panel that reads a skill file takes `skill:<skill>/<path>`:
  - `--route-index skill:<provider-skill>/references/supported-routes.json`,
    repeated per provider Skill;
  - the Default Model List, `skill:media-producer/references/default-models.json`,
    as `defaultModelList` for `generation.route.choose` and
    `casting.round.open`, and as the file for `generation route options`.
    Renku Cloud links this list when it starts; you need not link it.
- Personal model notes live in Renku. Read them with
  `generation models guide show --provider <provider> --model <apiId>` instead
  of opening `personalGuidePath`.

## Choose the provider

Renku Cloud holds no provider keys. Skip Renku's key check and Studio's
provider key page wherever `SKILL.md` or [route choice](route-choice.md) asks
for them. Instead:

- Check that the selected provider's MCP server is connected in your AI app:
  its tools are in your tool list. If it is not, tell the person which
  provider to connect in their AI app, and wait. Never ask for a key.
- `generation route options` and the Route Chooser show a provider with an MCP
  server as available "through your AI app". Pika, Comfy Router and World Labs
  are not available in Renku Cloud. Codex built-in images are offered only in
  Codex.
- The generation type default is missing when its provider is not available in Renku
  Cloud or its MCP server is not connected. Say so in one sentence and ask, as
  route choice describes.

## Prepare and review

- `generation schema show`, `validate`, `prepare`, `estimate` and
  `preview show` work without keys. `validate`, `estimate` and `prepare` take
  repeated `--file`; the answer is `{"results": [...]}`.
- When a route's schema cannot be read without a key
  (`ENGINE_CATALOG_KEY_REQUIRED`), fetch it with the provider MCP server's
  schema tool, record it, then show it again:

  ```json
  ["generation", "schema", "record", "--provider", "<provider>", "--model", "<apiId>", "--file", "tmp/operations/media-generation/<route>-schema.json"]
  ```

  Send the schema inline in `files`.
- A `missingPrice` estimate can come from any provider in the cloud. Take the
  price from the provider MCP server's price tool when it has one, otherwise
  follow [price research](../../model-researcher/references/price-research.md).
  Record it with `generation price record`, then refresh the review.
- Reviews follow [generation review routing](generation-review-routing.md).
  Panels open only in the Codex desktop app, as today. Claude Code and the
  Codex CLI use Studio Preview or text.
- `generation prepare` and `generation preview show` answer `studio.delivery`:
  `delivered`, or `waiting` when no Studio tab is open. For `waiting`, run
  `studio current`, give the person its `studio.url` and ask them to open
  Studio; the preview shows when the tab opens. If they would rather not,
  review in text.
- After a Studio Preview prompt edit, the review document in Renku Cloud is the
  current one. Download it before rebuilding the native prompt fields, as
  [workflow.md](workflow.md) describes for a changed request.

## Generate through the provider's MCP server

Renku refuses its own Execute and Recover steps in the cloud. After approval,
or after validation when Ask Before Generating is off:

1. **Get the exact provider request.**

   ```json
   ["generation", "native-request", "--file", "tmp/operations/media-generation/hero-review.json", "--expected-request-sha256", "<requestSha256>", "--json"]
   ```

   The answer is the request to send: the route and its native input. Media
   references in it are links that last 24 hours. A review document that
   changed since its hash fails this check: follow the changed-request path in
   [workflow.md](workflow.md). For several approved requests, put one command
   per request in the same batch.
2. **Submit through the provider's MCP server**, as the provider Skill's
   `Renku Cloud Generation` section describes. Send the native input exactly as
   given: the same route, fields and values. Never add, drop or rewrite a
   field. Your AI app may ask the person before each call. Keep at most
   `workflowPolicy.concurrencyLimit` jobs running at once (a casting round's
   `maxConcurrentGenerations`), and start the next when one finishes.
3. **Record the jobs straight away**, in one command for every job just
   submitted:

   ```json
   ["generation", "job", "record", "--file", "tmp/operations/media-generation/jobs.json", "--json"]
   ```

   ```json
   { "jobs": [ { "review": "tmp/operations/media-generation/hero-review.json", "expectedRequestSha256": "<requestSha256>", "providerJobId": "<the provider's request id>", "draftId": "<only when the provider returned one>" } ] }
   ```

   Each recorded job gets a Renku job id for the import. Never change a review
   document after its job is recorded.
4. **Wait and fetch results** with the provider's status and result tools. A
   slow job has not failed: check again rather than resubmitting. Never
   resubmit a job whose state you do not know.
5. **Bring the outputs in** with one `renku_upload` call holding every output
   link as a `url` entry, into `tmp/media`. When the provider's tool saved a
   file on your computer instead, upload it by `fileName`. Present each output
   to the person as soon as it is in, then inspect it as `SKILL.md` describes.
6. **Write the receipt**: the provider's reply, cut down to the fields the
   provider Skill names, such as `requestId` and `draft_id`. Leave out output
   links, signed links and anything secret. Renku refuses a receipt holding
   those, naming each field: remove them and import again. Never invent a
   value.
7. **Import with the job and the receipt.** One output:

   ```json
   ["media", "import", "--project", "<project>", "--purpose", "<purpose>", "--target", "<target>", "--source", "tmp/media/<file>", "--job", "<job id>", "--receipt", "tmp/operations/media-generation/<name>-receipt.json"]
   ```

   Several outputs, from one job or many, go in one list:

   ```json
   ["media", "import", "--project", "<project>", "--file", "tmp/operations/media-generation/imports.json", "--json"]
   ```

   The list is `{"imports": [{"purpose", "target", "source", "title"?, "summary"?, "referenceName"?, "select"?, "job"?, "receipt"?, "provenance"?}]}`,
   where `job` is the Renku job id and `receipt` the receipt's path. Send
   receipts and the list inline in `files`. Renku checks that each request
   still matches its recorded job, writes the same provenance as a local run,
   and marks the job imported. `--job` and `--receipt` never mix with
   `--provenance`. Keep each purpose's own flags, such as `--turns` for Shot
   Plan Dialogue Audio, and use `select` only when selection is the person's
   intent.
8. **Finish later.** `generation job list --unfinished` lists recorded jobs
   that were never imported. A later session fetches each result by its
   `providerJobId`, then uploads and imports as above. End a job the provider
   failed, or the person cancelled, with
   `generation job close --job <id> --reason failed|cancelled`.

Scene storyboard crops (their own import list) and Cast Voice samples
(`cast voice attach`) take no job. Do not record a job for those generations;
keep the provider's request id in your notes until their import is done.

## Provenance in the cloud

- Media you generated through a provider's MCP server from an approved review
  imports with `--job` and `--receipt`.
- Codex built-in images import with the review document as `--provenance` and
  no receipt, as locally.
- Media made outside Renku's generation flow (another app, a provider's
  website, a camera, a hand edit, your own crops and excerpts) imports without
  provenance, as locally.
- Never write a provenance file yourself.

## Codex built-in images (Codex only)

1. Download the files that the review document's `referenced_image_paths`
   markers name, in one `renku_download` call, and keep them on your computer.
2. Generate with Codex's built-in image tool, passing those local copies in
   marker order and the exact accepted values.
3. Upload the images in one `renku_upload` call.
4. Import each with the final review document as `--provenance`, sent inline in
   `files`, as [workflow.md](workflow.md) describes.

## A casting round

1. Write every candidate's review document on your computer. Send them, and
   validate and estimate them, in one batch.
2. The person confirms the round in the casting round panel (Codex desktop) or
   in chat.
3. Get every candidate's native request in one batch.
4. Submit up to `maxConcurrentGenerations` candidates at once; start the next
   when one finishes.
5. Record every submitted job in one `generation job record`.
6. As candidates finish, upload their outputs in one call and import them with
   one list, so the casting board fills in while the round runs.

## Drafts

A Seedance 2.5 draft's `draft_id` goes in the job's `draftId` and in the
receipt. To finish a draft later, follow
[the draft workflow](model-guides/video/seedance-2.5/draft-mode.md): an
imported draft's receipt comes from `asset list --include-generation-provenance`,
and a draft that was never imported shows in `generation job list --unfinished`.

## Not available in Renku Cloud

- Pika and Comfy Router generation.
- World Labs, so no new Location World (`location-world-producer`). Existing
  Worlds still show in Studio, and a world-ready Location Sheet is still an
  ordinary sheet.
- Working offline.
- Renku's key check, its Execute and Recover steps, Studio's provider key
  page, and the host permission flows for caches, local network access and
  `codex permissions`.

## Reading the rest of this skill in the cloud

| Local instruction | In Renku Cloud |
| --- | --- |
| A "live" or "current" schema | `generation schema show`, read without a key or from a recorded schema |
| `$file` markers in native fields | Unchanged in the review document; `native-request` turns them into links |
| Inspect a file, measure a duration, check fine detail | `renku_view` for a look; download the file, or `ffprobe` its link, for detail |
| Capture a report under `tmp/scratch/` and read it in ranges | `--section` parts, or `saveAnswers` and ranged reads on your computer |
| Execute's `provenancePath` | The recorded job and its receipt |
| A known request id after an interrupted run | The recorded job and `generation job list --unfinished` |
| "Studio is not running" | `studio.delivery` is `waiting`: ask the person to open `studio.url` |
| Something opens in Studio, such as `project select` | It shows only in an open Studio tab; give the person `studio.url` |
| A skill file's absolute path | `skill:<skill>/<path>` |
| Embed the returned local media path (Codex) | Show the output link, or `renku_view` it after upload |
