// Evaluate observed review/CLI outcomes across hosting interfaces, not tool-name mentions.
export function assessReviewRouting({ host, preference, panelStatus, displayPreview, engines = true, events }) {
  const issues = [];
  const count = (type) => events.filter((event) => event.type === type).length;
  const at = (type) => events.findIndex((event) => event.type === type);
  const panel = host === 'codex-desktop' && preference === 'panel' && panelStatus === 'advertised';
  const visualize = host === 'codex-desktop' && preference === 'visualize' && panelStatus !== 'unavailable';
  const incomplete = host === 'codex-desktop' && preference === 'panel' && panelStatus === 'missing';
  const preview = !panel && !incomplete && (!visualize || displayPreview);

  if (at('context-read') < 0) issues.push('missing-context-preference');
  if (panel && at('capabilities-read') < 0) issues.push('missing-capability-check');
  if (panel && (count('preview-delivered') || count('request-prepared'))) issues.push('duplicate-studio-preview');
  if (panel && count('visualize-rendered')) issues.push('wrong-review-surface');
  if (!panel && count('panel-opened')) issues.push('unsupported-panel');
  if (!visualize && count('visualize-rendered')) issues.push('unsupported-visualize');
  if (preview && !count('preview-delivered') && !count('preview-failed')) issues.push('missing-mandatory-preview');
  if (incomplete && !count('integration-failed')) issues.push('missing-integration-diagnostic');

  const execution = at('execute');
  if (execution >= 0) {
    if (count('integration-failed') || count('preview-failed')) issues.push('executed-after-review-failure');
    if (panel) {
      const consumed = events.filter((event) => event.type === 'action-consumed');
      const submitted = consumed.filter((event) => event.action === 'submit' && !event.alreadyConsumed);
      if (submitted.length !== 1 || submitted[0].reviewId !== events[execution].reviewId) issues.push('unaccepted-panel-execution');
      if (count('conversational-confirmation')) issues.push('duplicate-confirmation');
      if (!(at('panel-opened') < at('turn-yielded') && at('turn-yielded') < at('action-consumed')
        && at('action-consumed') < at('accepted-request-written') && at('accepted-request-written') < execution)) {
        issues.push('invalid-panel-handoff-order');
      }
      if (engines) {
        const final = events.filter((event) => event.type === 'validate' && event.accepted).at(-1);
        if (!final || final.requestSha256 !== events[execution].expectedRequestSha256
          || events.indexOf(final) < at('accepted-request-written')) issues.push('accepted-edits-not-validated');
      }
    }
    if (preview && at('preview-delivered') > execution) issues.push('executed-before-preview');
    if (!engines && (count('validate') || count('request-prepared'))) issues.push('builtin-routed-to-engines');
    if (count('execute') > 1) issues.push('repeated-execution');
  }
  return issues;
}
