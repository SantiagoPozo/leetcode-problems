/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minSubarray = function (nums, p) {
  const totalSum = nums.reduce((acc, num) => acc + num, 0); // Suma total
  const mod = totalSum % p;
  if (mod === 0) return 0;

  let prefixSum = 0;
  let minLength = nums.length;
  let map = new Map();
  map.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    prefixSum = (prefixSum + nums[i]) % p;

    const targetMod = (prefixSum - mod + p) % p;

    if (map.has(targetMod)) {
      minLength = Math.min(minLength, i - map.get(targetMod));
    }

    map.set(prefixSum, i);
  }

  return minLength === nums.length ? -1 : minLength;
};

// prettier-ignore
let nums = [],  p = 1, expc = 0;

// prettier-ignore
nums = [1,2,3], p = 7, expc = -1;

console.log(minSubarray(nums, p), "expected: ", expc);

(nums = [7, 9, 10]), (p = 10), (expc = 2);
console.log(minSubarray(nums, p), "expected: ", expc);

nums = [8, 8, 10];
console.log(minSubarray(nums, p), "expected: ", expc);

nums = [1, 2, 3];
p = 3;
expc = 0;
console.log(minSubarray(nums, p), "expected: ", expc);

nums = [9, 1, 5, 2, 4, 3];
p = 6;
expc = 0;
console.log(minSubarray(nums, p), "expected: ", expc);

nums = [3, 1, 4, 2];
expc = 1;
console.log(minSubarray(nums, p), "expected: ", expc);
