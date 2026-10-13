import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';

const execute = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

test('release validation accepts route-only discovery and absent optional advice', async () => {
  const fixture = await fs.mkdtemp(path.join(os.tmpdir(), 'renku-optional-advice-'));
  try {
    await fs.cp(path.join(root, 'skills'), path.join(fixture, 'skills'), { recursive: true });
    const indexPath = path.join(fixture, 'skills/fal-ai-media-provider/references/supported-routes.json');
    const index = JSON.parse(await fs.readFile(indexPath, 'utf8'));
    index.routes.push({ apiId: 'fixture/route-only', name: 'Unguided route' });
    await fs.writeFile(indexPath, JSON.stringify(index));
    const guideRoot = path.join(fixture, 'skills/media-producer/references/model-guides');
    await fs.rm(guideRoot, { recursive: true });
    // The Default Model List names guides, so a guide-free distribution lists no models.
    await fs.writeFile(path.join(fixture, 'skills/media-producer/references/default-models.json'),
      JSON.stringify({ formatVersion: 1, lanes: { image: [], imageEdit: [], video: [], audio: [] } }));
    const result = await execute(process.execPath,
      [path.join(root, 'scripts/validate-media-generation-skills.mjs')], { cwd: fixture });
    assert.match(result.stdout, /Validated/);
  } finally {
    await fs.rm(fixture, { recursive: true, force: true });
  }
});
