#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const guideRoot = join(skillRoot, 'references/model-guides');
const catalog = JSON.parse(readFileSync(join(guideRoot, 'model-catalog.json'), 'utf8'));
const models = (catalog.models ?? []).filter((model) => model.mediaKind === 'video');
const errors = [];
const referencedGuides = new Set();

for (const model of models) {
  validateGuide(model.key, model.guide);
  for (const [operation, guide] of Object.entries(model.operations ?? {})) {
    if (guide !== null) validateGuide(`${model.key}/${operation}`, guide);
  }
}

for (const [modelKey, expected] of [
  ['seedance-2.0', ['text-to-video', 'image-to-video', 'first-last-frame-to-video', 'reference-to-video']],
  ['minimax-h3', ['text-to-video', 'image-to-video', 'first-last-frame-to-video', 'reference-to-video']],
  ['gemini-omni-flash-1.1', ['text-to-video', 'image-to-video', 'first-last-frame-to-video', 'reference-to-video', 'video-edit']],
  ['wan-3.0-prime', ['text-to-video', 'image-to-video', 'first-last-frame-to-video', 'reference-to-video']],
]) {
  const model = models.find((entry) => entry.key === modelKey);
  if (!model || expected.some((operation) => !(operation in model.operations))) {
    errors.push(`${modelKey} is missing required operation guidance.`);
  }
}

const storyboardPath = join(guideRoot, 'video/seedance-2.0/storyboard-reference-to-video.md');
const storyboard = readFileSync(storyboardPath, 'utf8');
for (const required of ['Pre-Draft Storyboard Audit', 'Common Failure Fixes', 'physical waypoints', 'golden-prompts.md']) {
  if (!storyboard.includes(required)) errors.push(`Seedance storyboard guidance lost ${required}.`);
}

for (const file of referencedGuides) {
  const guide = readFileSync(file, 'utf8');
  if (/@(?:Image|Video|Audio)\d+/.test(guide)) {
    errors.push(`Canonical video guidance contains provider mention syntax: ${relative(guideRoot, file)}.`);
  }
}

const falAdapter = readFileSync(
  join(skillRoot, '../fal-ai-media-provider/references/adapters/reference-inputs.md'),
  'utf8',
);
if (!falAdapter.includes('@ImageN') || !falAdapter.includes('Image N')
  || !falAdapter.includes('<IMAGE_REF_0>') || !falAdapter.includes('Audio N')) {
  errors.push('Fal adapter must preserve distinct Seedance, MiniMax, Gemini, and Wan mention syntax.');
}

const falRoutes = JSON.parse(readFileSync(
  join(skillRoot, '../fal-ai-media-provider/references/supported-routes.json'),
  'utf8',
)).routes ?? [];
for (const [apiId, expectedOperations] of [
  ['google/gemini-omni-flash/v1.1/text-to-video', ['text-to-video']],
  ['google/gemini-omni-flash/v1.1/image-to-video', ['image-to-video', 'first-last-frame-to-video']],
  ['google/gemini-omni-flash/v1.1/reference-to-video', ['reference-to-video']],
  ['google/gemini-omni-flash/v1.1/edit', ['video-edit']],
  ['alibaba/wan-3.0-prime/text-to-video', ['text-to-video']],
  ['alibaba/wan-3.0-prime/image-to-video', ['image-to-video', 'first-last-frame-to-video']],
  ['alibaba/wan-3.0-prime/reference-to-video', ['reference-to-video']],
]) {
  const route = falRoutes.find((entry) => entry.apiId === apiId);
  if (!route || route.operations.join(',') !== expectedOperations.join(',')) {
    errors.push(`Fal route is missing or has incorrect operations: ${apiId}.`);
  }
}

for (const file of markdownFiles(join(guideRoot, 'video'))) {
  if (file.endsWith('storyboard-reference-to-video.md') || file.endsWith('native-audio.md')
    || file.endsWith('operation-selection.md')) continue;
  if (!referencedGuides.has(file)) {
    errors.push(`Unreferenced canonical video guide: ${relative(guideRoot, file)}.`);
  }
}

const shotPlanIndex = readFileSync(join(skillRoot, 'references/shot-plan-video/index.md'), 'utf8');
for (const required of [
  'model-catalog.json',
  'model-guides/shared/prompt-input-visibility.md',
  'model-guides/shared/video-quality-checklist.md',
]) {
  if (!shotPlanIndex.includes(required)) errors.push(`Shot Plan workflow does not link ${required}.`);
}

if (errors.length) {
  console.error(`Video prompt guide validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Validated ${models.length} canonical video models across ${referencedGuides.size} guides.`);

function validateGuide(identity, relativePath) {
  const guidePath = resolve(guideRoot, relativePath ?? '');
  if (!guidePath.startsWith(`${guideRoot}/`) || !existsSync(guidePath)) {
    errors.push(`Video guide is missing for ${identity}: ${relativePath}.`);
    return;
  }
  referencedGuides.add(guidePath);
}

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(target) : entry.name.endsWith('.md') ? [target] : [];
  });
}
