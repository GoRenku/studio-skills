import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { checkProblems, globToRegExp, runChecks, sentCommands, substitutePlaceholders } from './eval-checks.mjs';

/** What a launcher's records look like after an agent ran. */
const RECORDS = {
  renku: {
    clients: ['claude-code'],
    calls: [
      { tool: 'renku_upload', input: { uploads: [] } },
      { tool: 'renku_command', input: { commands: [{ args: ['location', 'list', '--json'] }, { args: ['media', 'import', '--file', 'tmp/imports.json'] }] } },
      { tool: 'renku_command', input: { runId: 'run-1' } },
      { tool: 'casting.board.open', input: {} },
    ],
  },
  provider: {
    requests: [{ tool: 'submit', input: {} }, { tool: 'submit', input: {} }, { tool: 'status', input: {} }],
    peakRunningJobs: 2,
    fetchedInputs: [{ url: 'http://x/a', status: 200, contentType: 'image/png', size: 10 }, { url: 'http://x/b', status: 403, contentType: 'application/json', size: 2 }],
  },
};

/** A project's renku answers, by the command's first words. */
function fakeRenku(answers) {
  const asked = [];
  const renku = async (args) => {
    asked.push(args);
    const key = Object.keys(answers).find((prefix) => args.join(' ').startsWith(prefix));
    if (!key) throw new Error(`renku ${args.join(' ')} exited with 1: unknown command`);
    return typeof answers[key] === 'function' ? answers[key](args) : answers[key];
  };
  return { renku, asked };
}

let projectFolder;

before(async () => {
  projectFolder = await mkdtemp(path.join(os.tmpdir(), 'cloud-eval-checks-'));
  await mkdir(path.join(projectFolder, 'tmp', 'evals'), { recursive: true });
  await mkdir(path.join(projectFolder, 'tmp', 'excerpts'), { recursive: true });
  await writeFile(path.join(projectFolder, 'tmp', 'evals', 'take.json'), JSON.stringify({ width: 640, height: 360, durationSeconds: 12.04 }));
  await writeFile(path.join(projectFolder, 'tmp', 'excerpts', 'slow.mp4.time-map.json'), '{}');
});

after(async () => {
  await rm(projectFolder, { recursive: true, force: true });
});

async function judge(checks, answers = {}) {
  const { renku, asked } = fakeRenku(answers);
  const results = await runChecks(checks, { renku, records: RECORDS, projectFolder, values: { project: 'small-film', harbor: 'location_1', ada: 'cast_1' } });
  return { results, asked };
}

test('a check names a known kind, its required parameters with their types, and nothing else', () => {
  assert.deepEqual(checkProblems({ check: 'assets', owner: 'project', min: 1 }), []);
  assert.deepEqual(checkProblems({ check: 'assets', owner: 7, min: -1, colour: 'red' }), [
    'assets owner must be string',
    'assets min must be integer',
    'assets has no parameter colour',
  ]);
  assert.deepEqual(checkProblems({ check: 'provider-peak' }), ['provider-peak needs max']);
  assert.deepEqual(checkProblems({ check: 'renku-calls', tool: 'renku_upload' }), ['renku-calls needs min, max or both']);
  assert.deepEqual(checkProblems({ check: 'nope' })[0].startsWith('check "nope" is not one of assets'), true);
});

test('placeholders take the project and fixture ids; an unknown one fails', () => {
  assert.deepEqual(substitutePlaceholders({ owner: 'location:{harbor}', list: ['{project}'], min: 2 }, { harbor: 'location_1', project: 'p' }), { owner: 'location:location_1', list: ['p'], min: 2 });
  assert.throws(() => substitutePlaceholders('cast:{ben}', { ada: 'cast_1' }), /SKILLS_CLOUD_EVAL010 no value for \{ben\}/);
});

test('globs: * stays within a folder, ** crosses folders', () => {
  assert.equal(globToRegExp('*.open').test('casting.board.open'), true);
  assert.equal(globToRegExp('tmp/*.json').test('tmp/evals/a.json'), false);
  assert.equal(globToRegExp('tmp/**/*.json').test('tmp/evals/a.json'), true);
  assert.equal(globToRegExp('**/*.time-map.json').test('tmp/excerpts/slow.mp4.time-map.json'), true);
  assert.equal(globToRegExp('renku_upload').test('renku_uploads'), false);
});

test('M2: assets are counted per owner and type, with the placeholders filled', async () => {
  const items = [{ id: 'a1' }, { id: 'a2' }];
  const { results, asked } = await judge([
    { check: 'assets', owner: 'location:{harbor}', type: 'location_sheet', min: 2, max: 2 },
    { check: 'assets', owner: 'location:{harbor}', min: 3 },
  ], { 'asset list': { items } });
  assert.deepEqual(results.map((result) => result.passed), [true, false]);
  assert.deepEqual(asked[0], ['asset', 'list', '--project', 'small-film', '--owner', 'location:location_1', '--limit', '200', '--type', 'location_sheet', '--json']);
  assert.match(results[1].detail, /2 assets of location:location_1; expected at least 3/);
});

test('F11: only assets whose provenance holds a receipt, or names the provider, count', async () => {
  const items = [
    { id: 'a1', generationProvenance: { provider: 'acme', receipt: { requestId: 'job-1' } } },
    { id: 'a2', generationProvenance: { provider: 'codex' } },
    { id: 'a3' },
  ];
  const { results, asked } = await judge([
    { check: 'assets', owner: 'project', withReceipt: true, min: 1, max: 1 },
    { check: 'assets', owner: 'project', provenanceProvider: 'codex', min: 1, max: 1 },
  ], { 'asset list': { items } });
  assert.deepEqual(results.map((result) => result.passed), [true, true]);
  assert.ok(asked[0].includes('--include-generation-provenance'));
});

test('E3: a face-masked copy is read for each asset', async () => {
  const { results } = await judge([{ check: 'assets', owner: 'cast:{ada}', faceMasked: true, min: 1 }], {
    'asset list': { items: [{ id: 'a1' }, { id: 'a2' }] },
    'asset face-mask show': (args) => ({ exists: args.includes('a2') }),
  });
  assert.deepEqual(results.map((result) => [result.passed, result.detail]), [[true, '1 assets of cast:cast_1; expected at least 1']]);
});

test('D5: an asset\'s text holds every word, ignoring case', async () => {
  const items = [{ id: 'a1', oneLineSummary: 'They are AFRAID of your gun. A design unfired…' }];
  const { results } = await judge([
    { check: 'asset-text', owner: 'project', asset: 'a1', field: 'oneLineSummary', includes: ['afraid', 'design'] },
    { check: 'asset-text', owner: 'project', asset: 'a1', field: 'oneLineSummary', includes: ['harbor'] },
    { check: 'asset-text', owner: 'project', asset: 'a9', field: 'oneLineSummary', includes: ['x'] },
  ], { 'asset list': { items } });
  assert.deepEqual(results.map((result) => result.passed), [true, false, false]);
  assert.match(results[2].detail, /project has no asset a9/);
});

test('I4: scene count and headings come from the screenplay', async () => {
  const scenes = [{ heading: 'EXT. HARBOR - DAWN' }, { heading: 'INT. LIGHTHOUSE - NIGHT' }];
  const { results } = await judge([
    { check: 'screenplay-scenes', min: 2, headings: ['ext. harbor - dawn'] },
    { check: 'screenplay-scenes', min: 2, headings: ['EXT. MARKET - DAY'] },
  ], { 'screenplay show': { scenes } });
  assert.deepEqual(results.map((result) => result.passed), [true, false]);
  assert.match(results[1].detail, /no heading holds EXT\. MARKET - DAY/);
});

test('D6: a Location is found by name and its description words', async () => {
  const locations = [{ name: 'The Lighthouse', description: { overview: 'A white tower on the northern headland; an iron stair.' } }];
  const { results } = await judge([
    { check: 'location', name: 'lighthouse', descriptionIncludes: ['headland', 'stair'] },
    { check: 'location', name: 'Chapel' },
  ], { 'location list': locations });
  assert.deepEqual(results.map((result) => result.passed), [true, false]);
});

test('G3, H3, F11: voices, previs revisions with a render, and jobs by status', async () => {
  const { results } = await judge([
    { check: 'cast-voices', cast: '{ada}', min: 1, max: 1 },
    { check: 'previs-revisions', shotPlan: 'plan_1', withRender: true, min: 1 },
    { check: 'generation-jobs', status: 'imported', min: 2 },
    { check: 'generation-jobs', status: 'submitted', max: 0 },
  ], {
    'cast voice list': { voices: [{ name: 'warm' }] },
    'shot-plan previs show': { revisions: [{ render: null }, { render: { projectRelativePath: 'r.mp4' } }] },
    'generation job list': { jobs: [{ status: 'imported' }, { status: 'imported' }, { status: 'submitted' }] },
  });
  assert.deepEqual(results.map((result) => result.passed), [true, true, true, false]);
});

test('D4, E5: project files are read for exact fields, tolerances and globs', async () => {
  const { results } = await judge([
    { check: 'project-json', path: 'tmp/evals/take.json', fields: { width: 640, height: 360 }, approx: { durationSeconds: '12±0.2' } },
    { check: 'project-json', path: 'tmp/evals/take.json', fields: { width: 1280 }, approx: { durationSeconds: '10±0.2' } },
    { check: 'project-files', pattern: '**/*.time-map.json', min: 1 },
    { check: 'project-json', path: 'tmp/evals/missing.json', fields: { width: 1 } },
  ]);
  assert.deepEqual(results.map((result) => result.passed), [true, false, true, false]);
  assert.equal(results[1].detail, 'width is 640, not 1280; durationSeconds is 12.04, not 10±0.2');
  assert.match(results[3].detail, /ENOENT/);
});

test('M2, G3, F16: Renku calls and the commands inside batches are counted from the records', async () => {
  assert.deepEqual(sentCommands(RECORDS), ['location list --json', 'media import --file tmp/imports.json']);
  const { results } = await judge([
    { check: 'renku-calls', tool: 'renku_upload', min: 1, max: 1 },
    { check: 'renku-calls', tool: 'renku_command', max: 1 },
    { check: 'renku-calls', tool: '*.open', max: 0 },
    { check: 'renku-commands', absent: ['credentials'], present: ['media import'] },
    { check: 'renku-commands', absent: ['location list'] },
  ]);
  assert.deepEqual(results.map((result) => result.passed), [true, false, false, true, false]);
  assert.equal(results[4].detail, '"location list" was sent');
});

test('F11, E6: provider calls, the peak of running jobs and fetched inputs come from the fake provider', async () => {
  const { results } = await judge([
    { check: 'provider-calls', tool: 'submit', min: 2, max: 2 },
    { check: 'provider-peak', max: 1 },
    { check: 'provider-inputs', contentType: 'image/png', min: 1 },
    { check: 'provider-inputs', min: 2 },
  ]);
  assert.deepEqual(results.map((result) => result.passed), [true, false, true, false]);
});

test('a renku failure fails its check with renku\'s message, and the other checks still run', async () => {
  const { results } = await judge([
    { check: 'cast-member', name: 'Gus' },
    { check: 'provider-peak', max: 2 },
  ]);
  assert.deepEqual(results.map((result) => result.passed), [false, true]);
  assert.match(results[0].detail, /renku cast list --json exited with 1/);
  assert.equal(results[0].check, 'cast-member(name=Gus)');
});
