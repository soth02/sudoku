class Sudoku {
  constructor() {
    this.board = this.generateEmptyBoard();
  }

  generateEmptyBoard() {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  generateBoard() {
    let newBoard = this.generateEmptyBoard();
    this.board = newBoard;

    // Generate seed board
    this.generateSeedBoard();

    // Remove cells to create the puzzle
    this.removeCells();

    return newBoard;
  }

  generateSeedBoard() {
    const seedBoard = (board, row = 0, col = 0) => {
      if (row === 9) {
        return board;
      }

      if (col === 9) {
        return seedBoard(board, row + 1, 0);
      }

      if (board[row][col] !== 0) {
        return seedBoard(board, row, col + 1);
      }

      const nums = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (this.isValidMove(board, row, col, num)) {
          board[row][col] = num;

          if (seedBoard(board, row, col + 1)) {
            return board;
          }

          board[row][col] = 0;
        }
      }

      return null;
    };

    const filledBoard = seedBoard(this.board);
    if (filledBoard) {
      this.board = filledBoard;
    } else {
      this.generateSeedBoard();
    }
  }

  removeCells() {
    const cellPositions = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        cellPositions.push([row, col]);
      }
    }

    const shuffledPositions = this.shuffleArray(cellPositions);

    shuffledPositions.forEach(([row, col]) => {
      const originalValue = this.board[row][col];
      this.board[row][col] = 0;

      if (this.countSolutions(this.board) > 1) {
        this.board[row][col] = originalValue;
      }
    });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  countSolutions(board, row = 0, col = 0) {
    if (row === 9) {
      return 1;
    }

    if (col === 9) {
      return this.countSolutions(board, row + 1, 0);
    }

    if (board[row][col] !== 0) {
      return this.countSolutions(board, row, col + 1);
    }

    let solutions = 0;
    for (let num = 1; num <= 9; num++) {
      if (this.isValidMove(board, row, col, num)) {
        board[row][col] = num;
        solutions += this.countSolutions(board, row, col + 1);
        board[row][col] = 0;
      }
    }

    return solutions;
  }

  solveBoard(board) {
    // Implementation of the backtracking algorithm for solving the Sudoku board
    const [row, col] = this.findEmptyCell(board);
    if (row === -1) {
      return board;
    }

    for (let num = 1; num <= 9; num++) {
      if (this.isValidMove(board, row, col, num)) {
        board[row][col] = num;
        if (this.solveBoard(board)) {
          return board;
        }
        board[row][col] = 0;
      }
    }

    return null;
  }

  findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }

    return [-1, -1];
  }

  isValidMove(board, row, col, num) {
    return (
      !this.isInRow(board, row, num) &&
      !this.isInCol(board, col, num) &&
      !this.isInBox(board, row, col, num)
    );
  }

  isInRow(board, row, num) {
    return board[row].some((cell) => cell === num);
  }

  isInCol(board, col, num) {
    return board.some((row) => row[col] === num);
  }

  isInBox(board, row, col, num) {
    const boxStartRow = row - (row % 3);
    const boxStartCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxStartRow + i][boxStartCol + j] === num) {
          return true;
        }
      }
    }

    return false;
  }

  removeRandomCells() {
    const cellsToRemove = 40;
    let removedCells = 0;

    while (removedCells < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (this.board[row][col] !== 0) {
        const originalValue = this.board[row][col];
        this.board[row][col] = 0;

        if (this.countSolutions(this.board) === 1) {
          removedCells++;
        } else {
          this.board[row][col] = originalValue;
        }
      }
    }
  }

  checkSolution(board) {
    // Check if the current Sudoku board is a valid solution
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = board[row][col];
        if (num === 0 || !this.isValidMove(board, row, col, num)) {
          return false;
        }
      }
    }
    return true;
  }
}
