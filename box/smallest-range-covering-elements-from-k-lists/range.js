/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function (nums) {
  const len = nums.length;
  let listsPointer = new Map();

  complexRange = [];

  function insertIntoSortedArray(pair) {
    // Find the correct position to insert the number using binary search
    let left = 0;
    let right = complexRange.length;
    let num = pair[0];

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (complexRange[mid][0] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // Insert the number at the correct position
    complexRange.splice(left, 0, pair);
  }

  for (let i = 0; i < len; i++) {
    insertIntoSortedArray([nums[i][0], i]);
    if (nums[i].length === 1) listsPointer.set(i, false);
    else listsPointer.set(i, 1);
  }

  let range = complexRange[len - 1][0] - complexRange[0][0];
  let bestRange = [complexRange[0][0], complexRange[len - 1][0]];

  if (range === 0) return bestRange;

  let shouldContinue = true;

  while (shouldContinue) {
    // Extract the first element from complexRange
    let num = complexRange[0][0];
    let list = complexRange[0][1];

    // Remove the first element from complexRange
    complexRange.shift();

    // Increment the pointer for the current list
    let pointer = listsPointer.get(list);
    if (pointer === false || pointer >= nums[list].length) {
      // If the list is exhausted, stop the loop
      shouldContinue = false;
      break;
    }

    // Insert the next element from the current list into complexRange
    insertIntoSortedArray([nums[list][pointer], list]);
    listsPointer.set(list, pointer + 1);

    // Update the range and best range
    let currentRange = complexRange[len - 1][0] - complexRange[0][0];
    if (currentRange < range) {
      range = currentRange;
      bestRange = [complexRange[0][0], complexRange[len - 1][0]];
    }
  }

  return bestRange;
};
