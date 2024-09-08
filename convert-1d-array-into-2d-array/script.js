/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 *
 */

var construct2DArray = function (original, m, n) {
  if (m * n !== original.length) return [];
  return Array.from({ length: m }, (_, i) => original.slice(i * n, i * n + n));
};

/* 
var construct2DArray = function (original, m, n) {
  const l = original.length;
  if (m * n !== l || l === 0) return [];

  const result = [];
  if (m === 1) {
    result.push(original);
    return result;
  }

  if (m % 2 === 1) {
    let left = [];
    for (let i = 0; i < n; i++) {
      left.push(original.shift());
    }
    result.push(left);
  }

  const rightHalf = [];
  while (original.length > 0) {
    const left = [],
      right = [];
    for (let i = 0; i < n; i++) {
      left.push(original.shift());
      right.unshift(original.pop());
    }
    result.push(left);
    rightHalf.unshift(right);
  }
  result.push(...rightHalf);
  return result;
};

/* var construct2DArray = function (original, m, n) {
  if (m * n !== original.length) return [];
  const result = [];

  for (let fila = 0; fila < m; fila++) {
    const row = [];
    for (let col = 0; col < n; col++) {
      row.push(original[fila * n + col]);
    }
    result.push(row);
  }
  return result;
}; */

// tiempo empeleado ?ms.
// Tiempo empleado en local 10ms

/* var construct2DArray = function (original, m, n) {
  if (m * n !== original.length) return [];
  const result = Array.from({ length: m }, () => Array(n).fill(0));

  for (let fila = 0; fila < m; fila++) {
    for (let col = 0; col < n; col++) {
      result[fila][col] = original[fila * n + col];
    }
  }
  return result;
}; */

// tiempo empeleado en leetcode 67ms.
// tiempo empleado en local 30ms
