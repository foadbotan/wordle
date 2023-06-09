import { validWords } from "./data.js";

const alertContainer = document.getElementById("alert-container");
const rows = document.querySelectorAll(".row");
const [...keyboardButtons] = document.querySelectorAll(".keyboard-button");

const CORRECT_WORD = getRandomElement(validWords);
const CURRENT_INDEX = { row: 0, tile: 0 };
const MAX_ROUNDS = rows.length;
let isGameOver = false;

let answer = "";

console.log(CORRECT_WORD);

document.addEventListener("keydown", e => {
  const key = e.key;
  handleKeyPress(key);
});

keyboardButtons.forEach(button => {
  button.addEventListener("click", e => {
    const key = e.target.dataset.key;
    handleKeyPress(key);
  });
});

function handleKeyPress(key) {
  if (isGameOver) return;
  if (key === "Backspace") deleteTile();
  if (key === "Enter") checkAnswer();
  if (key.match(/^[a-z]$/)) addTile(key);
}

function deleteTile(tile) {
  const previousTile = getPreviousTile();
  if (!previousTile) return;

  answer = answer.slice(0, -1);
  previousTile.textContent = "";
  previousTile.classList.remove("filled");
  CURRENT_INDEX.tile--;
}

function addTile(key) {
  const currentTile = getCurrentTile();
  const isRowFull = CURRENT_INDEX.tile === CORRECT_WORD.length;
  if (isRowFull) return;

  answer += key.toUpperCase();
  currentTile.textContent = key;
  currentTile.classList.add("filled");
  CURRENT_INDEX.tile++;
}

function checkAnswer(tiles) {
  const isTooShort = answer.length !== CORRECT_WORD.length;
  if (isTooShort) {
    showAlert("Not enough letters");
    return;
  }
  const isInvalidWord = !validWords.includes(answer);
  if (isInvalidWord) {
    showAlert("Not a valid word");
    return;
  }

  const gameOver = CURRENT_INDEX.row === MAX_ROUNDS;
  flipTiles();
  if (answer === CORRECT_WORD || gameOver) endGame();
  moveToNextRow();
}

function endGame() {
  answer === CORRECT_WORD ? showAlert("You won!") : showAlert("You lost!");
  isGameOver = true;
}

function flipTiles() {
  console.log("flipping tiles");
}

function showAlert(message) {
  console.log(message);
}

function moveToNextRow() {
  answer = "";
  CURRENT_INDEX.tile = 0;
  CURRENT_INDEX.row++;
}

function getCurrentTile() {
  const currentRow = getCurrentRow();
  return currentRow[CURRENT_INDEX.tile];
}

function getPreviousTile() {
  const currentRow = getCurrentRow();
  return currentRow[CURRENT_INDEX.tile - 1];
}

function getCurrentRow() {
  return rows[CURRENT_INDEX.row].children;
}

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
