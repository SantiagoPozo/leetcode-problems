const canArrange = function (arr, k) {
  const remainderCounts = new Array(k).fill(0);

  // Contar los restos de cada número
  for (let num of arr) {
    let remainder = num % k;
    if (remainder < 0) remainder += k;
    if (remainder <= k / 2) remainderCounts[remainder]++;
    else remainderCounts[k - remainder]--;
  }

  if (remainderCounts[0] % 2 !== 0) return false; // Los múltiplos de k deben ser pares
  if (k % 2 === 0 && remainderCounts[k / 2] % 2 !== 0) return false; // Los restos de k/2 deben
  for (let i = 1; i < k / 2; i++) if (remainderCounts[i] !== 0) return false;

  return true;
};

let arr = [-4, 2, 3, 4, 5, 10, 6, 7, 8, 9],
  k = 5;

console.log("\n k: ", k);
console.log(canArrange(arr, k));

arr = [1, 2, 3, 4, 5, 6];
k = 7;
console.log("\n k: ", k);
console.log(canArrange(arr, k));

arr = [1, 2, 3, 4, 5, 6];
k = 10;
console.log("\n k: ", k);
console.log(canArrange(arr, k));
