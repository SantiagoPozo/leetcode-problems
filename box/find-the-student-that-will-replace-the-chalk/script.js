/**
 * @param {number[]} chalk
 * @param {number} k
 * @return {number}
 */

/* var chalkReplacer = function (chalk, k) {
  const accumulativeSum = Array(chalk.length).fill(0);
  accumulativeSum[0] = chalk[0];
  for (let i = 1; i < chalk.length; i++) {
    accumulativeSum[i] = accumulativeSum[i - 1] + chalk[i];
  }
  let remainder = k % accumulativeSum[accumulativeSum.length - 1];
  return accumulativeSum.findIndex((element) => element > remainder);
}; */

var chalkReplacer = function (chalk, k) {
  let remainder = k % chalk.reduce((a, b) => a + b, 0);
  for (let i = 0; i < chalk.length; i++) {
    remainder -= chalk[i];
    if (remainder < 0) return i;
  }
};

// 30ms in local. 55ms en leetcode.
