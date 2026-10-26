import assert from 'node:assert/strict';
import test from 'node:test';
import { codexIdentityIssue, validateDefaultModelList } from './media-generation-skill-checks.mjs';

const guideKeys = new Set(['flux-3-image', 'chatgpt-images-2.5', 'seedance-2.5']);
const routesByProvider = new Map([
  ['fal-ai', [{ apiId: 'flux/edit', name: 'FLUX 3 Image Edit' }, { apiId: 'seedance/i2v', name: 'Seedance 2.5' }]],
  ['pika', [{ apiId: 'seedance', name: 'Seedance 2.5' }]],
]);
const list = (lanes) => ({ formatVersion: 1, lanes: { image: [], imageEdit: [], video: [], audio: [], ...lanes } });
const entry = (model, name, providers, recommendedFor = []) => ({ model, name, providers, recommendedFor });
const on = (provider, route) => ({ provider, route });
const levels = { lowest: { resolution: '1k' }, mid: { resolution: '2k' }, highest: { resolution: '4k' } };
const onImage = (provider, route, detail = levels) => ({ provider, route, detail });

test('a curated list with supported routes and the Codex guide is valid', () => {
  assert.deepEqual(validateDefaultModelList(list({
    imageEdit: [entry('flux-3-image', 'FLUX 3', [onImage('fal-ai', 'flux/edit')], ['fal-ai']),
      entry('chatgpt-images-2.5', 'GPT Image 2.5',
        [onImage('codex', 'chatgpt-images-2.5', { lowest: {}, mid: {}, highest: {} })], ['codex'])],
    video: [entry('seedance-2.5', 'Seedance 2.5', [on('fal-ai', 'seedance/i2v'), on('pika', 'seedance')],
      ['fal-ai', 'pika'])],
  }), { guideKeys, routesByProvider }), []);
});

test('collects missing guides, unsupported routes, unknown providers and Codex mismatches', () => {
  assert.deepEqual(validateDefaultModelList(list({
    image: [entry('seedream', 'Seedream', [onImage('fal-ai', 'seedream')]),
      entry('flux-3-image', 'FLUX 3', [onImage('pika', 'flux/edit'), onImage('replicate', 'flux')]),
      entry('seedance-2.5', 'Seedance 2.5', [onImage('codex', 'seedance-2.5')])],
  }), { guideKeys, routesByProvider }), [
    'image seedream has no model guide.',
    'image seedream: fal-ai route seedream is not in its supported-routes.json.',
    'image flux-3-image: pika route flux/edit is not in its supported-routes.json.',
    'image flux-3-image names provider replicate, which has no provider Skill.',
    'image seedance-2.5: Codex has no built-in model seedance-2.5.',
  ]);
});

test('every provider entry names a provider and a non-empty route', () => {
  assert.deepEqual(validateDefaultModelList(list({
    video: [entry('seedance-2.5', 'Seedance 2.5', [on('fal-ai', ''), { route: 'seedance' }, on('codex', ' ')])],
  }), { guideKeys, routesByProvider }), [
    'video seedance-2.5: fal-ai has no route.',
    'video seedance-2.5 has a provider entry without a provider.',
    'video seedance-2.5: codex has no route.',
  ]);
});

test('each provider has at most one recommendation per lane, within its providers', () => {
  assert.deepEqual(validateDefaultModelList(list({
    video: [entry('seedance-2.5', 'Seedance 2.5', [on('fal-ai', 'seedance/i2v')], ['fal-ai', 'pika']),
      entry('flux-3-image', 'FLUX 3', [on('fal-ai', 'flux/edit')], ['fal-ai'])],
  }), { guideKeys, routesByProvider }), [
    'video seedance-2.5 recommends pika, which is not in providers.',
    'video recommends more than one model for fal-ai.',
  ]);
});

test('every image and image edit provider entry maps exactly three detail levels to objects', () => {
  assert.deepEqual(validateDefaultModelList(list({
    image: [entry('flux-3-image', 'FLUX 3', [on('fal-ai', 'flux/edit')]),
      entry('chatgpt-images-2.5', 'GPT Image 2.5', [onImage('codex', 'chatgpt-images-2.5', { lowest: {}, highest: {} })])],
    imageEdit: [entry('flux-3-image', 'FLUX 3', [onImage('fal-ai', 'flux/edit', { ...levels, max: {} })]),
      entry('chatgpt-images-2.5', 'GPT Image 2.5',
        [onImage('codex', 'chatgpt-images-2.5', { lowest: {}, mid: '2k', highest: [] })])],
  }), { guideKeys, routesByProvider }), [
    'image flux-3-image: fal-ai has no detail object.',
    'image chatgpt-images-2.5: codex detail must have exactly lowest, mid, highest.',
    'imageEdit flux-3-image: fal-ai detail must have exactly lowest, mid, highest.',
    'imageEdit chatgpt-images-2.5: codex detail mid must be an object of native request fields.',
  ]);
});

test('video and audio provider entries have no detail levels', () => {
  assert.deepEqual(validateDefaultModelList(list({
    video: [entry('seedance-2.5', 'Seedance 2.5', [onImage('fal-ai', 'seedance/i2v'), on('pika', 'seedance')])],
  }), { guideKeys, routesByProvider }), [
    'video seedance-2.5: fal-ai has detail, which only image lanes take.',
  ]);
});

test('the list keeps all four lanes and format version 1', () => {
  assert.deepEqual(validateDefaultModelList({ formatVersion: 2, lanes: { image: [], video: [] } },
    { guideKeys, routesByProvider }), ['formatVersion must be 1.', 'lanes must be exactly image, imageEdit, video, audio.']);
});

test('the Codex built-in identity belongs to its own guide', () => {
  assert.equal(codexIdentityIssue({ model: 'chatgpt-images-2.5', guideKey: 'chatgpt-images-2.5' }), null);
  assert.equal(codexIdentityIssue({ model: 'chatgpt-images-2.5', guideKey: 'gpt-image-2.5' }),
    'Codex chatgpt-images-2.5 is declared outside its chatgpt-images-2.5 guide.');
  assert.equal(codexIdentityIssue({ model: 'openai/gpt-image-2.5/flare/edit', guideKey: 'chatgpt-images-2.5' }),
    'Codex has no built-in model openai/gpt-image-2.5/flare/edit.');
});
