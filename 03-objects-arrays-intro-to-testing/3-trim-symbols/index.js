/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }

  if (size <= 0) {
    return '';
  }

  let resultString = '';
  let prevSymbol = '';
  let counter = 0;

  for (const symbol of string) {
    if (symbol === prevSymbol) {
      counter += 1;
    }
    else {
      prevSymbol = symbol;
      counter = 1;
    }
    if (counter <= size) {
      resultString += symbol;
    }
  }
  return resultString;
}
