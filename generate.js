// The puzzle generation logic will be handled here
// TODO create logic to fix bug where the top row isn't usually 1-9, this has to do with generating a solution with so few nums initially
import {
  solvePuzzle,
  solver,
  generateEmptyGrid,
  displayGrid,
} from "./solver.js";

/**
 * Returns true if {row, col} is in array
 * @param {Object<Number, Number>} obj
 * @param {Array<Object<Number, Number>>} array
 * @returns {Boolean}
 */
const objMember = (obj, array) => {
  return array.some((o) => {
    return o.row === obj.row && o.col === obj.col;
  });
};

// console.log(
//   objMember({ row: 0, col: 1 }, [
//     { row: 0, col: 2 },
//     { row: 0, col: 1 },
//   ])
// );

/**
 * creates empty grid and fills in 1-n (1-9 for standard sudoku)
 * @param {*} n size of the grid
 * @returns {Array<Array<Number>>}
 */
const initialFill = (n) => {
  const grid = generateEmptyGrid(n);
  const fillPositions = new Array(n);
  for (let i = 1; i <= n; i++) {
    // generate random row and col
    let randomRow = Math.floor(Math.random() * n);
    let randomCol = Math.floor(Math.random() * n);
    if (objMember({ row: randomRow, col: randomCol }, fillPositions)) {
      // if already in fillPositions, regenerate
      i--;
      continue;
    }
    fillPositions[i - 1] = { row: randomRow, col: randomCol };
    // add to grid
    // console.log("row: " + randomRow + " col: " + randomCol);
    grid[randomRow][randomCol] = i;
  }
  return grid;
};

/**
 * Removes (replaces with 0) numRemoved random numbers from grid, returns nothing
 * @param {Array<Array<Number>>} grid
 * @param {Number} numRemoved
 * @param {Number} n size of the grid
 */
const removeFromGrid = (grid, numRemoved, n) => {
  for (let i = 0; i < numRemoved; i++) {
    let randomRow = Math.floor(Math.random() * n);
    let randomCol = Math.floor(Math.random() * n);
    // makes sure index hasn't already been removed
    if (grid[randomRow][randomCol] == 0) {
      i--;
      continue;
    }
    // replaces value in grid with a 0
    grid[randomRow][randomCol] = 0;
  }
};

/**
 * Uses solvePuzzle to generate a "random" valid sudoku input puzzle
 * Randomly places numbers 1-9 into the puzzle, and calls the solver to generate a solution
 * Then, removes numRemoved numbers randomly from the puzzle to create the final input
 * @param {Number} numRemoved
 * @param {Number} n size of the puzzle
 * @returns {Array<Array<Number>>} the generated puzzle
 */
const generate = (numRemoved, n) => {
  let grid;
  let generatedSolution;
  // fill up grid with initial 1-n and make sure it is a solution, otherwise regen
  while (!generatedSolution) {
    grid = initialFill(n);
    generatedSolution = solver(0, 0, grid, 9);
  }

  // remove numRemoved randomly from generatedSolution (still guaranteed to be a solution)
  removeFromGrid(generatedSolution, numRemoved, n);

  return generatedSolution;
};

/**
 * Implementation-specific function that generates a 9x9 sudoku board with numFilled cells pre-filled
 * @param {Number} numFilled
 * @returns {Array<Array<Number>>}
 */
export const generatePuzzle = (numFilled) => {
  return generate(81 - numFilled, 9);
};

const generatedGrid = generatePuzzle(30, 9);
console.log(displayGrid(generatedGrid, 9));
console.log(displayGrid(solvePuzzle(generatedGrid), 9));
