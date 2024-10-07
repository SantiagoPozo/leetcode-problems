/**
 * @param {string[]} strs
 * @return {string}
 */

var longestCommonPrefix = function (strs) {
  const prefix = strs[0];
  let len = prefix.length;
  if (strs.length === 1) return prefix;
  for (let j = 1; j < strs.length; j++) {
    for (let l = 0; l < len; l++) {
      if (prefix[l] !== strs[j][l]) {
        if (l === 0) return "";
        len = l;
        break;
      }
    }
  }
  return prefix.slice(0, len);
};

var longestCommonPrefix = function (strs) {
  if (strs.length === 1) return strs[0];
  let prefix = strs[0];

  for (let j = 1; j < strs.length; j++) {
    let l = 0;
    while (l < prefix.length && l < strs[j].length) {
      if (prefix[l] !== strs[j][l]) break;
      l++;
    }
    if (l === 0) return "";
    prefix = prefix.slice(0, l);
  }
  return prefix;
};

var longestCommonPrefix = function (strs) {
  let prefix = [];
  let char = "";

  const word = strs[0];
  if (strs.length === 1) return word;

  for (let index = 0; index < word.length; index++) {
    char = word[index];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][index] !== char) {
        return prefix.join("");
      }
    }
    prefix.push(char);
  }

  return prefix.join("");
};
// generate test cases
let input;
let output;
let i = 0;
// Test case 1

i++, (input = ["flower", "flow", "flight"]), (output = "fl");
testFunction(longestCommonPrefix, input, output);

// Test case 2
(input = ["dog", "racecar", "car"]), (output = "");
testFunction(longestCommonPrefix, input, output);

// Test case 3
(input = ["a"]), (output = "a");
testFunction(longestCommonPrefix, input, output);

// Test case 4
(input = ["flower", "flower", "flower", "flower"]), (output = "flower");
testFunction(longestCommonPrefix, input, output);

function testFunction(fn, input, output) {
  console.log("*");
  console.time("Test case", i);
  console.log(fn(input), output);
  console.timeEnd("Test case", i);
  console.log("test passed:", fn(input) === output);
}
