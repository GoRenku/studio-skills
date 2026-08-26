#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(skillRoot, 'references/prompt-guides/video/guide-registry.json');
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const errors = [];
const identities = new Set();

for (const [index, route] of (registry.routes ?? []).entries()) {
  if (!nonEmpty(route.provider) || !nonEmpty(route.model) || !nonEmpty(route.guide)) {
    errors.push(`Video guide route ${index + 1} must contain provider, model, and guide.`);
    continue;
  }
  const identity = `${route.provider}/${route.model}`;
  if (identities.has(identity)) errors.push(`Duplicate video guide route: ${identity}.`);
  identities.add(identity);
  const guidePath = resolve(skillRoot, route.guide);
  if (!guidePath.startsWith(skillRoot) || !existsSync(guidePath)) {
    errors.push(`Video guide is missing for ${identity}: ${route.guide}.`);
  }
}

const seedance = read('references/prompt-guides/video/models/seedance-2.0/reference.md');
const minimax = read('references/prompt-guides/video/models/minimax-h3/reference.md');
if (!seedance.includes('@Image1')) errors.push('Seedance retained @ImageN guidance is missing.');
if (!minimax.includes('Image 1') || !minimax.includes('not `@Image1`')) {
  errors.push('MiniMax retained spaced Image N guidance is missing.');
}
if ([...identities].some((identity) => /kling|veo/i.test(identity))) {
  errors.push('Inactive Kling/Veo research must remain outside the active video guide registry.');
}
if (identities.size !== 12) errors.push('The retained video registry must contain exactly its prior twelve routes.');
if (errors.length) {
  console.error(`Video prompt guide validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Validated ${identities.size} retained video prompt-guide routes.`);

function read(relativePath) {
  return readFileSync(join(skillRoot, relativePath), 'utf8');
}
function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
