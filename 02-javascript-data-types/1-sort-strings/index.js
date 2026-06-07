const locales = ['ru', 'en'];

const compareOptions = {
  sensitivity: 'variant',
  caseFirst: 'upper',
};

const directions = {
  asc: 1,
  desc: -1,
};

/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  if (!(param in directions)) {
    console.log('Incorrect sorting type parameter. Please use "asc" or "desc"');
    return [];
  }

  const arraySorted = [...arr];
  const direction = directions[param];

  arraySorted.sort((a, b) => directions[param] * a.localeCompare(b, locales, compareOptions));

  return arraySorted;
}
