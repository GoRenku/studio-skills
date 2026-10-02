import assert from 'node:assert/strict';
import test from 'node:test';
import { assessPreparation, assessModelDiscovery, assessExpansionChoice } from '../evals/generation-context/preparation.mjs';

// Visualize desktop observations; panel and mandatory Preview routing have their own matrix.

for (const mediaKind of ['image', 'audio', 'video']) {
  test(`${mediaKind} reuses cached HTML, carries new settings, and prepares in one operation`, () => {
    const payload = { mediaKind, prompt: 'Current request', controls: { quality: 'selected' } };
    assert.deepEqual(assessPreparation({ payload, renderedPayload: payload, events: [
      { type: 'visualization-prepared', status: 'fresh' }, { type: 'configuration-rendered' },
      { type: 'review-authored', toolOperation: 2 }, { type: 'request-prepared', toolOperation: 2 },
    ] }), []);
  });
}

test('detects split preparation, a rebuilt fresh cache, and stale request payload', () => {
  assert.deepEqual(assessPreparation({ payload: { prompt: 'New' }, renderedPayload: { prompt: 'Old' }, events: [
    { type: 'visualization-prepared', status: 'fresh' }, { type: 'schema-fetch' },
    { type: 'template-authoring' }, { type: 'configuration-rendered' }, { type: 'validate' }, { type: 'preview' },
  ] }), ['split-request-preparation', 'fresh-cache-rebuilt', 'request-payload-not-preserved']);
});

test('permits a cache rebuild after incompatibility and preserves non-Engines and no-Preview flows', () => {
  const events = [{ type: 'visualization-prepared', status: 'incompatible' }, { type: 'schema-fetch' },
    { type: 'template-authoring' }, { type: 'visualization-prepared', status: 'fresh' }, { type: 'configuration-rendered' }];
  assert.deepEqual(assessPreparation({ engines: false, events }), []);
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
