// Evaluation-only: supply ranges actually displayed in the transcript, not
// requested ranges whose output was clipped. This does not measure attention.
export function unreadBriefingRanges(totalLines, displayedRanges) {
  if (!Number.isInteger(totalLines) || totalLines < 1) {
    throw new TypeError('totalLines must be a positive integer');
  }
  const ranges = displayedRanges.map(([start, end]) => {
    if (!Number.isInteger(start) || !Number.isInteger(end)
      || start < 1 || end < start || end > totalLines) {
      throw new RangeError('Displayed ranges must lie inside the briefing');
    }
    return [start, end];
  }).sort((a, b) => a[0] - b[0]);
  const missing = [];
  let next = 1;
  for (const [start, end] of ranges) {
    if (start > next) missing.push([next, start - 1]);
    next = Math.max(next, end + 1);
  }
  if (next <= totalLines) missing.push([next, totalLines]);
  return missing;
}
