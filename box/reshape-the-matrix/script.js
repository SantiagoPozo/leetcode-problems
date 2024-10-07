/**
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function (mat, r, c) {
  const m = mat.length;
  if (m * mat[0].length !== r * c) return mat;
  const result = [];
  for (i = 0; i < m; i++) {
    result.push(...mat[i]);
  }
  return Array.from({ length: r }, (_, i) => result.slice(i * c, i * c + c));
};
// leet: 66ms, Beats: 95,93%; 54.83Mb, 30.74%.

/* var matrixReshape = function (mat, r, c) {
  if (mat.length * mat[0].length !== r * c) return mat;
  return Array.from({ length: r }, (_, i) =>
    mat.flat().slice(i * c, i * c + c)
  );
}; */

//leet: 308ms, 5.19%; 58,26MB 5,93%
