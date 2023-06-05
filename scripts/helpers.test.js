import { describe, test, expect } from "vitest";
import { getRandomWord, createAlert, createButton } from "./helpers.js";

describe("getRandomWord", () => {
  test("returns a random element from an array", () => {
    const array = [1, 2, 3, 4, 5];
    const randomElement = getRandomWord(array);
    expect(array).toContain(randomElement);
  });

  test.each([
    [[], ""],
    [null, ""],
    [undefined, ""],
  ])("returns an empty string if the array is %s", (array, expected) => {
    const randomElement = getRandomWord(array);
    expect(randomElement).toBe(expected);
  });
});

// export function createAlert(message) {
//   const alertElement = document.createElement("div");
//   alertElement.classList.add("alert");
//   alertElement.textContent = message;
//   return alertElement;
// }

// write vitest tests for createAlert
// describe("createAlert", () => {
