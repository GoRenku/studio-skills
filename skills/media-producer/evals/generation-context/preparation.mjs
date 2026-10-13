import { isDeepStrictEqual } from 'node:util';

// Score observed command outcomes, not mentions of commands.
export function assessPreparation({ events, engines = true, previewRequired = true }) {
  const issues = [];
  const at = (type) => events.findIndex((event) => event.type === type);
  const prepare = at('request-prepared');
  if (engines && previewRequired) {
    if (prepare < 0) issues.push('split-request-preparation');
    if (prepare >= 0 && events.some((event) => ['validate', 'preview'].includes(event.type))) {
      issues.push('redundant-preparation-call');
    }
    const authored = at('review-authored');
    if (authored >= 0 && prepare > authored && events[authored].toolOperation !== events[prepare].toolOperation) {
      issues.push('request-writing-roundtrip');
    }
  }
  return issues;
}

export function assessModelDiscovery({ redundantListCalls = 0, preparationRoutes, selectorRoutes, relevantGuidanceApplied = true }) {
  const issues = [];
  if (redundantListCalls > 0) issues.push('repeated-model-discovery');
  if (!isDeepStrictEqual(preparationRoutes, selectorRoutes)) issues.push('incomplete-selector-catalog');
  if (!relevantGuidanceApplied) issues.push('missing-selected-model-guidance');
  return issues;
}

export function assessExpansionChoice({ schemaDefault, enabledValues, selected, requested }) {
  if (requested !== undefined) return isDeepStrictEqual(selected, requested) ? [] : ['explicit-expansion-choice-lost'];
  if (enabledValues.includes(schemaDefault) && !isDeepStrictEqual(selected, schemaDefault)) {
    return ['enabled-expansion-default-overridden'];
  }
  return enabledValues.includes(selected) ? [] : ['expansion-not-enabled'];
}
