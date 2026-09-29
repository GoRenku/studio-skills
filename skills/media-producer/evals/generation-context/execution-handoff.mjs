import { isDeepStrictEqual } from 'node:util';

// Can score preparation-only sessions, including rejected execution attempts.
// Annotate configuration-rendered only after checking the emitted content
// reference and its HTML controls; a skill read is not this event.
export function assessConfigurationHandoff(events) {
  const issues = [];
  const rendered = events.findIndex((event) => event.type === 'configuration-rendered');
  const accepted = events.findIndex((event) => event.type === 'settings-accepted');
  const authored = events.findIndex((event) => event.type === 'review-authored');
  if (rendered < 0) issues.push('configuration-not-rendered');
  if (authored >= 0 && (rendered < 0 || accepted <= rendered || accepted >= authored)) {
    issues.push('review-before-settings-acceptance');
  }
  if (rendered >= 0 && authored >= 0 && events[rendered].turn === events[authored].turn) {
    issues.push('configuration-turn-not-ended');
  }
  return issues;
}

// Evaluation only: record observed actions. Presentation requires an actual
// media embed or player, not a queued editor-open request.
export function assessExecutionHandoff({ events, prepared, submitted, preparedSha256, returnedProvenance, attachedProvenance }) {
  const issues = [];
  const at = (type) => events.findIndex((event) => event.type === type);
  const confirmation = at('confirmation');
  const execute = at('execute');
  if (confirmation < 0 || execute <= confirmation) issues.push('execution-without-confirmation');
  if (execute > confirmation && isDeepStrictEqual(prepared, submitted)) {
    const intervening = events.slice(confirmation + 1, execute);
    if (intervening.some((event) => event.type === 'validate')) issues.push('redundant-validation');
    if (intervening.some((event) => event.type === 'document-check')) issues.push('extra-confirmation-roundtrip');
    if (!preparedSha256 || events[execute].expectedRequestSha256 !== preparedSha256) {
      issues.push('missing-request-precondition');
    }
  }
  if (!isDeepStrictEqual(prepared, submitted)
    && !events.slice(confirmation + 1, execute).some((event) => event.type === 'prepare-changes')) {
    issues.push('unprepared-changes');
  }
  const ready = at('artifact-ready');
  const presented = at('media-presented');
  const review = at('analysis');
  const attached = at('attachment');
  if (ready < 0 || presented <= ready || (review >= 0 && presented > review)
    || (attached >= 0 && presented > attached)) issues.push('delayed-presentation');
  if (!isDeepStrictEqual(returnedProvenance, attachedProvenance)) issues.push('provenance-changed');
  if (ready >= 0 && events.slice(ready + 1, attached < 0 ? undefined : attached)
    .some((event) => event.type === 'recover')) issues.push('unnecessary-recovery');
  if (events.some((event) => event.type === 'provenance-extraction')) issues.push('avoidable-provenance-processing');
  if (attached >= 0 && events.slice(attached + 1).some((event) => event.type === 'attachment-rediscovery')) {
    issues.push('attachment-rediscovery');
  }
  return issues;
}
