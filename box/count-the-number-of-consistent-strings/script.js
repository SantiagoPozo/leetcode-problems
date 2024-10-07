/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
const countConsistentStrings = function (allowed, words) {
  let count = words.length;

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      if (!allowed.includes(words[i][j])) {
        count--;
        break;
      }
    }
  }
  return count;
};
// Test cases
let allowed = "ab";
let words = ["ad", "bd", "aaab", "baa", "badab"];
console.log(countConsistentStrings(allowed, words)); // 2

allowed = "abc";
words = ["a", "b", "c", "ab", "ac", "bc", "abc"];
console.log(countConsistentStrings(allowed, words)); // 7
