#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const TEMPLATE_CONTRACT_VERSION = 1;
const templateContractPath = fileURLToPath(new URL('../references/generation-configuration-template.md', import.meta.url));
const runFile = promisify(execFile);

export async function buildGenerationConfigurationVisualizationDescriptor(input) {
  const [visualizeSkill, templateContract] = await Promise.all([
    readRegularFile(input.visualizeSkillPath, '--visualize-skill'),
    readRegularFile(input.templateContractPath ?? templateContractPath, 'template contract'),
  ]);
  return {
    provider: input.provider,
    model: input.model,
    operation: input.operation,
    inputMode: input.inputMode,
    visualizeSkillVersion: input.visualizeSkillVersion,
    visualizeSkillSha256: sha256(visualizeSkill),
    templateContractVersion: TEMPLATE_CONTRACT_VERSION,
    templateContractSha256: sha256(templateContract),
  };
}

export async function prepareGenerationConfigurationVisualization(input, runCli = runRenku) {
  const descriptor = await buildGenerationConfigurationVisualizationDescriptor(input);
  const descriptorPath = path.resolve(input.descriptorPath);
  await writeFileAtomically(descriptorPath, `${JSON.stringify(descriptor, null, 2)}\n`);
  const skillsDirectory = fileURLToPath(new URL('../../', import.meta.url));
  const providers = (await fs.readdir(skillsDirectory)).filter((name) => name.endsWith('-media-provider')).sort();
  const routeIndexes = providers.map((name) => path.join(skillsDirectory, name, 'references/supported-routes.json'));
  const result = await runCli([
    'generation', 'configuration-visualization', 'prepare',
    '--file', descriptorPath, '--payload', path.resolve(input.payloadPath),
    '--output', path.resolve(input.outputPath), '--json',
    ...routeIndexes.flatMap((index) => ['--route-index', index]),
  ]);
  await writeFileAtomically(descriptorPath, `${JSON.stringify(result.descriptor, null, 2)}\n`);
  return result;
}

async function runRenku(args) {
  const { stdout } = await runFile('renku', args, { maxBuffer: 4_000_000 });
  return JSON.parse(stdout);
}

function parseArguments(argv) {
  const values = new Map();
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag?.startsWith('--') || !value) {
      throw new Error('Every argument must be a flag followed by a value.');
    }
    if (values.has(flag)) {
      throw new Error(`Flag may be provided only once: ${flag}`);
    } else {
      values.set(flag, value);
    }
  }
  const required = (flag) => {
    const value = values.get(flag);
    if (!value) {
      throw new Error(`Missing required flag: ${flag}`);
    }
    return value;
  };
  return {
    provider: required('--provider'),
    model: required('--model'),
    operation: required('--operation'),
    inputMode: required('--input-mode'),
    visualizeSkillPath: required('--visualize-skill'),
    visualizeSkillVersion: required('--visualize-skill-version'),
    descriptorPath: required('--descriptor'),
    payloadPath: required('--payload'),
    outputPath: required('--output'),
  };
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

async function readRegularFile(filePath, flag) {
  const absolutePath = path.resolve(filePath);
  const stats = await fs.lstat(absolutePath);
  if (!stats.isFile() || stats.isSymbolicLink()) {
    throw new Error(`${flag} must point to a regular file: ${filePath}`);
  }
  return fs.readFile(absolutePath, 'utf8');
}

async function writeFileAtomically(filePath, contents) {
  const absolutePath = path.resolve(filePath);
  const directory = path.dirname(absolutePath);
  await fs.mkdir(directory, { recursive: true });
  try {
    const stats = await fs.lstat(absolutePath);
    if (!stats.isFile() || stats.isSymbolicLink()) {
      throw new Error(`Output must be a regular file: ${absolutePath}`);
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
  const temporaryPath = path.join(
    directory,
    `.${path.basename(absolutePath)}.${process.pid}.${crypto.randomUUID()}.tmp`
  );
  let temporaryCreated = false;
  try {
    const handle = await fs.open(temporaryPath, 'wx', 0o600);
    temporaryCreated = true;
    try {
      await handle.writeFile(contents, 'utf8');
      await handle.sync();
    } finally {
      await handle.close();
    }
    await fs.rename(temporaryPath, absolutePath);
    temporaryCreated = false;
  } finally {
    if (temporaryCreated) {
      await fs.unlink(temporaryPath).catch(() => undefined);
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await prepareGenerationConfigurationVisualization(
      parseArguments(process.argv.slice(2))
    );
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
