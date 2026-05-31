const locales = ['ru', 'en'];

const compareOptions = {
  sensitivity: 'variant',
  caseFirst: 'upper',
};

/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  if (param !== 'asc' && param !== 'desc') {
    console.log('Incorrect sorting type parameter. Please use "asc" or "desc"');
    return [];
  }

  const arraySorted = [...arr];

  if (param === 'asc') {
    arraySorted.sort((a, b) => a.localeCompare(b, locales, compareOptions));
  }
  else if (param === 'desc') {
    arraySorted.sort((a, b) => b.localeCompare(a, locales, compareOptions));
  }

  return arraySorted;
}
