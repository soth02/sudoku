document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const newGameButton = document.getElementById("new-game");
  const checkSolutionButton = document.getElementById("check-solution");
  const showSolutionButton = document.getElementById("show-solution");

  const sudoku = new Sudoku();

  function showSolution() {
    const solution = sudoku.solveBoard(sudoku.board);
    if (solution) {
      createBoard(solution);
    } else {
      alert("There is no solution for this Sudoku board.");
    }
  }

  function createBoard(board) {
    gameBoard.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // Add input element for user input
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;
        input.value = board[i][j] === 0 ? "" : board[i][j];
        input.disabled = board[i][j] !== 0;
        input.addEventListener("input", (e) => {
          const value = parseInt(e.target.value) || 0;
          sudoku.board[i][j] = value;
        });

        cell.appendChild(input);
        gameBoard.appendChild(cell);
      }
    }
  }

  function generateNewGame() {
    const newBoard = sudoku.generateBoard();
    sudoku.board = newBoard;
    createBoard(newBoard);
  }

  function checkSolution() {
    const result = sudoku.checkSolution(sudoku.board);
    if (result) {
      alert("Congratulations! You solved the Sudoku puzzle!");
    } else {
      alert("The solution is incorrect. Please try again.");
    }
  }

  newGameButton.addEventListener("click", () => generateNewGame());
  showSolutionButton.addEventListener("click", showSolution);

  checkSolutionButton.addEventListener("click", checkSolution);

  generateNewGame();
});
