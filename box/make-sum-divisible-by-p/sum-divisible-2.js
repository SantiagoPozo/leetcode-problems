/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */

// This solution works if we remove the condition
// that elements must be contiguous.

var minSubarray = function (nums, p) {
  let map = Array(p).fill(0);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    const t = nums[i] % p;
    sum += t;
    map[t]++;
  }
  sum = sum % p;
  if (sum === 0) return 0;
  console.log("sum:", sum);
  console.log("Initial map:");
  for (let i = 0; i < map.length; i++) {
    console.log("i:", i, " -> ", map[i]);
  }

  const theoricalMaximum = Math.min(
    p - 1,
    nums.length - map[0] - Number(map[0] === 0)
  );
  const results = new Set();
  console.log("Theorical maximun:", theoricalMaximum);

  const findSum = (mapa, suma, deepness) => {
    if (mapa[suma] > 0) {
      console.log("deepness:", deepness);
      results.add(deepness);
      if (deepness === 1) return;
    } else {
      for (let j = 1; j < mapa.length; j++) {
        if (mapa[j] > 0) {
          let newMap = [...mapa.slice(0, j), mapa[j] - 1, ...mapa.slice(j + 1)];
          const newSum = (sum - j + p) % p;
          const depth = deepness + 1;
          if (depth <= 4) findSum(newMap, newSum, depth);
        }
      }
    }
  };
  findSum(map, sum, 1);

  console.log("Final map:", map); // Map original ya no debería modificarse
  console.log("results:", results);
  let result = -1;
  if (results.size !== 0) result = Math.min(...results);
  return result;
};

/* console.log("tums:", tums);
 */ // prettier-ignore
let nums = [], p = 0, expected = 0;

//works
/* (nums = [3, 6, 1, 5, 4, 9, 7]), (p = 3), (expected = 1);
console.log(minSubarray(nums, p), " || Expected:", expected);
(nums = [1, 2, 3]), (p = 6), (expected = 0);
console.log(minSubarray(nums, p), " || Expected:", expected);
(nums = [3, 1, 4, 2]), (p = 6), (expected = 1);
console.log(minSubarray(nums, p), " || Expected:", expected);
(nums = [6, 3, 5, 2]), (p = 9), (expected = 2);
console.log(minSubarray(nums, p), " || Expected:", expected);
(nums = [1, 2, 3]), (p = 3), (expected = 0);
console.log(minSubarray(nums, p), " || Expected:", expected);
(nums = [1, 2, 3]), (p = 7), (expected = -1);
console.log(minSubarray(nums, p), " || Expected:", expected);
(nums = [1, 2, 3, 7]), (p = 7), (expected = 3);
console.log(minSubarray(nums, p), " || Expected:", expected); */

// testing
(nums = [26, 19, 11, 14, 18, 4, 7, 1, 30, 23, 19, 8, 10, 6, 26, 3]),
  (p = 26),
  (expected = 3);
console.log(minSubarray(nums, p), " || Expected:", expected);
