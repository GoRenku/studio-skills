# CLI Coverage And Gaps

Use this reference to decide whether a requested department workflow is fully supported today. When support is partial, name the gap and propose the next supported action.

## Director Context

Preferred first read for broad requests:

```bash
renku director context --json
renku director context --selection '<studio-selection-json>' --json
```

The report includes:

- project name, id, title, and aspect ratio;
- current Studio selection context when available;
- screenplay existence, counts, analysis count, and active analysis id;
- Inspiration folder count, Lookbook count, and active Lookbook id;
- cast selected visual-reference readiness;
- location selected environment-sheet readiness;
- selected-scene active shot-list, storyboard, and shot-video preflight availability;
- ordered `nextSteps`;
- structured `diagnostics`, including missing prerequisites.

No current authoring project is a hard failure through `PROJECT_DATA202`.

## Strong Existing CLI Coverage

Screenplay:

```bash
renku screenplay status --json
renku screenplay show --json
renku screenplay validate --file <json> --json
renku screenplay create --file <json> --json
renku screenplay apply --file <operations-json> --json
renku screenplay scene revise --scene <scene-id> --file <json> --json
renku screenplay revision list --json
renku screenplay revision show --revision <revision-id> --json
renku screenplay revision restore --revision <revision-id> --json
renku screenplay cast list --json
renku screenplay cast show <cast-member-id> --json
renku screenplay location list --json
renku screenplay location show <location-id> --json
renku screenplay act list --json
renku screenplay sequence list --act <act-id> --json
renku screenplay scene list --sequence <sequence-id> --json
```

Screenplay Analysis:

```bash
renku screenplay analyze context --json
renku screenplay analyze list --json
renku screenplay analyze show --active --json
renku screenplay analyze validate --file <json> --json
renku screenplay analyze write --file <json> --json
renku screenplay analyze set-active --analysis <analysis-id> --json
```

Scene Shot Lists:

```bash
renku screenplay shot-list context --scene <scene-id> --json
renku screenplay shot-list list --scene <scene-id> --json
renku screenplay shot-list show --active --scene <scene-id> --json
renku screenplay shot-list validate --file <json> --json
renku screenplay shot-list write --file <json> --json
renku screenplay shot-list validate-operations --file <json> --json
renku screenplay shot-list apply --file <json> --json
renku screenplay shot-list storyboard status --scene <scene-id> --shot-list <shot-list-id> --json
renku screenplay shot-list set-active --scene <scene-id> --shot-list <shot-list-id> --json
```

Visual Language:

```bash
renku inspiration list --json
renku inspiration create --name <name> --json
renku inspiration show --folder <folder-id> --json
renku inspiration analysis show --folder <folder-id> --json
renku inspiration analysis validate --folder <folder-id> --file <json> --json
renku inspiration analysis write --folder <folder-id> --file <json> --json

renku lookbook list --json
renku lookbook show --lookbook <lookbook-id> --json
renku lookbook validate --file <json> --json
renku lookbook create --name <name> --file <json> --json
renku lookbook update --lookbook <lookbook-id> --file <json> --json
renku lookbook set-active --lookbook <lookbook-id> --json
renku lookbook inspiration list --lookbook <lookbook-id> --json
renku lookbook inspiration set --lookbook <lookbook-id> --file <json> --json
```

Media Generation:

```bash
renku generation context --purpose <purpose-key> --target <target> --json
renku generation model list --purpose <purpose-key> --target <target> --json
renku generation spec validate --file <json> --json
renku generation spec create --file <json> --json
renku generation spec update --spec <spec-id> --file <json> --json
renku generation spec show --spec <spec-id> --json
renku generation spec list --purpose <purpose-key> --target <target> --json
renku generation estimate --spec <spec-id> --json
renku generation run --spec <spec-id> --approval-token <approval-token> --json
renku generation preflight --purpose shot.video-take --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id[,shot-id...]> --json
```

Media Import:

```bash
renku media import --purpose lookbook.image --target lookbook:<lookbook-id> --source <path> --json
renku media import --purpose lookbook.sheet --target lookbook:<lookbook-id> --source <path> --json
renku media import --purpose cast.character-sheet --target cast:<cast-member-id> --source <path> --json
renku media import --purpose cast.profile --target cast:<cast-member-id> --source <path> --json
renku media import --purpose location.environment-sheet --target location:<location-id> --file <import-json> --json
renku media import --purpose scene.storyboard-sheet --target scene:<scene-id> --shot-list <shot-list-id> --file <import-json> --json
renku media import --purpose shot.first-frame --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id> --source <path> --json
renku media import --purpose shot.last-frame --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id> --source <path> --json
renku media import --purpose shot.reference-image --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id> --source <path> --json
renku media import --purpose shot.multi-shot-storyboard-sheet --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id[,shot-id...]> --source <path> --json
renku media import --purpose shot.video-take --target scene:<scene-id> --shot-list <shot-list-id> --shots <shot-id[,shot-id...]> --source <path> --json
```

## Hard Gaps

### Cast Authoring

Planned but not implemented:

```bash
renku cast list --json
renku cast show <cast-member-id> --json
renku cast context --cast <cast-member-id> --json
renku cast validate --file <cast-operations-json> --json
renku cast apply --file <cast-operations-json> --json
```

Current fallback:

- Route durable cast fact changes through `screenplay-drafter`.
- Use screenplay operations with `castMember.*` only through the screenplay workflow.

### Location And Production Design Authoring

Planned but not implemented:

```bash
renku location list --json
renku location show <location-id> --json
renku location context --location <location-id> --json
renku location validate --file <location-operations-json> --json
renku location apply --file <location-operations-json> --json

renku production-design location context --location <location-id> --json
renku production-design location validate --file <location-design-json> --json
renku production-design location write --file <location-design-json> --json

renku production-design staging context --scene <scene-id> --json
renku production-design staging validate --file <scene-staging-json> --json
renku production-design staging write --file <scene-staging-json> --json
```

Current fallback:

- Route durable location fact changes through `screenplay-drafter`.
- Route environment-sheet media through `media-producer`.
- Route blocking and coverage implications through `scene-shot-designer`.

### Voice, Sound, Music, Edit, And Final Assembly

Do not claim these workflows are complete. Use current media import, selection, and production export only for existing selected assets. Identify future skill needs when the user asks for unsupported post-production work.
