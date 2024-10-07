/**
 * @param {string} sentence1
 * @param {string} sentence2
 * @return {boolean}
 */

// v1.2
// Runtime: 39ms, Beats: 92.59%
// Memory: 49.24MB, Beats: 49.24%

var areSentencesSimilar = function (sentence1, sentence2) {
  if (sentence1 === sentence2 || sentence1 === "" || sentence2 === "")
    return true;
  const arr1 = sentence1.split(" ");
  let l1 = arr1.length;
  const arr2 = sentence2.split(" ");
  let l2 = arr2.length;
  if (l1 === l2) return false;

  let go = true;

  let index = 1;
  go = true;
  while (go) {
    go = false;
    if (arr1[arr1.length - index] === arr2[arr2.length - index]) {
      index++;
      l1--;
      l2--;
      if (l1 === 0 || l2 === 0) return true;
      go = true;
    }
  }

  index = 0;
  go = true;
  while (go) {
    go = false;
    if (arr1[index] === arr2[index]) {
      index++;
      l1--;
      l2--;
      if (l1 === 0 || l2 === 0) return true;
      go = true;
    }
  }

  return false;
};

console.log(areSentencesSimilar("opera", "A night in the opera")); // true
console.log(areSentencesSimilar("My name is Haley", "My Haley")); // true
console.log(areSentencesSimilar("of", "A lot of words")); // false
console.log(areSentencesSimilar("Eating right now", "Eating")); // true
console.log(areSentencesSimilar("Luky", "Lucccky")); // false
console.log(areSentencesSimilar("Luky", "Luky")); // true
console.log(areSentencesSimilar("Luky", "")); // true

console.log(areSentencesSimilar("", "Luky")); // true
console.log(areSentencesSimilar("", "")); // true
console.log(areSentencesSimilar("Luky", "Luky Luky")); // true
console.log(areSentencesSimilar("Luky Luky", "Luky")); // true
console.log(areSentencesSimilar("Luky Luky", "Luky Luky")); // true
console.log(areSentencesSimilar("Luky Luky", "Luky Luky Luky")); // true
console.log(areSentencesSimilar("Luky Luky Luky", "Luky Luky")); // true
console.log(areSentencesSimilar("Luky Luky Luky", "Luky Luky Luky")); // true
console.log(areSentencesSimilar("Luky Luky Luky", "Luky Luky Luky Luky")); // true
console.log(areSentencesSimilar("A night the opera", "A night in the opera")); // true
console.log(areSentencesSimilar("A night opera", "A night in the opera")); // true
console.log(areSentencesSimilar("A opera", "A night in the opera")); // true
