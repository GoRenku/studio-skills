#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(skillRoot, 'references/prompt-guides/image/guide-registry.json');
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const errors = [];
const identities = new Set();

for (const [index, route] of (registry.routes ?? []).entries()) {
  if (!nonEmpty(route.provider) || !nonEmpty(route.model) || !nonEmpty(route.guide)) {
    errors.push(`Image guide route ${index + 1} must contain provider, model, and guide.`);
    continue;
  }
  const identity = `${route.provider}/${route.model}`;
  if (identities.has(identity)) errors.push(`Duplicate image guide route: ${identity}.`);
  identities.add(identity);
  const guidePath = resolve(skillRoot, route.guide);
  if (!guidePath.startsWith(skillRoot) || !existsSync(guidePath)) {
    errors.push(`Image guide is missing for ${identity}: ${route.guide}.`);
    continue;
  }
  const guide = readFileSync(guidePath, 'utf8');
  if (!/^# .+Prompt Guide/m.test(guide) || !/^## Provenance$/m.test(guide)) {
    errors.push(`Image guide lacks retained applicability/provenance structure: ${route.guide}.`);
  }
  if (/generation model list|GenerationSpec|checked-in schema/i.test(guide)) {
    errors.push(`Image guide cites an obsolete generation contract: ${route.guide}.`);
  }
}

if (identities.size !== 8) errors.push('The retained image registry must contain exactly its prior eight routes.');
if (errors.length) {
  console.error(`Image prompt guide validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Validated ${identities.size} retained image prompt-guide routes.`);

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
