/**
 * @param {number} n
 * @param {number} k
 * @return {character}
 */
var findKthBit = function (n, k) {
  const begining = [null, 0, 1, 1, 1];
  if (k <= 4) return begining[k].toString();
  let simetry = 0;

  while (k > 4) {
    const logas = Math.log2(k);
    if (Number.isInteger(logas)) return (simetry ^ 1).toString();
    const prevCenter = 2 ** Math.floor(logas);
    k = 2 * prevCenter - k;
    simetry = 1 - simetry;
  }

  return (simetry ^ begining[k]).toString();
};

// console.log(findKthBit(3, 24));

let s = "";
for (let k = 1; k < 40; k++) {
  s += findKthBit(10, k);
}
console.log("js", s);
