// Cloud eval cases: one Markdown file each in cases/, whose front matter says
// which design cases it proves, which apps run it, the project it starts
// from, the person's request and the checks that judge it.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { checkProblems } from './eval-checks.mjs';
import { FrontMatterError, splitFrontMatter } from './front-matter.mjs';

/** The AI apps an eval can run in. */
export const EVAL_APPS = ['claude-code', 'codex'];

/** A case id from the parity design: a section letter and a number, such as M2. */
const CASE_ID = /^[A-M]\d{1,2}$/;

const FIELDS = {
  cases: (value) => isStringList(value) && value.every((id) => CASE_ID.test(id)) || 'must list design case ids such as [M2, E1]',
  apps: (value) => isStringList(value) && value.every((app) => EVAL_APPS.includes(app)) || `must list apps from ${EVAL_APPS.join(', ')}`,
  fixture: (value) => typeof value === 'string' && value !== '' || 'must name a launcher fixture',
  agentFiles: (value) => value === undefined || isStringList(value) || 'must list agent file set names',
  requires: (value) => value === undefined || isStringList(value) || 'must list programs the eval needs on this computer',
  providerJobMs: (value) => value === undefined || Number.isInteger(value) && value >= 0 || 'must be a whole number of milliseconds',
  request: (value) => typeof value === 'string' && value.trim() !== '' || 'must be the person\'s request',
  checks: (value) => Array.isArray(value) && value.length > 0 || 'must list at least one check',
};

export class EvalCaseError extends Error {
  constructor(file, problems) {
    super(`SKILLS_CLOUD_EVAL002 ${file}:\n${problems.map((problem) => `  - ${problem}`).join('\n')}`);
    this.problems = problems;
  }
}

/** Parses one case file; every problem in it is reported at once. */
export function parseEvalCase(text, file) {
  let data;
  let body;
  try {
    ({ data, body } = splitFrontMatter(text));
  } catch (error) {
    if (error instanceof FrontMatterError) throw new EvalCaseError(file, [error.message]);
    throw error;
  }
  const problems = [];
  for (const [field, validate] of Object.entries(FIELDS)) {
    const verdict = validate(data[field]);
    if (verdict !== true) problems.push(`${field} ${verdict}`);
  }
  for (const field of Object.keys(data).filter((key) => !Object.hasOwn(FIELDS, key))) {
    problems.push(`${field} is not a case field; use ${Object.keys(FIELDS).join(', ')}`);
  }
  if (Array.isArray(data.checks)) {
    data.checks.forEach((check, index) => problems.push(...checkProblems(check).map((problem) => `checks[${index}]: ${problem}`)));
  }
  if (problems.length > 0) {
    throw new EvalCaseError(file, problems);
  }
  return {
    name: path.basename(file, '.md'),
    file,
    title: /^#\s+(.+)$/m.exec(body)?.[1]?.trim() ?? path.basename(file, '.md'),
    cases: data.cases,
    apps: data.apps,
    fixture: data.fixture,
    agentFiles: data.agentFiles ?? [],
    requires: data.requires ?? [],
    providerJobMs: data.providerJobMs,
    request: data.request,
    checks: data.checks,
  };
}

/** Every case in a folder, in file-name order; the first bad file stops the load with all of its problems. */
export async function loadEvalCases(folder) {
  const files = (await readdir(folder)).filter((name) => name.endsWith('.md')).sort();
  const cases = [];
  for (const name of files) {
    const file = path.join(folder, name);
    cases.push(parseEvalCase(await readFile(file, 'utf8'), file));
  }
  return cases;
}

/**
 * The runs to make: each case in each of its apps that was asked for. A
 * filter matches a case's file name or one of its design case ids.
 */
export function planEvalRuns(cases, { apps = EVAL_APPS, filters = [] } = {}) {
  const unknownApps = apps.filter((app) => !EVAL_APPS.includes(app));
  if (unknownApps.length > 0) {
    throw new Error(`SKILLS_CLOUD_EVAL003 unknown app ${unknownApps.join(', ')}; use ${EVAL_APPS.join(', ')}`);
  }
  const chosen = filters.length === 0 ? cases : cases.filter((evalCase) => filters.some((filter) => evalCase.name === filter || evalCase.cases.includes(filter)));
  if (filters.length > 0 && chosen.length === 0) {
    throw new Error(`SKILLS_CLOUD_EVAL004 no case matches ${filters.join(', ')}`);
  }
  return chosen.flatMap((evalCase) => evalCase.apps.filter((app) => apps.includes(app)).map((app) => ({ evalCase, app })));
}

function isStringList(value) {
  return Array.isArray(value) && value.length > 0 && value.every((entry) => typeof entry === 'string' && entry !== '');
}
