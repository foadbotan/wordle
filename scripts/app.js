import { validWords } from "./data.js";
import {
  createButton,
  createAlert,
  getRandomWord,
  getSimilarWords,
} from "./helpers.js";

const alertContainer = document.getElementById("alert-container");
const rows = document.querySelectorAll(".row");
const form = document.getElementById("new-guess-form");
const input = document.getElementById("new-guess-input");
const formButton = document.getElementById("new-guess-button");

let CORRECT_WORD = getRandomWord(validWords);
let nextRowIndex = 0;

logHints();

input.focus();

form.addEventListener("submit", handleNewGuess);

function handleNewGuess(e) {
  e.preventDefault();

  const guess = input.value.toUpperCase();
  const isTooShort = guess.length < 5;
  const isInvalidWord = !validWords.includes(guess);
  const noMoreTurns = nextRowIndex === 5;

  if (isTooShort) return alertError("Not enough letters");
  if (isInvalidWord) return alertError("Not in word list");

  addGuess(guess);
  input.value = "";

  if (checkWin() || noMoreTurns) return endGame();
}

function addGuess(guess) {
  const unmatchedChars = Array.from(CORRECT_WORD);
  const [...tiles] = rows[nextRowIndex].children;
  nextRowIndex++;

  tiles.forEach(showTile);
  tiles.forEach(showExactMatches);
  tiles.forEach(showPartialMatches);

  function showTile(tile, i) {
    tile.textContent = guess[i];
    tile.classList.add("gray");
  }

  function showExactMatches(tile, i) {
    const isExactMatch = guess[i] === unmatchedChars[i];
    if (isExactMatch) {
      tile.classList.add("green");
      unmatchedChars[i] = null;
    }
  }

  function showPartialMatches(tile, i) {
    const isPartialMatch = unmatchedChars.includes(guess[i]);
    if (isPartialMatch) {
      tile.classList.add("yellow");
      const index = unmatchedChars.indexOf(guess[i]);
      unmatchedChars[index] = null;
    }
  }
}

function alertError(message) {
  const alertElement = createAlert(message);
  showAlert(alertElement);
  setTimeout(() => hideAlert(alertElement), 2000);
}

function alertGameEnd() {
  const message = checkWin() ? "You Win!" : "You Lose!";
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

function endGame() {
  input.disabled = true;
  formButton.disabled = true;
  alertGameEnd();
}

function startGame() {
  location.reload();
}

function checkWin() {
  const [...tiles] = rows[nextRowIndex - 1].children;
  return tiles.every((tile) => tile.classList.contains("green"));
}

function logHints() {
  console.log(
    "Call showAnswer() to see the answer and showHint() to see hints"
  );

  window.showAnswer = () => {
    console.log("ANSWER:", CORRECT_WORD);
  };

  window.showHint = () => {
    const similarWords = getSimilarWords(validWords, CORRECT_WORD);
    console.log("HINT: This is a list of similar words - ", similarWords);
  };
}
