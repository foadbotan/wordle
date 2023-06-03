const rows = document.querySelectorAll(".row");
const form = document.querySelector("form");
const input = document.querySelector("input");
const WORD_OF_THE_DAY = getRandomArrayElement(validWords);

const guesses = [];

console.log(WORD_OF_THE_DAY);

form.addEventListener("submit", e => {
  e.preventDefault();
  const word = input.value.toUpperCase();
  const isTooShort = word.length < 5;
  const isInvalidWord = !validWords.includes(word);
  const hasNoMoreAttempts = guesses.length >= 6;

  if (isTooShort || isInvalidWord || hasNoMoreAttempts) return;

  addGuess(word);
  input.value = "";
});

function addGuess(guess) {
  const chars = guess.split("");
  guesses.push(chars);

  const [...tiles] = rows[guesses.length - 1].children;

  let [...word] = WORD_OF_THE_DAY;
  tiles.forEach((tile, i) => {
    const char = chars[i];
    const containsChar = word.includes(char);
    const isSamePosition = word[i] === char;

    tile.textContent = char;
    if (isSamePosition) {
      tile.classList.add("green");
      word[i] = " ";
    } else if (containsChar) {
      tile.classList.add("yellow");
      word = word.join("").replace(char, "").split("");
    } else {
      tile.classList.add("gray");
    }
  });
}

function getRandomArrayElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

//  <div class="row data-row-1">
//    <div class="tile tile-0"></div>
//    <div class="tile tile-1"></div>
//    <div class="tile tile-2"></div>
//    <div class="tile tile-3"></div>
//    <div class="tile tile-4"></div>
//  </div>;
