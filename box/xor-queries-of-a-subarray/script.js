/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */

const xorQueries = function (arr, queries) {
  const prefixXor = [0]; // Inicializamos solo con el primer elemento

  // Step 1: Compute prefix XOR array
  for (let i = 0; i < arr.length; i++) {
    prefixXor[i + 1] = prefixXor[i] ^ arr[i];
  }

  // Step 2: Process each query
  const result = [];
  for (let i = 0; i < queries.length; i++) {
    const L = queries[i][0];
    const R = queries[i][1];
    result[i] = prefixXor[R + 1] ^ prefixXor[L];
  }
  return result;
};

/* const xorQueries = function (arr, queries) {
  const result = [];
  const total = arr.reduce((acc, curr) => acc ^ curr, 0);

  for (let i = 0; i < queries.length; i++) {
    if (queries[i][1] - queries[i][0] > arr.length / 2) {
      result[i] =
        total ^
        arr.slice(0, queries[i][0]).reduce((acc, curr) => curr ^ acc, 0) ^
        arr.slice(queries[i][1] + 1).reduce((acc, curr) => curr ^ acc, 0);
    } else {
      result[i] = arr
        .slice(queries[i][0], queries[i][1] + 1)
        .reduce((acc, curr) => curr ^ acc, 0);
    }
  }
  return result;
}; */
