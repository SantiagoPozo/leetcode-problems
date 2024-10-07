//My best script
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

const spiralMatrix = function (m, n, head) {
  if (m === 0 || n === 0) return [];
  const matrix = Array.from({ length: m }, () => Array(n).fill(-1));
  let node = head;
  let col = -1,
    row = 0;
  let vSteps = m,
    hSteps = n;

  while (vSteps > 0 && hSteps > 0 && node) {
    // right
    for (let i = 0; i < hSteps; i++) {
      col++;
      matrix[row][col] = node.val;
      if (node.next) {
        node = node.next;
      } else {
        return matrix;
      }
    }
    vSteps--;

    // down

    if (vSteps === 0) return matrix;
    for (let i = 0; i < vSteps; i++) {
      row++;
      matrix[row][col] = node.val;
      if (node.next) {
        node = node.next;
      } else {
        return matrix;
      }
    }
    hSteps--;

    // left

    if (hSteps === 0) return matrix;
    for (let i = 0; i < hSteps; i++) {
      col--;
      matrix[row][col] = node.val;
      if (node.next) {
        node = node.next;
      } else {
        return matrix;
      }
    }
    vSteps--;

    //up

    if (vSteps === 0) return matrix;
    for (let i = 0; i < vSteps; i++) {
      row--;
      matrix[row][col] = node.val;
      if (node.next) {
        node = node.next;
      } else {
        return matrix;
      }
    }
    hSteps--;
  }

  return matrix;
};
