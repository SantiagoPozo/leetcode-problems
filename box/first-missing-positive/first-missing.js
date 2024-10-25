/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  nums = new Set(nums);
  if (!nums.has(1)) return 1;
  let result = Infinity;
  for (let num of nums) {
    if (num + 1 > 0 && num + 1 < result && !nums.has(num + 1)) result = num + 1;
  }
  if (result === Infinity) return 1;
  return result;
};

console.log(firstMissingPositive([0, 3, 2]), "|| Expected:", 1);
