/**--------------------------------------------
 *               Import Data
 *---------------------------------------------**/
import { validWords } from "./data.js";

/**--------------------------------------------
 *               Get DOM Elements
 *---------------------------------------------**/
const alertContainer = document.querySelector("#alert-container");
const rows = document.querySelectorAll(".row");
const dialog = document.querySelector("#dialog");
const dialogButton = document.querySelector("#dialog-button");
const howToButton = document.querySelector("#how-to-button");
const [...keyboardButtons] = document.querySelectorAll(".keyboard-button");

/**--------------------------------------------
 *               Set Game State
 *---------------------------------------------**/
const CORRECT_WORD = getRandomElement(validWords);
const MAX_TRIES = rows.length - 1;
let currentRowIndex = 0;
let currentTileIndex = 0;
let isGameOver = false;
let answer = "";

/**--------------------------------------------
 *               😉🤫
 *---------------------------------------------**/
logHints();

/**--------------------------------------------
 *               Add Event Listeners
 *---------------------------------------------**/
document.addEventListener("keydown", e => {
  const key = e.key;
  handleNewKey(key);
});

keyboardButtons.forEach(button => {
  button.addEventListener("click", e => {
    const key = e.target.dataset.key;
    handleNewKey(key);
  });
});

dialogButton.addEventListener("click", () => dialog.close());
howToButton.addEventListener("click", () => dialog.show());

function handleNewKey(key) {
  if (isGameOver) return;
  if (key === "Backspace") deleteTile();
  if (key === "Enter") checkAnswer();
  if (key.match(/^[a-z]$/)) addTile(key);
}

/**--------------------------------------------
 *               Game Functions
 *---------------------------------------------**/

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

  flipTiles();
  checkGameOver();
  moveToNextRow();
}

function endGame() {
  if (answer === CORRECT_WORD) {
    alertGameEnd("You won!");
  } else {
    alertGameEnd("You lost!");
  }
  isGameOver = true;
}

function startGame() {
  location.reload();
}

function checkGameOver() {
  const noMoreTries = currentRowIndex === MAX_TRIES;
  const isCorrect = answer === CORRECT_WORD;
  if (isCorrect || noMoreTries) endGame();
}

/**--------------------------------------------
 *               Modify Tile Elements
 *---------------------------------------------**/

function deleteTile(tile) {
  const previousTile = getPreviousTile();
  if (!previousTile) return;

  answer = answer.slice(0, -1);
  previousTile.textContent = "";
  previousTile.classList.remove("filled");
  currentTileIndex--;
}

function addTile(key) {
  const currentTile = getCurrentTile();
  const isRowFull = currentTileIndex === CORRECT_WORD.length;
  if (isRowFull) return;

  answer += key.toUpperCase();
  currentTile.textContent = key;
  currentTile.classList.add("filled");
  currentTileIndex++;
}

function flipTiles() {
  console.log("flipping tiles");
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

/**--------------------------------------------
 *               Navigate Game Board
 *---------------------------------------------**/

function moveToNextRow() {
  answer = "";
  currentTileIndex = 0;
  currentRowIndex++;
}

function getCurrentTile() {
  const currentRow = getCurrentRow();
  return currentRow[currentTileIndex];
}

function getPreviousTile() {
  const currentRow = getCurrentRow();
  return currentRow[currentTileIndex - 1];
}

function getCurrentRow() {
  const tiles = rows[currentRowIndex].children;
  return [...tiles];
}

/**--------------------------------------------
 *               Alert Functions
 *---------------------------------------------**/

function alertError(message) {
  const alertElement = createAlert(message);
  showAlert(alertElement);
  setTimeout(() => hideAlert(alertElement), 2000);
}

function alertGameEnd(message) {
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

/**--------------------------------------------
 *               Create DOM Elements
 *---------------------------------------------**/

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

/**--------------------------------------------
 *               Helper Functions
 *---------------------------------------------**/

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**--------------------------------------------
 *              Log Hints
 *---------------------------------------------**/

function logHints() {
  console.log("Call showAnswer() to see the answer");
  console.log("Call showHint() to see hints");

  window.showAnswer = () => {
    console.log("ANSWER:", CORRECT_WORD);
  };

  window.showHint = () => {
    const similarWords = getSimilarWords();
    console.log("HINT: This is a list of similar words - ", similarWords);
  };
}

function getSimilarWords() {
  const similarWords = validWords.filter(isSimilarWord);
  return similarWords.slice(0, 10);
}

function isSimilarWord(word) {
  const regex = new RegExp(`[${CORRECT_WORD}]`, "g");
  const matches = word.match(regex);
  return matches && matches.length >= 4;
}
