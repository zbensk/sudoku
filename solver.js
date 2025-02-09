const n = 3;
// fills grid with num at index specified by (row, col)
// assume (row, col) is a valid index
const updateGrid = (grid, num, row, col) => {
  grid[row][col] = num;
  return grid;
};

/**
 * returns true if the grid follows the rules of sudoku
 * @param {*} grid
 * @param {*} row
 * @param {*} col
 */
const isValid = (grid, row, col) => {
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
  // check within box (need to adjust logic for n=9, likely using / and %)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i != row && j != col && grid[i][j] == grid[row][col]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Displays the grid in a nice-to-read manner
 * @param {*} grid
 */
const displayGrid = (grid) => {};

// The solver function and backtracking logic will be here
const solver = (row, col, grid) => {
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
    solver(row, col + 1, grid);
  }

  // recurse
  for (let i = 1; i <= 9; i++) {
    let solution;
    let updatedGrid = updateGrid(grid, i, row, col);
    // see if placing i would lead to a valid grid
    if (isValid(updatedGrid, row, col)) {
      // call solver with an updated grid
      solution = solver(row, col + 1, updatedGrid);
    } else {
      continue;
    }
    // if full solution is found, return it, otherwise move to next number
    if (solution) {
      return solution;
    }
  }
};

console.log(
  solver(0, 0, [
    [0, 5, 1],
    [0, 0, 8],
    [0, 4, 3],
  ])
);
