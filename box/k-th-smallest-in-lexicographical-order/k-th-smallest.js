/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function (n, k) {
  const countSteps = (curr, n) => {
    let steps = 0;
    let first = curr;
    let last = curr;

    while (first <= n) {
      steps += Math.min(n + 1, last + 1) - first;
      first *= 10;
      last = last * 10 + 9;
    }

    return steps;
  };

  let current = 1;
  k--; // k-1 because we start from the first number in lexicographical order (1)

  while (k > 0) {
    let steps = countSteps(current, n);

    if (steps <= k) {
      k -= steps;
      current++;
    } else {
      current *= 10;
      k--;
    }
  }

  return current;
};

// test
// Create a function to test the result
const test = (n, k, expected) => {
  const result = findKthNumber(n, k);
  console.log(result, expected, result === expected);
};

console.log(findKthNumber(17523, 6));
console.log(findKthNumber(2731, 2710));
