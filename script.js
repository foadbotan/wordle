import { validWords } from "./data.js";

const alertContainer = document.getElementById("alert-container");
const rows = document.querySelectorAll(".row");
const dialog = document.querySelector("#dialog");
const dialogButton = document.querySelector("#dialog-button");
const howToButton = document.querySelector("#how-to-button");
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

dialogButton.addEventListener("click", () => dialog.close());
howToButton.addEventListener("click", () => dialog.show());

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

function checkAnswer() {
  const isTooShort = answer.length !== CORRECT_WORD.length;
  if (isTooShort) {
    alertError("Answer is too short");
    return;
  }
  const isInvalidWord = !validWords.includes(answer);
  if (isInvalidWord) {
    alertError("Not in word list");
    return;
  }

  const gameOver = CURRENT_INDEX.row === MAX_ROUNDS;
  flipTiles();
  if (answer === CORRECT_WORD || gameOver) endGame();
  moveToNextRow();
}

function endGame() {
  answer === CORRECT_WORD
    ? alertGameEnd("You won!")
    : alertGameEnd("You lost!");
  isGameOver = true;
}

function flipTiles() {
  const tiles = getCurrentRow();
  let unmatchedLetters = "";

  tiles.forEach(tile => tile.classList.add("flipped"));
  tiles.forEach(flipExactMatch);
  tiles.forEach(flipPartialMatch);

  function flipExactMatch(tile, i) {
    const isExactMatch = answer[i] === CORRECT_WORD[i];
    if (isExactMatch) {
      tile.classList.add("exact-match");
    } else {
      unmatchedLetters += CORRECT_WORD[i];
    }
  }

  function flipPartialMatch(tile, i) {
    const isPartialMatch = unmatchedLetters.includes(answer[i]);
    if (isPartialMatch) tile.classList.add("partial-match");
  }
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
  const tiles = rows[CURRENT_INDEX.row].children;
  return [...tiles];
}

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function createButton(message, handleClick) {
  const button = document.createElement("button");
  button.textContent = message;
  button.classList.add("new-game-button");
  button.addEventListener("click", handleClick);
  return button;
}

function createAlert(message) {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert");
  alertElement.textContent = message;
  return alertElement;
}

function alertError(message) {
  const alertElement = createAlert(message);
  showAlert(alertElement);
  setTimeout(() => hideAlert(alertElement), 2000);
}

function alertGameEnd() {
  const message = answer === CORRECT_WORD ? "You Win!" : "You Lose!";
  const alertElement = createAlert(message);
  const button = createButton("Play Again", startGame);
  alertElement.append(button);

  showAlert(alertElement);
}

function showAlert(alertElement) {
  alertContainer.prepend(alertElement);
}

function hideAlert(alertElement) {
  alertElement.classList.add("hide-alert");
  alertElement.addEventListener("animationend", () => {
    alertElement.remove();
  });
}

function startGame() {
  location.reload();
}
