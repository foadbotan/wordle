export function createButton(message, handleClick) {
  const button = document.createElement("button");
  button.textContent = message;
  button.addEventListener("click", handleClick);
  return button;
}

export function createAlert(message) {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert");
  alertElement.textContent = message;
  return alertElement;
}

export function getRandomArrayElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
