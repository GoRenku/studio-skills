# Contributing to Renku Studio Skills

This repository owns filmmaking guidance for agents. The
[Studio repository](https://github.com/GoRenku/studio) owns the runtime, CLI,
domain rules, and durable project storage. Installation and user tutorials
belong on [gorenku.com](https://gorenku.com).

## Work on a skill

Fork and clone this repository. Use Node.js and the pinned pnpm 11.7.0;
the scripts have no package dependencies, so no `pnpm install` is needed.
For coordinated runtime changes, keep a Studio checkout alongside this one
and follow its contributor guide to build and inspect the CLI.

Read the affected `skills/<name>/SKILL.md` and its linked references before
editing. Keep the entrypoint focused and put detailed workflow material in its
supporting references. Update samples and evaluation scenarios when behavior
changes. Preserve unrelated formatting.

Check every CLI example against the current Studio command handlers and domain
contracts. Skills should read context and persist changes through supported
commands, not write to project databases directly or invent missing commands.
Creative analysis and choices belong in the user/agent loop; runtime ownership
of validation does not move into a skill wrapper.

If a change requires a new runtime command or contract, coordinate it with a
Studio pull request. Describe the dependency in both pull requests and update
callers directly rather than retaining obsolete examples or aliases.

## Validate and review

Run from the repository root:

```bash
pnpm test
```

For focused work, `pnpm test:media-generation` runs media-generation validation
and supporting-script tests, while `pnpm release:test` checks release tooling
without publishing anything. See [`package.json`](package.json) for exact scope.

Automated checks cover only part of the library. Review the affected workflow's
references, sample documents, links, and evaluation scenarios manually. Report
which scenarios you exercised and any limitations. Live media generation may
cost money and is not required for ordinary documentation changes.

Before submitting a pull request:

- Explain the user request or workflow problem and the resulting behavior.
- Include validation results and links to any coordinated Studio changes.
- Check that filenames, commands, flags, and document shapes match current code.
- Inspect the full diff for unrelated changes, private project files, and keys.

Creating or publishing plugin releases is maintainer work. Contributors do not
need release credentials and should not run the release/publish workflows as
part of a contribution.
