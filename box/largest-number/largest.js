/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  let result = nums
    .map((n) => n.toString())
    .sort((a, b) => (a + b < b + a ? 1 : -1));

  return result.join("").replace(/^0+/, "") || "0";
};

let nums = [3, 30, 34, 5, 9, 59];
console.log(largestNumber(nums));
