// The mechanical checks a cloud eval makes once the agent has finished. Each
// reads the project through renku commands against the launcher, the
// launcher's records of every Renku and provider tool call, or the project's
// files. Nothing reads the transcript. Each check names its parameters, so a
// case is checked before any agent runs.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const COUNT = { min: 'integer?', max: 'integer?' };

/** Every check kind, with its parameters (`?` marks optional) and what it proves. */
export const CHECKS = {
  /** Assets of an owner, optionally of one type or media kind, with a receipt, a provider in their provenance, or a face-masked copy. */
  assets: {
    params: { owner: 'string', type: 'string?', mediaKind: 'string?', withReceipt: 'boolean?', provenanceProvider: 'string?', faceMasked: 'boolean?', ...COUNT },
    run: checkAssets,
  },
  /** One asset's title or one-line summary holds every given word, ignoring case. */
  'asset-text': { params: { owner: 'string', asset: 'string', field: 'string', includes: 'strings' }, run: checkAssetText },
  /** The screenplay's scene count, and headings that must appear. */
  'screenplay-scenes': { params: { headings: 'strings?', ...COUNT }, run: checkScreenplayScenes },
  /** A Location whose name holds `name`, and whose description holds every given word. */
  location: { params: { name: 'string', descriptionIncludes: 'strings?' }, run: checkLocation },
  /** A Cast Member whose name holds `name`. */
  'cast-member': { params: { name: 'string' }, run: checkCastMember },
  /** The Cast Voices attached to one Cast Member. */
  'cast-voices': { params: { cast: 'string', ...COUNT }, run: checkCastVoices },
  /** A Previs plan's registered revisions, optionally only those with a render. */
  'previs-revisions': { params: { shotPlan: 'string', withRender: 'boolean?', ...COUNT }, run: checkPrevisRevisions },
  /** Recorded provider jobs, optionally of one status. */
  'generation-jobs': { params: { status: 'string?', ...COUNT }, run: checkGenerationJobs },
  /** A JSON file in the project with exact fields and numbers within a tolerance: `approx: {key: "value±tolerance"}`. */
  'project-json': { params: { path: 'string', fields: 'map?', approx: 'map?' }, run: checkProjectJson },
  /** Project files whose project-relative path matches a glob (`*` within a folder, `**` across folders). */
  'project-files': { params: { pattern: 'string', ...COUNT }, run: checkProjectFiles },
  /** Calls to Renku's MCP tools whose name matches a glob, such as `renku_upload` or `*.open`. */
  'renku-calls': { params: { tool: 'string', ...COUNT }, run: checkRenkuCalls },
  /** Renku commands sent in any batch: prefixes such as "credentials status" that must be absent or present. */
  'renku-commands': { params: { absent: 'strings?', present: 'strings?' }, run: checkRenkuCommands },
  /** Calls to the fake provider's MCP tools (submit, status, result, schema, price). */
  'provider-calls': { params: { tool: 'string', ...COUNT }, run: checkProviderCalls },
  /** The most provider jobs that were running at once. */
  'provider-peak': { params: { max: 'integer' }, run: checkProviderPeak },
  /** Links in submitted requests that the provider fetched successfully, optionally of one content type. */
  'provider-inputs': { params: { contentType: 'string?', ...COUNT }, run: checkProviderInputs },
};

const PARAM_TYPES = {
  string: (value) => typeof value === 'string' && value !== '',
  integer: (value) => Number.isInteger(value) && value >= 0,
  boolean: (value) => typeof value === 'boolean',
  strings: (value) => Array.isArray(value) && value.length > 0 && value.every((entry) => typeof entry === 'string' && entry !== ''),
  map: (value) => value !== null && typeof value === 'object' && !Array.isArray(value),
};

/** Every problem with one check's shape, as messages; empty when it is valid. */
export function checkProblems(check) {
  const definition = CHECKS[check?.check];
  if (!definition) {
    return [`check "${check?.check}" is not one of ${Object.keys(CHECKS).join(', ')}`];
  }
  const problems = [];
  for (const [name, type] of Object.entries(definition.params)) {
    const optional = type.endsWith('?');
    const value = check[name];
    if (value === undefined) {
      if (!optional) problems.push(`${check.check} needs ${name}`);
    } else if (!PARAM_TYPES[type.replace('?', '')](value)) {
      problems.push(`${check.check} ${name} must be ${type.replace('?', '')}`);
    }
  }
  for (const name of Object.keys(check).filter((key) => key !== 'check' && !Object.hasOwn(definition.params, key))) {
    problems.push(`${check.check} has no parameter ${name}`);
  }
  if ('min' in definition.params && 'max' in definition.params && check.min === undefined && check.max === undefined) {
    problems.push(`${check.check} needs min, max or both`);
  }
  return problems;
}

/**
 * Runs every check against what the eval left behind. `context` has
 * `renku(args)` (the parsed JSON answer of a renku command on the project),
 * `records` (the launcher's records), `projectFolder` and `values` for
 * `{name}` placeholders, such as `{project}` and the fixture's ids.
 */
export async function runChecks(checks, context) {
  const results = [];
  for (const check of checks) {
    const label = describeCheck(check);
    try {
      const resolved = substitutePlaceholders(check, context.values);
      const { passed, detail } = await CHECKS[check.check].run(resolved, context);
      results.push({ check: label, passed, detail });
    } catch (error) {
      results.push({ check: label, passed: false, detail: error instanceof Error ? error.message : String(error) });
    }
  }
  return results;
}

export function describeCheck(check) {
  const params = Object.entries(check).filter(([key]) => key !== 'check').map(([key, value]) => `${key}=${typeof value === 'string' ? value : JSON.stringify(value)}`);
  return `${check.check}(${params.join(', ')})`;
}

/** Replaces `{name}` in every string of a check; a name with no value fails the check. */
export function substitutePlaceholders(value, values) {
  if (typeof value === 'string') {
    return value.replace(/\{([A-Za-z][\w-]*)\}/g, (_, name) => {
      if (!Object.hasOwn(values, name)) {
        throw new Error(`SKILLS_CLOUD_EVAL010 no value for {${name}}; known: ${Object.keys(values).join(', ')}`);
      }
      return values[name];
    });
  }
  if (Array.isArray(value)) {
    return value.map((entry) => substitutePlaceholders(entry, values));
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, substitutePlaceholders(entry, values)]));
  }
  return value;
}

/** Whether a count is within the check's min and max. */
export function countResult(check, count, what) {
  const tooFew = check.min !== undefined && count < check.min;
  const tooMany = check.max !== undefined && count > check.max;
  const bounds = [check.min !== undefined ? `at least ${check.min}` : null, check.max !== undefined ? `at most ${check.max}` : null].filter(Boolean).join(' and ');
  return { passed: !tooFew && !tooMany, detail: `${count} ${what}; expected ${bounds}` };
}

/** Matches `*` within one path segment and `**` across segments. */
export function globToRegExp(glob) {
  const escaped = glob.split('**').map((part) => part.split('*').map((piece) => piece.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*'));
  return new RegExp(`^${escaped.join('.*')}$`);
}

async function listAssets(context, check, extraArgs = []) {
  const args = ['asset', 'list', '--project', context.values.project, '--owner', check.owner, '--limit', '200', ...extraArgs];
  if (check.type) args.push('--type', check.type);
  if (check.mediaKind) args.push('--media-kind', check.mediaKind);
  return (await context.renku([...args, '--json'])).items;
}

async function checkAssets(check, context) {
  const withProvenance = check.withReceipt || check.provenanceProvider;
  let items = await listAssets(context, check, withProvenance ? ['--include-generation-provenance'] : []);
  if (check.withReceipt) {
    items = items.filter((item) => isFilled(item.generationProvenance?.receipt));
  }
  if (check.provenanceProvider) {
    items = items.filter((item) => item.generationProvenance?.provider === check.provenanceProvider);
  }
  if (check.faceMasked) {
    const masked = [];
    for (const item of items) {
      const mask = await context.renku(['asset', 'face-mask', 'show', '--project', context.values.project, '--asset-file', item.id, '--json']);
      if (mask.exists) masked.push(item);
    }
    items = masked;
  }
  return countResult(check, items.length, `assets of ${check.owner}`);
}

function isFilled(value) {
  return value !== null && typeof value === 'object' && Object.keys(value).length > 0;
}

async function checkAssetText(check, context) {
  const item = (await listAssets(context, check)).find((candidate) => candidate.id === check.asset);
  if (!item) {
    return { passed: false, detail: `${check.owner} has no asset ${check.asset}` };
  }
  return includesAll(String(item[check.field] ?? ''), check.includes, `${check.field} of ${check.asset}`);
}

function includesAll(text, words, what) {
  const missing = words.filter((word) => !text.toLowerCase().includes(word.toLowerCase()));
  return { passed: missing.length === 0, detail: missing.length === 0 ? `${what} holds ${words.join(', ')}` : `${what} lacks ${missing.join(', ')}: "${text.slice(0, 200)}"` };
}

async function checkScreenplayScenes(check, context) {
  const { scenes } = await context.renku(['screenplay', 'show', '--json']);
  const headings = scenes.map((scene) => scene.heading ?? '');
  const missing = (check.headings ?? []).filter((wanted) => !headings.some((heading) => heading.toLowerCase().includes(wanted.toLowerCase())));
  const count = countResult(check, scenes.length, 'scenes');
  return { passed: count.passed && missing.length === 0, detail: `${count.detail}${missing.length > 0 ? `; no heading holds ${missing.join(', ')}` : ''}` };
}

async function checkLocation(check, context) {
  const locations = await context.renku(['location', 'list', '--json']);
  const location = locations.find((candidate) => candidate.name.toLowerCase().includes(check.name.toLowerCase()));
  if (!location) {
    return { passed: false, detail: `no Location name holds "${check.name}": ${locations.map((candidate) => candidate.name).join(', ')}` };
  }
  return check.descriptionIncludes ? includesAll(JSON.stringify(location.description ?? {}), check.descriptionIncludes, `${location.name}'s description`) : { passed: true, detail: `found ${location.name}` };
}

async function checkCastMember(check, context) {
  const cast = await context.renku(['cast', 'list', '--json']);
  const member = cast.find((candidate) => candidate.name.toLowerCase().includes(check.name.toLowerCase()));
  return { passed: Boolean(member), detail: member ? `found ${member.name}` : `no Cast Member name holds "${check.name}"` };
}

async function checkCastVoices(check, context) {
  const { voices } = await context.renku(['cast', 'voice', 'list', '--cast', check.cast, '--json']);
  return countResult(check, voices.length, `voices for ${check.cast}`);
}

async function checkPrevisRevisions(check, context) {
  const { revisions } = await context.renku(['shot-plan', 'previs', 'show', '--shot-plan', check.shotPlan, '--json']);
  const counted = check.withRender ? revisions.filter((revision) => revision.render) : revisions;
  return countResult(check, counted.length, `previs revisions${check.withRender ? ' with a render' : ''}`);
}

async function checkGenerationJobs(check, context) {
  const { jobs } = await context.renku(['generation', 'job', 'list', '--json']);
  const counted = check.status ? jobs.filter((job) => job.status === check.status) : jobs;
  return countResult(check, counted.length, `${check.status ?? 'recorded'} jobs`);
}

async function checkProjectJson(check, context) {
  const file = path.join(context.projectFolder, check.path);
  const document = JSON.parse(await readFile(file, 'utf8'));
  const problems = [];
  for (const [key, expected] of Object.entries(check.fields ?? {})) {
    if (document[key] !== expected) problems.push(`${key} is ${JSON.stringify(document[key])}, not ${JSON.stringify(expected)}`);
  }
  for (const [key, expected] of Object.entries(check.approx ?? {})) {
    const [value, tolerance] = String(expected).split('±').map(Number);
    if (typeof document[key] !== 'number' || Math.abs(document[key] - value) > tolerance) problems.push(`${key} is ${JSON.stringify(document[key])}, not ${expected}`);
  }
  return { passed: problems.length === 0, detail: problems.length === 0 ? `${check.path} matches` : problems.join('; ') };
}

async function checkProjectFiles(check, context) {
  const pattern = globToRegExp(check.pattern);
  const entries = await readdir(context.projectFolder, { recursive: true, withFileTypes: true });
  const matches = entries.filter((entry) => entry.isFile()).map((entry) => path.relative(context.projectFolder, path.join(entry.parentPath, entry.name)).split(path.sep).join('/')).filter((file) => pattern.test(file));
  return countResult(check, matches.length, `files matching ${check.pattern}`);
}

async function checkRenkuCalls(check, context) {
  const pattern = globToRegExp(check.tool);
  return countResult(check, context.records.renku.calls.filter((call) => pattern.test(call.tool)).length, `${check.tool} calls`);
}

/** Every command the agent sent through renku_command, as its arguments joined by spaces. */
export function sentCommands(records) {
  return records.renku.calls
    .filter((call) => call.tool === 'renku_command')
    .flatMap((call) => call.input.commands ?? [])
    .map((command) => (command.args ?? []).join(' '));
}

async function checkRenkuCommands(check, context) {
  const commands = sentCommands(context.records);
  const problems = [
    ...(check.absent ?? []).filter((prefix) => commands.some((command) => command.startsWith(prefix))).map((prefix) => `"${prefix}" was sent`),
    ...(check.present ?? []).filter((prefix) => !commands.some((command) => command.startsWith(prefix))).map((prefix) => `"${prefix}" was never sent`),
  ];
  return { passed: problems.length === 0, detail: problems.length === 0 ? `${commands.length} commands sent as expected` : problems.join('; ') };
}

async function checkProviderCalls(check, context) {
  return countResult(check, context.records.provider.requests.filter((request) => request.tool === check.tool).length, `provider ${check.tool} calls`);
}

async function checkProviderPeak(check, context) {
  return countResult(check, context.records.provider.peakRunningJobs, 'provider jobs running at once at most');
}

async function checkProviderInputs(check, context) {
  const fetched = context.records.provider.fetchedInputs.filter((input) => input.status === 200 && (!check.contentType || input.contentType === check.contentType));
  return countResult(check, fetched.length, `provider input links fetched${check.contentType ? ` as ${check.contentType}` : ''}`);
}
