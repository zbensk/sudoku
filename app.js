// This is where all of the logic for the app will be centralized
import { solvePuzzle } from "./solver.js";
import { generatePuzzle } from "./generate.js";

let gridArray = document.querySelectorAll(".square");
let values = document.querySelectorAll("span");

let focusIndex = 0;

/**
 * fills grid with accurate id selectors
 */
const initializeGrid = () => {
  for (let i = 0; i < gridArray.length; i++) {
    gridArray[i].setAttribute("id", i);
    gridArray[i].setAttribute("highlighted", 0);
    values[i].setAttribute("id", "value" + i);
    values[i].setAttribute("set", 0);
    // add event listener to grid square
    gridArray[i].addEventListener("click", () => {
      // highlight square and unhighlight previous square
      gridArray[focusIndex].setAttribute("highlighted", 0);
      gridArray[i].setAttribute("highlighted", 1);
      focusIndex = i;
    });
  }
};

/**
 * enters key value into clicked square, assuming e.key is a valid number 1-9
 * @param {Number} squareID
 * @param {Event} e
 */
const enterNumber = (squareID, e) => {
  // validate input and make sure square is not set (set == 1)
  if (validNumber(e.key) && values[focusIndex].getAttribute("set") != 1) {
    values[squareID].innerHTML = Number(e.key);
  }
};

/**
 * Returns true if s is a number between 1-9
 * @param {String} s
 */
const validNumber = (s) => {
  const validNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return validNums.includes(s);
};

/**
 * Sets all values to empty
 */
const clearValues = () => {
  values.forEach((val) => {
    val.innerHTML = "";
    val.setAttribute("set", 0);
  });
};

/**
 * fills grid with the corresponding numbers in gridNums
 * @param {Array<Array<Number>>} gridNums
 * @param {Boolean} isSet
 */
const displayGrid = (gridNums, isSet) => {
  // collapse into 1D array
  let gridData = [];
  for (let r = 0; r < gridNums.length; r++) {
    for (let c = 0; c < gridNums[r].length; c++) {
      gridData.push(gridNums[r][c]);
    }
  }
  // add to grid (if not 0) and clear values first
  clearValues();
  for (let i = 0; i < gridData.length; i++) {
    if (gridData[i] != 0) {
      values[i].innerHTML = gridData[i];
      if (isSet) {
        values[i].setAttribute("set", 1);
      }
    }
  }
};

// Enter number on key press
const grid = document.querySelector(".grid");
grid.addEventListener("keydown", (e) => {
  enterNumber(focusIndex, e);
});

// Generate new grid
const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", () => {
  const gridNums = generatePuzzle(40); // arbitrary value
  displayGrid(gridNums, true);
});

initializeGrid(gridArray);
console.log(gridArray);
