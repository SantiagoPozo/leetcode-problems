/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function (s) {
  const n = s.length;
  if (n === 1) return 1;
  const baseSet = new Set(s);
  if (baseSet + 1 >= n) return baseSet.size;
  let maxCount = 1;

  oneStep = function (theSet, currentS, rightS) {
    if (rightS === "") {
      if (!theSet.has(currentS)) {
        maxCount = Math.max(maxCount, theSet.size + 1);
        return;
      } else return;
    }

    // We don't include a new substring in theSet
    oneStep(
      new Set(theSet),
      currentS + rightS.substring(0, 1),
      rightS.substring(1)
    );

    // We try to include a new substring in theSet
    if (!theSet.has(currentS)) {
      theSet.add(currentS);
      currentS = rightS.substring(0, 1);
      rightS = rightS.substring(1);
      oneStep(theSet, currentS, rightS);
    }
  };

  oneStep(new Set(), s.substring(0, 1), s.substring(1));
  return maxCount;
};

console.log(maxUniqueSplit("aaa")); // 2
console.log(maxUniqueSplit("aba")); // 2
console.log(maxUniqueSplit("ababccc")); // 5
console.log(maxUniqueSplit("aa")); //1
console.log(maxUniqueSplit("abcd")); // 4
