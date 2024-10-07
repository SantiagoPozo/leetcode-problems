/**
 * @param {string} s
 * @return {number}
 */
const findTheLongestSubstring = function (s) {
  let max = 0;
  let currentXor = 0;
  const hashMap = new Map();
  hashMap.set(0, -1);

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if ("aeiou".includes(c)) currentXor ^= 1 << "aeiou".indexOf(c);
    if (hashMap.has(currentXor))
      max = Math.max(max, i - hashMap.get(currentXor));
    else hashMap.set(currentXor, i);
  }
  return max;
};

// 77ms 73.91 o(n);
// 53.04MB 56.52 o(n);
