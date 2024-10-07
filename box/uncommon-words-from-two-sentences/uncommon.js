/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */

// versión 1.0
/* var uncommonFromSentences = function (s1, s2) {
  const result = [];
  const map = {};
  for (word of s1.concat(" ").concat(s2).split(" ")) {
    map[word] = (map[word] || 0) + 1;
  }
  for (let word in map) {
    if (map[word] === 1) result.push(word);
  }
  return result;
};
 */
// versión 2.0

var uncommonFromSentences = function (s1, s2) {
  const map = {};
  const result = [];

  const addWordsToMap = (sentence) => {
    let word = "";
    for (let char of sentence) {
      if (char === " ") {
        if (word) {
          map[word] = (map[word] || 0) + 1;
          word = "";
        }
      } else word += char;
    }
    if (word) map[word] = (map[word] || 0) + 1;
  };

  addWordsToMap(s1);
  addWordsToMap(s2);

  for (let word in map) if (map[word] === 1) result.push(word);
  return result;
};

// Ejemplo de uso
const s1 = "this apple is sweet",
  s2 = "this apple is sour";
console.log(uncommonFromSentences(s1, s2)); // ["sweet", "sour"]
