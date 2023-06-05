import { describe, it, expect } from "vitest";
import { getRandomArrayElement } from "./helpers.js";

describe("getRandomArrayElement", ({ assert }) => {
  it("returns a random element from an array", () => {
    const array = [1, 2, 3, 4, 5];
    const randomElement = getRandomArrayElement(array);
    expect(array).toContain(randomElement);
  });

  it("returns undefined if the array is empty", () => {
    const array = [];
    const randomElement = getRandomArrayElement(array);
    expect(randomElement).toBeUndefined();
  });

  it("returns undefined if the array is undefined", () => {
    const array = undefined;
    const randomElement = getRandomArrayElement(array);
    expect(randomElement).toBeUndefined();
  });
});
