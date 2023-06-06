import { validWords } from "./data.js";

const alertContainer = document.getElementById("alert-container");
const rows = document.querySelectorAll(".row");

const CORRECT_WORD = getRandomWord(validWords);

console.log(CORRECT_WORD);
