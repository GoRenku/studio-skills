// Score observed route-choice outcomes: whether the agent asked, how, and when.
export function assessRouteChoice({ host, panelStatus, chooseRouteBeforeGenerating, userNamedRoute = false,
  defaultMissing = false, settingsChangeRequested = false, events }) {
  const issues = [];
  const at = (type) => events.findIndex((event) => event.type === type);
  const count = (type) => events.filter((event) => event.type === type).length;
  const shouldAsk = !userNamedRoute && (defaultMissing || chooseRouteBeforeGenerating);
  const chooser = host === 'codex-desktop' && panelStatus === 'advertised';
  const asked = count('route-chooser-opened') + count('route-question');
  const authoring = at('authoring-started');

  if (!shouldAsk && asked) issues.push('unneeded-route-question');
  if (shouldAsk) {
    const expected = chooser ? 'route-chooser-opened' : 'route-question';
    const question = at(expected);
    if (question < 0) issues.push('missing-route-choice');
    else if (authoring >= 0 && authoring < question) issues.push('authored-before-route-choice');
    if (count(chooser ? 'route-question' : 'route-chooser-opened')) issues.push('wrong-route-choice-surface');
    if (asked > 1) issues.push('repeated-route-question');
    if (chooser && question >= 0) {
      const consumed = events.filter((event) => event.type === 'route-consumed');
      if (at('turn-yielded') < question || (consumed.length && at('turn-yielded') > at('route-consumed'))) {
        issues.push('chooser-turn-not-ended');
      }
      if (consumed.length !== 1) issues.push('route-choice-not-consumed-once');
      if (consumed.some((event) => event.status !== 'chosen') && authoring >= 0) issues.push('authored-without-chosen-route');
    }
    if (defaultMissing && !count('missing-default-explained')) issues.push('missing-default-not-explained');
  }
  if (count('lane-settings-changed') && !settingsChangeRequested) issues.push('unrequested-settings-change');
  return issues;
}
