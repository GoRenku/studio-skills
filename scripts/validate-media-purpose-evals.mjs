#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'skills/media-producer/evals/forward-test-cases.md',
  'skills/media-producer/evals/image-prompt-routing/forward-test-cases.md',
  'skills/media-producer/evals/shot-plan-video/forward-test-cases.md',
];
const evaluations = files.map((file) => readFileSync(path.join(root, file), 'utf8')).join('\n');
const coverage = JSON.parse(readFileSync(
  path.join(root, 'skills/media-producer/evals/purpose-coverage.json'),
  'utf8',
));
const requiredPurposes = [
  'image.create', 'image.edit', 'project.cover',
  'cast.character-sheet', 'cast.profile', 'cast.voice-sample',
  'location.sheet', 'location.hero', 'prop.sheet', 'prop.hero',
  'lookbook.image', 'lookbook.video-sheet', 'lookbook.storyboard-sheet',
  'scene.storyboard-sheet', 'shot.image',
  'shot-plan.video-first-frame', 'shot-plan.video-last-frame',
  'shot-plan.video-storyboard', 'shot-plan.video-reference',
  'shot-plan.video-generation', 'scene.dialogue-audio',
];
const required = [
  'Codex capability present', 'Codex capability absent',
  'Interrupted asynchronous job', 'External file import',
  'departure from suggested references', 'source-preserving',
  'create-versus-edit', 'Provider edit route', 'first-and-last',
  'Prop interaction', 'single Beat', 'dense',
];
const missingPurposes = requiredPurposes.filter((purpose) => !coverage.purposes?.[purpose]);
const missingEvalIds = Object.values(coverage.purposes ?? {}).filter(
  (evalId) => !evaluations.includes(`## ${evalId}`),
);
const missing = required.filter((value) => !evaluations.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
if (missingPurposes.length || missingEvalIds.length) {
  console.error(`Media purpose coverage manifest failed; missing purposes: ${missingPurposes.join(', ')}; missing eval ids: ${missingEvalIds.join(', ')}`);
  process.exit(1);
}
if (missing.length) {
  console.error(`Media purpose eval validation failed; missing: ${missing.join(', ')}`);
  process.exit(1);
}
console.log(`Validated ${requiredPurposes.length} purposes and ${required.length} cross-cutting eval requirements.`);
