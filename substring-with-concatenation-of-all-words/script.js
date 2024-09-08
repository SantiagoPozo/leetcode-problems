const findSubstring = function (s, words) {
  const wL = words[0].length;
  const substringCount = wL * words.length;
  const sol = [];
  const theCollection = {};

  for (let i = 0; i <= s.length - substringCount; i++) {
    const substring = s.slice(i, i + substringCount);
    if (theCollection[substring] === true) {
      sol.push(i);
      continue;
    }
    if (theCollection[substring] === false) {
      continue;
    }
    if (theCollection[substring] === undefined) {
      if (
        isAPermutation(
          Array.from({ length: substring.length / wL }, (_, j) =>
            substring.slice(j * wL, j * wL + wL)
          ),
          words
        )
      ) {
        sol.push(i);
        theCollection[substring] = true;
      } else {
        theCollection[substring] = false;
      }
    }
  }
  return sol;
};

function isAPermutation(arr, words) {
  const wordCount = {};
  for (let word of words) {
    wordCount[word] = (wordCount[word] || 0) + 1;
  }
  const currentCount = {};
  for (let word of arr) {
    if (!wordCount[word]) return false;
    currentCount[word] = (currentCount[word] || 0) + 1;
    if (currentCount[word] > wordCount[word]) return false;
  }
  return true;
}

//44.50 miliseconds in local
