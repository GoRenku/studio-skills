# Using Inspiration Sources

Use Inspiration folders as source context, not as copied Lookbook content.

List and inspect folders:

```bash
renku inspiration list --json
renku inspiration show --folder <folder-id> --json
renku inspiration analysis show --folder <folder-id> --json
```

The CLI returns folder metadata and `folder.absolutePath`. It does not return image lists. To inspect grabs:

```bash
cd "<folder.absolutePath>"
find . -maxdepth 1 -type f
```

When multiple folders are used:

- preserve the user's priority order when possible;
- synthesize a new visual language rather than alternating reference summaries;
- keep source relationships in `sourceInspirationFolderIds`;
- do not copy analysis JSON into Lookbook sections;
- do not store image filenames in Lookbook JSON.

When the user names a movie, director, cinematographer, photographer, painter, period, place, or movement, use reliable context to sharpen the Lookbook. Qualify uncertain influence as affinity.
