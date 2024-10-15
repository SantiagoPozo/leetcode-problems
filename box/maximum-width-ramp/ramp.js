const maxWidthRamp = function (nums) {
  const len = nums.length;
  let ramp = 0;
  const minIndexes = [0];
  let absMax = nums[0];

  for (let i = 1; i < len; i++) {
    if (nums[i] > absMax) absMax = nums[i];
    if (nums[i] < nums[minIndexes[minIndexes.length - 1]]) {
      minIndexes.push(i);
      if (nums[i] === 0) break;
    }
  }

  let j = len - 1;
  while (j > ramp) {
    const value = nums[j];
    while (
      minIndexes.length &&
      value >= nums[minIndexes[minIndexes.length - 1]]
    ) {
      ramp = Math.max(ramp, j - minIndexes.pop());
    }
    if (value === absMax) break;
    do {
      j--;
    } while (j > ramp && nums[j] <= value);
  }
  return ramp;
};

console.log("rampa:", maxWidthRamp([6, 0, 8, 2, 1, 5])); //4
console.log("rampa:", maxWidthRamp([8, 9, 1, 0, 1, 9, 4, 0, 4, 1])); // 7
/* const maxWidthRamp = function (nums) {
  const len = nums.length;
  let minValue = nums[0];
  let maxValue = nums[len - 1];
  if (minValue <= maxValue) return len - 1;

  let ramp = 0;
  let absMax = maxValue;

  // map
  const minMap = new Map();
  minMap.set(minValue, 0);

  let position = 0;
  let value;
  while (position < len - 1 && minValue > 0) {
    position++;
    value = nums[position];
    if (value > absMax) absMax = value;

    if (value < minValue) {
      minMap.set(value, position);
      minValue = value;
    }
  }

  console.log("minMap:", minMap);
  console.log("nums", nums);

  // prev valid index (use absMax)
  const prevValidIndex = (index, value) => {
    if (value === absMax) false;
    while (index > 0) {
      index--;
      if (nums[index] > value) return index;
    }
    return false;
  };
  // Traverse nums from end to start

  let endPosition = len - 1;
  endValue = nums[endPosition];

  while (endPosition > 0) {
    for ([startValue, startPosition] of minMap) {
      if (startPosition >= endPosition) break;
      if (startValue > endValue) {
        let prevIndex = prevValidIndex(endPosition);
        if (!prevIndex) {
          break;
        } else {
          endPosition = prevIndex;
          continue;
        }
      }

      const currentRamp = endPosition - startPosition;
      if (currentRamp === endPosition) return currentRamp;
      if (currentRamp > ramp) {
        ramp = currentRamp;
        break;
      }
    }
    if (endValue === absMax) break;
    endPosition--;
    let nextValue = nums[endPosition];
    while (endValue >= nextValue) {
      endPosition--;
      nextValue = nums[endPosition];
    }
    endValue = nums[endPosition];
  }

  return ramp;
};
 */
/* var maxWidthRamp = function (nums) {
  let max = 0;
  let cota = + Infinity; 
  const len = nums.length;
  for (let i = 0; i < len - 1; ) {

    if (len - 1 - i <= max) break;
    for (let j = len - 1; j > i; ) {
      if (j - i <= max) break;
      if (nums[j] >= nums[i]) {
        max = Math.max(max, j - i);
        cota = nums[i];
        if (max === len - 2 - i) return max;
        break;
      }
      j--;
      const currentJ = j;
      while (nums[j] < nums[i] && j > i) {
        j--;
      }
    }

    const current = i;
    i++;
    while (nums[i] > nums[current] && nums[i] > cota && i < len - 2 && len - 1 - i > max) {
      i++;
    }
  }
  return max;
}; */
