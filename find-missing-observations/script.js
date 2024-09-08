/**
 * @param {number[]} rolls
 * @param {number} mean
 * @param {number} n
 * @return {number[]}
 */
var missingRolls = function (rolls, mean, n) {
  const B =
    mean * (rolls.length + n) - rolls.reduce((acc, val) => acc + val, 0);
  if (B > 6 * n || B < n) return [];
  const base = Math.floor(B / n);
  const remainder = B % n;
  const result = [];
  const min = Math.min(remainder, n - remainder);
  for (let i = 0; i < n; i++) {
    result.push(base + (i < min ? 1 : 0));
  }

  return result;
};
