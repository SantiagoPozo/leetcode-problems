var longestSubarray = function (nums) {
  let max = 1;
  let count = 0;
  let maxCount = 0;

  for (let pointer = 0; pointer < nums.length; pointer++) {
    if (nums[pointer] > max) {
      max = nums[pointer];
      count = 1;
      maxCount = 1;
    } else if (nums[pointer] === max) {
      count++;
      if (count > maxCount) maxCount = count;
    } else count = 0;
  }
  return maxCount;
};

console.log(longestSubarray([1, 4, 4, 4]));
console.log(longestSubarray([3, 2, 1, 4, 4, 4]));
console.log(longestSubarray([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(longestSubarray([1, 1, 1, 1, 1, 1, 1, 1]));
console.log(longestSubarray([378034, 378034, 378034])); // 3
