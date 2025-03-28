// The solver function and backtracking logic will be here

/**
 * fills grid with num at index specified by (row, col)
 * assume (row, col) is a valid index
 * for this to work, needs to copy grid so that the two arrays are not tied to each other
 * @param {Array<Array<Number>>} grid
 * @param {Number} num
 * @param {Number} row
 * @param {Number} col
 * @returns {Array<Array<Number>>}
 */
const updateGrid = (grid, num, row, col) => {
  // create a copy of grid's values, no reference tied
  const updatedGrid = grid.map((r) => {
    return r.map((c) => {
      return c;
    });
  });
  updatedGrid[row][col] = num;
  return updatedGrid;
};

/**
 * returns true if the number in the cell follows the rules of sudoku (no repeats along rows, cols, or in the same box)
 * @param {Array<Array<Number>>} grid
 * @param {Number} row
 * @param {Number} col
 * @param {Number} n size of the grid
 * @returns {Boolean}
 */
const isValid = (grid, row, col, n) => {
  for (let i = 0; i < n; i++) {
    // horizontal
    if (i != col && grid[row][i] == grid[row][col]) {
      return false;
    }
    // vertical
    if (i != row && grid[i][col] == grid[row][col]) {
      return false;
    }
  }

  // check box area
  const rowArea = row - (row % 3);
  const colArea = col - (col % 3);
  for (let i = rowArea; i < rowArea + 3; i++) {
    for (let j = colArea; j < colArea + 3; j++) {
      if (i != row && j != col && grid[i][j] == grid[row][col]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * returns true if the entire grid follows the rules of sudoku
 * this is an unfilled grid, so only checking the squares that are filled in
 * @param {*} grid
 * @param {Number} n size of the grid
 * @returns {Boolean}
 */
const isInputValid = (grid, n) => {
  // console.log(grid);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // if cell is not unfilled (0), then skip, otherwise check if valid
      if (grid[i][j] == 0) {
        continue;
      }
      if (!isValid(grid, i, j, n)) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Displays the grid in a format easier to read
 * @param {Array<Array<Number>>} grid
 * @param {Number} n size of the grid
 * @returns {String}
 */
export const displayGrid = (grid, n) => {
  // check if grid is null
  if (!grid) {
    return "No solution found";
  }
  let returnStr = "";
  for (let i = 0; i < n; i++) {
    returnStr += "| ";
    for (let j = 0; j < n; j++) {
      returnStr += grid[i][j] + " ";
    }
    returnStr += "|\n";
  }
  return returnStr;
};

/**
 * Makes the next recursive call to solver
 * Ensures that the call is not to a square already filled out
 * @param {Number} row
 * @param {Number} col
 * @param {Array<Array<Number>>} grid
 * @param {Number} n size of the grid
 * @returns {Array<Array<Number>>}
 */
const recur = (row, col, grid, n) => {
  while (true) {
    // BASE CASE: puzzle is completed where row and col are max (bottom right corner)
    if (row == n - 1 && col == n - 1) {
      return grid;
    }
    // at end of the row, move to the next row
    else if (col == n - 1) {
      col = -1;
      row += 1;
      continue;
    } else {
      if (grid[row][col + 1] != 0) {
        col += 1;
        continue;
      }
    }
    break;
  }
  // make recursive call
  return solver(row, col + 1, grid, n);
};

/**
 * Implements a backtracking algorithm to solve a sudoku puzzle from the given grid
 * Assume grid is a valid sudoku board
 * @param {Number} row
 * @param {Number} col
 * @param {Array<Array<Number>>} grid
 * @param {Number} n size of grid
 * @returns {Array<Array<Number>>} solved grid
 */
export const solver = (row, col, grid, n) => {
  let solution;
  // console.log(displayGrid(grid));
  // check if at end of row, and if so move to the next row
  if (col >= n) {
    row += 1;
    col = 0;
  }

  // BASE CASE: puzzle is completed where row and col are max (bottom right corner)
  if (row == n) {
    return grid;
  }

  // check if square already filled
  if (grid[row][col] != 0) {
    // console.log("row: " + row + " col: " + col);
    return solver(row, col + 1, grid, n);
  }

  // recurse
  for (let i = 1; i <= n; i++) {
    let updatedGrid = updateGrid(grid, i, row, col);
    // see if placing i would lead to a valid grid
    if (isValid(updatedGrid, row, col, n)) {
      // call solver with an updated grid
      //   console.log(displayGrid(updatedGrid));
      solution = recur(row, col, updatedGrid, n);
    } else {
      continue;
    }
    // if full solution is found, return it, otherwise move to next number
    if (solution) {
      return solution;
    }
  }

  // if number hasn't been placed, return and backtrack
  return;
};

// generates n x n grid of 0's
export const generateEmptyGrid = (n) => {
  const emptyGrid = [];
  for (let i = 0; i < n; i++) {
    const emptyRow = [];
    for (let j = 0; j < n; j++) {
      emptyRow.push(0);
    }
    emptyGrid.push(emptyRow);
  }
  return emptyGrid;
};

/**
 * Wrapper for the solver function that allows it to only take one input
 * Uses n=9 for standard sudoku puzzle
 * @param {Array<Array<Number>>} grid
 * @returns {Array<Array<Number>>}
 */
export const solvePuzzle = (grid) => {
  // check to make sure grid has no errors before sending to solver
  if (isInputValid(grid, 9)) {
    return solver(0, 0, grid, 9);
  }
  return;
};

const testGrid = [
  [9, 2, 6, 3, 7, 8, 4, 5, 1],
  [0, 4, 0, 5, 6, 1, 9, 0, 0],
  [1, 0, 0, 0, 2, 9, 0, 3, 0],
  [4, 6, 0, 0, 3, 2, 0, 7, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 0],
  [7, 0, 5, 0, 0, 6, 2, 0, 8],
  [5, 1, 3, 0, 0, 0, 0, 0, 7],
  [0, 0, 0, 0, 0, 0, 8, 0, 0],
  [0, 0, 2, 6, 1, 0, 0, 9, 4],
];

// console.log(displayGrid(solvePuzzle(generateEmptyGrid(9)), 9));
// console.log(displayGrid(solvePuzzle(testGrid), 9));
