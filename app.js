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
    values[i].setAttribute("value", 0);
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
 * also checks for delete key
 * @param {Number} squareID
 * @param {Event} e
 */
const enterNumber = (squareID, e) => {
  // make sure square is not set
  if (values[focusIndex].getAttribute("set") != 1) {
    // validate input
    if (validNumber(e.key)) {
      // set blue initially
      values[squareID].setAttribute("set", 0);
      values[squareID].innerHTML = Number(e.key);
      values[squareID].setAttribute("value", Number(e.key));
      if (!getSolvedPuzzle()) {
        // unsolvable
        values[squareID].setAttribute("set", 2);
      }
    } else if (e.key === "Backspace") {
      values[squareID].innerHTML = "";
      values[squareID].setAttribute("value", 0);
      values[squareID].setAttribute("set", 0);
    }
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
 * Turns values from grid into a 2d array that can be parsed by the solver
 */
const make2dArray = () => {
  let array2d = [];
  let currentRow = [];
  for (let i = 1; i < values.length + 1; i++) {
    currentRow.push(Number(values[i - 1].getAttribute("value")));
    if (i % 9 == 0) {
      // last element in row, append row to array, and clear row
      array2d.push(currentRow);
      currentRow = [];
    }
  }
  return array2d;
};

/**
 * Returns puzzle if the grid is solvable based on the current numbers
 */
const getSolvedPuzzle = () => {
  const numArray = make2dArray();
  // console.log(numArray);
  // console.log(solvePuzzle(numArray));
  return solvePuzzle(numArray);
};

/**
 * Sets all values to empty
 */
const clearValues = () => {
  values.forEach((val) => {
    val.innerHTML = "";
    val.setAttribute("set", 0);
    val.setAttribute("value", 0);
  });
};

/**
 * Returns true if all value attribute in values are 0
 */
const isEmpty = () => {
  for (let i = 0; i < values.length; i++) {
    if (values[i].getAttribute("value") != 0) {
      return false;
    }
  }
  return true;
};

/**
 * fills grid with the corresponding numbers in gridNums
 * @param {Array<Array<Number>>} gridNums
 * @param {Boolean} isSet true if values cannot be changed
 * @param {Boolean} isSolving true if wanting to get the solving visual output
 */
const displayGrid = (gridNums, isSet, isSolving) => {
  // collapse into 1D array
  let gridData = [];
  for (let r = 0; r < gridNums.length; r++) {
    for (let c = 0; c < gridNums[r].length; c++) {
      gridData.push(gridNums[r][c]);
    }
  }
  // all set items stay black (set=1), while all the new elements that were just solved are blue (set=0)
  if (isSolving) {
    for (let i = 0; i < gridData.length; i++) {
      values[i].innerHTML = gridData[i];
      values[i].setAttribute("value", gridData[i]);
    }
  } else {
    // add to grid (if not 0) and clear values first
    clearValues();
    for (let i = 0; i < gridData.length; i++) {
      if (gridData[i] != 0) {
        values[i].innerHTML = gridData[i];
        values[i].setAttribute("value", gridData[i]);
        if (isSet) {
          values[i].setAttribute("set", 1);
        }
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
  displayGrid(gridNums, true, false);
});

// Solve puzzle
const solveButton = document.getElementById("solve");
solveButton.addEventListener("click", () => {
  if (isEmpty()) {
    alert("Cannot get solution of empty grid!");
  } else {
    const solvedPuzzle = getSolvedPuzzle();
    if (!solvedPuzzle) {
      alert("There are mistakes in the puzzle!");
    } else {
      displayGrid(solvedPuzzle, true, true);
    }
  }
});

initializeGrid(gridArray);
console.log(gridArray);
