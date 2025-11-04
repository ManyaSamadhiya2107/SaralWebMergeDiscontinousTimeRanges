/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

export const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  
  const sorted = ranges.sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];

  
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const current = sorted[i];

    const lastEnd = last[1];
    const currentStart = current[0];
    const currentEnd = current[1];

    
    if (currentStart <= lastEnd || currentStart - lastEnd <= threshold) {
      last[1] = Math.max(lastEnd, currentEnd);
    } else {
      merged.push([...current]);
    }
  }

  return merged;
};
