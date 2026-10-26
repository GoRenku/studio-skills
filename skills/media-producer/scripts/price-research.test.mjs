import assert from 'node:assert/strict';
import test from 'node:test';
import { assessPriceResearch } from '../evals/generation-context/price-research.mjs';

const route = { askBeforeGenerating: true, provider: 'replicate', apiPriced: false };
const researched = [{ type: 'review-opened' }, { type: 'web-fetch' }, { type: 'pricing-page-read' },
  { type: 'price-recorded' }, { type: 'review-refreshed' }];

test('a missingPrice estimate without API pricing is researched once, then the review is refreshed', () => {
  assert.deepEqual(assessPriceResearch({ ...route, estimateState: 'missingPrice', events: researched }), []);
  assert.deepEqual(assessPriceResearch({ ...route, estimateState: 'missingPrice', events: [{ type: 'review-opened' }] }),
    ['missing-price-research']);
  assert.deepEqual(assessPriceResearch({ ...route, estimateState: 'missingPrice',
    events: [{ type: 'review-opened' }, { type: 'browser-opened' }, { type: 'web-fetch' }, { type: 'price-recorded' },
      { type: 'price-recorded' }] }),
  ['browser-before-web-fetch', 'repeated-price-research', 'review-not-refreshed-after-recorded-price']);
});

test('price research never runs for priced, API-priced, plan-usage, already-recorded or Ask-off routes', () => {
  for (const observation of [
    { ...route, estimateState: 'computed' },
    { ...route, estimateState: 'unpriced' },
    { ...route, estimateState: 'hostPlanUsage', provider: 'codex' },
    { ...route, estimateState: 'missingPrice', apiPriced: true },
    { ...route, estimateState: 'missingPrice', provider: 'codex' },
    { ...route, estimateState: 'missingPrice', askBeforeGenerating: false },
    { ...route, estimateState: 'missingPrice', alreadyRecorded: true },
  ]) {
    assert.deepEqual(assessPriceResearch({ ...observation, events: [{ type: 'review-opened' }] }), []);
    assert.deepEqual(assessPriceResearch({ ...observation, events: researched }), ['unneeded-price-research']);
  }
});

test('prices are never written into Skill files', () => {
  assert.deepEqual(assessPriceResearch({ ...route, estimateState: 'missingPrice',
    events: [...researched, { type: 'price-written-to-skill' }] }), ['price-in-skill-files']);
});
