import { validWords } from "./data.js";

const alertContainer = document.getElementById("alert-container");
const rows = document.querySelectorAll(".row");
const [...keyboardButtons] = document.querySelectorAll(".keyboard-button");

const CORRECT_WORD = getRandomElement(validWords);
const CURRENT_INDEX = { row: 0, tile: 0 };

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
  const tiles = getCurrentRow();
  const currentTile = tiles[CURRENT_INDEX.tile];
  const previousTile = tiles[CURRENT_INDEX.tile - 1];

  if (key === "Backspace") deleteTile(previousTile);
  if (key === "Enter") checkAnswer();
  if (key.match(/^[a-z]$/)) addTile(currentTile, key);
}

function deleteTile(tile) {
  const isFirstTile = CURRENT_INDEX.tile === 0;
  if (isFirstTile) return;

  answer = answer.slice(0, -1);
  tile.textContent = "";
  tile.classList.remove("active");
  CURRENT_INDEX.tile--;
}

function addTile(tile, key) {
  const isLastTile = CURRENT_INDEX.tile === CORRECT_WORD.length;
  if (isLastTile) return;

  answer += key.toUpperCase();
  tile.textContent = key;
  tile.classList.add("active");
  CURRENT_INDEX.tile++;
}

function checkAnswer(tiles) {
  console.log("checking: ", answer);
}

function getCurrentRow() {
  return rows[CURRENT_INDEX.row].children;
}

/**--------------------------------------------
 *               Helper Functions
 *---------------------------------------------**/
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
