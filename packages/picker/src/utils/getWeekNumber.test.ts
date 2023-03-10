import { getWeekNumber } from "./getWeekNumber";

describe("getWeekNumber", () => {
  test("should return 1 if the number is not between 0 and 5", () => {
    expect(getWeekNumber(8)).toBe(1);
  });
  test("should return 1 if the number is not between 0 and 5", () => {
    expect(getWeekNumber(0)).toBe(6);
    expect(getWeekNumber(1)).toBe(5);
    expect(getWeekNumber(2)).toBe(4);
    expect(getWeekNumber(3)).toBe(3);
    expect(getWeekNumber(4)).toBe(2);
    expect(getWeekNumber(5)).toBe(1);
  });
});
