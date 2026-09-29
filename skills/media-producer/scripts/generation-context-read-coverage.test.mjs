import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import { unreadBriefingRanges } from '../evals/generation-context/read-coverage.mjs';

const { reports } = JSON.parse(await fs.readFile(
  new URL('../evals/generation-context/fixtures.json', import.meta.url), 'utf8',
));

test('Loukas partial-read trace fails completeness despite a single successful capture', () => {
  assert.deepEqual(unreadBriefingRanges(1408, [[1, 240], [843, 1072]]),
    [[241, 842], [1073, 1408]]);
});

test('H3 selected references do not excuse an unread middle of the Media inventory', () => {
  assert.deepEqual(unreadBriefingRanges(3578, [
    [1, 300], [601, 900], [301, 600], [901, 1200], [601, 1000],
    [1001, 1932], [3270, 3578], [1933, 2250],
  ]), [[2251, 3269]]);
});

for (const [name, { report, text }] of Object.entries(reports)) {
  for (const [format, contents] of [['text', text], ['json', JSON.stringify(report, null, 2)]]) {
    test(`${name} ${format}: coverage detects skipped middle and tail pages`, () => {
      const total = contents.replace(/\n$/, '').split('\n').length;
      const split = Math.floor(total / 3);
      const pages = [[1, split], [split + 1, split * 2], [split * 2 + 1, total]];
      assert.deepEqual(unreadBriefingRanges(total, pages), []);
      assert.deepEqual(unreadBriefingRanges(total, [pages[0], pages[2]]), [pages[1]]);
      assert.deepEqual(unreadBriefingRanges(total, pages.slice(0, 2)), [pages[2]]);
    });
  }
}

test('overlap and navigation order do not hide gaps or require duplicate reading', () => {
  assert.deepEqual(unreadBriefingRanges(10, [[7, 10], [1, 4], [3, 8]]), []);
  assert.deepEqual(unreadBriefingRanges(10, [[1, 4], [4, 6]]), [[7, 10]]);
  assert.deepEqual(unreadBriefingRanges(10, []), [[1, 10]]);
  assert.throws(() => unreadBriefingRanges(10, [[1, 11]]), RangeError);
});
