/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function (s) {
  if (s === "") return 0;
  let i = 0;
  let j = s.length - 1;
  let rightBalance = 0;
  let leftBalance = 0;
  let result = 0;

  while (i < j) {
    if (s[i] === "[") rightBalance++;
    else rightBalance--;

    if (rightBalance < 0) {
      while (j > i) {
        if (s[j] === "[") leftBalance--;
        else leftBalance++;

        if (leftBalance < 0) {
          result++;
          rightBalance = rightBalance + 2;
          leftBalance = leftBalance + 2;
          break;
        }
        j--;
      }
    }
    i++;
  }
  return result;
};

console.log(minSwaps("]]][[[")); // 2
console.log(minSwaps("[]")); // 0
console.log(minSwaps("][[]")); // 1
console.log(minSwaps("][[]")); // 1
