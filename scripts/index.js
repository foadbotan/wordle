import { validWords } from "./data.js";
import {
  createButton,
  createAlert,
  getRandomWord,
  getSimilarWords,
} from "./helpers.js";

const alertContainer = document.getElementById("alert-container");
const rows = document.querySelectorAll(".row");
const form = document.getElementById("newGuessForm");
const input = document.getElementById("newGuessInput");
const formButton = document.getElementById("newGuessButton");

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

  if (isTooShort) return showAlert("Not enough letters", { duration: 2000 });
  if (isInvalidWord) return showAlert("Not in word list", { duration: 2000 });

  addGuess(guess);
  input.value = "";

  if (checkWin() || noMoreTurns) return endGame();
}

function addGuess(guess) {
  const [...tiles] = rows[nextRowIndex++].children;
  const correctWord = CORRECT_WORD.split("");

  tiles.forEach(showTile);
  tiles.forEach(showExactMatches);
  tiles.forEach(showPartialMatches);

  function showTile(tile, i) {
    tile.textContent = guess[i];
    tile.classList.add("gray");
  }

  function showExactMatches(tile, i) {
    const isExactMatch = guess[i] === correctWord[i];
    if (isExactMatch) {
      tile.classList.add("green");
      correctWord[i] = null;
    }
  }

  function showPartialMatches(tile, i) {
    const index = correctWord.indexOf(guess[i]);
    const isPartialMatch = index !== -1;
    if (isPartialMatch) {
      tile.classList.add("yellow");
      correctWord[index] = null;
    }
  }
}

function alertGameEnd() {
  const message = checkWin() ? "You Win!" : "You Lose!";
  const button = createButton("Play Again", startGame);
  showAlert(message, { children: [button] });
}

function showAlert(message, { duration, children }) {
  const alertElement = createAlert(message);
  alertContainer.prepend(alertElement);

  children && alertElement.append(...children);
  duration && setTimeout(() => hideAlert(alertElement), duration);
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
