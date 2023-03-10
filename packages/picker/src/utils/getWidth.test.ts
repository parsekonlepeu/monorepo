import { getWidth } from "./getWidth";

describe("getWidth", () => {
  test("should return a string", () => {
    expect(typeof getWidth(1, 4, 24, 5)).toBe("string");
  });
  test("should return error if start < end", () => {
    expect(() => getWidth(4, 1, 24, 5)).toThrow(
      "start must be bigger than end"
    );
  });
});
