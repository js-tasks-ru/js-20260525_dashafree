/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns the new object or undefined if nothing didn't pass
 */
export function invertObj(obj) {
  if (!obj) {
    return undefined;
  }
  const revertedArray = Object.entries(obj).map(([key, value]) => [value, key]);
  return Object.fromEntries(revertedArray);
}
