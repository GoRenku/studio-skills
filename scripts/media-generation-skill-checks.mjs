// Focused, pure checks used by validate-media-generation-skills.mjs.

/** Codex runs its built-in image tool; its model id is the key of the guide that documents it. */
const CODEX_PROVIDER = 'codex';
const CODEX_BUILT_IN_GUIDE = 'chatgpt-images-2.5';

/**
 * Returns why a Codex built-in identity is invalid, or null. The Codex route has
 * no supported-routes.json; it is checked against its model guide instead.
 */
export function codexIdentityIssue({ model, guideKey }) {
  if (model !== CODEX_BUILT_IN_GUIDE) return `Codex has no built-in model ${model}.`;
  if (guideKey !== CODEX_BUILT_IN_GUIDE) return `Codex ${model} is declared outside its ${CODEX_BUILT_IN_GUIDE} guide.`;
  return null;
}

/**
 * Collects every issue in the Default Model List: each entry has a model
 * guide; each provider other than Codex has a route of that family name in
 * its supported-routes.json; Codex matches its guide; and each provider has at
 * most one recommendation per lane.
 */
export function validateDefaultModelList(list, { guideKeys, routesByProvider }) {
  const issues = [];
  const lanes = ['image', 'imageEdit', 'video', 'audio'];
  if (list?.formatVersion !== 1) issues.push('formatVersion must be 1.');
  if (!list?.lanes || Object.keys(list.lanes).sort().join(',') !== [...lanes].sort().join(',')) {
    issues.push(`lanes must be exactly ${lanes.join(', ')}.`);
  }
  for (const lane of lanes) {
    const recommended = new Set();
    for (const entry of list?.lanes?.[lane] ?? []) {
      const where = `${lane} ${entry.model}`;
      if (!guideKeys.has(entry.model)) issues.push(`${where} has no model guide.`);
      for (const provider of entry.providers) {
        if (provider === CODEX_PROVIDER) {
          const issue = codexIdentityIssue({ model: entry.model, guideKey: entry.model });
          if (issue) issues.push(`${where}: ${issue}`);
          continue;
        }
        const routes = routesByProvider.get(provider);
        if (!routes) {
          issues.push(`${where} names provider ${provider}, which has no provider Skill.`);
        } else if (!routes.some((route) => route.name === entry.name || route.name.startsWith(`${entry.name} `))) {
          issues.push(`${where}: ${provider} has no ${entry.name} route in its supported-routes.json.`);
        }
      }
      for (const provider of entry.recommendedFor) {
        if (!entry.providers.includes(provider)) issues.push(`${where} recommends ${provider}, which is not in providers.`);
        if (recommended.has(provider)) issues.push(`${lane} recommends more than one model for ${provider}.`);
        recommended.add(provider);
      }
    }
  }
  return issues;
}
