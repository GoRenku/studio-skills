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

test('a curated list with family-named routes and the Codex guide is valid', () => {
  assert.deepEqual(validateDefaultModelList(list({
    imageEdit: [entry('flux-3-image', 'FLUX 3', ['fal-ai'], ['fal-ai']),
      entry('chatgpt-images-2.5', 'GPT Image 2.5', ['codex'], ['codex'])],
    video: [entry('seedance-2.5', 'Seedance 2.5', ['fal-ai', 'pika'], ['fal-ai', 'pika'])],
  }), { guideKeys, routesByProvider }), []);
});

test('collects missing guides, missing family routes, unknown providers and Codex mismatches', () => {
  assert.deepEqual(validateDefaultModelList(list({
    image: [entry('seedream', 'Seedream', ['fal-ai']), entry('flux-3-image', 'FLUX 3', ['pika', 'replicate']),
      entry('seedance-2.5', 'Seedance 2.5', ['codex'])],
  }), { guideKeys, routesByProvider }), [
    'image seedream has no model guide.',
    'image seedream: fal-ai has no Seedream route in its supported-routes.json.',
    'image flux-3-image: pika has no FLUX 3 route in its supported-routes.json.',
    'image flux-3-image names provider replicate, which has no provider Skill.',
    'image seedance-2.5: Codex has no built-in model seedance-2.5.',
  ]);
});

test('a family name matches a whole word prefix only', () => {
  assert.deepEqual(validateDefaultModelList(list({ imageEdit: [entry('flux-3-image', 'FLUX', ['fal-ai'])] }),
    { guideKeys, routesByProvider }), []);
  assert.deepEqual(validateDefaultModelList(list({ imageEdit: [entry('flux-3-image', 'FLUX 3 Im', ['fal-ai'])] }),
    { guideKeys, routesByProvider }), ['imageEdit flux-3-image: fal-ai has no FLUX 3 Im route in its supported-routes.json.']);
});

test('each provider has at most one recommendation per lane, within its providers', () => {
  assert.deepEqual(validateDefaultModelList(list({
    video: [entry('seedance-2.5', 'Seedance 2.5', ['fal-ai'], ['fal-ai', 'pika']),
      entry('flux-3-image', 'FLUX 3', ['fal-ai'], ['fal-ai'])],
  }), { guideKeys, routesByProvider }), [
    'video seedance-2.5 recommends pika, which is not in providers.',
    'video recommends more than one model for fal-ai.',
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
