/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const keys = path.split('.');

  return function findValue(product) {
    let currentValue = product;
    for (const key of keys) {
      if (currentValue == null || !Object.hasOwn(currentValue, key)) {
        return undefined;
      }
      currentValue = currentValue[key];
    }
    return currentValue;
  };
}
