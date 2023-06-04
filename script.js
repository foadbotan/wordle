const rows = document.querySelectorAll(".row");
const form = document.querySelector("form");
const input = document.querySelector("input");
const CORRECT_WORD = getRandomArrayElement(validWords);

let currentRowIndex = 0;

input.focus();

console.log(CORRECT_WORD);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const guess = input.value.toUpperCase();
  const isTooShort = guess.length < 5;
  const isInvalidWord = !validWords.includes(guess);
  const isGameOver = currentRowIndex >= 6;
  if (isTooShort || isInvalidWord || isGameOver) return;

  addGuess(guess);
  input.value = "";
});

function addGuess(guess) {
  const [...tiles] = rows[currentRowIndex++].children;
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
}

function getRandomArrayElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
