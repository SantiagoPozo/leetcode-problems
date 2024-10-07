/**
 * @param {number[]} arr
 * @return {number[]}
 */
// ********************************
//             V1.0               *
// ********************************

/* var arrayRankTransform = function (arr) {
  const l = arr.length;
  const brr = [...arr].sort((a, b) => a - b);
  const rankB = [];
  rankB[0] = 1;
  for (i = 1; i < l; i++) rankB[i] = rankB[i - 1] + Number(brr[i] > brr[i - 1]);
  console.log("rankB", rankB);
  let bns = [];
  for (let i = 0; i < l; i++) bns[i] = rankB[brr.indexOf(arr[i])];
  return bns;
}; */

// ********************************
//             V2.0               *
// ********************************
var arrayRankTransform = function (arr) {
  const l = arr.length;
  if (l === 0) return [];
  const brr = [...arr].sort((a, b) => a - b);
  const map = new Map();
  map.set(brr[0], 1);

  for (i = 1; i < l; i++) {
    map.set(brr[i], map.get(brr[i - 1]) + Number(brr[i] > brr[i - 1]));
  }
  console.log(map);
  let rank = [];
  for (let i = 0; i < l; i++) rank[i] = map.get(arr[i]);
  return rank;
};

let arr = [40, 10, 30, 20, 30];

arr = [100, 100, 100];
arr = [37, 12, 28, 9, 100, 56, 80, 5, 12];
let expected = [5, 3, 4, 2, 8, 6, 7, 1, 3];
console.log("arr", arr, "- rank:", arrayRankTransform(arr));

// Notes: this is the first version. I understand that is bad
// but get me nearest of a deep understood.
