import { validWords } from "./data.js";

const alertContainer = document.getElementById("alert-container");
const rows = document.querySelectorAll(".row");
const keyboardButtons = document.querySelectorAll(".keyboard-button");

const CORRECT_WORD = getRandomWord(validWords);
const MAX_WORD_LENGTH = CORRECT_WORD.length;

let currentRowIndex = 0;
let currentTileIndex = 0;
console.log(CORRECT_WORD);

document.addEventListener("keydown", handleKeyPressOrButton);
[...keyboardButtons].forEach((button) =>
  button.addEventListener("click", handleKeyPressOrButton)
);

function handleKeyPressOrButton(e) {
  const key = e.key ? e.key : e.target.dataset.key;
  const isInvalidKey = !/^[a-z]$|^Backspace$|^Enter$/.test(key);
  if (isInvalidKey) return;

  processKey(key);
}

function getRandomWord(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function processKey(char) {
  const currentRow = rows[currentRowIndex].children;
  const currentTile = currentRow[currentTileIndex];
  const previousTile = currentRow[currentTileIndex - 1];

  if (char === "Backspace") {
    if (currentTileIndex === 0) return;
    previousTile.textContent = "";
    previousTile.classList.remove("active");
    currentTileIndex--;
    return;
  }

  if (char === "Enter") {
    return;
  }

  if (currentTileIndex === MAX_WORD_LENGTH) {
    return;
  }

  currentTile.textContent = char;
  currentTile.classList.add("active");
  currentTileIndex++;
}
