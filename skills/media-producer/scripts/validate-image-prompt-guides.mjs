#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const guideRoot = join(skillRoot, 'references/model-guides');
const catalog = JSON.parse(readFileSync(join(guideRoot, 'model-catalog.json'), 'utf8'));
const models = (catalog.models ?? []).filter((model) => model.mediaKind === 'image');
const errors = [];
const referencedGuides = new Set();

if (models.length === 0) errors.push('The canonical catalog contains no image models.');
for (const model of models) {
  const guidePath = resolve(guideRoot, model.guide ?? '');
  if (!guidePath.startsWith(`${guideRoot}/`) || !existsSync(guidePath)) {
    errors.push(`Image guide is missing for ${model.key}: ${model.guide}.`);
    continue;
  }
  referencedGuides.add(guidePath);
  const guide = readFileSync(guidePath, 'utf8');
  if (!/^# .+Prompt Guide/m.test(guide) || !/^## Provenance$/m.test(guide)) {
    errors.push(`Image guide lacks prompt-guide/provenance structure: ${model.guide}.`);
  }
  if (/generation model list|GenerationSpec|checked-in schema/i.test(guide)) {
    errors.push(`Image guide cites an obsolete generation contract: ${model.guide}.`);
  }
  const editorialGuide = guide.split(/^## Provenance$/m)[0];
  if (/\b(?:fal-ai|wavespeed-ai)\/[a-z0-9]/i.test(editorialGuide)) {
    errors.push(`Canonical image guide contains a provider route id: ${model.guide}.`);
  }
}

for (const required of ['shared/image-prompting.md', 'shared/reference-inputs.md']) {
  if (!existsSync(join(guideRoot, required))) errors.push(`Missing shared image guidance: ${required}.`);
}
const mediaProducer = readFileSync(join(skillRoot, 'SKILL.md'), 'utf8');
for (const required of ['model-guides/shared/image-prompting.md', 'model-guides/shared/reference-inputs.md']) {
  if (!mediaProducer.includes(required)) errors.push(`Media Producer does not link ${required}.`);
}

for (const file of markdownFiles(join(guideRoot, 'image'))) {
  if (!referencedGuides.has(file)) {
    errors.push(`Unreferenced canonical image guide: ${relative(guideRoot, file)}.`);
  }
}

if (errors.length) {
  console.error(`Image prompt guide validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Validated ${models.length} canonical image models across ${referencedGuides.size} guides.`);

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(target) : entry.name.endsWith('.md') ? [target] : [];
  });
}
