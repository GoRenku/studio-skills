#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Advice is optional. Check path envelopes only; do not require files, headings,
// model coverage, operation coverage, or interpret creative Markdown.
const guideRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../references/model-guides');
const catalogPath = resolve(guideRoot, 'model-catalog.json');
if (existsSync(catalogPath)) {
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
  for (const model of (catalog.models ?? []).filter((entry) => entry.mediaKind === 'image')) {
    for (const guide of [model.guide, ...Object.values(model.operations ?? {})]) {
      if (guide === null || guide === undefined) continue;
      if (typeof guide !== 'string' || !resolve(guideRoot, guide).startsWith(`${guideRoot}${sep}`)) {
        throw new Error('Optional guidance paths must stay within the bundled guidance directory.');
      }
    }
  }
}
console.log('Validated optional image guidance path envelopes.');
