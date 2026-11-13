import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseYamlSubset, splitFrontMatter } from './front-matter.mjs';

test('scalars: plain, quoted, numbers, booleans and null', () => {
  assert.deepEqual(parseYamlSubset([
    'plain: location:{harbor}',
    'double: "{ada}"',
    "single: 'it''s'",
    'count: 7',
    'ratio: 0.5',
    'on: true',
    'off: false',
    'nothing: null',
  ].join('\n')), { plain: 'location:{harbor}', double: '{ada}', single: "it's", count: 7, ratio: 0.5, on: true, off: false, nothing: null });
});

test('flow lists and maps hold scalars, with quotes respected', () => {
  assert.deepEqual(parseYamlSubset('cases: [M2, E1]\nheadings: [EXT. HARBOR - DAWN, "A, B"]\nempty: []\nfields: {width: 640, name: "x, y"}'), {
    cases: ['M2', 'E1'],
    headings: ['EXT. HARBOR - DAWN', 'A, B'],
    empty: [],
    fields: { width: 640, name: 'x, y' },
  });
});

test('a | block keeps its line breaks and drops trailing ones', () => {
  const text = 'request: |\n  First line\n    indented line\n\n  after a blank\n\nnext: 1';
  assert.deepEqual(parseYamlSubset(text), { request: 'First line\n  indented line\n\nafter a blank', next: 1 });
});

test('a list of maps, indented or level with its key', () => {
  const nested = 'checks:\n  - check: assets\n    min: 7\n  - check: renku-calls\n    tool: renku_upload\n';
  const level = 'checks:\n- check: assets\n  min: 7\n- plain item\n';
  assert.deepEqual(parseYamlSubset(nested), { checks: [{ check: 'assets', min: 7 }, { check: 'renku-calls', tool: 'renku_upload' }] });
  assert.deepEqual(parseYamlSubset(level), { checks: [{ check: 'assets', min: 7 }, 'plain item'] });
});

test('comment lines are skipped, but a # inside a value is kept', () => {
  assert.deepEqual(parseYamlSubset('# a note\nname: a#b\n  # indented note\nother: 2'), { name: 'a#b', other: 2 });
});

test('anything outside the subset fails with its line number', () => {
  assert.throws(() => parseYamlSubset('a: 1\nnot a key line'), /SKILLS_CLOUD_EVAL001 line 2: expected "key: value"/);
  assert.throws(() => parseYamlSubset('a: 1\na: 2'), /line 2: a is given twice/);
  assert.throws(() => parseYamlSubset('a: [1, [2]]'), /flow lists and maps hold scalars only/);
  assert.throws(() => parseYamlSubset('a: [1, 2'), /must end with \]/);
  assert.throws(() => parseYamlSubset('a: |\nb: 1'), /a \| block needs indented lines/);
  assert.throws(() => parseYamlSubset('a:\n  b: 1\n c: 2'), /unexpected indentation/);
});

test('front matter sits between --- lines at the top; line numbers count from the file', () => {
  const { data, body } = splitFrontMatter('---\ncases: [M2]\n---\n\n# Title\n');
  assert.deepEqual(data, { cases: ['M2'] });
  assert.equal(body, '\n# Title\n');
  assert.throws(() => splitFrontMatter('# no front matter'), /must start with a --- line/);
  assert.throws(() => splitFrontMatter('---\ncases: [M2]\n'), /no closing --- line/);
  assert.throws(() => splitFrontMatter('---\ncases: [M2]\nbroken\n---\n'), /line 3:/);
});
