// @vitest-environment happy-dom
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

describe("createAlert", () => {
  const message = "alert message";
  const alertElement = createAlert(message);

  test("returns an element with the provided message", () => {
    expect(alertElement.textContent).toBe(message);
  });

  test("returns an element with the .alert class", () => {
    expect(alertElement.classList.value).toContain("alert");
  });
});

describe("createButton", () => {
  const message = "click me";
  const handleClick = () => {};
  const buttonElement = createButton(message, handleClick);

  test("returns a button element", () => {
    expect(buttonElement.tagName).toBe("BUTTON");
  });

  test("returns a button element with the provided text", () => {
    expect(buttonElement.textContent).toBe(message);
  });

  test("returns a button element with the provided click handler", () => {
    expect(buttonElement.onclick).toBe(handleClick);
  });
});
