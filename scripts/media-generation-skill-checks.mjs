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
 * guide; each provider entry names a known provider and a non-empty route;
 * a provider other than Codex names a route `apiId` from its
 * supported-routes.json; Codex names its built-in model and matches its guide;
 * each image and image edit provider entry has detail levels, and no video or
 * audio entry has them; and each provider has at most one recommendation per
 * generation type, within the entry's providers.
 */
export function validateDefaultModelList(list, { guideKeys, routesByProvider }) {
  const issues = [];
  const generationTypes = ['image', 'imageEdit', 'video', 'audio'];
  if (list?.formatVersion !== 2) issues.push('formatVersion must be 2.');
  if (!list?.generationTypes || Object.keys(list.generationTypes).sort().join(',') !== [...generationTypes].sort().join(',')) {
    issues.push(`generationTypes must be exactly ${generationTypes.join(', ')}.`);
  }
  for (const generationType of generationTypes) {
    const recommended = new Set();
    for (const entry of list?.generationTypes?.[generationType] ?? []) {
      const where = `${generationType} ${entry.model}`;
      if (!guideKeys.has(entry.model)) issues.push(`${where} has no model guide.`);
      for (const providerEntry of entry.providers) {
        const issue = defaultModelProviderIssue(entry, providerEntry, routesByProvider);
        if (issue) issues.push(`${where}${issue}`);
        const detail = detailIssue(generationType, providerEntry);
        if (detail) issues.push(`${where}: ${detail}`);
      }
      const providers = entry.providers.map((providerEntry) => providerEntry?.provider);
      for (const provider of entry.recommendedFor) {
        if (!providers.includes(provider)) issues.push(`${where} recommends ${provider}, which is not in providers.`);
        if (recommended.has(provider)) issues.push(`${generationType} recommends more than one model for ${provider}.`);
        recommended.add(provider);
      }
    }
  }
  return issues;
}

/** Returns why one `{ provider, route }` entry is invalid, prefixed for its entry, or null. */
function defaultModelProviderIssue(entry, providerEntry, routesByProvider) {
  const { provider, route } = providerEntry ?? {};
  if (typeof provider !== 'string' || provider.trim() === '') return ' has a provider entry without a provider.';
  if (typeof route !== 'string' || route.trim() === '') return `: ${provider} has no route.`;
  if (provider === CODEX_PROVIDER) {
    const issue = codexIdentityIssue({ model: route, guideKey: entry.model });
    return issue ? `: ${issue}` : null;
  }
  const routes = routesByProvider.get(provider);
  if (!routes) return ` names provider ${provider}, which has no provider Skill.`;
  if (!routes.some((candidate) => candidate.apiId === route)) {
    return `: ${provider} route ${route} is not in its supported-routes.json.`;
  }
  return null;
}

const IMAGE_LANES = new Set(['image', 'imageEdit']);
const DETAIL_LEVELS = ['lowest', 'mid', 'highest'];
const isJsonObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Returns why one provider entry's `detail` is invalid for its generation type, or null.
 * Image generation types map each detail level to that route's native request fields;
 * video and audio generation types have no detail levels.
 */
function detailIssue(generationType, providerEntry) {
  if (typeof providerEntry?.provider !== 'string') return null;
  const { provider, detail } = providerEntry;
  if (!IMAGE_LANES.has(generationType)) return detail === undefined ? null : `${provider} has detail, which only image generation types take.`;
  if (!isJsonObject(detail)) return `${provider} has no detail object.`;
  if (Object.keys(detail).sort().join(',') !== [...DETAIL_LEVELS].sort().join(',')) {
    return `${provider} detail must have exactly ${DETAIL_LEVELS.join(', ')}.`;
  }
  const level = DETAIL_LEVELS.find((name) => !isJsonObject(detail[name]));
  return level ? `${provider} detail ${level} must be an object of native request fields.` : null;
}
