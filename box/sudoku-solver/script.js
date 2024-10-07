const solveSudoku = function (board) {
  const isValid = (row, col, num) => {
    // Verificar la fila
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === num) {
        return false;
      }
    }

    // Verificar la columna
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === num) {
        return false;
      }
    }

    // Verificar el cuadrante 3x3
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if ((i !== row || j !== col) && board[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  // Paso 1: Inicialización del tablero con posibles números válidos
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === ".") {
        let possibleNumbers = "";
        for (let i = 1; i <= 9; i++) {
          if (isValid(row, col, i.toString())) {
            possibleNumbers += i.toString();
          }
        }
        board[row][col] = possibleNumbers;
      }
    }
  }

  // Función para verificar si el Sudoku está resuelto
  const isSolved = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].length > 1) {
          return false; // Si alguna celda tiene longitud mayor a 1, no está resuelto
        }
      }
    }
    return true; // Todas las celdas tienen longitud 1
  };

  // Paso 2: Recorremos el Sudoku mientras no esté resuelto
  while (!isSolved()) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].length > 1) {
          // Si la celda tiene múltiples opciones
          let updatedNumbers = ""; // Nueva cadena de posibles números

          // Probar cada número en la cadena de posibles números
          for (let num of board[row][col]) {
            if (isValid(row, col, num)) {
              // Verificar si sigue siendo válido
              updatedNumbers += num; // Mantener el número si es válido
            }
          }

          // Actualizar la celda con la nueva cadena de posibles números
          board[row][col] = updatedNumbers;
        }
      }
    }
  }

  // Mostrar el tablero resuelto
  console.log(board);
  return board;
};

// Ejemplo de uso
const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

solveSudoku(board);
