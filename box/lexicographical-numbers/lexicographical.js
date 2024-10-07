/**
 * @param {number} n
 * @return {number[]}
 */
//Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.
//You must write an algorithm that runs in O(n) time and uses O(1) extra space.
//Example 1:

// Input: n = 13
// Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
// Example 2:
// Input: n = 2
// Output: [1,2]
// Topics: Depth-First Search, Trie

/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function (n) {
  const result = [];

  const dfs = (current) => {
    if (current > n) return;
    result.push(current);
    for (let i = 0; i <= 9; i++) {
      const next = current * 10 + i;
      if (next > n) break;
      dfs(next);
    }
  };

  for (let i = 1; i <= 9; i++) {
    dfs(i);
  }

  return result;
};

// Test cases
const test = (n, expected) => {
  const result = lexicalOrder(n);
  console.log(
    result,
    expected,
    JSON.stringify(result) === JSON.stringify(expected)
  );
};

/* test(13, [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]);
test(1, [1]);
test(2, [1, 2]);
test(3, [1, 2, 3]);
test(
  20,
  [1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 2, 20, 3, 4, 5, 6, 7, 8, 9]
); */

let testing_findKthNumber = lexicalOrder(5318);
console.log(testing_findKthNumber);
