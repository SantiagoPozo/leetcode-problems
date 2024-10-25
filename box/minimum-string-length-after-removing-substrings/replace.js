/**
 * @param {string} s
 * @return {number}
 */
var minLength = function (s) {
  let shallContinue = true;
  let len = s.length;
  while (shallContinue) {
    shallContinue = false;
    s = s.replace("AB", "");
    s = s.replace("CD", "");
    if (s.length < len) {
      shallContinue = true;
      len = s.length;
    }
  }
  return len;
};

// Runtime:    5ms Beats 99.85% O(n)
// Memory: 53.67MB Beats 71.84% O(n)

//prettier-ignore
let s = "ABFCACDB", expected = 2;
console.log(minLength(s), "|| expected: ", expected);
