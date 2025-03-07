// This is where all of the logic for the app will be centralized
import { solvePuzzle } from "./solver.js";
import { generatePuzzle } from "./generate.js";

let grid = document.querySelectorAll(".square");
let values = document.querySelectorAll("span");

/**
 * fills grid with accurate id selectors
 * @param {NodeList} grid
 */
const initializeGrid = () => {
  for (let i = 0; i < grid.length; i++) {
    grid[i].setAttribute("id", i);
    values[i].setAttribute("id", "value" + i);
  }
};

/**
 * Sets all values to empty
 */
const clearValues = () => {
  values.forEach((val) => {
    val.innerHTML = "";
  });
};

/**
 * fills grid with the corresponding numbers in grid_nums
 * @param {Array<Array<Number>>} grid_nums
 */
const displayGrid = (grid_nums) => {
  // collapse into 1D array
  let gridData = [];
  for (let r = 0; r < grid_nums.length; r++) {
    for (let c = 0; c < grid_nums[r].length; c++) {
      gridData.push(grid_nums[r][c]);
    }
  }
  // add to grid (if not 0) and clear values first
  clearValues();
  for (let i = 0; i < gridData.length; i++) {
    if (gridData[i] != 0) {
      values[i].innerHTML = gridData[i];
    }
  }
};

const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", () => {
  const grid_nums = generatePuzzle(40); // arbitrary value
  displayGrid(grid_nums);
});

initializeGrid(grid);
console.log(grid);
