import assert from 'node:assert/strict';
import test from 'node:test';
import { assessPreparation, assessModelDiscovery, assessExpansionChoice } from '../evals/generation-context/preparation.mjs';

// Studio Preview path observations; panel routing has its own matrix.

for (const mediaKind of ['image', 'audio', 'video']) {
  test(`${mediaKind} writes the request and prepares it in one operation`, () => {
    assert.deepEqual(assessPreparation({ events: [
      { type: 'review-authored', toolOperation: 2, mediaKind }, { type: 'request-prepared', toolOperation: 2, mediaKind },
    ] }), []);
  });
}

test('detects split preparation, redundant calls and a writing roundtrip', () => {
  assert.deepEqual(assessPreparation({ events: [{ type: 'validate' }, { type: 'preview' }] }),
    ['split-request-preparation']);
  assert.deepEqual(assessPreparation({ events: [{ type: 'review-authored', toolOperation: 1 },
    { type: 'request-prepared', toolOperation: 2 }, { type: 'validate' }] }),
  ['redundant-preparation-call', 'request-writing-roundtrip']);
});

test('preserves non-Engines and no-Preview flows', () => {
  assert.deepEqual(assessPreparation({ previewRequired: false, events: [{ type: 'validate' }] }), []);
  assert.deepEqual(assessPreparation({ engines: false, events: [{ type: 'preview' }] }), []);
});

test('discovery preserves selector choices and relevant advice without imposing a read sequence', () => {
  const catalog = { routes: [{ apiId: 'selected' }, { apiId: 'alternative' }], routeCatalogSha256: 'full' };
  const observation = { redundantListCalls: 0, preparationRoutes: catalog.routes, selectorRoutes: catalog.routes,
    relevantGuidanceApplied: true };
  assert.deepEqual(assessModelDiscovery(observation), []);
  assert.deepEqual(assessModelDiscovery({ ...observation, redundantListCalls: 1,
    selectorRoutes: [catalog.routes[0]], relevantGuidanceApplied: false }),
  ['repeated-model-discovery', 'incomplete-selector-catalog', 'missing-selected-model-guidance']);
});

test('enabled expansion keeps the schema default and respects explicit choices', () => {
  const schema = { schemaDefault: 'balanced', enabledValues: ['balanced', 'quality'] };
  assert.deepEqual(assessExpansionChoice({ ...schema, selected: 'balanced' }), []);
  assert.deepEqual(assessExpansionChoice({ ...schema, selected: 'quality' }), ['enabled-expansion-default-overridden']);
  assert.deepEqual(assessExpansionChoice({ ...schema, selected: 'quality', requested: 'quality' }), []);
  assert.deepEqual(assessExpansionChoice({ ...schema, selected: 'balanced', requested: 'quality' }), ['explicit-expansion-choice-lost']);
  assert.deepEqual(assessExpansionChoice({ ...schema, selected: 'off', requested: 'off' }), []);
  assert.deepEqual(assessExpansionChoice({ schemaDefault: false, enabledValues: [true], selected: true }), []);
});
