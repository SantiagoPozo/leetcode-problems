var minExtraChar = function (s, dictionary) {
  const n = s.length;
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    if (dp[i] !== Infinity) {
      for (let word of dictionary) {
        if (s.startsWith(word, i)) {
          dp[i + word.length] = Math.min(dp[i + word.length], dp[i]);
        }
      }
      dp[i + 1] = Math.min(dp[i + 1], dp[i] + 1);
    }
  }

  return dp[n];
};

// testing minExtraChar
const cases = [
  {
    s: "leetscode",
    dictionary: ["leet", "code", "leetcode"],
    expected: 1,
  },
  {
    s: "anaconda",
    dictionary: ["ana", "anaconda"],
    expected: 0,
  },
  {
    s: "sayhelloworld",
    dictionary: ["hello", "world"],
    expected: 3,
  },
  {
    s: "azvzulhlwxwobowijiyebeaskecvtjqwkmaqnvnaomaqnvf",
    dictionary: [
      "na",
      "i",
      "edd",
      "wobow",
      "kecv",
      "b",
      "n",
      "or",
      "jj",
      "zul",
      "vk",
      "yeb",
      "qnfac",
      "azv",
      "grtjba",
      "yswmjn",
      "xowio",
      "u",
      "xi",
      "pcmatm",
      "maqnv",
    ],
    expected: 15,
  },
];

cases.forEach(({ s, dictionary, expected }) => {
  console.time(`Test case: ${s}`);
  const result = minExtraChar(s, dictionary);
  console.timeEnd(`Test case: ${s}`);
  console.log(result, expected, result === expected);
});
