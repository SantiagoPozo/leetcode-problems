/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const l1 = s1.length,
    l2 = s2.length;
  if (l1 > l2) return false;

  let map = new Map();

  let counter = 0;
  for (const char of s1) {
    const value = (map.get(char) || 0) + 1;
    map.set(char, value);
    if (value === 1) counter++;
  }

  for (let k = 0; k < l1; k++) {
    const char = s2[k];
    if (map.has(char)) {
      const newValue = map.get(char) - 1;
      map.set(char, newValue);

      if (newValue === 0) counter--;
      else if (newValue === -1) counter++;
    }
  }

  if (counter === 0) return true;

  for (let i = 1; i < l2 - l1 + 1; i++) {
    const prevChar = s2[i - 1];
    const newChar = s2[i + l1 - 1];

    if (map.has(prevChar)) {
      const newValue = map.get(prevChar) + 1;
      map.set(prevChar, newValue);
      if (newValue === 1) counter++;
      else if (newValue === 0) counter--;
    }

    if (map.has(newChar)) {
      const newValue = map.get(newChar) - 1;
      map.set(newChar, newValue);
      if (newValue === 0) counter--;
      else if (newValue === -1) counter++;
    }

    if (counter === 0) return true;
  }

  return false;
};

console.log(checkInclusion("ab", "aeaaidbao")); // true
console.log(checkInclusion("ab", "eidboaoo")); // false
console.log(checkInclusion("adc", "dcda")); // true
console.log(checkInclusion("a", "ab")); // true
console.log(checkInclusion("abcdxabcde", "abcdeabcdx")); // true
/* 
var checkInclusion = function (s1, s2) {
  const l1 = s1.length,
    l2 = s2.length;
  if (l1 > l2) return false;
  let map = new Map();
  for (char of s1) map.set(char, (map.get(char) || 0) + 1);

  for (let k = 0; k < l1; k++) {
    const char = s2[k];
    map.set(char, (map.get(char) || 0) - 1);
  }
  let counter = 0;
  for (value of map.values()) {
    if (value === 0) counter++;
  }

  if (counter === map.size) return true;

  for (let i = 1; i < l2 - l1 + 1; i++) {
    const prevChar = s2[i - 1];

    let value = (map.get(prevChar) || 0) + 1;
    map.set(prevChar, value);
    if (value === 0) counter++;
    else if (value === 1) counter--;

    const newChar = s2[i + l1 - 1];

    value = (map.get(newChar) || 0) - 1;
    map.set(newChar, value);
    if (value === 0) counter++;
    else if (value === -1) counter--;

    if (counter === map.size) return true;
  }

  return false;
}; */

// a poor first version to remember the concept of sliding window:
/* var checkInclusion = function (s1, s2) {
  const l1 = s1.length,
    l2 = s2.length;
  if (l1 > l2) return false;
  let map = new Map();
  for (char of s1) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (let i = 0; i < l2 - l1 + 1; i++) {
    const newMap = new Map(map);
    console.log(newMap);
    const candidate = s2.slice(i, i + l2);
    for (let j = 0; j < l1; j++) {
      const value = newMap.get(candidate[j]);
      if (value > 0) {
        newMap.set(candidate[j], value - 1);

        console.log(" ", newMap);
        if (j === l1 - 1) return true;
      } else break;
    }
  }
  return false;
}; */
