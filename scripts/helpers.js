export function createButton(message, handleClick) {
  const button = document.createElement("button");
  button.textContent = message;
  button.onclick = handleClick;
  return button;
}

export function createAlert(message) {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert");
  alertElement.textContent = message;
  return alertElement;
}

export function getRandomWord(array) {
  if (!array) return "";
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex] || "";
}

export function getSimilarWords(validWords, correctWord) {
  const similarWords = validWords.filter(isSimilarWord);
  return similarWords.slice(0, 10);

  function isSimilarWord(word) {
    const regex = new RegExp(`[${correctWord}]`, "g");
    const matches = word.match(regex);
    return matches && matches.length >= 4;
  }
}
