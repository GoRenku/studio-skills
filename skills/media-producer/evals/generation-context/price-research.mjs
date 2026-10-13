// Score whether price research ran only for a missing or expired price, and how.
export function assessPriceResearch({ askBeforeGenerating, billing, apiPriced, estimateState,
  researchedThisPeriod = false, events }) {
  const issues = [];
  const at = (type) => events.findIndex((event) => event.type === type);
  const count = (type) => events.filter((event) => event.type === type).length;
  const needed = askBeforeGenerating && billing === 'providerCharge' && !apiPriced
    && ['missingPrice', 'expired'].includes(estimateState) && !researchedThisPeriod;
  const researched = count('pricing-page-read') > 0 || count('price-recorded') > 0;

  if (!needed && researched) issues.push('unneeded-price-research');
  if (needed) {
    if (!researched) issues.push('missing-price-research');
    const fetched = at('web-fetch');
    const browsed = at('browser-opened');
    if (browsed >= 0 && (fetched < 0 || fetched > browsed)) issues.push('browser-before-web-fetch');
    if (count('price-recorded') > 1) issues.push('repeated-price-research');
    const recorded = at('price-recorded');
    if (recorded >= 0 && !(at('review-opened') > recorded)) issues.push('review-shown-before-recorded-price');
  }
  if (count('price-written-to-skill')) issues.push('price-in-skill-files');
  return issues;
}
