import { validWords } from "./data.js";
import { createButton, createAlert, getRandomArrayElement } from "./helpers.js";

const alertContainer = document.getElementById("alert-container");
const rows = document.querySelectorAll(".row");
const form = document.getElementById("newGuessForm");
const input = document.getElementById("newGuessInput");
const formButton = document.getElementById("newGuessButton");

let CORRECT_WORD = getRandomArrayElement(validWords);
let nextRowIndex = 0;

console.log(CORRECT_WORD);
input.focus();

form.addEventListener("submit", handleNewGuess);

function handleNewGuess(e) {
  e.preventDefault();

  const guess = input.value.toUpperCase();
  const isTooShort = guess.length < 5;
  const isInvalidWord = !validWords.includes(guess);
  const noMoreTurns = nextRowIndex === 5;

  if (isTooShort) return alertMessage("Not enough letters");
  if (isInvalidWord) return alertMessage("Not in word list");

  addGuess(guess);
  input.value = "";

  noMoreTurns && endGame();
}

function addGuess(guess) {
  const [...tiles] = rows[nextRowIndex++].children;
  let correctWord = CORRECT_WORD.split("");

  tiles.forEach((tile, i) => {
    tile.textContent = guess[i];
    tile.classList.add("gray");

    if (guess[i] === correctWord[i]) {
      tile.classList.add("green");
      correctWord[i] = null;
    }
  });

  tiles.forEach((tile, i) => {
    if (correctWord.includes(guess[i])) {
      tile.classList.add("yellow");
      const index = correctWord.indexOf(guess[i]);
      correctWord[index] = null;
    }
  });

  checkWin() && endGame();
}

function alertMessage(message) {
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

function showAlert(alert) {
  alertContainer.prepend(alert);
  setTimeout(() => {
    alert.classList.add("show-alert");
  }, 100);
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
