// beats 100% of solutions in terms of memory usage.

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

const spiralMatrix = function (m, n, head) {
  if (m === 0 || n === 0) return [];

  let matrix = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => -1)
  );
  let node = head;

  let col = -1,
    row = 0;

  const takeKsteps = (K, direction) => {
    for (let i = 0; i < K; i++) {
      if (!node) return;

      if (direction === 1) {
        col++;
      } else if (direction === 2) {
        row++;
      } else if (direction === 3) {
        col--;
      } else if (direction === 4) {
        row--;
      }

      matrix[row][col] = node.val;
      node = node.next;
    }
  };

  let direction = 1;
  let vSteps = m,
    hSteps = n;

  while (vSteps > 0 && hSteps > 0 && node) {
    if (direction === 1 || direction === 3) {
      takeKsteps(hSteps, direction);
      vSteps--;
    } else if (direction === 2 || direction === 4) {
      takeKsteps(vSteps, direction);
      hSteps--;
    }

    direction++;
    if (direction === 5) direction = 1;
  }

  return matrix;
};
