import assert from 'node:assert/strict';
import test from 'node:test';
import { assessPriceResearch } from '../evals/generation-context/price-research.mjs';

const route = { askBeforeGenerating: true, billing: 'providerCharge', apiPriced: false };
const researched = [{ type: 'web-fetch' }, { type: 'pricing-page-read' }, { type: 'price-recorded' }, { type: 'review-opened' }];

for (const estimateState of ['missingPrice', 'expired']) {
  test(`a ${estimateState} estimate without API pricing is researched once before the review`, () => {
    assert.deepEqual(assessPriceResearch({ ...route, estimateState, events: researched }), []);
    assert.deepEqual(assessPriceResearch({ ...route, estimateState, events: [{ type: 'review-opened' }] }),
      ['missing-price-research']);
    assert.deepEqual(assessPriceResearch({ ...route, estimateState,
      events: [{ type: 'browser-opened' }, { type: 'web-fetch' }, { type: 'review-opened' }, { type: 'price-recorded' },
        { type: 'price-recorded' }] }),
    ['browser-before-web-fetch', 'repeated-price-research', 'review-shown-before-recorded-price']);
  });
}

test('price research never runs for priced, API-priced, plan-usage or Ask-off routes', () => {
  for (const observation of [
    { ...route, estimateState: 'computed' },
    { ...route, estimateState: 'quoted' },
    { ...route, estimateState: 'unpriced' },
    { ...route, estimateState: 'missingPrice', apiPriced: true },
    { ...route, estimateState: 'missingPrice', billing: 'hostPlanUsage' },
    { ...route, estimateState: 'expired', askBeforeGenerating: false },
    { ...route, estimateState: 'expired', researchedThisPeriod: true },
  ]) {
    assert.deepEqual(assessPriceResearch({ ...observation, events: [{ type: 'review-opened' }] }), []);
    assert.deepEqual(assessPriceResearch({ ...observation, events: researched }), ['unneeded-price-research']);
  }
});

test('prices are never written into Skill files', () => {
  assert.deepEqual(assessPriceResearch({ ...route, estimateState: 'missingPrice',
    events: [...researched, { type: 'price-written-to-skill' }] }), ['price-in-skill-files']);
});
